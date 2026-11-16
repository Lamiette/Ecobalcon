"""Contrôles ciblés du contrat de l'auditeur, sur fichiers temporaires."""

import contextlib
import hashlib
import importlib.util
import io
import json
from pathlib import Path
import shutil
import unittest
import uuid

MODULE = Path(__file__).resolve().parents[1] / "seo_audit.py"
spec = importlib.util.spec_from_file_location("seo_audit", MODULE)
audit = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audit)


class AuditContractTest(unittest.TestCase):
    def setUp(self):
        # mkdtemp(mode=0o700) peut créer un ACL inutilisable dans un sandbox
        # Windows. mkdir() conserve les droits hérités du répertoire de tests.
        test_dir = Path(__file__).resolve().parent
        self.root = (test_dir / (".seo-audit-test-" + uuid.uuid4().hex)).resolve()
        self.root.mkdir()
        self.assertEqual(self.root.parent, test_dir)
        self.addCleanup(self.clean_fixture)
        self.write("robots.txt", "User-agent: *\nAllow: /\n")
        self.write("sitemap.xml", '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://ecobalcon.com/articles/test/</loc></url></urlset>')
        self.out = self.root / audit.FEATURE / "initial"

    def clean_fixture(self):
        test_dir = Path(__file__).resolve().parent
        target = self.root.resolve()
        if target.parent != test_dir or not target.name.startswith(".seo-audit-test-"):
            raise RuntimeError("Fixture de nettoyage hors du répertoire de tests")
        shutil.rmtree(target)

    def write(self, name, text):
        target = self.root / name
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(text, encoding="utf-8")
        return target

    def run_cli(self, output=None):
        with contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
            return audit.main(["--root", str(self.root), "--output-dir", str(output or self.out)])

    def test_canonical_folders_and_legacy_keep_indexation_unknown(self):
        self.write("articles/test/index.html", '<title>Test</title><h1>Test</h1><link rel="canonical" href="https://ecobalcon.com/articles/test/"><a href="../../dossier/?a=1#section">Dossier</a><a href="#x">Fragment</a>')
        self.write("dossier/index.html", '<h1>Dossier</h1>')
        for name in ("articles/test.html", "test/index.html"):
            self.write(name, '<meta name="robots" content="noindex,follow"><meta http-equiv="refresh" content="0; url=https://ecobalcon.com/articles/test/"><script>window.location.replace("https://ecobalcon.com/articles/test/");</script>')
        self.assertEqual(self.run_cli(), 0)
        report = json.loads((self.out / "inventory.json").read_text(encoding="utf-8"))
        pages = {p["file_path"]: p for p in report["pages"]}
        page = pages["articles/test/index.html"]
        self.assertEqual(page["observed_url"], "https://ecobalcon.com/articles/test/")
        self.assertEqual(page["links"][0]["file_path"], "dossier/index.html")
        self.assertEqual(page["links"][0]["status"], "present")
        self.assertEqual(page["links"][1]["status"], "fragment_ou_vide")
        for name in ("articles/test.html", "test/index.html"):
            self.assertEqual(pages[name]["discovery_class"], "redirection")
            self.assertEqual(pages[name]["redirect_check"]["status"], "present")
        self.assertTrue(all(p["google_index_state"] == "inconnu" for p in pages.values()))

    def test_anomalies_reported_without_writing_site(self):
        source = self.write("index.html", '<meta name="robots" content="noindex"><h1>Accueil</h1><a href="absent/">Absent</a><img src="images/perdue.webp"><script type="application/ld+json">{invalid}</script>')
        before = hashlib.sha256(source.read_bytes()).hexdigest()
        self.assertEqual(self.run_cli(), 0)
        self.assertEqual(hashlib.sha256(source.read_bytes()).hexdigest(), before)
        report = json.loads((self.out / "inventory.json").read_text(encoding="utf-8"))
        self.assertEqual(report["pages"][0]["discovery_class"], "exclusion_existante")
        checks = {o["check_name"] for o in report["observations"]}
        self.assertIn("reference_absent", checks)
        self.assertIn("jsonld_syntaxe", checks)

    def test_exclusions_shared_hashes_and_refusals_preserve_existing_reports(self):
        self.write("index.html", '<h1>Accueil</h1>')
        for folder in ("backups", ".edge-profile", "specs", "scripts"):
            self.write(folder + "/private.html", '<h1>Hors inventaire</h1>')
        self.write("css/style.css", "body{}")
        self.write("js/exemple.js", "void 0;")
        self.write("scripts/sitemap-page-state.json", "{}")
        self.assertEqual(self.run_cli(), 0)
        report = json.loads((self.out / "inventory.json").read_text(encoding="utf-8"))
        self.assertEqual(len(report["pages"]), 1)
        self.assertIn("css/style.css", report["file_hashes"])
        self.assertIn("js/exemple.js", report["file_hashes"])
        self.assertIn("scripts/sitemap-page-state.json", report["file_hashes"])
        before = (self.out / "inventory.json").read_bytes()
        for output in (self.out, self.root / "articles/rapport", self.root.parent / "escape"):
            with self.assertRaises(SystemExit) as error:
                self.run_cli(output)
            self.assertEqual(error.exception.code, 2)
        self.assertEqual((self.out / "inventory.json").read_bytes(), before)

    def test_encoded_path_traversal_is_not_read(self):
        ref = audit.resolve_reference(self.root, audit.SITE + "/", "/%2e%2e/secret.html")
        self.assertEqual(ref["status"], "hors_racine")
        self.assertNotIn("file_path", ref)


if __name__ == "__main__":
    unittest.main()
