# Modèle de bilan du lot SEO

Modèle préparé le **2026-11-16** pour `LOT-001`. **Aucun bilan de performance n’est exécuté par ce document.** Copier ce modèle pour un contrôle réel puis renseigner uniquement les faits sourcés. Les `null` ci-dessous signifient « non renseigné dans le modèle », pas absence des valeurs historiques de [baseline.json](baseline.json). La réception navigateur T024 reste ouverte ; ce modèle ne la valide pas.

Le protocole et les règles de calcul sont dans [suivi-mode-emploi.md](suivi-mode-emploi.md). L’autorisation de publier et la publication réellement constatée sont deux prérequis ; avant cela, `publication_at` et `due_date` restent nulles. `performed_at` désigne le bilan réel, pas la date de préparation de ce modèle.

## Fiche structurée à renseigner

Tous les champs Bilan de [data-model.md](../data-model.md) sont présents. Les champs complémentaires explicitent les sources, périodes et motifs. Aucun identifiant de jeu GSC absent du dossier n’est inventé : attribuer un identifiant stable au moment de constituer le bilan réel et référencer le jeu correspondant.

```json
{
  "review_id": null,
  "lot_id": "LOT-001",
  "publication_at": null,
  "due_date": null,
  "performed_at": null,
  "baseline_dataset_id": null,
  "followup_dataset_id": null,
  "baseline_reference": "baseline.json",
  "followup_source_reference": null,
  "fixed_page_group": [
    "https://ecobalcon.com/categories/",
    "https://ecobalcon.com/categories/plantes-semis/",
    "https://ecobalcon.com/categories/entretien-astuces/",
    "https://ecobalcon.com/articles/bouturer-basilic-balcon/"
  ],
  "comparability": {
    "result": "non_verifie",
    "same_property": null,
    "same_search_type": null,
    "same_filters": null,
    "same_page_group": null,
    "same_aggregation": null,
    "complete_periods": null,
    "baseline_before_change": null,
    "reason": "Modèle sans extraction de suivi ni publication constatée ; référence historique partielle à vérifier."
  },
  "exposure_complete": null,
  "metrics": {
    "lot": {
      "clicks": {"baseline": null, "followup": null, "absolute_change": null, "relative_change": null, "status": "indisponible", "source_reference": null},
      "impressions": {"baseline": null, "followup": null, "absolute_change": null, "relative_change": null, "status": "indisponible", "source_reference": null},
      "ctr": {"baseline": null, "followup": null, "absolute_change": null, "relative_change": null, "percentage_point_change": null, "status": "indisponible", "source_reference": null},
      "position": {"baseline": null, "followup": null, "absolute_change": null, "relative_change": null, "status": "indisponible", "source_reference": null}
    },
    "property": {
      "clicks": {"baseline": null, "followup": null, "absolute_change": null, "relative_change": null, "status": "indisponible", "source_reference": null},
      "impressions": {"baseline": null, "followup": null, "absolute_change": null, "relative_change": null, "status": "indisponible", "source_reference": null},
      "ctr": {"baseline": null, "followup": null, "absolute_change": null, "relative_change": null, "percentage_point_change": null, "status": "indisponible", "source_reference": null},
      "position": {"baseline": null, "followup": null, "absolute_change": null, "relative_change": null, "status": "indisponible", "source_reference": null}
    }
  },
  "context_notes": [
    "Modèle vide de mesures, non publié ; aucun résultat de suivi disponible ici.",
    "Référence GSC historique : lecture du 1er novembre 2026, du 3 au 30 octobre comparés au 5 septembre au 2 octobre ; disponibilité partielle et dernier jour non certifié complet.",
    "Ne pas remplacer la référence historique par une extraction ultérieure ni traiter ses null comme des zéros.",
    "Les trois actions portent sur quatre pages ; accueil, simulateur et pages liées restent hors groupe."
  ],
  "conclusion": "non_concluant",
  "next_decision": "Attendre une publication explicitement autorisée et constatée puis recueillir une comparaison documentée ; compléter d’abord les contrôles de réception encore ouverts.",
  "dataset_details": {
    "property": "sc-domain:ecobalcon.com",
    "property_kind": "domaine",
    "search_type": "Web",
    "data_timezone": "America/Los_Angeles",
    "filters": {"country": null, "device": null, "query": null, "page": null},
    "group_selection": "Quatre URLs fixes ci-dessus ; relevé explicite par page, portée propriété conservée séparément.",
    "baseline_period": {"period_start": null, "period_end": null, "source_reference": "baseline.json", "reason": "Renseigner la référence effectivement retenue sans écraser l’historique."},
    "followup_period": {"period_start": null, "period_end": null, "source_reference": null, "reason": "Aucune extraction de suivi dans le modèle."},
    "extracted_at": null,
    "availability": null,
    "completeness": null,
    "preliminary": null,
    "row_limit": null,
    "brand_rule": "EcoBalcon / Eco Balcon / Eco-Balcon, sans distinction de casse",
    "brand_coverage": null,
    "limitations": ["Disponibilité et complétude du jeu de suivi inconnues ; les valeurs seront renseignées avec leur preuve."]
  },
  "publication_evidence_reference": null,
  "availability_check_reference": null,
  "change_context_reference": null
}
```

Les `filters` nuls désignent ici les filtres **absents du rapport de propriété de référence**, connus par la source historique ; ne pas interpréter cette convention comme un filtre inconnu silencieusement désactivé. Consigner les réglages réellement observés au suivi et toute différence. `availability=null` dans ce modèle signifie inconnu ; lors d’un bilan réel choisir `absent`, `inutilisable`, `partiel` ou `exploitable` et motiver.

Les valeurs `baseline` et `followup` de chaque métrique doivent conserver chacune leur statut et preuve si leurs disponibilités diffèrent. Le `status` initial `indisponible` du modèle ne doit pas masquer une mesure connue : au remplissage, préciser `baseline_status`, `followup_status` et les deux références de source si nécessaire, avec `mesure`, `indisponible` ou `ambigu_export`. Une mesure exportée ambiguë garde `null` jusqu’à clarification, sans conversion en zéro.

## Tableau lisible du bilan réel

Compléter les deux portées séparément. Chaque cellule non renseignée reste `null` avec motif ; les calculs ne sont autorisés que sur des valeurs mesurées et comparables.

| Portée / métrique | Référence | Suivi | Écart absolu | Écart relatif | Écart en points | Preuve et limite |
| --- | --- | --- | --- | --- | --- | --- |
| Lot — clics | `null` | `null` | `null` | `null` | Sans objet | Modèle non renseigné. |
| Lot — impressions | `null` | `null` | `null` | `null` | Sans objet | Modèle non renseigné. |
| Lot — CTR | `null` | `null` | `null` | `null` | `null` | Sommes des clics/impressions des quatre pages complètes uniquement. |
| Lot — position | `null` | `null` | `null` | `null` | Sans objet | Source du groupe exact requise ; aucune moyenne de lignes. |
| Propriété — clics | `null` | `null` | `null` | `null` | Sans objet | Total de propriété, pas somme des pages. |
| Propriété — impressions | `null` | `null` | `null` | `null` | Sans objet | Même portée et filtres. |
| Propriété — CTR | `null` | `null` | `null` | `null` | `null` | Total de même portée. |
| Propriété — position | `null` | `null` | `null` | `null` | Sans objet | Reprendre la valeur du rapport de propriété. |

Joindre les lignes des quatre pages, périodes et sources du bilan réel pour vérifier la couverture. Un total de groupe incomplet reste inconnu ; ne pas exclure une page parce que sa ligne manque. Aucun total marque/hors marque ni association page × requête n’est calculé à partir de requêtes partielles non reliées aux pages.

## Contrôles avant interprétation

| Question | État initial du modèle | À documenter au bilan réel |
| --- | --- | --- |
| Publication autorisée et version publique du lot constatée ? | `non_verifie` | Autorisation, instant/borne, preuve par page ; aucune date supposée. |
| Même propriété, Web, filtres, quatre URLs et agrégations ? | `non_verifie` | Réglages des deux sources ; écart justifié ou comparaison rejetée. |
| Deux périodes de 28 jours complets et non préliminaires ? | `non_verifie` | Bornes inclusives, fuseau GSC, extraction réelle et dernière journée complète prouvée. |
| Référence réellement avant changement et utilisable ? | `non_verifie` | Conserver l’historique du 1er novembre ; expliquer son ancienneté et sa complétude partielle. |
| Les quatre pages sont exposées sur toute la fenêtre de suivi ? | `non_verifie` | Pas de chevauchement avant publication, ni première journée seulement partielle. |
| Données des quatre pages complètes, sans zéro inventé ? | `non_verifie` | Limites de lignes, pages manquantes et preuve des éventuels zéros mesurés. |
| Contexte saisonnier et changements concurrents renseignés ? | `non_verifie` | Observations réellement connues ; inconnues explicites. |

Un champ `null` ou un contrôle manquant ne devient pas conforme parce que le bilan est prévu à J+28 ou J+56. Si le contrôle est exécuté tard, conserver `due_date` prévue et `performed_at` réel.

## Règles de conclusion et prochaine décision

- Valeurs disponibles : les afficher avec leur provenance, même si l’ensemble est non comparable. Ne pas remplir ce modèle avec des chiffres fictifs pour démontrer les formules.
- Zéro clic initial mesuré : relatif `null`, écart absolu conservé ; une tendance reste possible si les autres conditions sont satisfaites. Zéro impression sur une période : CTR indisponible et effet `non_concluant`.
- Données absentes, propriété/période/groupe incompatible, données nécessaires partielles, journée préliminaire non résolue ou exposition incomplète : `non_concluant`, motif précis et preuve manquante à obtenir.
- Comparaison exploitable : signe des clics du groupe positif = `progression`, nul = `stabilite`, négatif = `recul`. C’est descriptif, sans causalité ou significativité établie ; examiner impressions, CTR, position disponible et contexte.
- CTR stocké en ratio : `(suivi − référence) × 100` donne l’écart en points de pourcentage. Aucun CTR moyen de lignes ; aucune position agrégée inventée.

Dans `next_decision`, motiver l’action proposée à partir du résultat : conserver, vérifier une anomalie, obtenir une donnée absente ou cadrer un lot futur. Les résultats enrichis FAQ/HowTo, désormais abandonnés par Google selon [public-review.md](public-review.md), ne sont pas un critère de succès. Une publication ou correction suggérée reste une décision à traiter séparément, sans exécution automatique.
