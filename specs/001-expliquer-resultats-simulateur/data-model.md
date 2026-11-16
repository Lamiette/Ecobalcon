# Modèle des explications de résultat

Ce document décrit les données utilisées par l'affichage. Il ne crée ni base de
données, ni API, ni nouveau format de sauvegarde. Voir [recherche](research.md).

## Réponses de la dernière recherche

Objet `filters` existant, capturé dans `runSimulation` :

| Champ | Valeurs autorisées |
| --- | --- |
| `exposition` | `""`, `soleil`, `mi-ombre`, `ombre` |
| `objectif` | `""`, `aromatiques`, `legumes`, `fleurs`, `facile` |
| `vent` | `""`, `abrite`, `modere`, `fort` |
| `place` | `""`, `petit`, `moyen`, `grand` |

La chaîne vide laisse le critère ouvert : l'objectif permet de « Découvrir les
possibilités » sans priorité ; les autres champs représentent une information
inconnue du balcon. Un critère ouvert ne correspond jamais à une condition confirmée.
Les textes utilisent les libellés existants.
Les explications reçoivent cet objet, sans relire directement les champs du formulaire.

La saisie en cours peut différer du snapshot : seul le message d'actualisation le
signale. La persistance conserve exclusivement les réponses via la clé existante
`ecobalcon-simulateur` et les quatre paramètres d'URL existants.

## Plante existante

Les 30 objets de `js/plants-data.js` restent inchangés.

| Champ utilisé | Rôle dans cette évolution |
| --- | --- |
| `name` | Identité existante, titre, ordre de référence, accès au guide et au pot |
| `exposure`, `goals` | Expliquer les correspondances déjà vérifiées par la sélection |
| `wind`, `space` | Décrire les correspondances ou réserves des réponses connues |
| `months` | Période indicative de semis/plantation ; appartenance au mois de référence |
| `potLiters` | Volume minimal existant, exprimé en litres pour le pot |
| `difficulty` | Difficulté de culture telle qu'indiquée dans le catalogue |
| `description`, `tips` | Conseils existants, conservés dans leur disclosure |

`plantArticles[name]` fournit le guide lorsqu'il existe. L'absence de guide ne
déclenche pas la création d'un lien ou d'un contenu fictif.

## Explication d'une suggestion

Un helper de présentation, proposé sous le nom `buildResultExplanation`, dérive
un objet éphémère de `(plant, filters)` et du `currentMonth` déjà capturé.
Il n'ajoute aucun score, ne filtre pas et n'ordonne pas la sélection.

| Élément dérivé | États et règles |
| --- | --- |
| Raisons de sélection | Exposition et objectif connus compatibles ; réponse vide = critère non vérifié |
| Vent | `correspondance` si réponse connue incluse dans `wind` ; sinon `reserve` ; réponse vide = `inconnu` |
| Place | Même règle à partir de `space` ; réserve textuelle si le choix ne correspond pas |
| Saison | `dansPeriode`, `horsPeriode`, ou `periodeInconnue` |
| Volume | Valeur finie positive connue ; sinon texte « Volume minimal du pot à vérifier » |
| Difficulté | Texte connu non vide ; sinon « Difficulté de culture à vérifier » |
| Actions | Conseils, calcul du pot, guide conditionnel existants |

Les noms exacts des propriétés internes peuvent suivre les conventions du script
lors de l'implémentation ; les états et leurs conditions constituent le contrat.
Le helper peut alimenter les badges existants et les phrases visibles sans
dupliquer les mêmes raisons dans plusieurs blocs.

### Saison et informations absentes

- `months` connu et non vide : utiliser la période existante et le mois de référence.
- Si le mois figure dans cette période, expliquer « semer ou planter » ; sinon,
  afficher la période connue et indiquer que la suggestion prépare un autre mois.
- Une période absente ou vide signifie « Période de semis ou plantation à vérifier ».
  Elle ne signifie ni « toute l'année », ni une récolte, ni une compatibilité climatique.
- Le nombre de suggestions de saison porte sur la sélection retournée, pas sur
  l'ensemble du catalogue. À zéro et avec des résultats, l'indiquer explicitement.
- Si certaines périodes sont inconnues, préciser que le calendrier reste à vérifier
  pour ces fiches ; ne pas déclarer toutes les plantes certainement hors période.
- Les fixtures de données manquantes s'appliquent au helper/rendu : elles ne modifient
  pas les hypothèses d'entrée ni les règles de l'algorithme de sélection existant.

## Explication globale

Objet de présentation éphémère, proposé sous le nom `buildSelectionExplanation` :
réponses utilisées, nombre de résultats, nombre de résultats de saison, mois de
référence, limites connues et messages applicables. La liste des messages s'accumule
sans écrasement : exposition inconnue, vent fort et absence de saison peuvent coexister.

Les cas sans résultat et sans réponse reçoivent un texte adapté. Les huit résultats
ne sont pas présentés comme le catalogue complet ni comme un diagnostic garanti.

## Transitions de l'interface

| Événement | Résultat attendu |
| --- | --- |
| Premier chargement sans choix restauré | Panneau de résultats masqué, aucune explication active |
| Soumission | Snapshot des quatre réponses ; sélection existante ; reconstruction de tous les messages |
| Modification d'un champ | Résultats et explications conservés ; statut indiquant qu'il faut relancer |
| Nouvelle soumission non vide | Anciennes réserves retirées ; nouvelles explications et actions cohérentes |
| Nouvelle soumission vide | Cartes et explications précédentes effacées ; message vide et accès au catalogue |
| Restauration URL/stockage valide | Même traitement que la recherche actuelle, sans focus forcé |
| Réinitialisation | Snapshot affiché, cartes et messages effacés ; panneau masqué ; focus sur l'objectif |

La restauration garde les priorités, l'assainissement et les replis actuels. Le
mois n'est ni enregistré ni ajouté à l'URL. Un nouveau chargement le recalcule.
