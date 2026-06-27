# Audit SEO - EcoBalcon

- **Date :** 27 juin 2026
- **Site :** https://ecobalcon.com
- **Note actuelle :** 9,4 / 10

## Synthese

Le site est maintenant tres solide sur la base technique SEO : les pages importantes sont indexables, le sitemap est coherent, les balises essentielles sont presentes, les donnees structurees sont valides, les images referencees existent et les liens internes testes ne sont pas casses.

La note ne monte pas encore a 10 principalement a cause de points de finition : quelques images lourdes, des favicons dont l'extension `.png` ne correspond pas toujours au format reel du fichier, et certaines pages categories encore assez fines.

## Score par axe

| Axe | Note | Commentaire |
| --- | ---: | --- |
| Indexation | 9,8 / 10 | `robots.txt`, sitemap et canonicals coherents. |
| Technique on-page | 9,5 / 10 | Titles, descriptions, H1, Open Graph, Twitter Cards et hreflang bien couverts. |
| Donnees structurees | 9,5 / 10 | JSON-LD valide, auteurs relies aux profils avec `author.url`. |
| Maillage interne | 9,4 / 10 | Aucun lien interne casse detecte dans l'audit local. |
| Images | 8,7 / 10 | Alt, dimensions et fichiers OK, mais quelques images restent lourdes. |
| E-E-A-T | 8,8 / 10 | Page A propos, pages auteurs et signatures reliees aux articles. |
| Performance probable | 8,5 / 10 | Bonne structure statique, mais les images lourdes peuvent freiner le LCP. |

## Ce qui est tres bon

- 165 fichiers HTML analyses hors `backups/` et `raw-singlefile/`.
- 67 pages indexables trouvees.
- 67 URLs dans le sitemap : aucune page indexable manquante, aucune URL superflue detectee.
- 98 pages en `noindex`, ce qui semble coherent pour les pages non prioritaires, archives techniques ou variantes.
- Aucun lien interne casse detecte dans l'audit local.
- Aucun fichier image manquant detecte.
- Toutes les images auditees ont un `alt`.
- Toutes les images auditees ont des dimensions `width` et `height`.
- Aucun probleme critique de canonical detecte.
- Aucun probleme H1 detecte.
- Les donnees JSON-LD parsees sont valides.
- 51 articles ont un schema `BlogPosting`.
- Les 51 schemas `BlogPosting` ont maintenant un `author.url`.
- Les pages `/auteurs/`, `/auteurs/clara-fontaine/`, `/auteurs/louis-fargot/` et `/auteurs/mathias-lancet/` existent et sont dans le sitemap.
- Les fils d'Ariane `BreadcrumbList` sont presents sur les articles.
- Le `manifest.json` est present et coherent.
- Le `robots.txt` est propre et pointe vers le sitemap.
- La page d'accueil contient une `SearchAction`.
- Les liens externes audites ont les attributs `rel` attendus.

## Priorites restantes

### 1. Impact moyen - alleger les images les plus lourdes

Les images sont bien referencees, mais certaines depassent encore 500 Ko :

| Image | Poids approx. |
| --- | ---: |
| `images/articles/potager-balcon-juin-tomates-unsplash.webp` | 907 Ko |
| `images/articles/arroser-plantes-balcon-vacances.jpg` | 783 Ko |
| `images/articles/pots-chauds-balcon-pexels-5138165.jpg` | 780 Ko |
| `images/articles/bouturer-basilic-balcon-pexels-22610782.jpg` | 705 Ko |
| `images/articles/haricots-nains-pot-balcon-pexels-8639507.webp` | 704 Ko |
| `images/articles/concombre-pot-balcon-unsplash.jpg` | 649 Ko |
| `images/articles/menthe-pot-balcon-pexels-12727257.webp` | 583 Ko |
| `images/gallery-balcon-02.jpg` | 523 Ko |
| `images/articles/balcon-venteux-plantes-protection-pots.jpg` | 513 Ko |

Correction conseillee :

- convertir les `.jpg` restants en `.webp` quand c'est possible ;
- viser environ 120 a 250 Ko pour les images d'article standard ;
- garder une qualite visuelle suffisante pour les images hero ;
- verifier apres compression que les references HTML pointent toujours vers les bons fichiers.

### 2. Impact moyen/faible - corriger les favicons au bon format

Certains fichiers ont une extension `.png`, mais leur signature indique du JPEG :

- `images/favicon-32.png` est en realite un JPEG ;
- `images/favicon-192.png` est en realite un JPEG ;
- `images/apple-touch-icon.png` est en realite un JPEG ;
- `images/favicon-512.png` est bien un PNG.

Ce n'est pas un gros probleme SEO direct, mais c'est une finition technique a corriger pour eviter des comportements bizarres selon les navigateurs, les PWA et les apercus mobiles.

Correction conseillee :

- regenerer les favicons en vrais PNG ;
- conserver les memes chemins si possible pour eviter de toucher toutes les pages ;
- verifier les dimensions 32, 192, 512 et apple touch.

### 3. Impact moyen - enrichir certaines pages categories

Deux pages categories sont encore assez fines :

- `categories/index.html` : environ 177 mots ;
- `categories/amenagement-du-balcon/index.html` : environ 183 mots.

Correction conseillee :

- ajouter une introduction utile de 250 a 400 mots ;
- ajouter des liens vers les meilleurs articles de la categorie ;
- ajouter une petite section de conseils pratiques ou questions frequentes ;
- garder la page sobre, lisible et orientee navigation.

### 4. Faible impact - ajuster quelques titles et descriptions

Quelques titles sont legerement longs, autour de 63 a 65 caracteres. Ce n'est pas bloquant, mais certains resultats Google peuvent etre tronques.

Pages concernees :

- `articles/calendrier-du-jardin-de-balcon/index.html`
- `articles/fleurs-comestibles-melliferes-balcon/index.html`
- `articles/jardiner-sur-un-balcon/index.html`
- `articles/petits-fruits-en-pot/index.html`
- `articles/plantes-pour-un-balcon-plein-soleil/index.html`
- `articles/potager-balcon-eau-de-cuisson/index.html`
- `articles/recuperer-eau-de-pluie-balcon/index.html`
- `articles/tomates-cerises-balcon/index.html`

Une meta description est aussi un peu longue :

- `articles/balcon-venteux-plantes-protection-pots/index.html` : environ 168 caracteres.

Correction conseillee :

- viser 45 a 60 caracteres pour les titles les plus strategiques ;
- viser 140 a 160 caracteres pour les descriptions ;
- ne pas raccourcir si cela rend le resultat moins clair.

## Ce qui n'est plus prioritaire

Ces points etaient importants avant, mais ne ressortent plus comme bloquants dans l'audit actuel :

- `robots.txt` ;
- `manifest.json` ;
- sitemap XML ;
- canonicals ;
- images sans `alt` ;
- images sans dimensions ;
- images referencees mais absentes ;
- liens internes casses ;
- liens externes sans `rel` ;
- JSON-LD invalide ;
- fil d'Ariane manquant sur les articles ;
- footer global ;
- page A propos ;
- pages auteurs et `author.url` ;
- pages categories manquantes.

## Recommandation d'ordre d'action

1. Regenerer les favicons en vrais PNG.
2. Compresser ou remplacer les images les plus lourdes.
3. Enrichir les pages categories les plus fines.
4. Ajuster seulement les titles et descriptions des pages les plus importantes.

## Verification effectuee

Audit local realise sur les fichiers du projet :

- analyse HTML statique ;
- verification du sitemap ;
- verification des canonicals ;
- verification des liens internes ;
- verification des images ;
- parsing des donnees JSON-LD ;
- verification de `robots.txt` ;
- verification de `manifest.json`.

Un test Lighthouse en production reste utile apres deploiement pour confirmer les Core Web Vitals reels, surtout le LCP mobile.
