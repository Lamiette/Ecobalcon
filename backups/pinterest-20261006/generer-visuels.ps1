$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

# Visuels originaux dessinés avec des formes et du texte ; aucune photo de test.
$green = [System.Drawing.ColorTranslator]::FromHtml('#2f6f59')
$ink = [System.Drawing.ColorTranslator]::FromHtml('#233732')
$cream = [System.Drawing.ColorTranslator]::FromHtml('#f3f7f0')
$soft = [System.Drawing.ColorTranslator]::FromHtml('#d9eee9')

function Write-Poster {
  param([string]$FileName, [string]$Title, [string]$Subtitle, [object[]]$Cards, [string]$Note)
  $bitmap = New-Object System.Drawing.Bitmap 1000, 1500
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $graphics.Clear($cream)
  $greenBrush = New-Object System.Drawing.SolidBrush $green
  $inkBrush = New-Object System.Drawing.SolidBrush $ink
  $softBrush = New-Object System.Drawing.SolidBrush $soft
  $whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
  $fonts = @{
    Brand = New-Object System.Drawing.Font 'Arial', 26, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
    Title = New-Object System.Drawing.Font 'Arial', 70, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
    Heading = New-Object System.Drawing.Font 'Arial', 37, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
    Body = New-Object System.Drawing.Font 'Arial', 33, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
    Small = New-Object System.Drawing.Font 'Arial', 25, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
  }
  $format = New-Object System.Drawing.StringFormat
  try {
    $graphics.FillRectangle($greenBrush, 0, 0, 1000, 20)
    $graphics.DrawString('ECOBALCON · LE JARDIN EN POT', $fonts.Brand, $greenBrush, 70, 65)
    $graphics.DrawString($Title, $fonts.Title, $inkBrush, (New-Object System.Drawing.RectangleF 65, 155, 870, 270), $format)
    $graphics.DrawString($Subtitle, $fonts.Body, $inkBrush, (New-Object System.Drawing.RectangleF 70, 440, 860, 135), $format)
    $top = 610
    foreach ($card in $Cards) {
      $graphics.FillRectangle($whiteBrush, 65, $top, 870, 190)
      $graphics.FillRectangle($softBrush, 65, $top, 12, 190)
      $graphics.DrawString($card.Heading, $fonts.Heading, $greenBrush, (New-Object System.Drawing.RectangleF 100, ($top + 22), 790, 65), $format)
      $graphics.DrawString($card.Body, $fonts.Body, $inkBrush, (New-Object System.Drawing.RectangleF 100, ($top + 85), 790, 90), $format)
      $top += 220
    }
    $graphics.DrawString($Note, $fonts.Small, $inkBrush, (New-Object System.Drawing.RectangleF 70, 1290, 860, 100), $format)
    $graphics.DrawString('Le guide complet sur ecobalcon.com', $fonts.Heading, $greenBrush, 70, 1420)
    $bitmap.Save((Join-Path $PSScriptRoot $FileName), [System.Drawing.Imaging.ImageFormat]::Png)
  } finally {
    foreach ($font in $fonts.Values) { $font.Dispose() }
    $format.Dispose()
    $greenBrush.Dispose(); $inkBrush.Dispose(); $softBrush.Dispose(); $whiteBrush.Dispose()
    $graphics.Dispose(); $bitmap.Dispose()
  }
}

Write-Poster -FileName 'pluie-sans-gouttiere.png' -Title "Pluie sans gouttière : combien récupérer ?" -Subtitle "Même averse de 10 mm, deux surfaces de collecte très différentes." -Cards @(
  @{ Heading = 'Ouverture de 20 cm de diamètre'; Body = 'Environ 0,3 litre avant pertes.' },
  @{ Heading = 'Surface horizontale de 50 × 50 cm'; Body = '2,5 litres avant pertes.' },
  @{ Heading = 'La règle pour estimer'; Body = 'Litres = pluie (mm) × surface (m²).' }
) -Note "Calculs théoriques. Le vent, les fuites et les éclaboussures diminuent la collecte."

Write-Poster -FileName 'balcon-octobre.png' -Title "Que planter sur ton balcon en octobre ?" -Subtitle "Choisis selon la lumière et le froid chez toi, avant de remplir tous tes pots." -Cards @(
  @{ Heading = 'Balcon doux et lumineux'; Body = "Une mâche adaptée aux semis d’automne." },
  @{ Heading = 'Le froid arrive tôt'; Body = "Des plants de salades d’hiver, à protéger." },
  @{ Heading = 'Tu préfères des fleurs'; Body = "Pensées ou violas prévues pour l’automne." }
) -Note "France métropolitaine. Vérifie la variété, la météo et le drainage du contenant."

Write-Output 'Deux visuels PNG de 1000 × 1500 px générés.'
