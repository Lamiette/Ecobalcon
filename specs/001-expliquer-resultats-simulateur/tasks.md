---
description: "Tâches de réalisation pour expliquer les résultats du simulateur EcoBalcon"
---

# Tasks: Comprendre les résultats du simulateur

**Input** : [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md),
[data-model.md](data-model.md), [contrat UI](contracts/results-ui.md),
[quickstart.md](quickstart.md) et constitution EcoBalcon 1.0.0.

**Branche actuelle** : `setup/spec-kit-ecobalcon`.
**Date** : 2026-11-01.
**Statut** : code réalisé, validation navigateur et essais humains restant à terminer.
Les preuves et limites de chaque contrôle figurent dans [validation.md](validation.md).
Les cases cochées correspondent uniquement aux travaux effectivement vérifiés.

**Reprise Chrome du 2026-11-01** : selon le compte rendu transmis par l'utilisateur,
parcours, réserves, catalogue, restauration, reset, calculateurs et affichage aux trois
largeurs sont contrôlés. Restent explicitement le lecteur d'écran (T027), l'ancien
cache (T028), février au navigateur (T016 et partie de V3 en T022) et les cinq
débutants (T029). L'utilisateur confirme que le rapport ne précise pas le clavier/focus ;
T010 et T022 restent ouvertes pour ces contrôles et, pour T022, le cas de février de V3.
Voir la provenance et les limites
dans [validation.md](validation.md).

**Reprise avant commit du 2026-11-16** : les 34 tests automatisés repassent, dont
les 3 840 sélections. La liaison avec l'extension Chrome reste indisponible dans
cette session ; les contrôles clavier/focus, lecteur d'écran, cache réel et février
au navigateur ne sont pas clos. La [fiche des cinq essais](essais-debutants.md)
est prête ; aucun participant n'a été testé. Les six tâches restent ouvertes
jusqu'aux observations requises. Aucun commit ni publication effectué.

**Tests** : la spécification demande la comparaison exhaustive (FR-007/SC-003), les
vérifications des scénarios et cas limites (SC-004), le rendu/clavier (FR-010/SC-005)
et les essais de compréhension (SC-001/SC-002). Les tâches de test ci-dessous sont
limitées à ces exigences. Le socle de caractérisation doit réussir avant toute
modification applicative ; les tests de nouveaux comportements peuvent initialement
échouer jusqu'à leur réalisation. Aucune nouvelle suite générale ni validation
intermédiaire de l'utilisateur n'est imposée.

## Format: `[ID] [P?] [Story] Description`

Les cases restent ouvertes jusqu'à réalisation et vérification effectives.
`[P]` désigne les tâches prêtes à avancer sur des fichiers distincts au début de
leur phase. `[US1]`, `[US2]`, `[US3]` renvoient aux trois stories de la spécification.
Les prérequis précis et propriétaires sont indiqués plus bas.

## Path Conventions

Tous les chemins des tâches sont relatifs à la racine du dépôt. Les opérations de
fichiers des agents utilisent leurs chemins absolus résolus dans ce projet.
Les nouveaux fichiers prévus sont le test, sa référence JSON et
`specs/001-expliquer-resultats-simulateur/validation.md`, bilan de travail et de contrôles.
Ne créer ni backend, ni framework, ni nouveau catalogue, ni configuration de build.
Préserver les modifications préexistantes et les documents de conception.

## Phase 1: Setup — État initial

**But** : disposer d'une référence fiable sans réinstaller Spec Kit ni changer le site.

- [X] T001 Relever dans `specs/001-expliquer-resultats-simulateur/validation.md` l'état Git initial, les versions Node/ICU/Python et les empreintes des sources `js/simulateur.js`, `js/plants-data.js`, `simulateur/index.html`, `css/style.css`, `css/style.min.css` et `index.html` ; vérifier le commit et les blobs de `research.md`, signaler toute divergence avant la capture sans écraser le travail existant, et noter que « Les 30 objets de `js/plants-data.js` restent inchangés. »

## Phase 2: Foundational — Référence de comportement bloquante

**But** : caractériser la sélection réelle avant toute édition applicative.
Ordre strict T002 → T003 → T004 ; aucune story ne commence avant ce checkpoint.

- [X] T002 Créer le harness dans `scripts/tests/simulateur-results.test.cjs` avec `node:test`, `node:assert/strict`, `node:vm`, un DOM minimal, URL/history/stockage simulés et une Date fixée au 15 de chaque mois à midi local ; charger les vrais scripts `js/plants-data.js` puis `js/simulateur.js`, capturer les résultats de `runSimulation` sans recopier le filtrage, le score ou le tri et sans ajouter d'export de production.
- [X] T003 Capturer dans `scripts/tests/fixtures/simulateur-selection-reference.json`, à l'aide du harness T002 et du code encore intact, les 3 840 tuples de réponses/mois et leurs noms de plantes ordonnés ; inclure commit, empreintes des deux scripts, versions Node/ICU et collation française ; garder la génération explicite, hors du chemin normal des tests, et ne jamais remplacer cette référence depuis du code modifié pour masquer un échec.
- [X] T004 Ajouter puis exécuter dans `scripts/tests/simulateur-results.test.cjs` la comparaison des 320 combinaisons sur chacun des douze mois avec la référence T003 ; vérifier noms, ordre et limite de huit, caractériser la répartition trois cartes + dépliage séparément du seul calcul, puis consigner le succès initial et les données inchangées dans `specs/001-expliquer-resultats-simulateur/validation.md` avant toute modification du site.

**Checkpoint** : référence indépendante figée et comparaison initiale réussie.
L'oracle de sélection ne remplace pas les futurs contrôles de DOM et de navigateur.

## Phase 3: User Story 1 — Comprendre pourquoi ces plantes sont proposées (P1, MVP)

**But** : rendre lisibles les raisons et réserves des suggestions et le rôle des critères.

**Test indépendant** : avec soleil/légumes/vent fort/petit en novembre, retrouver
le résumé des réponses, distinguer sélection et classement, lire les réserves de
Blette, Épinard, Concombre et Courgette avant ouverture des conseils, sur les cartes
directes comme dépliées. La référence de sélection doit rester identique.
L'évaluation humaine SC-001 est réalisée dans T029, sans être présumée par ce contrôle.

### Tests de l'US1

- [X] T005 [P] [US1] Ajouter dans `scripts/tests/simulateur-results.test.cjs` les attentes du contrat UI sur résumé de la recherche, rôle exposition/objectif versus vent/place/mois, limite de huit, raisons connues et réserves textuelles visibles ; vérifier séparément les rendus à 1, 2, 3 et plus de 3 cartes, le nombre annoncé au dépliage et l'absence de faux accord pour un critère ouvert, avec fixture synthétique d'une carte sans modifier le catalogue.

### Réalisation de l'US1

- [X] T006 [P] [US1] Ajouter dans `simulateur/index.html`, à l'intérieur de `resultsPanel` et près de `summary`, un bloc visible `resultsExplanation` expliquant le rôle des critères et les huit suggestions maximum ; préserver tous les IDs existants, le résumé court `role="status"`, les actions et les métadonnées ; ne pas mettre ce texte essentiel dans un disclosure ni rendre les cartes live.
- [X] T007 [US1] Introduire les helpers de présentation dans `js/simulateur.js` après T005/T006, en consommant les valeurs existantes sans changer leur validation : exposition « `""`, `soleil`, `mi-ombre`, `ombre` », objectif « `""`, `aromatiques`, `legumes`, `fleurs`, `facile` », vent « `""`, `abrite`, `modere`, `fort` », place « `""`, `petit`, `moyen`, `grand` » ; appliquer « Un critère ouvert ne correspond jamais à une condition confirmée. » et « Les explications reçoivent cet objet, sans relire directement les champs du formulaire. » ; pour le vent, appliquer « `correspondance` si réponse connue incluse dans `wind` ; sinon `reserve` ; réponse vide = `inconnu` », et pour la place « Même règle à partir de `space` ; réserve textuelle si le choix ne correspond pas » ; respecter « Il n'ajoute aucun score, ne filtre pas et n'ordonne pas la sélection. »
- [X] T008 [US1] Brancher ces helpers dans `buildSummary`, `getMatchBadges` et `renderResults` de `js/simulateur.js` : relier chaque carte à l'exposition et à l'objectif connus, afficher les correspondances/réserves vent/place sans promesse absolue, rappeler la recherche utilisée et donner le même contenu essentiel aux cartes dépliées ; conserver la chaîne de sélection, le tri, les huit résultats et les trois cartes initiales, sans toucher à `renderPlantLibrary` ni aux conseils/guides/boutons existants.
- [X] T009 [US1] Réutiliser les classes existantes et, seulement si nécessaire pour cet incrément, compléter `css/style.css` avec des règles limitées au simulateur pour les textes et réserves ; si cette source change, analyser le script et lancer `scripts/rebuild_articles.ps1` sans `-RebuildHome` pour synchroniser `css/style.min.css`, relire toutes les sorties et vérifier l'accueil préservé avant de tester le rendu servi.
- [ ] T010 [US1] Exécuter le test de référence et les attentes US1 de `scripts/tests/simulateur-results.test.cjs`, vérifier uniquement les assertions US1 de V2 du `quickstart.md` (résumé, raisons, réserves, ordre et dépliage) et les contrôles techniques clavier/mobile de V8 applicables aux actions déjà présentes, avec les ressources réellement fraîches ; différer les attentes de saison à T016 et le nouveau bouton catalogue à T022, relire les textes français au tutoiement, puis inscrire les résultats et limites dans `specs/001-expliquer-resultats-simulateur/validation.md` et corriger les écarts avant le checkpoint US1.

**Checkpoint MVP** : raisons et réserves compréhensibles sur toutes les cartes,
sans variation de sélection. Cet incrément peut être démontré localement ; il ne
constitue pas la réalisation des US2/US3 ni la preuve d'un succès auprès de cinq débutants.

## Phase 4: User Story 2 — Savoir quoi vérifier avant de se lancer (P2)

**But** : distinguer adaptation et période, expliciter pot/difficulté et conserver
les prochaines actions. Dépend du rendu commun de l'US1, pas de l'US3.

**Test indépendant** : cas de novembre sans suggestion de saison, cas mixte de
février et fiches avec/sans métadonnées ; retrouver les périodes, le volume minimal,
la difficulté et les actions. Un hors-saison peut précéder un saisonnier.

### Tests de l'US2

- [X] T011 [P] [US2] Ajouter dans `scripts/tests/simulateur-results.test.cjs` les attentes dans/hors période, aucune suggestion de saison et cas mixte de février ; tester période absente ou vide, volume absent/non positif/non fini et difficulté absente/vide avec copies de fiches réservées au rendu ; vérifier conseils, guide conditionnel, `data-pot-plant`, plan de démarrage et accessoires sans altérer `js/plants-data.js`.

### Réalisation de l'US2

- [X] T012 [P] [US2] Compléter le bloc `resultsExplanation` dans `simulateur/index.html` avec la portée indicative du calendrier et la définition simple de semer dès sa première utilisation : faire démarrer une plante à partir de graines ; préciser semis/plantation plutôt que récolte, sans ajouter de nouveau conseil climatique ni modifier les champs du formulaire.
- [X] T013 [US2] Étendre les helpers dans `js/simulateur.js` avec les états `dansPeriode`, `horsPeriode`, `periodeInconnue` en utilisant seulement les `months` existants et le `currentMonth` capturé au chargement ; appliquer « Une période absente ou vide signifie « Période de semis ou plantation à vérifier ». » et « Si certaines périodes sont inconnues, préciser que le calendrier reste à vérifier pour ces fiches ; ne pas déclarer toutes les plantes certainement hors période. » ; ne pas modifier `isPlantableNow`, les périodes, le bonus saisonnier ou la fréquence de calcul du mois.
- [X] T014 [US2] Adapter le résumé et les notes saisonnières de `js/simulateur.js` pour compter les plantes de saison parmi la sélection retournée, afficher explicitement l'absence de suggestion de saison lorsqu'elle est non vide et conserver les périodes hors saison ; décrire le mois comme un facteur de priorité qui ne garantit pas tous les saisonniers en premier, sans confondre cette absence avec un résultat vide ni écraser les autres messages.
- [X] T015 [US2] Adapter les faits visibles de `renderResults` dans `js/simulateur.js` pour présenter période, volume minimal du pot et difficulté de culture ; appliquer « Valeur finie positive connue ; sinon texte « Volume minimal du pot à vérifier » » et « Texte connu non vide ; sinon « Difficulté de culture à vérifier » » ; préserver conseils, guide lorsqu'il existe, calcul du pot, plan et recommandations, sans valeur inventée ni lien fictif, en réutilisant les styles existants.
- [ ] T016 [US2] Exécuter les tests US1/US2 et la référence dans `scripts/tests/simulateur-results.test.cjs`, vérifier les assertions saisonnières de V2, les périodes et métadonnées absentes de V3 et les actions de V7 du `quickstart.md` (notamment Basilic 5 L et avril à juillet en novembre, et Pois nain saisonnier derrière plusieurs hors-saison en février) ; différer les messages cumulés, l'exploration générale et les transitions de reprise à T022, puis consigner résultat, mois contrôlé et limites dans `specs/001-expliquer-resultats-simulateur/validation.md`.

**Checkpoint** : saison et informations pratiques lisibles sans nouvelle règle de
sélection ; US1 et actions existantes toujours fonctionnelles. SC-002 reste à mesurer en T029.

## Phase 5: User Story 3 — Comprendre malgré des réponses incomplètes (P2)

**But** : expliquer les limites cumulées, proposer une sortie utile du vide et garder
les explications cohérentes après édition, reprise ou réinitialisation.

**Test indépendant** : exposition inconnue + vent fort ensemble, exploration sans
réponses, passage non vide → vide, changement sans relance puis relance, reprise URL
et stockage et reset ; contrôler chaque message et chaque focus attendu.

### Tests de l'US3

- [X] T017 [P] [US3] Ajouter dans `scripts/tests/simulateur-results.test.cjs` les attentes V3 à V6 : exposition inconnue + vent fort cumulés, objectif ouvert sans priorité inventée, aucune réponse, non vide → vide et accès catalogue ; tester changement sans soumission, relance, reset, URL partielle/complète prioritaire, stockage valide/corrompu/inaccessible, valeurs non reconnues et focus (titre à la soumission, objectif au reset, recherche au catalogue, aucun focus forcé à la restauration).

### Réalisation de l'US3

- [X] T018 [P] [US3] Préparer dans `simulateur/index.html` le contenu de `emptyState` et un bouton explicite `resultsLibraryBtn` de type `button` hors formulaire pour explorer le catalogue ; garder le conteneur masqué au chargement et conserver les IDs des outils, de `plantSearch` et du panneau de résultats ; le câblage et la gestion de `hidden` sont réalisés en T020.
- [X] T019 [US3] Composer dans `js/simulateur.js` les messages de la recherche depuis le snapshot et les limites applicables, au lieu d'écritures successives dans `noteEl` : garder ensemble exposition inconnue, vent fort et absence de saison, expliquer l'exploration sans réponse et ne confirmer aucun critère ouvert ; vider les messages avant chaque nouvelle recherche en conservant les explications de l'ancienne recherche pendant les seules modifications du formulaire.
- [X] T020 [US3] Traiter l'état vide dans `runSimulation` de `js/simulateur.js` en effaçant cartes et messages périmés, en masquant plan/accessoires et en gérant explicitement `emptyState.hidden` à chaque branche plutôt que `style.display` seul ; proposer de revoir l'objectif ou les choix inconnus sans fausser l'exposition, puis câbler `resultsLibraryBtn` avec un listener explicite vers `showTool("library")` et le focus sur `plantSearch`.
- [X] T021 [US3] Intégrer le nettoyage des nouveaux contenus et états dans `resetSimulation` et les chemins de relance/restauration de `js/simulateur.js` ; préserver `readSavedFilters`, les règles de priorité/assainissement, les quatre réponses sauvegardées, la clé `ecobalcon-simulateur`, les paramètres d'URL et les replis ; appliquer « Le mois n'est ni enregistré ni ajouté à l'URL. Un nouveau chargement le recalcule. » et conserver la soumission explicite, le statut de modification et les focus existants.
- [ ] T022 [US3] Exécuter les tests de sélection et d'états de `scripts/tests/simulateur-results.test.cjs`, vérifier V3/V4/V5/V6 au navigateur avec les ressources fraîches, dont activation clavier du bouton catalogue et réinitialisation après un résultat vide, puis consigner les observations dans `specs/001-expliquer-resultats-simulateur/validation.md` sans déclarer validé un parcours seulement simulé par le harness.

**Checkpoint** : les trois stories fonctionnent, les réserves périmées disparaissent
et aucun chemin n'ajoute de stockage ou de condition de recherche.

## Phase 6: Polish & Cross-Cutting Concerns — Validation finale

**But** : contrôler l'ensemble intégré et produire un bilan fidèle, sans publication.

- [X] T023 Relire les nouveaux textes de `simulateur/index.html` et `js/simulateur.js` contre FR-001 à FR-010 et `contracts/results-ui.md` : tutoiement, raisons réelles, termes définis, réserves textuelles, dates sans promesse et métadonnées absentes à vérifier ; finaliser si nécessaire les styles limités au simulateur dans `css/style.css`, sans changer catalogue, algorithme, recommandations ou autres outils.
- [X] T024 Synchroniser et vérifier `css/style.min.css` par `scripts/rebuild_articles.ps1` uniquement si `css/style.css` a changé depuis la dernière génération ; analyser le script avant exécution, conserver l'accueil sans `-RebuildHome`, examiner chaque sortie générée et l'état du sitemap, comparer à l'état initial et documenter les changements pertinents dans `specs/001-expliquer-resultats-simulateur/validation.md` ; sans changement CSS, constater la synchronisation sans lancer de rebuild inutile.
- [X] T025 Mettre à jour dans `simulateur/index.html` la version de l'URL de `js/simulateur.js` et, si modifiée, celle de `css/style.min.css` pour servir les nouvelles ressources ; préserver les chemins, la CSP, les métadonnées et données structurées ainsi que `sw.js`, les identifiants de suivi et les données plantes.
- [X] T026 Exécuter `node --check js/simulateur.js`, `node --test scripts/tests/simulateur-results.test.cjs` et `node --test scripts/tests/affiliate-tracking.test.cjs` ; confirmer les 3 840 résultats ordonnés, les contrôles de rendu/états et l'intégrité de la référence JSON, puis consigner commandes, runtime et résultats réels dans `specs/001-expliquer-resultats-simulateur/validation.md`.
- [ ] T027 Effectuer V8 du `quickstart.md` sur la page servie à 320 × 844, 390 × 844 et 1280 × 900 : toutes les réserves et actions lisibles sans troncature/débordement, parcours Tab/Maj+Tab/Entrée/Espace, focus de soumission/reset/catalogue, disclosures et annonces courtes de statut sans région live sur les cartes ; noter observations, outils et limites dans `specs/001-expliquer-resultats-simulateur/validation.md` et corriger les échecs avant clôture technique.
- [ ] T028 Vérifier V7 et le parcours de cache du `quickstart.md` : conseils/guides/pot/plan/accessoires conservés, filtres du catalogue et autres outils inchangés, puis session avec ancien cache et réception du nouveau HTML/nouvelles URL d'assets sans désactivation globale du service worker ; enregistrer les contrôles et limites dans `specs/001-expliquer-resultats-simulateur/validation.md` sans déclencher d'achat.
- [ ] T029 Réaliser avec les mêmes cinq débutants le protocole V8 du `quickstart.md`, lire les deux consignes avant affichage sans expliquer le simulateur et mesurer les deux exercices depuis le même instant d'apparition des résultats, sans remettre le chronomètre à zéro après la première réponse, puis inscrire dans `specs/001-expliquer-resultats-simulateur/validation.md` des observations anonymisées : SC-001 exige au moins quatre réussites sur cinq en moins d'une minute pour raison réelle et sélection/classement ; SC-002 exige au moins quatre sur cinq en moins de deux minutes pour adaptation/saison, réserve et prochaine action ; si les participants ne sont pas disponibles, signaler ces critères non évalués et garder cette tâche ouverte, sans simuler les personnes ni contacter des tiers automatiquement.
- [X] T030 Relire le diff final et exécuter `git diff --check`, vérifier `js/plants-data.js`, `index.html`, les métadonnées et les fichiers protégés contre T001, confirmer l'oracle et les contrôles techniques, puis finaliser `specs/001-expliquer-resultats-simulateur/validation.md` en distinguant critères réussis, échecs et essais humains non effectués ; mettre à jour les cases de ce `specs/001-expliquer-resultats-simulateur/tasks.md` seulement selon les preuves, sans commit, push, `publish.bat` ni déploiement non demandés.

## Dependencies & Execution Order

### Dépendances de phases

```text
T001 → T002 → T003 → T004
                         ↓
                US1 : T005 à T010
                         ↓
                US2 : T011 à T016
                         ↓
                US3 : T017 à T022
                         ↓
                T023 → T024 → T025 → T026 → T027 → T028
                                                          ↓
                                                T029 (essais humains)
                                                          ↓
                                                T030 (bilan global)
```

T030 peut produire le bilan technique après T028 même si T029 attend des participants,
mais doit alors laisser T029 ouverte et SC-001/SC-002 non évalués : la fonctionnalité
ne peut pas être déclarée conforme à tous les critères de succès.
Une correction en finalisation déclenche à nouveau les contrôles pertinents, la
minification si le CSS change et le contrôle des versions avant le bilan.

### Dépendances dans les stories

| Story | Entrée | Parallélisme initial | Suite séquentielle |
| --- | --- | --- | --- |
| US1 | T004 réussi | T005 et T006 | T007 → T008 → T009 → T010 |
| US2 | T010 réussi | T011 et T012 | T013 → T014 → T015 → T016 |
| US3 | T016 réussi | T017 et T018 | T019 → T020 → T021 → T022 |

L'US2 réutilise les helpers de l'US1 ; l'US3 réutilise leur composition saisonnière.
Chaque story possède son propre test d'acceptation et peut être démontrée après son
checkpoint, même si les fichiers partagés imposent une intégration séquentielle.
Ne pas lancer simultanément les modifications des différentes stories dans
`js/simulateur.js` ou `scripts/tests/simulateur-results.test.cjs`.

### Répartition des fichiers entre agents

- Un seul propriétaire de `js/simulateur.js` à la fois.
- Un propriétaire du fichier de tests ; la référence JSON est figée après T003.
- Un propriétaire HTML distinct peut travailler sur T006/T012/T018 après stabilisation
  des noms/contrats indiqués, en parallèle des seuls tests de la même phase.
- Un seul responsable de la génération CSS et de la relecture des sorties ; aucun
  rebuild ne tourne en parallèle d'autres écritures du site.
- Un seul rédacteur à la fois pour `validation.md` et les cases de `tasks.md` ; les
  autres agents transmettent leurs observations au coordinateur.
- Les relectures sans écriture peuvent avancer indépendamment.

## Parallel Example: User Story 1

Après T004, lancer ensemble T005 (tests de l'US1 dans le fichier de tests) et T006
(explication commune dans le HTML). Le contrat `resultsExplanation` est convenu ici.
Attendre leurs résultats avant T007/T008 ; aucune seconde écriture du JavaScript
de production n'est lancée en parallèle.

## Parallel Example: User Story 2

Après T010, lancer ensemble T011 (attentes saison/valeurs absentes/actions dans le
fichier de tests) et T012 (définition de semer et portée du calendrier dans le HTML).
Intégrer ensuite les modifications du helper et du rendu dans l'ordre T013 à T015.

## Parallel Example: User Story 3

Après T016, lancer ensemble T017 (attentes de transitions dans le fichier de tests)
et T018 (bouton statique `resultsLibraryBtn` dans le HTML). Attendre les deux avant
la composition des messages et le câblage du bouton dans T019/T020.

## Implementation Strategy

### MVP First — US1

Réaliser T001 à T010 pour un premier incrément local expliquant pourquoi les plantes
sont proposées. Vérifier la référence de sélection et la lecture des cartes avant
d'élargir le travail. Si une démonstration est faite à ce stade, utiliser les nouvelles
ressources JS/CSS réellement reçues ; le versionnement ciblé de T025 peut être anticipé
pour l'incrément, puis réactualisé après les derniers changements. Cela n'autorise
aucune publication et ne vaut pas validation humaine de SC-001.

### Livraison incrémentale

Ajouter l'US2 puis l'US3, en réexécutant les tests précédents à chaque checkpoint.
Réutiliser les composants existants et limiter les changements aux sorties de
résultats. Les besoins de CSS d'un incrément sont synchronisés avant sa validation
navigateur ; ne pas présenter un rendu de CSS source non servi comme celui du site.
La validation finale couvre les trois stories et tous les critères ; elle ne se
substitue pas à l'évaluation de compréhension avec des participants réels.

## Traçabilité et résumé

| Exigence | Tâches principales |
| --- | --- |
| FR-001 | T005, T007, T008, T017, T019, T021, T022 |
| FR-002 | T005, T006, T008, T012, T014 |
| FR-003 | T005, T007, T008, T010 |
| FR-004 | T011 à T016, T019 |
| FR-005 | T011, T013, T015, T016, T028 |
| FR-006 | T017 à T022 |
| FR-007 / SC-003 | T001 à T004, T010, T016, T022, T026 |
| FR-008 | T011, T015 à T022, T028 |
| FR-009 | T006 à T008, T012 à T015, T019, T023 |
| FR-010 / SC-005 | T005, T009, T010, T017, T020, T022, T027 |
| SC-001 / SC-002 | T029 |
| SC-004 | Tests et checkpoints des trois stories, T026 à T028 |

**Décompte** : 30 tâches, dont 6 pour US1, 6 pour US2, 6 pour US3 et 12 communes
(setup, fondations et finalisation). Six tâches marquées `[P]` forment trois paires
indépendantes, une par story. Chaque tâche possède un ID, une case et au moins un
chemin de fichier ; toutes les tâches des stories portent leur label.
