# Audit GEO - EcoBalcon

- **Date :** 12 juillet 2026
- **Site :** https://ecobalcon.com
- **Note de maturité GEO :** 7,4 / 10

## Synthèse

EcoBalcon possède une base solide pour être découvert, compris et repris par les moteurs génératifs : le site est statique, le contenu principal est présent directement dans le HTML, les pages sont indexables, les articles sont bien structurés, les auteurs sont reliés aux contenus et les réponses pratiques sont souvent faciles à extraire.

Le principal frein n'est pas technique, mais éditorial. Les articles donnent beaucoup de conseils précis sans afficher leurs sources, leur méthode de vérification ou des éléments d'expérience directe. Aucun des 52 articles canoniques ne comporte de rubrique de sources ni de lien éditorial vers une référence indépendante ou institutionnelle. Les profils auteurs sont cohérents, mais restent génériques et ne présentent pas d'éléments vérifiables d'expérience, de qualification ou de parcours.

La note mesure la préparation GEO observable dans les fichiers et sur quelques URL de production. Elle ne mesure pas la visibilité réelle d'EcoBalcon dans ChatGPT, Google AI Overviews, AI Mode, Copilot, Perplexity ou Claude : cette partie demande des données Search Console, analytics, journaux serveur et un suivi régulier de requêtes tests.

## Ce que signifie GEO dans cet audit

Le GEO, ou Generative Engine Optimization, désigne ici la capacité du site à :

- être exploré et indexé par les systèmes de recherche utilisés par les moteurs génératifs ;
- être compris sans ambiguïté au niveau du site, des auteurs et des articles ;
- fournir des passages autonomes, précis et faciles à reprendre dans une réponse ;
- inspirer assez confiance pour être sélectionné comme source et cité ;
- montrer son originalité plutôt que reformuler des conseils déjà présents partout ;
- mesurer sa présence dans les réponses génératives.

Il n'existe pas de balise GEO universelle. Google indique explicitement que les fondamentaux SEO restent la base de ses fonctions génératives, qu'aucun balisage Schema.org spécial n'est nécessaire et que `llms.txt` n'améliore pas la visibilité dans Google Search.

## Score par axe

| Axe | Note | Commentaire |
| --- | ---: | --- |
| Découvrabilité technique | 9,4 / 10 | Robots ouverts, sitemap cohérent, pages canoniques indexables et réponses HTTP 200 observées en production avec un user-agent OAI-SearchBot. |
| Compréhension des entités | 9,1 / 10 | Marque, organisation, auteurs, catégories et articles sont reliés avec des données structurées cohérentes. |
| Extractibilité des réponses | 8,6 / 10 | HTML lisible, H2 explicites, introductions directes, listes, FAQ, HowTo et blocs de repères sur une majorité des articles récents. |
| Attribution et confiance | 7,0 / 10 | Tous les articles ont un auteur et une page auteur, mais les biographies restent peu vérifiables et la méthode éditoriale est peu détaillée. |
| Preuves et citabilité | 4,2 / 10 | Aucun article ne présente de sources éditoriales externes, de bibliographie ou de protocole d'essai identifiable. |
| Originalité et valeur propre | 6,8 / 10 | L'angle balcon, les contraintes concrètes et le simulateur différencient le site, mais beaucoup de conseils restent génériques et sans données propres. |
| Fraîcheur et maintenance | 7,2 / 10 | Les dates sont présentes dans les métadonnées ; 24 articles signalent une modification distincte, mais aucune date de mise à jour n'est visible dans le corps des 52 articles. |
| Mesure de la visibilité IA | 4,5 / 10 | Analytics est présent, mais aucun tableau de suivi GEO, benchmark de citations ou rapport de journaux robots n'est disponible dans le projet. |

## Ce qui est très bon

- 52 pages canoniques d'articles ont été analysées.
- Les 52 articles possèdent un schéma `BlogPosting`.
- Les 52 schémas `BlogPosting` relient l'article à une page auteur avec `author.url`.
- Les 52 articles affichent un lien visible vers leur auteur.
- Trois pages auteurs utilisent un schéma `ProfilePage` avec une entité `Person`.
- La page À propos expose la mission, la méthode générale et l'organisation EcoBalcon.
- 31 articles comportent un schéma `FAQPage`.
- 30 articles comportent un schéma `HowTo`.
- 31 articles proposent un bloc de faits clés facilement extractible.
- Les titres de sections sont généralement formulés autour d'une question, d'une décision ou d'une action concrète.
- Les introductions répondent rapidement au besoin sans dépendre de JavaScript.
- Le contenu principal est livré directement en HTML et reste lisible par un robot sans exécuter l'interface.
- Les liens internes relient bien les sous-thèmes : exposition, arrosage, pots, chaleur, vent, calendrier et cultures associées.
- Les 52 articles autorisent de larges extraits avec `max-snippet:-1`.
- Les images ont des textes alternatifs et le sitemap contient des informations d'image utiles à la recherche multimodale.
- `robots.txt` autorise l'exploration générale et ne bloque pas OAI-SearchBot.
- La page d'accueil, `robots.txt`, `llms.txt`, le sitemap et un article test ont renvoyé un statut HTTP 200 en production avec un user-agent OAI-SearchBot lors de l'audit.
- Le sitemap contient les 52 URL canoniques d'articles.
- Un fichier `llms.txt` présente clairement le site, ses thèmes, ses auteurs et sa navigation principale.

## Points de vigilance

### Les données structurées ne suffisent pas à produire une preuve

Les schémas `BlogPosting`, `FAQPage` et `HowTo` facilitent la compréhension, mais ils ne prouvent pas l'exactitude d'un conseil. Google précise d'ailleurs qu'il n'existe pas de balisage spécial pour les résultats génératifs. Le gain principal viendra donc de la qualité propre du contenu, de son originalité et de preuves visibles.

### `llms.txt` est utile comme sommaire expérimental, pas comme levier garanti

Le fichier est propre et accessible, mais :

- Google déclare ne pas utiliser `llms.txt` comme signal particulier ;
- la documentation officielle OpenAI consultée insiste sur l'accès d'OAI-SearchBot, sans présenter `llms.txt` comme condition d'inclusion ;
- il annonce 51 guides alors que le projet contient maintenant 52 articles canoniques ;
- il ne contient aucun lien direct vers un article individuel ;
- il mentionne une galerie disponible en production, mais dont la source n'est pas présente dans le dépôt local audité.

Il faut le conserver seulement s'il reste facile à mettre à jour. Un fichier obsolète peut envoyer un signal documentaire contradictoire, même s'il n'affecte pas directement le classement Google.

### La visibilité réelle n'est pas déductible du code

Une bonne préparation ne garantit pas une citation. Les moteurs peuvent varier leurs réponses selon la requête, le pays, la fraîcheur de leur index et les sources concurrentes. Sans accès aux rapports de production, il est impossible d'affirmer combien de fois EcoBalcon est réellement cité.

## Priorités restantes

### Suivi du 12 juillet 2026

- **Priorité 1 traitée sur le premier lot :** les sept articles signalés ci-dessous comportent désormais une rubrique « Sources et méthode de vérification », des liens institutionnels au niveau des affirmations principales et une date de révision visible. Les affirmations insuffisamment étayées sur l'eau de cuisson, le calendrier lunaire, la canicule et les traitements maison ont été reformulées.
- **Priorité 2 traitée sans inventer de qualifications :** la page À propos décrit maintenant la sélection des sources, les limites, les mises à jour et le circuit de correction. Les trois profils auteurs affichent leur cadre de vérification et renvoient vers cette méthode. Aucun diplôme, parcours ou compte externe non vérifié n'a été ajouté.
- **Travail encore progressif :** ces améliorations concernent le premier lot prioritaire de sept articles. Les autres contenus historiques devront être sourcés au fil de leurs révisions.

### 1. Impact élevé - ajouter des sources et une méthode de vérification

Constat :

- aucun des 52 articles n'a de rubrique `Sources`, `Références` ou `Bibliographie` ;
- aucun article ne comporte de lien éditorial vers une source indépendante ou institutionnelle ;
- les seuls domaines externes liés depuis les articles sont les réseaux sociaux et des liens affiliés Amazon ;
- certains conseils précis portent pourtant sur des volumes, fréquences, températures, maladies, eau, compost ou sécurité.

Correction conseillée :

- commencer par les articles qui donnent les recommandations les plus sensibles ou chiffrées ;
- citer deux à cinq sources primaires ou institutionnelles réellement utilisées, par exemple INRAE, ANSES, ADEME, services publics, universités ou organismes horticoles reconnus ;
- placer les liens au niveau de l'affirmation concernée et ajouter une courte rubrique de sources en fin d'article ;
- préciser quand un conseil relève d'un retour pratique EcoBalcon plutôt que d'une règle générale ;
- ne pas ajouter une liste de sources décorative : chaque référence doit soutenir une affirmation visible.

Premiers articles à traiter :

- `articles/potager-balcon-eau-de-cuisson/index.html` ;
- `articles/calendrier-lunaire-balcon/index.html` ;
- `articles/feuilles-blanches-balcon-oidium/index.html` ;
- `articles/utilisation-compost-sur-balcon/index.html` ;
- `articles/recuperer-eau-de-pluie-balcon/index.html` ;
- `articles/proteger-son-balcon-des-nuisibles-naturellement/index.html` ;
- `articles/plantes-qui-survivent-a-la-canicule/index.html`.

### 2. Impact élevé - renforcer les preuves d'expérience et l'identité des auteurs

Les trois profils auteurs sont bien reliés aux articles, mais ils décrivent surtout leurs thèmes et leur approche. Ils ne donnent pas d'éléments permettant de vérifier un parcours, une pratique, une zone climatique, une méthode de test ou une responsabilité éditoriale précise.

Correction conseillée :

- ajouter uniquement des informations vraies et vérifiables sur l'expérience de chaque auteur ;
- expliquer qui teste, rédige, relit et met à jour les conseils ;
- préciser le contexte des essais : type de balcon, exposition, région climatique, volume des pots, durée d'observation ;
- ajouter une politique éditoriale courte : sélection des sources, gestion des corrections, fréquence de révision et usage éventuel de l'IA ;
- relier les profils à des présences externes authentiques avec `sameAs` seulement lorsqu'elles existent réellement.

Ne pas inventer de diplôme, de biographie ou d'expérience pour renforcer artificiellement l'E-E-A-T.

### 3. Impact élevé - produire davantage de contenu non interchangeable

Le simulateur et l'attention portée au poids, au vent, à l'eau et aux voisins sont de bons éléments différenciants. Les articles gagneraient toutefois à montrer davantage de données propres.

Correction conseillée :

- publier des essais comparatifs réellement menés sur balcon ;
- présenter des tableaux de résultats : volume du pot, exposition, fréquence d'arrosage, température du contenant, rendement ou durée d'autonomie ;
- ajouter des photos originales datées montrant les étapes, les échecs et les résultats ;
- expliciter les limites d'un conseil selon le climat, le vent, le matériau du pot ou l'étage ;
- transformer les observations du simulateur en contenus éditoriaux utiles, sans créer en masse des pages répétitives.

### 4. Impact moyen - rendre la fraîcheur visible

Les métadonnées indiquent une `dateModified` différente de la date de publication sur 24 articles, mais aucune des 52 pages n'affiche clairement une date de mise à jour au lecteur.

Correction conseillée :

- afficher « Mis à jour le… » lorsque la révision est substantielle ;
- garder `dateModified`, le sitemap et la date visible synchronisés ;
- décrire brièvement les changements importants lorsque le sujet évolue ;
- réviser en priorité les calendriers saisonniers, les conseils liés au climat, les maladies et les recommandations de matériel.

### 5. Impact moyen - mettre en place une mesure GEO

Correction conseillée :

- consulter le rapport de performance des fonctions d'IA générative dans Google Search Console lorsqu'il est disponible pour le site ;
- suivre les visites contenant `utm_source=chatgpt.com` et les référents provenant des assistants IA dans Analytics ;
- analyser les journaux serveur pour OAI-SearchBot et les autres robots autorisés ;
- conserver un jeu stable de 20 à 30 requêtes représentatives, par exemple « quel volume de pot pour tomates cerises sur balcon » ou « que planter sur un balcon venteux » ;
- relever chaque mois le moteur testé, la date, la présence d'EcoBalcon, l'URL citée, la position du lien et les concurrents cités ;
- mesurer aussi les conversions utiles : consultation du simulateur, checklist, pages vues et engagement.

### 6. Impact faible à moyen - accélérer la découverte des mises à jour

Le sitemap est propre et suffit comme base. Pour les nouveaux articles et les révisions importantes, IndexNow peut accélérer la notification à Bing et aux moteurs participants.

Correction conseillée :

- envisager IndexNow dans le processus de publication ;
- soumettre seulement les URL ajoutées, modifiées ou supprimées ;
- ne pas remplacer le sitemap par IndexNow ;
- contrôler les résultats dans Bing Webmaster Tools.

### 7. Faible impact - maintenir `llms.txt` sans le surévaluer

Correction conseillée :

- remplacer « 51 guides » par « 52 guides » ;
- ajouter une sélection limitée de 10 à 15 guides piliers, regroupés par intention ;
- vérifier que chaque ressource mentionnée existe aussi dans le dépôt ou documenter son mode de génération ;
- automatiser sa mise à jour depuis les données d'articles si le fichier devient coûteux à maintenir ;
- ne pas créer de versions Markdown intégrales de tous les articles uniquement pour le GEO.

## Ce qui n'est pas prioritaire

Les actions suivantes ne ressortent pas comme nécessaires pour EcoBalcon :

- créer un nouveau schéma `GEO`, `AI` ou `LLM` inexistant ;
- découper artificiellement chaque paragraphe en micro-réponses ;
- réécrire tous les articles pour répéter davantage de requêtes longue traîne ;
- multiplier les pages presque identiques pour chaque formulation de question ;
- ajouter des mentions artificielles sur des sites tiers ;
- bloquer GPTBot en pensant améliorer la visibilité dans ChatGPT Search ; la politique d'entraînement et l'accès d'OAI-SearchBot sont deux décisions distinctes ;
- ajouter un flux RSS uniquement pour satisfaire une prétendue exigence GEO.

## Recommandation d'ordre d'action

1. Sourcer les articles les plus factuels, sensibles ou chiffrés.
2. Documenter la méthode éditoriale et renforcer les profils avec des éléments vérifiables.
3. Publier des essais, observations, tableaux et images réellement propres à EcoBalcon.
4. Afficher et synchroniser les dates de mise à jour substantielles.
5. Mettre en place un tableau de mesure des citations et du trafic génératif.
6. Envisager IndexNow pour les nouveautés et mises à jour importantes.
7. Corriger et maintenir `llms.txt` comme sommaire expérimental.

## Vérification effectuée

Audit local réalisé sur les fichiers du projet et contrôle ponctuel de la production :

- analyse des 52 pages canoniques d'articles ;
- vérification de `robots.txt`, `sitemap.xml` et `llms.txt` ;
- comptage des schémas `BlogPosting`, `FAQPage`, `HowTo` et des blocs de faits clés ;
- vérification des liens vers les pages auteurs ;
- inspection des profils auteurs et de la page À propos ;
- recherche de sources, références, liens institutionnels, tableaux et signaux d'expérience directe ;
- comparaison de `datePublished` et `dateModified` ;
- vérification de la présence visible des dates de mise à jour ;
- test HTTP de la page d'accueil, de `robots.txt`, de `llms.txt`, du sitemap et d'un article avec un user-agent OAI-SearchBot ;
- lecture d'un article de production avec un extracteur web pour confirmer que le contenu principal est accessible et correctement structuré.

N'ont pas pu être vérifiés depuis le dépôt :

- citations réelles dans les réponses des différents moteurs génératifs ;
- rapports Google Search Console et Bing Webmaster Tools ;
- trafic provenant de ChatGPT, Copilot, Perplexity, Claude ou Google AI ;
- journaux complets de crawl des robots IA ;
- éventuels blocages appliqués par le CDN ou l'hébergeur selon les adresses IP ;
- authenticité ou vérifiabilité externe des profils auteurs.

## Sources officielles consultées

- [Google Search Central - Optimizing your website for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google Search Central - AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google Search Central - Rapports de performance IA générative dans Search Console](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports)
- [OpenAI - Publishers and Developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)
- [Bing Webmaster Tools - IndexNow](https://www.bing.com/webmasters/help/indexnow-0z209wby)
- [IndexNow - Documentation du protocole](https://www.indexnow.org/documentation)

## Conclusion

EcoBalcon est déjà techniquement prêt pour l'exploration et l'extraction par les moteurs génératifs. Le prochain palier ne consiste pas à ajouter davantage de balises, mais à rendre les conseils plus démontrables, plus originaux et plus faciles à attribuer. La priorité GEO est donc éditoriale : sources visibles, expérience réelle, méthode transparente, mises à jour explicites et mesure des citations.
