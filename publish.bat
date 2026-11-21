@echo off
setlocal EnableExtensions
cd /d "%~dp0"
if errorlevel 1 exit /b 1

set "ECOBALCON_BRANCH="
for /f "delims=" %%B in ('git branch --show-current 2^>nul') do set "ECOBALCON_BRANCH=%%B"
if not "%ECOBALCON_BRANCH%"=="main" (
  echo ERREUR : publish.bat publie uniquement depuis la branche main.
  echo Aucune publication effectuee. Branche actuelle : "%ECOBALCON_BRANCH%".
  exit /b 1
)

git pull --ff-only --no-rebase --no-autostash origin main
if errorlevel 1 goto :failed

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\update_home_article_count.ps1"
if errorlevel 1 goto :failed

git add .
if errorlevel 1 goto :failed

git diff --cached --quiet
if errorlevel 2 goto :failed
if errorlevel 1 (
  git commit -m "publication du site"
  if errorlevel 1 goto :failed
) else (
  echo Aucun changement a committer.
)

git push origin main
if errorlevel 1 goto :failed

echo Changements envoyes sur origin/main.
exit /b 0

:failed
echo ERREUR : publication interrompue. Les changements locaux sont conserves.
exit /b 1
