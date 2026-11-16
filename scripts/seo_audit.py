#!/usr/bin/env python3
"""Audit statique local EcoBalcon. Ne corrige ni ne publie aucun fichier du site."""

from __future__ import annotations

import argparse
from collections import Counter, defaultdict
from datetime import datetime, timezone
import hashlib
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urljoin, urlsplit
from urllib.robotparser import RobotFileParser
import xml.etree.ElementTree as ET

SITE = "https://ecobalcon.com"
FEATURE = "specs/002-ameliorer-visibilite-naturelle/diagnostic"
EXCLUDED = {
    ".git", ".agents", ".specify", ".claude", ".venv-spec-kit", "node_modules",
    "__pycache__", "backups", "raw-singlefile", "specs", "scripts",
}
LIMITATIONS = [
    "Déclarations locales uniquement : aucune preuve d'indexation Google.",
    "Aucun accès réseau, exécution JavaScript, rendu navigateur ou statut HTTP de production.",
    "JSON-LD contrôlé syntaxiquement et pour ses URLs locales, sans certification de résultat enrichi.",
    "robots.txt analysé par urllib.robotparser ; les en-têtes HTTP et règles d'hébergement restent inconnus.",
    "Les ressources ajoutées uniquement par JavaScript et les références CSS demandent une relecture humaine.",
]


def within(path: Path, root: Path) -> bool:
    return path.resolve().is_relative_to(root.resolve())


def is_link(path: Path) -> bool:
    return path.is_symlink() or getattr(path, "is_junction", lambda: False)()


def site_files(root: Path):
    """Parcours sans liens de répertoire et sans dossiers de travail."""
    def fail_on_walk_error(error):
        raise error

    for folder, dirs, files in os.walk(root, followlinks=False, onerror=fail_on_walk_error):
        dirs[:] = sorted(d for d in dirs if d not in EXCLUDED
                         and not d.startswith(".edge-profile")
                         and not is_link(Path(folder) / d))
        for name in sorted(files):
            path = Path(folder) / name
            if not is_link(path) and within(path, root):
                yield path


def page_url(relative: str) -> str:
    if relative == "index.html":
        return SITE + "/"
    if relative.endswith("/index.html"):
        return SITE + "/" + relative[:-10]
    return SITE + "/" + relative


def family(relative: str) -> str:
    parts = relative.split("/")
    if relative == "index.html":
        return "accueil"
    if relative == "articles/index.html":
        return "index_articles"
    if parts[0] == "articles":
        return "article" if len(parts) == 3 and parts[-1] == "index.html" else "legacy"
    if parts[0] == "categories":
        return "categorie"
    if parts[0] == "auteurs":
        return "index_auteurs" if len(parts) == 2 else "auteur"
    if parts[0] == "simulateur":
        return "outil"
    if parts[0] == "contact":
        return "contact"
    if parts[0] in {"a-propos", "politique-confidentialite"}:
        return "institutionnelle"
    return "systeme" if relative == "404.html" else "legacy"


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.titles = []
        self.h1 = []
        self.headings = []
        self.meta = defaultdict(list)
        self.canonicals = []
        self.hreflang = []
        self.references = []
        self.images = []
        self.jsonld = []
        self.redirect = None
        self.redirect_kind = None
        self._capture = None
        self._text = []
        self._script_type = None
        self._script = []
        self.visible_text = []
        self._hidden = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in {"title", "h1", "h2", "h3"}:
            self._capture, self._text = tag, []
        if tag == "meta":
            key = (attrs.get("name") or attrs.get("property") or attrs.get("http-equiv") or "").lower()
            self.meta[key].append(attrs.get("content", ""))
            if key in {"og:image", "twitter:image"} and attrs.get("content"):
                self.references.append({"kind": "share_image", "value": attrs["content"]})
            if key == "refresh":
                match = re.search(r"url\s*=\s*['\"]?(.+?)['\"]?$", attrs.get("content", ""), re.I)
                if match:
                    self.redirect, self.redirect_kind = match[1], "meta_refresh"
        if tag == "link":
            rels = (attrs.get("rel") or "").lower().split()
            if "canonical" in rels:
                self.canonicals.append(attrs.get("href", ""))
            if attrs.get("hreflang"):
                self.hreflang.append({"lang": attrs["hreflang"], "url": attrs.get("href", "")})
            if any(r in rels for r in ("stylesheet", "icon", "apple-touch-icon", "manifest")):
                self.references.append({"kind": "asset", "value": attrs.get("href", "")})
        if tag == "a" and "href" in attrs:
            self.references.append({"kind": "link", "value": attrs["href"] or ""})
        if tag in {"script", "style"}:
            self._hidden += 1
        if tag == "script":
            self._script_type = (attrs.get("type") or "").lower()
            self._script = []
            if attrs.get("src"):
                self.references.append({"kind": "script", "value": attrs["src"]})
        if tag == "img":
            self.images.append(attrs)
            if attrs.get("src"):
                self.references.append({"kind": "image", "value": attrs["src"]})
        if tag in {"img", "source"} and attrs.get("srcset") and not attrs["srcset"].startswith("data:"):
            for candidate in attrs["srcset"].split(","):
                if candidate.strip():
                    self.references.append({"kind": "image_srcset", "value": candidate.strip().split()[0]})

    def handle_data(self, data):
        if self._capture:
            self._text.append(data)
        if self._script_type is not None:
            self._script.append(data)
        if not self._hidden and data.strip():
            self.visible_text.append(data.strip())

    def handle_endtag(self, tag):
        if tag == self._capture:
            value = " ".join(" ".join(self._text).split())
            if tag == "title":
                self.titles.append(value)
            elif tag == "h1":
                self.h1.append(value)
            self.headings.append({"tag": tag, "text": value})
            self._capture = None
        if tag == "script":
            raw = "".join(self._script).strip()
            if self._script_type == "application/ld+json":
                try:
                    self.jsonld.append({"valid_json": True, "data": json.loads(raw)})
                except ValueError as error:
                    self.jsonld.append({"valid_json": False, "error": str(error)})
            if not self.redirect:
                match = re.search(r"(?:window\.)?location\.(?:replace|assign)\(['\"]([^'\"]+)['\"]\)", raw)
                if match:
                    self.redirect, self.redirect_kind = match[1], "javascript_declare"
            self._script_type = None
            self._script = []
        if tag in {"script", "style"}:
            self._hidden = max(0, self._hidden - 1)


def resolve_reference(root: Path, base_url: str, value: str) -> dict:
    """Résout les références sans lire de ressource hors racine."""
    if not value or value.startswith("#"):
        return {"value": value, "status": "fragment_ou_vide", "resolved_url": urljoin(base_url, value)}
    absolute = urljoin(base_url, value)
    url = urlsplit(absolute)
    if url.scheme not in {"http", "https"}:
        return {"value": value, "status": "schema_non_http", "resolved_url": absolute}
    if url.netloc.lower() != urlsplit(SITE).netloc:
        return {"value": value, "status": "externe", "resolved_url": absolute}
    decoded = unquote(url.path).replace("\\", "/")
    # urljoin normalise les .. littéraux ; le décodage peut en faire réapparaître.
    path = root / decoded.lstrip("/")
    if not within(path, root):
        return {"value": value, "status": "hors_racine", "resolved_url": absolute}
    if path.is_dir() or decoded.endswith("/"):
        path = path / "index.html"
    if not within(path, root):
        return {"value": value, "status": "hors_racine", "resolved_url": absolute}
    return {"value": value, "status": "present" if path.is_file() else "absent",
            "resolved_url": absolute, "file_path": path.relative_to(root).as_posix()}


def ld_values(value, key):
    if isinstance(value, dict):
        for k, item in value.items():
            if k == key:
                yield item
            yield from ld_values(item, key)
    elif isinstance(value, list):
        for item in value:
            yield from ld_values(item, key)


def build_inventory(root: Path) -> dict:
    root = root.resolve()
    checked_at = datetime.now(timezone.utc).isoformat()
    paths = list(site_files(root))
    html_paths = [p for p in paths if p.suffix.lower() == ".html"]
    pages, observations = [], []
    hashes = {}

    def observe(page, check, result, evidence, effect="À examiner dans le contexte du lecteur."):
        observations.append({"observation_id": f"OBS-{len(observations) + 1:04}",
                             "page_ids": [page["page_id"]] if page else [],
                             "environment": "local", "checked_at": checked_at,
                             "check_name": check, "result": result, "evidence_reference": evidence,
                             "reader_effect": effect, "confidence": "fort", "limitations": []})

    robot_file = root / "robots.txt"
    robots_text = robot_file.read_text(encoding="utf-8-sig") if robot_file.is_file() else None
    robot = RobotFileParser()
    robot.parse((robots_text or "").splitlines())
    sitemap_file = root / "sitemap.xml"
    sitemap_urls, sitemap_entries, sitemap_error = [], [], None
    if sitemap_file.is_file():
        try:
            tree = ET.fromstring(sitemap_file.read_bytes())
            for item in tree:
                fields = {child.tag.split("}")[-1]: child.text for child in item}
                if fields.get("loc"):
                    sitemap_urls.append(fields["loc"])
                    sitemap_entries.append(fields)
        except ET.ParseError as error:
            sitemap_error = str(error)
            observe(None, "sitemap_syntaxe", "anomalie", sitemap_error)
    else:
        observe(None, "sitemap_absent", "anomalie", "sitemap.xml absent")
    if robots_text is None:
        observe(None, "robots_absent", "anomalie", "robots.txt absent")

    for index, path in enumerate(sorted(html_paths), 1):
        relative = path.relative_to(root).as_posix()
        raw = path.read_bytes()
        parser = PageParser()
        parser.feed(raw.decode("utf-8-sig"))
        parser.close()
        url = page_url(relative)
        robots_meta = ",".join(parser.meta.get("robots", [])).lower()
        allowed = robot.can_fetch("Googlebot", url) if robots_text is not None else None
        canonical = parser.canonicals[0] if parser.canonicals else None
        classification = ("redirection" if parser.redirect else "exclusion_existante"
                          if "noindex" in re.split(r"[\s,]+", robots_meta) else "candidate_recherche"
                          if canonical else "a_examiner")
        references = [{**ref, **resolve_reference(root, url, ref["value"])} for ref in parser.references]
        image_records = [{**attrs, "reference": resolve_reference(root, url, attrs.get("src", ""))}
                         for attrs in parser.images]
        ld_data = [block["data"] for block in parser.jsonld if block["valid_json"]]
        page = {
            "page_id": f"PAGE-{index:04}", "file_path": relative, "observed_url": url,
            "family": family(relative), "discovery_class": classification,
            "declared_canonical": canonical, "declared_canonicals": parser.canonicals,
            "reference_url": urljoin(url, parser.redirect or canonical) if (parser.redirect or canonical) else None,
            "robots_meta": robots_meta, "robots_txt_check": {"googlebot_allowed": allowed},
            "redirect_target": urljoin(url, parser.redirect) if parser.redirect else None,
            "redirect_kind": parser.redirect_kind,
            "title": parser.titles[0] if parser.titles else None, "titles": parser.titles,
            "description": parser.meta.get("description", [None])[0], "h1": parser.h1,
            "headings": parser.headings, "metadata": dict(parser.meta), "hreflang": parser.hreflang,
            "jsonld": parser.jsonld, "links": references, "images": image_records,
            "dates": {key: [v for data in ld_data for v in ld_values(data, key)]
                      for key in ("datePublished", "dateModified")},
            "content_sha256": hashlib.sha256(raw).hexdigest(),
            "visible_word_count": len(" ".join(parser.visible_text).split()),
            "public_checks": [], "google_index_state": "inconnu",
            "source_kind": "override_ou_html_repli" if family(relative) == "article" else
                           "html_durable" if family(relative) == "categorie" else "template_ou_html_existant",
            "source_path": "scripts/article-overrides.ps1" if family(relative) == "article" else relative,
            "in_sitemap": url in sitemap_urls,
        }
        pages.append(page)
        for ref in references:
            if ref["status"] in {"absent", "hors_racine"}:
                observe(page, "reference_" + ref["status"], "anomalie", ref)
        if parser.redirect:
            ref = resolve_reference(root, url, parser.redirect)
            page["redirect_check"] = ref
            if ref["status"] != "present":
                observe(page, "destination_redirection", "anomalie", ref)
            if canonical != page["redirect_target"]:
                observe(page, "canonical_redirection", "anomalie",
                        {"canonical": canonical, "destination": page["redirect_target"]})
        if classification == "candidate_recherche":
            required_meta = ("description", "og:title", "og:description", "og:url", "og:image",
                             "twitter:card", "twitter:title", "twitter:description", "twitter:image")
            if len(parser.titles) != 1 or not page["title"]:
                observe(page, "title_occurrences", "anomalie", parser.titles)
            if len(parser.h1) != 1:
                observe(page, "h1_occurrences", "anomalie", parser.h1)
            if len(parser.canonicals) != 1 or canonical != url:
                observe(page, "canonical", "anomalie", parser.canonicals)
            if allowed is False:
                observe(page, "exploration_bloquee", "anomalie", "Googlebot interdit par robots.txt local")
            for key in required_meta:
                if not any(parser.meta.get(key, [])):
                    observe(page, "meta_absente", "anomalie", key)
            for item in parser.hreflang:
                ref = resolve_reference(root, url, item["url"])
                if ref["status"] != "present":
                    observe(page, "hreflang_cible", "anomalie", item)
            if not parser.hreflang:
                observe(page, "hreflang_absent", "anomalie", relative)
            if not page["in_sitemap"]:
                observe(page, "candidate_absente_sitemap", "anomalie", url)
        elif classification == "a_examiner":
            observe(page, "classification_a_examiner", "non_verifie", "Pas de canonical ni exclusion locale explicite")
        for block in parser.jsonld:
            if not block["valid_json"]:
                observe(page, "jsonld_syntaxe", "anomalie", block["error"])
            else:
                for key in ("url", "@id", "item", "image", "mainEntityOfPage"):
                    for value in ld_values(block["data"], key):
                        if isinstance(value, str) and (value.startswith(("/", "http://", "https://"))):
                            ref = resolve_reference(root, url, value)
                            if ref["status"] in {"absent", "hors_racine"}:
                                observe(page, "jsonld_url", "anomalie", {"key": key, **ref})
        for image in image_records:
            if "alt" not in image:
                observe(page, "image_alt_absent", "anomalie", image.get("src"))
            if not image.get("width") or not image.get("height"):
                observe(page, "image_dimensions_absentes", "anomalie", image.get("src"))
        for key in ("og:url",):
            if page["discovery_class"] == "candidate_recherche" and parser.meta.get(key) and parser.meta[key][0] != url:
                observe(page, "url_partage", "anomalie", parser.meta[key])

    by_url = {page["observed_url"]: page for page in pages}
    for url in sitemap_urls:
        target = by_url.get(url)
        if not target or target["discovery_class"] in {"redirection", "exclusion_existante"}:
            observe(target, "sitemap_cible", "anomalie", url)
    for key in ("title", "description"):
        grouped = defaultdict(list)
        for page in pages:
            if page["discovery_class"] == "candidate_recherche" and page[key]:
                grouped[page[key]].append(page)
        for value, matches in grouped.items():
            if len(matches) > 1:
                observe(matches[0], key + "_duplique", "anomalie",
                        {"value": value, "urls": [page["observed_url"] for page in matches]})
    for path in paths:
        relative = path.relative_to(root).as_posix()
        if path.suffix.lower() == ".html" or relative.startswith(("css/", "js/", "images/")) or relative in {
            "sitemap.xml", "robots.txt", "manifest.json",
        }:
            hashes[relative] = hashlib.sha256(path.read_bytes()).hexdigest()
    state = root / "scripts/sitemap-page-state.json"
    if state.is_file() and within(state, root) and not is_link(state):
        hashes["scripts/sitemap-page-state.json"] = hashlib.sha256(state.read_bytes()).hexdigest()
    return {
        "schema_version": 1, "root": str(root), "checked_at": checked_at,
        "site_url": SITE, "exclusions": sorted(EXCLUDED) + [".edge-profile*", "liens de répertoire"],
        "counts": {"html": len(pages), "families": dict(Counter(p["family"] for p in pages)),
                   "discovery_classes": dict(Counter(p["discovery_class"] for p in pages)),
                   "sitemap_entries": len(sitemap_urls), "observations": len(observations)},
        "file_hashes": hashes, "pages": pages, "observations": observations,
        "robots": {"present": robots_text is not None, "content": robots_text},
        "sitemap": {"present": sitemap_file.is_file(), "entries": sitemap_entries, "error": sitemap_error},
        "limitations": LIMITATIONS,
    }


def markdown_report(report: dict) -> str:
    lines = ["# Audit local EcoBalcon", "", f"Date : {report['checked_at']}", "",
             "Contrôles des fichiers locaux ; aucune preuve d'indexation réelle.", "",
             f"HTML : {report['counts']['html']} ; entrées sitemap : {report['counts']['sitemap_entries']}.",
             "", "## Couverture", "", "| Classe locale | Nombre |", "| --- | ---: |"]
    lines += [f"| {key} | {value} |" for key, value in report["counts"]["discovery_classes"].items()]
    lines += ["", "## Familles", "", "| Famille | Nombre |", "| --- | ---: |"]
    lines += [f"| {key} | {value} |" for key, value in report["counts"]["families"].items()]
    lines += ["", "## Constats locaux", ""]
    page_paths = {p["page_id"]: p["file_path"] for p in report["pages"]}
    if not report["observations"]:
        lines.append("Aucune anomalie détectée par les contrôles statiques définis ; relecture humaine nécessaire.")
    for obs in report["observations"]:
        paths = ", ".join(page_paths[p] for p in obs["page_ids"]) or "site"
        evidence = json.dumps(obs["evidence_reference"], ensure_ascii=False).replace("\n", " ")
        lines.append(f"- {obs['observation_id']} — {obs['result']} — `{paths}` — {obs['check_name']} : {evidence}")
    lines += ["", "## Limites et contrôles non réalisés", ""] + ["- " + item for item in report["limitations"]]
    lines += ["", "Les valeurs, URLs, attributs, dates et empreintes détaillés sont dans `inventory.json`.", ""]
    return "\n".join(lines)


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", required=True, type=Path)
    parser.add_argument("--output-dir", required=True, type=Path)
    args = parser.parse_args(argv)
    root = args.root.resolve()
    output = args.output_dir.resolve()
    allowed = root / FEATURE
    if not root.is_dir():
        parser.error("--root doit être un répertoire existant")
    if not within(output, allowed) or not within(allowed, root) or output == allowed.resolve():
        parser.error("--output-dir doit être un sous-répertoire du diagnostic autorisé")
    if output.exists() and (not output.is_dir() or any(output.iterdir())):
        parser.error("--output-dir doit être nouveau ou vide ; référence existante préservée")
    try:
        report = build_inventory(root)
        rendered = markdown_report(report)
        output.mkdir(parents=True, exist_ok=True)
        # Création exclusive : aucune référence existante n'est remplacée.
        with (output / "inventory.json").open("x", encoding="utf-8", newline="\n") as target:
            json.dump(report, target, ensure_ascii=False, indent=2)
            target.write("\n")
        with (output / "local.md").open("x", encoding="utf-8", newline="\n") as target:
            target.write(rendered)
    except (OSError, UnicodeError, ValueError) as error:
        print(f"Audit incomplet : {error}", file=sys.stderr)
        return 1
    print(f"Audit local : {len(report['pages'])} HTML ; {len(report['observations'])} constats. Rapports : {output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
