# Refonte du prompt de rédaction EcoBalcon — 21 octobre 2026

## Portée et méthode

Le fichier `prompt codex.txt` a été repris au-delà de l'actualisation des priorités de juillet : contrat de résultat, choix du sujet, précision des gestes, recherche, rédaction, intégration et relecture.

Trois sous-agents ont mené des audits indépendants en lecture seule : qualité éditoriale, fonctionnement réel du générateur et conception du prompt. Après réécriture, ils ont appliqué les consignes à huit scénarios de décision et deux exercices éditoriaux. Leurs observations ont conduit à des corrections supplémentaires.

Il s'agit d'épreuves qualitatives sur les instructions et de simulations limitées. Aucun article complet n'a été créé ni publié pendant cette intervention. Aucun rebuild n'a été lancé. Ces contrôles ne mesurent ni gain de classement ni amélioration statistique de la qualité rédactionnelle.

## Changements de fond

- Une question distincte et un geste ou choix réalisable deviennent les critères de réussite ; un tableau, une FAQ ou une longueur donnée ne suffisent plus.
- Le brief définit ce que le lecteur saura faire, le périmètre et la différence avec les pages proches. Une cible explicitement demandée remplace le choix autonome.
- Le geste central doit couvrir prérequis, action, résultat attendu, critère de réussite et suite en cas d'échec. Une consigne vague ne peut plus masquer l'étape décisive.
- Les sources sont reliées aux conseils et à leurs conditions. Les divergences se résolvent par espèce, stade, climat et mode de culture, sans moyenne inventée.
- Les nuances doivent changer une décision. Le texte doit rester vivant et donner une recommandation claire plutôt qu'accumuler des réserves.
- La révision contrôle toute la page, notamment les anciennes FAQ et les données structurées, au lieu de corriger uniquement un paragraphe.
- La relecture recherche séparément connaissances implicites, répétitions et contradictions ; elle doit produire des corrections concrètes et s'arrêter lorsque les défauts utiles sont résolus.
- La trace de travail est regroupée dans une note par intervention. Les détails techniques ne deviennent pas du contenu destiné au lecteur du site.
- Les branches de repli distinguent sujet libre, sujet imposé, image déjà valable, impossibilité de contrôle visuel et défaut réellement bloquant.

## Vérifications du fonctionnement du projet

Constats établis par lecture des scripts et des notes existantes, sans les exécuter :

| Point | Comportement constaté | Consigne retenue |
| --- | --- | --- |
| Base éditoriale | `Get-ArticleSources` lit `raw-singlefile` s'il existe, sinon les pages canoniques, puis applique les overrides. | Porter le corps propre dans un `BodyHtml` durable pour une révision substantielle ; ne pas importer les blocs générés. |
| Remplacements | `BodyReplacements` applique un remplacement littéral ; le nouveau corps peut encore subir les anciens remplacements. | Vérifier correspondance et stabilité ; retirer ou adapter les remplacements devenus redondants. |
| FAQ et HowTo | Ils produisent du JSON-LD ; les maps du générateur peuvent servir de repli si l'override est vide. | Aligner avec le visible, corriger ou retirer la définition source ciblée, puis vérifier le résultat généré. |
| Durée | `TimeRequired` est aussi utilisé comme durée de HowTo. | Ne pas confondre temps de lecture et durée d'exécution. |
| Sources | Le bloc généré affiche une date de consultation fixe du 12 juillet 2026. | Citer dans le corps si le bloc impose une fausse date, sans réécrire le template global dans une tâche d'article. |
| Compteur et sitemap | Le compteur compte les dossiers déjà générés ; l'empreinte de l'accueil est évaluée pendant le rebuild. | Rebuild, compteur si nécessaire, puis rebuild final si le compteur a changé l'accueil. |
| État du sitemap | Les dates des pages hors articles reposent sur un état persistant. | Conserver `scripts/sitemap-page-state.json`, sans rafraîchir toutes les dates. |
| Images | Le pipeline Windows ne lit pas nécessairement les dimensions WebP ; des JPEG sont déjà utilisés pour cette raison. | Préférence de format conditionnelle et contrôle des dimensions réellement produites ; dimensions numériques pour SVG. |
| Cache | Le service worker peut montrer des pages ou assets antérieurs. | Vérifier une version fraîche et traiter une image remplacée sous la même URL. |

Sources locales principales : `scripts/rebuild_articles.ps1`, `scripts/article-overrides.ps1`, `scripts/sitemap-state.ps1`, `scripts/update_home_article_count.ps1`, `sw.js`, les briefs d'articles et notes SEO/affiliation sous `backups/`.

## Mises en situation

| Cas | Décision obtenue lors de l'exercice | Précision ajoutée si nécessaire |
| --- | --- | --- |
| URL imposée, image existante appropriée, aucune nouvelle image souhaitée | Réviser la page cible et conserver son image ; pas de nouveau choix de sujet. | Comparaison des pistes conditionnelle au mode libre. |
| Sujet libre, premier candidat invérifiable, deuxième faisable | Chercher une autre source puis retenir la piste faisable, sans inventer ni abandonner trop tôt. | Repli vers une piste présélectionnée avant de conclure à un brouillon. |
| Deux volumes différents pour espèces ou stades différents | Distinguer les contextes et retenir celui de l'article ; aucune moyenne. | Aucune ambiguïté restante observée. |
| Navigateur indisponible, génération et contrôles essentiels concluants | Résultat prêt localement avec contrôle visuel restant explicitement indiqué. | Différencier contrôle impossible et contrôle échoué. |
| Création et compteur d'accueil modifié | Rebuild initial, compteur, rebuild final pour état et date du sitemap cohérents. | Ordre vérifié contre le script de comptage réel. |
| Conseil corrigé, ancienne FAQ réactivée par une map | Vérifier le JSON-LD et corriger ou retirer la définition ciblée. | Ne pas se contenter d'un override vide ni inventer une FAQ pour garder le schéma. |
| Article sans corps durable et remplacement silencieux | Porter le corps utile dans `BodyHtml`, traiter les remplacements redondants et contrôler le rendu. | Mention explicite du cumul `BodyHtml` puis `BodyReplacements`. |
| Dépôt déjà modifié et nombreux fichiers générés | Comparer à l'état initial, expliquer les sorties et préserver le travail préexistant. | État de référence incluant fichiers non suivis ; aucun retour global à HEAD. |
| Pot humide et feuillage retombant, faits incomplets fournis pour un exercice fictif | Introduction et protocole d'observation possibles ; décision d'arrosage encore à documenter. | Ne pas fabriquer un diagnostic ou un seuil pour compléter le plan. |
| Bouture dont aucun critère de transfert n'est encore documenté | Le geste ne peut pas être déclaré entièrement expliqué. Recherche supplémentaire ou brouillon motivé. | Un repère observable de remplacement doit lui-même être justifié. |

Un dernier cas transversal a révélé le besoin de préciser le repli après génération : une révision non prête doit rester dans la note de brouillon, sans laisser les ajouts défectueux dans les sources actives ou les sorties. Seules les modifications de l'intervention sont retirées, en préservant l'état initial et la page existante.

## Références documentaires consultées

- [Documentation officielle OpenAI : conception des prompts](https://developers.openai.com/api/docs/guides/prompt-engineering). Appui pour séparer rôle, instructions, contexte et exemples, et prévoir des cas représentatifs de vérification.
- [Google Search Central : contenu utile et fiable](https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=fr). Appui pour l'apport propre de la page, son utilité et une évaluation critique du contenu plutôt qu'une longueur ou une actualisation artificielle.
- [Google Search Central : liens de titre](https://developers.google.com/search/docs/appearance/title-link?hl=fr). Appui pour un titre descriptif et concis, sans traiter un nombre de caractères comme une garantie d'affichage.

Les choix spécifiques au jardinage et au projet sont des consignes éditoriales adaptées à EcoBalcon ; ces références ne constituent pas une validation horticole des futurs articles.

## Contrôles de livraison et évaluation ultérieure

Relecture du prompt final, confrontation aux sources du projet et `git diff --check`. Les changements livrés concernent le prompt et cette note de validation ; les scripts et pages du site restent hors de cette intervention.

Pour mesurer ensuite le gain réel, comparer des productions sur les mêmes briefs et les mêmes éléments factuels, sans indiquer aux relecteurs quelle version du prompt les a produites. Relever les erreurs, gestes incomplets, contradictions, répétitions et questions du lecteur non résolues ; séparer cette qualité du trafic SEO. Une seule production réussie ne suffira pas à prouver une amélioration générale.

## Ajustement après usage : références et maillage

Le 21 octobre 2026, les sections 4, 6, 8 et 9 ont été précisées : recherche française prioritaire, références de vérification conservées dans les notes, liens publics sélectionnés pour leur utilité, inventaire des guides EcoBalcon et maillage contextuel préparés avant rédaction. Une référence anglophone publique demande une justification et une information compréhensible en français. Aucun quota de liens n’est imposé. Voir [le bilan des quatre articles corrigés](correction-maillage-fr-20261021.md) pour les références et contrôles.
