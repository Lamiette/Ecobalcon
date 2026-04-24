$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot

function Read-Utf8([string]$path) {
  return Get-Content -Raw -Encoding UTF8 $path
}

function Write-Utf8([string]$path, [string]$content) {
  Set-Content -Path $path -Value $content -Encoding UTF8
}

function Update-ArticleMeta {
  param(
    [string]$slug,
    [string]$title,
    [string]$description
  )

  $path = Join-Path $root "articles\$slug\index.html"
  if (-not (Test-Path $path)) { return }
  $html = Read-Utf8 $path
  $safeTitle = [System.Security.SecurityElement]::Escape($title)
  $safeDescription = [System.Security.SecurityElement]::Escape($description)
  $html = [regex]::Replace($html, '<title>.*?</title>', "<title>$safeTitle | EcoBalcon</title>", 'Singleline')
  $html = [regex]::Replace($html, '<meta name="description" content=".*?">', "<meta name=`"description`" content=`"$safeDescription`">", 'Singleline')
  $html = [regex]::Replace($html, '<meta property="og:title" content=".*?">', "<meta property=`"og:title`" content=`"$safeTitle | EcoBalcon`">", 'Singleline')
  $html = [regex]::Replace($html, '<meta property="og:description" content=".*?">', "<meta property=`"og:description`" content=`"$safeDescription`">", 'Singleline')
  $html = [regex]::Replace($html, '<meta name="twitter:title" content=".*?">', "<meta name=`"twitter:title`" content=`"$safeTitle | EcoBalcon`">", 'Singleline')
  $html = [regex]::Replace($html, '<meta name="twitter:description" content=".*?">', "<meta name=`"twitter:description`" content=`"$safeDescription`">", 'Singleline')
  Write-Utf8 $path $html
}

function Insert-AfterArticleOpen {
  param(
    [string]$slug,
    [string]$marker,
    [string]$block
  )

  $path = Join-Path $root "articles\$slug\index.html"
  if (-not (Test-Path $path)) { return }
  $html = Read-Utf8 $path
  if ($html.Contains($marker)) { return }
  $needle = '          <article class="article-prose">'
  $html = $html.Replace($needle, "$needle`r`n$block")
  Write-Utf8 $path $html
}

function Insert-BeforeRelated {
  param(
    [string]$slug,
    [string]$marker,
    [string]$block
  )

  $path = Join-Path $root "articles\$slug\index.html"
  if (-not (Test-Path $path)) { return }
  $html = Read-Utf8 $path
  if ($html.Contains($marker)) { return }
  $needle = '        <section class="related-section"'
  $html = $html.Replace($needle, "$block`r`n$needle")
  Write-Utf8 $path $html
}

function Ensure-AffiliateRel {
  $paths = Get-ChildItem (Join-Path $root "articles") -Directory | ForEach-Object { Join-Path $_.FullName "index.html" } | Where-Object { Test-Path $_ }
  foreach ($path in $paths) {
    $html = Read-Utf8 $path
    $updated = [regex]::Replace($html, '<a href="(https?://(?:www\.)?(?:amzn\.to|amazon\.)[^"]+)"(?![^>]*\brel=)([^>]*)>', '<a href="$1"$2 target="_blank" rel="nofollow sponsored noopener noreferrer">')
    $updated = [regex]::Replace($updated, '<a href="(https?://(?:www\.)?(?:amzn\.to|amazon\.)[^"]+)"([^>]*)\brel="([^"]*)"', {
      param($m)
      $url = $m.Groups[1].Value
      $attrs = $m.Groups[2].Value
      $rel = $m.Groups[3].Value
      $parts = @($rel -split '\s+' | Where-Object { $_ })
      foreach ($needed in @("nofollow", "sponsored", "noopener", "noreferrer")) {
        if ($parts -notcontains $needed) { $parts += $needed }
      }
      "<a href=`"$url`"$attrs rel=`"$($parts -join ' ')`""
    })
    if ($updated -ne $html) { Write-Utf8 $path $updated }
  }
}

$takeaways = @{
  "balcon-a-lombre-plantes-et-culture" = @("Visez laitues, épinards, menthe, persil, bégonias et fougères plutôt que tomates ou poivrons.", "Le vrai risque de l'ombre n'est pas seulement le manque de soleil : c'est aussi l'humidité qui stagne.", "Un balcon lumineux sans soleil direct peut rester productif avec des cultures de feuilles et des aromatiques fraîches.")
  "legumes-faciles-a-cultiver" = @("Les radis, laitues, épinards, tomates cerises et herbes aromatiques sont les meilleurs premiers essais.", "La profondeur du pot compte plus que le nombre de plantes installées.", "Un balcon productif commence par 3 ou 4 cultures bien choisies, pas par une collection trop dense.")
  "utilisation-compost-sur-balcon" = @("En pot, le compost se dose légèrement : trop d'apport déséquilibre vite le substrat.", "Les cultures gourmandes comme tomates, poivrons et fraisiers en profitent plus que les radis ou jeunes salades.", "Le compost doit être mûr, stable et utilisé en petites couches ou en mélange.")
  "plantes-aromatiques-sur-balcon" = @("Associez aromatiques méditerranéennes au soleil et aromatiques fraîches a la mi-ombre.", "La menthe se garde seule en pot pour éviter qu'elle prenne toute la place.", "La récolte régulière vaut souvent mieux qu'une grosse taille tardive.")
  "le-materiel-essentiel-pour-commencer" = @("Commencez par de bons pots, un terreau adapté et un arrosoir précis avant les accessoires.", "Le meilleur achat est celui qui règle un vrai problème de balcon : poids, drainage, arrosage ou vent.", "Mieux vaut peu de matériel robuste que beaucoup de gadgets difficiles a ranger.")
  "insectes-utiles-sur-un-balcon" = @("Les auxiliaires viennent plus facilement si le balcon offre fleurs, abris légers et absence de traitements agressifs.", "Coccinelles, syrphes et chrysopes aident surtout quand les attaques sont repérées tôt.", "Un balcon trop propre et trop traité devient moins résilient.")
  "guide-epinards-sur-son-balcon" = @("Les épinards aiment les périodes fraîches, la lumière douce et un terreau qui ne se dessèche pas.", "Le semis échelonné évite de tout récolter ou de tout perdre en même temps.", "La montée en graines indique souvent chaleur, stress hydrique ou semis trop tardif.")
  "guide-radis-sur-son-balcon" = @("Les radis ont besoin d'un terreau frais et régulier, pas d'un grand pot.", "Semez peu mais souvent pour éviter les récoltes dures, creuses ou trop piquantes.", "Un manque d'eau donne vite des radis fibreux.")
  "recuperer-eau-de-pluie-balcon" = @("Sans gouttière, visez une petite réserve simple et stable plutôt qu'un gros système.", "Le poids, l'écoulement vers les voisins et l'eau stagnante sont les trois points de vigilance.", "L'eau récupérée devient plus utile si elle est combinée au paillage.")
  "calendrier-du-jardin-de-balcon" = @("Le calendrier sert a rythmer les gestes, pas a forcer toutes les plantations.", "Sur balcon, l'exposition et le vent décalant parfois les dates, observez toujours le lieu réel.", "Les rappels mensuels doivent renvoyer vers les fiches plantes et les gestes d'entretien.")
}

foreach ($entry in $takeaways.GetEnumerator()) {
  $items = ($entry.Value | ForEach-Object { "                <li>$_</li>" }) -join "`r`n"
  $block = @"
            <div class="article-key-facts" role="list" data-enhancement="takeaways">
              <div class="article-key-facts-item article-key-facts-item-full" role="listitem"><span><strong>À retenir :</strong></span></div>
              <div class="article-key-facts-item article-key-facts-item-full" role="listitem"><div><ul class="article-list">
$items
              </ul></div></div>
            </div>
"@
  Insert-AfterArticleOpen -slug $entry.Key -marker 'data-enhancement="takeaways"' -block $block
}

$tables = @{
  "le-materiel-essentiel-pour-commencer" = @"
            <h2 data-enhancement="choice-table">Quel matériel acheter en premier ?</h2>
            <div class="comparison-table-wrap">
              <table class="comparison-table">
                <thead><tr><th>Besoin</th><th>Choix malin</th><th>A éviter</th><th>Pourquoi</th></tr></thead>
                <tbody>
                  <tr><td>Commencer petit</td><td>2 grands pots perces + 1 jardinière</td><td>10 petits pots décoratifs</td><td>Les grands volumes pardonnent mieux les oublis d'eau.</td></tr>
                  <tr><td>Arroser mieux</td><td>Arrosoir fin, oyas ou goutte-à-goutte simple</td><td>Gadget non testé avant vacances</td><td>La régularité compte plus que la complexité.</td></tr>
                  <tr><td>Tenir au vent</td><td>Pots lourds, attaches, tuteurs sobres</td><td>Bacs légers en hauteur</td><td>La stabilité protège plantes et balcon.</td></tr>
                </tbody>
              </table>
            </div>
"@
  "utilisation-compost-sur-balcon" = @"
            <h2 data-enhancement="choice-table">Dosage simple du compost en pot</h2>
            <div class="comparison-table-wrap">
              <table class="comparison-table">
                <thead><tr><th>Culture</th><th>Apport prudent</th><th>Fréquence</th><th>Signal d'excès</th></tr></thead>
                <tbody>
                  <tr><td>Tomates, poivrons</td><td>1 à 2 poignées dans un grand pot</td><td>Début de saison puis léger rappel</td><td>Feuillage très vert, peu de fleurs</td></tr>
                  <tr><td>Fraises</td><td>Fine couche en surface</td><td>Printemps</td><td>Terreau lourd, humidité persistante</td></tr>
                  <tr><td>Radis, laitues</td><td>Très peu ou terreau déjà enrichi</td><td>Avant semis seulement</td><td>Plants mous ou croissance déséquilibree</td></tr>
                </tbody>
              </table>
            </div>
"@
  "reduction-consommation-eau-balcon" = @"
            <h2 data-enhancement="choice-table">Quelle solution d'arrosage choisir ?</h2>
            <div class="comparison-table-wrap">
              <table class="comparison-table">
                <thead><tr><th>Situation</th><th>Solution propre</th><th>Budget</th><th>Pourquoi</th></tr></thead>
                <tbody>
                  <tr><td>Quelques pots</td><td>Paillage + arrosoir précis</td><td>Faible</td><td>Simple, fiable et sans installation.</td></tr>
                  <tr><td>Absence courte</td><td>Oyas ou mèches testées avant départ</td><td>Moyen</td><td>Diffuse l'eau progressivement.</td></tr>
                  <tr><td>Balcon très chaud</td><td>Goutte-à-goutte ou réserve d'eau</td><td>Moyen à élevé</td><td>Limite les stress hydriques répétés.</td></tr>
                </tbody>
              </table>
            </div>
"@
  "rempoter-plantes-balcon" = @"
            <h2 data-enhancement="choice-table">Quel pot choisir au rempotage ?</h2>
            <div class="comparison-table-wrap">
              <table class="comparison-table">
                <thead><tr><th>Plante</th><th>Volume utile</th><th>Point clé</th><th>Erreur à éviter</th></tr></thead>
                <tbody>
                  <tr><td>Aromatiques</td><td>3 à 8 L</td><td>Drainage net</td><td>Pot caché non percé</td></tr>
                  <tr><td>Tomates</td><td>25 à 40 L</td><td>Stabilité + tuteur</td><td>Pot trop petit qui sèche chaque jour</td></tr>
                  <tr><td>Fraises</td><td>3 à 5 L par plant</td><td>Surface fraîche</td><td>Enterrer le cœur du plant</td></tr>
                </tbody>
              </table>
            </div>
"@
}

foreach ($entry in $tables.GetEnumerator()) {
  Insert-BeforeRelated -slug $entry.Key -marker 'data-enhancement="choice-table"' -block $entry.Value
}

$shortArticleBlocks = @{
  "balcon-a-lombre-plantes-et-culture" = @"
            <h2 data-enhancement="short-refit">Choisir selon le niveau d'ombre</h2>
            <div class="comparison-table-wrap">
              <table class="comparison-table">
                <thead><tr><th>Situation</th><th>Plantes à tester</th><th>Plantes à éviter</th><th>Geste clé</th></tr></thead>
                <tbody>
                  <tr><td>Lumière douce</td><td>Laitues, épinards, persil, fraisiers</td><td>Poivrons</td><td>Garder un terreau frais mais drainé</td></tr>
                  <tr><td>Ombre claire</td><td>Menthe, ciboulette, bégonias, impatiens</td><td>Tomates</td><td>Espacer les pots pour éviter l'humidité</td></tr>
                  <tr><td>Ombre dense</td><td>Feuillages décoratifs, aromatiques tolérantes</td><td>Légumes-fruits</td><td>Visez le vert et la fraîcheur, pas le rendement</td></tr>
                </tbody>
              </table>
            </div>
"@
  "legumes-faciles-a-cultiver" = @"
            <h2 data-enhancement="short-refit">Légumes faciles : le bon pot tout de suite</h2>
            <div class="comparison-table-wrap">
              <table class="comparison-table">
                <thead><tr><th>Légume</th><th>Profondeur utile</th><th>Exposition</th><th>Pourquoi commencer par lui</th></tr></thead>
                <tbody>
                  <tr><td>Radis</td><td>10 à 15 cm</td><td>Soleil doux / mi-ombre</td><td>Rapide, peu coûteux, très lisible</td></tr>
                  <tr><td>Laitue à couper</td><td>15 à 20 cm</td><td>Mi-ombre</td><td>Récoltes progressives</td></tr>
                  <tr><td>Tomate cerise</td><td>30 cm et plus</td><td>Plein soleil</td><td>Productive et motivante</td></tr>
                </tbody>
              </table>
            </div>
"@
  "utilisation-compost-sur-balcon" = @"
            <h2 data-enhancement="short-refit">Reconnaître un bon ou mauvais apport</h2>
            <ul class="article-list">
              <li><strong>Bon signe :</strong> croissance régulière, terreau souple, arrosage qui pénètre bien.</li>
              <li><strong>Trop peu :</strong> feuilles pales, croissance lente sur cultures gourmandes, substrat fatigue.</li>
              <li><strong>Trop :</strong> terreau lourd, odeur, feuillage excessif ou plante molle après arrosage.</li>
            </ul>
"@
  "plantes-aromatiques-sur-balcon" = @"
            <h2 data-enhancement="short-refit">Aromatiques : soleil ou fraîcheur ?</h2>
            <div class="comparison-table-wrap">
              <table class="comparison-table">
                <thead><tr><th>Groupe</th><th>Exemples</th><th>Eau</th><th>Emplacement</th></tr></thead>
                <tbody>
                  <tr><td>Mediterraneennes</td><td>Thym, romarin, sauge, origan</td><td>Faible</td><td>Soleil, pot drainant</td></tr>
                  <tr><td>Fraîches</td><td>Menthe, persil, coriandre, ciboulette</td><td>Régulière</td><td>Mi-ombre, terreau frais</td></tr>
                  <tr><td>Sensibles</td><td>Basilic</td><td>Régulière</td><td>Soleil doux, abri du vent</td></tr>
                </tbody>
              </table>
            </div>
"@
  "le-materiel-essentiel-pour-commencer" = @"
            <h2 data-enhancement="short-refit">Kit minimal recommandé</h2>
            <ul class="article-list">
              <li><strong>Pour 30 euros environ :</strong> quelques pots perces, terreau correct, arrosoir fin, graines simples.</li>
              <li><strong>Pour gagner du temps :</strong> plants de basilic, fraisiers ou tomates cerises déjà formés.</li>
              <li><strong>À acheter plus tard :</strong> serré, système automatique et accessoires décoratifs non indispensables.</li>
            </ul>
"@
  "insectes-utiles-sur-un-balcon" = @"
            <h2 data-enhancement="short-refit">Identifier les alliés les plus utiles</h2>
            <div class="comparison-table-wrap">
              <table class="comparison-table">
                <thead><tr><th>Allié</th><th>Aide surtout contre</th><th>Comment l'attirer</th><th>Attention</th></tr></thead>
                <tbody>
                  <tr><td>Coccinelle</td><td>Pucerons</td><td>Fleurs simples, pas de traitement fort</td><td>Elle part si le balcon est stérile</td></tr>
                  <tr><td>Syrphe</td><td>Pucerons jeunes</td><td>Fleurs mellifères et floraisons étalées</td><td>L'adulte ressemble parfois a une petite guêpe</td></tr>
                  <tr><td>Chrysope</td><td>Pucerons, cochenilles légères</td><td>Coin abrité, diversité végétale</td><td>Éviter les pulvérisations inutiles</td></tr>
                </tbody>
              </table>
            </div>
"@
  "guide-epinards-sur-son-balcon" = @"
            <h2 data-enhancement="short-refit">Réussir les épinards en pot</h2>
            <ul class="article-list">
              <li><strong>Meilleur moment :</strong> printemps frais ou automne, avant les chaleurs fortes.</li>
              <li><strong>Pot :</strong> jardinière ou bac de 15 à 20 cm de profondeur, terreau frais.</li>
              <li><strong>Erreur classique :</strong> semer trop dense puis laisser monter en graines.</li>
            </ul>
"@
  "guide-radis-sur-son-balcon" = @"
            <h2 data-enhancement="short-refit">Diagnostic des radis ratés</h2>
            <div class="comparison-table-wrap">
              <table class="comparison-table">
                <thead><tr><th>Symptôme</th><th>Cause probable</th><th>Correction</th></tr></thead>
                <tbody>
                  <tr><td>Radis piquants</td><td>Manque d'eau ou chaleur</td><td>Arroser plus régulièrement</td></tr>
                  <tr><td>Radis filants</td><td>Manque de lumière ou semis serré</td><td>Éclaircir et placer plus clair</td></tr>
                  <tr><td>Beaucoup de feuilles</td><td>Trop d'azote</td><td>Terreau moins riche au prochain semis</td></tr>
                </tbody>
              </table>
            </div>
"@
  "recuperer-eau-de-pluie-balcon" = @"
            <h2 data-enhancement="short-refit">Systèmes réalistes sans gouttière</h2>
            <div class="comparison-table-wrap">
              <table class="comparison-table">
                <thead><tr><th>Système</th><th>Gain</th><th>Risque</th><th>Bon usage</th></tr></thead>
                <tbody>
                  <tr><td>Arrosoir exposé</td><td>Petit volume facile</td><td>Faible</td><td>À utiliser rapidement</td></tr>
                  <tr><td>Bac couvert</td><td>Réserve plus propre</td><td>Poids</td><td>Vérifier la charge</td></tr>
                  <tr><td>Toile inclinée</td><td>Collecte meilleure</td><td>Prise au vent</td><td>Montage léger et démontable</td></tr>
                </tbody>
              </table>
            </div>
"@
  "calendrier-du-jardin-de-balcon" = @"
            <h2 data-enhancement="short-refit">Rythme simple par saison</h2>
            <div class="comparison-table-wrap">
              <table class="comparison-table">
                <thead><tr><th>Saison</th><th>Priorité</th><th>Articles à relier</th></tr></thead>
                <tbody>
                  <tr><td>Printemps</td><td>Semer, rempoter, installer progressivement</td><td>Avril, mai, rempotage</td></tr>
                  <tr><td>Été</td><td>Arroser, pailler, protéger de la chaleur</td><td>Canicule, vacances, eau</td></tr>
                  <tr><td>Automne / hiver</td><td>Nettoyer, protéger, planifier</td><td>Compost, matériel, plantes durables</td></tr>
                </tbody>
              </table>
            </div>
"@
}

foreach ($entry in $shortArticleBlocks.GetEnumerator()) {
  Insert-BeforeRelated -slug $entry.Key -marker 'data-enhancement="short-refit"' -block $entry.Value
}

$affiliateComparator = @"
            <h2 data-enhancement="affiliate-comparator">Comparateur d'achats utiles</h2>
            <p class="affiliate-disclosure">Liens affili&eacute;s Amazon. En tant que Partenaire Amazon, je r&eacute;alise un b&eacute;n&eacute;fice sur les achats remplissant les conditions requises.</p>
            <div class="comparison-table-wrap">
              <table class="comparison-table">
                <thead><tr><th>Besoin réel</th><th>Option économique</th><th>Option confort</th><th>Quand acheter</th></tr></thead>
                <tbody>
                  <tr><td>Installer les cultures</td><td><a href="https://amzn.to/3YXjTvS" target="_blank" rel="nofollow sponsored noopener noreferrer">Pots de tailles variées</a></td><td><a href="https://amzn.to/4jAkY50" target="_blank" rel="nofollow sponsored noopener noreferrer">Jardinières basiques</a></td><td>Avant plantation, si les pots actuels sont trop petits.</td></tr>
                  <tr><td>Améliorer le substrat</td><td>Compost mûr en petite quantité</td><td><a href="https://amzn.to/42G8qDp" target="_blank" rel="nofollow sponsored noopener noreferrer">Terreau potager</a></td><td>Quand le terreau se tasse ou nourrit mal les plantes.</td></tr>
                  <tr><td>Absences fréquentes</td><td>Paillage + regroupement des pots</td><td><a href="https://amzn.to/3ShEqri" target="_blank" rel="nofollow sponsored noopener noreferrer">Kit goutte à goutte</a></td><td>Seulement après un test de 48 h sur le balcon.</td></tr>
                </tbody>
              </table>
            </div>
"@

Insert-BeforeRelated -slug "le-materiel-essentiel-pour-commencer" -marker 'data-enhancement="affiliate-comparator"' -block $affiliateComparator
Ensure-AffiliateRel

$exposureSlugs = @(
  "balcon-a-lombre-plantes-et-culture",
  "plantes-pour-un-balcon-plein-soleil",
  "plantes-qui-survivent-a-la-canicule",
  "balcon-venteux-plantes-protection-pots",
  "plantes-aromatiques-sur-balcon",
  "legumes-faciles-a-cultiver",
  "guide-tomates-sur-son-balcon",
  "tomates-cerises-balcon",
  "guide-poivrons-sur-son-balcon",
  "guide-basilic-sur-son-balcon"
)

foreach ($slug in $exposureSlugs) {
  $block = @"
        <section class="related-section tool-cta-section" data-enhancement="simulator-link" aria-labelledby="simulator-link-heading-$slug">
          <div class="section-heading section-heading-compact">
            <div>
              <h2 id="simulator-link-heading-$slug">Tester votre balcon</h2>
              <p>Le simulateur EcoBalcon transforme exposition, vent, place et objectif en sélection de plantes, volumes de pots et gestes prioritaires.</p>
            </div>
            <a class="button-secondary" href="../../simulateur/">Ouvrir le simulateur</a>
          </div>
        </section>
"@
  Insert-BeforeRelated -slug $slug -marker 'data-enhancement="simulator-link"' -block $block
}

Update-ArticleMeta -slug "plantes-qui-survivent-a-la-canicule" -title "12 plantes de balcon qui résistent à la canicule" -description "Plantes de balcon qui résistent à la canicule : sélection utile, besoins en eau, pots à choisir et gestes simples pour garder un balcon vivant en été."
Update-ArticleMeta -slug "balcon-durable-plantes" -title "Balcon durable : plantes résistantes et faciles à garder" -description "Balcon durable : quelles plantes choisir pour arroser moins, résister au soleil, limiter les achats inutiles et garder un jardin urbain plus autonome."
Update-ArticleMeta -slug "calendrier-lunaire-balcon" -title "Calendrier lunaire balcon : semer, planter et récolter" -description "Calendrier lunaire balcon : repères simples pour organiser semis, plantations, entretien et récoltes en pot sans perdre de vue les vrais besoins des plantes."
Update-ArticleMeta -slug "legumes-faciles-a-cultiver" -title "10 légumes faciles en pot : profondeur, exposition et récolte" -description "10 légumes faciles à cultiver en pot sur balcon : profondeur de pot, exposition, difficulté, rythme d'arrosage et choix fiables pour débuter."

$llmsPath = Join-Path $root "llms.txt"
$articleCount = (Get-ChildItem (Join-Path $root "articles") -Directory | Where-Object { Test-Path (Join-Path $_.FullName "index.html") }).Count
$llms = @"
# EcoBalcon

> Conseils pratiques pour jardiner sur balcon en milieu urbain, de façon écologique et accessible.

EcoBalcon est un site francophone dédié au jardinage urbain sur balcon et terrasse. Il propose des guides pratiques, un simulateur de plantes pour balcon et des ressources utiles pour cultiver légumes, aromatiques, petits fruits et fleurs dans de petits espaces.

Le site s'adresse aux jardiniers urbains débutants ou confirmés souhaitant créer un potager productif sur un espace restreint, en France ou dans tout pays francophone.

## Navigation principale

- [Accueil](https://ecobalcon.com/) : presentation du site et sélection editoriale
- [Tous les articles](https://ecobalcon.com/articles/) : index des $articleCount guides pratiques
- [Simulateur](https://ecobalcon.com/simulateur/) : diagnostic pour choisir des plantes selon l'exposition, le vent, la place et l'objectif
- [Galerie](https://ecobalcon.com/galerie/) : photos d'inspiration de balcons jardines
- [Contact](https://ecobalcon.com/contact/) : formulaire pour poser une question, suggérer un sujet ou signaler une correction

## Thématique principale

EcoBalcon couvre les cultures en pot, le choix des plantes selon exposition, l'arrosage sobre, le compostage en petit espace, le matériel utile, la biodiversité urbaine et les gestes saisonniers pour balcon.
"@
Write-Utf8 $llmsPath $llms

Write-Output "Strategic enhancements applied."


