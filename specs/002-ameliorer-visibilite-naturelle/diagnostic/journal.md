# Journal du premier lot SEO

## 2026-11-01 — Démarrage

Statut : diagnostic, non publié. Autorisation : demande de réaliser les améliorations après spécification, plan, tâches et analyse. Aucune publication autorisée.

L’état courant, les empreintes et le statut Git sont conservés dans `worktree-before.json`. Changements préexistants : `.gitignore`, `AGENTS.md`, `js/simulateur.js`, `readme.md`, `simulateur/index.html`, installation Spec Kit et documents 001/002 non suivis. Ils ne sont ni restaurés ni committés.

Le pointeur actif désigne 002 ; la branche Git reste `setup/spec-kit-ecobalcon`. Checklist : 16/16, aucun élément incomplet. Python standard, Git, PowerShell et Node disponibles ; aucun paquet à installer. Les exclusions existantes couvrent profils, environnement Python, caches et journaux ; aucun fichier d’exclusion général modifié. Les éventuels exports bruts pourront rester dans le répertoire temporaire local, hors dépôt ; aucun export n’est créé.

Le constat I1 de l’analyse est corrigé en faisant figer l’échantillon nominatif dans T009 avant les contrôles parallèles T010/T011. La qualité des exigences et leurs cases restent intactes.

Échéances de publication et de suivi : non démarrées. Les contrôles de réception sont initialisés à non vérifié dans `validation.md`.

## 2026-11-16 — Reprise autorisée, diagnostic et sélection

Demande utilisateur : finaliser le diagnostic et appliquer un premier lot de trois
actions sur cinq pages maximum. Autorisation locale seulement, aucun commit ni publication.
Skill `speckit-implement` repris ; checklist documentaire toujours complète, 16/16,
aucun hook. Fonctionnalité 002 résolue explicitement sans modifier le pointeur local.

Les quatre tests de l'auditeur passent. L'inventaire `reprise-20261116/` est identique
à `initial/` pour les comptes et toutes les empreintes du site : 195 HTML, 11 familles,
73 URLs sitemap, 226 observations préexistantes. L'état de travail courant est aussi
capturé dans `backups/homepage/seo-lot-20261116/snapshot.json`, 341 fichiers et statut Git.
Les documents et modifications préexistants sont conservés ; la capture actuelle
complète la photographie historique sans la réécrire.

Les relectures indépendantes ont confirmé les compteurs erronés, les besoins
d'orientation des catégories et la contradiction des schémas du basilic. Les
contrôles publics sont consignés dans `public-review.md` avec leurs erreurs et
versions anciennes. L'extension Chrome ne répond pas ; aucun nouveau relevé GSC,
test visuel ou parcours clavier n'est présenté comme réalisé.

Le diagnostic consolidé et les trois fiches d'actions ont été rédigés avant
correction. `baseline.json` fige les quatre URLs, sources et empreintes courantes.
Son enregistrement préparatoire de sélection du 1er novembre est conservé comme
historique ; la sélection formalisée dans `actions.md` date du 16 novembre.
La référence GSC historique partielle reste datée d'octobre, avec réserves sur sa
complétude et son ancienneté. Aucun chiffre du 16 novembre inventé.

## 2026-11-16 — Réalisation et application locale

Deux copies depuis la même capture : `control/` sans correction et `work/` corrigée.
Sources seules attribuées à un agent dans `work/`, documents à un autre, intégration
coordonnée. `GIT_CEILING_DIRECTORIES` empêche la découverte du dépôt parent ;
absence de dépôt confirmée. Syntaxe PS vérifiée, deux rebuilds standards réussis,
sans `-RebuildHome`. Aucun rebuild dans le dépôt original.

La comparaison du contrôle écarte 176 réécritures de sérialisation et identifie
la dérive préexistante du sitemap du simulateur. Une relecture indépendante
confirme exactement sept différences fonctionnelles entre contrôle et copie
corrigée, aucun ajout ni retrait dans les 341 fichiers.

Après vérification des empreintes de toutes les destinations, application des
sept fichiers décrits dans `generation-diff.json` :

- ACT-001 : `categories/index.html`, compteurs 17/24 ;
- ACT-002 : `categories/plantes-semis/index.html` et
  `categories/entretien-astuces/index.html`, deux navigations nommées et 14 liens ;
- ACT-003 : entrée basilic dans `scripts/article-overrides.ps1` et canonique
  `articles/bouturer-basilic-balcon/index.html`, FAQ fidèle, HowTo retiré,
  modification réelle datée du 16 novembre ; corps et lecture conservés ;
- `sitemap.xml` : quatre nœuds du lot ; `scripts/sitemap-page-state.json` : trois
  entrées de catégories seulement. État et nœud du simulateur conservés.

Preuves : `generation-review.md`, `generation-diff.json`, `acceptance-checks.json`
et `final/inventory.json`. Aucun écart concurrent lors de l'application. L'accueil,
le simulateur, les autres pages, images, scripts partagés, CSS, identifiants et
contacts sont byte-identiques à la photographie de reprise.

## 2026-11-16 — Livraison et suite

Statut du lot : `en_realisation`, application locale et réception statique achevées,
réception navigateur T024 encore ouverte. Statut de publication : `non_publie`.
Ne pas passer à `reception_locale` complète tant que desktop/mobile/clavier ne
sont pas vérifiés ; ensuite seulement conserver la transition vers `non_publie`.
`publication_at` et `due_date` restent nulles.

Le protocole `suivi-mode-emploi.md` et le modèle `bilan-modele.md` sont prêts.
Leurs cas limites ont été relus : sans GSC, propriété/période/groupe incompatible,
tableau incomplet, référence zéro, jour préliminaire ou exposition incomplète.
Les inconnues restent nulles, le CTR est pondéré par impressions, la position
agrégée n'est pas une moyenne de lignes. Une comparaison inutilisable reste
`non_concluant`, sans faux bilan chiffré. Les échéances J+7/J+28/J+56 sont
documentaires et ne commencent qu'après publication autorisée et constatée.

Prochaine décision : vérifier les quatre pages avec un Chrome accessible à 1280 px,
390 px et au clavier. La réception statique et le dossier sont livrés avec cette
limite explicite, sans gain SEO mesuré. Aucun staging, commit, push, `publish.bat`,
déploiement, demande d'indexation ou tâche planifiée exécutés.
