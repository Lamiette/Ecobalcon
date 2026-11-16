# Relecture locale de l’échantillon

Date : 2026-11-01. Périmètre : les 20 chemins figés dans [echantillon.json](echantillon.json), lus comme fichiers HTML, ainsi que les déclarations et références relevées dans [initial/inventory.json](initial/inventory.json). Aucun fichier du site modifié par cette relecture. La lecture du texte principal, de la structure et des liens ne constitue ni un contrôle de rendu navigateur ni une preuve d’indexation Google.

## Couverture nominative

| Chemin | Rôle et résultat de lecture/parcours statique |
| --- | --- |
| `index.html` | Accueil : question générale jardinage sur balcon, accès aux bases, aux quatre thèmes, aux articles et au simulateur. 58 guides annoncés, cohérents avec l’inventaire des articles. Le bloc « cette semaine » montre un article canicule en novembre dans le HTML : son éventuelle actualisation dynamique n’est pas vérifiée. Accueil hors modification du lot. |
| `articles/index.html` | Index : 58 cartes de guides et recherche prévue. Titres/descriptions permettent de reconnaître les sujets ; les cartes donnent des liens canoniques locaux. Le fonctionnement de la recherche et du bouton « Voir plus » demande JavaScript/navigateur. Les titres de cartes ne sont pas toujours les titres SEO des articles, ce qui n’est pas en soi une erreur. |
| `articles/bouturer-basilic-balcon/index.html` | Article : explique choix de tige, coupe sous nœud, retrait des feuilles, enracinement dans l’eau, transfert en pot et erreurs. Liens vers culture du basilic, rempotage et sortie des plantes. Le titre SEO indique déjà l’eau, les étapes et la replantation ; ne pas présupposer qu’il manque ces termes. Questions visibles et schémas à rapprocher, voir OBS-LOCAL-004. |
| `articles/jardin-sur-balcon-astuces/index.html` | Article débutant : dix thèmes, du choix des plantes à la récolte, avec liens complémentaires. Lecture utile comme panorama mais plusieurs passages génériques ou trop affirmatifs demandent une vérification éditoriale avant toute réécriture ; voir OBS-LOCAL-005. Le titre actuel « 10 astuces pour un balcon qui pousse mieux » est moins explicite sur le jardinage débutant que la description. |
| `categories/index.html` | Orientation par quatre besoins, avec conseils de départ et liens simulateur/checklist/bases. La page possède déjà un corps utile ; l’ancienne recommandation d’enrichissement de juin n’est pas à répéter mécaniquement. Deux compteurs sont périmés, voir OBS-LOCAL-001. |
| `categories/fiches-techniques/index.html` | Douze guides de cultures nommées, avec présentation du volume de pot, exposition, arrosage, taille et récolte. Les douze liens répondent à la promesse et les destinations locales existent. La page reste une liste de cultures, sans aide comparative supplémentaire ; ce n’est pas un défaut d’accès bloquant. |
| `categories/plantes-semis/index.html` | Dix-sept guides existants. La liste mélange saisons, expositions, légumes, aromatiques et biodiversité sans parcours de choix explicite avant la liste. Le H1 et la présentation annoncent pourtant « choisir quoi planter ». Voir OBS-LOCAL-002. |
| `categories/entretien-astuces/index.html` | Vingt-quatre guides existants. La liste mélange graines, hiver, chaleur, taille, eau et problèmes de feuilles ; le lecteur doit parcourir l’ensemble pour reconnaître son symptôme ou geste. Voir OBS-LOCAL-003. |
| `categories/amenagement-du-balcon/index.html` | Cinq guides, précédés d’un texte déjà développé sur circulation, eau, poids et accès aux pots. Liens contextuels vers outils, pots, grimpantes, économies d’eau, rempotage et vent. La priorité d’enrichissement évoquée en juin a déjà été traitée localement ; aucun quota de mots supplémentaire justifié par cette lecture. |
| `auteurs/index.html` | Présentation des trois signatures, thèmes et liens de profils. Les comptes 29 + 16 + 13 couvrent les 58 guides. Les profils décrivent une ligne éditoriale ; la lecture n’établit pas d’expérience réelle supplémentaire. |
| `auteurs/clara-fontaine/index.html` | Profil : rôle, méthode, domaines et 29 guides, avec lien méthode éditoriale et contact pour correction. Parcours statique explicite vers les articles ; image et cartes doivent être vérifiées en rendu si ce profil est un jour modifié. |
| `simulateur/index.html` | Outils : sélection des plantes, calcul de pot, arrosage, compost et catalogue. Les explications de la fonctionnalité 001 sont présentes dans les fichiers actuels. Les libellés principaux et accès aux guides sont lisibles dans la source ; calculs, filtres et sauvegarde ne sont pas testés par cette lecture et restent hors modification SEO. |
| `checklists/arrosage-vacances/index.html` | Checklist imprimable : quatre groupes de gestes, champs de préparation, impression PDF et retour outils. Le contenu existe sans être une ancienne URL redirigée : la famille automatique `legacy` est une classification trop grossière de l’auditeur, à interpréter ici comme outil/checklist, sans modifier sa classe de recherche ni son URL. Impression et saisie non exécutées. |
| `a-propos/index.html` | Mission, méthode de vérification, corrections, signatures et limites du site. Liens vers profils, contact, catégories et outils. Ton compatible avec un contenu pratique ; cette relecture ne valide pas les faits de chaque ancien article. |
| `contact/index.html` | Instructions de message, champs nom/email/objet/message, destination FormSubmit et confirmation annoncée. Les liens et déclarations sont présents ; aucun formulaire rempli ni envoyé. |
| `contact/merci/index.html` | Confirmation de contact, retours au formulaire et articles. Exclusion `noindex,follow` déjà présente et conservée. Le texte ne prouve pas un envoi réel : la page a seulement été lue localement. |
| `politique-confidentialite/index.html` | Décrit consentement, mesure d’audience et formulaire. Exclusion `noindex,nofollow` déjà présente. Aucun identifiant ni mécanisme de collecte n’est modifié ; aucune conclusion de conformité juridique n’est tirée. |
| `404.html` | Page système avec retour accueil, articles et catégories ; `noindex,follow`. Les liens de secours sont explicites. Le code HTTP de l’hébergement n’est pas connu par cette lecture du fichier. |
| `bouturer-basilic-balcon/index.html` | Ancienne URL de dossier : meta refresh et canonical vers `https://ecobalcon.com/articles/bouturer-basilic-balcon/`, lien de repli et `noindex,follow`. Destination présente localement. Aucun statut HTTP 301 n’est déduit du fichier. |
| `articles/bouturer-basilic-balcon.html` | Ancienne URL de fichier : même destination canonique, mécanisme HTML et exclusion conservés. La redirection JavaScript/HTML effective et le statut public relèvent du contrôle navigateur/public. |

Toutes les familles relevées dans l’inventaire sont représentées : accueil, article, index articles, catégories, auteur, index auteurs, outil, institutionnelle, contact, système et legacy. La checklist est aussi relue séparément malgré son libellé de famille automatique.

## Constats locaux utilisables pour la priorisation

| ID | URLs / preuve | Constat et effet possible | Confiance et limites |
| --- | --- | --- | --- |
| OBS-LOCAL-001 | `/categories/` : `categories/index.html:75` et `:82`, comparés aux listes et compteurs des catégories | Les cartes annoncent 16 guides Plantes & semis et 20 Entretien & astuces, alors que les catégories liées contiennent respectivement 17 et 24 liens de guides. Cela donne un repère de navigation inexact et masque l’étendue actuelle du contenu. | Forte sur l’écart local. Aucun effet de classement quantifié. |
| OBS-LOCAL-002 | `/categories/plantes-semis/` : H1 puis `Tous les guides plantes et semis`/première `.article-list` | La promesse de choix conduit directement à 17 liens mêlant plusieurs critères. Une courte orientation par exposition, saison ou projet pourrait rendre les destinations existantes plus faciles à choisir, en conservant la liste complète. | Forte sur la structure observée ; bénéfice lecteur à vérifier en rendu. Gain organique hypothétique sans mesure dédiée. |
| OBS-LOCAL-003 | `/categories/entretien-astuces/` : présentation puis `Tous les guides entretien et astuces`/première `.article-list` | Les 24 liens mêlent prévention et problèmes courants sans entrées par situation. Une orientation courte vers eau, chaleur/froid, rempotage ou feuilles aiderait à rejoindre le guide pertinent. | Forte sur la structure ; pas de besoin d’un nouvel article ni d’un volume de texte imposé. |
| OBS-LOCAL-004 | `/articles/bouturer-basilic-balcon/` : JSON-LD lignes 31–32 et FAQ visible lignes 153–159 | Le `FAQPage` décrit trois questions différentes de celles affichées dans la FAQ : le schéma parle directement d’enracinement dans l’eau, de délai des racines et de replantation immédiate ; la FAQ visible parle de basilic de supermarché, de délai avant replantation et de maintien dans l’eau. Le `HowTo` indique aussi `totalTime=PT6M`, alors que le corps décrit un enracinement prenant des jours à des semaines. La syntaxe JSON est valide mais la fidélité au visible mérite correction ou clarification. | Forte sur les valeurs et textes divergents ; cette lecture ne certifie pas l’éligibilité à un résultat enrichi. La question du temps total doit distinguer manipulation et attente, sans inventer une durée biologique. |
| OBS-LOCAL-005 | `/articles/jardin-sur-balcon-astuces/` : lignes 111, 115, 124 et 155 | Passages à vérifier : comparaison de rétention d’eau plastique/terre cuite, jardin vertical présenté comme « meilleure option », apport mensuel d’engrais « pour garantir » et récolte généralisée « plus tu cueilles, plus elles repoussent ». Le tutoiement est mêlé au vouvoiement, avec quelques formulations anciennes. Une simple retouche SEO ne résoudrait pas ces faiblesses de fond. | Forte sur les formulations observées ; leur validité horticole n’a pas été vérifiée ici, sans recherche externe. Toute correction factuelle exige des sources adaptées et un `BodyHtml` durable si elle devient substantielle. |
| OBS-LOCAL-006 | `initial/inventory.json` : 226 occurrences `image_dimensions_absentes` ; 40 dans l’index articles, 21 dans le profil Clara, 4 dans jardin-astuces et 1 dans basilic | Des images n’ont pas de dimensions déclarées. Cela nécessite un examen du rendu et des styles avant de conclure à un problème de stabilité visuelle ; le constat n’est pas un score de performance réel. | Forte sur l’absence d’attributs ; effet visuel non vérifié. Correction de template potentiellement transversale à reporter si elle dépasse le plafond. |

Les références internes et assets de l’échantillon sont présents selon l’auditeur initial. Aucune référence locale absente n’a été relevée lors de la relecture de cet échantillon. Les liens externes n’ont pas été ouverts ; les ancres et la navigation au clavier restent à vérifier en navigateur, pas déclarées conformes sur la seule présence de `href`.

Complément à OBS-LOCAL-004 : la sixième étape du `HowTo`, « Pincer ensuite pour la densifier », n’est pas une étape de la liste visible « La méthode la plus simple pas à pas ». Une éventuelle révision du schéma doit partir des gestes effectivement présents, plutôt que d’ajouter une étape au corps pour justifier le schéma.

## Métadonnées et données structurées

Les 20 pages ont été rapprochées de leurs titres, H1, canonical, exclusions et éventuelles destinations de redirection dans l’inventaire. Le parser ne relève pas d’erreur syntaxique JSON-LD. Le contrôle humain OBS-LOCAL-004 montre pourquoi cette validité syntaxique ne suffit pas à valider la fidélité du schéma. Les pages de redirection sans H1 et les pages système sans article structuré ne sont pas assimilées à des articles incomplets.

Le titre SEO du basilic est déjà « Bouturer le basilic dans l’eau : étapes et replantation | EcoBalcon » ; la description reprend coupe, feuilles et transfert en pot. Ne pas retenir une action qui ajouterait simplement des termes déjà présents. Les chiffres GSC communiqués par le responsable de la mission peuvent étayer une priorisation, mais aucune lecture de compte GSC n’a été effectuée par cet agent ; ils doivent garder leurs propres preuves et limites dans `search-data.md`.

## Contrôles non réalisés ici

- Rendu réel à 1280/390 px, débordement, ordre et visibilité du focus : `non_verifie`, lecture du HTML uniquement. Le responsable de la mission assure la réception navigateur.
- Comportement JavaScript de recherche, outils, consentement, impression et redirections : `non_verifie`, aucun script exécuté par cette relecture.
- Accessibilité et statuts HTTP publics, version déployée, indexation Google, performances terrain et évolution des clics : `non_verifie`, aucune requête réseau dans cette mission de relecture.
- Vérification des affirmations horticoles anciennes et des sources externes : `non_verifie` ; les passages identifiés restent des candidats à examiner.

Cette relecture propose des constats et des limites. Elle ne sélectionne pas le lot, ne modifie aucun contenu et ne garantit aucun gain de visibilité.

## Reprise et vérification du 2026-11-16 avant sélection

Le rapport `reprise-20261116/inventory.json` a été comparé à l'inventaire initial :
toutes les empreintes des fichiers du site et tous les comptes sont identiques.
Les observations précédentes restent donc applicables au même contenu local.
Les quatre candidates ont été relues pour cette sélection : titres et introductions,
listes et compteurs des trois catégories, FAQ visible/structurée et pas-à-pas du
basilic. Aucun lien proposé ne nécessite un nouvel article.

Les liens d'orientation seront ajoutés dans des navigations nommées avant les
listes complètes. La première liste `article-list` doit rester celle des 17 ou
24 guides, car le rebuild la complète automatiquement. Le hub est une source
HTML durable ; ses compteurs corrigés ne sont pas écrasés par le rebuild.

La tentative d'ouverture d'un onglet par l'extension Chrome échoue avec
`The browser access host is unavailable`. Aucun parcours ni rendu mobile nouveau
n'a été observé ; ces contrôles restent `non_verifie`. Cette limite ne transforme
pas les constats de lecture du HTML en observations visuelles.

Sélection finale, distincte de cette relecture : [actions.md](actions.md).
