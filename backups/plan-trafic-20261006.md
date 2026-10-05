# EcoBalcon : améliorations du trafic du 6 octobre 2026

Les modifications sont préparées dans le projet local. Aucun commit, push, déploiement ni publication sur un réseau social n’a été effectué.

## Ce que montre la Search Console

Rapport Web de la propriété `ecobalcon.com`, consulté dans le compte EcoBalcon. Périodes affichées : 4 juillet–3 octobre 2026 pour les trois mois ; 6 septembre–3 octobre 2026 pour les 28 jours. Les résultats n’incluent donc pas encore les modifications du 5 ou du 6 octobre.

| Période | Clics | Impressions | CTR | Position moyenne |
| --- | ---: | ---: | ---: | ---: |
| Trois mois | 129 | 6 890 | 1,9 % | 23,4 |
| 28 jours | 34 | Environ 1 880 | 1,8 % | 23,8 |

La page sur l’eau de pluie concentre **89 des 129 clics**, soit environ 69 %. Sur les 28 jours, elle reçoit 23 des 34 clics. C’est le premier sujet à consolider, tout en développant d’autres pages pour réduire cette dépendance.

| Page | Clics sur trois mois | Impressions | Position moyenne | Action effectuée |
| --- | ---: | ---: | ---: | --- |
| Récupérer l’eau de pluie sur balcon | 89 | 1 778 | 8,8 | Titre conservé ; description précisée, comparaison des dispositifs et schéma original avec calculs de volumes |
| Poivrons sur balcon | 6 | 627 | 9,7 | Titre et description centrés sur le poivron en pot ; réponse sur le contenant, le soleil et les fruits verts |
| Bouturer du basilic | 0 | 203 | 18,3 | Titre et description plus précis ; explication du nœud, des feuilles hors de l’eau et du moment de replantation |
| Épinards sur balcon | 0 | 135 | 8,6 | Titre explicite ; récolte sans arracher le plant et repères de contenant clarifiés |
| Que planter en octobre | 2 | 114 | 6,9 | Titre précisant légumes et fleurs ; accès saisonnier ajouté au simulateur |

Ces moyennes regroupent des requêtes et des appareils différents. Elles ne signifient pas que chaque recherche se trouve à cette position. Avec ce volume, quelques clics peuvent changer fortement le CTR.

### Les requêtes utiles pour choisir les actions

- Eau de pluie, trois mois : « récupérateur eau de pluie balcon sans gouttière » apporte 29 clics pour 254 impressions, position 4,3. Sur 28 jours, cette requête apporte 7 clics pour 63 impressions, position 4,8. Le contenu existant qui répond à cette recherche a été conservé.
- Poivrons, 28 jours : « poivron en pot balcon » a 21 impressions, position 7,4 ; « poivron en pot plein soleil » a 11 impressions, position 8,8. Ces deux requêtes n’ont aucun clic affiché. Les 2 clics de la page ne sont pas attribuables à ces lignes : certaines requêtes ne sont pas affichées par Google.
- Bouturage, trois mois : « bouturer basilic dans l eau » a 6 impressions, position 14,3 ; « bouture de basilic dans l’eau » a 6 impressions, position 15,8. La recherche plus générale « bouture basilic » est nettement plus loin, position 41,3. Le potentiel immédiat se situe davantage dans la méthode dans l’eau.
- Épinards : seulement quelques requêtes sont visibles, dont « comment recolter les epinards » avec une impression, position 16. Le choix de cette page s’appuie surtout sur ses impressions globales et son utilité saisonnière ; les données ne permettent pas d’expliquer son CTR à elles seules.
- Octobre : les totaux de page sont disponibles, mais le tableau de requêtes n’affiche aucune donnée. Aucun mot-clé précis supplémentaire n’a été déduit de cette absence.

Le guide des fleurs comestibles n’est pas prioritaire malgré ses 207 impressions et sa position moyenne de 7,3. Deux recherches contenant `little-womens.com` représentent 174 impressions visibles. Ces recherches semblent viser un autre site : vouloir améliorer ce CTR par un titre plus accrocheur serait un diagnostic insuffisant.

## Modifications durables dans le projet

Les changements éditoriaux sont dans `scripts/article-overrides.ps1`, y compris le corps du guide des poivrons désormais conservé dans cette source. Le rebuild a régénéré les pages, les métadonnées sociales, les données structurées et le sitemap. La page d’accueil est préservée.

Le schéma original `images/articles/collecte-pluie-surface.svg` illustre la formule « litres = pluie en mm × surface horizontale en m² ». Les volumes sont théoriques avant pertes, sans revendication d’essai personnel. Les nouvelles explications horticoles renvoient aux sources consultées ci-dessous.

Le maillage interne a été renforcé avec sept liens contextuels :

- calendrier → guides de mai, juin et arrosage des vacances ;
- guide du basilic → arrosage des vacances ;
- aromatiques et balcon à l’ombre → guide de la menthe ;
- poivrons → laitues pour un emplacement insuffisamment ensoleillé.

Le simulateur renvoie maintenant au guide d’octobre en octobre et à celui de novembre en novembre. Le service worker change de version pour actualiser le cache.

### Contrôle de l’indexation

Le rapport consulté affiche 59 URLs dans l’index et 74 non indexées, avec une dernière mise à jour indiquée au 21 septembre 2026 :

| Motif | Nombre |
| --- | ---: |
| Exclue par noindex | 37 |
| Introuvable (404) | 11 |
| Page avec redirection | 6 |
| Autre page avec canonique correcte | 2 |
| Explorée, actuellement non indexée | 14 |
| Détectée, actuellement non indexée | 3 |
| Google choisit une autre canonique | 1 |

Ces 74 URLs ne correspondent pas à 74 articles perdus. Des exemples sont des adresses anciennes, notamment `/guide-epinards-sur-son-balcon/`, `/articles/calendrier-lunaire-balcon.html` et `/articles/tomates-cerises-balcon.html`. Le projet contient déjà des redirections pour les anciennes adresses d’articles. Les exclusions par noindex et les redirections peuvent être volontaires.

Des URLs canoniques figurent aussi dans « explorée, actuellement non indexée » : jardiner sur un balcon, balcon durable, DIY pots, rempotage, utilisation du compost, laitues et petits fruits. Les dates d’exploration sont hétérogènes ; certains de ces articles ont néanmoins des impressions dans le rapport de performances. Il faut inspecter individuellement leur état actuel après publication avant de conclure à un blocage commun.

Les adresses historiques de galerie et `/articles-jardiner-sur-votre-balcon` demandent un contrôle séparé de leur destination souhaitée. La galerie n’existe plus dans ce projet local. Aucune redirection vers une page sans rapport n’a été ajoutée. La vérification HTTP directe du site public depuis le terminal n’a pas abouti ; aucune résolution en production n’est donc annoncée.

## Test Pinterest prêt à démarrer

Deux PNG originaux de 1000 × 1500 px sont dans `backups/pinterest-20261006/` : `pluie-sans-gouttiere.png` et `balcon-octobre.png`. Ils ont été ouverts et contrôlés visuellement. Le script `generer-visuels.ps1` permet de les reproduire. Aucune épingle n’a été publiée.

### Deux premières épingles

**Visuel : pluie-sans-gouttiere.png**

Titre : Récupérer l’eau de pluie sur balcon sans gouttière : combien de litres ?

Description : Un grand bidon ne suffit pas : la surface exposée à la pluie détermine la collecte. Compare une ouverture de 20 cm et une surface de 50 × 50 cm avec une même averse de 10 mm. Le guide explique les solutions, leurs limites et le stockage sur balcon.

Texte alternatif : Comparaison des volumes théoriques collectés sous 10 mm de pluie : environ 0,3 litre sur une ouverture de 20 cm de diamètre et 2,5 litres sur une surface de 50 par 50 cm.

Destination : https://ecobalcon.com/articles/recuperer-eau-de-pluie-balcon/?utm_source=pinterest&utm_medium=social&utm_campaign=balcon_automne_2026&utm_content=pluie_surface

**Visuel : balcon-octobre.png**

Titre : Que planter en octobre sur un balcon ? Trois choix selon ton exposition

Description : Mâche adaptée à l’automne si ton balcon reste doux et lumineux, plants de salades d’hiver quand le froid arrive tôt, pensées pour garder des fleurs. Choisis selon les conditions chez toi et vérifie le drainage avant de relancer les pots.

Texte alternatif : Trois choix pour un balcon en octobre : mâche en conditions douces et lumineuses, plants de salades d’hiver à protéger, pensées ou violas pour les fleurs.

Destination : https://ecobalcon.com/articles/que-planter-en-octobre-sur-un-balcon/?utm_source=pinterest&utm_medium=social&utm_campaign=balcon_automne_2026&utm_content=octobre_choix

### Calendrier proposé, à compter de la publication du site

| Semaine | Épingle 1 | Épingle 2 | Vérification |
| --- | --- | --- | --- |
| 1 | Eau de pluie : les litres collectables, visuel prêt | Octobre : trois choix, visuel prêt | Vérifier les destinations et noter les premiers clics sortants |
| 2 | Eau de pluie : que faire sur un balcon couvert ? | Épinards : récolter sans arracher le plant | Préparer deux visuels spécifiques ; comparer les clics par épingle |
| 3 | Novembre : choisir entre planter et protéger | Menthe : pourquoi lui réserver un pot ? | Favoriser les sujets réellement consultés |
| 4 | Novembre : bulbes et petits contenants | Basilic : repérer le nœud avant de couper | Vérifier que la culture proposée correspond à la saison ; basilic en emplacement intérieur adapté |
| 5 | Épinards : surveiller un pot en saison fraîche | Eau de pluie : stockage et nettoyage | Nouvelle mise en page, pas une copie identique des premières épingles |
| 6 | Calendrier : préparer la suite du balcon | Le sujet ayant obtenu le plus de visites utiles | Faire le bilan et décider de poursuivre ou d’ajuster |

Les semaines 2 à 6 sont des briefs : les dix visuels correspondants restent à produire. La cadence de deux épingles par semaine est une hypothèse de test, pas une garantie de trafic.

## Mesurer après publication

1. Noter la date réelle de mise en ligne, puis vérifier les cinq pages et l’image du schéma sur le domaine public.
2. Inspecter ces URLs canoniques dans Search Console. Une demande d’indexation n’a d’intérêt qu’une fois le contenu public ; elle n’a pas été lancée pour les modifications locales.
3. Au bout de 28 jours complets après publication, comparer clics, impressions et CTR page par page avec les 28 jours précédents, puis regarder les mêmes requêtes quand elles sont disponibles.
4. Tenir compte de la saison : les poivrons et le basilic peuvent perdre de la demande en automne alors que novembre gagne en visibilité. Une baisse d’impressions ne prouve pas que le changement a échoué.
5. Pour Pinterest, regarder surtout les clics sortants et les visites sur le site. Les URLs UTM permettent une attribution dans les outils analytics lorsque le consentement et le suivi sont actifs. Ne pas confondre impressions Pinterest, visites et ventes Amazon.

Avec 34 clics Google sur 28 jours, l’objectif immédiat est d’augmenter les visites pertinentes. Aucune projection fiable de commissions ni de doublement de trafic ne peut être déduite de ce petit échantillon. Les captures Amazon précédentes couvrent une autre période ; elles ne permettent pas de calculer un taux de conversion Google → Amazon.

## Vérifications réalisées

- Rebuild réussi sans `-RebuildHome` ; accueil identique au contenu initial.
- Références locales, images et JSON-LD vérifiés sur neuf pages concernées.
- Syntaxe du simulateur et du service worker vérifiée avec Node.
- Schéma contrôlé dans le navigateur sur ordinateur et à 390 px ; tableau défilant dans son conteneur sur mobile.
- Les cinq guides ont été ouverts dans le navigateur ; leurs titres, leur contenu et leurs images principales s’affichent. Un essai du simulateur confirme le lien « voir le guide du moment » vers octobre.
- Les premiers fichiers affichés venaient du cache local ; après actualisation, les styles régénérés sont bien appliqués.
- Les changements supplémentaires dans les cartes « À lire aussi », les pages d’auteurs et l’index sont les sorties du générateur, notamment lorsque des descriptions ou dates changent.

## Références

- [Google : créer un contenu utile et fiable](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).
- [Google : bonnes pratiques pour les liens](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).
- [Google : rapport de performances](https://support.google.com/webmasters/answer/7576553).
- [RHS : culture des poivrons](https://www.rhs.org.uk/vegetables/peppers/grow-your-own), consulté le 6 octobre 2026.
- [RHS : culture et récolte des épinards](https://www.rhs.org.uk/vegetables/spinach/grow-your-own), consulté le 6 octobre 2026.
- [Université de Californie : multiplication des plantes](https://ucanr.edu/blog/over-fence-alameda-county/article/plant-propagation-home-gardeners-comprehensive-guide), consulté le 6 octobre 2026.
