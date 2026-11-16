# Guide de validation de la fonctionnalité

**Statut** : protocole prévu après implémentation. Les commandes des nouveaux tests
ci-dessous ne sont exécutables qu'après création des fichiers annoncés. Aucun succès
de la fonctionnalité ni essai utilisateur n'est enregistré par ce document.

Références : [contrat UI](contracts/results-ui.md), [modèle](data-model.md),
[recherche et provenance de la référence](research.md).

## Prérequis et préparation

Depuis la racine du dépôt, disposer de Node (recherche faite avec v24.17.0), Python
et PowerShell. Aucun paquet de production ni compte supplémentaire n'est nécessaire.

```powershell
git status --short
node --version
python --version
```

Avant de modifier le simulateur, figer les résultats du code de référence dans le
futur fichier `scripts/tests/fixtures/simulateur-selection-reference.json`. Le futur
test `scripts/tests/simulateur-results.test.cjs` exécute le code réel avec une date
contrôlée et un DOM de test ; il ne recopie pas le score. Enregistrer version Node/ICU,
empreintes de sources et tuples de réponses. Vérifier la provenance décrite dans la
recherche et conserver le fichier de référence pendant l'implémentation.

## V1 — Sélection et tests automatisés

Après création des tests et réalisation du code :

```powershell
node --check js/simulateur.js
node --test scripts/tests/simulateur-results.test.cjs
node --test scripts/tests/affiliate-tracking.test.cjs
```

Attendu : 3 840 tuples comparés (4 expositions × 5 objectifs × 4 vents × 4 places,
chaque liste incluant la réponse vide, sur douze mois). Mêmes noms ordonnés et mêmes
limites que la référence ; dates de test fixées au milieu de chaque mois dans le
fuseau local afin d'éviter les frontières calendaires. Ne jamais recalculer l'oracle
à partir du code modifié pour faire passer un échec.

Les tests ciblés vérifient aussi les états et le rendu, avec une fixture d'une carte
et des copies sans période/volume/difficulté. Une capture de sélection seule ne
prouve pas le dépliage des cartes ni le fonctionnement des actions.

## Servir la page et maîtriser le calendrier

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Ouvrir `http://127.0.0.1:8000/simulateur/`. Les cas ci-dessous de novembre utilisent
le calendrier local du navigateur. En dehors de ce mois, fixer la date au 15 novembre
2026 dans le contexte de test navigateur **avant** le chargement, sans changer
l'horloge système ni le code publié. Sans cette possibilité, adapter les cas au mois
réel et noter le mois utilisé ; la couverture de tous les mois reste dans V1.

Le mois est capturé au chargement : une simple relance ne le rafraîchit pas.
Pour les essais avec une autre date, utiliser un nouveau chargement/contexte.

## V2 — Raisons, réserves et cartes suivantes

Ouvrir `/simulateur/?exposition=soleil&objectif=legumes&vent=fort&place=petit`
en novembre. Attendu : Radis, Roquette, Blette, Épinard, Fraisier, Laitue à couper,
Concombre, Courgette, dans cet ordre. Trois cartes d'abord et cinq supplémentaires
après dépliage. Les huit présentent le même niveau d'explication.

Lire la réserve de place pour Blette, de vent pour Épinard et les deux réserves
pour Concombre/Courgette. Aucune suggestion de cette sélection n'est de saison :
le message le dit sans annoncer une absence de correspondance. Les périodes restent
lisibles et le mois n'est pas présenté comme une garantie ou une période de récolte.

Tester ensuite `?exposition=ombre&objectif=aromatiques` : Menthe et Persil,
sans dépliage supplémentaire ; `?exposition=ombre&objectif=fleurs` : trois cartes,
également sans dépliage. Couvrir une carte par fixture de présentation.

## V3 — Inconnus, saison et données absentes

- `?vent=fort` : avertissement d'exposition inconnue et message de vent fort visibles
  ensemble. Aucune explication n'affirme que l'exposition ou la place est vérifiée.
- Après « Recommencer », soumettre sans aucune réponse : exploration générale,
  aucune condition fictivement validée, mêmes résultats que la référence du mois.
- En novembre, `?exposition=soleil&objectif=aromatiques` : Basilic en premier,
  5 litres minimum et difficulté « Facile », période avril à juillet. Vent/place
  inconnus restent à vérifier.
- Pour le cas saisonnier mixte, fixer février et utiliser vent fort/place moyen,
  exposition/objectif inconnus : Pois nain est saisonnier mais suit plusieurs
  hors-saison. Le texte ne promet pas tous les saisonniers en premier.
- Dans les tests de présentation, retirer séparément `months`, `potLiters` et
  `difficulty` d'une copie : afficher « à vérifier », sans valeur inventée,
  `undefined`, `NaN`, `? L minimum` ni période déclarée toute l'année.

## V4 — Résultat vide et sortie utile

À partir d'un résultat non vide, choisir ombre/légumes puis soumettre : aucune carte
ancienne, aucun ancien avertissement, plan et accessoires masqués. Le message porte
sur le catalogue actuel et ne conseille pas de fausser l'exposition.
Activer au clavier le nouveau bouton d'accès au catalogue : panneau catalogue visible,
focus sur la recherche, filtres habituels disponibles.

## V5 — Actualisation différée et reset

Obtenir une sélection, changer exposition/objectif/vent/place sans soumettre : seules
les indications de critères modifiés apparaissent ; le résumé et les cartes décrivent
encore la dernière recherche. Soumettre : les nouvelles réponses remplacent toutes
les anciennes explications et réserves devenues inapplicables.

Activer « Recommencer » : choix, cartes, messages, sauvegarde et paramètres de simulation
effacés, résultats masqués, focus sur l'objectif. Une nouvelle recherche ne reprend
aucun fragment de la sélection précédente.

## V6 — Reprise et stockage indisponible

Tester un lien partiel et complet, puis une simulation enregistrée suivie d'un
rechargement sans paramètres. Le lien non vide reste prioritaire sur le stockage ;
les valeurs non reconnues sont nettoyées comme avant et ne deviennent pas des raisons.
Une restauration ne déplace pas le focus sur le titre des résultats.

Dans la fixture DOM, provoquer une exception aux accès `localStorage`, puis fournir
un JSON corrompu et des valeurs non reconnues. Attendu : replis existants, absence
d'erreur bloquante et explications des seules réponses retenues. La sauvegarde garde
les quatre réponses, sans texte d'explication ni mois supplémentaire.

## V7 — Actions et parcours voisins

Ouvrir les conseils d'une plante, son guide disponible et le calcul du pot : bonne
plante, un plant et focus dans le calculateur comme avant. Vérifier le plan pour
démarrer, les contenants/accessoires et leurs destinations, sans modifier les liens
affiliés. Parcourir les filtres du catalogue, le pot, l'absence et le compost : mêmes
contrôles, mêmes effets. Ne pas déclencher d'achat pour ces vérifications.

## V8 — Rendu, clavier et compréhension

À 320 × 844, 390 × 844 et 1280 × 900 : pas de défilement horizontal ni texte tronqué,
réserves cumulées lisibles, dépliage et actions accessibles. Effectuer le parcours
avec Tab/Maj+Tab, Entrée et Espace lorsque pertinent : focus visible, soumission vers
le titre, reset vers l'objectif, nouveau bouton catalogue vers sa recherche.
Vérifier aussi les annonces du résumé/statut sans lecture automatique des huit cartes.

Évaluer séparément avec cinq personnes débutant le jardinage sur balcon, sans
explication préalable. Utiliser les cas V2/V3 avec réserve et écart de saison :

Lire les deux consignes avant d'afficher la sélection, sans expliquer le simulateur.
Pour chaque personne, les deux mesures commencent au même instant : l'apparition
des résultats. Le chronomètre ne redémarre pas après la première réponse. Noter
séparément le temps de réalisation de chaque exercice depuis ce point de départ.

1. Chronométrer depuis l'apparition des résultats jusqu'à l'explication d'une vraie
   raison et de la différence entre sélection et classement (seuil : moins d'une minute).
2. Demander de distinguer adapté/à planter ce mois-ci, d'identifier une réserve et
   de trouver une prochaine action existante (seuil : moins de deux minutes depuis
   l'apparition des résultats, sans remise à zéro après le premier exercice).
3. Noter réponses et durées anonymisées ; SC-001 et SC-002 exigent chacun au moins
   quatre réussites sur cinq. Ne pas remplacer ces observations par l'avis de l'agent.

Si le recrutement n'a pas eu lieu, signaler ces deux critères comme non évalués.

## Génération, cache et bilan final

Si le CSS a changé, analyser puis lancer le rebuild normal, sans `-RebuildHome`,
conformément à `AGENTS.md`. Relire chaque sortie, y compris minification et sitemap.
Ne pas lancer de génération pour la seule rédaction du présent plan.

Reprendre une session dont le cache contenait l'ancien site. Après réception du
nouveau HTML (un rechargement supplémentaire peut être nécessaire), vérifier les
nouvelles URL de ressources, le contenu servi et les explications. Ne pas désactiver
globalement le service worker pour déclarer le parcours de mise à jour valide.

```powershell
git diff --check
git diff --stat
```

Consigner versions, mois, résultats automatisés, scénarios navigateur, observations
humaines et limites réelles dans le bilan de validation de l'implémentation.
