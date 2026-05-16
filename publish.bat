@echo off
setlocal
cd /d "%~dp0"

git pull
if errorlevel 1 exit /b %errorlevel%

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\update_home_article_count.ps1"
if errorlevel 1 exit /b %errorlevel%

git add .
if errorlevel 1 exit /b %errorlevel%

git diff --cached --quiet
if errorlevel 2 exit /b %errorlevel%
if errorlevel 1 (
  git commit -m "publication du site"
  if errorlevel 1 exit /b %errorlevel%
) else (
  echo Aucun changement a committer.
)

git push
if errorlevel 1 exit /b %errorlevel%
