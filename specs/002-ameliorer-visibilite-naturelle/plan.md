# Implementation Plan: Améliorer la visibilité naturelle d’EcoBalcon

**Branch**: `setup/spec-kit-ecobalcon` | **Date**: 2026-11-01 | **Spec**: [spec.md](spec.md)

**Input**: `specs/002-ameliorer-visibilite-naturelle/spec.md`.

Le setup retourne `BRANCH=002-ameliorer-visibilite-naturelle` comme identifiant de fonctionnalité de repli ; la branche Git réelle reste celle indiquée ci-dessus. Aucun changement de branche.

**Statut** : recherche et conception terminées ; diagnostic complet, sélection du lot, code et contenus restent à réaliser. Aucun `tasks.md` n’est créé par cette commande. Aucun gain organique n’est constaté par ce plan.

## Summary

Préparer un diagnostic reproductible du dépôt, le compléter par les contrôles publics accessibles et les données Search Console disponibles, puis prioriser un lot de zéro à trois actions sur cinq pages existantes au maximum. Conserver les URLs, redirections, contenus utiles et usages. L’accueil, la création d’articles, le suivi analytics et la publication restent hors modification.

L’outil prévu est un script Python local sans dépendance externe, limité à l’inventaire et aux constats statiques. La sélection éditoriale et la réception restent documentées, avec contrôle navigateur. Les exports Search Console sont facultatifs et traités sans nouvelle connexion permanente. Les sources durables et tous les effets de génération sont identifiés avant écriture. État initial et journal distinguent conformité locale, publication ultérieure autorisée et résultats observés.

Décisions et sources : [research.md](research.md). Schémas documentaires : [data-model.md](data-model.md). Contrats : [audit-cli.md](contracts/audit-cli.md) et [preservation-suivi.md](contracts/preservation-suivi.md). Validation : [quickstart.md](quickstart.md).

## Technical Context

**Language/Version**: HTML5, CSS et JavaScript natif existants ; PowerShell 5.1 pour la génération ; Python 3.14.6 disponible, bibliothèque standard pour l’audit hors production. Aucun runtime nouveau dans le site publié.

**Primary Dependencies**: Git, générateur existant, Python standard (`html.parser`, `urllib.parse`, `xml.etree.ElementTree`, `json`, `hashlib`, `unittest`). Navigateur pour la lecture et les parcours ; Search Console seulement si accès/export disponible. Ni framework, ni API, ni paquet à installer.

**Storage**: fichiers de diagnostic et de suivi sous cette fonctionnalité ; rapport JSON pour inventaire et empreintes, Markdown pour les décisions. Pas de base de données. Les exports bruts éventuels restent dans un emplacement local exclu de Git, désigné au moment du diagnostic ; les documents partagés conservent provenance et agrégats utiles, sans identifiants secrets.

**Testing**: tests ciblés du futur auditeur sur petites fixtures temporaires avec `unittest`, validation des rapports et comparaison des empreintes ; analyse syntaxique des scripts PowerShell modifiés avant exécution ; diff et contrôles des pages concernées ; navigateur ordinateur/mobile/clavier. Tests existants du simulateur seulement si ses parcours sont affectés.

**Target Platform**: site statique public `https://ecobalcon.com`, travail local Windows/PowerShell ; pas de modification d’hébergement.

**Project Type**: site web statique et outil interne de diagnostic exécuté à la demande.

**Performance Goals**: zéro requête réseau et zéro coût d’exécution ajouté aux visiteurs ; l’audit local traite tout l’inventaire une fois, sans exploration réseau automatique. Repérer les obstacles de lecture/chargement sans convertir un contrôle local en mesure de performance réelle.

**Constraints**: cinq URLs de pages modifiées, effets indirects inclus, trois actions maximum ; zéro nouvel article ; accueil conservé ; ni migration, suppression, désindexation nouvelle, modification d’identifiants de mesure, publication ou soumission automatique ; aucune garantie de positionnement.

**Scale/Scope**: observation préparatoire de 195 chemins HTML et 73 entrées sitemap ; ces nombres seront recalculés au diagnostic, sans hypothèse d’indexation. Contrôles statiques sur l’inventaire ; lecture/parcours sur au moins un exemple par famille présente et sur toutes les pages proposées pour le lot.

## Constitution Check

Contrôle d’entrée effectué avant conception ; réévaluation après conception ci-dessous. Aucune exception demandée.

| Principe | Disposition du plan | Entrée | Après conception |
| --- | --- | --- | --- |
| I — Architecture simple | Script hors production, standard Python déjà disponible ; aucun service nouveau. | Conforme | Conforme |
| II — Sources durables | Overrides articles, HTML durable des catégories, générateur pour règles globales ; copie d’essai avant génération sensible. | Conforme | Conforme |
| III — URLs et SEO | Inventaire/empreintes avant-après, variantes legacy, métadonnées et dates sincères ; aucune migration. | Conforme | Conforme |
| IV — Utilité éditoriale | Besoin lecteur et preuve avant sélection ; `prompt codex.txt` pour toute révision ; aucun texte ajouté pour un quota. | Conforme | Conforme |
| V — Périmètre et travail existant | Lot plafonné avec comptage indirect ; aucune écriture sur le simulateur ou l’accueil prévue ; état de travail préexistant conservé. | Conforme | Conforme |
| VI — Vérifications proportionnées | Fixtures du parseur, contrôles statiques et navigateur ciblés, limites explicites ; pas de nouvelle suite générale. | Conforme | Conforme |

Le plafond doit être vérifié à nouveau après le diagnostic et après toute génération d’essai. Un dépassement entraîne le report ou le remplacement de l’action, sans élargissement automatique. L’indisponibilité de GSC ou du contrôle public n’est pas une violation : elle est représentée comme limite, pas comme succès.

## Project Structure

### Documentation (this feature)

```text
specs/002-ameliorer-visibilite-naturelle/
├── spec.md
├── checklists/requirements.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── audit-cli.md
│   └── preservation-suivi.md
├── diagnostic/                 # à produire pendant la réalisation
│   ├── initial/                # inventory.json et local.md de l’auditeur
│   ├── final/                  # même format, après éventuelles corrections
│   ├── diagnostic.md           # synthèse local/public/GSC, couverture et limites
│   ├── actions.md              # classement, lot et reports
│   ├── baseline.json           # disponibilité et référence de mesure
│   ├── journal.md
│   └── validation.md
├── suivi/                      # bilans futurs, seulement après publication
└── tasks.md                    # prochaine commande, absent à ce stade
```

Les répertoires et rapports futurs montrés ci-dessus ne sont pas des livrables déjà exécutés. Les exports privés ne font pas partie de l’arborescence partagée. Si leur stockage dans le projet est nécessaire, définir d’abord une exclusion locale ciblée sans changer les règles générales du site.

### Source Code (repository root)

```text
scripts/
├── seo_audit.py                # à créer, lecture seule sur le site
├── tests/test_seo_audit.py     # à créer, fixtures temporaires ciblées
├── article-overrides.ps1       # source éventuelle pour articles sélectionnés
├── rebuild_articles.ps1        # génération existante, pas de refactor prévu
├── sitemap-state.ps1
└── sitemap-page-state.json
categories/**/index.html        # sources durables si catégorie retenue
articles/<slug>/index.html      # sorties ET sources de repli existantes
articles/index.html            # sortie indirecte possible
articles/<slug>.html            # redirection legacy
<slug>/index.html               # redirection legacy
sitemap.xml, robots.txt, manifest.json
css/style.css, css/style.min.css # conservés par défaut
index.html                     # protégé
js/, simulateur/               # conservés, travail 001 préexistant
```

**Structure Decision**: garder l’architecture actuelle. L’outil de diagnostic n’est référencé par aucune page et ses rapports ne sont ajoutés ni au sitemap ni à la navigation. Ne pas confondre fichiers versionnés, chemins physiquement servis et pages à indexer.

## Phase 0 — Recherche terminée

Les missions indépendantes ont identifié les sources et risques de génération ainsi que les limites officielles de mesure. La recherche tranche les choix techniques : inventaire local reproductible, vérification publique séparée, GSC manuelle facultative, source de chaque type de changement et suivi descriptif. Aucun choix technique n’attend de clarification. Les URLs du lot seront des résultats du diagnostic.

Les échecs d’ouverture publique de cette session sont conservés dans `research.md`. La recherche ne reprend pas les scores ou priorités de juin comme résultats actuels.

## Phase 1 — Conception terminée

### A. Diagnostic et couverture — FR-001 à FR-005, SC-001 et SC-004

Créer un auditeur local conformément au contrat CLI. Analyser les HTML du site, sitemap et robots ; résoudre les chemins relatifs avec leur URL de page et un repli `/index.html` pour les dossiers. Exclure sauvegardes, profils, dépendances, outils et rapports. Distinguer canonical déclaré, consignes d’exploration, `noindex`, redirection et indexation Google inconnue.

Produire les titres/H1/descriptions, canonicals/hreflang/OG/Twitter, erreurs de JSON-LD, liens et images internes absents, références sitemap, dates et empreintes. Détecter les erreurs et doublons à examiner sans score global, seuil universel de titre ou de nombre de mots. Le parseur ne certifie pas un résultat enrichi ni l’exécution de JavaScript.

Compléter `diagnostic.md` par un échantillon nommé pour chaque famille (accueil, articles et index, catégories, auteurs, simulateur, pages institutionnelles/contact, redirections/pages exclues selon inventaire). Pour chaque contrôle : preuve, date, environnement, résultat ou limite. Refaire les vérifications publiques accessibles ; aucun envoi de formulaire de contact ni demande d’indexation.

Si GSC est disponible, appliquer le protocole de mesure du contrat de suivi. Sinon, enregistrer cette absence et poursuivre avec des hypothèses qualifiées. Vérifier la source disponible avant de demander un export à la personne responsable.

### B. Priorisation et arrêt du périmètre — FR-006 à FR-008, SC-002

Écrire les constats et propositions dans `actions.md` avec les niveaux justifiés de bénéfice, confiance, effort et risque. Classer d’abord les obstacles d’accès ; appliquer ensuite l’ordre de la spécification sans score de précision fictive. Identifier zéro à trois actions, chaque URL directement ou indirectement affectée et les critères avant/après.

La liste d’URLs et l’état initial sont figés avant toute écriture sur le site. Si aucun candidat étayé ne respecte les plafonds, livrer un lot vide motivé et les preuves à recueillir. L’accueil et les travaux transversaux trop larges restent dans les reports.

### C. Réalisation conditionnelle et durable — FR-009 à FR-011, SC-003 et SC-007

Pour une catégorie retenue, modifier son HTML durable. Pour un article, préférer l’override du champ exact ; vérifier explicitement `Intro` si `Description` change. Tout changement de titre ou texte qui se propage aux cartes/rapprochements doit compter les destinations concernées. Ne pas lancer le script stratégique global.

Avant un rebuild, conserver une photographie de l’état de travail courant, incluant fichiers non suivis utiles, empreintes et état sitemap. Essayer la génération dans une copie isolée de cet état, avec chemins et dates préservés, pas dans un checkout de HEAD qui perdrait les modifications utilisateur. La copie n’embarque pas les profils ou exports privés. Vérifier aussi les dates si l’absence de l’historique Git dans la copie affecte leur repli.

Comparer tous les fichiers avant/après de cette copie : toute page au contenu différent compte, y compris index, auteur et redirection. Une simple réécriture identique ne compte pas. Les fichiers techniques nécessaires (sitemap et son état, CSS, robots, manifest) sont inventoriés séparément et ne doivent pas cacher un effet global. Un changement de fichier partagé qui altère le rendu ou le comportement d’autres pages compte ces pages parmi les URLs affectées. Au-delà du plafond, reporter ou réduire l’action avant application au dépôt. Ne pas filtrer arbitrairement des sorties nécessaires pour simuler un lot conforme.

Réappliquer uniquement le jeu cohérent et vérifié de sources/sorties du lot au travail courant. Avant chaque application, comparer l’empreinte de la destination à celle de la photographie initiale ; si elle a changé, réconcilier le travail concurrent avant toute écriture. Pour une nouvelle destination, vérifier qu’aucun fichier n’est apparu depuis la capture. Ne jamais restaurer globalement des changements ni remplacer des pages sources par une ancienne version. Le rebuild standard reste sans `-RebuildHome`. Examiner les sorties et `sitemap-page-state.json`, dates, cohérence des données structurées et CSP existante si des scripts intégrés ont changé.

### D. Réception et observation — FR-012 à FR-015, SC-004 à SC-007

Documenter état initial, résultats de réception et journal. Vérifier métadonnées, URLs/redirects, contenu conservé, liens/images et parcours. Contrôler les changements visibles en navigateur local à 1280 px et 390 px, puis au clavier, sur une version fraîche malgré le service worker. La réception dépend de ces contrôles, pas d’une variation de trafic.

Le statut reste `non publié` sans nouvelle demande de publication. Les échéances après publication restent non démarrées ; ne créer ni tâche planifiée ni appel réseau permanent. Si la publication est autorisée plus tard, consigner sa date, un contrôle sous sept jours et les bilans J+28/J+56. Chaque bilan indique mesures comparables, limites, saisonnalité, contexte et prochaine décision ; absence de données ou recul incomplet donne « non concluant ».

## Validation et transmission à la phase tâches

Les scénarios exécutables et résultats attendus sont dans `quickstart.md`. Réception des documents : liens locaux valides, modèle/contrats cohérents avec FR-001 à FR-015, aucune décision technique en suspens, aucune modification du site et `git diff --check` sans erreur. Les tests du futur auditeur et contrôles de pages ne sont pas présentés comme exécutés à cette phase.

La prochaine commande `$speckit-tasks` devra ordonner : photographie initiale → auditeur et contrôles ciblés → diagnostic local/public/GSC → référence et sélection du lot → changements conditionnels → réception et dossier de suivi. La publication et l’attente effective de huit semaines ne deviennent pas des tâches automatiques d’implémentation. Les bilans différés restent des engagements d’observation distincts.

Contrôles documentaires exécutés le 2026-11-01 : six artefacts relus, liens locaux valides, aucun marqueur de template non résolu et aucun espace final détecté. Deux relectures indépendantes ont vérifié les sources de génération et le protocole de mesure ; la protection des écritures concurrentes a été renforcée, sans défaut bloquant restant. `git diff --check` réussit. Les empreintes de l’accueil, de `js/simulateur.js`, de `simulateur/index.html`, du générateur et des overrides sont inchangées pendant cette commande. Aucun hook `before_plan` ou `after_plan` à exécuter : `.specify/extensions.yml` est absent aux deux vérifications.

## Complexity Tracking

Aucune violation constitutionnelle à justifier. Le seul outil ajouté est un script local avec tests ciblés, nécessaire à l’inventaire reproductible et à la vérification du périmètre. Pas de serveur, dépendance tierce, tableau de bord ou intégration permanente.
