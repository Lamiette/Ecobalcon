# Premier lot SEO — LOT-001

Sélection arrêtée le 2026-11-16 avant correction. Référence :
[diagnostic](diagnostic.md), [baseline](baseline.json), [journal](journal.md).
Décisions : `retenue` ou `reportee`. Chaque niveau est motivé, sans score SEO global.

## Périmètre figé

**3 actions, 4 URLs existantes, aucun nouvel article.** Union dédupliquée :

1. `https://ecobalcon.com/categories/`
2. `https://ecobalcon.com/categories/plantes-semis/`
3. `https://ecobalcon.com/categories/entretien-astuces/`
4. `https://ecobalcon.com/articles/bouturer-basilic-balcon/`

Sources : trois HTML durables de catégories et l'entrée basilic dans
`scripts/article-overrides.ps1`. Sorties : les mêmes trois catégories, la canonique
basilic, `sitemap.xml` et les trois entrées de catégories de
`scripts/sitemap-page-state.json`. Les deux fichiers techniques ne modifient que
les métadonnées des quatre URLs retenues. Aucun fichier CSS/JS partagé ni template
ne change. Accueil et fonctionnalité 001 préservés.

## ACT-001 — Des compteurs de navigation exacts

- `decision` : retenue ; `observation_ids` : OBS-LOCAL-001.
- `reader_need` / `target_query_or_intent` : reconnaître les rubriques et leur
  contenu actuel, sans expression cible ni volume de recherche inventés.
- `expected_change` : 16 → 17 guides Plantes & semis ; 20 → 24 Entretien & astuces.
- `benefit` : moyen pour l'exactitude du repère, effet sur le trafic non établi ;
  `confidence` : fort, comptage des liens réels ; `effort` : faible, deux nombres ;
  `risk` : faible, aucun lien ou mécanisme modifié.
- `priority_reason` : incohérence prouvée, correction immédiate de navigation.
- `source_paths` : `categories/index.html` ; `direct_urls` : `/categories/` ;
  `indirect_urls` : aucune autre page ; `shared_files` : sitemap et état de cette URL.
- `acceptance_criteria` : les quatre cartes correspondent aux comptes 12/17/24/5
  des listes liées ; liens, texte et métadonnées existants préservés.
- `before_after_checks` : compter les liens de la liste complète de chaque catégorie,
  comparer les quatre nombres du hub ; contrôler que seules deux valeurs visibles changent.
- `defer_reason` : sans objet.

## ACT-002 — Orienter vers les guides existants

- `decision` : retenue ; `observation_ids` : OBS-LOCAL-002 et 003.
- `reader_need` : choisir un guide selon sa situation avant de parcourir 17 ou 24 liens.
- `target_query_or_intent` : choisir quoi planter ; savoir quel entretien préparer.
- `expected_change` : une courte navigation nommée avant chaque liste complète.
  Plantes : soleil, saison, premier potager, vent. Entretien : eau/absence,
  chaleur/gel, rempotage/terreau, feuilles/nuisibles. Liens contextuels explicites
  vers les articles existants, sans nouveaux conseils horticoles.
- `benefit` : moyen, destinations plus faciles à choisir ; `confidence` : fort sur
  la structure, effet utilisateur à confirmer ; `effort` : faible ; `risk` : faible
  avec les classes et styles existants, aucun JavaScript ajouté.
- `priority_reason` : accès aux contenus utiles prioritaire sur une réécriture SEO.
- `source_paths` : `categories/plantes-semis/index.html`,
  `categories/entretien-astuces/index.html` ; `direct_urls` : ces deux catégories ;
  `indirect_urls` : aucune, les articles liés ne sont pas réécrits ;
  `shared_files` : sitemap et état des deux catégories.
- `acceptance_criteria` : navs identifiables, liens et libellés fidèles aux destinations,
  listes complètes et leurs 17/24 liens conservés ; aucune liste d'orientation
  avec la classe `article-list`, que le générateur réserve à la liste complète.
- `before_after_checks` : destinations/ancres locales existantes, ordre du contenu,
  H1 unique, contrôle des listes après rebuild ; rendu 1280/390 px et clavier
  si navigateur accessible, sinon limites explicites sans réception visuelle déclarée.
- `defer_reason` : sans objet.

## ACT-003 — Des données structurées fidèles pour la bouture de basilic

- `decision` : retenue ; `observation_ids` : OBS-LOCAL-004.
- `reader_need` : la description destinée aux machines ne contredit pas les réponses visibles.
- `target_query_or_intent` : bouturer du basilic dans l'eau ; aucun volume estimé.
- `expected_change` : recopier dans `Faq` les trois questions/réponses déjà visibles ;
  `HowTo = $null` retire le schéma procédural trompeur pour ce slug, dépourvu de
  fallback. Préserver toutes les étapes visibles et `TimeRequired = "PT6M"`, qui
  signifie temps de lecture. Actualiser `DateModified` au jour de la vraie correction,
  sans changer `DatePublished`.
- `benefit` : faible et indirect pour le lecteur, exactitude de représentation ;
  `confidence` : fort, écarts démontrés ; `effort` : moyen, génération ; `risk` : moyen
  avant comparaison des sorties et de la CSP, faible après contrôle ciblé réussi.
- `priority_reason` : corriger la contradiction sans allonger le contenu ni modifier
  un générateur partagé. Aucun résultat enrichi FAQ/HowTo ni gain de trafic promis.
- `source_paths` : seule entrée `bouturer-basilic-balcon` dans
  `scripts/article-overrides.ps1` ; `direct_urls` : canonique basilic ;
  `indirect_urls` : aucune attendue, titre/description/image/auteur/date de publication
  inchangés ; `shared_files` : sitemap pour le seul lastmod basilic.
- `acceptance_criteria` : FAQ JSON-LD identique au texte visible ; aucun HowTo ni faux
  temps de réalisation ; BlogPosting/BreadcrumbList, corps, images, liens et temps
  de lecture conservés ; CSP valide pour les scripts JSON-LD réellement présents.
- `before_after_checks` : parser PS puis JSON-LD, rapprocher questions/réponses au
  HTML, valider CSP, comparer dates et métadonnées ; deux redirections legacy et
  index/auteurs byte-identiques après neutralisation démontrée des fins de ligne.
- `defer_reason` : sans objet.

## Propositions reportées

| Action / constats | Besoin et bénéfice attendu | Confiance / effort / risque | Décision et motif |
| --- | --- | --- | --- |
| ACT-004 / OBS-LOCAL-005 | Réviser les conseils et le titre du guide débutant | Confiance moyenne sur les corrections horticoles à apporter ; effort moyen, risque moyen | `reportee` : nécessite recherche factuelle et révision durable de fond, pas une simple retouche de mots-clés. |
| ACT-005 / OBS-LOCAL-006 | Examiner dimensions des images et stabilité visuelle | Confiance forte sur les attributs absents, faible sur l'effet mesuré ; effort moyen, risque fort si template partagé | `reportee` : rendu non mesuré et portée potentiellement supérieure à cinq URLs. |
| ACT-006 / accueil | Actualiser l'article « cette semaine » si nécessaire | Confiance faible sans vérifier le comportement dynamique ; effort/risque moyens | `reportee` : accueil hors lot, pas d'autorisation `-RebuildHome`. |

## Maîtrise de la génération

Le rebuild standard est testé dans une copie sans correction et dans une copie
corrigée du même instantané. La copie de contrôle révèle déjà des changements de
fins de ligne et l'état sitemap périmé du simulateur. Seules les dépendances réelles
des quatre pages sont retenues, avec preuve de chaque différence dans
[generation-review.md](generation-review.md). Rien n'est restauré globalement.
Avant toute application au dépôt, chaque empreinte de destination est comparée
à la photographie. Toute divergence concurrente doit être réconciliée.
