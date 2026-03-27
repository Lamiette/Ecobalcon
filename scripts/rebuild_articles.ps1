$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$rawDir = Join-Path $root "raw-singlefile"
$articlesDir = Join-Path $root "articles"
$imagesDir = Join-Path $root "images\articles"
$siteUrl = "https://ecobalcon.com"

function HtmlEscape {
  param([string]$text)

  if ($null -eq $text) { return "" }
  return [System.Security.SecurityElement]::Escape([string]$text)
}

function Escape-Xml {
  param([string]$text)

  if ($null -eq $text) { return "" }
  return [System.Security.SecurityElement]::Escape([string]$text)
}

function Convert-IsoDateToFrench {
  param([string]$iso)

  if ([string]::IsNullOrWhiteSpace($iso)) { return "" }

  $months = @(
    "", "janvier", "fevrier", "mars", "avril", "mai", "juin",
    "juillet", "aout", "septembre", "octobre", "novembre", "decembre"
  )

  $dt = [DateTime]::Parse($iso).ToLocalTime()
  return "{0} {1} {2}" -f $dt.Day, $months[$dt.Month], $dt.Year
}

function Convert-TimeRequired {
  param([string]$value)

  if ($value -match '^PT(?:(\d+)H)?(?:(\d+)M)?$') {
    $hours = if ($matches[1]) { [int]$matches[1] } else { 0 }
    $minutes = if ($matches[2]) { [int]$matches[2] } else { 0 }
    if ($hours -gt 0 -and $minutes -gt 0) { return "$hours h $minutes" }
    if ($hours -gt 0) { return "$hours h" }
    if ($minutes -gt 0) { return "$minutes min" }
  }

  return ""
}

function Get-ImageFileName {
  param(
    [string]$url,
    [string]$slug
  )

  if ([string]::IsNullOrWhiteSpace($url)) {
    return "$slug.webp"
  }

  $decodedUrl = [System.Net.WebUtility]::HtmlDecode($url)

  try {
    $uri = [System.Uri]$decodedUrl
    $fileName = [System.IO.Path]::GetFileName($uri.AbsolutePath)
  } catch {
    $fileName = [System.IO.Path]::GetFileName(($decodedUrl -split '\?')[0])
  }

  if ([string]::IsNullOrWhiteSpace($fileName)) {
    $fileName = "$slug.webp"
  }

  return [regex]::Replace($fileName, '[^A-Za-z0-9._-]', '-')
}

function Get-ImageCanonicalUrl {
  param([string]$fileName)

  if ([string]::IsNullOrWhiteSpace($fileName)) { return "" }
  return "$siteUrl/images/articles/$fileName"
}

function Get-ImagePagePath {
  param(
    [string]$fileName,
    [string]$pagePrefix
  )

  if ([string]::IsNullOrWhiteSpace($fileName)) { return "" }
  return "$pagePrefix$fileName"
}

try {
  Add-Type -AssemblyName System.Drawing | Out-Null
} catch {
}

$imageDimensionCache = @{}

function Get-ImageDimensions {
  param([string]$path)

  if ([string]::IsNullOrWhiteSpace($path)) { return $null }

  $fullPath = [System.IO.Path]::GetFullPath($path)
  if ($imageDimensionCache.ContainsKey($fullPath)) {
    return $imageDimensionCache[$fullPath]
  }

  if (-not (Test-Path $fullPath)) {
    return $null
  }

  $image = [System.Drawing.Image]::FromFile($fullPath)
  try {
    $dimensions = [PSCustomObject]@{
      Width = $image.Width
      Height = $image.Height
    }
  } finally {
    $image.Dispose()
  }

  $imageDimensionCache[$fullPath] = $dimensions
  return $dimensions
}

function Get-ImageDimensionAttributes {
  param([string]$path)

  $dimensions = Get-ImageDimensions $path
  if ($null -eq $dimensions) { return "" }
  return " width=`"$($dimensions.Width)`" height=`"$($dimensions.Height)`""
}

function Get-ArticleImageDimensionAttributes {
  param([string]$fileName)

  if ([string]::IsNullOrWhiteSpace($fileName)) { return "" }
  return Get-ImageDimensionAttributes (Join-Path $imagesDir $fileName)
}

function Get-RootImageDimensionAttributes {
  param([string]$relativePath)

  if ([string]::IsNullOrWhiteSpace($relativePath)) { return "" }
  return Get-ImageDimensionAttributes (Join-Path $root $relativePath)
}

$faqSchemaMap = @{
  "guide-tomates-sur-son-balcon" = @(
    [ordered]@{
      Question = "Quelle exposition faut-il pour cultiver des tomates sur un balcon ?"
      Answer = "Les tomates ont besoin de plein soleil, au moins 6 heures par jour. Une exposition sud convient bien, avec une protection contre le vent et un peu d'ombre aux heures les plus chaudes."
    },
    [ordered]@{
      Question = "Quel contenant choisir pour des tomates en pot ?"
      Answer = "Prevois un pot d'au moins 30 cm de profondeur et de largeur, assez stable, avec un bon drainage et une couche de billes d'argile ou de graviers au fond."
    },
    [ordered]@{
      Question = "Comment limiter les problemes courants sur les tomates ?"
      Answer = "Arrose regulierement sans mouiller le feuillage, paille le pot, installe un tuteur des la plantation et surveille rapidement les signes de carence, de necrose apicale, de pucerons ou de mildiou."
    }
  )
  "jardinage-en-lasagnes-sur-balcon" = @(
    [ordered]@{
      Question = "Qu'est-ce que le jardinage en lasagnes sur balcon ?"
      Answer = "C'est une methode qui consiste a superposer des matieres brunes et vertes dans un bac pour creer un substrat riche, vivant et fertile, adapte aux petits espaces urbains."
    },
    [ordered]@{
      Question = "Quelles matieres faut-il utiliser pour une lasagne de balcon ?"
      Answer = "Il faut un contenant profond avec drainage, puis du carton humidifie, des matieres brunes comme les feuilles mortes ou la paille, des matieres vertes comme les epluchures ou le marc de cafe, et une couche finale de compost ou de terreau mur."
    },
    [ordered]@{
      Question = "Quand installer une lasagne sur son balcon ?"
      Answer = "Le printemps permet de planter rapidement, tandis que l'automne est ideal pour laisser la lasagne murir pendant l'hiver. C'est aussi possible en ete ou en hiver avec un suivi d'arrosage adapte."
    }
  )
  "jardin-sur-balcon-astuces" = @(
    [ordered]@{
      Question = "Quelles plantes choisir pour debuter un jardin sur balcon ?"
      Answer = "Le choix depend d'abord de l'exposition. Au soleil, privilegie les plantes mediterraneennes, tomates, aromatiques et fraisiers ; a l'ombre, les menthes, fougeres ou begonias sont plus adaptes."
    },
    [ordered]@{
      Question = "Comment bien gerer l'arrosage sur un balcon ?"
      Answer = "Arrose de preference le matin ou en fin de journee, surveille le dessechement rapide des pots en ete et utilise si besoin un goutte-a-goutte, des oyas ou des bouteilles retournees pour gagner en regularite."
    },
    [ordered]@{
      Question = "Comment gagner de la place sur un petit balcon ?"
      Answer = "Exploite la verticalite avec etageres, treillis, jardinières suspendues et cultures sur plusieurs niveaux. Pense aussi a organiser les plantes selon leur hauteur pour faciliter la circulation et la lumiere."
    }
  )
  "erreurs-jardiner-sur-un-balcon" = @(
    [ordered]@{
      Question = "Quelle est l'erreur la plus frequente quand on jardine sur un balcon ?"
      Answer = "L'une des erreurs les plus courantes est de ne pas tenir compte de l'exposition au soleil. Le choix des plantes doit toujours partir du niveau d'ensoleillement reel du balcon."
    },
    [ordered]@{
      Question = "Comment eviter les erreurs d'arrosage sur un balcon ?"
      Answer = "Il faut adapter l'arrosage a chaque plante, verifier l'humidite du terreau sur quelques centimetres avant d'arroser et intervenir plutot le matin ou le soir pour limiter l'evaporation."
    },
    [ordered]@{
      Question = "Pourquoi ne faut-il pas surcharger un balcon de pots ?"
      Answer = "Un balcon trop charge freine la circulation de l'air, augmente l'humidite stagnante, limite la lumiere et complique l'entretien. Une selection mieux espacee est plus saine et plus facile a gerer."
    }
  )
  "legumes-faciles-a-cultiver" = @(
    [ordered]@{
      Question = "Quels legumes sont les plus faciles a cultiver en pot sur un balcon ?"
      Answer = "Les laitues, radis, epinards, tomates cerises ou tomates cocktail font partie des cultures les plus accessibles pour debuter un potager de balcon productif."
    },
    [ordered]@{
      Question = "Quelle profondeur de pot faut-il prevoir pour un potager en conteneur ?"
      Answer = "Cela depend des cultures : environ 10 a 15 cm suffisent pour les radis, 15 a 20 cm pour les laitues et 30 cm ou plus pour les tomates afin d'offrir assez d'espace aux racines."
    },
    [ordered]@{
      Question = "Comment maximiser les recoltes sur un balcon ?"
      Answer = "Choisis un substrat adapte, respecte l'exposition de chaque legume, arrose regulierement, fertilise en saison et privilegie des semis echelonnes pour prolonger les recoltes."
    }
  )
  "guide-poivrons-sur-son-balcon" = @(
    [ordered]@{
      Question = "Quelle exposition faut-il pour cultiver des poivrons sur un balcon ?"
      Answer = "Les poivrons ont besoin d'un emplacement chaud, lumineux et abrite, avec idealement 6 a 8 heures de soleil par jour. Une chaleur stable leur reussit mieux qu'un balcon vente ou trop ombrage."
    },
    [ordered]@{
      Question = "Quel pot choisir pour des poivrons en conteneur ?"
      Answer = "Prevois un pot profond et stable de 15 a 25 litres minimum, avec un tres bon drainage. Un contenant trop petit accentue les coups de chaud, freine la croissance et complique l'arrosage."
    },
    [ordered]@{
      Question = "Pourquoi les fleurs de poivron tombent-elles avant de faire des fruits ?"
      Answer = "La chute des fleurs vient souvent d'un stress combine : froid nocturne, chaleur excessive, manque d'eau ou arrosages irreguliers. Une exposition ensoleillee mais geree, plus un arrosage regulier, limitent ce probleme."
    }
  )
}

$howToSchemaMap = @{
  "guide-tomates-sur-son-balcon" = [ordered]@{
    Name = "Comment cultiver des tomates sur son balcon"
    Description = "Les etapes essentielles pour installer, arroser, entretenir et recolter des tomates en pot sur un balcon."
    Steps = @(
      [ordered]@{
        Name = "Choisir un pot stable et drainant"
        Text = "Selectionne un contenant d'au moins 30 cm de profondeur et de largeur, avec un bon drainage et une couche de billes d'argile ou de graviers au fond."
      },
      [ordered]@{
        Name = "Installer le plant au soleil"
        Text = "Place les tomates dans une zone tres ensoleillee, idealement exposee plein sud, tout en les protegant du vent et des heures les plus brulantes."
      },
      [ordered]@{
        Name = "Planter profondement et tuteurer"
        Text = "Plante apres les gelees en enterrant une partie de la tige jusqu'aux premieres feuilles, ajoute du compost et pose un tuteur solide des la plantation."
      },
      [ordered]@{
        Name = "Arroser regulierement et pailler"
        Text = "Arrose en profondeur plusieurs fois par semaine selon la chaleur, sans mouiller le feuillage, puis ajoute un paillage pour limiter l'evaporation."
      },
      [ordered]@{
        Name = "Entretenir la plante en cours de saison"
        Text = "Supprime les gourmands, apporte un engrais riche en potasse tous les 10 a 15 jours et griffe legerement la surface du terreau pour favoriser l'aeration."
      },
      [ordered]@{
        Name = "Recolter au bon moment"
        Text = "Cueille les tomates bien colorees, fermes et brillantes, puis surveille la fin de saison pour retirer les fleurs tardives et faire murir les derniers fruits."
      }
    )
  }
  "jardinage-en-lasagnes-sur-balcon" = [ordered]@{
    Name = "Comment creer une lasagne de culture sur un balcon"
    Description = "Une methode simple pour monter un bac fertile en superposant des matieres organiques sur un balcon."
    Steps = @(
      [ordered]@{
        Name = "Choisir un contenant profond"
        Text = "Prends un bac, une jardiniere ou un sac de culture d'au moins 40 cm de profondeur et verifie que le drainage est bien prevu."
      },
      [ordered]@{
        Name = "Poser la base drainante"
        Text = "Installe au fond une couche de billes d'argile ou de graviers, puis recouvre avec du carton humidifie."
      },
      [ordered]@{
        Name = "Alterner matieres brunes et vertes"
        Text = "Empile successivement des matieres brunes comme les feuilles mortes ou la paille et des matieres vertes comme les epluchures ou le marc de cafe."
      },
      [ordered]@{
        Name = "Terminer avec du compost mur"
        Text = "Ajoute une couche finale de 5 a 10 cm de compost ou de terreau bien mur pour accueillir les futures plantations."
      },
      [ordered]@{
        Name = "Humidifier l'ensemble"
        Text = "Arrose genereusement pour mouiller toutes les couches et amorcer la decomposition du melange."
      },
      [ordered]@{
        Name = "Planter et entretenir"
        Text = "Installe ensuite legumes, aromatiques ou fleurs adaptes au balcon, puis complete chaque annee avec de nouvelles matieres organiques."
      }
    )
  }
  "recuperer-eau-de-pluie-balcon" = [ordered]@{
    Name = "Comment recuperer l'eau de pluie sur un balcon sans gouttiere"
    Description = "Les etapes pour capter, stocker et reutiliser l'eau de pluie sur un balcon urbain."
    Steps = @(
      [ordered]@{
        Name = "Observer les zones de captation"
        Text = "Repere les surfaces exposees a la pluie comme la rambarde, une table, un pare-vue, une jardiniere ou un rebord."
      },
      [ordered]@{
        Name = "Choisir un systeme simple de collecte"
        Text = "Utilise une bache inclinee, un entonnoir suspendu, une surface de mobilier ou un pare-vue equipe d'une rigole pour canaliser l'eau."
      },
      [ordered]@{
        Name = "Diriger l'eau vers un recipient"
        Text = "Place un seau, un bidon ou une caisse plastique au point bas du systeme pour recueillir le ruissellement."
      },
      [ordered]@{
        Name = "Stocker l'eau proprement"
        Text = "Ferme ou couvre le contenant avec une moustiquaire ou une grille fine pour eviter moustiques, algues et salissures."
      },
      [ordered]@{
        Name = "Reutiliser l'eau pour le balcon"
        Text = "Utilise cette eau pour arroser, humidifier le compost ou preparer des purins, de preference avec un paillage pour limiter l'evaporation."
      }
    )
  }
  "diy-pots-pour-le-balcon" = [ordered]@{
    Name = "Comment fabriquer des pots de balcon avec des objets recycles"
    Description = "Une methode simple pour transformer des objets du quotidien en contenants pratiques pour les plantes."
    Steps = @(
      [ordered]@{
        Name = "Choisir un contenant sain a recycler"
        Text = "Selectionne une boite de conserve, une passoire, un seau, une brique alimentaire ou un autre objet propre, solide et adapte a un usage au jardin."
      },
      [ordered]@{
        Name = "Nettoyer et preparer le drainage"
        Text = "Lave le contenant, retire les residus et perce plusieurs trous au fond si necessaire pour evacuer l'eau."
      },
      [ordered]@{
        Name = "Ajouter une couche drainante"
        Text = "Dispose un peu de graviers ou de billes d'argile au fond pour limiter l'exces d'humidite autour des racines."
      },
      [ordered]@{
        Name = "Remplir de terreau et planter"
        Text = "Ajoute un terreau adapte a la plante choisie puis installe des aromatiques, des fleurs ou de petits legumes compatibles avec la taille du pot."
      },
      [ordered]@{
        Name = "Finaliser avec les bons controles"
        Text = "Verifie le poids, la resistance du materiau, l'absence de toxicite et, si tu veux, personnalise le contenant avec peinture, corde ou suspension."
      }
    )
  }
  "solutions-compostage-sur-balcon" = [ordered]@{
    Name = "Comment choisir une solution de compostage adaptee a un balcon"
    Description = "Les etapes pour mettre en place un compostage compact et propre sur un petit espace urbain."
    Steps = @(
      [ordered]@{
        Name = "Evaluer la place et les besoins"
        Text = "Observe la surface disponible sur le balcon et estime la quantite de dechets organiques que tu produis chaque semaine."
      },
      [ordered]@{
        Name = "Choisir le bon systeme"
        Text = "Selectionne un lombricomposteur, un bokashi, un composteur rotatif ou un mini composteur selon l'espace disponible et le niveau d'implication souhaite."
      },
      [ordered]@{
        Name = "Trier les dechets autorises"
        Text = "Ajoute les epluchures, marc de cafe, sachets de the sans plastique, feuilles mortes ou carton brun, et evite viandes, produits laitiers, huiles et excrements."
      },
      [ordered]@{
        Name = "Equilibrer les matieres"
        Text = "Alterner toujours les matieres vertes et les matieres brunes pour obtenir un compost plus aere, plus stable et sans odeur."
      },
      [ordered]@{
        Name = "Utiliser le compost au jardin"
        Text = "Recupere ensuite le compost ou le the de compost pour nourrir naturellement les plantes et le potager de balcon."
      }
    )
  }
  "guide-poivrons-sur-son-balcon" = [ordered]@{
    Name = "Comment cultiver des poivrons sur son balcon"
    Description = "Les etapes essentielles pour installer, nourrir et recolter des poivrons en pot sur un balcon ensoleille."
    Steps = @(
      [ordered]@{
        Name = "Choisir une variete compacte et un grand pot"
        Text = "Selectionne une variete adaptee a la culture en conteneur et installe-la dans un pot profond, stable et bien draine d'au moins 15 a 25 litres."
      },
      [ordered]@{
        Name = "Planter dans un substrat riche"
        Text = "Remplis le contenant avec un terreau potager souple et drainant, enrichi avec un peu de compost mur pour soutenir la croissance."
      },
      [ordered]@{
        Name = "Installer le plant au chaud"
        Text = "Place les poivrons en plein soleil, a l'abri du vent, puis plante seulement lorsque les nuits restent durablement au-dessus de 12 a 15 degres."
      },
      [ordered]@{
        Name = "Arroser regulierement et pailler"
        Text = "Maintiens le terreau legerement frais sans le detremper, puis ajoute un paillage pour stabiliser l'humidite dans le pot."
      },
      [ordered]@{
        Name = "Fertiliser a partir de la floraison"
        Text = "Quand les premieres fleurs apparaissent, apporte un engrais organique riche en potasse toutes les une a deux semaines et pose un tuteur si besoin."
      },
      [ordered]@{
        Name = "Recolter selon la couleur finale"
        Text = "Cueille les fruits verts pour une recolte precoce ou attends leur pleine coloration pour un gout plus sucre et une meilleure intensite aromatique."
      }
    )
  }
}

function Ensure-ArticleImages {
  param([object[]]$allArticles)

  if (-not (Test-Path $imagesDir)) {
    New-Item -ItemType Directory -Force -Path $imagesDir | Out-Null
  }

  try {
    [Net.ServicePointManager]::SecurityProtocol = `
      [Net.SecurityProtocolType]::Tls12 -bor `
      [Net.SecurityProtocolType]::Tls11 -bor `
      [Net.SecurityProtocolType]::Tls
  } catch {
  }

  $imageMap = [ordered]@{}
  foreach ($article in $allArticles) {
    if ($article.ImageRemoteUrl -and $article.ImageFileName) {
      $imageMap[$article.ImageFileName] = $article.ImageRemoteUrl
    }
  }

  foreach ($entry in $imageMap.GetEnumerator()) {
    $fileName = $entry.Key
    $remoteUrl = $entry.Value
    $outputPath = Join-Path $imagesDir $fileName

    if ((Test-Path $outputPath) -and ((Get-Item $outputPath).Length -gt 0)) {
      continue
    }

    try {
      Invoke-WebRequest `
        -Uri $remoteUrl `
        -OutFile $outputPath `
        -UseBasicParsing `
        -Headers @{ "User-Agent" = "Mozilla/5.0 (compatible; EcoBalconStatic/1.0)" }
      Write-Output "Downloaded image $fileName"
    } catch {
      throw "Impossible de telecharger l'image distante $remoteUrl"
    }
  }
}

function Get-CardExcerpt {
  param(
    [string]$text,
    [int]$maxLength = 148
  )

  $clean = ($text -replace '\s+', ' ').Trim()
  if ($clean.Length -le $maxLength) { return $clean }

  $slice = $clean.Substring(0, $maxLength)
  $lastSpace = $slice.LastIndexOf(' ')
  if ($lastSpace -gt 60) {
    $slice = $slice.Substring(0, $lastSpace)
  }

  return ($slice.TrimEnd(@('.',' ',',',';',':')) + "...")
}

function Get-SchemaData {
  param([string]$content)

  $schemaMatch = [regex]::Match($content, '<script type=application/ld\+json>(?<json>\{.*?\})</script>', 'Singleline')
  if (-not $schemaMatch.Success) {
    throw "Schema JSON-LD introuvable."
  }

  return ($schemaMatch.Groups["json"].Value | ConvertFrom-Json)
}

function Get-HeroCaption {
  param([string]$content)

  $patterns = @(
    'title="(?<caption>[^"]+)"[^>]*class="image image--grid loaded image-wrapper--desktop"'
    'title="(?<caption>[^"]+)"[^>]*class="image image--grid loaded image-wrapper--mobile'
    'title="(?<caption>[^"]+)"[^>]*class="image image--grid'
    'alt="(?<caption>[^"]+)"[^>]*class="image__image--cropped image__image"'
    'title="(?<caption>[^"]+)"[^>]*data-qa=grid-image'
  )

  foreach ($pattern in $patterns) {
    $match = [regex]::Match($content, $pattern, 'Singleline')
    if (-not $match.Success) { continue }

    $caption = [System.Net.WebUtility]::HtmlDecode($match.Groups["caption"].Value).Trim()
    if (-not $caption) { continue }
    if ($caption -match '^(Go to |Instagram|Twitter|X$|EcoBalcon$)') { continue }
    return $caption
  }

  return ""
}

function Get-AuthorNameFromPageData {
  param(
    [string]$content,
    [string]$slug
  )

  if ([string]::IsNullOrWhiteSpace($slug)) { return "" }

  $searchContent = [System.Net.WebUtility]::HtmlDecode($content)
  $matches = [regex]::Matches(
    $searchContent,
    '"authorName":\[0,"(?<author>[^"]+)"\][\s\S]{0,4000}?"slug":\[0,"(?<slug>[^"]+)"',
    'Singleline'
  )

  foreach ($match in $matches) {
    if ($match.Groups["slug"].Value -eq $slug -and $match.Groups["author"].Value) {
      return [System.Net.WebUtility]::HtmlDecode($match.Groups["author"].Value)
    }
  }

  return ""
}

function Get-AuthorData {
  param(
    $schema,
    [string]$content,
    [string]$slug
  )

  $pageAuthorName = Get-AuthorNameFromPageData -content $content -slug $slug
  if ($pageAuthorName) {
    return [PSCustomObject]@{
      Type = "Person"
      Name = $pageAuthorName
    }
  }

  $author = $schema.author
  if ($null -eq $author) {
    return [PSCustomObject]@{
      Type = "Organization"
      Name = "Eco Balcon"
    }
  }

  if ($author -is [System.Array] -and $author.Count -gt 0) {
    $author = $author[0]
  }

  $authorType = if ($author.'@type') { [string]$author.'@type' } else { "Organization" }
  $authorName = if ($author.name) { [System.Net.WebUtility]::HtmlDecode([string]$author.name) } else { "Eco Balcon" }

  return [PSCustomObject]@{
    Type = $authorType
    Name = $authorName
  }
}

function Get-ArticleSources {
  $ignoreFiles = @("index.html", "articles.html", "galerie.html")
  $articleSources = New-Object System.Collections.Generic.List[object]

  foreach ($file in Get-ChildItem -Path $rawDir -File | Sort-Object Name) {
    if ($ignoreFiles -contains $file.Name) { continue }

    $content = Get-Content -Raw -Encoding UTF8 $file.FullName
    $schema = Get-SchemaData $content
    if ($schema.'@type' -ne 'Article') { continue }

    if ($schema.url -notmatch '^https://ecobalcon\.com/(?<slug>[^/?#]+)') {
      throw "Impossible de determiner le slug pour $($file.Name)."
    }

    $slug = $matches["slug"]
    $date = if ($schema.datePublished) { [DateTime]::Parse($schema.datePublished) } else { [DateTime]::MinValue }
    $authorData = Get-AuthorData -schema $schema -content $content -slug $slug
    $heroCaption = Get-HeroCaption $content
    $imageRemoteUrl = [string]$schema.image
    $imageFileName = Get-ImageFileName -url $imageRemoteUrl -slug $slug
    $category = if ($schema.articleSection -and $schema.articleSection.Count -gt 0) {
      [System.Net.WebUtility]::HtmlDecode($schema.articleSection[0])
    } else {
      "Article"
    }

    $articleSources.Add([PSCustomObject]@{
        SourcePath = $file.FullName
        SourceName = $file.Name
        Slug = $slug
        OutputName = "$slug.html"
        Title = [System.Net.WebUtility]::HtmlDecode($schema.name)
        Description = [System.Net.WebUtility]::HtmlDecode($schema.description)
        ImageRemoteUrl = $imageRemoteUrl
        ImageFileName = $imageFileName
        ImageCanonicalUrl = Get-ImageCanonicalUrl $imageFileName
        ImageAlt = if ($heroCaption) { $heroCaption } else { [System.Net.WebUtility]::HtmlDecode($schema.description) }
        DatePublished = [string]$schema.datePublished
        DateModified = if ($schema.dateModified) { [string]$schema.dateModified } else { [string]$schema.datePublished }
        TimeRequired = [string]$schema.timeRequired
        AuthorName = $authorData.Name
        AuthorType = $authorData.Type
        Category = $category
        DateSort = $date
      })
  }

  return $articleSources | Sort-Object `
    @{ Expression = "DateSort"; Descending = $true }, `
    @{ Expression = "Title"; Descending = $false }
}

$articles = @(Get-ArticleSources)
$slugMap = @{}
foreach ($article in $articles) {
  $slugMap[$article.Slug] = $article.OutputName
}

Ensure-ArticleImages $articles

function Resolve-Link {
  param([string]$url)

  if ($url -match '^https://ecobalcon\.com/([^/?#]+)') {
    $slug = $matches[1]
    if ($slugMap.ContainsKey($slug)) {
      return $slugMap[$slug]
    }
  }

  if ($url -match '^/([^/?#]+)') {
    $slug = $matches[1]
    if ($slugMap.ContainsKey($slug)) {
      return $slugMap[$slug]
    }
  }

  return $url
}

function New-AnchorHtml {
  param(
    [string]$url,
    [string]$text
  )

  if ([string]::IsNullOrWhiteSpace($text)) {
    $text = $url
  }

  $safeText = HtmlEscape $text

  if ($url -like "*.html") {
    return "<a href=`"$url`">$safeText</a>"
  }

  if ($url -match '^https?://(www\.)?amzn\.to/' -or $url -match '^https?://(www\.)?amazon\.') {
    return "<a href=`"$url`" target=`"_blank`" rel=`"nofollow sponsored noopener noreferrer`">$safeText</a>"
  }

  if ($url -match '^https?://') {
    return "<a href=`"$url`" target=`"_blank`" rel=`"noopener noreferrer`">$safeText</a>"
  }

  return "<a href=`"$url`">$safeText</a>"
}

function Sanitize-InlineHtml {
  param([string]$html)

  if ([string]::IsNullOrWhiteSpace($html)) { return "" }

  $anchorMap = @{}
  $working = $html

  $working = [regex]::Replace($working, '(?is)<a\b[^>]*href=(["'']?)(?<url>[^"''\s>]+)\1[^>]*>(?<text>.*?)</a>', {
      param($m)
      $placeholder = "__ANCHOR_{0}__" -f ([guid]::NewGuid().ToString("N"))
      $url = Resolve-Link ([System.Net.WebUtility]::HtmlDecode($m.Groups["url"].Value))
      $text = [regex]::Replace($m.Groups["text"].Value, '(?is)<[^>]+>', '')
      $text = [System.Net.WebUtility]::HtmlDecode($text).Trim()
      $anchorMap[$placeholder] = New-AnchorHtml -url $url -text $text
      return $placeholder
    })

  $working = [regex]::Replace($working, '(?i)<br\s*/?>', '__BR__')
  $working = [regex]::Replace($working, '(?is)</?(strong|em|u|span)[^>]*>', '')
  $working = [regex]::Replace($working, '(?is)<[^>]+>', '')
  $working = [System.Net.WebUtility]::HtmlDecode($working)
  $working = $working -replace '\s*__BR__\s*', '__BR__'
  $working = $working.Trim()
  $working = $working -replace '__BR__', '<br>'

  foreach ($key in $anchorMap.Keys) {
    $working = $working.Replace($key, $anchorMap[$key])
  }

  return $working.Trim()
}

function Get-BodyBlocks {
  param([string]$content)

  $startMatch = [regex]::Match($content, '<h1\b[^>]*dir=(?:"auto"|auto)[^>]*>', 'IgnoreCase')
  if (-not $startMatch.Success) {
    throw "Debut d'article introuvable."
  }

  $start = $startMatch.Index
  $end = $content.IndexOf('</section><section id=zSiG-O', $start)
  if ($end -lt 0) {
    throw "Segment article introuvable."
  }

  $segment = $content.Substring($start, $end - $start)
  $pattern = '(?s)<h(?<level>[1-3])[^>]*>(?<heading>.*?)</h\k<level>>|<li[^>]*>\s*<p[^>]*class=body[^>]*>(?<li>.*?)(?=</p>|<p[^>]*class=body[^>]*>\s*</p>|</li>)|<p[^>]*class=body[^>]*>(?<p>.*?)(?=<p[^>]*class=body|<h[1-3]|<ul|<ol|<li|</section>|</div>)'
  return [regex]::Matches($segment, $pattern)
}

function Build-ArticleBody {
  param([string]$content)

  $matches = Get-BodyBlocks $content
  $builder = New-Object System.Text.StringBuilder
  $listOpen = $false
  $seenH1 = $false

  foreach ($m in $matches) {
    if ($m.Groups["heading"].Success -and $m.Groups["heading"].Value) {
      if ($listOpen) {
        [void]$builder.AppendLine("            </ul>")
        $listOpen = $false
      }

      $level = [int]$m.Groups["level"].Value
      $heading = Sanitize-InlineHtml $m.Groups["heading"].Value
      if (-not $heading) { continue }

      if ($level -eq 1) {
        if (-not $seenH1) {
          $seenH1 = $true
        }
        continue
      }

      [void]$builder.AppendLine("            <h$level>$heading</h$level>")
      continue
    }

    if ($m.Groups["li"].Success -and $m.Groups["li"].Value) {
      $item = Sanitize-InlineHtml $m.Groups["li"].Value
      if (-not $item) { continue }

      if (-not $listOpen) {
        [void]$builder.AppendLine("            <ul>")
        $listOpen = $true
      }

      [void]$builder.AppendLine("              <li>$item</li>")
      continue
    }

    if ($m.Groups["p"].Success -and $m.Groups["p"].Value) {
      if ($listOpen) {
        [void]$builder.AppendLine("            </ul>")
        $listOpen = $false
      }

      $paragraph = Sanitize-InlineHtml $m.Groups["p"].Value
      if (-not $paragraph) { continue }
      [void]$builder.AppendLine("            <p>$paragraph</p>")
    }
  }

  if ($listOpen) {
    [void]$builder.AppendLine("            </ul>")
  }

  return ($builder.ToString().TrimEnd() -replace '(?s)<a href="(?<url>[^"]+)"(?<attrs>[^>]*)>(?<text>[^<]+)</a>\s*<a href="\k<url>"[^>]*>\k<url></a>', '<a href="${url}"${attrs}>${text}</a> ')
}

function Get-JsonLdScriptTags {
  param([object[]]$objects)

  $scripts = New-Object System.Collections.Generic.List[string]
  foreach ($obj in $objects) {
    if ($null -eq $obj) { continue }
    $scripts.Add("  <script type=`"application/ld+json`">$($obj | ConvertTo-Json -Depth 10 -Compress)</script>")
  }

  return ($scripts -join "`n")
}

function Get-ArticleBreadcrumbSchema {
  param(
    [pscustomobject]$article,
    [string]$canonicalUrl
  )

  return [ordered]@{
    "@context" = "https://schema.org"
    "@type" = "BreadcrumbList"
    itemListElement = @(
      [ordered]@{
        "@type" = "ListItem"
        position = 1
        name = "Accueil"
        item = "$siteUrl/"
      },
      [ordered]@{
        "@type" = "ListItem"
        position = 2
        name = "Articles"
        item = "$siteUrl/articles/"
      },
      [ordered]@{
        "@type" = "ListItem"
        position = 3
        name = $article.Title
        item = $canonicalUrl
      }
    )
  }
}

function Get-ArticleFaqSchema {
  param([pscustomobject]$article)

  if (-not $faqSchemaMap.ContainsKey($article.Slug)) {
    return $null
  }

  return [ordered]@{
    "@context" = "https://schema.org"
    "@type" = "FAQPage"
    mainEntity = @(
      $faqSchemaMap[$article.Slug] | ForEach-Object {
        [ordered]@{
          "@type" = "Question"
          name = $_.Question
          acceptedAnswer = [ordered]@{
            "@type" = "Answer"
            text = $_.Answer
          }
        }
      }
    )
  }
}

function Get-ArticleHowToSchema {
  param([pscustomobject]$article)

  if (-not $howToSchemaMap.ContainsKey($article.Slug)) {
    return $null
  }

  $howTo = $howToSchemaMap[$article.Slug]
  $steps = @()
  $position = 1

  foreach ($step in $howTo.Steps) {
    $steps += [ordered]@{
        "@type" = "HowToStep"
        position = $position
        name = $step.Name
        text = $step.Text
      }
    $position += 1
  }

  $schema = [ordered]@{
    "@context" = "https://schema.org"
    "@type" = "HowTo"
    name = $howTo.Name
    description = $howTo.Description
    inLanguage = "fr"
    image = @($article.ImageCanonicalUrl)
    step = $steps
  }

  if ($article.TimeRequired) {
    $schema["totalTime"] = $article.TimeRequired
  }

  return $schema
}

function Build-ArticleHtml {
  param(
    [pscustomobject]$article,
    [object[]]$allArticles
  )

  $content = Get-Content -Raw -Encoding UTF8 $article.SourcePath
  $heroCaption = if ($article.ImageAlt) { $article.ImageAlt } else { Get-HeroCaption $content }
  $bodyHtml = Build-ArticleBody $content
  $dateText = Convert-IsoDateToFrench $article.DatePublished
  $timeText = Convert-TimeRequired $article.TimeRequired
  $canonicalUrl = "$siteUrl/articles/$($article.OutputName)"
  $heroImageSrc = Get-ImagePagePath -fileName $article.ImageFileName -pagePrefix "../images/articles/"
  $heroImageDimensions = Get-ArticleImageDimensionAttributes $article.ImageFileName
  $logoDimensions = Get-RootImageDimensionAttributes "images\logo-site.png"
  $relatedArticles = @(Get-RelatedArticles -article $article -allArticles $allArticles -count 3)

  $articleSchema = [ordered]@{
    "@context" = "https://schema.org"
    "@type" = "BlogPosting"
    headline = $article.Title
    description = $article.Description
    url = $canonicalUrl
    mainEntityOfPage = $canonicalUrl
    image = @($article.ImageCanonicalUrl)
    datePublished = $article.DatePublished
    dateModified = $article.DateModified
    articleSection = $article.Category
    inLanguage = "fr"
    author = [ordered]@{
      "@type" = $article.AuthorType
      name = $article.AuthorName
    }
    publisher = [ordered]@{
      "@type" = "Organization"
      name = "EcoBalcon"
      logo = [ordered]@{
        "@type" = "ImageObject"
        url = "$siteUrl/images/logo-site.png"
      }
    }
  }
  $breadcrumbSchema = Get-ArticleBreadcrumbSchema -article $article -canonicalUrl $canonicalUrl
  $faqSchema = Get-ArticleFaqSchema -article $article
  $howToSchema = Get-ArticleHowToSchema -article $article
  $jsonLdScripts = Get-JsonLdScriptTags @($articleSchema, $breadcrumbSchema, $faqSchema, $howToSchema)

  $metaParts = @("<span>Par $(HtmlEscape $article.AuthorName)</span>")
  if ($dateText) { $metaParts += "<span>&bull;</span><span>$dateText</span>" }
  if ($timeText) { $metaParts += "<span>&bull;</span><span>$timeText</span>" }
  $metaHtml = ($metaParts -join "`n            ")

  $sidebarItems = @()
  if ($article.AuthorName) { $sidebarItems += "                <li><strong>Auteur :</strong> $(HtmlEscape $article.AuthorName)</li>" }
  if ($article.Category) { $sidebarItems += "                <li><strong>Th&egrave;me :</strong> $(HtmlEscape $article.Category)</li>" }
  if ($timeText) { $sidebarItems += "                <li><strong>Lecture :</strong> $(HtmlEscape $timeText)</li>" }
  if ($dateText) { $sidebarItems += "                <li><strong>Publication :</strong> $(HtmlEscape $dateText)</li>" }
  $sidebarHtml = ($sidebarItems -join "`n")

  $heroTitle = if ($heroCaption) { $heroCaption } else { $article.Title }
  $breadcrumbHtml = @"
        <nav class="breadcrumb-nav" aria-label="fil d'ariane">
          <ol class="breadcrumb">
            <li><a href="../index.html">Accueil</a></li>
            <li><a href="index.html">Articles</a></li>
            <li aria-current="page">$(HtmlEscape $article.Title)</li>
          </ol>
        </nav>
"@
  $relatedCardsHtml = if ($relatedArticles.Count -gt 0) {
    (($relatedArticles | ForEach-Object {
          Build-ArticleCardHtml -article $_ -hrefPrefix "" -imagePrefix "../images/articles/" -extraClass " related-card"
        }) -join "`n")
  } else { "" }
  $relatedSection = if ($relatedCardsHtml) {
@"
        <section class="related-section" aria-labelledby="related-articles-heading">
          <div class="section-heading section-heading-compact">
            <div>
              <h2 id="related-articles-heading">A lire aussi</h2>
              <p>D'autres articles proches pour continuer naturellement ta lecture.</p>
            </div>
          </div>
          <div class="cards cards-related">
$relatedCardsHtml
          </div>
        </section>
"@
  } else { "" }

  return @"
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>$(HtmlEscape $article.Title) | EcoBalcon</title>
  <meta name="description" content="$(HtmlEscape $article.Description)">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <meta name="author" content="$(HtmlEscape $article.AuthorName)">
  <link rel="preload" as="image" href="$heroImageSrc" fetchpriority="high">
  <link rel="canonical" href="$canonicalUrl">
  <link rel="alternate" hreflang="fr" href="$canonicalUrl">
  <link rel="alternate" hreflang="x-default" href="$canonicalUrl">
  <meta property="og:locale" content="fr_FR">
  <meta property="og:site_name" content="EcoBalcon">
  <meta property="og:type" content="article">
  <meta property="og:title" content="$(HtmlEscape $article.Title) | EcoBalcon">
  <meta property="og:description" content="$(HtmlEscape $article.Description)">
  <meta property="og:url" content="$canonicalUrl">
  <meta property="og:image" content="$($article.ImageCanonicalUrl)">
  <meta property="og:image:alt" content="$(HtmlEscape $heroCaption)">
  <meta property="article:published_time" content="$($article.DatePublished)">
  <meta property="article:modified_time" content="$($article.DateModified)">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="$(HtmlEscape $article.Title) | EcoBalcon">
  <meta name="twitter:description" content="$(HtmlEscape $article.Description)">
  <meta name="twitter:image" content="$($article.ImageCanonicalUrl)">
  <meta name="twitter:image:alt" content="$(HtmlEscape $heroCaption)">
$jsonLdScripts
  <link rel="icon" type="image/png" sizes="32x32" href="../images/favicon-32.png">
  <link rel="icon" type="image/png" sizes="192x192" href="../images/favicon-192.png">
  <link rel="apple-touch-icon" sizes="180x180" href="../images/apple-touch-icon.png">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
  <div class="site-shell">
    <header class="site-header">
      <div class="header-inner">
        <a class="brand" href="../index.html">
          <span class="brand-mark">
            <img class="brand-logo" src="../images/logo-site.png" alt="Logo EcoBalcon"$logoDimensions>
          </span>
        </a>
        <div class="header-actions">
          <nav class="site-nav" aria-label="Navigation principale">
            <a href="../index.html">Accueil</a>
            <a href="index.html" aria-current="page">Articles</a>
            <a href="../galerie.html">Galerie</a>
          </nav>
          <div class="social-nav" aria-label="R&eacute;seaux sociaux">
            <a class="social-link" href="https://www.instagram.com/eco_balcon/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5"></rect>
                <circle cx="12" cy="12" r="4.2"></circle>
                <circle cx="17.4" cy="6.6" r="1"></circle>
              </svg>
            </a>
            <a class="social-link" href="https://x.com/Eco_Balcon" target="_blank" rel="noopener noreferrer" aria-label="X">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M4 4l16 16"></path>
                <path d="M20 4L4 20"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>

    <main class="article-layout">
      <div class="article-shell">
$breadcrumbHtml
        <header class="article-header">
          <span class="eyebrow">$(HtmlEscape $article.Category)</span>
          <h1 class="article-title">$(HtmlEscape $article.Title)</h1>
          <div class="article-meta">
            $metaHtml
          </div>
          <p class="article-intro">$(HtmlEscape $article.Description)</p>
        </header>

        <figure class="hero-image">
          <img src="$heroImageSrc" alt="$(HtmlEscape $heroCaption)" title="$(HtmlEscape $heroTitle)" loading="eager" decoding="async" fetchpriority="high"$heroImageDimensions>
        </figure>

        <div class="article-grid">
          <article class="article-prose">
$bodyHtml
          </article>

          <aside class="sidebar-stack">
            <div class="checklist article-note">
              <h3>Rep&egrave;res</h3>
              <ul class="article-list">
$sidebarHtml
              </ul>
            </div>

            <div class="checklist article-links">
              <h3>Continuer</h3>
              <ul class="article-list">
                <li><a href="index.html">Retour &agrave; la liste des articles</a></li>
                <li><a href="../index.html">Retour &agrave; l'accueil</a></li>
              </ul>
            </div>
          </aside>
        </div>
$relatedSection
      </div>
    </main>

    <footer class="footer">
      <div class="footer-inner">
        <div>EcoBalcon</div>
        <div><a class="muted-link" href="index.html">Retour &agrave; la liste</a></div>
      </div>
    </footer>
  </div>
</body>
</html>
"@
}

function Build-ArticleCardHtml {
  param(
    [pscustomobject]$article,
    [string]$hrefPrefix,
    [string]$imagePrefix,
    [string]$extraClass = ""
  )

  $category = if ($article.Category) { $article.Category } else { "Article" }
  $summary = Get-CardExcerpt $article.Description
  $href = "$hrefPrefix$($article.OutputName)"
  $imageSrc = Get-ImagePagePath -fileName $article.ImageFileName -pagePrefix $imagePrefix
  $imageDimensions = Get-ArticleImageDimensionAttributes $article.ImageFileName
  $className = "article-card$extraClass"

  return @"
          <article class="$className">
            <img src="$imageSrc" alt="$(HtmlEscape $article.ImageAlt)" title="$(HtmlEscape $article.ImageAlt)" loading="lazy" decoding="async"$imageDimensions>
            <div class="article-card-body">
              <div class="pill-row"><span class="pill">$(HtmlEscape $category)</span></div>
              <h3><a href="$href">$(HtmlEscape $article.Title)</a></h3>
              <p>$(HtmlEscape $summary)</p>
            </div>
          </article>
"@
}

function Build-HomeHtml {
  param([object[]]$allArticles)

  $featured = @($allArticles | Select-Object -First 6)
  $cardsHtml = (($featured | ForEach-Object { Build-ArticleCardHtml -article $_ -hrefPrefix "articles/" -imagePrefix "images/articles/" }) -join "`n")
  $count = $allArticles.Count
  $featuredArticle = Get-PreferredArticle -allArticles $allArticles -preferredSlugs @(
    "jardinage-en-lasagnes-sur-balcon",
    "jardiner-sur-un-balcon",
    "jardin-sur-balcon-astuces"
  ) -fallbackIndex 0
  $featuredImage = if ($featuredArticle) { $featuredArticle.ImageCanonicalUrl } else { "" }
  $featuredImageSrc = if ($featuredArticle) { Get-ImagePagePath -fileName $featuredArticle.ImageFileName -pagePrefix "images/articles/" } else { "" }
  $featuredImageDimensions = if ($featuredArticle) { Get-ArticleImageDimensionAttributes $featuredArticle.ImageFileName } else { "" }
  $featuredTitle = if ($featuredArticle) { $featuredArticle.Title } else { "Jardinage urbain sur balcon" }
  $featuredImageAlt = if ($featuredArticle) { $featuredArticle.ImageAlt } else { "Balcon potager et jardinage urbain" }
  $heroSecondary = Get-PreferredArticle -allArticles $allArticles -preferredSlugs @(
    "plantes-qui-survivent-a-la-canicule",
    "reduction-consommation-eau-balcon",
    "guide-tomates-sur-son-balcon"
  ) -fallbackIndex 1
  $homeStats = @(
    [PSCustomObject]@{ Value = "$count"; Label = "guides pratiques" },
    [PSCustomObject]@{ Value = "3"; Label = "auteurs" },
    [PSCustomObject]@{ Value = "petits"; Label = "espaces d'abord" }
  )
  $statsHtml = (($homeStats | ForEach-Object {
@"
            <div class="mini-stat">
              <strong>$($_.Value)</strong>
              <span>$($_.Label)</span>
            </div>
"@
      }) -join "`n")
  $startBlocks = @(
    [PSCustomObject]@{
      Label = "Débuter"
      Title = "Poser les bonnes bases"
      Copy = "Un point de départ simple pour installer un balcon agréable et éviter les erreurs classiques."
      Article = (Get-PreferredArticle -allArticles $allArticles -preferredSlugs @("jardin-sur-balcon-astuces", "jardiner-sur-un-balcon") -fallbackIndex 0)
    },
    [PSCustomObject]@{
      Label = "Planter"
      Title = "Choisir des cultures faciles"
      Copy = "Des fiches pratiques pour cultiver sur balcon sans se noyer dans la technique."
      Article = (Get-PreferredArticle -allArticles $allArticles -preferredSlugs @("guide-tomates-sur-son-balcon", "guide-laitues-sur-son-balcon", "guide-fraises-sur-son-balcon") -fallbackIndex 2)
    },
    [PSCustomObject]@{
      Label = "Préserver"
      Title = "Garder un balcon écolo"
      Copy = "Eau, paillage, récupération et gestes durables pour un entretien plus serein."
      Article = (Get-PreferredArticle -allArticles $allArticles -preferredSlugs @("reduction-consommation-eau-balcon", "recuperer-eau-de-pluie-balcon", "paillage-sur-balcon-ecolo") -fallbackIndex 3)
    }
  )
  $startHtml = (($startBlocks | ForEach-Object {
      if (-not $_.Article) { return }
      $href = "articles/$($_.Article.OutputName)"
@"
          <article class="home-path-card">
            <span class="eyebrow">$($_.Label)</span>
            <h3><a href="$href">$(HtmlEscape $_.Title)</a></h3>
            <p>$(HtmlEscape $_.Copy)</p>
            <a class="text-link" href="$href">Lire pour commencer</a>
          </article>
"@
    }) -join "`n")
  $themeHtml = @"
          <article class="theme-card">
            <span class="eyebrow">Potager</span>
            <h3><a href="articles/guide-tomates-sur-son-balcon.html">Cultiver m&ecirc;me avec peu de place</a></h3>
            <p>Tomates, laitues, fraises, aromatiques et petits fruits pour un balcon gourmand.</p>
          </article>
          <article class="theme-card">
            <span class="eyebrow">Chaleur</span>
            <h3><a href="articles/plantes-qui-survivent-a-la-canicule.html">Mieux vivre le plein soleil</a></h3>
            <p>Des plantes plus r&eacute;sistantes et des gestes simples pour traverser l'&eacute;t&eacute; avec moins de stress.</p>
          </article>
          <article class="theme-card">
            <span class="eyebrow">Fiches</span>
            <h3><a href="articles/index.html">Retrouver des guides concrets</a></h3>
            <p>Chaque culture est pr&eacute;sent&eacute;e avec l'essentiel : pot, exposition, arrosage, entretien et r&eacute;colte.</p>
          </article>
          <article class="theme-card">
            <span class="eyebrow">Balcon &eacute;colo</span>
            <h3><a href="articles/reduction-consommation-eau-balcon.html">&Eacute;conomiser l'eau au quotidien</a></h3>
            <p>Paillage, eau de pluie, eau de cuisson et compost pour un jardinage urbain plus durable.</p>
          </article>
"@
  $editorialFeature = Get-PreferredArticle -allArticles $allArticles -preferredSlugs @(
    "plantes-qui-survivent-a-la-canicule",
    "potager-balcon-eau-de-cuisson",
    "jardinage-en-lasagnes-sur-balcon"
  ) -fallbackIndex 0
  $editorialFeatureHref = if ($editorialFeature) { "articles/$($editorialFeature.OutputName)" } else { "articles/index.html" }
  $editorialFeatureImageSrc = if ($editorialFeature) { Get-ImagePagePath -fileName $editorialFeature.ImageFileName -pagePrefix "images/articles/" } else { "" }
  $editorialFeatureImageDimensions = if ($editorialFeature) { Get-ArticleImageDimensionAttributes $editorialFeature.ImageFileName } else { "" }
  $logoDimensions = Get-RootImageDimensionAttributes "images\logo-site.png"
  $editorialList = @(
    $allArticles |
      Where-Object { $null -eq $editorialFeature -or $_.Slug -ne $editorialFeature.Slug } |
      Select-Object -First 3
  )
  $editorialListHtml = (($editorialList | ForEach-Object {
      $href = "articles/$($_.OutputName)"
@"
            <article class="editorial-item">
              <span class="pill">$(HtmlEscape $_.Category)</span>
              <h3><a href="$href">$(HtmlEscape $_.Title)</a></h3>
              <p>$(HtmlEscape (Get-CardExcerpt $_.Description 118))</p>
            </article>
"@
    }) -join "`n")
  $jsonLd = Get-JsonLdScriptTags @([ordered]@{
      "@context" = "https://schema.org"
      "@type" = "WebSite"
      name = "EcoBalcon"
      url = "$siteUrl/"
      inLanguage = "fr"
      description = "EcoBalcon partage des conseils pratiques pour jardiner sur balcon, economiser l'eau, choisir les bonnes plantes et reussir un petit potager urbain."
      potentialAction = [ordered]@{
        "@type" = "SearchAction"
        target = "$siteUrl/articles/?q={search_term_string}"
        "query-input" = "required name=search_term_string"
      }
      publisher = [ordered]@{
        "@type" = "Organization"
        name = "EcoBalcon"
        logo = [ordered]@{
          "@type" = "ImageObject"
          url = "$siteUrl/images/logo-site.png"
        }
      }
    })

  return @"
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EcoBalcon | Jardinage urbain sur balcon</title>
  <meta name="description" content="EcoBalcon partage des conseils pratiques pour jardiner sur balcon, economiser l'eau, choisir les bonnes plantes et reussir un petit potager urbain.">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <link rel="preload" as="image" href="$featuredImageSrc" fetchpriority="high">
  <link rel="canonical" href="$siteUrl/">
  <link rel="alternate" hreflang="fr" href="$siteUrl/">
  <link rel="alternate" hreflang="x-default" href="$siteUrl/">
  <meta property="og:locale" content="fr_FR">
  <meta property="og:site_name" content="EcoBalcon">
  <meta property="og:type" content="website">
  <meta property="og:title" content="EcoBalcon | Jardinage urbain sur balcon">
  <meta property="og:description" content="EcoBalcon partage des conseils pratiques pour jardiner sur balcon, economiser l'eau, choisir les bonnes plantes et reussir un petit potager urbain.">
  <meta property="og:url" content="$siteUrl/">
  <meta property="og:image" content="$featuredImage">
  <meta property="og:image:alt" content="$(HtmlEscape $featuredImageAlt)">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="EcoBalcon | Jardinage urbain sur balcon">
  <meta name="twitter:description" content="EcoBalcon partage des conseils pratiques pour jardiner sur balcon, economiser l'eau, choisir les bonnes plantes et reussir un petit potager urbain.">
  <meta name="twitter:image" content="$featuredImage">
  <meta name="twitter:image:alt" content="$(HtmlEscape $featuredImageAlt)">
$jsonLd
  <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32.png">
  <link rel="icon" type="image/png" sizes="192x192" href="images/favicon-192.png">
  <link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png">
  <link rel="stylesheet" href="css/style.css">
</head>
<body class="home-page">
  <div class="site-shell">
    <header class="site-header">
      <div class="header-inner">
        <a class="brand" href="index.html">
          <span class="brand-mark">
            <img class="brand-logo" src="images/logo-site.png" alt="Logo EcoBalcon"$logoDimensions>
          </span>
        </a>
        <div class="header-actions">
          <nav class="site-nav" aria-label="Navigation principale">
            <a href="index.html" aria-current="page">Accueil</a>
            <a href="articles/index.html">Articles</a>
            <a href="galerie.html">Galerie</a>
          </nav>
          <div class="social-nav" aria-label="R&eacute;seaux sociaux">
            <a class="social-link" href="https://www.instagram.com/eco_balcon/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5"></rect>
                <circle cx="12" cy="12" r="4.2"></circle>
                <circle cx="17.4" cy="6.6" r="1"></circle>
              </svg>
            </a>
            <a class="social-link" href="https://x.com/Eco_Balcon" target="_blank" rel="noopener noreferrer" aria-label="X">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M4 4l16 16"></path>
                <path d="M20 4L4 20"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>

    <main>
      <section class="hero hero-home">
        <div class="section-inner hero-grid">
          <div class="hero-copy">
            <span class="eyebrow">Jardinage urbain</span>
            <h1>Des conseils simples pour faire d'un petit balcon un coin vivant et g&eacute;n&eacute;reux.</h1>
            <p>
              EcoBalcon rassemble des rep&egrave;res concrets pour jardiner en ville sans pression :
              choisir les bonnes plantes, mieux vivre les fortes chaleurs, gagner en autonomie
              et cultiver un espace ext&eacute;rieur beau, simple et nourricier.
            </p>
            <div class="meta-row hero-badges">
              <span class="status status-ready">Potager urbain</span>
              <span class="status status-ready">Plantes r&eacute;sistantes</span>
              <span class="status status-ready">Gestes &eacute;colo</span>
            </div>
            <div class="hero-actions">
              <a class="button" href="articles/index.html">Voir tous les articles</a>
              <a class="button-secondary" href="articles/$($featuredArticle.OutputName)">Commencer en douceur</a>
            </div>
            <div class="hero-stat-grid">
$statsHtml
            </div>
          </div>

          <aside class="hero-panel" aria-label="Par o&ugrave; commencer">
            <figure class="home-visual">
              <img src="$featuredImageSrc" alt="$(HtmlEscape $featuredImageAlt)" title="$(HtmlEscape $featuredImageAlt)" loading="eager" decoding="async" fetchpriority="high"$featuredImageDimensions>
            </figure>
            <div class="home-note">
              <span class="eyebrow">&Agrave; la une</span>
              <strong>$(HtmlEscape $featuredTitle)</strong>
              <p>$(HtmlEscape (Get-CardExcerpt $featuredArticle.Description 140))</p>
              <a class="text-link" href="articles/$($featuredArticle.OutputName)">Lire ce guide</a>
            </div>
            <div class="home-note home-note-soft">
              <span class="eyebrow">En ce moment</span>
              <strong>$(HtmlEscape $heroSecondary.Title)</strong>
              <p>$(HtmlEscape (Get-CardExcerpt $heroSecondary.Description 110))</p>
            </div>
          </aside>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="section-heading">
            <div>
              <h2>Commencer ici</h2>
              <p>Trois portes d'entr&eacute;e simples selon ton envie du moment.</p>
            </div>
          </div>
          <div class="home-path-grid">
$startHtml
          </div>
        </div>
      </section>

      <section class="section section-soft">
        <div class="section-inner">
          <div class="section-heading">
            <div>
              <h2>Explorer par th&egrave;me</h2>
              <p>Des rep&egrave;res visuels pour trouver rapidement le sujet qui t'aide vraiment.</p>
            </div>
          </div>
          <div class="theme-grid">
$themeHtml
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="section-heading">
            <div>
              <h2>&Agrave; lire cette semaine</h2>
              <p>Une entr&eacute;e plus &eacute;ditoriale pour d&eacute;couvrir les contenus sans scroller toute la biblioth&egrave;que.</p>
            </div>
          </div>
          <div class="editorial-grid">
            <article class="editorial-feature">
              <img src="$editorialFeatureImageSrc" alt="$(HtmlEscape $editorialFeature.ImageAlt)" title="$(HtmlEscape $editorialFeature.ImageAlt)" loading="lazy" decoding="async"$editorialFeatureImageDimensions>
              <div class="editorial-feature-body">
                <span class="pill">$(HtmlEscape $editorialFeature.Category)</span>
                <h3><a href="$editorialFeatureHref">$(HtmlEscape $editorialFeature.Title)</a></h3>
                <p>$(HtmlEscape (Get-CardExcerpt $editorialFeature.Description 172))</p>
                <a class="text-link" href="$editorialFeatureHref">Ouvrir l'article</a>
              </div>
            </article>
            <div class="editorial-list">
$editorialListHtml
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="section-heading">
            <div>
              <h2>Articles &agrave; d&eacute;couvrir</h2>
              <p>Une s&eacute;lection des guides les plus r&eacute;cents pour lancer ou am&eacute;liorer ton balcon au fil des saisons.</p>
            </div>
          </div>

          <div class="cards">
$cardsHtml
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-inner">
          <div class="cta-strip">
            <div>
              <h2 class="page-title">Explorer les $count articles</h2>
              <p class="page-intro">
                Potager, chaleur, &eacute;conomie d'eau, biodiversit&eacute;, fleurs utiles et fiches culture :
                tout est regroup&eacute; dans une page unique avec recherche int&eacute;gr&eacute;e.
              </p>
            </div>
            <a class="button" href="articles/index.html">Ouvrir la rubrique articles</a>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="footer-inner">
        <div>EcoBalcon</div>
        <div><a class="muted-link" href="articles/index.html">Voir tous les articles</a></div>
      </div>
    </footer>
  </div>
</body>
</html>
"@
}

function Build-ArticlesIndexHtml {
  param([object[]]$allArticles)

  $cardsHtml = (($allArticles | ForEach-Object { Build-ArticleCardHtml -article $_ -hrefPrefix "" -imagePrefix "../images/articles/" }) -join "`n")
  $count = $allArticles.Count
  $heroImage = if ($allArticles.Count -gt 0) { $allArticles[0].ImageCanonicalUrl } else { "" }
  $heroImageAlt = if ($allArticles.Count -gt 0) { $allArticles[0].ImageAlt } else { "Articles EcoBalcon autour du jardinage sur balcon" }
  $logoDimensions = Get-RootImageDimensionAttributes "images\logo-site.png"
  $jsonLd = Get-JsonLdScriptTags @([ordered]@{
      "@context" = "https://schema.org"
      "@type" = "CollectionPage"
      name = "Conseils et guides jardinage sur balcon | EcoBalcon"
      url = "$siteUrl/articles/"
      inLanguage = "fr"
      description = "Retrouve les articles EcoBalcon autour du jardinage sur balcon, du potager urbain, des plantes utiles et des gestes ecolo."
      isPartOf = [ordered]@{
        "@type" = "WebSite"
        name = "EcoBalcon"
        url = "$siteUrl/"
      }
    })

  return @"
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Conseils et guides jardinage sur balcon | EcoBalcon</title>
  <meta name="description" content="Retrouve les articles EcoBalcon autour du jardinage sur balcon, du potager urbain, des plantes utiles et des gestes ecolo.">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <link rel="canonical" href="$siteUrl/articles/">
  <link rel="alternate" hreflang="fr" href="$siteUrl/articles/">
  <link rel="alternate" hreflang="x-default" href="$siteUrl/articles/">
  <meta property="og:locale" content="fr_FR">
  <meta property="og:site_name" content="EcoBalcon">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Conseils et guides jardinage sur balcon | EcoBalcon">
  <meta property="og:description" content="Retrouve les articles EcoBalcon autour du jardinage sur balcon, du potager urbain, des plantes utiles et des gestes ecolo.">
  <meta property="og:url" content="$siteUrl/articles/">
  <meta property="og:image" content="$heroImage">
  <meta property="og:image:alt" content="$(HtmlEscape $heroImageAlt)">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Conseils et guides jardinage sur balcon | EcoBalcon">
  <meta name="twitter:description" content="Retrouve les articles EcoBalcon autour du jardinage sur balcon, du potager urbain, des plantes utiles et des gestes ecolo.">
  <meta name="twitter:image" content="$heroImage">
  <meta name="twitter:image:alt" content="$(HtmlEscape $heroImageAlt)">
$jsonLd
  <link rel="icon" type="image/png" sizes="32x32" href="../images/favicon-32.png">
  <link rel="icon" type="image/png" sizes="192x192" href="../images/favicon-192.png">
  <link rel="apple-touch-icon" sizes="180x180" href="../images/apple-touch-icon.png">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
  <div class="site-shell">
    <header class="site-header">
      <div class="header-inner">
        <a class="brand" href="../index.html">
          <span class="brand-mark">
            <img class="brand-logo" src="../images/logo-site.png" alt="Logo EcoBalcon"$logoDimensions>
          </span>
        </a>
        <div class="header-actions">
          <nav class="site-nav" aria-label="Navigation principale">
            <a href="../index.html">Accueil</a>
            <a href="index.html" aria-current="page">Articles</a>
            <a href="../galerie.html">Galerie</a>
          </nav>
          <div class="social-nav" aria-label="R&eacute;seaux sociaux">
            <a class="social-link" href="https://www.instagram.com/eco_balcon/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5"></rect>
                <circle cx="12" cy="12" r="4.2"></circle>
                <circle cx="17.4" cy="6.6" r="1"></circle>
              </svg>
            </a>
            <a class="social-link" href="https://x.com/Eco_Balcon" target="_blank" rel="noopener noreferrer" aria-label="X">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M4 4l16 16"></path>
                <path d="M20 4L4 20"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>

    <main class="section">
      <div class="section-inner">
        <div class="page-hero">
          <div class="page-hero-copy">
            <span class="eyebrow">Articles</span>
            <h1 class="page-title">Conseils et guides pour jardiner sur balcon</h1>
            <p class="page-intro">
              Une biblioth&egrave;que de $count contenus pratiques autour du potager urbain, des plantes adapt&eacute;es &agrave; la ville,
              des &eacute;conomies d'eau et des m&eacute;thodes simples pour mieux cultiver sur un petit espace.
            </p>
          </div>

          <section class="search-panel search-panel-compact" aria-label="Recherche d'articles">
            <label class="search-label sr-only" for="article-search">Rechercher un article</label>
            <input
              class="search-input"
              id="article-search"
              type="search"
              name="q"
              placeholder="Rechercher un article"
              autocomplete="off">
          </section>
        </div>

        <p class="search-empty" id="search-empty" hidden>Aucun article ne correspond &agrave; cette recherche.</p>

        <div class="cards" id="article-list">
$cardsHtml
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="footer-inner">
        <div>EcoBalcon</div>
        <div><a class="muted-link" href="../index.html">Retour &agrave; l'accueil</a></div>
      </div>
    </footer>
  </div>
  <script>
    const searchInput = document.getElementById("article-search");
    const articleCards = Array.from(document.querySelectorAll("#article-list .article-card"));
    const emptyState = document.getElementById("search-empty");
    const currentUrl = new URL(window.location.href);

    const normalizeText = (value) =>
      value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const syncQueryParam = () => {
      const rawValue = searchInput.value.trim();

      if (rawValue === "") {
        currentUrl.searchParams.delete("q");
      } else {
        currentUrl.searchParams.set("q", rawValue);
      }

      window.history.replaceState({}, "", `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`);
    };

    const filterArticles = () => {
      const query = normalizeText(searchInput.value.trim());
      let visibleCount = 0;

      articleCards.forEach((card) => {
        const searchableText = normalizeText(card.textContent);
        const matches = query === "" || searchableText.includes(query);
        card.hidden = !matches;

        if (matches) {
          visibleCount += 1;
        }
      });

      emptyState.hidden = visibleCount !== 0;
    };

    const initialQuery = currentUrl.searchParams.get("q");
    if (initialQuery) {
      searchInput.value = initialQuery;
      filterArticles();
    }

    searchInput.addEventListener("input", () => {
      filterArticles();
      syncQueryParam();
    });
  </script>
</body>
</html>
"@
}

function Get-RelatedArticles {
  param(
    [pscustomobject]$article,
    [object[]]$allArticles,
    [int]$count = 3
  )

  $stopWords = @(
    "avec", "dans", "pour", "comment", "guide", "balcon", "cultiver", "votre", "villes", "ville",
    "toute", "toutes", "faire", "plus", "moins", "tout", "bien", "entre", "sans", "cette", "votre",
    "leurs", "leurs", "leurs", "sont", "sur", "des", "les", "une", "vos", "son", "ses"
  )

  $termMatches = [regex]::Matches(
    ($article.Title + " " + $article.Description).ToLowerInvariant(),
    '\p{L}[\p{L}\p{N}-]{3,}'
  )
  $terms = @(
    $termMatches |
      ForEach-Object { $_.Value } |
      Where-Object { $stopWords -notcontains $_ } |
      Select-Object -Unique |
      Select-Object -First 8
  )

  $scored = foreach ($candidate in $allArticles) {
    if ($candidate.Slug -eq $article.Slug) { continue }

    $score = 0
    if ($candidate.Category -and $candidate.Category -eq $article.Category) { $score += 6 }
    if ($candidate.AuthorName -and $candidate.AuthorName -eq $article.AuthorName) { $score += 1 }

    $haystack = ($candidate.Title + " " + $candidate.Description).ToLowerInvariant()
    foreach ($term in $terms) {
      if ($haystack -match [regex]::Escape($term)) {
        $score += 1
      }
    }

    [PSCustomObject]@{
      Score = $score
      Article = $candidate
    }
  }

  $selected = @(
    $scored |
      Sort-Object `
        @{ Expression = "Score"; Descending = $true }, `
        @{ Expression = { $_.Article.DateSort }; Descending = $true }, `
        @{ Expression = { $_.Article.Title }; Descending = $false } |
      Select-Object -First $count
  )

  if ($selected.Count -lt $count) {
    $existing = @($selected | ForEach-Object { $_.Article.Slug })
    $fill = @(
      $allArticles |
        Where-Object { $_.Slug -ne $article.Slug -and $existing -notcontains $_.Slug } |
        Select-Object -First ($count - $selected.Count)
    )
    return @($selected | ForEach-Object { $_.Article }) + $fill
  }

  return @($selected | ForEach-Object { $_.Article })
}

function Get-PreferredArticle {
  param(
    [object[]]$allArticles,
    [string[]]$preferredSlugs,
    [int]$fallbackIndex = 0
  )

  foreach ($slug in $preferredSlugs) {
    $match = $allArticles | Where-Object { $_.Slug -eq $slug } | Select-Object -First 1
    if ($match) { return $match }
  }

  if ($allArticles.Count -gt $fallbackIndex) {
    return $allArticles[$fallbackIndex]
  }

  return $allArticles | Select-Object -First 1
}

function Build-SitemapXml {
  param([object[]]$allArticles)

  $today = (Get-Date).ToString("yyyy-MM-ddTHH:mm:sszzz")
  $entries = New-Object System.Collections.Generic.List[string]

  function New-SitemapImageNode {
    param(
      [string]$imageUrl,
      [string]$caption
    )

    if ([string]::IsNullOrWhiteSpace($imageUrl)) {
      return ""
    }

    $captionNode = if ([string]::IsNullOrWhiteSpace($caption)) {
      ""
    } else {
      "<image:caption>$(Escape-Xml $caption)</image:caption>"
    }

    return "<image:image><image:loc>$(Escape-Xml $imageUrl)</image:loc>$captionNode</image:image>"
  }

  function New-SitemapUrlNode {
    param(
      [string]$loc,
      [string]$lastmod,
      [string]$priority,
      [string]$imageUrl = "",
      [string]$imageCaption = ""
    )

    $imageNode = New-SitemapImageNode -imageUrl $imageUrl -caption $imageCaption
    return "<url><loc>$(Escape-Xml $loc)</loc><priority>$priority</priority><lastmod>$(Escape-Xml $lastmod)</lastmod>$imageNode</url>"
  }

  $homeFeatured = $allArticles | Select-Object -First 1
  $homeImageUrl = if ($homeFeatured) { $homeFeatured.ImageCanonicalUrl } else { "" }
  $homeImageCaption = if ($homeFeatured) { $homeFeatured.ImageAlt } else { "" }
  $entries.Add((New-SitemapUrlNode -loc "$siteUrl/" -priority "1.0" -lastmod $today -imageUrl $homeImageUrl -imageCaption $homeImageCaption))
  $entries.Add((New-SitemapUrlNode -loc "$siteUrl/articles/" -priority "0.9" -lastmod $today -imageUrl $homeImageUrl -imageCaption $homeImageCaption))
  if (Test-Path (Join-Path $root "galerie.html")) {
    $entries.Add((New-SitemapUrlNode -loc "$siteUrl/galerie.html" -priority "0.5" -lastmod $today -imageUrl "$siteUrl/images/articles/canicule-balcon-mxBXq1QqyeTR1PLZ.webp" -imageCaption "Balcon plante en plein soleil"))
  }

  foreach ($article in $allArticles) {
    $lastmod = if ($article.DateModified) { $article.DateModified } else { $article.DatePublished }
    $entries.Add((New-SitemapUrlNode -loc "$siteUrl/articles/$($article.OutputName)" -priority "0.7" -lastmod $lastmod -imageUrl $article.ImageCanonicalUrl -imageCaption $article.ImageAlt))
  }

  $body = ($entries -join "`n")
  return "<?xml version=`"1.0`" encoding=`"UTF-8`"?>`n<urlset xmlns=`"http://www.sitemaps.org/schemas/sitemap/0.9`" xmlns:image=`"http://www.google.com/schemas/sitemap-image/1.1`">`n$body`n</urlset>"
}

function Build-RobotsTxt {
  return @"
User-agent: *
Allow: /

Sitemap: $siteUrl/sitemap.xml
"@
}

foreach ($article in $articles) {
  $outPath = Join-Path $articlesDir $article.OutputName
  $html = Build-ArticleHtml -article $article -allArticles $articles
  Set-Content -Path $outPath -Value $html -Encoding UTF8
  Write-Output "Rebuilt $($article.OutputName)"
}

Set-Content -Path (Join-Path $articlesDir "index.html") -Value (Build-ArticlesIndexHtml $articles) -Encoding UTF8
Set-Content -Path (Join-Path $root "index.html") -Value (Build-HomeHtml $articles) -Encoding UTF8
Set-Content -Path (Join-Path $root "sitemap.xml") -Value (Build-SitemapXml $articles) -Encoding UTF8
Set-Content -Path (Join-Path $root "robots.txt") -Value (Build-RobotsTxt) -Encoding UTF8

Write-Output "Updated articles index, homepage, sitemap.xml and robots.txt"

