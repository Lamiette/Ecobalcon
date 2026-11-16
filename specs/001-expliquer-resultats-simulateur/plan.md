# Implementation Plan: Comprendre les résultats du simulateur

**Branch**: `setup/spec-kit-ecobalcon` | **Date**: 2026-11-01 | **Spec**: [spec.md](spec.md)

**Input**: spécification `specs/001-expliquer-resultats-simulateur/spec.md`.
Le script de setup retourne `001-expliquer-resultats-simulateur` comme identifiant
de fonctionnalité ; ce nom n'est pas une nouvelle branche Git. La branche réelle
est celle indiquée ci-dessus et correspond à la spécification existante.

**Statut** : phases de recherche et conception terminées. Ce plan ne contient ni
implémentation du site, ni tâches générées, ni résultat d'essai utilisateur.

## Summary

Permettre aux débutants de comprendre pourquoi chaque plante est suggérée, quelles
réserves s'appliquent, quand la semer ou planter et quelle action existante utiliser.
Les quatre réponses, la sélection, le classement, la limite de huit plantes et les
trois premières fiches visibles sont conservés exactement.

La solution ajoute des helpers de présentation dans `js/simulateur.js`, un texte
commun dans le panneau de résultats et des explications visibles sur chaque carte.
Les messages d'exposition inconnue et de vent fort sont composés au lieu de se
remplacer. Le résultat vide propose un accès explicite au catalogue sans conseiller
de déclarer une exposition artificielle. Les styles restent limités au simulateur.

Les décisions et alternatives sont consignées dans [research.md](research.md).
Le [modèle](data-model.md), le [contrat UI](contracts/results-ui.md) et le
[guide de validation](quickstart.md) définissent la suite de la réalisation.

## Technical Context

**Language/Version**: HTML5, CSS et JavaScript natif dans les navigateurs ; PowerShell
pour la génération existante. Node v24.17.0 disponible pour les tests locaux, Python
pour le serveur statique. Aucun runtime Node ou Python nécessaire au site publié.

**Primary Dependencies**: DOM, `Date`, `URLSearchParams`, `localStorage`, `history`,
`details/summary` natifs ; aucune nouvelle dépendance en production ni de compilation.
Tests avec `node:test`, `node:assert/strict`, `node:vm` et les modules intégrés.

**Storage**: clé `ecobalcon-simulateur` et paramètres existants, format inchangé.
Explications dérivées en mémoire ; aucune donnée personnelle ni état supplémentaire.

**Testing**: caractérisation des 3 840 cas avant/après à partir d'une référence
immuable du code actuel ; tests ciblés de rendu et transitions ; vérification du
parcours navigateur à 320, 390 et 1280 pixels, clavier et statuts ; protocole humain
distinct pour SC-001/SC-002. Le test d'affiliation existant sert de contrôle de voisinage.

**Target Platform**: navigateurs actuels sur ordinateur et mobile, site statique
français à l'URL canonique `https://ecobalcon.com/simulateur/`.

**Project Type**: site statique avec scripts classiques chargés dans l'ordre actuel.

**Performance Goals**: aucune requête réseau ni dépendance supplémentaire pour
expliquer un résultat ; traitement borné aux huit suggestions ; conserver la
soumission synchrone et l'ouverture native des compléments. Aucun objectif chiffré
de temps de réponse non mesuré n'est ajouté.

**Constraints**: données et algorithme intacts, mois capturé au chargement comme
aujourd'hui, aucun nouveau critère, aucune recherche automatique, aucun changement
de catalogue/outils/affiliation, ni refonte globale, ni publication dans cette phase.
Les périodes sont expliquées comme des repères existants, sans nouvelle expertise climatique.

**Scale/Scope**: 30 plantes, 320 combinaisons de réponses, 12 mois, huit résultats
maximum, trois affichés directement. Une page et son rendu de résultats, sans API.

## Constitution Check

Évaluation avant recherche puis après conception, selon la constitution 1.0.0.

| Principe | Avant recherche | Après conception et preuve |
| --- | --- | --- |
| I. Architecture statique | Conforme | HTML/JS/CSS existants, aucune dépendance de production nouvelle |
| II. Sources durables | Conforme | HTML direct du simulateur identifié ; CSS source puis minification existante |
| III. URLs et SEO | Conforme | Canonique, métadonnées, JSON-LD et redirections inchangés ; liens existants conservés |
| IV. Contenu utile | Conforme | Français/tutoiement, données existantes, réserves sans diagnostic inventé |
| V. Périmètre et protections | Conforme | Installation et spec préexistantes préservées ; pas de rebuild/commit/publication pendant le plan |
| VI. Vérification proportionnée | Conforme | Comparaison exhaustive exigée par FR-007, tests ciblés et essais humains distingués |

Aucune violation et aucune clarification technique non résolue. Le recrutement des
cinq débutants reste une activité de validation à organiser, avec seuils et protocole
définis ; il ne constitue pas un résultat acquis ni une exception à la constitution.

## Project Structure

### Documentation (this feature)

```text
specs/001-expliquer-resultats-simulateur/
├── spec.md                       # Existant, conservé
├── checklists/requirements.md    # Existant, qualité de la spec seulement
├── plan.md                       # Présent plan
├── research.md                   # Phase 0 : choix et provenance
├── data-model.md                 # Phase 1 : données dérivées et transitions
├── contracts/results-ui.md       # Phase 1 : affichage et interactions
└── quickstart.md                 # Phase 1 : guide de validation future
```

`tasks.md` sera créé par `$speckit-tasks` après cette phase.

### Source Code (repository root)

Fichiers prévus pour l'implémentation, sans modification dans cette phase :

```text
simulateur/index.html             # Explication commune, points d'insertion et versions JS/CSS
js/simulateur.js                  # Helpers et rendu des explications ; orchestration des messages
js/plants-data.js                 # Dépendance existante à conserver octet pour octet
css/style.css                    # Ajustements ciblés si nécessaires
css/style.min.css                # Sortie du rebuild si CSS modifié
scripts/rebuild_articles.ps1     # Outil existant, sans changement prévu
scripts/tests/
├── affiliate-tracking.test.cjs   # Test existant, sans modification prévue
├── simulateur-results.test.cjs   # Futur test de sélection/rendu/états
└── fixtures/
    └── simulateur-selection-reference.json  # Future capture de référence avant modification
```

**Structure Decision**: conserver l'organisation du dépôt et les scripts classiques.
Les nouveaux helpers résident près des fonctions de présentation existantes. Aucun
nouveau module du site, répertoire `src/`, backend ou format de catalogue n'est requis.

## Conception retenue

### Couche d'explication

Prévoir `buildResultExplanation` pour une plante et `buildSelectionExplanation` pour
le résultat global. Ces noms servent de repères de conception ; les contrats portent
sur les états et les informations décrits dans [data-model.md](data-model.md).
Les helpers consomment la sélection existante, le snapshot `filters` et le mois
existant. Ils n'appellent ni ne remplacent le calcul de sélection.

Adapter `buildSummary`, `getMatchBadges` et `renderResults` pour éviter les doublons
de texte tout en rendant chaque raison/réserve essentielle visible. Expliquer l'objectif
en plus de l'exposition. Garder les conseils, guides et boutons de pot existants.
Ne pas toucher au rendu ni aux filtres de `renderPlantLibrary`.

### Orchestration et accessibilité

Dans `runSimulation`, conserver le calcul tel quel et reconstruire les textes après
obtention des résultats. Nettoyer les anciens messages avant chaque rendu, cumuler
les limites simultanées et séparer absence de saison/absence de correspondance.
Le changement des sélecteurs conserve la sélection affichée jusqu'à soumission.
`resetSimulation` retire tout contenu explicatif nouveau.

Conserver le focus de soumission et de reset ainsi que les `role="status"` courts.
Le nouveau bouton catalogue de l'état vide reçoit un câblage explicite et un focus
vers la recherche ; ne pas compter sur les listeners initiaux des boutons outils.
Éviter le piège du conteneur `emptyState` encore masqué par `hidden`.

### Conservation du comportement

Avant le premier changement du code, capturer l'oracle des 3 840 recherches à partir
des sources et empreintes de [research.md](research.md). Comparer ensuite les noms
ordonnés à mois/réponses identiques dans le même runtime/collation française.
Les contrôles de présentation testent séparément 0, 1, 2, 3 et plus de 3 cartes,
les informations absentes et les transitions. La fixture d'une carte n'est pas une
modification du catalogue ; le calcul de référence reste indépendant du nouveau rendu.

### Génération et cache

Si le CSS change, utiliser `scripts/rebuild_articles.ps1` sans `-RebuildHome`, puis
examiner toutes les sorties générées, notamment minification et état du sitemap.
Préserver l'accueil et les modifications préexistantes. Aucun changement du générateur
n'est nécessaire au texte ou au HTML du simulateur.
Mettre à jour seulement les versions de ressources de cette page pour les assets
modifiés ; garder `sw.js` et la CSP. Contrôler le parcours avec un cache existant,
en distinguant le premier ancien HTML du nouveau HTML effectivement reçu.

## Validation et critères de sortie

La [traçabilité FR-001 à FR-010](contracts/results-ui.md#6-traçabilité) relie chaque
exigence aux scénarios V1 à V8 du [quickstart](quickstart.md).
SC-003 correspond à la matrice exhaustive ; SC-004 aux états/parcours ; SC-005 au
rendu/clavier. SC-001/SC-002 nécessitent cinq participants et les observations prévues.
Un bilan d'implémentation distingue critères vérifiés, échecs et essais non effectués.

La présente commande s'arrête à cette conception. La prochaine étape est la génération
des tâches ; aucune tâche d'implémentation ni validation humaine n'est cochée ici.

## Complexity Tracking

Aucune exception à la constitution, aucune complexité supplémentaire à justifier.
