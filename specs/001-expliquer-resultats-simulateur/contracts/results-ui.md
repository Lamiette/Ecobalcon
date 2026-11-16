# Contrat de l'interface de résultats

Portée : panneau de résultat de `/simulateur/`, sans modification d'API publique.
Références : [spécification](../spec.md), [modèle](../data-model.md).

## 1. Résumé et explication commune

- Préserver `resultsPanel`, `resultsTitle`, `summary`, `note` et `results`.
- Le résumé rappelle les réponses de la recherche effectivement affichée, le nombre
  de suggestions et le repère saisonnier ; il reste un message de statut court.
- Une explication visible présente les critères de sélection et de classement :
  « L'exposition et ton objectif servent à sélectionner les plantes. Le vent, la
  place et le mois influencent leur ordre. La liste propose jusqu'à huit plantes. »
  Ce texte est une intention éditoriale à relire, pas un nouveau calcul.
- Expliquer une fois que semer signifie faire démarrer une plante à partir de
  graines ; distinguer les périodes de semis/plantation de celles des récoltes.
  Le calendrier reste un repère pour la France métropolitaine, à adapter au balcon.
- Une recherche sans exposition rappelle qu'il faut observer le soleil direct.
  Une recherche sans aucune réponse est présentée comme une exploration générale.
- Les limites simultanées restent visibles dans `note` ; ni couleur ni pictogramme
  ne portent seuls leur sens. Ne pas placer toutes les cartes dans une région live.

## 2. Chaque carte, y compris après dépliage

Ordre de lecture recommandé : nom de la plante, raisons et réserves, saison,
volume minimal du pot et difficulté de culture, puis actions existantes.
Réutiliser les composants et l'espacement existants plutôt qu'ajouter une modale.

| Situation | Information attendue avant ouverture des conseils |
| --- | --- |
| Exposition et objectif connus | Lien explicite entre la plante et ces réponses |
| Vent connu compatible | Repère attribué aux données, sans promesse de résistance absolue |
| Vent connu non compatible | Réserve textuelle indiquant le besoin d'abri |
| Place connue non compatible | Réserve indiquant que la plante demande davantage de place |
| Vent/place inconnus | Condition à vérifier ; aucune confirmation de compatibilité |
| Période incluant le mois | Repère de semis/plantation du mois, indicatif |
| Hors période | Période connue et absence de plantation prévue ce mois-ci selon ce repère |
| Métadonnée de présentation absente | Période, volume ou difficulté explicitement à vérifier |

Le volume minimal est celui du pot ; « difficulté » signifie difficulté de culture.
Ne pas inventer de valeur, conseil ou compatibilité à partir d'une donnée absente.
Ne pas ajouter de pourcentage de réussite, de score visible ou de diagnostic local.

Préserver le nom, l'ordre, les trois premières cartes visibles et les suivantes dans
le disclosure existant. Le dépliage supplémentaire n'est présent qu'au-delà de trois
cartes et annonce leur nombre exact. À une, deux ou trois cartes, il n'est pas affiché.

## 3. Saison et résultat vide

- Sélection non vide sans suggestion de saison : dire explicitement qu'aucune de
  ces suggestions n'est à semer ou planter ce mois-ci selon les périodes connues.
  Garder les périodes, conseils et accès aux outils disponibles.
- Résultat vide : expliquer l'absence de correspondance dans le catalogue actuel,
  effacer cartes et explications précédentes, masquer plan et accessoires comme
  aujourd'hui. Proposer de revoir l'objectif, de préciser les choix inconnus ou
  d'explorer le catalogue ; ne pas conseiller de déclarer un autre soleil.
- Ajouter un bouton d'accès au catalogue dans la zone vide déjà affichée (`note`
  ou bloc de résultat explicitement démasqué). Son activation appelle `showTool("library")`
  et place le focus sur `plantSearch`. Utiliser un listener explicite ou une
  délégation pour ce bouton : les listeners `[data-tool]` initiaux ne couvrent pas
  automatiquement un bouton injecté après le chargement.
- Ne pas utiliser `emptyState` sans gérer son attribut `hidden` : un changement
  de `style.display` seul ne suffit pas avec les règles CSS actuelles.

## 4. Contrats d'interaction conservés

| Action | Effet conservé |
| --- | --- |
| Soumettre le formulaire | Sélection explicite puis focus sur `resultsTitle` et défilement vers le panneau |
| Modifier une réponse | Statut « critères modifiés », sans recherche ni réécriture des explications |
| Ouvrir d'autres suggestions/conseils | Fonctionnement natif `details/summary` au clavier |
| Calculer le pot d'une plante | Même `data-pot-plant`, sélection de la plante, un plant, calcul existant, focus sur `potPlant` |
| Ouvrir un guide | Même destination conditionnelle de `plantArticles` |
| Restaurer les réponses | Même recherche automatique qu'actuellement, sans déplacement de focus imposé |
| Recommencer | Nettoyage du résultat, stockage et URL ; focus sur `objectif` |

Le plan de démarrage et les recommandations de contenants/accessoires restent
accessibles. Leur contenu, ordre, affiliation et suivi ne sont pas remaniés.
Le catalogue, ses filtres et les autres outils gardent leurs données et comportements.

## 5. Présentation, chargement et sécurité

- Lecture sans troncature ni débordement à 320, 390 et 1280 pixels ; les réserves
  longues reviennent à la ligne dans les cartes.
- Boutons, liens et disclosures utilisables au clavier, avec focus visible existant.
- Contenu essentiel toujours visible, pas uniquement dans un survol ou un disclosure.
- Garder les scripts externes du même domaine ; aucune modification de la CSP,
  des données structurées, des métadonnées SEO ou des identifiants de suivi.
- Versionner les URL JS/CSS modifiées sur cette page, sans changer `sw.js`.
  Le contrôle de cache distingue ancien HTML encore servi et nouvelle ressource reçue.

## 6. Traçabilité

| Exigences | Contrat | Validation du quickstart |
| --- | --- | --- |
| FR-001 | Résumé, snapshot, actualisation différée | V2, V5, V6 |
| FR-002 | Explication commune et limite de huit | V1, V2, V8 |
| FR-003 | Raisons/réserves visibles sur toutes les cartes | V2, V3, V8 |
| FR-004 | Saison et absence de saison | V2, V3, V8 |
| FR-005 | Pot/difficulté et actions conservées | V2, V7, V8 |
| FR-006 | Inconnus, messages simultanés, vide | V3, V4, V6 |
| FR-007 | Identité, ordre, limite et présentation conservés | V1, V2 |
| FR-008 | Interactions et autres outils | V5, V6, V7 |
| FR-009 | Contenu et données fidèles | V2, V3, V8 |
| FR-010 | Mobile, clavier et focus | V4, V5, V7, V8 |
