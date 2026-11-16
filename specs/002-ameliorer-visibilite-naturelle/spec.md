# Feature Specification: Améliorer la visibilité naturelle d’EcoBalcon

**Feature Branch**: `setup/spec-kit-ecobalcon` (branche courante ; aucune branche créée pour cette spécification)

**Created**: 2026-11-01

**Status**: Draft

**Input**: User description: « Améliorer la visibilité naturelle d’EcoBalcon sur les recherches liées au jardinage sur balcon. Prévoir un diagnostic du site et, si disponibles, des données Google Search Console afin de prioriser les améliorations. Définir un premier périmètre limité, des critères d’acceptation et un suivi des résultats. Préserver les URLs, les contenus utiles et le fonctionnement du site. Ne pas créer massivement des articles ni publier automatiquement. »

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Comprendre les obstacles et les opportunités actuels (Priority: P1)

La personne responsable d’EcoBalcon consulte un diagnostic daté et comprend ce qui empêche ou pourrait améliorer la découverte des conseils de jardinage sur balcon. Elle distingue les constats locaux, ceux du site public et les hypothèses. Les données Google Search Console accessibles éclairent les besoins exprimés par les internautes.

**Why this priority**: Choisir des changements avant de vérifier le site et les données risquerait de consacrer du temps à des problèmes déjà corrigés ou sans bénéfice établi.

**Independent Test**: Relire le diagnostic seul et retrouver la preuve, la date, la portée et les limites de chaque constat prioritaire, avec puis sans données de recherche.

**Acceptance Scenarios**:

1. **Given** le dépôt et un audit antérieur, **When** le diagnostic est établi, **Then** il inventorie les pages publiques, distingue les pages destinées à la recherche, les redirections et exclusions existantes, examine les familles de pages présentes et revérifie les constats anciens avant de les retenir.
2. **Given** un accès autorisé en lecture à Search Console ou un export exploitable, **When** les performances sont analysées, **Then** la propriété, la date d’extraction, les périodes, filtres, dimensions et limites sont indiqués ; les opportunités citent les pages et requêtes observées sans inventer les données manquantes.
3. **Given** des données absentes, refusées ou inutilisables, **When** le diagnostic est établi, **Then** cette absence est expliquée et les constats vérifiables sont livrés ; les opportunités non étayées par des données de recherche restent des hypothèses, sans assimiler l’absence de données à un trafic nul.
4. **Given** un écart entre le dépôt et le site public ou un accès public impossible, **When** un constat est formulé, **Then** son environnement est explicite ; la présence d’une page dans les fichiers ou dans la liste soumise aux moteurs ne vaut pas preuve de son indexation réelle.

---

### User Story 2 - Choisir un premier lot utile et limité (Priority: P1)

La personne responsable compare une liste courte d’améliorations et dispose d’un premier lot motivé. Pour chaque action, elle sait quel besoin du lecteur est mieux servi, sur quelles preuves repose le choix, quelles pages sont concernées et comment reconnaître le résultat attendu.

**Why this priority**: Un périmètre borné permet de vérifier l’utilité des changements et de préserver le travail existant avant d’élargir la démarche.

**Independent Test**: Lire la liste priorisée sans modifier le site et vérifier les plafonds, la justification de sélection et les critères avant/après de chaque action.

**Acceptance Scenarios**:

1. **Given** plusieurs constats étayés, **When** les actions sont classées, **Then** les obstacles d’accès aux contenus utiles sont examinés en premier ; bénéfice attendu, confiance, effort et risque expliquent ensuite l’ordre retenu et les reports.
2. **Given** la liste priorisée, **When** le premier lot est défini, **Then** il comporte au plus trois actions portant au total sur cinq URLs de pages existantes distinctes au maximum, chacune nommée avec son besoin cible, sa preuve et son contrôle attendu.
3. **Given** une correction commune touchant plus de cinq pages, **When** son impact est recensé, **Then** elle est reportée dans un lot ultérieur à cadrer ; les pages touchées indirectement comptent aussi dans le plafond.
4. **Given** aucun changement suffisamment justifié et compatible avec ces limites, **When** la sélection est terminée, **Then** le lot peut être vide avec justification et liste des preuves à obtenir, sans remplir artificiellement le quota.

---

### User Story 3 - Trouver des conseils plus clairs sans perdre les usages existants (Priority: P2)

Une personne qui cherche comment jardiner sur son balcon trouve sur les pages retenues une réponse fidèle à sa recherche, des conseils concrets et des liens utiles. Elle garde accès aux mêmes adresses et aux fonctions existantes.

**Why this priority**: La visibilité recherchée doit aider les lecteurs et conserver la valeur des contenus, des liens et des outils déjà présents.

**Independent Test**: Pour chaque page du lot, comparer l’état avant/après sur ordinateur et mobile, suivre les liens concernés et vérifier les parcours affectés au clavier.

**Acceptance Scenarios**:

1. **Given** une page sélectionnée et son besoin cible, **When** une amélioration est réalisée lors de la mise en œuvre, **Then** son titre, sa présentation et sa réponse visible sont cohérents ; les conseils utiles sont conservés et toute réécriture substantielle est justifiée par le diagnostic.
2. **Given** une adresse publique existante ou une ancienne adresse redirigée, **When** la version modifiée est contrôlée, **Then** elle mène toujours à la même page de référence sur `https://ecobalcon.com`, avec les slashs finaux existants, sans suppression ni exclusion nouvelle des recherches.
3. **Given** une modification visible ou fonctionnelle, **When** les parcours concernés sont vérifiés, **Then** liens et images fonctionnent, lecture et navigation restent possibles sur ordinateur, mobile et au clavier ; si le simulateur est affecté, sa sélection, ses filtres et sa sauvegarde conservent leur comportement de référence.
4. **Given** un lot prêt à être relu, **When** le travail local est livré, **Then** aucun nouvel article n’a été créé et aucune publication ni soumission manuelle à un moteur n’a été déclenchée automatiquement.

---

### User Story 4 - Savoir ce qui a changé et quand réévaluer (Priority: P2)

La personne responsable dispose d’un état initial et d’un journal des changements. Après une éventuelle publication autorisée séparément, elle suit les pages du lot sur des périodes explicites et décide de conserver, corriger ou approfondir les actions, sans attribuer automatiquement toute variation au travail effectué.

**Why this priority**: La conformité du lot est vérifiable à la livraison ; son effet dans les recherches demande une observation ultérieure et des données comparables.

**Independent Test**: À partir de l’état initial et du journal, retrouver les indicateurs et échéances, puis produire une conclusion « progression », « stabilité », « recul » ou « non concluant » avec une comparaison chiffrée lorsqu’elle est disponible.

**Acceptance Scenarios**:

1. **Given** des données disponibles avant modification, **When** l’état initial est enregistré, **Then** il couvre les 28 derniers jours complets disponibles, précise la période précédente de même durée et retient clics, impressions, taux de clic et position moyenne pour l’ensemble du site et les pages du lot ; toute dimension indisponible est signalée.
2. **Given** une publication ultérieure autorisée et datée, **When** le suivi est préparé, **Then** un contrôle de disponibilité est prévu sous sept jours et des bilans à quatre et huit semaines comparent les 28 derniers jours complets disponibles à l’état initial avec les mêmes filtres.
3. **Given** des données rares, partielles ou non comparables, **When** un bilan est établi, **Then** il affiche les valeurs absolues disponibles et les limites ; sans comparaison exploitable il conclut « non concluant », et une tendance sur de faibles volumes reste descriptive.
4. **Given** un travail livré uniquement en local, **When** son statut est consulté, **Then** il indique « non publié », le calendrier après publication reste sans date de départ et aucun gain de trafic ou d’indexation n’est déclaré acquis.

### Edge Cases

- Export d’une autre propriété ou période non identifiable : ne pas l’utiliser comme référence ; documenter le motif.
- Requêtes ou dimensions manquantes avec totaux disponibles : indiquer ces absences, sans assimiler le sous-ensemble visible au total.
- Référence à zéro : présenter les écarts absolus et indiquer que le pourcentage d’évolution est non calculable.
- Saison de jardinage, changement concurrent ou événement externe connu : annoter le contexte ; comparer à l’année précédente si elle est disponible et comparable, sans attribution causale certaine.
- Plusieurs pages répondent au même besoin : examiner leurs rôles et leurs liens ; toute fusion, suppression ou modification d’URL reste hors périmètre.
- Problème grave dépassant le plafond ou touchant l’accueil : le signaler en priorité dans les reports, sans élargir automatiquement le lot.
- Site public différent des fichiers locaux ou servant une ancienne version : consigner l’écart et ne pas valider le résultat public à partir du seul contrôle local.
- Données disponibles seulement après publication : créer une référence datée en signalant qu’elle ne permet pas de mesurer le changement par rapport à un état initial absent.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Le diagnostic DOIT être daté, décrire ses sources et environnements, inventorier les URLs publiques existantes et distinguer pages destinées à la recherche, redirections et exclusions existantes. Il DOIT fournir les listes correspondantes et la couverture des contrôles.
- **FR-002**: Le diagnostic DOIT couvrir la découvrabilité des pages, les consignes d’accès aux moteurs et pages de référence déclarées, les titres et résumés de résultats, la structure des contenus, les liens internes, les images, la fidélité des informations structurées au contenu visible et les obstacles de lecture ou chargement sur mobile. Les contrôles communs portent sur l’inventaire ; les contrôles de lecture et de parcours portent sur au moins un exemple de chaque famille de pages présente et toutes les pages proposées pour le lot. Chaque contrôle non réalisable DOIT être signalé.
- **FR-003**: Chaque constat retenu DOIT préciser les URLs concernées, une preuve consultable ou un résultat de contrôle, sa date, son effet possible pour le lecteur ou la découverte du contenu et son degré de confiance. `SEO-AUDIT.md`, daté du 27 juin 2026, DOIT rester une trace historique à revérifier, sans reprise de sa note comme mesure actuelle.
- **FR-004**: Le diagnostic DOIT examiner les données Google Search Console si un accès autorisé en lecture ou un export est disponible et documenter propriété, source, date d’extraction, périodes, filtres, couverture et limites. Il NE DOIT PAS demander des identifiants secrets dans les documents ni rendre un nouvel accès obligatoire pour poursuivre.
- **FR-005**: L’analyse de recherche DOIT relier, lorsque disponibles, pages et requêtes de jardinage sur balcon aux clics, impressions, taux de clic et position moyenne, et distinguer recherches de marque et autres selon une règle consignée. Aucune donnée manquante ne peut être inventée ; sans données, le diagnostic DOIT reposer sur le site et identifier les opportunités non confirmées comme hypothèses.
- **FR-006**: La liste priorisée DOIT relier chaque action à un constat et un besoin du lecteur, et justifier bénéfice attendu, confiance, effort et risque selon des niveaux faible/moyen/fort. Les obstacles d’accès aux contenus passent en premier ; à gravité comparable, confiance et bénéfice priment, puis le moindre effort et le moindre risque départagent les actions. Les reports et leurs raisons DOIVENT apparaître.
- **FR-007**: Le premier lot DOIT comporter zéro à trois actions sur cinq URLs de pages existantes distinctes au maximum, effets indirects compris. Les URLs effectives DOIVENT être sélectionnées après diagnostic et avant mise en œuvre. Nouvel article, refonte générale, migration, fusion, suppression, désindexation nouvelle, acquisition de liens et campagne payante sont hors périmètre.
- **FR-008**: Chaque action retenue DOIT préciser URLs touchées, besoin cible, preuve de départ, changement attendu, critère d’acceptation observable et contrôle avant/après. Sans preuve suffisante, une proposition DOIT être reportée ou devenir une hypothèse à vérifier, sans être présentée comme un gain acquis.
- **FR-009**: Les changements du lot DOIVENT préserver `https://ecobalcon.com`, URLs et redirections existantes, contenus utiles, images et attributs pertinents, fonctions et coordonnées existantes. L’accueil reste hors modification dans ce premier lot ; une opportunité le concernant DOIT être reportée. Aucun changement d’identifiant de mesure, de collecte ou de consentement ne fait partie du lot.
- **FR-010**: Les informations destinées aux moteurs et au partage DOIVENT rester cohérentes avec les URLs et le contenu visible. Les dates de publication restent conservées ; les dates de modification ne changent que pour une révision réelle. Aucun conseil, essai ou résultat ne peut être inventé pour améliorer une présentation dans la recherche.
- **FR-011**: La réception DOIT comparer chaque page touchée à l’état initial : même adresse et destination des redirections, conseils utiles conservés, titres et résumés fidèles, liens et images concernés valides, informations structurées cohérentes et parcours affectés fonctionnels. Les changements visibles DOIVENT être contrôlés sur ordinateur, mobile et au clavier ; les limites ne valent pas validation.
- **FR-012**: Un état initial DOIT être enregistré avant modification avec constats, pages retenues et indicateurs disponibles. Un journal DOIT relier chaque action à ses pages, résultat de contrôle, statut local et date de publication éventuelle. L’absence d’indicateurs de recherche DOIT être inscrite, sans estimation inventée de trafic.
- **FR-013**: Le suivi DOIT appliquer les périodes et indicateurs du scénario 4, conserver les mêmes filtres et le même groupe de pages, consigner les changements de périmètre et séparer le bilan du lot de celui du site entier. Le taux de clic agrégé DOIT être calculé à partir des clics et impressions agrégés ; la position moyenne reste contextuelle et ne suffit pas à conclure à un gain.
- **FR-014**: Chaque bilan DOIT donner valeurs de référence et de suivi disponibles, écarts absolus et relatifs calculables, limites et prochaine décision motivée. Sans périodes et périmètres comparables, sans impressions sur une des périodes ou avec un recul incomplet, l’effet sur la recherche DOIT être déclaré « non concluant ». Les tendances à faible volume restent descriptives, sans prétention de causalité ou de significativité.
- **FR-015**: Livraison locale et observation des performances DOIVENT être distinguées. Aucun gain de position, trafic ou indexation ne peut être garanti. Aucune publication, exécution du processus de publication ou soumission manuelle à un moteur ne peut être déclenchée automatiquement ; une publication exige une demande explicite distincte.

### Key Entities *(include if feature involves data)*

- **Page de référence** : URL publique, type de page, besoin servi, redirections associées, état d’accès aux recherches constaté ou inconnu.
- **Constat de diagnostic** : observation datée, preuve, environnement, pages concernées, effet possible et confiance ; distinct d’une hypothèse.
- **Jeu de données de recherche** : propriété, provenance, dates, filtres, dimensions, indicateurs et limites ; peut être absent ou partiel.
- **Action priorisée** : constat lié, besoin, bénéfice, confiance, effort, risque, classement, pages affectées, sélection ou report et critère d’acceptation.
- **Lot initial** : groupe limité d’actions et d’URLs, contrôles de réception et exclusions explicites.
- **État initial et bilan** : mesures comparables, contexte, limites et décision, reliés au journal et à la date de publication lorsqu’elle existe.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Avant toute modification, 100 % des pages publiques inventoriées sont classées, chaque famille de pages présente est représentée dans les contrôles de lecture et chaque constat retenu possède une preuve datée ou un statut « à confirmer ». Les contrôles impossibles sont comptés et expliqués.
- **SC-002**: Pour 100 % des actions sélectionnées, la personne responsable retrouve dans une synthèse le besoin du lecteur, la preuve, les URLs, la justification du classement et le contrôle attendu. Le lot respecte trois actions et cinq pages au maximum, avec zéro article nouveau.
- **SC-003**: À la réception locale, 100 % des pages du lot satisfont leurs critères avant/après, aucune URL ou redirection existante n’est perdue et aucune régression de lecture ou parcours n’est constatée dans les contrôles définis. Un contrôle manquant est déclaré et empêche de présenter la réception correspondante comme validée.
- **SC-004**: Avec ou sans données de recherche, le dossier fournit un diagnostic, une sélection motivée ou un lot vide justifié, un état initial et un calendrier conditionné à une publication explicite.
- **SC-005**: Pour chaque lot publié ultérieurement, un contrôle sous sept jours et deux bilans à quatre et huit semaines sont prévus. Chaque bilan indique période, filtres, valeurs disponibles, limites et décision ; sans données comparables, il porte la conclusion « non concluant ».
- **SC-006**: L’objectif d’observation est une hausse des clics naturels sur le groupe fixe des pages retenues, entre les 28 jours de référence et les 28 jours complets disponibles au bilan de huit semaines. Le bilan chiffre l’écart mesurable et l’interprète avec impressions, taux de clic et saisonnalité ; cet objectif non garanti reste distinct de la validation de livraison, sans pourcentage arbitraire fixé avant l’état initial.
- **SC-007**: La livraison comprend zéro publication automatique, zéro changement d’identifiant de mesure et zéro altération de l’accueil ; son statut local ou publié est explicite.

## Assumptions

- Le public reste francophone et cherche des conseils pratiques de jardinage sur balcon ; aucun nouveau marché ni changement de ligne éditoriale n’est demandé.
- Trois actions et cinq pages constituent le plafond proposé par défaut. Les pages et améliorations exactes ne sont pas préjugées avant diagnostic ; aucune quantité minimale de changements n’est imposée.
- Cette commande produit la spécification et sa validation documentaire. Le diagnostic actualisé, la sélection effective et la mise en œuvre seront organisés aux phases suivantes ; les scénarios décrivent ces résultats futurs et ne constituent pas des constats actuels sur le site.
- Le diagnostic part du dépôt et examine la version publique si accessible. Un accès Search Console ou un export pourra compléter le dossier ; sa disponibilité n’est pas établie ici. Créer une propriété ou une intégration permanente est hors périmètre.
- Le travail engagé sur les explications du simulateur reste distinct ; ses fichiers et critères ne sont pas modifiés par ce cadrage. Un changement concurrent affectant le lot devra être inscrit au journal pour interpréter le suivi.
- Les 28 jours de référence et bilans à quatre et huit semaines sont des conventions de suivi, sans promesse de délai de réaction des moteurs. Saisonnalité et disponibilité des données peuvent limiter les conclusions.
- Le périmètre reste compatible avec l’architecture statique et les sources durables du projet. Aucun service supplémentaire de mesure ni changement du fonctionnement de publication n’est nécessaire pour accepter ce cadrage.
