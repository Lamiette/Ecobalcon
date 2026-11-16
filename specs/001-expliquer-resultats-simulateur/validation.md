# Validation : expliquer les résultats du simulateur

Date de début : 2026-11-01. Branche : `setup/spec-kit-ecobalcon`.
Ce bilan distingue réalisation technique et évaluation de compréhension humaine.

**Dernière reprise : 2026-11-16.** Code réalisé et 34 tests automatisés réussis.
Validation complète toujours en attente : clavier/focus, lecteur d'écran, ancien
cache et février au navigateur, puis cinq essais débutants. **24/30 tâches cochées.**
Les nouveaux contrôles et leurs limites sont détaillés en fin de document.

## État initial — T001

- Commit de référence : `910c58d0501fcf880273da2601b71ee38ac7deb6`.
- Changements préexistants : installation Spec Kit (`.gitignore`, `AGENTS.md`,
  `readme.md`, `.agents/`, `.specify/`, `SPEC-KIT.md`, scripts de lancement) et
  documents de `specs/001-expliquer-resultats-simulateur/`. Ils sont conservés.
- Node v24.17.0, ICU 78.3, Python 3.14.6 ; tri français conservé.
- Blob Git `js/simulateur.js` : `f508c8935c53a8cdbf0c840f0d7af4579323ba7a`.
- Blob Git `js/plants-data.js` : `d02e1f61c3235dea10435624ef9d61137b6251a3`.
- Les 30 objets de `js/plants-data.js` restent inchangés.
- SHA-256 initiaux :

| Source | SHA-256 |
| --- | --- |
| `js/simulateur.js` | `e584c23c2f9f6d1f4fa03ee12d6af98d533de42d9cea185844974d7c132520fa` |
| `js/plants-data.js` | `0f2fa962aef62c0834c350088636fb8693ffc2184a6303d8233b1d99855560ca` |
| `simulateur/index.html` | `19af1016ed7116010c5adcdfb81b90b1f318d3acdf3998b0145c4d03b037d19f` |
| `css/style.css` | `bb8ac3d3edbc45adfd0cebaf8dced78ed1952132a89045c0113d3f4ca94e5a8a` |
| `css/style.min.css` | `c13c89b2ccdc93ff09c47f58c02b9e1ac78c9a7cb1d2eff4bcf41e271a477fdb` |
| `index.html` | `b722e26a15ead888c1292a38e2fb56c4f04d0017f7f6c84ea5437c7f4f2c2055` |

La checklist de qualité des exigences est complète : 16/16. Aucun hook Spec Kit.
L'environnement Python local est ignoré. Les autres ignore files ne sont pas requis
pour ce site sans Docker, ESLint, Prettier, Terraform ou publication npm.

## Correction A1

`quickstart.md` et T029 fixent désormais un départ commun des deux mesures à
l'apparition des résultats, sans remise à zéro. Les deux consignes sont données
avant cet affichage, sans explication du simulateur.

## Socle — T002 à T004

Les deux scripts de production complets sont chargés dans une fixture DOM structurelle
Node/VM utilisant le vrai HTML. Date fixée au 15 de chaque mois à midi local.
L'oracle JSON a été capturé avant toute modification applicative ; sa génération
explicite refuse un fichier existant ou des sources divergentes des blobs de recherche.
Les tests normaux ne le régénèrent pas.

`node --test scripts/tests/simulateur-results.test.cjs` : **4 tests réussis** avant
modification, dont les **3 840 sélections ordonnées** sur douze mois, la provenance,
le rendu 0/2/3/8 cartes et les vrais listeners soumission/pot/reset.
Dans le sandbox Windows, le runner rencontre `spawn EPERM` ; l'exécution autorisée
hors sandbox passe avec Node v24.17.0 et ICU 78.3.

## Essais humains

SC-001 et SC-002 ne sont pas évalués. Aucun participant n'a été sollicité ; les
observations ne seront pas remplacées par une simulation d'utilisateur par un agent.
T029 reste ouverte tant que les cinq participants n'ont pas effectué le protocole.

## US1 — Raisons des suggestions

T005 : les attentes ont échoué sur l'ancienne présentation avant les changements.
T006 à T008 : bloc commun, raisons d'exposition/objectif et états textuels vent/place
ajoutés. Les inconnus restent à vérifier. Pas de modification du calcul ou du catalogue.
T009 : les classes existantes suffisent pour ce premier incrément ; aucun CSS changé,
donc aucun rebuild nécessaire à ce stade.

Après réalisation, **8/8 tests réussis**, dont la matrice complète et les cartes
supplémentaires, ainsi que `node --check js/simulateur.js` et `git diff --check`.
Le navigateur réel a servi les anciennes ressources puis les nouvelles après
actualisation, sans désactiver le service worker. Contrôle visuel des nouveaux textes
à 320 px : retours à la ligne et lecture possibles. Les contrôles de focus et de
toutes les largeurs seront complétés lors de la validation finale.

## US2 — Saison et repères pratiques

T011 : six échecs attendus ont été constatés avant le code de cette étape.
T012 à T015 : définition de semer et calendrier indicatif ajoutés ; périodes
actuelles/hors période et absence de suggestion de saison explicitées. Le volume
du pot et la difficulté de culture sont nommés, les valeurs manquantes restent à vérifier.
Les actions existantes sont conservées. Le bonus de saison ne change pas.

Après réalisation : **15/15 tests réussis**, dont la référence de 3 840 résultats,
le cas mixte de février, les fiches copiées sans métadonnées et les accès existants.
La vérification navigateur complète de cette étape reste à terminer.

## US3 — Réponses incomplètes et résultat vide

T017 : trois échecs attendus ont été constatés avant la dernière réalisation
(exposition inconnue écrasée par vent fort et accès catalogue masqué).
T018 à T021 : les messages sont maintenant cumulés depuis les réponses réellement
utilisées. Le résultat vide explique la limite du catalogue, conserve les réponses
dans le résumé et permet d'ouvrir le catalogue avec focus sur sa recherche.
L'attribut `hidden` est géré explicitement à chaque recherche et au reset.
Le listener du nouveau bouton tolère son absence dans un ancien HTML en cache.

Le snapshot, la recherche explicite, l'URL, le stockage et leurs replis sont conservés.
Les tests provoquent séparément les erreurs getItem/setItem/removeItem : un échec
d'effacement n'est pas présenté comme un effacement effectif du stockage.

## Contrôles finaux automatisés et relecture — T023 à T026, T030

- `node --check js/simulateur.js` réussi.
- `node --test scripts/tests/simulateur-results.test.cjs scripts/tests/affiliate-tracking.test.cjs` :
  **34/34 tests réussis** (25 simulateur, 9 affiliation), dont **3 840 cas ordonnés**.
- Oracle SHA-256 inchangé :
  `4499dee3fb6b53e239f74389dea3565d9bb619a845eb0b56bea143747d21c545`.
- Chaîne de sélection et 14 fonctions préexistantes contrôlées identiques à la
  sauvegarde initiale : calendrier, persistance/restauration, diagnostic,
  recommandations, catalogue et autres calculateurs.
- Sur les 216 fichiers applicatifs sauvegardés initialement, seuls
  `js/simulateur.js` et `simulateur/index.html` ont changé.
- Données plantes, accueil, service worker, analytics, générateur, CSS source et
  CSS minifié conservés octet pour octet. Aucun rebuild nécessaire (T024).
- En-tête HTML, SEO, JSON-LD et CSP identiques ; 63 IDs uniques ;
  60 références locales vérifiées, fichiers présents.
- Version JS finale : `20261101-resultats-4`. Version CSS d'origine conservée,
  puisque sa ressource ne change pas. Aucun nouvel accès réseau pour les explications.
- Relecture indépendante du diff : aucun défaut bloquant relevé. Les fiches disent
  désormais « litres » et évitent une phrase répétée sur chaque plante hors période.
- `git diff --check` réussi. Aucun commit, push ou déploiement.

## Historique du blocage Chrome dans cette session

L'utilisateur a demandé de poursuivre exclusivement par l'extension Chrome.
Les appels d'inventaire, de connexion directe et une réinitialisation de la liaison
retournent tous `The browser access host is unavailable`, malgré l'état connecté
indiqué par l'utilisateur. Aucun contrôle natif n'a été repris après cette demande.
La recherche de plugins n'a pas fourni de solution pertinente pour ce Chrome local.

Les observations à 320 px de l'US1 décrites plus haut sont antérieures et ne valent
pas validation du résultat final. Le harness ne mesure ni mise en page, ni clavier
natif, ni annonces d'un lecteur d'écran, ni cycle réel de cache du navigateur.

À ce stade antérieur, T010, T016, T022, T027 et T028 restaient ouvertes pour leurs
parties navigateur, avec tests automatisés déjà réussis. T029 restait ouverte pour
les essais humains. Le compte rendu de reprise ci-dessous actualise les observations.

Avant réception du compte rendu Chrome, **24 tâches sur 30 étaient cochées**.
Aperçu local prévu :
`http://127.0.0.1:8000/simulateur/`.

## Reprise Chrome — compte rendu transmis par l'utilisateur le 2026-11-01

Source : résumé copié dans cette conversation et lien vers
[EcoBalcon-validation-Chrome-2026-11-01.md](https://chatgpt.com/library?file_id=libfile_77640d501818819183ea5f44561bedff&account_id=personal).
Le lien Library n'est pas récupérable avec les outils de cette session ; le contenu
complet du document et l'image mentionnée `ecobalcon-mobile.jpg` n'ont pas été inspectés
ici. Les observations ci-dessous sont attribuées au compte rendu fourni et ne sont
pas présentées comme des vérifications reproduites dans cette session.

### Observations rapportées comme réussies

- Parcours de résultats et réserves.
- Accès au catalogue.
- Restauration des choix et réinitialisation.
- Calculateurs existants.
- Affichage aux trois tailles prévues : 320, 390 et 1280 pixels de largeur,
  sans débordement détecté.

Le compte rendu indique que les fichiers locaux étaient en lecture seule dans la
session de vérification Chrome ; ce suivi enregistre ces observations dans le dépôt
accessible en écriture ici, sans modifier le code du site ni relancer les tests.

### Points restant explicitement à valider

| Point | Tâches concernées | Statut |
| --- | --- | --- |
| Annonces avec un lecteur d'écran | T027 | Non validé |
| Transition depuis un ancien cache | T028 | Non validé |
| Scénario saisonnier de février au navigateur | T016, scénario V3 utilisé dans T022 | Non validé au navigateur ; comparaison automatique déjà réussie |
| Essais avec cinq débutants | T029, SC-001/SC-002 | Non réalisés |

Le résumé ne détaille pas le parcours au clavier ni les focus attendus après
recherche, reset et ouverture du catalogue. Interrogé sur ce point, l'utilisateur
a confirmé que le rapport ne le précise pas. Ces contrôles restent donc à effectuer
ou à documenter ; les cases T010/T022 restent ouvertes. Les parties rapportées comme
réussies sont consignées ci-dessus. SC-003 conserve sa validation automatique ;
le rendu multiécran est rapporté conforme, sans déclarer une validation globale de
l'accessibilité.

## Contrôles avant commit — 2026-11-16

### Tests relancés et intégrité

Commandes effectivement exécutées avec Node v24.17.0, ICU 78.3 :

```powershell
node --check js/simulateur.js
node --test scripts/tests/simulateur-results.test.cjs scripts/tests/affiliate-tracking.test.cjs
git diff --check
```

Résultat : **34 tests réussis, zéro échec** (25 simulateur, 9 affiliation).
Les 3 840 sélections ordonnées restent identiques à la référence, y compris le
cas mixte de février. Le premier lancement du runner dans le sandbox a rencontré
`spawn EPERM` ; le même lancement autorisé hors sandbox a réussi. Cet obstacle
concerne le démarrage des tests, pas un échec fonctionnel du simulateur.

L'oracle n'a pas été régénéré. SHA-256 confirmé :
`4499dee3fb6b53e239f74389dea3565d9bb619a845eb0b56bea143747d21c545`.

Relecture indépendante en lecture seule : aucun défaut concret bloquant relevé.
La chaîne complète de sélection et le `<head>` HTML sont identiques à `HEAD`.
Les données plantes et `sw.js` sont également inchangés. Le nouveau bouton est
hors formulaire, de type `button`, et son listener est protégé lorsqu'un ancien
HTML ne contient pas cet identifiant. La soumission, le reset et l'accès au
catalogue conservent les appels de focus attendus ; leur effet natif reste à
observer au navigateur. Aucun changement CSS, rebuild ou modification du site
n'a été nécessaire pendant cette reprise.

### Vérification complémentaire du cache, hors navigateur

Un contrôle éphémère a exécuté le vrai `sw.js` dans Node/VM avec un réseau et une
Cache API simulés, sans écrire de fichier ni modifier le service worker :

- L'ancien HTML du commit de référence est renvoyé avant la réponse réseau ;
  après résolution de cette réponse, une requête suivante reçoit le nouvel HTML.
- L'ancienne URL JS `?v=20261007-simulateur-4` conserve sa propre entrée de cache.
  La nouvelle URL `?v=20261101-resultats-4` déclenche un accès réseau, puis est
  servie depuis une entrée distincte.
- Le harness existant exécutant le nouveau JavaScript avec l'ancien HTML,
  dépourvu de `resultsLibraryBtn`, réussit l'initialisation, un résultat de huit
  plantes, un résultat vide et le reset sans erreur bloquante.

Ces contrôles vérifient la logique dans un worker vivant. Ils ne couvrent pas
installation/activation, durée de vie du worker, éviction ou comportement HTTP
réels. Le rafraîchissement HTML existant n'est pas prolongé par `event.waitUntil` ;
le contrôle VM ne démontre donc pas que ce travail termine dans toutes les
conditions d'un navigateur. **T028 reste ouverte** pour le cycle réel depuis
l'ancien cache. Aucun changement de stratégie de cache n'a été introduit.

### Blocage Chrome et suite exacte

L'inventaire des navigateurs et la création directe d'un onglet Chrome renvoient
encore `The browser access host is unavailable`. Aucun onglet n'a pu être ouvert
par l'extension dans cette reprise. Le contrôle natif n'a pas été utilisé, selon
la préférence explicite de l'utilisateur. Les observations Chrome du 1er novembre
restent attribuées à son compte rendu ; elles n'ont pas été reproduites ici.

| Travail restant | Preuve requise pour le clôturer |
| --- | --- |
| T010 : clavier/focus US1 | Parcours Tab/Maj+Tab, activation Entrée/Espace des commandes pertinentes, focus visible et titre focalisé après recherche |
| T016 : saison au navigateur | Chargement avec date de février fixée avant le script, sans modifier l'horloge système ; Pois nain saisonnier après plusieurs hors-saison selon V3 |
| T022 : transitions US3 | V3 à V6, notamment bouton catalogue au clavier vers `plantSearch`, reset après résultat vide vers `objectif` et restauration sans focus forcé |
| T027 : accessibilité et rendu | Parcours final aux trois tailles ; annonces effectives avec un lecteur d'écran, sans lecture automatique des huit cartes |
| T028 : ancien cache | Ancienne page déjà en cache, service worker conservé, réception du nouvel HTML et de la nouvelle URL JS, puis vérification des actions V7 |
| T029 : compréhension | Observations des mêmes cinq débutants, seuils SC-001 et SC-002 calculés séparément |

La [fiche des cinq essais](essais-debutants.md) contient les consignes, une grille
anonyme vierge et les règles de décision. Sa préparation ne valide aucun essai ;
les cinq participants restent à réunir et T029 reste ouverte.

Les six cases ne sont pas cochées sur la seule base des tests Node. Les travaux
SEO distincts de `specs/002-ameliorer-visibilite-naturelle/`, `scripts/seo_audit.py`
et `scripts/tests/test_seo_audit.py` sont préservés. Le pointeur local Spec Kit vers
002 est conservé ; les prérequis 001 ont été résolus avec un environnement explicite
et sans persister ce contexte. Aucun staging, commit, push ou déploiement effectué.
