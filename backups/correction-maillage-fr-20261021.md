# Correction du maillage et des références — 21 octobre 2026

## Périmètre et résultat

Quatre articles corrigés dans `scripts/article-overrides.ps1`, puis régénérés sans `-RebuildHome`. Les titres, descriptions, signatures, dates de publication et images sont préservés. Les dates de modification des quatre articles correspondent à cette révision. Le travail préexistant est conservé.

Comptages dans le corps, hors navigation et recommandations automatiques :

| Article | Liens internes avant → après | Liens externes avant → après |
| --- | ---: | ---: |
| Réutiliser le terreau | 4 → 6 | 6 → 1 |
| Protéger les pots du gel | 5 → 6 | 4 → 1 |
| Terreau humide en hiver | 7 → 7 | 4 → 1 |
| Que planter en novembre | 12 → 12 | 4 → 2 |

Au total : 28 → 31 liens internes et 18 → 5 liens documentaires externes, tous en français. Deux liens ajoutés dans le réemploi (ravageurs, choix du terreau de semis), un dans le gel (vent et stabilité). Le renvoi vers la protection du gel dans l’article sur le terreau humide est déplacé près des supports et du drainage. Les articles déjà suffisamment maillés ne reçoivent pas de liens artificiels.

## Références françaises ouvertes et vérifiées

- [Promesse de fleurs — réemploi du terreau](https://www.promessedefleurs.com/conseil-plantes-jardin/ficheconseil/que-faire-de-la-terre-et-du-terreau-des-vieux-pots-de-fleurs/) : mélange ancien/neuf 50:50, retrait des racines, texture aérée et exclusion du réemploi en l’état après une culture malade. Les recettes de désinfection domestique proposées ailleurs dans cette page ne sont pas reprises.
- [SNHF / Jardins de France — Gel au balcon, plantes en danger (PDF)](https://www.jardinsdefrance.org/wp-content/uploads/2018/01/JdF645_9_Nos-conseils-pratiques_v2.pdf) : enveloppe isolante, regroupement à l’abri, eau non stagnante, surveillance du dessèchement et arrosage hors gel. La stabilité et les sorties libres restent vérifiées séparément.
- [Producteurs de plants certifiés d’ail — fiche Semencemag (PDF)](https://www.semencemag.fr/images/fiches/semencemag-cultiver-ail-jardin.pdf) : variétés selon saison, possibilité en bac, choix du plant plutôt que de l’ail de consommation. Les dimensions de pot et l’espacement déjà vérifiés dans la RHS restent des repères pour un contenant ; ils ne sont pas attribués à cette fiche de pleine terre.
- [Meilland Richardier — tulipes](https://www.meillandrichardier.com/tulipes-conseils-de-plantation-taille-entretien) : octobre-décembre, profondeur de deux à trois hauteurs du bulbe, selon variété et consignes de plantation. Novembre reste une possibilité, sans être présenté comme la seule période de plantation.
- [Truffaut — pensées](https://www.truffaut.com/pensee-plantation-entretien.html) : plantations septembre-novembre hors gel, collet non enterré. Référence conservée ici sans ajouter une citation publique supplémentaire ; aucune résistance au gel universelle ni couche de billes d’argile n’est importée.

Les sources servent à vérifier des conseils précis ; leurs autres recommandations ne sont pas automatiquement validées ni importées. Les références anglophones déjà employées sont conservées ci-dessous pour la traçabilité : retirer une citation publique ne retire pas la vérification factuelle.

## Prompt

Sections 4, 6, 8 et 9 : recherche française prioritaire, exception étrangère motivée, distinction entre documentation et citations publiques, lecture des guides pertinents avant rédaction, liens internes répartis au moment utile, conservation des liens existants pertinents, contrôle des langues et des répétitions. Aucun quota ni ratio obligatoire.

La clarification des instructions s’appuie sur la [documentation officielle OpenAI](https://developers.openai.com/api/docs/guides/prompt-engineering). Les règles de langue et de maillage sont des choix éditoriaux propres à EcoBalcon.

## Contrôles

Syntaxe PowerShell valide, génération réussie, relecture éditoriale indépendante, comptages confirmés, cibles internes et ancres présentes, assets existants, métadonnées essentielles inchangées, JSON-LD parsé et sitemap XML valide. Accueil préservé à l’octet près. Contrôle navigateur local effectué : article sur le réemploi sur ordinateur, article de novembre à 390 px sur mobile, liens actualisés et absence de débordement horizontal. Relecture des différences et `git diff --check` réussis. Aucune publication effectuée.

## Références anglophones déjà présentes, archivées

### reutiliser-terreau-pots-balcon

- https://extension.okstate.edu/articles/2023/reusing_potting_soil
- https://www.rhs.org.uk/soil-composts-mulches/how-to-reuse-spent-compost
- https://yardandgarden.extension.iastate.edu/how-to/how-clean-and-disinfect-plant-containers
- https://extension.umd.edu/resource/growing-vegetables-containers-and-salad-tables
- https://extension.illinois.edu/container-gardens/soil
- https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/starting-seeds-indoors

### proteger-pots-gel-balcon

- https://www.rhs.org.uk/prevention-protection/frost-damage
- https://www.rhs.org.uk/prevention-protection/preventing-winter-damage
- https://www.rhs.org.uk/container-gardening/winter-selection

### terreau-humide-hiver-balcon

- https://www.rhs.org.uk/container-gardening/how-to-water-containers
- https://www.rhs.org.uk/container-gardening/winter-selection
- https://horticulture.ahdb.org.uk/knowledge-library/causes-of-winter-injury-in-container-grown-nursery-stock

### que-planter-en-novembre-sur-un-balcon

- https://www.rhs.org.uk/vegetables/garlic/grow-your-own
- https://www.rhs.org.uk/plants/types/bulbs/planting
- https://www.rhs.org.uk/container-gardening/winter-selection
- https://www.rhs.org.uk/prevention-protection/preventing-winter-damage
