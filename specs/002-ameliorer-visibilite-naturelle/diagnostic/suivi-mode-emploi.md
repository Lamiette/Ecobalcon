# Suivre le premier lot SEO

Document préparé le **2026-11-16**, Europe/Paris, pour `LOT-001` de la fonctionnalité 002. Il décrit des contrôles futurs ; aucune tâche planifiée, connexion, publication ou soumission à Google n’est créée.

## État de départ et limites à conserver

Le lot comporte les trois actions de [actions.md](actions.md), appliquées localement selon [generation-diff.json](generation-diff.json). Le résultat statique est consigné séparément ; **la réception navigateur ordinateur/mobile/clavier T024 reste ouverte** faute de liaison Chrome disponible. Ce protocole ne ferme pas cette réception et ne transforme pas la livraison locale en publication.

[baseline.json](baseline.json) indique `publication_status=non_publie`, `publication_at=null` et `due_date=null`. Ces deux dates restent nulles tant qu’une publication n’a pas été explicitement autorisée **et réellement constatée**. L’application locale du 16 novembre et la sélection du lot ne sont pas des dates de publication.

La référence GSC est **historique et partielle** : lecture du 1er novembre 2026, propriété domaine `sc-domain:ecobalcon.com`, recherche Web, comparaison inclusive du **3 au 30 octobre 2026** avec le **5 septembre au 2 octobre 2026**. Les dates quotidiennes utilisent `America/Los_Angeles` ; l’instant d’extraction exact figure dans la référence. Aucun filtre pays, appareil, requête ou page n’était appliqué au rapport de propriété. Les 70 lignes du tableau Pages ont été lues, les requêtes seulement en partie ; la complétude définitive du dernier jour n’est pas certifiée et `preliminary=null` ne signifie pas « non préliminaire ». Aucune donnée fraîche du 16 novembre n’a été recueillie. Sources : [search-data.md](search-data.md) et [baseline.json](baseline.json).

Conserver cette référence sans remplacer sa période, son instant ou ses réserves par une extraction future. Elle est antérieure aux changements, mais ne constitue pas automatiquement les 28 derniers jours complets précédant une publication ultérieure. Avant toute comparaison, vérifier son exhaustivité, son éloignement de la publication et les changements intervenus depuis. Si un autre état avant publication est recueilli plus tard, le conserver comme jeu distinct et dater la décision d’utiliser ce jeu ; ne pas réécrire l’historique. Une référence recueillie après publication ne permet pas de reconstituer l’état avant publication.

## Groupe fixe et portées

Conserver exactement ces **quatre URLs**, sans ajouter les articles liés ni retirer une catégorie peu visible :

1. `https://ecobalcon.com/categories/`
2. `https://ecobalcon.com/categories/plantes-semis/`
3. `https://ecobalcon.com/categories/entretien-astuces/`
4. `https://ecobalcon.com/articles/bouturer-basilic-balcon/`

L’ordre de la liste est sans effet ; l’ensemble doit être identique à `affected_urls` de la référence et à la preuve de génération. Les variantes legacy servent aux contrôles de préservation, sans être ajoutées au groupe de mesure. `sitemap.xml` et l’état de génération sont des fichiers techniques, pas deux pages de trafic supplémentaires. Le site entier est suivi **dans une portée séparée** du lot.

## Conditions de démarrage après une éventuelle publication

Une nouvelle demande explicite est nécessaire pour publier. Après cette publication seulement, constater la version servie sur les quatre URLs et enregistrer dans le journal l’autorisation, la preuve et l’instant réel `publication_at` au format ISO 8601 avec décalage UTC, en Europe/Paris. Le contrôle doit reconnaître les changements du lot ; un HTML local, un cache ancien ou la simple présence au sitemap ne suffisent pas. Si l’instant exact n’est pas établi, garder la date inconnue avec motif et ne pas fabriquer d’échéances.

Si les pages sont publiées à des instants différents, conserver ces instants par page et documenter la fin de mise à disposition du groupe complet. L’exposition complète doit être vérifiée sur chaque page ; une page encore ancienne empêche de traiter le groupe entier comme exposé. L’heure de première observation n’est pas présentée comme heure exacte de publication si elle n’est qu’une borne.

À partir d’un instant de publication documenté, calculer les échéances civiles Europe/Paris, avec l’ajustement de décalage UTC nécessaire : disponibilité **au plus tard J+7**, puis bilans **J+28 et J+56**. Ce sont des repères documentaires, sans minuteur ni tâche automatique. Tout retard conserve sa date d’exécution réelle, sans antidater le bilan. Avant publication, toutes les dates d’échéance restent nulles.

## Contrôle sous sept jours

Pour chaque URL fixe, et pour les deux variantes legacy du basilic, enregistrer URL demandée, instant, réponse ou erreur réelle, destination, version et preuve :

- disponibilité et destination conformes, sans confondre redirection HTML et statut HTTP ;
- canonical, directives robots, hreflang, partage et contenu conservés ; robots et sitemap publics relus séparément ;
- compteurs du hub, liens d’orientation des deux catégories et schéma basilic correspondant au lot ;
- images et liens concernés fonctionnels ; toute limite de rendu/navigation encore ouverte reste explicitement à contrôler.

Donner à chaque contrôle `conforme`, `anomalie`, `non_verifie` ou `sans_objet`, avec motif et preuve. Une erreur réseau ou d’outil ne prouve pas une panne du site. Ce contrôle ne confirme pas l’indexation. Si une inspection d’URL Google est consultée avec un accès autorisé, distinguer la version connue de Google et le test en direct ; ne pas demander d’indexation. Aucun formulaire de contact n’est envoyé.

## Bilans J+28 et J+56

Créer un bilan distinct à partir de [bilan-modele.md](bilan-modele.md), avec identifiants stables, lot, instant réellement effectué et sources. Le modèle est vide de mesures ; il ne remplace pas les valeurs historiques déjà conservées.

1. Vérifier la propriété exacte et l’accès ou l’export disponible. Ne pas créer de propriété ou d’intégration pour poursuivre. Documenter `availability` : `absent`, `inutilisable`, `partiel` ou `exploitable`, avec motif.
2. Relever les **28 derniers jours complets disponibles** au bilan, bornes inclusives et fuseau GSC conservés. Écarter les jours explicitement préliminaires ; si la complétude demeure inconnue, le dire. Ne pas choisir automatiquement « aujourd’hui moins 28 jours » dans le fuseau français. Garder l’instant réel d’extraction et tout retard de disponibilité.
3. Conserver recherche **Web**, absence de filtre pays/appareil/requête, et même méthode de sélection du groupe. Mesurer le site dans le rapport de propriété sans filtre page ; recueillir les quatre pages dans des vues explicitement identifiées, sans changer les portées d’agrégation. Un filtre de groupe éventuel doit désigner exactement ces URLs et sa syntaxe doit être conservée.
4. Relever clics, impressions, CTR et position disponibles pour chaque page, le groupe complet et la propriété séparément. Les totaux de propriété viennent des cartes ou de l’export de même portée ; ne pas les reconstruire par somme des pages ou requêtes. Une page absente d’un tableau tronqué demeure inconnue jusqu’à contrôle explicite, pas zéro.
5. Comparer la période de suivi à la référence avant changement retenue et documentée. Garder aussi la période précédente historique comme contexte, sans présenter sa variation d’octobre comme effet du lot. Vérifier que les quatre pages ont été exposées pendant chacun des jours comparés après publication. Une journée de publication partielle dans le fuseau GSC ou une fenêtre commençant avant publication donne `exposure_complete=false` et une conclusion d’effet `non_concluant`.
6. À J+28, les délais GSC peuvent faire chevaucher la fenêtre avec l’avant-publication : garder cette fenêtre réelle et signaler le recul incomplet, sans retoucher les dates pour obtenir artificiellement 28 jours exposés. Un bilan supplémentaire pourra être fait plus tard, avec son propre instant réel. J+56 suit le même contrôle ; son calendrier seul ne certifie pas la comparabilité.
7. Annoter saisonnalité du jardinage, météo ou événements connus, changements concurrents de contenu, hébergement ou mesure et éventuelles différences de périmètre. Une comparaison à l’année précédente est facultative si réellement disponible et compatible ; elle ne remplace pas la référence principale.

Les requêtes restent une analyse complémentaire : règle de marque sans distinction de casse `EcoBalcon`, `Eco Balcon`, `Eco-Balcon`, avec couverture exacte et requêtes non classées séparées. Ne pas déduire un total marque/hors marque exhaustif d’un extrait partiel ; ne pas fabriquer une association page × requête depuis deux tableaux distincts. Conserver les libellés originaux.

## Calculs et interprétation

- Écart absolu = suivi − référence. Écart relatif = écart / référence uniquement si référence non nulle ; présenter le pourcentage en multipliant ce ratio par 100. Avec référence nulle, le relatif est `null` et l’écart absolu disponible reste affiché.
- CTR du lot = somme des clics des quatre pages / somme de leurs impressions, uniquement avec données complètes de même période et portée. Aucune moyenne des CTR individuels. Impressions nulles : CTR `null`, jamais 0 inventé. Le CTR est stocké comme ratio de 0 à 1 ; écart en points de pourcentage = 100 × (CTR suivi − CTR référence).
- Position agrégée : reprendre une source couvrant exactement la portée ou garder `null`. Ne pas calculer une moyenne simple des quatre positions, ni une position de propriété à partir des pages. Cet indicateur reste contextuel ; il ne suffit pas à conclure à un gain.
- Comparaison exploitable : `progression`, `stabilite` ou `recul` décrit uniquement le signe positif, nul ou négatif de l’écart des clics du groupe fixe. Examiner aussi impressions, CTR et contexte. De faibles volumes donnent une description prudente, sans causalité ou significativité statistique annoncée.
- Sans données comparables, sans référence avant changement exploitable, avec impressions nulles sur une période ou exposition incomplète : `non_concluant`, en conservant toutes les valeurs réellement connues. Aucun gain de position, clics ou indexation n’est garanti.

## Cas limites à vérifier documentairement

Ces cas sont des règles de traitement, **pas des données EcoBalcon simulées ou des bilans exécutés**.

| Situation | Traitement attendu | Conclusion d’effet du lot |
| --- | --- | --- |
| Aucun accès GSC ni export | Disponibilité `absent`, source inconnue et mesures `null`, raison et contrôles locaux conservés. Aucun nouvel accès imposé. | `non_concluant`. |
| Propriété, type de recherche, période ou groupe incompatibles | Disponibilité `inutilisable` pour cette comparaison ; garder les valeurs en contexte mais ne pas calculer une différence prétendument comparable. | `non_concluant`. |
| Export partiel ou une page du groupe absente | Disponibilité `partiel`, page/mesure `null` avec motif ; ne pas compléter par zéro ni recomposer le groupe sur trois pages. Les contrôles individuels connus restent utilisables. | `non_concluant` pour le groupe tant que les données nécessaires manquent. |
| Requêtes partielles, pages et totaux complets | Documenter la limite des requêtes et éviter le total marque/hors marque. Examiner séparément si les métriques du groupe et de propriété satisfont tous les autres critères. | Une limite de requêtes seule n’interdit pas une tendance descriptive du groupe ; sinon `non_concluant`. |
| Clics de référence réellement à zéro | Conserver le zéro mesuré, écart absolu calculable, relatif `null`. Si impressions des deux périodes, référence et exposition sont exploitables, une tendance descriptive reste possible. | Selon comparabilité ; ne pas confondre zéro clic et absence de données. |
| Impressions nulles sur une période | CTR correspondant `null` et interprétation d’effet suspendue ; conserver les clics/valeurs connus sans division par zéro. | `non_concluant`. |
| Dernier jour préliminaire ou complétude inconnue | Choisir une fenêtre complète prouvée si possible ; sinon conserver les bornes et réserve, sans annoncer une référence complète. | `non_concluant` si la comparaison demeure incomplète. |
| Fenêtre chevauchant l’avant-publication ou première journée partielle | Conserver les dates réelles, `exposure_complete=false`, ne pas attribuer la variation au lot. | `non_concluant`. |
| Nouvelle référence obtenue seulement après publication | La conserver comme nouveau point de départ daté, sans reconstituer le passé. | `non_concluant` pour un effet avant/après absent. |

Chaque bilan termine par une prochaine décision motivée : conserver, corriger une anomalie démontrée, recueillir une preuve manquante ou cadrer un autre lot. Une décision de correction ou de publication future n’est pas exécutée par ce protocole.
