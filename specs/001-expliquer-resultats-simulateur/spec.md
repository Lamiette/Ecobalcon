# Feature Specification: Comprendre les résultats du simulateur

**Feature Branch**: `setup/spec-kit-ecobalcon` (branche courante ; aucune branche créée pour cette spécification)

**Created**: 2026-11-01

**Status**: Draft

**Input**: User description: « Améliorer la compréhension des résultats du simulateur pour les débutants, en conservant ses critères et son fonctionnement actuels. »

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Comprendre pourquoi ces plantes sont proposées (Priority: P1)

Une personne qui débute obtient sa sélection et comprend le lien entre ses réponses et les plantes proposées. Elle distingue les conditions qui sélectionnent les plantes des préférences qui influencent leur ordre, sans devoir connaître un calcul de classement.

**Why this priority**: Comprendre ce qui justifie une suggestion est le premier besoin pour décider.

**Independent Test**: Obtenir une sélection avec une exposition et un objectif renseignés, puis demander à une personne débutante d'expliquer pourquoi une plante apparaît et pourquoi certaines suggestions demandent une précaution.

**Acceptance Scenarios**:

1. **Given** une exposition et un objectif renseignés, **When** la personne lance la recherche, **Then** elle retrouve ses réponses dans le résumé et lit une explication indiquant que les plantes proposées correspondent à ces deux choix.
2. **Given** un vent et une place renseignés, **When** la sélection apparaît, **Then** la personne comprend que ces réponses influencent la priorité des suggestions sans exclure systématiquement une plante, et repère les réserves applicables au vent ou à la place sur chaque suggestion concernée.
3. **Given** plusieurs plantes proposées, **When** la personne découvre les premières suggestions puis les suivantes, **Then** elle comprend qu'il s'agit d'une sélection limitée à huit plantes, présentée dans l'ordre de priorité existant, et accède aux mêmes explications sur toutes les fiches.

---

### User Story 2 - Savoir quoi vérifier avant de se lancer (Priority: P2)

La personne distingue une plante adaptée à ses réponses d'une plante à semer ou planter pendant le mois en cours. Elle comprend les repères de pot et de difficulté, puis trouve une action existante pour préparer son choix.

**Why this priority**: Les explications doivent aider à prendre une décision réaliste sans promettre une réussite ni une plantation immédiate.

**Independent Test**: Consulter une sélection comprenant une plante de saison et une plante hors période, puis identifier pour chacune la période, le volume minimal du pot et une prochaine action disponible.

**Acceptance Scenarios**:

1. **Given** une plante dont la période inclut le mois courant, **When** la personne consulte sa fiche, **Then** elle comprend que le repère saisonnier concerne le semis ou la plantation et reste indicatif pour son balcon ; il ne décrit ni une récolte ni une garantie de réussite.
2. **Given** une plante hors période, **When** la personne consulte sa fiche, **Then** sa période connue est lisible et elle comprend pourquoi cette suggestion peut rester présente sans être à planter ce mois-ci.
3. **Given** une fiche de plante, **When** la personne prépare son choix, **Then** elle comprend que le volume en litres est un minimum pour le pot et que la difficulté concerne la culture ; elle retrouve les conseils, le calcul du pot et le guide dédié lorsqu'il existe.
4. **Given** aucune suggestion à planter pendant le mois courant, **When** la personne consulte les résultats, **Then** elle lit explicitement cette absence de suggestion de saison, sans confusion avec une absence totale de correspondance, et peut consulter les périodes et les conseils existants.

---

### User Story 3 - Comprendre les résultats malgré des réponses incomplètes (Priority: P2)

La personne peut explorer sans connaître tous les détails de son balcon. Elle sait quelles informations manquent, comprend un résultat vide et retrouve des explications cohérentes lorsqu'elle actualise ses réponses ou reprend une simulation sauvegardée.

**Why this priority**: Les débutants peuvent ignorer leur exposition ou leurs contraintes ; une explication trop affirmative leur ferait croire que ces conditions ont été vérifiées.

**Independent Test**: Lancer sans exposition, puis avec vent fort, changer un choix sans relancer, actualiser, reprendre une simulation enregistrée et recommencer. Vérifier séparément un cas sans correspondance.

**Acceptance Scenarios**:

1. **Given** une exposition inconnue, avec ou sans vent fort renseigné, **When** la personne lance la recherche, **Then** elle comprend que les suggestions restent à affiner en observant le soleil direct ; l'information sur le vent ne masque pas cette limite.
2. **Given** aucun critère renseigné, **When** la personne lance la recherche, **Then** elle reçoit les suggestions prévues par le fonctionnement actuel et une explication d'exploration générale qui ne prétend pas connaître son balcon.
3. **Given** une combinaison sans correspondance, **When** la personne lance la recherche, **Then** le résultat précise que la combinaison n'a pas de correspondance dans le catalogue actuel et indique comment modifier ses choix ou explorer le catalogue, sans conseiller de déclarer une exposition différente de celle observée.
4. **Given** une sélection déjà affichée, **When** la personne modifie un choix sans relancer, **Then** elle voit que les résultats correspondent encore à la dernière recherche ; après relance, les explications correspondent aux réponses actualisées et ne conservent aucune réserve devenue inapplicable.
5. **Given** des choix repris depuis un lien ou une sauvegarde locale, **When** la sélection est restaurée, **Then** les explications correspondent aux choix restaurés et à la saison du moment selon le comportement actuel.
6. **Given** une simulation affichée, **When** la personne choisit « Recommencer », **Then** les choix et les résultats sont effacés selon le parcours actuel et aucune explication de l'ancienne sélection ne reste affichée.

### Edge Cases

- Exposition, vent ou place inconnus : ne jamais présenter ces conditions comme validées ; garder l'exploration possible.
- Exposition inconnue et vent fort simultanés : rendre les deux limites perceptibles ensemble.
- Plante proposée malgré un vent ou une place défavorables : expliquer la réserve sans supprimer ni rétrograder autrement la plante.
- Aucune plante de saison : distinguer la préparation d'une future plantation de la disponibilité de suggestions adaptées aux réponses.
- Une, deux ou trois suggestions : ne pas annoncer de suggestions supplémentaires inexistantes ; au-delà de trois, conserver l'accès aux autres jusqu'à la limite actuelle de huit.
- Période, volume ou difficulté absents d'une fiche : indiquer que l'information reste à vérifier, sans inventer une valeur ou une compatibilité.
- Aucun résultat après une sélection non vide : ne pas laisser d'explications ou de fiches issues de la recherche précédente.
- Stockage local indisponible, choix sauvegardés non reconnus ou lien avec réponses partielles : conserver les replis existants et expliquer seulement les choix effectivement retenus.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Les résultats DOIVENT rappeler les réponses de la dernière recherche, distinguer les choix non renseignés des conditions vérifiées et ne pas anticiper les réponses modifiées avant une nouvelle recherche. Acceptation : scénarios 1.1, 3.1, 3.2 et 3.4.
- **FR-002**: Une explication accessible depuis les résultats DOIT distinguer le rôle de l'exposition et de l'objectif dans la sélection, le rôle du vent et de la place dans le classement, et la priorité donnée aux plantes de saison. Elle DOIT préciser que la liste comporte au plus huit suggestions et n'est pas le catalogue exhaustif. Acceptation : scénarios 1.1 à 1.3 et 2.2.
- **FR-003**: Chaque suggestion DOIT relier sa présence aux réponses connues, rendre lisibles les correspondances et les réserves applicables au vent et à la place, et ne jamais transformer une information inconnue en accord confirmé. Les explications essentielles DOIVENT être lisibles sans ouvrir les conseils détaillés. Acceptation : scénarios 1.1, 1.2 et cas de conditions inconnues ou défavorables.
- **FR-004**: Chaque suggestion DOIT distinguer sa pertinence pour les réponses de sa période de semis ou plantation. Les résultats DOIVENT signaler explicitement quand aucune suggestion n'est de saison ; les repères calendaires restent indicatifs et ne promettent ni récolte immédiate ni réussite. Acceptation : scénarios 2.1, 2.2 et 2.4.
- **FR-005**: Les explications DOIVENT permettre de comprendre le volume minimal du pot en litres et le niveau de difficulté, et conserver l'accès aux conseils, au calcul du pot, au plan pour démarrer et aux guides déjà disponibles. Une information absente DOIT rester présentée comme à vérifier. Acceptation : scénario 2.3 et cas de données absentes.
- **FR-006**: Les réponses incomplètes et l'absence de correspondance DOIVENT recevoir une explication de leur portée et une prochaine action disponible. Les limites simultanées DOIVENT rester lisibles ensemble. Aucun message ne DOIT suggérer de fausser les conditions réelles du balcon. Acceptation : scénarios 3.1 à 3.3.
- **FR-007**: L'évolution DOIT conserver les quatre critères et leurs valeurs actuelles, leur caractère facultatif, les données des plantes, les règles de sélection, les pondérations et départages du classement, ainsi que le rôle actuel du mois courant. À réponses et mois identiques, les mêmes plantes DOIVENT apparaître dans le même ordre, avec la limite de huit et les trois premières visibles avant dépliage. Acceptation : comparaison avec le fonctionnement de référence pour toutes les combinaisons valides et tous les mois.
- **FR-008**: L'évolution DOIT conserver le lancement explicite, l'avertissement après modification des choix, les liens de reprise, la sauvegarde locale et sa restauration, la réinitialisation, les filtres du catalogue, les autres outils et les recommandations de contenants et accessoires. Elle ne DOIT ajouter ni question obligatoire, ni compte, ni étape bloquante pour obtenir une sélection. Acceptation : scénarios 3.4 à 3.6 et reprise des parcours existants, y compris sans stockage disponible.
- **FR-009**: Les nouvelles explications DOIVENT être rédigées en français, au tutoiement, avec des mots courants ; tout terme horticole nécessaire DOIT être expliqué à sa première utilisation dans le résultat. Elles DOIVENT s'appuyer sur les réponses et informations existantes, sans ajouter de diagnostic climatique, de compatibilité ou de conseil horticole non étayé. Acceptation : relecture de tous les nouveaux textes, y compris états vides et réserves.
- **FR-010**: Les explications essentielles et les actions existantes DOIVENT rester lisibles sur ordinateur et sur mobile dès 320 pixels de largeur, sans défilement horizontal ni texte tronqué. Toute commande d'explication ajoutée DOIT être utilisable au clavier avec un focus visible et un intitulé explicite ; une réserve ne DOIT pas être indiquée uniquement par une couleur ou un pictogramme. Le parcours clavier existant vers les résultats et après réinitialisation DOIT être conservé. Acceptation : lecture et parcours complets sur ordinateur, mobile et au clavier, avec puis sans résultats.

### Key Entities *(include if feature involves data)*

- **Réponses de simulation** : exposition, objectif, vent et place, chacun pouvant rester non renseigné ; les explications distinguent la dernière recherche des modifications en attente.
- **Suggestion de plante** : plante déjà présente dans le catalogue, position dans la sélection, caractéristiques connues, correspondances, réserves, période de semis ou plantation et actions existantes.
- **Explication de résultat** : mise en mots des raisons et limites de la sélection ; dépend des réponses effectivement utilisées, des informations de la plante et du mois de référence, sans constituer un nouveau critère.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Lors d'une évaluation avec cinq personnes débutant le jardinage sur balcon, au moins quatre peuvent, en moins d'une minute après affichage, expliquer une raison réelle de présence d'une plante et distinguer une condition de sélection d'une préférence de classement, sans aide extérieure.
- **SC-002**: Sur les mêmes cinq personnes, au moins quatre distinguent correctement une suggestion adaptée d'une suggestion à planter ce mois-ci, identifient une réserve applicable et trouvent une prochaine action existante en moins de deux minutes, sur des résultats couvrant ces situations.
- **SC-003**: Pour 100 % des combinaisons valides de réponses, y compris les choix ouverts, sur chacun des douze mois, la sélection conserve les mêmes plantes, le même ordre et les mêmes limites de présentation que le fonctionnement de référence.
- **SC-004**: Tous les scénarios d'acceptation et cas limites disposent d'une vérification concluante, notamment l'exposition inconnue avec vent fort, l'absence de correspondance, l'absence de suggestion de saison, la reprise des choix et la réinitialisation.
- **SC-005**: À 320 et 390 pixels de largeur sur mobile et à 1280 pixels sur ordinateur, toutes les explications sont lisibles sans perte d'information ni défilement horizontal ; toutes les commandes du parcours de résultats peuvent être atteintes et activées au clavier, avec un focus visible.

## Assumptions

- Le périmètre est le résultat du parcours « Que planter sur ton balcon ? » sur la page du simulateur. Les calculateurs de pot, d'absence et de compost, le catalogue et ses filtres conservent leur fonctionnement et leur contenu ; seuls leurs accès existants depuis les résultats sont à préserver.
- L'amélioration attendue est une explication ciblée des résultats existants. La refonte du formulaire, de nouveaux critères, une nouvelle notation, un nouveau catalogue, la personnalisation géographique et une refonte générale du site sont hors périmètre.
- Le fonctionnement constaté au 1er novembre 2026 sert de référence : exposition et objectif sélectionnent les plantes ; vent, place et mois influencent leur priorité sans les exclure. Une suggestion peut donc demander une protection ou plus de place, ou concerner une autre période. Les égalités suivent le départage actuel.
- Les périodes existantes sont des repères de semis ou plantation pour la France métropolitaine. L'évolution explique leur portée sans recalculer les périodes ni recueillir de localisation supplémentaire.
- Les sources de contexte sont [le parcours actuel](../../simulateur/index.html), [son comportement actuel](../../js/simulateur.js) et [les informations des plantes](../../js/plants-data.js). Elles constituent des dépendances existantes à préserver, et non une solution technique imposée par cette spécification.
- L'évaluation de compréhension utilise cinq personnes débutantes, sans explication préalable du simulateur, avec des sélections comprenant une réserve et une différence de saison. Les seuils de succès sont des objectifs à vérifier, pas des résultats déjà observés ; la méthode détaillée et le recrutement restent à organiser lors de la validation.
- Cette étape produit la spécification et sa checklist ; l'implémentation, les essais utilisateurs et la publication ne sont pas réalisés par cette commande. Les principes applicables d'AGENTS.md et de la constitution EcoBalcon restent en vigueur.
