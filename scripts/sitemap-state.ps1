# Keep static-page dates tied to content changes, including across rebuilds before a commit.
function Get-SitemapContentHash {
  param([string]$content)
  $normalized = ($content -replace "`r`n", "`n").Trim([char]0xFEFF).Trim()
  $normalized = $normalized -replace '>\s+<', '><'
  $sha = [System.Security.Cryptography.SHA256]::Create()
  try {
    return ([BitConverter]::ToString($sha.ComputeHash([Text.Encoding]::UTF8.GetBytes($normalized)))).Replace('-', '').ToLowerInvariant()
  } finally { $sha.Dispose() }
}

function Read-SitemapPageState {
  param([string]$path)
  $state = [ordered]@{}
  if (Test-Path -LiteralPath $path) {
    $saved = Get-Content -LiteralPath $path -Raw -Encoding UTF8 | ConvertFrom-Json
    foreach ($property in $saved.PSObject.Properties) {
      $state[$property.Name] = [ordered]@{
        Hash = [string]$property.Value.Hash
        Lastmod = [string]$property.Value.Lastmod
      }
    }
  }
  return ,$state
}

function Get-SitemapPageLastmod {
  param([string]$rootPath, [string]$relativePath, [System.Collections.IDictionary]$state)
  $key = $relativePath.Replace('\', '/')
  $fullPath = Join-Path $rootPath $relativePath
  $hash = Get-SitemapContentHash (Get-Content -LiteralPath $fullPath -Raw -Encoding UTF8)
  if ($state.Contains($key) -and $state[$key].Hash -eq $hash) {
    return [string]$state[$key].Lastmod
  }

  $lastmod = ''
  if ($state.Contains($key)) {
    $lastmod = (Get-Date).ToString('yyyy-MM-ddTHH:mm:sszzz')
  } elseif (Get-Command git -ErrorAction SilentlyContinue) {
    # Bootstrap from a matching committed file; never reuse the old rebuild timestamp.
    try {
      $committed = & git -C $rootPath show "HEAD:$key" 2>$null
      if ($LASTEXITCODE -eq 0) {
        $committedHash = Get-SitemapContentHash ($committed -join "`n")
        if ($committedHash -eq $hash) {
          $commitDate = & git -C $rootPath log -1 --format=%cI -- $key
          if ($LASTEXITCODE -eq 0 -and $commitDate) {
            $lastmod = ([DateTimeOffset]::Parse([string]$commitDate)).ToString('yyyy-MM-ddTHH:mm:sszzz')
          }
        } else {
          $lastmod = (Get-Date).ToString('yyyy-MM-ddTHH:mm:sszzz')
        }
      }
    } catch {
      # No trustworthy history: omit lastmod until a subsequent content change.
    }
  }
  $state[$key] = [ordered]@{ Hash = $hash; Lastmod = $lastmod }
  return $lastmod
}

function Write-SitemapPageState {
  param([string]$path, [System.Collections.IDictionary]$state)
  $json = $state | ConvertTo-Json -Depth 4
  [IO.File]::WriteAllText($path, $json + "`r`n", (New-Object Text.UTF8Encoding($false)))
}
