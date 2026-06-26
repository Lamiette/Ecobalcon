# AGENTS.md

Consignes pour les agents qui interviennent sur EcoBalcon.

## Vue d'ensemble

EcoBalcon est un site statique en français consacré au jardinage sur balcon. Le projet est principalement composé de HTML, CSS, JavaScript léger et scripts PowerShell de génération.

Le site public cible le domaine `https://ecobalcon.com`. Ne pas remplacer ce domaine par l'ancienne URL GitHub Pages sauf demande explicite.

## Structure importante

- `index.html` : page d'accueil. Le script de rebuild la préserve par défaut.
- `articles/index.html` : index des articles.
- `articles/<slug>/index.html` : pages canoniques des articles.
- `<slug>/index.html` et `articles/<slug>.html` : redirections legacy vers les pages canoniques.
- `css/style.css` : feuille de style source.
- `css/style.min.css` : version minifiée générée, à garder synchronisée avec `style.css`.
- `js/cookie-consent.js` : bannière consentement et chargement analytics.
- `js/plants-data.js` : données du simulateur.
- `images/` et `images/articles/` : assets publiés.
- `scripts/rebuild_articles.ps1` : génération principale des articles, index, redirects, sitemap, robots, pages contact/confidentialité, 404 et CSS minifié.
- `scripts/article-overrides.ps1` : overrides éditoriaux et corps d'articles structurés.
- `scripts/update_home_article_count.ps1` : met à jour le compteur d'articles sur la page d'accueil.
- `scripts/strategic_enhance.ps1` : enrichissements éditoriaux/SEO ciblés sur certains articles.
- `publish.bat` : publication complète avec `git pull`, mise à jour compteur, commit et push. Ne pas l'exécuter sans demande explicite.

## Règles d'édition

- Préserver le style existant : HTML statique lisible, classes CSS déjà en place, ton éditorial clair et pratique, tutoiement en français.
- Pour un changement de contenu d'article, privilégier `scripts/article-overrides.ps1` ou la source de génération quand elle est disponible. Les pages HTML générées peuvent être écrasées au prochain rebuild.
- Pour un changement global de template article, navigation, footer, SEO, analytics, redirections, sitemap ou pages système, modifier `scripts/rebuild_articles.ps1`, puis régénérer.
- Pour le CSS, modifier `css/style.css`, puis mettre à jour `css/style.min.css` via le rebuild.
- Ne pas modifier uniquement `css/style.min.css` sauf correction urgente explicitement demandée.
- Ne pas lancer `scripts/rebuild_articles.ps1 -RebuildHome` sans demande claire : cette option régénère aussi `index.html`.
- Éviter les refactors larges et les changements de structure d'URL non demandés. Les URLs propres avec slash final sont importantes pour le SEO.
- Conserver les métadonnées SEO : `canonical`, `hreflang`, Open Graph, Twitter Card, JSON-LD, `robots`, `sitemap.xml`.
- Conserver les attributs d'images utiles (`alt`, dimensions quand présentes, `loading`, `fetchpriority` selon le contexte).
- Ne pas changer les IDs analytics, Clarity, l'email de contact ou FormSubmit sans demande explicite.
- Ne pas supprimer les dossiers `backups/` ni les profils locaux ignorés.

## Commandes utiles

Depuis la racine du projet :

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\update_home_article_count.ps1
```

Met à jour uniquement le compteur d'articles de la page d'accueil.

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\rebuild_articles.ps1
```

Régénère les pages d'articles, redirects legacy, index articles, 404, contact, confidentialité, `sitemap.xml`, `robots.txt` et `css/style.min.css`. La page d'accueil est préservée par défaut.

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\rebuild_articles.ps1 -RebuildHome
```

À utiliser seulement si la régénération de la page d'accueil est explicitement souhaitée. Le script crée alors une sauvegarde dans `backups/homepage/`.

```powershell
git diff --check
```

Vérifie les espaces problématiques avant de livrer.

Pour tester localement le site statique, un serveur simple suffit, par exemple :

```powershell
python -m http.server 8000
```

Puis ouvrir `http://localhost:8000/`.

## Après modification

- Inspecter `git diff` pour vérifier qu'aucun fichier généré ou redirect n'a changé par accident.
- Si un script de génération a été lancé, relire les fichiers touchés avant de conclure.
- Pour les changements visibles, vérifier au moins la page concernée dans un navigateur local si possible.
- Pour les changements d'article, vérifier les liens internes, le titre SEO, la description, l'image principale et les données structurées.
- Pour les changements CSS ou layout, vérifier desktop et mobile.

## Notes éditoriales

- Le contenu doit rester concret, utile et adapté aux petits espaces urbains.
- Préférer des phrases simples, des conseils actionnables et des repères pratiques.
- Garder les liens internes pertinents entre articles connexes.
- Les articles parlent à une lectrice ou un lecteur qui jardine sur balcon : rester réaliste sur le poids des pots, l'arrosage, le vent, l'exposition, les voisins et la place disponible.
