# Diagnostic SEO consolidé

Date : 2026-11-16. Environnement local et sources publiques séparés.
Statut : diagnostic finalisé pour le premier lot, sans publication ni preuve
d'indexation actuelle. Sélection détaillée dans [actions.md](actions.md).

## Couverture et preuves

- [Inventaire initial](initial/inventory.json), conservé sans réécriture :
  **195 HTML**, 58 articles canoniques, **73 URLs au sitemap**, 11 familles.
  Partition : 73 candidates à la recherche, 118 redirections, 4 exclusions existantes.
- [Inventaire de reprise du 16 novembre](reprise-20261116/inventory.json) :
  mêmes comptes et mêmes empreintes de tous les fichiers du site inventoriés.
  La relecture du 1er novembre porte donc sur le même contenu local avant correction.
- [Échantillon figé](echantillon.json) : 20 chemins, avec au moins un exemple de
  chaque famille, relus dans [local-review.md](local-review.md). Les limites de
  lecture mobile et d'exécution JavaScript y sont explicites.
- [Contrôle public](public-review.md) : les 20 URLs et robots/sitemap sont nommés.
  Douze restitutions web anciennes sont accessibles ; huit pages et les deux fichiers
  techniques échouent dans cet outil. Six GET directs supplémentaires échouent
  sans réponse HTTP. La disponibilité et les métadonnées publiques actuelles restent
  non vérifiées ; ces erreurs ne prouvent pas une panne du site.
- L'audit historique `SEO-AUDIT.md` ne constitue pas une référence actuelle : son
  score n'est pas repris. Les pages catégories possèdent déjà un corps éditorial,
  des profils d'auteurs existent et les URLs de référence utilisent ecobalcon.com.
  Pas de nouveau quota de texte ni de refonte issus mécaniquement de cette note.

Les 226 observations de l'auditeur sont des occurrences de dimensions d'images
absentes, pas 226 obstacles d'indexation ni des mesures de stabilité visuelle.
Leur effet réel et leur correction transversale restent à examiner séparément.

## Constats retenus et reports

Pour les constats locaux ci-dessous, `checked_at=2026-11-16`, preuve par relecture
des sources et identité des empreintes avec la référence du 1er novembre.
Les identifiants de pages correspondent aux chemins du rapport d'inventaire.

| Observation | Environnement / résultat | Pages et preuve | Effet pour le lecteur, confiance et limites |
| --- | --- | --- | --- |
| OBS-LOCAL-001 | local / anomalie | `categories/index.html` annonce 16/20 guides ; les premières listes complètes des catégories plantes et entretien en contiennent 17/24 | Repère de navigation inexact. Confiance forte ; aucun effet de classement chiffré. ACT-001. |
| OBS-LOCAL-002 | local / anomalie de parcours | `categories/plantes-semis/index.html` passe de la présentation à 17 liens sans orientation par besoin | Faciliter le choix du guide selon soleil, saison, projet et vent. Confiance forte sur la structure ; bénéfice de parcours à vérifier au navigateur. ACT-002. |
| OBS-LOCAL-003 | local / anomalie de parcours | `categories/entretien-astuces/index.html` présente 24 liens sans entrées par situation | Rejoindre un guide d'eau, protection, rempotage ou problème visible. Même limite que ci-dessus. ACT-002. |
| OBS-LOCAL-004 | local / anomalie | FAQ JSON-LD différente de la FAQ visible du basilic ; HowTo avec `totalTime=PT6M` et étape de pincement absente du pas-à-pas | Fidélité machine/texte à corriger. Confiance forte ; pas de gain organique ni de résultat enrichi promis. ACT-003. |
| OBS-LOCAL-005 | local / à confirmer | Formulations horticoles et titre de `articles/jardin-sur-balcon-astuces/index.html`, passages nommés dans la relecture | Révision de fond nécessitant vérification factuelle ; reportée. Aucun simple ajout de mots-clés ne résout ces réserves. |
| OBS-LOCAL-006 | local / à confirmer | 226 attributs de dimensions absents dans l'inventaire | Effet visuel non mesuré ; correction de template potentiellement trop large pour cinq URLs. Reportée. |
| OBS-PUBLIC-001 à 003 | public / non_verifie pour la version actuelle | Restitutions anciennes différentes des sources locales, détaillées dans `public-review.md` | Cause et version actuellement déployée inconnues. Ne pas attribuer au site public les compteurs locaux sans nouvelle lecture. |
| OBS-GOOGLE-001 | google / données partielles | `search-data.md`, extraction du 1er novembre, périodes figées dans `baseline.json` | Éclairage historique avant correction ; pas de données actuelles ni de causalité observée. |

Aucun blocage public d'accès aux contenus n'est confirmé par les outils disponibles.
Les corrections retenues répondent à des incohérences locales démontrées et à des
besoins d'orientation, sans inventer un obstacle technique Google.

## Données de recherche et limites

La consultation Search Console déjà consignée conserve `availability=partiel` :
propriété de domaine `sc-domain:ecobalcon.com`, recherche Web, aucun filtre de pays,
appareil, requête ou page. Référence historique du **3 au 30 octobre 2026** et
comparaison du **5 septembre au 2 octobre**, dans le fuseau Pacific Time.

Le site entier affiche 37 clics et 4 128 impressions sur la première période ;
le groupe fixe des quatre pages, 3 clics et 299 impressions. Ces valeurs précèdent
les corrections. Les pages de catégorie ont des volumes très faibles. La couverture
des requêtes est partielle et la complétude du dernier jour n'est pas certifiée.
Pas d'agrégation artificielle de positions, ni d'association page × requête déduite.

L'extension Chrome n'est pas accessible dans cette reprise (`The browser access
host is unavailable`) ; aucun nouveau relevé GSC n'a été obtenu le 16 novembre.
La référence historique est conservée avec ses limites et ne devient pas une
référence fraîche de 28 jours. Pour un futur bilan, utiliser des fenêtres comparables
et expliciter l'intervalle entre cette extraction et la publication effective.

## Décision

Trois actions sur quatre URLs sont justifiées ; les plafonds sont des limites,
pas un objectif à remplir. Les sources durables, critères avant/après, risques et
reports sont nommés dans [actions.md](actions.md). Le schéma HowTo trompeur est
supprimé pour le seul article concerné, sans retirer ses étapes visibles ni son
temps de lecture. La FAQ structurée reprend les réponses déjà affichées.

Les documentations Google consultées sont citées dans `public-review.md` : liens
explorables, fidélité des données structurées, distinction découverte/indexation.
Les anciens résultats enrichis FAQ/HowTo ne constituent pas un objectif du lot.
Le gain de clics reste une hypothèse à mesurer après publication autorisée.
