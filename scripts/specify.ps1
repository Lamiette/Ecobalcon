# Lance la version locale de Spec Kit, sans activation de l'environnement Python.
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$specifyExecutable = Join-Path $projectRoot '.venv-spec-kit\Scripts\specify.exe'

if (-not (Test-Path -LiteralPath $specifyExecutable -PathType Leaf)) {
    throw 'Spec Kit manque. Depuis la racine : python -m venv .venv-spec-kit puis .\.venv-spec-kit\Scripts\python.exe -m pip install -r scripts\spec-kit-requirements.txt. Voir SPEC-KIT.md.'
}

Push-Location -LiteralPath $projectRoot
try {
    & $specifyExecutable @args
    $specifyExitCode = $LASTEXITCODE
}
finally {
    Pop-Location
}
exit $specifyExitCode
