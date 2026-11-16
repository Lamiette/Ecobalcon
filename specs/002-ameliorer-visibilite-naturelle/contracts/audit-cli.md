# Contrat CLI — Audit local en lecture seule

Statut : contrat à implémenter, aucun script créé par la planification.

## Interface

Depuis la racine :

```powershell
python scripts/seo_audit.py --root . --output-dir specs/002-ameliorer-visibilite-naturelle/diagnostic/initial
```

- `--root` : racine existante du site, résolution en chemin absolu avant lecture.
- `--output-dir` : répertoire de rapport explicite sous `specs/002-ameliorer-visibilite-naturelle/diagnostic/` de cette racine. Le répertoire doit être nouveau ou vide ; aucune écriture silencieuse sur un état initial existant.
- Aucun accès réseau, mode de correction ou option de publication. Aucune modification d’une source ou sortie du site. Les chemins résolus d’écriture doivent rester sous le répertoire de rapport autorisé, y compris en présence de liens de répertoire.
- Codes de sortie : `0` rapport complet produit, même avec anomalies SEO ; `1` erreur d’exécution ou rapport incomplet ; `2` arguments invalides. La présence d’anomalies relève du rapport, pas d’une fausse erreur d’exécution.

## Entrées

Lire les fichiers HTML du site, `robots.txt`, `sitemap.xml` et métadonnées de fichiers nécessaires aux contrôles de ressources. Parcourir sans suivre de liens de répertoire hors racine.

Exclure `.git`, `.agents`, `.specify`, `.claude`, `.venv-spec-kit`, `node_modules`, `__pycache__`, `backups`, `raw-singlefile`, `specs`, `scripts`, profils `.edge-profile*` et fichiers de travail non destinés au site. Expliciter ces exclusions dans le rapport ; ne pas en déduire leur exclusion dans Google.

Résoudre liens, images et canonicals à partir de l’URL publique de la page : `/` pour l’accueil, `/dossier/` pour `dossier/index.html`, chemin conservé pour les fichiers HTML legacy. Une cible dossier se résout localement vers `index.html`. Décoder les chemins URL et séparer paramètres/fragments avant la recherche de fichier. Les liens externes et schémas non HTTP sont distingués ; les fragments seuls ne sont pas des fichiers manquants. Une ressource hors racine est signalée sans lecture hors site.

## Sorties

Dans le répertoire désigné seulement :

- `inventory.json` : `schema_version=1`, racine, date, exclusions, décompte/partition des pages, empreintes des fichiers du site utiles à la comparaison, pages, contrôles sitemap/robots, constats et limites selon [data-model.md](../data-model.md).
- `local.md` : résumé lisible, couverture, anomalies avec chemins/URLs/preuves, contrôles non réalisés et limites.

Chaque page a exactement une classe de découvrabilité, éventuellement `a_examiner`, et un état Google initial `inconnu`. Les contrôles automatisés portent sur les déclarations locales : title/description/H1, canonicals/hreflang/OG/Twitter, JSON-LD syntaxique et cohérence des URLs, liens/images internes, destinations legacy, présence sitemap et dates. Le rapport expose les valeurs pour la relecture, sans note globale ni application de seuil arbitraire de longueur.

Les empreintes couvrent tous les HTML inventoriés et les fichiers partagés pouvant affecter les pages : CSS, JS, images référencées, sitemap, robots, manifest et état du sitemap. Une couverture inconnue est indiquée. Elles servent à comparer l’état courant, y compris les modifications préexistantes non commitées, sans utiliser HEAD comme unique référence.

## Limites explicites

L’outil ne certifie ni validité horticole, ni rendu visuel, ni rich result, ni HTTP de production, ni indexation réelle. Il n’exécute pas les scripts de redirection ou de navigation. Tout contrôle de déclaration locale reste distinct du contrôle navigateur/public.

## Validation ciblée prévue

Utiliser des fixtures temporaires pour vérifier :

1. Résolution d’une page canonique avec slash final, d’un dossier et de deux variantes legacy vers la même destination ; aucune déclaration d’indexation inventée.
2. Conservation de `noindex`, rapport d’un lien/image absent et de JSON-LD invalide sans correction de fichier ; classification complète de l’inventaire.
3. Exclusion de sauvegardes/profils/rapports et refus d’une sortie hors périmètre ou déjà remplie ; preuve que les octets des fichiers d’entrée ne changent pas.

Ces contrôles vérifient le comportement utile de l’auditeur ; aucune suite générale du site n’est ajoutée.
