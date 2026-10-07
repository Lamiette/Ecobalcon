# Refonte de l’ergonomie du simulateur — 7 octobre 2026

## Problème traité

La page présentait simultanément le simulateur, le diagnostic, le catalogue, trois calculateurs, le comparateur de compostage et la checklist. Le besoin confirmé est de réduire la quantité d’outils et d’informations affichés en même temps.

## Parcours livré

- Un seul outil visible à la fois : plantes, pots, absence, compost ou catalogue.
- Le choix des plantes commence par l’objectif et le soleil. Le vent et la place sont facultatifs et repliés au départ.
- Les réponses inconnues sont autorisées. Sans exposition connue, les résultats rappellent qu’il faut affiner les idées avant de choisir une plante.
- Jusqu’à trois suggestions visibles immédiatement ; les autres suggestions et les conseils se déplient à la demande.
- Volume minimal du pot, difficulté, saison et éventuelles limites restent visibles dans les cartes.
- Un bouton permet de transférer une plante vers le calculateur de pot.
- Le plan de démarrage et les accessoires sont accessibles dans des panneaux repliables. La mention Amazon apparaît avec les recommandations affiliées.
- Le catalogue montre ses 30 plantes sans imposer un filtre. La recherche accepte les mots sans accents et un bouton efface les filtres.
- Les calculateurs refusent les nombres vides, décimaux ou hors de leurs limites plutôt que de les corriger silencieusement.
- Les critères restent partageables par URL et mémorisés localement ; le bouton Recommencer les efface.

## Vérifications

- Chrome sur ordinateur et à 390 pixels de large : parcours initial, sélection, détails repliables et navigation entre outils.
- Trois cartes principales visibles, autres suggestions dans un panneau fermé par défaut.
- Soleil + aromatiques : huit suggestions ; ombre + facile : quatre suggestions avec les périodes de plantation.
- Critères facultatifs vent/place, sélection sans critères et restauration après rechargement.
- Transfert Lavande vers le calculateur : 10 L pour un plant, 20 L pour deux ; zéro plant rejeté.
- Arrosage : le contexte chaud et la durée modifient le risque ; 99 jours rejetés.
- Compost : 40 L en culture gourmande donne le repère existant de 3 L ; comparaison des quatre solutions accessible à la demande.
- Recherche « epinard » : une fiche ; réinitialisation : 30 fiches.
- Tableau de compostage : cadre mobile de 267 pixels, contenu défilable de 574 pixels, sans débordement de la page.
- Mention d’affiliation visible lorsque les suggestions contiennent un lien Amazon.
- Aucune erreur JavaScript observée dans la console sur la version finale.
- Syntaxe JavaScript, liens et fichiers locaux, unicité des IDs, références des labels/panneaux, JSON-LD et empreintes CSP vérifiés.
- CSS minifié régénéré ; date du simulateur actualisée dans le sitemap ; cache et URLs des ressources versionnés.
- Diff relu et contrôle des espaces effectué. Contenu de l’accueil préservé, fichiers générés sans changement de contenu remis à leurs fins de ligne originales.

Les données plantes et les formules horticoles restent celles du site. Cette intervention porte sur l’ergonomie et la validation des saisies, pas sur une validation scientifique des estimations.

## État

Modifications locales, non publiées. Aperçu : http://localhost:8012/simulateur/

Sources : `simulateur/index.html`, `js/simulateur.js`, `css/style.css` et `sw.js`. Le CSS minifié et le sitemap ont été régénérés avec le script habituel, sans `-RebuildHome`.
