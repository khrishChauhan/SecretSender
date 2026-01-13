$ErrorActionPreference = "Stop"

$source = "C:\Users\KHRISH CHAUHAN\OneDrive\Desktop\Coding\next\MysteryMessage\mysterymessage"
$dest = "C:\Projects\mysterymessage_build"

Write-Host "1. STOPPING ANY RUNNING SERVERS..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*node.exe" } | Stop-Process -Force -ErrorAction SilentlyContinue

Write-Host "2. PREPARING CLEAN BUILD ENVIRONMENT (Bypassing OneDrive)..." -ForegroundColor Cyan
if (-not (Test-Path $dest)) {
    New-Item -ItemType Directory -Path $dest -Force | Out-Null
}

Write-Host "3. SYNCING FILES..." -ForegroundColor Cyan
# Robocopy to sync only changed files (faster than full copy)
$robocopyArgs = @(
    "`"$source`"",
    "`"$dest`"",
    "/E",
    "/XD", ".git", ".next", "node_modules", ".vscode", ".idea",
    "/R:1", "/W:1", "/XO" 
)
$p = Start-Process robocopy -ArgumentList $robocopyArgs -Wait -PassThru -NoNewWindow
# Robocopy 0-7 are success codes
if ($p.ExitCode -ge 8) { Write-Warning "Robocopy encountered issues (Code $($p.ExitCode)), but proceeding..." }

Set-Location $dest

Write-Host "4. INSTALLING DEPENDENCIES..." -ForegroundColor Cyan
if (-not (Test-Path "node_modules")) {
    cmd /c "npm install"
}

Write-Host "5. BUILDING FOR PRODUCTION..." -ForegroundColor Cyan
cmd /c "npm run build"

if ($LASTEXITCODE -ne 0) {
    Write-Error "Build Failed! Check output above."
    exit 1
}

Write-Host "---------------------------------------------------" -ForegroundColor Green
Write-Host "✅ BUILD SUCCESSFUL!" -ForegroundColor Green
Write-Host "🚀 STARTING PRODUCTION SERVER AT http://localhost:3000" -ForegroundColor Green
Write-Host "---------------------------------------------------" -ForegroundColor Green

# Set NODE_ENV for Windows and start
$env:NODE_ENV="production"
cmd /c "npx tsx src/server/server.ts"
