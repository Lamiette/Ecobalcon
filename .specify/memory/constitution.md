# EcoBalcon Constitution

## Core Principles

### I. Préserver une architecture statique simple

EcoBalcon reste un site statique en français : HTML lisible, CSS, JavaScript léger
et scripts PowerShell. Chaque évolution réutilise les structures et classes
existantes. Une dépendance, un framework, un serveur ou une étape de compilation
supplémentaire exige un besoin concret dans le périmètre demandé et une
justification dans le plan. Une refonte technique sans rapport avec ce besoin
est exclue. Cette simplicité permet de maintenir et publier le site facilement.

### II. Modifier les sources durables avant les sorties générées

Les changements d'article passent par `scripts/article-overrides.ps1` ou leur
source de génération disponible. Une révision substantielle conserve un
`BodyHtml` durable et évite les remplacements qui peuvent dupliquer le contenu.
Les changements globaux de template, navigation, footer, SEO et pages système
passent par `scripts/rebuild_articles.ps1`, puis par la génération appropriée.
Le CSS se modifie dans `css/style.css` ; `css/style.min.css` est synchronisé par
le rebuild. Une correction uniquement dans une sortie générée n'est acceptable
que pour une urgence explicitement demandée et documentée.

Les pages canoniques existantes peuvent servir de base au générateur en
l'absence de `raw-singlefile/` : elles ne sont pas toutes des sorties jetables.
Le plan identifie les sources et sorties concernées avant toute écriture afin
que le changement survive aux prochains rebuilds.

### III. Conserver les URLs publiques et la cohérence SEO

Le domaine de référence est `https://ecobalcon.com`. Les articles conservent
leurs URLs `/articles/<slug>/` avec slash final et leurs redirections legacy.
Toute migration, suppression ou désindexation sort du périmètre courant sauf
demande explicite. Les métadonnées `canonical`, `hreflang`, Open Graph, Twitter
Card, JSON-LD, ainsi que `robots.txt` et `sitemap.xml`, restent cohérentes avec
les pages concernées. Les données structurées décrivent le contenu réellement
visible, sans FAQ ni étapes inventées pour conserver un schéma.

Une révision préserve `datePublished`. `dateModified` et les dates du sitemap
ne changent que pour des modifications réelles ; aucune actualisation globale
artificielle n'est admise. Les liens internes et assets des pages modifiées
doivent pointer vers des destinations valides.

### IV. Produire un contenu utile et des visuels fidèles

Le site s'adresse en français, au tutoiement, aux personnes qui jardinent sur
balcon. Les conseils restent concrets et compatibles avec l'espace disponible,
le poids des pots, le vent, l'exposition, l'eau et les voisins. Les affirmations
horticoles décisives sont vérifiées auprès de sources adaptées ; aucun essai,
témoignage, résultat ou diagnostic certain n'est inventé.

Pour les articles, `prompt codex.txt` fournit les consignes éditoriales détaillées.
Une photographie réelle, pertinente et sans texte sert d'image principale et
de vignette ; les schémas explicatifs se placent dans le corps près du geste.
Leurs titres, légendes et quantités utiles sont conservés ; les phrases générales
de bas d'image restent dans le texte HTML. Une image existante pertinente peut
être conservée. La provenance et la licence des nouveaux visuels tiers sont
vérifiées et documentées en interne selon les règles éditoriales du projet.
Les attributs `alt`, dimensions et chargement restent exacts et adaptés au contexte.

### V. Garder un périmètre explicite et protéger le travail existant

Chaque évolution importante définit un résultat observable, ses limites et ses
critères d'acceptation. Le travail commence par `git status` et l'examen des
différences utiles ; les changements préexistants sont préservés. Une tâche ne
déclenche pas une refonte, un audit exhaustif ou une série d'articles sans lien
avec la demande. Les petites corrections peuvent être réalisées directement,
sans imposer tout le cycle Spec Kit.

L'accueil est préservé par défaut. L'option `-RebuildHome` nécessite une demande
claire ; une variation du nombre d'articles autorise seulement le compteur
approprié dans le cadre d'une tâche éditoriale. Les identifiants analytics,
Clarity et affiliation, coordonnées de contact et formulaires ne sont pas
changés sans demande explicite. Les dossiers `backups/` et profils locaux
ignorés sont conservés. `publish.bat`, push et déploiement ne sont exécutés
que lorsque la demande les autorise ; une installation locale ne les autorise pas.

### VI. Vérifier le résultat avec des contrôles proportionnés

Les critères d'acceptation déterminent les contrôles à effectuer. Toute livraison
inclut une relecture du diff et `git diff --check`. Une modification visible est
vérifiée dans un navigateur local si disponible ; les changements CSS ou de
layout sont contrôlés sur ordinateur et mobile. Les limites d'un contrôle sont
signalées sans le présenter comme réussi.

Les tests automatiques ciblent les comportements ou régressions pertinents.
Aucune nouvelle suite générale ni démarche TDD systématique n'est imposée pour
une correction éditoriale, visuelle ou de configuration à faible impact.
Les scripts PowerShell modifiés sont analysés syntaxiquement avant exécution.
Après génération, toutes les sorties touchées sont examinées ; une commande
réussie ne suffit pas à prouver le rendu ni la publication du site.

## Contraintes du projet

`AGENTS.md` est la référence détaillée pour l'organisation des fichiers, les
commandes de génération, les protections du projet et les contrôles après
modification. `prompt codex.txt` s'applique aux travaux éditoriaux ; son choix
autonome d'un sujet ne s'applique pas à une installation ou évolution technique.
Les notes sous `backups/` sont des traces datées à confronter à l'état actuel.
Une mention historique de GitHub Pages dans une documentation ne remplace pas
le domaine public actuel.

Le rebuild peut modifier articles, index, redirections, catégories, auteurs,
pages système, CSS minifié, `manifest.json`, sitemap, robots et
`scripts/sitemap-page-state.json`. Ces changements sont contrôlés individuellement,
sans acceptation ni restauration globale. L'état du sitemap reste cohérent avec
les sources. Le service worker peut servir un ancien contenu : les vérifications
visuelles utilisent une version fraîche, avec invalidation ciblée si nécessaire,
sans désactivation globale du cache pour masquer un défaut.

## Déroulement du travail

1. Lire les consignes applicables et identifier un état initial fiable.
2. Pour une évolution importante, rédiger une spécification bornée, puis un plan
   qui nomme les sources, sorties, risques concrets et contrôles pertinents.
   Les documents du projet sont rédigés en français ; les noms et formats requis
   par les outils sont conservés.
3. Découper les tâches selon leurs dépendances. Pour une tâche complexe, confier
   les parties indépendantes à des sous-agents avec missions précises et fichiers
   attribués afin d'éviter les écritures concurrentes.
4. Mettre en œuvre le périmètre demandé. Poser une question seulement si une
   information nécessaire manque réellement ; ne pas multiplier les validations
   intermédiaires pour des actions déjà autorisées et réversibles.
5. Exécuter les contrôles définis. Pour un article, vérifier titre, description,
   liens, image principale, JSON-LD et sorties concernées. Pour une logique
   interactive, vérifier les scénarios touchés, états vides et réinitialisation
   lorsqu'ils sont concernés. Le test existant de suivi d'affiliation est pertinent
   si le suivi ou le consentement est modifié.
6. Livrer un bilan bref : comportement obtenu, fichiers concernés, contrôles
   effectivement réalisés et éventuelles limites. Distinguer résultat local,
   publication et indexation.

## Governance

Les instructions explicites de l'utilisateur restent prioritaires. Cette
constitution formalise les règles existantes d'EcoBalcon ; elle n'accorde aucune
autorisation de publication et ne remplace pas les consignes détaillées des
fichiers et dossiers concernés. Une contradiction est résolue à partir des
instructions applicables et du périmètre courant ; toute clarification durable
est répercutée dans les documents de référence concernés lors d'une modification
autorisée.

Chaque spécification, plan et relecture vérifie les principes applicables.
Une exception demandée par l'utilisateur est documentée avec sa portée et son
impact. Les amendements exposent leur motif et synchronisent les consignes
concernées lorsque nécessaire. Une simple clarification suit une version PATCH ;
l'ajout ou l'élargissement substantiel d'un principe suit une version MINOR ;
la suppression ou redéfinition incompatible d'un principe suit une version MAJOR.
La date de ratification initiale est conservée et la date du dernier amendement
correspond à la modification réelle. Cette version 1.0.0 constitue l'adoption
initiale des règles du projet dans Spec Kit.

**Version**: 1.0.0 | **Ratified**: 2026-11-01 | **Last Amended**: 2026-11-01
