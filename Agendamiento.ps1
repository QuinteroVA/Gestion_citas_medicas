$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectRoot

# Ensure logs folder exists for troubleshooting hidden processes.
$logsDir = Join-Path $projectRoot "logs"
if (-not (Test-Path $logsDir)) {
  New-Item -ItemType Directory -Path $logsDir | Out-Null
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  exit 1
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  exit 1
}

if (-not (Test-Path (Join-Path $projectRoot "node_modules"))) {
  Start-Process -FilePath "cmd.exe" `
    -ArgumentList "/c npm install > logs\\install.log 2>&1" `
    -WorkingDirectory $projectRoot `
    -WindowStyle Hidden `
    -Wait
}

Start-Process -FilePath "cmd.exe" `
  -ArgumentList "/c node server\\index.js > logs\\api.log 2>&1" `
  -WorkingDirectory $projectRoot `
  -WindowStyle Hidden

Start-Process -FilePath "cmd.exe" `
  -ArgumentList "/c npm run dev > logs\\vite.log 2>&1" `
  -WorkingDirectory $projectRoot `
  -WindowStyle Hidden

Start-Sleep -Seconds 4
Start-Process "http://localhost:5173"