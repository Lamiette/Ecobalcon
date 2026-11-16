# Relecture publique — 16 novembre 2026

Date de consultation : **2026-11-16**, Europe/Paris. Mission limitée à la lecture : aucun fichier du site modifié, aucune publication, aucun formulaire envoyé et aucune demande d’indexation. Aucun navigateur natif utilisé. Cette relecture complète [local-review.md](local-review.md), daté du 1er novembre, et [search-data.md](search-data.md), qui conserve une consultation Search Console du 1er novembre ; elle ne remplace pas ces traces historiques par des mesures nouvelles.

## Méthode et portée des preuves

Les 20 URLs nommées dans [echantillon.json](echantillon.json), plus `robots.txt` et `sitemap.xml`, ont fait l’objet d’une ouverture nominative dans l’outil web. Aucun lien n’a été suivi pour étendre automatiquement cet échantillon. L’outil a restitué du texte pour **12 pages** et une erreur pour **8 pages**, ainsi que pour les **2 fichiers techniques**. Les textes restitués portent des mentions de collecte anciennes, reproduites ci-dessous telles qu’annoncées par l’outil. Ce sont des observations de son contenu disponible, pas des réponses HTTP fraîches du serveur ni des versions inspectées par Google Search Console.

Six GET directs supplémentaires ont ciblé uniquement les quatre pages candidates, le sitemap et robots, avec `urllib.request`, délai maximal de 12 secondes par URL, sans écriture de réponse sur disque. Les six tentatives ont échoué avec `URLError`, cause `WinError 10061` (connexion refusée). Aucune réponse HTTP, aucun en-tête, aucun code de statut et aucun HTML brut public n’ont été obtenus par ce canal. Cet échec peut relever de l’environnement réseau du contrôle ; **il ne prouve pas une panne d’EcoBalcon**. Aucun contournement de l’accès réseau n’a été tenté.

En conséquence, disponibilité HTTP actuelle, en-têtes, canonical public, directives robots publiques, contenu JSON-LD public et destinations effectives des redirections restent **`non_verifie`**. Une ouverture web restituant du texte n’est pas assimilée à un statut HTTP 200. Aucune observation ci-dessous n’établit l’indexation actuelle ou la canonical choisie par Google.

## Couverture nominative de l’échantillon

Base des chemins du tableau : `https://ecobalcon.com`. Les liens donnent les URLs effectivement demandées. « Collecte » désigne la mention relative de l’outil, sans conversion en date exacte inventée. La disponibilité actuelle reste non vérifiée pour chaque ligne.

| URL | Résultat de l’outil web le 2026-11-16 | Portée de lecture |
| --- | --- | --- |
| [Accueil](https://ecobalcon.com/) | Texte ; collecte annoncée « 4 days ago » | H1, orientation et compteur 58 guides lisibles. Hors modification du lot. |
| [Index articles](https://ecobalcon.com/articles/) | Texte ; « 4 months ago » | Cartes, recherche annoncée et liens lisibles ; fonctionnement JavaScript non exécuté. |
| [Bouturer le basilic](https://ecobalcon.com/articles/bouturer-basilic-balcon/) | Texte ; « 2 months ago » | Corps, étapes et FAQ lisibles ; head/JSON-LD non exposés par cette restitution. |
| [Jardin sur balcon : astuces](https://ecobalcon.com/articles/jardin-sur-balcon-astuces/) | Texte ; « last month » | Conseils et liens lisibles ; cette lecture ne valide pas leurs affirmations horticoles. |
| [Index catégories](https://ecobalcon.com/categories/) | Texte ; « 4 months ago » | Quatre catégories, compteurs et orientation lisibles. |
| [Fiches techniques](https://ecobalcon.com/categories/fiches-techniques/) | Erreur « URL … is not accessible via this tool » | Contenu public non vérifié. |
| [Plantes et semis](https://ecobalcon.com/categories/plantes-semis/) | Texte ; « 4 months ago » | Présentation et liste de 15 guides restituées. |
| [Entretien et astuces](https://ecobalcon.com/categories/entretien-astuces/) | Erreur « Failed to fetch …: Cache miss » | Contenu public non vérifié. |
| [Aménagement](https://ecobalcon.com/categories/amenagement-du-balcon/) | Erreur « URL … is not accessible via this tool » | Contenu public non vérifié. |
| [Index auteurs](https://ecobalcon.com/auteurs/) | Texte ; « 4 months ago » | Trois signatures, profils et compteurs lisibles. |
| [Profil Clara Fontaine](https://ecobalcon.com/auteurs/clara-fontaine/) | Erreur « Failed to fetch …: Cache miss » | Contenu public non vérifié. |
| [Simulateur](https://ecobalcon.com/simulateur/) | Texte ; « 2 weeks ago » | Libellés et liens lisibles ; calculs, filtres, sauvegarde et rendu non exécutés. |
| [Checklist arrosage](https://ecobalcon.com/checklists/arrosage-vacances/) | Texte ; « 4 months ago » | Quatre groupes de gestes lisibles ; saisie et impression non exécutées. |
| [À propos](https://ecobalcon.com/a-propos/) | Texte ; « 4 months ago » | Mission, méthode éditoriale et accès au contact lisibles. |
| [Contact](https://ecobalcon.com/contact/) | Texte ; « 4 months ago » | Instructions et champs lisibles ; aucun envoi. |
| [Merci](https://ecobalcon.com/contact/merci/) | Erreur « URL … is not accessible via this tool » | Contenu et exclusion publics non vérifiés. |
| [Confidentialité](https://ecobalcon.com/politique-confidentialite/) | Texte ; « 4 months ago » | Texte disponible ; mécanisme de consentement et exclusion non vérifiés. |
| [404](https://ecobalcon.com/404.html) | Erreur « URL … is not accessible via this tool » | Contenu et code HTTP publics non vérifiés. |
| [Legacy dossier basilic](https://ecobalcon.com/bouturer-basilic-balcon/) | Erreur « URL … is not accessible via this tool » | Redirection effective et destination publiques non vérifiées. |
| [Legacy fichier basilic](https://ecobalcon.com/articles/bouturer-basilic-balcon.html) | Erreur « URL … is not accessible via this tool » | Redirection effective et destination publiques non vérifiées. |

L’extraction des pages peut faire apparaître du texte normalement masqué, par exemple le message de recherche vide de l’index articles. Sa présence dans la restitution n’établit pas une erreur de rendu ou un résultat de recherche effectivement vide.

## Canonical, sitemap et robots : vérification séparée

| Contrôle | Observation locale relue le 2026-11-16 | Vérification publique |
| --- | --- | --- |
| Canonical des quatre candidates | Les quatre HTML déclarent leur propre URL HTTPS sur `ecobalcon.com`, avec slash final : `/categories/`, `/categories/plantes-semis/`, `/categories/entretien-astuces/`, `/articles/bouturer-basilic-balcon/`. | `non_verifie` : la restitution web n’expose pas ces balises ; les GET bruts ont échoué. La canonical choisie par Google n’a pas été consultée. |
| [robots.txt](https://ecobalcon.com/robots.txt) | Fichier local : `User-agent: *`, `Allow: /`, `Disallow: /backups/`, et déclaration de `https://ecobalcon.com/sitemap.xml`. Aucun blocage local des quatre candidates par ces règles. | `non_verifie` : ouverture web inaccessible, puis connexion refusée au GET direct. Ne pas annoncer que les règles locales sont déployées. |
| [sitemap.xml](https://ecobalcon.com/sitemap.xml) | Les quatre URLs candidates sont présentes dans le XML local, avec leurs URLs canoniques propres. | `non_verifie` : ouverture web inaccessible, puis connexion refusée au GET direct. Ni lecture actuelle par Google, ni acceptation, ni indexation établies. |
| Deux variantes legacy basilic | La relecture locale décrit un mécanisme HTML/meta refresh vers la page canonique et un lien de repli. | `non_verifie` : ouvertures en erreur ; aucun statut 301, 302 ou 200 déduit des fichiers locaux. |

La canonical déclarée est un signal de préférence ; Google peut choisir une autre version. L’inclusion au sitemap aide à la découverte sans garantir exploration ou indexation. `robots.txt` contrôle l’exploration et ne remplace pas une directive d’indexation. Ces distinctions suivent les documentations officielles [canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls?hl=fr), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview?hl=fr) et [robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro?hl=fr), consultées le 2026-11-16.

## Écarts entre la restitution web et les fichiers locaux

Ces différences sont vérifiées **entre deux sources consultées**, avec une confiance forte sur leurs valeurs. Leur cause et l’état actuellement déployé restent inconnus, car le contenu web disponible est ancien. Il serait incorrect d’affirmer que le site public actuel est en retard à partir de ce seul cache.

| ID | URL | Différence constatée | Conséquence pour le diagnostic |
| --- | --- | --- | --- |
| OBS-PUBLIC-001 | `/categories/` | La restitution web annonce 15 guides Plantes & semis et 20 Entretien ; le HTML local annonce 16 et 20. Les listes locales liées comptent 17 et 24 selon `local-review.md`, valeurs cohérentes avec leurs compteurs locaux propres. | Garder OBS-LOCAL-001 comme incohérence locale prouvée ; ne pas présenter sa valeur exacte comme constat public actuel. |
| OBS-PUBLIC-002 | `/categories/plantes-semis/` | La restitution web annonce 15 guides et en présente 15 ; le fichier local annonce 17. Les deux versions conduisent de la présentation à une liste complète sans orientation préalable par situation détaillée. | L’écart de volume empêche une validation publique du contenu local. L’orientation ciblée reste une hypothèse utile à vérifier localement. |
| OBS-PUBLIC-003 | `/articles/bouturer-basilic-balcon/` | Le titre restitué est « Bouturer du basilic dans l’eau | EcoBalcon », tandis que le `<title>` local est « Bouturer le basilic dans l’eau : étapes et replantation | EcoBalcon ». La FAQ lisible porte sur supermarché, délai avant replantation et maintien dans l’eau, comme la FAQ visible locale. | Ne pas proposer l’ajout de termes déjà présents dans le titre local. Le JSON-LD public n’étant pas exposé, OBS-LOCAL-004 reste un constat local de fidélité, pas une anomalie publique confirmée. |
| OBS-PUBLIC-004 | `/auteurs/` | La restitution web compte 27/13/12 guides, contre 29/16/13 dans la relecture locale. | Indice supplémentaire de versions différentes ; hors lot, aucune correction des profils déduite du cache. |

L’entretien n’a pas été restitué : il n’existe pas de comparaison publique exploitable pour cette candidate. Aucun score de vitesse, Core Web Vitals, rendu mobile ou contrôle clavier ne découle de l’extraction textuelle.

## Recommandations limitées, fondées sur Google

1. **Titres** : garder un titre propre à la page, descriptif et fidèle à sa réponse ; éviter répétition artificielle et accumulation de mots clés. Google compose lui-même le lien de titre et peut le réécrire. Il n’existe pas de quota de caractères universel dans cette documentation. Application : le titre local basilic couvre déjà eau, étapes et replantation ; sa modification ne se justifie pas par le seul titre ancien du cache. Source : [liens de titre](https://developers.google.com/search/docs/appearance/title-link?hl=fr), consultée le 2026-11-16.
2. **Maillage** : une orientation courte par exposition, saison ou problème peut aider le lecteur à choisir parmi les guides existants. Garder de vrais liens `<a href>` et des libellés explicites, placés dans leur contexte. Google ne donne pas de nombre idéal de liens ; ajouter des liens pour atteindre un quota ne se justifie pas. Application : OBS-LOCAL-002/003 soutiennent l’examen de deux parcours ciblés, sans garantie de clics ou classement. Source : [bonnes pratiques des liens](https://developers.google.com/search/docs/crawling-indexing/links-crawlable?hl=fr), consultée le 2026-11-16.
3. **Fidélité du schéma** : rapprocher questions, étapes et durées du contenu effectivement visible. Une syntaxe JSON valide ne suffit pas ; ne pas ajouter un conseil visible seulement pour justifier une donnée structurée existante. Application : examiner les trois questions différentes, `totalTime=PT6M` et l’étape de pincement du basilic relevés localement. Source : [règles générales des données structurées](https://developers.google.com/search/docs/appearance/structured-data/sd-policies?hl=fr), consultée le 2026-11-16.

### FAQ et HowTo : état de Google vérifié en novembre 2026

**Les résultats enrichis FAQ ne sont plus affichés dans Google depuis le 7 mai 2026.** Le journal officiel du 8 mai annonce cet arrêt ; l’entrée du 15 juin indique ensuite la suppression de la documentation FAQ. L’ancienne URL de documentation FAQ redirige effectivement vers le journal des mises à jour lors de cette consultation. La restriction de 2023 aux sites gouvernementaux ou de santé est donc un état historique dépassé, pas la règle actuelle. Source : [mises à jour Google Search Central, mai et juin 2026](https://developers.google.com/search/updates?hl=fr), consultée le 2026-11-16.

**Les résultats enrichis HowTo sont obsolètes depuis septembre 2023**, y compris sur ordinateur. La mise à jour officielle du 14 septembre précise l’arrêt sur ordinateur depuis le 13 septembre, après celui sur mobile. Source : [annonce et mise à jour HowTo/FAQ de Google](https://developers.google.com/search/blog/2023/08/howto-faq-changes?hl=fr), consultée le 2026-11-16.

Corriger ou simplifier un schéma conservé peut servir sa fidélité ; **aucun résultat enrichi FAQ/HowTo, ni gain de visibilité lié à ces fonctionnalités, ne doit être retenu comme critère de succès de ce lot**. Leur abandon par Google n’exige pas à lui seul une suppression transversale des schémas du site. La portée d’une correction basilic doit rester celle décidée dans le lot.

## Limites et décision permise

Cette mission apporte une couverture nominative, des écarts de versions documentés et des sources Google actuelles. Elle ne confirme aucun obstacle d’accès public : erreurs d’outils et échecs réseau restent des limites. L’analyse locale peut continuer avec ces réserves ; une réception publique exige une lecture fraîche des pages, head, robots, sitemap et redirections lors d’une intervention disposant de cet accès.

Les chiffres Search Console de `search-data.md` restent ceux du 1er novembre et des périodes d’octobre/septembre indiquées ; aucun chiffre du 16 novembre n’a été obtenu dans cette mission. Leur présence ne permet pas d’identifier la version HTML actuellement servie ni de déclarer un gain depuis les corrections. Le statut d’indexation actuel de chaque URL reste **inconnu** et le travail SEO reste **non publié dans le cadre de cette mission**.
