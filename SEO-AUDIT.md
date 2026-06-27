# Audit SEO - EcoBalcon

- **Date :** 27 juin 2026
- **Site :** https://ecobalcon.com
- **Note actuelle :** 9,6 / 10

## Synthese

EcoBalcon est maintenant tres solide techniquement : indexation propre, sitemap coherent, canonicals corrects, donnees structurees valides, auteurs relies aux articles, aucun lien interne casse detecte, aucune image manquante, aucun format image incoherent et plus aucune image referencee au-dessus de 500 Ko.

Les trois priorites precedentes sont traitees : formats reels des images, compression des assets lourds et meta descriptions trop longues. Les derniers gains SEO sont surtout editoriaux : enrichir deux pages categories encore fines et raccourcir quelques titles legerement longs.

## Score par axe

| Axe | Note | Commentaire |
| --- | ---: | --- |
| Indexation | 10 / 10 | 67 pages indexables et 67 URLs dans le sitemap, sans manque ni URL superflue. |
| Technique on-page | 9,5 / 10 | Titles, descriptions, H1, canonicals, OG, Twitter Cards et hreflang bien couverts. Quelques titles restent un peu longs. |
| Donnees structurees | 9,7 / 10 | JSON-LD valide, 51 `BlogPosting`, 3 `ProfilePage`, auteurs relies avec `author.url`. |
| Maillage interne | 9,6 / 10 | Aucun lien interne casse detecte dans l'audit local. |
| Images | 9,7 / 10 | Images presentes, formats reels coherents, `alt` et dimensions OK, aucun fichier reference au-dessus de 500 Ko. |
| E-E-A-T | 9,2 / 10 | Page A propos, pages auteurs enrichies, signatures et profils auteurs coherents. |
| Performance probable | 9,0 / 10 | Site statique sain et assets mieux compresses. A confirmer avec Lighthouse en production. |

## Ce qui est tres bon

- 165 fichiers HTML analyses hors `backups/` et `raw-singlefile/`.
- 67 pages indexables trouvees.
- 98 pages non indexables ou redirections, ce qui semble coherent pour les variantes et pages techniques.
- 67 URLs dans le sitemap : aucune page indexable manquante, aucune URL superflue detectee.
- Aucun lien interne casse detecte.
- Aucun fichier image reference mais absent.
- Aucun format image incoherent detecte.
- Aucune image referencee ne depasse 500 Ko.
- Toutes les images auditees ont un `alt`.
- Toutes les images auditees ont des dimensions `width` et `height`.
- Les deux images redimensionnees ont leurs attributs HTML/JS synchronises :
  - `potager-balcon-juin-tomates-unsplash.webp` : 1400 x 2494, environ 495 Ko ;
  - `haricots-nains-pot-balcon-pexels-8639507.webp` : 1400 x 1868, environ 388 Ko.
- Les favicons et l'Apple touch icon sont maintenant de vrais PNG.
- Les anciens faux `.png` photographiques ont ete remplaces par de vrais WebP.
- Aucun probleme critique de canonical detecte.
- Aucun probleme H1 detecte.
- Open Graph, Twitter Cards et hreflang sont presents sur les pages indexables.
- Aucune meta description trop longue detectee.
- Les donnees JSON-LD parsees sont valides.
- 51 articles ont un schema `BlogPosting`.
- Les 51 schemas `BlogPosting` ont un `author.url`.
- Les pages auteurs existent, sont indexables, dans le sitemap, et leurs biographies sont naturelles.
- Les fils d'Ariane `BreadcrumbList` sont presents sur les articles.
- Le `manifest.json` est present et coherent.
- Le `robots.txt` est propre et pointe vers le sitemap.
- La page d'accueil contient une `SearchAction`.
- Les liens externes et affilies audites ont les attributs `rel` attendus.

## Priorites restantes

### 1. Impact moyen - enrichir certaines pages categories

Deux pages categories restent assez fines :

| Page | Volume approx. |
| --- | ---: |
| `categories/index.html` | 175 mots |
| `categories/amenagement-du-balcon/index.html` | 181 mots |

Correction conseillee :

- ajouter une introduction utile de 250 a 400 mots ;
- ajouter 4 a 8 liens vers les meilleurs articles de la categorie ;
- ajouter une petite section de conseils pratiques ou questions frequentes ;
- garder une page sobre, orientee navigation, pas un article long.

### 2. Faible impact - ajuster quelques titles legerement longs

Quelques titles depassent legerement 60 caracteres. Ce n'est pas bloquant, mais certains resultats peuvent etre tronques.

Pages concernees :

- `index.html`
- `articles/arroser-plantes-balcon-vacances/index.html`
- `articles/calendrier-du-jardin-de-balcon/index.html`
- `articles/diy-pots-pour-le-balcon/index.html`
- `articles/fleurs-comestibles-melliferes-balcon/index.html`
- `articles/insectes-utiles-sur-un-balcon/index.html`
- `articles/jardiner-sur-un-balcon/index.html`
- `articles/petits-fruits-en-pot/index.html`
- `articles/plantes-pour-un-balcon-plein-soleil/index.html`
- `articles/potager-balcon-eau-de-cuisson/index.html`
- `articles/recuperer-eau-de-pluie-balcon/index.html`
- `articles/tomates-cerises-balcon/index.html`

Correction conseillee :

- viser 45 a 60 caracteres pour les pages strategiques ;
- ne pas sacrifier la clarte pour gagner quelques caracteres ;
- traiter surtout l'accueil et les articles qui attirent le plus de trafic.

### 3. A confirmer apres deploiement - Core Web Vitals reels

L'audit local indique une base saine, mais seul un test en production peut confirmer le LCP, l'INP et le CLS reels.

Verification conseillee :

- lancer Lighthouse mobile apres deploiement ;
- regarder le LCP des pages avec grandes images hero ;
- surveiller la Search Console apres indexation des assets mis a jour.

## Ce qui n'est plus prioritaire

Ces points ne ressortent plus comme bloquants dans l'audit actuel :

- `robots.txt` ;
- `manifest.json` ;
- sitemap XML ;
- canonicals ;
- images sans `alt` ;
- images sans dimensions ;
- images referencees mais absentes ;
- images au format reel incoherent ;
- images referencees au-dessus de 500 Ko ;
- meta descriptions trop longues ;
- liens internes casses ;
- liens externes sans `rel` ;
- JSON-LD invalide ;
- `author.url` manquant ;
- page A propos ;
- pages auteurs ;
- pages categories manquantes.

## Recommandation d'ordre d'action

1. Enrichir `categories/index.html` et `categories/amenagement-du-balcon/index.html`.
2. Ajuster les titles trop longs uniquement sur les pages les plus importantes.
3. Lancer un Lighthouse mobile en production apres deploiement.

## Verification effectuee

Audit local realise sur les fichiers du projet :

- analyse HTML statique ;
- verification du sitemap ;
- verification des canonicals ;
- verification des titles et meta descriptions ;
- verification des H1 ;
- verification Open Graph, Twitter Cards et hreflang ;
- verification des liens internes ;
- verification des liens externes et affilies ;
- verification des images, dimensions, `alt`, poids et signatures de formats ;
- parsing des donnees JSON-LD ;
- verification de `robots.txt` ;
- verification de `manifest.json`.

Un test Lighthouse en production reste utile apres deploiement pour confirmer les Core Web Vitals reels, surtout le LCP mobile.
