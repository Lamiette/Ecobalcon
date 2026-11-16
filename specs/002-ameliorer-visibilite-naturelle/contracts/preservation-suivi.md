# Contrat de préservation et de suivi

Ce contrat lie les pages publiques existantes et les rapports internes. Il n’ajoute aucune API publique, aucun composant d’interface et aucune connexion Search Console.

## 1. Adresses et contenus

- Garder `https://ecobalcon.com`, les chemins publics existants, les slashs finaux et les destinations legacy. Vérifier séparément redirections HTML et statuts HTTP observés.
- Canonical, hreflang, OG/Twitter et données structurées continuent à désigner la même page et à décrire son contenu visible. Conserver les dates de publication ; toute autre date doit correspondre à une vraie modification.
- Les conseils, images pertinentes, attributs d’accessibilité et usages utiles restent disponibles. Une suppression de passage au sein d’une réécriture doit être justifiée ; elle ne doit pas retirer une réponse utile pour gagner un mot-clé.
- Une révision doit survivre au rebuild depuis la source durable choisie. Aucun changement de contenu fondé sur une simple sortie générée sans source maintenue.
- Un maximum de cinq pages, directement ou indirectement modifiées, et trois actions. L’accueil est exclu des modifications ; zéro nouvel article. Tout fichier partagé modifié exige l’inventaire de ses effets sur les pages.
- Aucune modification d’identifiant analytics, consentement, contact ou affiliation. Les tests de formulaires n’envoient pas de message réel.

## 2. Dossier de diagnostic et décision

Le dossier livré pendant la réalisation contient : inventaire initial, diagnostic synthétique, classement/lot/reports, référence de mesure, journal et réception. Une action doit permettre de retrouver son constat, ses preuves, son besoin lecteur, ses sources, toutes ses URLs et ses critères avant/après. Les absences de preuve restent visibles.

Avant une génération, capturer l’état courant et contrôler les effets dans une copie isolée. Avant toute application d’un résultat, vérifier que chaque destination du dépôt a encore son empreinte initiale ; sinon réconcilier les changements intervenus. Pour un fichier nouveau, vérifier que la destination n’est pas apparue entre-temps. Aucun écrasement ni restauration globale.

## 3. Entrée Search Console facultative

**Sans données** : `availability=absent` ou `inutilisable`, avec motif et mesures `null` dans `baseline.json`. Le diagnostic local et le lot peuvent avancer. Ne pas exiger la création d’un compte, d’une propriété ou d’une intégration.

**Avec accès/export** :

1. Identifier la propriété, la date d’extraction, les bornes inclusives et le fuseau des dates. Conserver les filtres et le type de recherche réellement sélectionnés.
2. Recueillir séparément le site entier, les lignes pages du lot et les requêtes disponibles. Ne relier page et requête que si une vue filtrée les associe réellement ; conserver la preuve de ce filtre.
3. Conserver clics, impressions, CTR et position lorsqu’ils sont connus, ainsi que les limites de couverture. Ne pas transformer une valeur absente ou ambiguë en mesure nulle.
4. Définir une règle de marque documentée (EcoBalcon et variantes réellement retenues) ; conserver le libellé original des requêtes et la couverture partielle. La somme marque/hors marque ne prétend pas reconstruire les totaux.
5. Utiliser les totaux du rapport pour la propriété, les données complètes de pages pour le groupe fixe, sans mélanger ces niveaux. Si une page est absente d’un export tronqué, obtenir une vue explicite ou marquer sa mesure inconnue.

Le modèle des champs et des valeurs est dans [data-model.md](../data-model.md). Les particularités officielles des exports et agrégations sont sourcées dans [research.md](../research.md).

## 4. Référence et bilans

| Moment | Contrôle ou mesure | Condition |
| --- | --- | --- |
| Avant modification | État local et 28 derniers jours complets disponibles, plus les 28 précédents | Données de recherche facultatives ; bornes figées. |
| Livraison locale | Réception du lot et journal | Statut `non publié` ; aucune échéance organique démarrée. |
| Après publication autorisée | Instant de publication et groupe fixe des pages | Publication effectivement constatée ; pas de date supposée. |
| Sous sept jours | Disponibilité et préservation des pages publiques | Consigner limites si accès impossible. |
| J+28 | 28 derniers jours complets disponibles au bilan | Mentionner tout chevauchement avant publication ; recul partiel non concluant. |
| J+56 | Même protocole, mêmes pages/filtres/agrégations | Conserver dates effectives et éventuel retard d’extraction. |

Les données préliminaires ne font pas partie de la référence complète. Un jour GSC est interprété dans le fuseau de la source ; ne pas le convertir arbitrairement en jour civil français. La publication garde son instant Europe/Paris avec décalage UTC.

Calculs : écart absolu = suivi − référence ; relatif = écart / référence si référence non nulle. CTR du lot = somme des clics / somme des impressions sur des pages complètes et comparables ; impressions nulles donnent un CTR indisponible. La position moyenne agrégée n’est jamais obtenue par moyenne simple des positions des lignes.

La tendance des clics est descriptive : hausse, égalité, baisse. Sans données comparables, impressions, recul complet ou référence avant modification, la conclusion d’effet du lot est `non concluant`. Aucun seuil de significativité n’est inventé. Chaque bilan expose aussi impressions, CTR, position disponible, saisonnalité, changements concurrents et prochaine décision.

## 5. Sortie et limites d’autorisation

La réception locale valide les critères du lot et la préservation du site. La hausse de clics demeure un objectif d’observation séparé. Aucun statut « publié » ou « indexé » ne peut être déduit de contrôles locaux.

Le calendrier est documentaire : aucune tâche planifiée ou publication automatique n’est créée. `publish.bat`, push, déploiement et soumission manuelle aux moteurs restent soumis à une demande explicite distincte. La phase de planification ne réalise aucun de ces actes.
