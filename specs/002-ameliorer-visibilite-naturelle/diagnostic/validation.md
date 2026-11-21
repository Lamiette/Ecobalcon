# Réception du lot SEO — LOT-001

Dernière vérification : **2026-11-16**. Trois actions appliquées localement sur
quatre pages. **Réception statique conforme ; réception visible non vérifiée.**
Publication non effectuée, indexation actuelle inconnue, aucun gain de trafic mesuré.
T024 reste ouverte tant que le navigateur n'a pas permis les contrôles requis.

## Preuves et commandes

- Diagnostic et choix : [diagnostic.md](diagnostic.md), [actions.md](actions.md).
- Avant : [inventaire figé](initial/inventory.json),
  [reprise identique](reprise-20261116/inventory.json), [baseline.json](baseline.json).
- Génération : [generation-review.md](generation-review.md),
  [contrôle sans correction](generation-control.json), [diff appliqué](generation-diff.json).
- Après : [inventaire final](final/inventory.json),
  [contrôles d'acceptation](acceptance-checks.json).
- Limites publiques et de recherche : [public-review.md](public-review.md),
  [search-data.md](search-data.md), [relecture locale](local-review.md).

Commandes effectivement exécutées :

```powershell
python -m unittest discover -s scripts/tests -p test_seo_audit.py
python scripts/seo_audit.py --root . --output-dir specs/002-ameliorer-visibilite-naturelle/diagnostic/reprise-20261116
python backups/homepage/seo-lot-20261116/verify_lot.py --repository
python scripts/seo_audit.py --root . --output-dir specs/002-ameliorer-visibilite-naturelle/diagnostic/final
git diff --check
```

Les **quatre tests de l'auditeur réussissent**. Deux rebuilds standards exécutés
dans les copies isolées seulement, codes 0 ; syntaxe PowerShell valide avant et
après application. `Get-SitemapContentHash` confirme les trois hashes modifiés.
Le simulateur n'est pas affecté : ses fichiers sont identiques à l'instantané
courant ; pas de nouvelle série de tests Node nécessaire pour ce lot.

## Critères des trois actions

| Action | Contrôle avant/après | Résultat |
| --- | --- | --- |
| ACT-001 | Hub 16/20 → 17/24, quatre comptes 12/17/24/5 cohérents avec les listes liées | conforme |
| ACT-002 | Statique conforme : deux navigations nommées, 14 nouveaux liens valides ; premières listes complètes de 17/24 liens et heads inchangés. Rendu et clavier non vérifiés. | non_verifie |
| ACT-003 | Trois FAQ identiques au visible, HowTo trompeur retiré, corps et lecture inchangés, date de publication conservée ; CSP exacte | conforme |
| Plafond | Sept fichiers d'application changés : quatre HTML, override, sitemap et état ; aucune autre page affectée | conforme |
| Préservation | Accueil, travail 001, images, CSS/JS, service worker, identifiants, contacts, redirections, index et auteurs inchangés | conforme |
| Audit final | 195 HTML, 73 URLs sitemap, même partition ; 226 observations préexistantes identiques hors date, aucune nouvelle | conforme |

## Matrice des exigences

Les états documentaires `conforme` ne signifient pas que les observations futures
de trafic ont été effectuées. Un contrôle de rendu manquant reste `non_verifie`.

| Critère | Résultat | Preuve ou limite |
| --- | --- | --- |
| FR-001 : inventaire et environnements | conforme | Inventaires, 11 familles, listes explicites et diagnostic daté |
| FR-002 : couverture technique et lecture | non_verifie | Statique conforme : inventaire exhaustif et 20 chemins relus ; rendu mobile et contrôles publics limités |
| FR-003 : constats et audit ancien | conforme | OBS-LOCAL/PUBLIC/GOOGLE, preuves, confiance et reports ; aucun score de juin repris |
| FR-004 : accès et provenance GSC | conforme | Source partielle, extraction historique datée ; nouvel accès indisponible, aucun secret demandé |
| FR-005 : analyse sans données inventées | conforme | Requêtes partielles distinctes des pages, marque documentée, aucune jointure supposée |
| FR-006 : priorisation | conforme | Trois fiches motivées et reports dans actions.md |
| FR-007 : trois actions/cinq URLs | conforme | Trois actions/quatre URLs, zéro article nouveau et aucun effet indirect hors lot |
| FR-008 : critères par action | conforme | Fiches, valeurs avant/après et preuves de réception |
| FR-009 : préservation | conforme | Sept seuls écarts d'application, autres empreintes conservées |
| FR-010 : fidélité des métadonnées | conforme | FAQ égale au visible, HowTo retiré pour ce seul slug, dates et CSP vérifiées |
| FR-011 : réception statique et visible | non_verifie | Contrôles statiques réussis ; T024 ouverte, aucune conformité globale annoncée |
| FR-012 : état initial et journal | conforme | Référence historique conservée, sélection et capture courante avant correction |
| FR-013 : protocole de suivi | conforme | Validation documentaire : suivi-mode-emploi.md ; exécution future sans_objet avant publication |
| FR-014 : limites des bilans | conforme | Validation documentaire : bilan-modele.md et cas limites ; aucune mesure future inventée |
| FR-015 : livraison/publication | conforme | Non publié, publication_at et due_date nulles, aucune garantie de trafic |
| SC-001 : classification et couverture | conforme | 195 pages classées, 11 familles relues ; contrôles impossibles comptés et motivés |
| SC-002 : lot justifié et borné | conforme | Trois actions/quatre pages, sources et critères nommés avant correction |
| SC-003 : réception complète | non_verifie | Statique positive, rendu desktop/mobile/clavier non vérifié |
| SC-004 : dossier avec/sans GSC | conforme | Diagnostic, lot, référence partielle et calendrier conditionnel |
| SC-005 : suivi conditionnel prévu | conforme | Validation documentaire : sous sept jours, J+28/J+56 après publication réelle ; aucune tâche programmée |
| SC-006 : évolution organique | sans_objet | Non mesurable avant publication et périodes comparables |
| SC-007 : protections et statut | conforme | Zéro publication, changement d'identifiant ou altération de l'accueil |

## Contrôle restant — T024

L'ouverture d'un onglet Chrome par l'extension échoue avec
`The browser access host is unavailable`. Aucun contrôle natif n'a été utilisé,
selon la préférence exprimée. Ce blocage ne prouve ni défaut ni réussite du rendu.

À reprendre sur les quatre pages locales avec ressources fraîches :

- 1280 px puis 390 px : textes et navigations lisibles sans débordement ;
- Tab/Maj+Tab et Entrée : liens atteignables, focus visible, destination attendue ;
- articles de destination et retour : lecture et navigation conservées ;
- basilic : même contenu et image, six minutes de lecture, aucun changement visible indésirable.

Les contrôles publics et GSC actuels restent limités comme indiqué dans leurs
rapports ; ils ne sont pas présentés comme une réception publique.
La publication demeure une action distincte non exécutée.

## Correction de disposition — 2026-11-21

À la demande de l'utilisateur, reprise de la présentation des trois catégories.
Les contrôles et empreintes du 16 novembre restent des preuves historiques ; ils
ne décrivent pas cette nouvelle version. Preuves de la correction :
[categories-layout-20261121.json](categories-layout-20261121.json).

- Hub : introduction sur une seule colonne, quatre cartes en grille 2 × 2 puis
  une colonne sur petit écran, cartes entièrement cliquables et actions alignées.
- Sous-catégories : héros communs plus compacts, images à hauteur bornée, compteur
  et accès direct aux guides regroupés ; quatre blocs d'orientation avec liens
  clairement séparés et cibles tactiles d'environ 44 px à la taille de police standard.
- Listes exhaustives : deux colonnes sur ordinateur, une colonne sous 700 px,
  liens présentés en cartes de même rangée et sans la limite de largeur éditoriale.
- Nouveaux styles tous limités à `.category-page`, présente uniquement sur ces
  trois pages ; le CSS antérieur est conservé octet pour octet avant l'ajout.
- CSS minifié généré par le rebuild standard dans une copie isolée ; URL CSS des
  trois pages versionnée `20261121-categories-1` pour éviter l'ancien cache de l'asset.

Comparaison de 417 fichiers : sept fichiers d'application changés seulement,
dont trois HTML, CSS source/minifié et trois entrées de sitemap/état. Les autres
pages et fichiers d'application sont préservés. Les 17/24 guides, leurs liens et
leur ordre restent identiques ; métadonnées, JSON-LD, CSP, images et attributs
existants conservés. Le contrat littéral du générateur est maintenu.

Relecture indépendante favorable ; audit réel du dépôt : 195 HTML, 73 URLs sitemap,
mêmes 226 observations préexistantes, aucune nouvelle. Les trois pages et le CSS
versionné ont été servis en HTTP local avec code 200 et octets identiques aux
fichiers corrigés. Ce contrôle HTTP n'est pas une vérification de rendu.

La tentative de connexion à l'extension Chrome échoue encore ; aucun contrôle
natif n'a été utilisé. **Le rendu effectif et le parcours clavier restent
`non_verifie`, et T024 reste ouverte.** Aperçu local démarré sur
`http://127.0.0.1:8000/categories/` pour la revue de cette correction avant commit.
Aucun commit, push, fusion ou déploiement effectué dans cette intervention.
