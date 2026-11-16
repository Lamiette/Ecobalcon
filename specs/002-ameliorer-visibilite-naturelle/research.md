# Recherche — Visibilité naturelle d’EcoBalcon

Date : 2026-11-01. Recherche de préparation du plan, pas diagnostic SEO livré ni mesure de trafic. Les recherches indépendantes sur les sources et sur Google ont été menées en lecture seule, puis recoupées.

## 1. État local et résolution de la fonctionnalité

**Décision** : utiliser `specs/002-ameliorer-visibilite-naturelle/` désigné par `.specify/feature.json`. La branche Git réelle reste `setup/spec-kit-ecobalcon`.

**Justification** : `setup-plan.ps1 -Json` retourne cette spécification et ce plan. Son champ `BRANCH=002-ameliorer-visibilite-naturelle` est l’identifiant de repli de la fonctionnalité, pas une branche Git créée (`common.ps1`, fonctions `Get-CurrentBranch` et `Get-FeaturePathsEnv`). La spécification 001 et les modifications existantes du simulateur restent distinctes.

**Alternatives écartées** : se fier à l’onglet 001 ouvert dans l’IDE ; créer une branche ou modifier la spécification précédente sans nécessité.

Observations préparatoires reproductibles sur les fichiers actuels, hors sauvegardes, profils, dépendances et documentation : 195 fichiers HTML, dont 58 chemins `articles/<slug>/index.html`, cinq pages sous `categories/`, quatre sous `auteurs/`, et 73 entrées dans `sitemap.xml`. Ce sont des comptes de chemins et d’entrées, pas un décompte d’URLs indexées. L’audit de juin ne constitue donc pas l’inventaire courant. Python 3.14.6, PowerShell 5.1 et Node 24.17.0 sont disponibles.

## 2. Diagnostic reproductible sans dépendance supplémentaire

**Décision** : prévoir un petit outil local `scripts/seo_audit.py`, bibliothèque standard Python uniquement, en lecture seule sur le site. Il produit l’inventaire et des constats techniques dans un répertoire documentaire explicite. L’analyse éditoriale, les parcours et les contrôles publics restent des vérifications humaines consignées.

**Justification** : aucun auditeur SEO exécutable n’a été trouvé dans les scripts existants. `SEO-AUDIT.md` décrit des contrôles historiques. Un inventaire reproductible rend vérifiables couverture, preuves et comparaison avant/après, sans ajouter de service ni de code au site publié. `html.parser`, `urllib.parse`, `xml.etree.ElementTree`, `hashlib` et `json` suffisent aux contrôles statiques retenus.

**Alternatives écartées** : un nouveau service SEO, un crawler externe exhaustif ou une suite générale de tests ; reprendre la note 9,6/10 de juin. Un parseur local ne remplace pas un navigateur, un validateur complet de données enrichies, ni une preuve d’indexation.

## 3. Sources durables et effets indirects

**Décision** : sélectionner les URLs après diagnostic, puis choisir la source selon le champ à modifier. Ne lancer aucun rebuild pendant la planification.

**Justification vérifiée** :

| Intervention éventuelle | Source durable | Effets à vérifier |
| --- | --- | --- |
| Titre SEO d’article | `scripts/article-overrides.ps1`, champ `SeoTitle` | Le générateur utilise ce champ pour title/OG/Twitter, sans remplacer H1, cartes et titre des redirections. |
| Titre éditorial, description, introduction, corps | Même override ; `BodyHtml` complet pour révision substantielle | `Title`/`Description` influencent aussi index, auteurs et rapprochements ; `Description` sans `Intro` remplace l’introduction. |
| Contenu d’une catégorie | `categories/**/index.html` existant | Son corps n’est pas régénéré ; conserver `.article-prose` et la première liste `.article-list`, utilisée pour ajouter les liens manquants. |
| Template et SEO communs | `scripts/rebuild_articles.ps1` | Effet transversal susceptible de dépasser le plafond : report, sauf démonstration du respect du lot. |
| Styles | `css/style.css`, puis génération du minifié | Styles partagés : probablement hors plafond ; aucune modification prévue par défaut. |

Points d’appui dans `rebuild_articles.ps1` : `Apply-ArticleOverride` vers la ligne 1071 ; repli des sources HTML vers 1223 ; `SeoTitle` vers 1918 et 2015 ; cartes vers 2149 ; rapprochements vers 3289 ; catégories vers 3957 ; écritures finales vers 4141. `raw-singlefile/` est absent : les HTML canoniques servent aussi de sources de repli et ne sont pas jetables.

Le rebuild n’a ni filtre par slug ni mode de simulation. Il peut réécrire tous les articles et leurs deux variantes legacy, index articles, catégories avec liens manquants, auteurs, 404, contact/confidentialité, CSS minifié, sitemap, état du sitemap, robots et manifest. L’accueil existant est préservé sans `-RebuildHome`. `sitemap-state.ps1` lie dates et empreintes des pages statiques ; les articles utilisent leurs dates éditoriales.

**Alternatives écartées** : modifier seulement une sortie d’article ; lancer `strategic_enhance.ps1`, qui modifie plusieurs articles, liens affiliés et `llms.txt` ; restaurer globalement les sorties après rebuild. Une génération d’essai dans une copie de l’état de travail permet d’évaluer le lot sans abîmer les modifications préexistantes.

## 4. Vérification publique et indexation

**Décision** : séparer `local`, `public` et `google` pour chaque preuve. Un contrôle inaccessible reste non vérifié et ne bloque pas l’analyse locale.

**Justification** : les ouvertures de `https://ecobalcon.com/robots.txt`, `https://ecobalcon.com/sitemap.xml` et `https://ecobalcon.com/categories/amenagement-du-balcon/` ont échoué dans l’outil Web de cette session. Cela n’établit ni panne ni blocage des moteurs. Refaire ces contrôles pendant le diagnostic dans un navigateur ou par requêtes HTTP si disponibles.

Une entrée au sitemap n’assure pas l’indexation. L’inspection d’URL peut distinguer la version connue de Google et le test en direct ; aucune demande d’indexation n’est nécessaire pour consulter un état. Sources officielles : [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview), [inspection d’URL](https://support.google.com/webmasters/answer/9012289?hl=en).

**Alternatives écartées** : déclarer le site public validé à partir du dépôt, utiliser une recherche personnalisée comme preuve exhaustive ou soumettre automatiquement des URLs.

## 5. Search Console facultative, sans nouvelle intégration

**Décision** : utiliser un accès en lecture déjà disponible ou des exports manuels ; sinon noter « indisponible » et poursuivre. Aucun connecteur Search Console exploitable n’est exposé dans la session et aucun export identifiable n’a été trouvé dans les fichiers de travail recherchés hors sauvegardes et profils. Cela ne prouve pas l’absence d’un compte ou de données détenues ailleurs.

**Justification** : une propriété de domaine et une propriété de préfixe ne couvrent pas les mêmes variantes. Conserver la propriété exacte et le périmètre d’agrégation à chaque comparaison. [Types de propriétés](https://support.google.com/webmasters/answer/34592?hl=en).

Consigner les dates, filtres et type de recherche réellement sélectionné ; garder les dimensions disponibles sans supposer un tableau croisé page × requête. Le graphique et le tableau peuvent avoir des agrégations différentes. [Rapport Performances](https://support.google.com/webmasters/answer/7576553?hl=fr).

Les exports sont limités en lignes ; leurs totaux peuvent dépasser les lignes visibles. Certaines valeurs indisponibles deviennent des zéros dans les téléchargements : relever leur ambiguïté depuis la source, sans considérer automatiquement chaque zéro comme une mesure certaine. [Export des rapports](https://support.google.com/webmasters/answer/12919797?hl=fr).

Des requêtes sont omises ou anonymisées ; marque/hors marque ne reconstitue donc pas nécessairement le total. Ne pas sommer les requêtes pour reconstruire le site, ni joindre deux tableaux séparés comme des observations page × requête. [Dimensions](https://support.google.com/webmasters/answer/17011259?hl=en), [écarts et agrégations](https://support.google.com/webmasters/answer/17010575?hl=en).

**Alternatives écartées** : API/OAuth, export permanent, nouvelle propriété, demande de secrets ou inférence de trafic nul en l’absence de source.

## 6. Référence et suivi

**Décision** : figer avant modification les 28 derniers jours complets non préliminaires disponibles et les 28 précédents. Après publication explicitement autorisée, contrôle sous sept jours, bilans à J+28 et J+56 avec les 28 derniers jours complets alors disponibles.

**Justification** : les séries quotidiennes Search Console utilisent Pacific Time ; le journal de publication garde Europe/Paris et son décalage UTC. Les données ont un délai et peuvent être préliminaires. Les dates effectives sont toujours enregistrées. Une fenêtre à J+28 peut chevaucher l’avant-publication : l’exposition partielle rend le premier bilan non concluant quant à l’effet du lot. [Dimensions et dates](https://support.google.com/webmasters/answer/17011259?hl=en), [limites de données](https://support.google.com/webmasters/answer/17010575?hl=en).

Comparer le site à lui-même et le groupe fixe de pages à lui-même. Pour le lot, sommer seulement des lignes pages complètes et comparables ; calculer CTR = clics / impressions. Ne pas moyenner les CTR ou les positions de lignes ; une position agrégée absente reste indisponible. Référence nulle : écart relatif non calculable. Annoter saisonnalité et changements concurrents ; une comparaison annuelle est complémentaire si disponible. Aucun seuil statistique arbitraire et aucune garantie de hausse.

**Alternatives écartées** : exiger une hausse pour réceptionner le travail local, comparer des groupes changeants, programmer des bilans avant de connaître une date de publication ou convertir des valeurs absentes en zéro.

## 7. Choix éditoriaux et réception

**Décision** : aucun lot de pages prédéterminé, aucun nouvel article et aucune longueur de texte ou de titre imposée. Sélectionner après diagnostic au plus trois actions sur cinq pages, effets indirects inclus. Donner la priorité à l’accès aux conseils, puis à la preuve et à la valeur pour le lecteur.

**Justification** : des titres descriptifs et fidèles sont évalués dans leur contexte, sans seuil universel de 60 caractères. [Liens de titre](https://developers.google.com/search/docs/appearance/title-link?hl=fr). Une révision vise l’utilité, sans date artificielle ni quantité de texte prescrite. [Contenu utile](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

**Alternatives écartées** : appliquer automatiquement les recommandations de juin, rallonger des catégories pour atteindre un compte de mots, ou produire des variantes d’articles par mot-clé. `prompt codex.txt` s’appliquera si une révision éditoriale est sélectionnée ; son choix autonome de sujet ne s’applique pas à ce plan.

## Résolution des inconnues

Toutes les inconnues de conception ont une décision : outil statique local sans dépendance, sources durables identifiées, données GSC facultatives, contrôle public indépendant et protocole de suivi défini. Les futures URLs retenues, données privées et dates de publication sont des entrées du diagnostic et de la réalisation, pas des décisions techniques manquantes. Aucun site ni compte n’a été modifié.
