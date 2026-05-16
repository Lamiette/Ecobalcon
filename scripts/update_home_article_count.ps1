$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$articlesDir = Join-Path $root "articles"
$homePath = Join-Path $root "index.html"

if (-not (Test-Path $articlesDir)) {
  throw "Dossier articles introuvable: $articlesDir"
}

if (-not (Test-Path $homePath)) {
  throw "Page d'accueil introuvable: $homePath"
}

$articleCount = @(
  Get-ChildItem -Path $articlesDir -Directory |
    Where-Object { Test-Path (Join-Path $_.FullName "index.html") }
).Count

$html = Get-Content -Raw -Encoding UTF8 $homePath
$pattern = '(<span class="mini-stat-label">Guides utiles</span>\s*<strong>)(\d+)(</strong>)'

if (-not [regex]::IsMatch($html, $pattern)) {
  throw "Compteur Guides utiles introuvable dans index.html"
}

$updatedHtml = [regex]::Replace($html, $pattern, "`${1}$articleCount`${3}", 1)

if ($updatedHtml -ne $html) {
  Set-Content -Path $homePath -Value $updatedHtml -Encoding UTF8
  Write-Output "Updated homepage article count: $articleCount"
} else {
  Write-Output "Homepage article count already up to date: $articleCount"
}
