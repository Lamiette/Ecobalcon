# Fiche des cinq essais débutants

Préparée le 2026-11-16 pour T029, SC-001 et SC-002.
**Statut : essais non réalisés.** Cette fiche ne contient aucun résultat observé.
Références : [protocole V8](quickstart.md#v8--rendu-clavier-et-compréhension),
[critères de succès](spec.md#success-criteria-mandatory), [bilan](validation.md).

## Préparation par la personne qui conduit les essais

Faire passer individuellement les mêmes deux exercices à cinq personnes qui
débutent le jardinage sur balcon. Ne pas leur expliquer le simulateur ni le rôle
de ses critères. Utiliser les identifiants P01 à P05, sans noter de nom ou de contact.

Préparer un contexte de test navigateur dont la date est fixée au 15 février 2026
avant le chargement du JavaScript, sans changer l'horloge système ni le code publié.
Y charger la sélection suivante, sans encore montrer les résultats à la personne :

`http://127.0.0.1:8000/simulateur/?exposition=soleil&objectif=legumes&vent=modere&place=petit`

La référence automatique pour ce cas donne : Pois nain, Épinard, Fraisier, Laitue
à couper, Radis, Roquette, Blette, Concombre. Pois nain est de saison avec une
réserve de place ; Épinard et Fraisier sont hors période. Le cas présente donc,
dès les trois premières cartes, raisons connues, réserve et différence de saison.
Confirmer ce résultat dans le navigateur avant les essais ; l'extraction de la
référence ne remplace pas ce contrôle. Ce contexte navigateur n'est pas encore validé.

Si la date ne peut pas être contrôlée, choisir et consigner un cas du mois réel
avec au moins une plante de saison, une hors période et une réserve. En novembre,
aucune fiche du catalogue n'est de saison : le seul cas V2 de novembre ne suffit
pas pour cet essai. Sans sélection mixte vérifiée, signaler la couverture partielle
et ne pas déclarer SC-002 pleinement évalué. Le cas technique V3 de février, où
plusieurs hors-saison précèdent Pois nain, reste à contrôler séparément.

Noter pour chaque personne le mois du navigateur, la sélection utilisée, la taille
de la fenêtre et le moyen d'interaction. Garder les mêmes conditions pour les cinq
personnes, ou documenter toute différence.

## Consignes à lire avant de montrer les résultats

1. « Avec les résultats affichés, explique avec tes mots pourquoi une plante est
   proposée et ce qui sert à choisir les plantes ou à déterminer leur ordre. »
2. « Explique si une plante proposée est à semer ou planter ce mois-ci. Repère
   une précaution qui s'applique à une suggestion et montre une prochaine action
   disponible pour préparer ton choix. »

Montrer ensuite les résultats et démarrer un seul chronomètre. Noter le temps
cumulé à la fin de chaque exercice, sans remise à zéro après le premier. Ne pas
donner d'indice pendant les mesures. Noter les difficultés et les éventuelles
demandes d'aide ; une réponse obtenue avec aide ne compte pas comme une réussite
sans aide. Arrêter avant tout achat.

## Grille réservée à la personne qui observe

Ne pas montrer cette grille avant les exercices : elle contient les réponses attendues.

- SC-001 : la raison correspond à une réponse réellement utilisée, par exemple
  soleil et objectif légumes ; la personne distingue ces conditions de sélection
  des facteurs d'ordre vent, place et mois. Les deux éléments sont corrects sans
  aide et le temps cumulé est strictement inférieur à 60 secondes.
- SC-002 : la personne distingue une suggestion adaptée aux réponses de sa période
  de semis/plantation, identifie une réserve réelle de vent ou de place et trouve
  une action existante, par exemple conseils, guide disponible ou calcul du pot.
  Les trois éléments sont corrects sans aide et le temps cumulé est strictement
  inférieur à 120 secondes depuis l'apparition des résultats.

## Observations à remplir après chaque essai

Une cellule « — » signifie qu'aucune observation n'a été recueillie.

| Personne | Date, mois, cas et affichage | Temps SC-001 depuis affichage | Raison et distinction correctes, sans aide ? | Temps SC-002 depuis affichage | Saison, réserve et action correctes, sans aide ? | Réponses et difficultés observées |
| --- | --- | --- | --- | --- | --- | --- |
| P01 | — | — | — | — | — | — |
| P02 | — | — | — | — | — | — |
| P03 | — | — | — | — | — | — |
| P04 | — | — | — | — | — | — |
| P05 | — | — | — | — | — | — |

## Décision après les cinq essais

- SC-001 : réussites respectant les réponses et le délai = **non mesuré / 5**.
- SC-002 : réussites respectant les réponses et le délai = **non mesuré / 5**.

Chaque critère exige séparément au moins quatre réussites sur les mêmes cinq
personnes. Reporter les observations et les deux verdicts dans `validation.md`.
Sans cinq essais documentés, garder T029 ouverte et les deux critères non évalués.
Si un seuil échoue, consigner l'écart avant de décider des corrections nécessaires.
