# Spec Kit dans EcoBalcon

Spec Kit prépare les évolutions importantes avec une spécification, un plan,
des tâches et une vérification. Les petites corrections gardent le workflow habituel.

## Installation retenue

- Version : **1.2.5**, depuis le tag officiel `github/spec-kit`.
- Agent : **Codex**, avec dix skills dans `.agents/skills/`.
- Scripts : **PowerShell**, sous `.specify/scripts/powershell/`.
- Principes EcoBalcon : [.specify/memory/constitution.md](.specify/memory/constitution.md).
- CLI isolée dans `.venv-spec-kit/`, ignorée par Git. Le site reste statique.
- Événements automatiques désactivés (`--events false`) ; aucune extension optionnelle.

Depuis la racine, cette commande lance la CLI locale sans activer l'environnement :

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\specify.ps1 version
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\specify.ps1 integration status
```

Les commandes `specify` de la documentation officielle peuvent être lancées avec
ce même préfixe. Exemple : remplacer `specify extension list` par
`powershell -NoProfile -ExecutionPolicy Bypass -File scripts\specify.ps1 extension list`.

## Utiliser les skills dans Codex

Ouvrir une nouvelle conversation Codex dans ce projet pour charger les nouveaux
skills. Taper `$speckit-` pour rechercher les commandes disponibles. Leur syntaxe
est celle de skills dans le chat ; ces commandes ne vont pas dans PowerShell.

La constitution est déjà renseignée : il est inutile de la recréer pour chaque tâche.
Utiliser `$speckit-constitution` seulement pour faire évoluer les principes du projet.

Pour une fonctionnalité, envoyer les commandes suivantes une à une et lire chaque
résultat avant de passer à la suivante :

1. `$speckit-specify <résultat attendu pour le visiteur et limites du changement>`
2. `$speckit-clarify` si des comportements restent ambigus.
3. `$speckit-plan` pour préparer une solution fondée sur les fichiers existants.
4. `$speckit-tasks` pour découper le travail.
5. `$speckit-analyze` pour contrôler la cohérence avant de coder.
6. `$speckit-implement` pour réaliser les tâches.
7. `$speckit-converge` pour vérifier le résultat ; s'il reste des tâches, reprendre
   l'implémentation puis cette vérification.

Les documents sont rédigés en français dans `specs/NNN-nom/`. Le pointeur local
`.specify/feature.json` est ignoré par Git ; il indique la fonctionnalité active.
Sans l'extension Git, Spec Kit ne crée pas automatiquement les branches.
Les branches peuvent être créées avec Git selon les besoins.

## Premier essai conseillé

Commencer par une seule amélioration du simulateur. Par exemple, si cette évolution
est souhaitée, utiliser ce brief :

```text
$speckit-specify Améliorer la compréhension des résultats du simulateur EcoBalcon
pour une personne qui débute sur un balcon. Examiner les résultats actuels et
proposer une amélioration ciblée des explications. Préserver les critères de
sélection, les données des plantes, les filtres et la sauvegarde locale existants.
Définir des critères d'acceptation sur ordinateur, mobile et navigation au clavier.
Rester dans l'architecture HTML, CSS et JavaScript actuelle. Rédiger en français.
```

Ce brief est un exemple à adapter. Aucune fonctionnalité n'a été créée lors de
l'installation. Les spécifications servent au changement choisi ; il n'est pas
nécessaire de documenter tout le site avant de commencer.

## Règles et vérifications

Lire `AGENTS.md` et la constitution avant de planifier. Le plan précise les sources
à modifier, les sorties générées attendues et les contrôles adaptés. Les sources
éditoriales et le générateur restent prioritaires pour les changements d'articles.
Les règles spécialisées de `prompt codex.txt` s'appliquent aux travaux éditoriaux.

Pour une simple installation, les contrôles CLI et le diff suffisent. Pour une
évolution du site, effectuer les vérifications pertinentes : fonctionnement,
liens, SEO, données structurées et rendu ordinateur/mobile selon les fichiers touchés.
Ne pas lancer un rebuild uniquement pour vérifier Spec Kit.

Conserver les documents d'une fonctionnalité terminée comme trace du travail.
Pour une nouvelle évolution, créer une nouvelle spécification et citer les documents
antérieurs utiles. Ne pas modifier rétroactivement leurs critères pour masquer un écart.

## Recréer l'environnement local

Prérequis : Windows, Python 3.11 ou plus récent avec pip, Git pour le dépôt et Codex.
La configuration actuelle a été vérifiée avec Python 3.14.6.
Les téléchargements nécessitent un accès à GitHub et à l'index de paquets Python.

```powershell
python -m venv .venv-spec-kit
.\.venv-spec-kit\Scripts\python.exe -m pip install -r scripts\spec-kit-requirements.txt
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\specify.ps1 version
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\specify.ps1 integration status
```

Après un clone contenant `.specify/` et `.agents/skills/`, ces commandes suffisent.
Il n'est pas nécessaire de relancer l'initialisation.

Commande utilisée pour l'initialisation de ce dépôt, à titre de référence :

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\specify.ps1 init --here --force --non-interactive --integration codex --script ps '--integration-options=--events false'
```

`--force` autorise la fusion dans un dossier existant et peut remplacer des fichiers
gérés en conflit. Avant toute réinitialisation ou mise à niveau, partir d'un état
Git propre et relire les différences. Conserver la constitution EcoBalcon et vérifier
que les événements restent désactivés. Ne pas modifier à la main les skills ou
templates officiels : les adaptations éventuelles passent par les overrides.

## Références officielles

- [Version v1.2.5](https://github.com/github/spec-kit/releases/tag/v1.2.5)
- [Installation](https://github.github.io/spec-kit/installation.html)
- [Adoption dans un projet existant](https://github.github.io/spec-kit/guides/existing-projects.html)
- [Intégration Codex](https://github.github.io/spec-kit/integrations/codex.html)
