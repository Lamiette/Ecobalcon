# Vérification de génération — LOT-001

Date de reprise : 2026-11-16. Référence : [actions.md](actions.md).

## Photographie et isolation avant correction

- Capture courante : `backups/homepage/seo-lot-20261116/snapshot.json`.
  341 fichiers : tous les fichiers suivis dans leur état de travail courant,
  plus l'auditeur et son test déjà présents. Empreintes SHA-256 et statut Git conservés.
- `before/` conserve les originaux ; `control/` et `work/` sont deux copies de
  cette photographie. `copy2` préserve aussi les dates des fichiers. HTML de repli,
  images, scripts, CSS et état du sitemap inclus ; aucun profil, environnement
  Python, export privé, `.git` ou ancienne sauvegarde copié.
- Les copies sont sous le répertoire ignoré `backups/homepage/`. Pour empêcher Git
  de découvrir le dépôt parent, chaque exécution de génération fixe
  `GIT_CEILING_DIRECTORIES` au répertoire `seo-lot-20261116`. `git -C control
  rev-parse --show-toplevel` a bien répondu « not a git repository ».
- L'accueil existe dans les trois copies. Aucun `-RebuildHome`, script
  `strategic_enhance.ps1` ou processus de publication utilisé.

La sélection et les empreintes des destinations sont figées dans `baseline.json`
avant toute correction. Les nouvelles sorties documentaires n'existaient pas lors
de leur création ; les sorties d'application prévues existaient toutes.

## Copie de contrôle sans correction

Commande standard exécutée uniquement dans la copie, succès (code 0) :

```powershell
$env:GIT_CEILING_DIRECTORIES=(Resolve-Path backups/homepage/seo-lot-20261116).Path
powershell -NoProfile -ExecutionPolicy Bypass -File backups/homepage/seo-lot-20261116/control/scripts/rebuild_articles.ps1
```

Journal complet : `backups/homepage/seo-lot-20261116/control-run.log`.
Liste des différences : [generation-control.json](generation-control.json).

178 fichiers différents en octets ; 176 sont identiques après lecture UTF-8 sans
BOM et normalisation CRLF/LF. **Deux fichiers techniques seulement diffèrent en
contenu** : `sitemap.xml` et `scripts/sitemap-page-state.json`. Leurs seuls écarts
sémantiques portent sur le hash/lastmod préexistant du simulateur, déjà modifié par
la fonctionnalité 001. Aucun fichier n'a été ajouté.

Cette dérive préexistante n'est pas une correction SEO de la fonctionnalité 002.
Elle ne sera pas copiée dans le dépôt avec ce lot. La comparaison corrigée/contrôle
permet de retenir exclusivement les dépendances réelles des quatre URLs choisies,
sans appliquer les 176 changements de sérialisation.

## Corrections autorisées dans la copie de travail

Les quatre sources nommées dans `actions.md` seulement. Le corps visible du basilic,
son image, ses liens, son temps de lecture et sa date de publication sont conservés.
La FAQ structurée réemploie le texte visible ; aucun fait horticole nouveau ajouté.
La suppression du HowTo évite de présenter six minutes de lecture comme durée
totale d'un enracinement. Le générateur partagé est inchangé.

## Génération corrigée et comparaison

Le parser PowerShell n'a signalé aucune erreur dans l'override corrigé. Le rebuild
standard de `work/scripts/rebuild_articles.ps1`, avec le même plafond de recherche
Git, a terminé avec le code 0. Journal : `backups/homepage/seo-lot-20261116/work-run.log`.

Comparaison contrôle → corrigé après normalisation des fins de ligne et du BOM :
**exactement sept fichiers** — les quatre pages du lot, l'override et les deux
fichiers techniques annoncés. Une relecture indépendante a aussi comparé l'union
complète des arbres : 341 fichiers dans chaque copie, aucun ajout ni retrait.
Les autres réécritures sont identiques en contenu ; aucune dépendance fonctionnelle
supplémentaire n'est masquée par cette normalisation.

La projection `apply/` conserve BOM et fins de ligne des destinations initiales.
Le script local `project_lot.py` prépare ces sorties depuis les générations :

- quatre HTML et override issus de la copie corrigée ;
- uniquement les quatre nœuds URL du lot dans le sitemap original ;
- uniquement les trois entrées de catégories dans l'état original du sitemap.

Le nœud et l'état du simulateur restent ceux de la photographie. Toutes les
autres entrées et les 73 URLs du sitemap sont conservées. Cela préserve le travail
001 et ses métadonnées préexistantes au lieu d'appliquer la dérive du rebuild.
Le générateur partagé, les redirections, index et auteurs restent inchangés.

## Application et réception statique

[generation-diff.json](generation-diff.json) conserve les sept empreintes avant/après
et l'instant réel de l'application. Toutes les destinations ont été vérifiées
contre la capture avant la première écriture ; aucune divergence concurrente.
Les sept fichiers ont ensuite été appliqués, sans rebuild dans le dépôt original.

Le contrôle `verify_lot.py --repository`, dont le script est conservé dans la
sauvegarde ignorée, a produit [acceptance-checks.json](acceptance-checks.json) :

- exactement sept fichiers d'application changés par rapport aux 341 empreintes,
  dont quatre HTML ; accueil, simulateur, CSS/JS, images et sources partagées préservés ;
- quatre cartes de catégories à 12/17/24/5 guides, listes complètes de 17 et 24
  liens identiques, destinations et ancres locales présentes, H1 et IDs uniques ;
- FAQ structurée égale aux trois réponses visibles, HowTo absent, corps basilic
  identique, date de publication et toutes les propriétés BlogPosting hors
  `dateModified` préservées ; BreadcrumbList et temps de lecture conservés ;
- empreintes CSP de tous les scripts intégrés exactes ;
- quatre nœuds sitemap modifiés, trois entrées d'état de catégorie modifiées,
  nœud et état du simulateur inchangés.

Le parser PowerShell du fichier appliqué passe également. La vraie fonction
`Get-SitemapContentHash` de `scripts/sitemap-state.ps1` confirme les trois hashes
de catégorie, sans recopier son calcul comme seule preuve.

L'[audit final](final/inventory.json) conserve 195 HTML, 73 entrées sitemap et la
même partition de recherche. Ses 226 observations sont identiques à la référence
hors date de contrôle : aucune observation technique nouvelle. Les dimensions
d'images absentes, préexistantes et reportées, restent signalées.

Le rendu et le parcours clavier ne sont pas validés : l'extension Chrome ne répond
pas. T024 reste ouverte. Les vérifications de source ne remplacent pas ce contrôle
visuel. Aucun staging, commit, push, `publish.bat`, déploiement ni demande d'indexation.
