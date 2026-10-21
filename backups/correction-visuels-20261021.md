# Correction des visuels — 21 octobre 2026

## Demande et choix retenu

L'utilisateur a demandé de supprimer les phrases superflues inscrites dans les schémas, puis a choisi explicitement « Photos en vignette, schémas dans les articles ».

Les trois articles concernés utilisent maintenant des photographies en image principale. Le générateur reprend automatiquement cette image pour les vignettes, cartes connexes, pages auteurs et métadonnées sociales. Les schémas sont placés dans le corps, près du passage expliqué, avec chargement différé. Aucune modification du template global ni du CSS n'a été nécessaire.

## Photos : provenance vérifiée en interne

Pages sources, images et licences consultées le 21 octobre 2026 ; photographies téléchargées et inspectées visuellement. Aucun crédit ou lien de licence ajouté aux pages publiques.

| Article | Photo et source | Licence | Fichier local |
| --- | --- | --- | --- |
| Réutiliser le terreau | [Pixabay, mains tenant du terreau au-dessus d'un pot](https://pixabay.com/photos/woman-hands-plant-maintenance-9642492/) | [Pixabay Content License](https://pixabay.com/service/license-summary/), attribution non obligatoire | images/articles/reutiliser-terreau-mains-pixabay-9642492.jpg |
| Protéger les pots du gel | [Unsplash, nine koepfer, pot et mobilier sous la neige](https://unsplash.com/photos/planter-and-lantern-covered-with-snow-outdoor-Cwgvz9u9YyA) | [Unsplash License](https://unsplash.com/license), attribution non obligatoire | images/articles/pots-neige-hiver-unsplash-Cwgvz9u9YyA.jpg |
| Terreau humide en hiver | [Pexels, cottonbro studio, pot sur une surface mouillée](https://www.pexels.com/photo/golden-scissors-beside-the-potted-plant-9710613/) | [Pexels License](https://www.pexels.com/license/), attribution non obligatoire | images/articles/terreau-pot-humide-pexels-9710613.jpg |

Fichiers téléchargés :

- https://cdn.pixabay.com/photo/2025/06/05/08/54/woman-9642492_1280.jpg — 1280 × 854, 111 232 octets.
- https://images.unsplash.com/photo-1547127764-983c99e296e7?w=1200&h=800&fit=crop&q=80 — 1200 × 800, 118 170 octets.
- https://images.pexels.com/photos/9710613/pexels-photo-9710613.jpeg?w=1200&h=800&fit=crop&crop=top — 1200 × 800, 102 187 octets.

Les versions horizontales restent centrées sur les pots. La photo du pot humide est une illustration générale : elle ne prouve ni une maladie, ni un excès d'eau, ni une scène hivernale. Aucun lieu ou essai personnel n'est revendiqué.

## Schémas et prompt

Cinq lignes superflues ont été retirées : les deux phrases de sous-titre et de pied du schéma d'humidité, leurs équivalents sur le gel, et « Un exemple pour ta prochaine plantation » sur le mélange. Les titres courts, quantités et légendes utiles restent présents. Les espaces vides ont été réduits ; les dimensions HTML correspondent aux dimensions SVG actualisées.

Les images SVG intégrées utilisent une version de ressource dans leur URL afin de ne pas reprendre une copie mise en cache avec les anciennes phrases. Les photos ont des noms nouveaux ; le service worker global reste inchangé.

La section 7 de prompt codex.txt impose désormais une photo réelle sans texte comme image principale et vignette. Les schémas sont réservés au corps, sans phrases d'accompagnement ni précautions générales incrustées. Le prompt ne bascule plus automatiquement vers un schéma faute de photo.

## Contrôles

- Syntaxe PowerShell vérifiée ; rebuild exécuté sans -RebuildHome.
- Trois nouvelles photos visibles dans la grille sur ordinateur ; cadrage vérifié. Grille et trois articles contrôlés à 390 × 844 px, sans débordement horizontal. Les schémas se chargent au défilement et gardent leurs proportions. Dimension temporaire du navigateur réinitialisée.
- Cache HTML ancien constaté au premier affichage local ; après rechargement, les nouvelles photos sont bien servies. Aucun assouplissement de sécurité ou désactivation globale du cache.
- 57 articles et 175 empreintes CSP de scripts vérifiés. Seul le champ image des données Article/BlogPosting change sur les trois articles concernés ; les 54 autres corps et métadonnées sont conservés par rapport au début de cette correction.
- Présence des trois photos dans les métadonnées et sitemap ; liens et fichiers des pages concernées valides ; un schéma dans le corps de chaque article.
- Accueil identique octet pour octet à l'état précédant cette correction, compteur 57 inchangé.
- 159 sorties dont le contenu était identique ont été remises à leurs octets de référence après comparaison, pour éviter une modification de fins de ligne sans rapport avec la demande.
- Relecture indépendante en lecture seule : aucune incohérence restante observée dans le périmètre demandé.
- git diff --check réussi. État initial et résultat de validation sauvegardés sous backups/homepage/visuels-20261021-*.json, dossier déjà ignoré par Git.

Le brief de l'article et la note de validation du prompt rédigés plus tôt restent des traces de leur état à ce moment. Cette note décrit le choix visuel qui les remplace pour les images.

Prévisualisation locale : http://127.0.0.1:8765/articles/.

Les changements restent locaux, sans commit, push ni publication.
