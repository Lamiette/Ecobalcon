# Guide de validation — Diagnostic et premier lot SEO

Ce guide décrit les contrôles à exécuter pendant la réalisation. Le script d’audit et ses tests n’existent pas encore au moment de la planification ; seules la lecture des sources et les vérifications documentaires ont alors été effectuées.

## Prérequis

Depuis `C:\Users\Lamiette\Documents\ecobalcon`, disposer de Git, Python 3 et PowerShell ; navigateur local pour la réception visible. Node est utile seulement si les parcours existants du simulateur sont affectés. Aucun paquet nouveau n’est nécessaire.

Vérifier `.specify/feature.json` : `specs/002-ameliorer-visibilite-naturelle`. Lire [plan.md](plan.md), le [modèle](data-model.md) et les contrats [audit](contracts/audit-cli.md) et [préservation/suivi](contracts/preservation-suivi.md).

## 1. Photographier le travail existant

```powershell
git status --short
git diff --stat
Get-FileHash -Algorithm SHA256 index.html, js/simulateur.js, simulateur/index.html
```

Conserver l’état courant dans le journal, avec les modifications préexistantes et les fichiers non suivis utiles. Ne pas comparer uniquement à HEAD : les changements du simulateur et les documents 001 sont déjà présents. L’auditeur complétera cette photographie par les empreintes de l’inventaire.

Résultat attendu : référence du travail courant disponible, aucun fichier du site modifié par ces lectures.

## 2. Valider l’auditeur puis produire l’état initial

Après création des fichiers prévus :

```powershell
python -m unittest discover -s scripts/tests -p 'test_seo_audit.py'
python scripts/seo_audit.py --root . --output-dir specs/002-ameliorer-visibilite-naturelle/diagnostic/initial
```

Résultat attendu : fixtures du contrat réussies ; code de sortie 0 pour le rapport complet, même s’il contient des anomalies ; `inventory.json` et `local.md` créés uniquement dans la destination documentaire. Une relance sur ce même répertoire rempli doit être refusée, sans remplacer la référence.

```powershell
$inventory = Get-Content -Raw -Encoding UTF8 specs/002-ameliorer-visibilite-naturelle/diagnostic/initial/inventory.json | ConvertFrom-Json
$inventory.schema_version
```

Résultat attendu : version 1 ; chaque HTML inventorié appartient à une classe, y compris `a_examiner` ; toutes les familles sont recensées ; l’état Google est inconnu sans preuve. Les sauvegardes, profils et rapports ne sont pas inventoriés comme pages du site. Les nombres peuvent différer de l’observation de planification s’il y a eu de vrais changements : expliquer l’écart, sans figer artificiellement 195 HTML ou 73 entrées.

## 3. Compléter le diagnostic humain et public

Choisir et nommer au moins un exemple de chaque famille présente. Vérifier intention/réponse, titres, lecture mobile, navigation, liens utiles, images et informations structurées visibles. Inscrire les constats et les limites dans `diagnostic/diagnostic.md`.

Dans un navigateur ou client HTTP, si disponible, vérifier accueil, robots, sitemap, pages échantillonnées et variantes legacy ; consigner URL, date, statut observé, destination et version. Une erreur de l’outil n’est pas une preuve de panne. Une page présente au sitemap n’est pas une page prouvée indexée.

Sans accès à Google, garder l’état d’indexation inconnu. Avec une consultation autorisée de l’inspection d’URL, distinguer version connue et test en direct ; ne pas demander d’indexation. Ne pas soumettre le formulaire de contact.

Résultat attendu : couverture local/public/Google explicitée, preuves ou contrôles non vérifiés identifiables, aucun constat de juin repris sans vérification.

## 4. Vérifier les deux chemins de données de recherche

**Source absente** : renseigner `baseline.json` avec disponibilité, motif et valeurs `null`. Produire les propositions à partir du site, en qualifiant les hypothèses non confirmées. Attendu : le diagnostic progresse, sans zéro trafic inventé.

**Source disponible** : suivre le contrat de suivi avec propriété, dates, filtres et couverture exacts. Préparer référence de 28 jours complets, période précédente, site entier et groupe de pages. Ne pas supposer une association page × requête depuis deux exports séparés. Attendu : les mesures sont traçables, les dimensions manquantes et valeurs ambiguës restent indiquées.

**Source incompatible ou partielle** : simuler documentairement une propriété différente, une période absente, une ligne page manquante ou une référence nulle. Attendu : rejet de la comparaison concernée ou limite explicite ; aucune estimation inventée, division par zéro ou reconstitution trompeuse du total.

Ces vérifications de protocole ne nécessitent pas de fausses données présentées comme des performances réelles.

## 5. Figer le lot avant correction

Dans `diagnostic/actions.md`, vérifier pour chaque action : constat lié, besoin lecteur, bénéfice/confiance/effort/risque justifiés, source durable, URLs directes et indirectes, critère avant/après et raison de sélection/report.

Attendu : zéro à trois actions, union de cinq URLs existantes au maximum, accueil exclu, zéro nouvel article. Une action transversale dépassant le plafond est reportée. Un lot vide reste recevable avec justification. L’état initial inclut le groupe fixe et la disponibilité de ses mesures avant modification.

## 6. Vérifier les changements conditionnels

Pour un article, utiliser l’override adapté ; pour une catégorie, sa source HTML durable. Lire `prompt codex.txt` si du contenu éditorial est revu. Préserver conseils, image et attributs utiles ; toute affirmation horticole nouvelle décisive doit avoir sa source.

Si un script PowerShell est modifié, analyser sa syntaxe avant exécution. Exemple à adapter au fichier réellement changé :

```powershell
$parseErrors = $null
$tokens = $null
[System.Management.Automation.Language.Parser]::ParseFile((Resolve-Path scripts/article-overrides.ps1).Path, [ref]$tokens, [ref]$parseErrors) | Out-Null
if ($parseErrors.Count -gt 0) { $parseErrors; throw 'Syntaxe PowerShell invalide' }
```

Avant un rebuild, vérifier l’existence de l’accueil et faire l’essai dans une copie isolée de l’état courant, avec sources de repli, dates et état sitemap préservés. Dans cette copie seulement, la commande standard est :

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/rebuild_articles.ps1
```

Ne pas utiliser `-RebuildHome` ou `strategic_enhance.ps1`. Comparer chaque sortie au snapshot initial ; compter aussi index, auteurs, variantes legacy et pages affectées par fichiers partagés. Examiner les fichiers techniques et dates, pas seulement le code de retour. Une réécriture à octets identiques n’est pas une page changée.

Attendu : ensemble cohérent de sources/sorties, cinq pages maximum. Sinon, réduire ou reporter avant application. Avant de réappliquer chaque fichier, vérifier que sa destination conserve l’empreinte de la capture ; si elle a changé ou est apparue, réconcilier le travail concurrent. Aucune restauration globale.

## 7. Réception locale

Après application du jeu conforme :

```powershell
python scripts/seo_audit.py --root . --output-dir specs/002-ameliorer-visibilite-naturelle/diagnostic/final
python -m http.server 8000 --bind 127.0.0.1
```

Le serveur est une commande distincte qui reste active ; ouvrir les pages du lot depuis `http://localhost:8000/`, arrêter ensuite le serveur. Utiliser une session fraîche ou une invalidation ciblée du service worker si nécessaire.

Pour chaque page du lot :

- même URL et mêmes destinations legacy, sans nouvelle exclusion ; canonical/hreflang/OG/Twitter cohérents ; dates sincères et JSON-LD conforme au contenu visible ;
- titre et réponse fidèles au besoin retenu, conseils utiles conservés, liens et images concernés fonctionnels ;
- lecture sans débordement à 1280 px et 390 px ; liens et contrôles concernés accessibles au clavier, focus visible et ordre utilisable ;
- critères propres à l’action satisfaits, preuves avant/après conservées dans `validation.md`.

Si les parcours du simulateur sont affectés, exécuter aussi :

```powershell
node --test scripts/tests/simulateur-results.test.cjs
```

Le suivi et le consentement sont hors lot. S’ils sont touchés par inadvertance, corriger le dépassement et employer le test existant pertinent avant réception : `node --test scripts/tests/affiliate-tracking.test.cjs`.

```powershell
git diff --check
git diff --stat
git status --short
Get-FileHash -Algorithm SHA256 index.html, js/simulateur.js, simulateur/index.html
```

Comparer les états initial/final et toutes les différences nouvelles, y compris les fichiers non suivis. Attendu : accueil intact, travail préexistant préservé, compte d’URLs conforme, aucun problème nouveau non expliqué. Un contrôle manquant reste non vérifié et empêche de déclarer sa réception validée. Le résultat est local et `non publié`.

## 8. Valider le dossier de suivi sans publier

Vérifier que journal et référence existent et que les dates de publication/échéance sont nulles. Attendu : aucune tâche planifiée, aucun push ou déploiement, aucune exécution de `publish.bat` et aucune demande d’indexation.

Si une publication est autorisée dans une autre intervention, consigner sa date et appliquer le contrôle sous sept jours puis les bilans J+28/J+56. Comparer le même groupe et les mêmes filtres ; présenter site et lot séparément. Une fenêtre chevauchant l’avant-publication, des impressions absentes ou des données incompatibles donnent « non concluant ». Un bilan chiffré donne les valeurs, écarts, contexte saisonnier et prochaine décision, sans attribuer avec certitude un changement au lot.

## Contrôles effectués pendant cette planification

Sources locales et comportement du générateur relus ; versions/outils et résolution de la fonctionnalité vérifiés ; documentation officielle Google consultée ; tentatives publiques limitées consignées comme non vérifiées. Les futurs contrôles d’audit, de génération, de rendu et de suivi décrits ici ne sont pas encore exécutés.
