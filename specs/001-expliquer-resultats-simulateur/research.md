# Recherche : expliquer les résultats du simulateur

Date : 2026-11-01. Périmètre : [spec.md](spec.md), FR-001 à FR-010.
Cette recherche prépare la réalisation ; elle ne valide pas une fonctionnalité déjà livrée.

## 1. Architecture et sources durables

**Décision** : conserver les scripts classiques et le HTML statique. Modifier, lors de
l'implémentation, `js/simulateur.js` et les zones de résultat de `simulateur/index.html`.
Compléter `css/style.css` seulement pour les nouvelles explications, avec sélecteurs
limités au simulateur, puis produire `css/style.min.css` avec le rebuild existant.

**Motif** : le DOM, les contrôles et les classes nécessaires existent déjà. Le générateur
référence le simulateur pour le sitemap mais n'en construit pas le corps HTML.
Le rendu du catalogue (`renderPlantLibrary`) est distinct de `renderResults`.

**Alternatives écartées** : framework, nouvelle dépendance DOM en production, API,
nouvelle page ou refonte des outils ; aucune ne répond au besoin d'explication ciblé.

## 2. Sélection et calendrier

**Décision** : laisser intacte la chaîne de sélection dans `runSimulation`, ainsi que
`isPlantableNow`, les données et le calcul du mois. Construire les explications à partir
des plantes déjà retenues et des réponses capturées au lancement.

**Constats** :

- L'exposition et l'objectif, lorsqu'ils sont connus, excluent les plantes non conformes.
- Le score ajoute 4 pour l'exposition, 3 pour l'objectif, 2 pour le vent, 1 pour la place
  et 2 pour le mois, lorsque chaque condition correspond. Vent et place n'excluent pas.
- Le tri est décroissant sur le score, puis `name.localeCompare(..., "fr")` ; huit
  plantes au plus sont retenues et trois sont visibles avant dépliage.
- La saison apporte un bonus : elle ne place pas systématiquement tous les résultats
  de saison avant tous les autres. Les explications ne doivent pas le laisser croire.
- `currentMonth` est calculé une fois au chargement de la page, dans le fuseau du
  navigateur. Une relance dans la même page conserve ce mois ; un rechargement l'actualise.

**Motif** : FR-007 exige une conservation exacte à réponses et mois identiques.
Les repères de semis/plantation proviennent uniquement du catalogue existant ; aucune
recherche horticole ni nouvelle règle climatique n'est nécessaire pour cette évolution.

**Alternatives écartées** : nouveau score de compatibilité, filtre saisonnier, filtre
de vent ou de place, recalcul du mois à chaque clic et réorganisation des égalités.

## 3. État et messages simultanés

**Décision** : conserver le snapshot local `filters` de `runSimulation`. Les changements
du formulaire signalent une actualisation nécessaire sans réécrire les résultats.
Construire la note comme une liste de messages applicables, vidée à chaque recherche
et réinitialisation. Ne créer ni nouveau champ d'URL ni stockage d'explications.

**Motif** : le parcours différé et la restauration existent déjà. Actuellement, le
message de vent fort remplace celui de l'exposition inconnue ; leur composition
répond à FR-006 sans modifier la sélection. `readSavedFilters` privilégie un lien avec
au moins une réponse non vide, puis le stockage ; `restoreFilters` nettoie les valeurs
non reconnues. Ces règles et leurs replis restent inchangés.

**Alternatives écartées** : recherche automatique au changement, explications basées
sur les sélecteurs en cours d'édition, persistance d'un résultat ou de son mois.

## 4. Présentation et accessibilité

**Décision** : afficher les raisons et réserves essentielles dans chaque carte, sans
ouvrir les conseils. Réutiliser des paragraphes/listes courts et les composants
existants. Une explication globale présente le rôle des critères, la limite de huit
et la portée du calendrier. Réserver les éléments `details/summary` aux compléments.

**Motif** : [MDN décrit `details` comme un contenu masqué jusqu'à son ouverture](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details).
Y placer les réserves indispensables contredirait FR-003. Le résumé et le statut du
formulaire restent des messages courts annoncés par leurs `role="status"` existants ;
les cartes entières ne deviennent pas des régions live. Ce choix suit la distinction
entre état de recherche et résultats décrite par le [W3C, messages de statut](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html).

Conserver le focus sur `resultsTitle` après soumission et sur `objectif` après reset.
Les réserves sont textuelles, même si un style ou une icône les accompagne.

**Alternatives écartées** : infobulle seule, information sur survol, nouvelle modale,
nouvelle étape obligatoire ou annonce vocale de l'ensemble des résultats.

## 5. Non-régression et cas limites

**Décision** : figer avant tout changement du code une référence JSON des résultats
réels sur 320 combinaisons de réponses × 12 mois, soit 3 840 cas. Exécuter le script
réel avec `node:test`, `node:vm`, une date fixée et un DOM de test minimal, comme le
fait déjà le test d'affiliation du projet. L'oracle est une capture du comportement,
jamais une seconde implémentation du score. Tester séparément le rendu et les états.

**Motif** : l'audit de recherche en lecture seule a identifié 30 plantes, 192 cas
vides et 1 334 cas non vides sans plante de saison. Les tailles de sélection observées
sont 0, 2, 3, 4, 5, 6 et 8. Une seule carte et les informations manquantes demandent
des données synthétiques dans les tests de présentation, sans changer le catalogue.
La [documentation Node sur `vm`](https://nodejs.org/api/vm.html) fournit l'exécution
du JavaScript dans un contexte de test ; cela ne remplace pas les essais navigateur.

**Alternatives écartées** : recopier l'algorithme attendu dans les tests, régénérer
automatiquement la référence depuis le code modifié, se limiter à trois simulations
ou ajouter un outil de build au site. Les essais avec cinq débutants restent une
validation humaine distincte : ils ne peuvent pas être déclarés réussis par les tests.

### Référence du dépôt examinée

- Commit : `910c58d0501fcf880273da2601b71ee38ac7deb6`.
- Blob Git de `js/simulateur.js` : `f508c8935c53a8cdbf0c840f0d7af4579323ba7a`.
- Blob Git de `js/plants-data.js` : `d02e1f61c3235dea10435624ef9d61137b6251a3`.
- Runtime local de recherche : Node `v24.17.0` ; conserver aussi version ICU et langue
  de tri dans les métadonnées de la future référence.
- Les futures vérifications utilisent la même date fixée et le même runtime des deux
  côtés. Une variation d'ICU ne justifie pas une mise à jour silencieuse de l'oracle.

## 6. Cache, sécurité et génération

**Décision** : changer les paramètres de version des liens JS et, si modifiée, CSS
dans `simulateur/index.html`. Garder le service worker, les métadonnées et la CSP.
Vérifier le chargement avec cache existant puis une version fraîche du HTML.

**Motif** : `sw.js` sert JS/CSS en cache-first et les pages en stale-while-revalidate.
Les nouvelles URL de ressources permettent une mise à jour ciblée une fois le nouveau
HTML reçu. Les scripts restent externes, sans nouveau script inline ni dépendance
cross-origin. Aucun changement d'identifiant analytics ou d'affiliation n'est requis.

**Alternatives écartées** : désactiver tous les caches, modifier les stratégies réseau
ou assouplir la CSP. Le rebuild éventuel conserve l'accueil et impose la relecture
de toutes les sorties touchées, y compris l'état du sitemap.

## Conclusion de la recherche

Les choix techniques sont résolus. Les phases suivantes peuvent décrire le modèle,
le contrat d'interface et le parcours de validation. Les essais humains restent à
organiser pendant la validation ; leur protocole est défini dans [quickstart.md](quickstart.md).
