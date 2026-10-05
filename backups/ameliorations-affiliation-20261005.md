# EcoBalcon : améliorations de l’affiliation, 5 octobre 2026

Les modifications sont préparées dans le projet local. Le site public n’a pas été publié pendant cette intervention.

## Ce qui a changé

- **Matériel** : tableau de choix par besoin, limites, alternatives sans achat et noms de produits identifiables. Le lien Algoflash désigne désormais un terreau de semis, bouturage et repiquage, conformément à son usage. Les petits pots génériques ne sont plus proposés pour les légumes adultes.
- **Rempotage** : choix entre tapis, transplantoir et matériel déjà disponible ; critères d’encombrement et de largeur.
- **Vacances** : comparaison Raddy WS-64, kit solaire RAINPOINT, cônes Relaxdays et passage d’un proche ; protocole d’essai avant départ. Un seul lien par produit dans le comparatif.
- **Compostage** : comparaison collecte, lombricomposteur et bokashi, avec destination de la matière et contraintes d’entretien. Le bokashi demande une maturation avant usage.
- **Simulateur** : vent et besoins des légumes prioritaires. Un filet anti-oiseaux n’est plus proposé contre le vent. Le terreau de semis n’est plus proposé pour remplir les bacs potagers. Les guides internes accompagnent les choix ; aucun remplissage automatique pour afficher trois achats.
- **Critères de sélection** : les 13 articles comportant des liens Amazon et le simulateur expliquent les critères de choix et les caractéristiques à vérifier. Formulation neutralisée le 6 octobre 2026 à la demande du propriétaire. Aucun témoignage, note, prix ou résultat d’essai inventé.
- **Mesure** : événement GA4 `affiliate_click`, après acceptation des cookies de mesure uniquement. Le retrait du consentement bloque aussi les chargements de traceurs encore en attente.
- **Mobile** : correction du débordement des articles contenant un tableau. Le tableau défile dans son propre cadre.

Les titres, descriptions SEO, URL canoniques et images principales des 54 articles sont conservés. Les quatre guides enrichis ont une date de modification actualisée. Les identifiants Analytics, Clarity et Amazon existants sont conservés.

## Activer les rapports après publication

Le code transmet `affiliate_click` avec les paramètres suivants :

| Paramètre | Valeur | Utilité |
| --- | --- | --- |
| `affiliate_partner` | `amazon` | Partenaire |
| `affiliate_context` | `article` ou `simulator` | Origine du clic |
| `affiliate_placement` | `content` ou `recommendation` | Emplacement |
| `affiliate_id` | Code du lien court ou ASIN | Lien ou produit |
| `page_path` | Chemin de la page | Page concernée |

1. Après publication, visiter une page et accepter les cookies, puis vérifier la réception de `affiliate_click` dans GA4. Le test en environnement simulé vérifie le code, pas la réception dans ton compte Google.
2. Dans GA4, créer des dimensions personnalisées de portée **Événement** pour `affiliate_context`, `affiliate_placement` et `affiliate_id`, si elles n’existent pas déjà. Les noms affichés peuvent être « Contexte affiliation », « Emplacement affiliation » et « Lien affiliation ». Utiliser la dimension de page existante pour le chemin. [Documentation officielle des dimensions personnalisées](https://support.google.com/analytics/answer/14240153?hl=fr).
3. Préparer une exploration filtrée sur le nom d’événement `affiliate_click`, avec le nombre d’événements, la page et ces dimensions. Google indique un délai de 24 à 48 heures pour les rapports utilisant les nouvelles dimensions personnalisées. [Documentation des paramètres d’événement](https://developers.google.com/analytics/devguides/collection/ga4/event-parameters).
4. Comparer les résultats sur la même période de 30 jours : Search Console pour les visites depuis Google, GA4 pour les clics affiliés mesurés, Amazon pour les clics, commandes et commissions.

Les clics refusant le consentement ou bloqués par le navigateur ne sont pas mesurés dans GA4. Ne pas additionner `affiliate_click` et le `click` sortant standard de GA4 : ils peuvent représenter la même action. Un clic affilié n’est pas une vente. Le code ne reçoit aucun détail d’achat Amazon et ne permet pas d’attribuer une commission à un article à lui seul.

Pour une attribution des commandes par groupe de pages, créer plus tard des identifiants de suivi dans Amazon Partenaires, puis fournir les liens correspondants. Aucun nouvel identifiant de compte n’a été inventé.

## Priorités SEO suivantes

Les captures montrent 129 clics Google, environ 6 890 impressions, un CTR de 1,9 % et une position moyenne de 23,4 sur environ trois mois. La capture Amazon couvre les 30 derniers jours et affiche des gains nuls. Ces périodes différentes et ce faible volume ne permettent pas d’isoler un problème de conversion.

Pour choisir les prochains articles à renforcer, utiliser un export Search Console par **page et requête**, avec clics, impressions, CTR et position sur les 28 derniers jours, comparés aux 28 jours précédents. Commencer par les pages ayant des impressions sur des recherches pertinentes et des positions proches de la première page. Regarder la page et la requête ensemble avant de modifier un titre.

Un contenu fondé sur des caractéristiques peut être utile sans prétendre à un test. Pour ajouter de l’expérience originale, les premiers sujets possibles sont un contenant que tu utilises déjà, l’arrosage réel de tes pots et un rempotage photographié. Décrire uniquement des observations effectivement réalisées, avec exposition, taille du pot, durée et limites. Les améliorations réalisées ne garantissent pas une hausse du classement ou des commissions.

## Vérifications

- Neuf tests comportementaux : consentement absent, refusé ou expiré ; acceptation et retrait ; clic avant chargement différé ; clic du milieu ; liens internes et faux domaines Amazon ; recommandations et réinitialisation du simulateur.
- Commande reproductible : `node scripts/tests/affiliate-tracking.test.cjs`.
- Rebuild répété : les 54 articles, le CSS minifié et la page de confidentialité restent identiques d’une génération à l’autre.
- Contrôle des 54 articles : JSON-LD lisible, liens et ancres internes valides, images présentes, sitemap XML valide, titres et images inchangés.
- Page d’accueil identique octet pour octet à sa version initiale.
- Navigateur local : guides matériel, rempotage, vacances et compostage à 390 px ; tableau matériel et vacances sur ordinateur ; simulateur avec légumes et vent fort, puis fleurs sur balcon abrité.
- Les liens sélectionnés ont été contrôlés via leur redirection, sans achat : voir `affiliate-link-check-20261005.json`. Une redirection valide ne garantit ni le stock, ni une variante, ni la qualité d’un produit.

## Références vérifiées

- [Algoflash : terreau de semis, bouturage et repiquage](https://www.algoflash.fr/nos-produits/terreaux/plantes-d-interieur/terreau-semis-bouturage-et-repiquage-algoflash).
- [Elho : gamme Vibia Campana Allin1](https://www.elho.com/fr/des-produits/vibia-campana-balconniere-allin1/vibia-campana-balconniere-allin1-70cm-moss-green/) ; ne pas extrapoler les dimensions d’une variante à toutes les offres Amazon.
- [ADEME : composter en appartement](https://agirpourlatransition.ademe.fr/particuliers/reduire-dechets/composter-pailler/composter-dechets-appartement).
- [RHS : préparer le jardin pendant les vacances](https://www.rhs.org.uk/garden-inspiration/get-gardening/how-to-look-after-your-garden-on-holiday).
- [Google : collecte des événements GA4](https://developers.google.com/analytics/devguides/collection/ga4/events).
