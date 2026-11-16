# Modèle des données — Diagnostic et suivi SEO

Date : 2026-11-01. Modèle documentaire et fichiers locaux, sans base de données ni nouvelle collecte visiteur. Les champs proposés servent aux rapports de réalisation ; aucun rapport de performance n’est rempli à ce stade.

## Conventions communes

- Identifiants stables : `PAGE-…`, `OBS-…`, `ACT-…`, `LOT-001`, `DATA-…`, `BILAN-…` ; références explicites entre entités.
- URL publique absolue sur `https://ecobalcon.com`, chemin de fichier relatif au dépôt. Conserver aussi l’URL observée originale si différente ; ne pas renommer pour rapprocher les données.
- Date civile : `YYYY-MM-DD`. Instant de contrôle/publication : ISO 8601 avec décalage UTC, fuseau nommé si nécessaire. Les bornes quotidiennes GSC gardent le fuseau de la source, séparé d’Europe/Paris utilisé au journal.
- Une absence est `null` avec motif ; elle n’est jamais remplacée par zéro. Un zéro mesuré et une valeur exportée ambiguë sont distincts.
- Résultat de contrôle : `conforme`, `anomalie`, `non_verifie`, `sans_objet`, avec raison et preuve. Une absence de contrôle n’est pas une conformité.
- Niveaux de bénéfice, confiance, effort et risque : `faible`, `moyen`, `fort`, accompagnés d’une justification. Aucun score SEO global.

## Page de référence — FR-001, FR-002, FR-009 à FR-011

| Champ | Contenu |
| --- | --- |
| `page_id`, `file_path`, `observed_url` | Identité physique et adresse observée, sans confondre `index.html` et nouvelle URL publique. |
| `family` | Accueil, article, index articles, catégorie, auteur/index auteurs, outil, institutionnelle, contact, legacy ou page système. |
| `declared_canonical`, `reference_url` | Déclaration trouvée et destination de référence après vérification ; inconnue possible. |
| `discovery_class` | `candidate_recherche`, `redirection`, `exclusion_existante`, `a_examiner` ; classification technique locale, pas état Google. |
| `robots_meta`, `robots_txt_check` | Consignes constatées et contrôle de portée ; aucune assimilation automatique entre blocage d’exploration et désindexation. |
| `redirect_target`, `redirect_kind` | Destination et nature : meta refresh, lien, JavaScript ou HTTP observé. Ne pas présenter une redirection HTML locale comme un statut HTTP 301. |
| `title`, `description`, `h1`, `metadata` | Valeurs/occurrences, hreflang, OG/Twitter, données structurées et dates utiles. |
| `links`, `images` | Références, résolution locale, attributs pertinents et résultats de contrôle ; pas d’exécution JavaScript par l’auditeur. |
| `content_sha256` | Empreinte des octets avant/après, utile aussi pour les fichiers non suivis par Git. |
| `public_checks`, `google_index_state` | Contrôles publics datés ; état Google `inconnu` sans preuve dédiée. |
| `source_kind`, `source_path` | Override, HTML durable ou template ; dépendances et sorties potentielles. |

Validation : une URL ne devient pas « indexée » parce qu’elle est candidate locale ou listée au sitemap. Une redirection est une entité conservée et reliée à sa destination. Toute page dont contenu/rendu/comportement change participe au plafond, quelle que soit sa famille.

## Constat de diagnostic — FR-003

Champs : `observation_id`, `page_ids`, `environment` (`local`, `public`, `google`), `checked_at`, `check_name`, `result`, `evidence_reference`, `reader_effect`, `confidence`, `limitations`.

Un constat vérifié nécessite une preuve datée. Une hypothèse reste signalée comme telle et ne peut devenir un fait par simple reprise d’un audit historique. Une preuve publique cite l’URL et la version consultée ; une preuve locale cite chemin et valeur/contrôle observé. `non_verifie` exige une raison.

## Jeu de données de recherche — FR-004, FR-005

| Champ | Règle |
| --- | --- |
| `dataset_id`, `availability` | `absent`, `inutilisable`, `partiel`, `exploitable`, avec motif. |
| `property`, `property_kind`, `source_reference` | Propriété exacte, domaine/préfixe, rapport ou export consulté. Une référence inconnue n’est pas inventée. |
| `extracted_at`, `period_start`, `period_end`, `data_timezone` | Extraction et bornes inclusives ; 28 jours requis pour une comparaison complète. |
| `search_type`, `filters`, `dimensions` | Réglages exacts et dimensions réellement disponibles ; les libellés exportés originaux sont conservés. |
| `aggregation` | `propriete`, `page`, `requete` ou autre portée documentée. |
| `completeness`, `preliminary`, `row_limit`, `limitations` | Exhaustivité connue/inconnue, lignes tronquées, jours incomplets, ambiguïtés de source. |
| `brand_rule`, `brand_coverage` | Règle consignée pour marque/hors marque ; couverture partielle si requêtes manquantes. |
| `measurements` | Mesures par portée avec valeur et statut ; aucune jointure page × requête fabriquée à partir de tableaux distincts. |

Chaque mesure conserve `metric`, `value`, `status` (`mesure`, `indisponible`, `ambigu_export`), `scope`, `source_reference`. `clicks` et `impressions` mesurés sont des entiers positifs ou nuls ; `ctr` est un ratio de 0 à 1 ; `position` est positive si connue. Une propriété ou période incompatible rend le jeu inutilisable pour la référence, sans supprimer les autres constats du site.

Le CTR du lot se calcule à partir de la somme des clics et impressions des pages, seulement si leurs données sont complètes pour ce groupe. Ne pas reconstruire les totaux de propriété à partir des lignes pages/requêtes. La position agrégée est reprise d’une source de même portée ou reste absente ; aucune moyenne simple de positions.

## Action priorisée — FR-006 à FR-008

Champs : `action_id`, `observation_ids`, `reader_need`, `target_query_or_intent`, `expected_change`, `benefit`, `confidence`, `effort`, `risk`, `priority_reason`, `source_paths`, `direct_urls`, `indirect_urls`, `shared_files`, `acceptance_criteria`, `before_after_checks`, `decision`, `defer_reason`.

`decision` : `candidate`, `retenue`, `reportee`, `abandonnee`. Les URLs sont dédupliquées sur l’union directe/indirecte. Les effets partagés sur le rendu sont recensés, même sans changement HTML. Une action sans preuve suffisante reste candidate de recherche ou est reportée. Les titres et requêtes sont des intentions de travail, pas des volumes de recherche inventés.

## Lot initial et état initial — FR-007, FR-012

`Lot` : `lot_id`, `selected_action_ids`, `affected_urls`, `technical_files`, `selection_date`, `baseline_reference`, `status`.

`État initial` (`diagnostic/baseline.json`) : date de photographie, référence des empreintes d’inventaire, état Git connu, familles contrôlées, groupe fixe de pages, disponibilité GSC, référence de 28 jours et période précédente, filtres/agrégations, limites. L’état initial existe même sans données de recherche : mesures à `null`, raison explicite, contrôles locaux présents.

Invariants : zéro à trois actions ; union de zéro à cinq URLs existantes ; aucun nouvel article ; accueil absent des pages modifiées. Les fichiers techniques ne sont pas une exemption au comptage de leurs effets. Un lot vide justifié peut terminer le diagnostic sans réalisation de pages.

Transitions du lot : `diagnostic` → `selectionne` → `en_realisation` → `reception_locale` → `non_publie`. Depuis `selectionne`, un lot vide peut aller directement à `reception_locale`. `publie` n’est accessible qu’après demande explicite et publication réellement constatée. Une anomalie de réception renvoie à `en_realisation` ; un dépassement de périmètre renvoie à `diagnostic` pour réduction/report.

## Journal et réception — FR-011, FR-012, FR-015

Une entrée du journal conserve : date, action, sources et sorties modifiées, preuve de comparaison, contrôles exécutés et limites, statut local/public, changements concurrents et éventuelle date de publication réelle. La réception (`validation.md`) rapproche chaque critère d’action et chaque invariant de son résultat et de sa preuve ; les contrôles futurs ne sont pas cochés comme exécutés.

## Bilan — FR-013, FR-014

Champs : `review_id`, `lot_id`, `publication_at`, `due_date`, `performed_at`, `baseline_dataset_id`, `followup_dataset_id`, `fixed_page_group`, `comparability`, `exposure_complete`, `metrics`, `context_notes`, `conclusion`, `next_decision`.

`conclusion` : `progression`, `stabilite`, `recul`, `non_concluant`. Lorsque la comparaison est exploitable, ces tendances décrivent le signe de l’écart de clics du lot : positif, nul ou négatif, sans signification statistique annoncée. Impressions/CTR et saisonnalité nuancent la lecture. Le site entier est suivi séparément.

Pour chaque métrique : valeurs initiale/suivi, écart absolu ; pourcentage relatif seulement si référence non nulle. Pour le CTR, donner aussi l’écart en points. Absence de données, périmètre différent, période incomplète, impressions nulles sur une période ou exposition incomplète : `non_concluant`, avec les valeurs disponibles conservées.

Avant publication, `publication_at` et `due_date` sont `null`. Les échéances sont calculées après publication : disponibilité sous sept jours, bilans à J+28 et J+56. Une extraction tardive garde son instant réel et ses dates effectives, sans réécriture de l’historique.
