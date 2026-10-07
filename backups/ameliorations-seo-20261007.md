# EcoBalcon : actions SEO du 7 octobre 2026

Les points 1, 2, 5 et 6 sont préparés dans le projet local. Les demandes d’indexation ci-dessous concernent des articles déjà publics. Aucun commit, push ou déploiement du nouveau contenu n’a été effectué.

## 1. Indexation et liens internes

Search Console consultée dans la propriété `ecobalcon.com`. Le rapport d’indexation porte la date du 4 octobre 2026 : 59 URLs indexées et 72 non indexées. Ces nombres concernent toutes les adresses connues, y compris des anciennes adresses, et non uniquement les articles canoniques.

Sept articles ont été inspectés individuellement à leur adresse `/articles/<slug>/` :

| Article | État dans l’index au contrôle | Test de la version publique | Action confirmée |
| --- | --- | --- | --- |
| Rempoter les plantes de balcon | Explorée, actuellement non indexée ; exploration du 29 juin | Google a accès à cette URL ; la page peut être indexée | Demande d’indexation acceptée |
| Utilisation du compost | Explorée, actuellement non indexée ; exploration du 26 avril | Google a accès à cette URL ; la page peut être indexée | Demande d’indexation acceptée |
| Petits fruits en pot | Google ne reconnaît pas cette adresse canonique | Google a accès à cette URL ; la page peut être indexée | Demande d’indexation acceptée |
| Plantes pour un balcon durable | Explorée, actuellement non indexée ; exploration du 4 juillet | Google a accès à cette URL ; la page peut être indexée | Demande d’indexation acceptée |
| Pots DIY | Explorée, actuellement non indexée ; exploration du 4 juillet | Google a accès à cette URL ; la page peut être indexée | Demande d’indexation acceptée |
| Laitues sur balcon | Explorée, actuellement non indexée ; exploration du 10 avril | Google a accès à cette URL ; la page peut être indexée | Demande d’indexation acceptée |
| Jardiner sur un balcon | Cette URL est sur Google ; page indexée | Test supplémentaire inutile pour ce contrôle | Aucune nouvelle demande |

Les six confirmations « Indexation demandée » ont été observées. Elles indiquent l’ajout à une file d’exploration, pas une indexation acquise. Aucune demande n’a été faite pour les deux nouveaux articles encore locaux. Les exclusions volontaires des anciennes redirections n’ont pas été levées.

Le rapport Sitemaps indique « Opération effectuée » pour `https://ecobalcon.com/sitemap.xml`, avec une dernière lecture au 21 septembre et 68 pages découvertes. Les mentions d’erreur temporaire dans certaines anciennes inspections ne prouvent donc pas une erreur actuelle de ce rapport. La nouvelle version locale du sitemap n’a pas été envoyée avant sa publication.

Liens contextuels supplémentaires : novembre → petits fruits, compost et balcon durable ; pluie → pots DIY ; nouveaux guides → rempotage, petits fruits, compost et pots DIY selon le sujet. Les liens déjà présents vers les laitues dans le guide sur la pluie sont conservés.

## 2. Consolider le guide de l’eau de pluie

L’adresse et le titre SEO existants sont conservés. Le contenu qui répond à la collecte sans gouttière, le tableau des dispositifs et le schéma de volumes restent en place.

Ajouts dans `scripts/article-overrides.ps1` :

- Balcon couvert : observer où la pluie arrive réellement et reconnaître les cas où la collecte n’est pas adaptée.
- Entonnoir : vérifier diamètre, goulot, fixation et stabilité avant l’achat.
- Débordement : prévoir l’arrêt de la collecte et calculer la place encore disponible dans le récipient.

L’exemple supplémentaire est théorique : 20 mm sur 0,25 m² donnent 5 litres avant pertes. Un contenant de 5 litres déjà rempli de 2 litres ne dispose plus que de 3 litres libres. Il ne s’agit pas d’un essai de produit. Les questions du JSON-LD FAQ ont aussi été alignées sur celles réellement visibles dans l’article.

## 5. Deux guides d’hiver intégrés

- `/articles/proteger-pots-gel-balcon/` : priorité par type de plante et de contenant, abri, isolation des parois, limites du voile, drainage et checklist avant une nuit froide.
- `/articles/terreau-humide-hiver-balcon/` : tableau de diagnostic, eau retenue, trous, exposition à la pluie et situations justifiant un examen plus approfondi.

Les sujets répondent à des problèmes distincts. Ils ne sont pas présentés comme des mots-clés dont le volume de recherche aurait été mesuré. Les explications techniques renvoient aux sources horticoles citées dans chaque article.

Deux illustrations SVG originales sont intégrées dans `images/articles/`, avec textes alternatifs et dimensions de 1200 × 675. Ce sont des schémas explicatifs codés pour le site, sans photo tierce ni attribution de licence inventée. Le CSS permet de les afficher entièrement dans les images principales, sur ordinateur et mobile.

Le premier guide reçoit quatre liens contextuels depuis des anciens articles ; le second, cinq. Ils sont reliés entre eux et aux guides d’octobre et de novembre. L’index des articles, les pages d’auteurs et la catégorie Entretien & astuces les incluent. La liste Plantes & semis contient désormais aussi le guide d’octobre, auparavant absent de cette liste. Le générateur ajoute les liens manquants aux catégories lors des prochains rebuilds.

Le site compte maintenant 56 articles. Le compteur de l’accueil est passé de 54 à 56 ; son contenu est autrement préservé. Le cache du service worker porte la version `2026-10-07-seo`.

## 6. Des dates de sitemap durables

Le générateur ne donne plus automatiquement la date du rebuild à toutes les pages statiques.

`scripts/sitemap-state.ps1` conserve une empreinte du contenu et sa date dans `scripts/sitemap-page-state.json`. À l’initialisation, un contenu identique à la version Git utilise la date du dernier commit qui a touché le fichier. Une modification du contenu reçoit une nouvelle date ; une page identique garde sa date lors des rebuilds suivants. Sans historique fiable, `lastmod` est omis jusqu’à une modification ultérieure plutôt que fabriqué. Les changements de fins de ligne sont ignorés.

Le fichier d’état doit être conservé avec les sources du projet. Les dates des articles restent pilotées par leurs métadonnées éditoriales. Les changements éditoriaux de cette intervention portent la date du 7 octobre. L’image de l’accueil dans le sitemap provient désormais de ses propres métadonnées, au lieu de reprendre arbitrairement celle du dernier article.

Cette correction suit la recommandation de [Google sur la précision de `lastmod`](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). Elle rend l’information plus cohérente ; elle ne garantit ni indexation ni hausse de position.

## Vérifications

- Rebuild réussi sans `-RebuildHome` ; syntaxe PowerShell et service worker contrôlée.
- Canonical, robots, titres, descriptions, métadonnées sociales, JSON-LD, images et destinations locales contrôlés sur les huit articles concernés.
- Titres SEO des anciens articles conservés, vérifiés contre Git.
- Sitemap : 71 URLs distinctes, dont les 56 articles canoniques.
- Dates et état du sitemap stables lors de rebuilds identiques ; tests complémentaires sur un fichier temporaire : contenu inchangé, contenu modifié, persistance, fins de ligne et historique inconnu.
- Nouveaux guides vus dans le navigateur sur ordinateur et à 390 px : images entières et absence de débordement global ; tableaux contenus dans leur zone de défilement.
- Guide sur la pluie ouvert et nouveaux passages vérifiés dans le navigateur.
- Diff relu ; fichiers générés identiques remis à leur format initial lorsque seules leurs fins de ligne avaient changé ; `git diff --check` contrôlé.

## Après publication

Vérifier les deux nouvelles adresses et leurs images sur le domaine public, puis demander leur indexation. Contrôler ensuite les six demandes déjà faites sans les répéter quotidiennement. Comparer les performances des pages après 28 jours complets de mise en ligne, en tenant compte de la saison et du faible nombre actuel de clics.

## Références horticoles consultées

- [RHS : prévenir les dégâts hivernaux](https://www.rhs.org.uk/prevention-protection/preventing-winter-damage).
- [RHS : dégâts du gel](https://www.rhs.org.uk/prevention-protection/frost-damage).
- [RHS : contenants en hiver](https://www.rhs.org.uk/container-gardening/winter-selection).
- [RHS : arroser les plantes en pot](https://www.rhs.org.uk/container-gardening/how-to-water-containers).
- [AHDB : causes des dommages hivernaux en conteneur](https://horticulture.ahdb.org.uk/knowledge-library/causes-of-winter-injury-in-container-grown-nursery-stock).
