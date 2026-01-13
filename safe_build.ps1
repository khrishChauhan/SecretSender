$ErrorActionPreference = "Stop"

$source = "C:\Users\KHRISH CHAUHAN\OneDrive\Desktop\Coding\next\MysteryMessage\mysterymessage"
$dest = "C:\Projects\mysterymessage_build"

Write-Host "1. Preparing build directory: $dest" -ForegroundColor Cyan
if (Test-Path $dest) {
    Remove-Item -Recurse -Force $dest -ErrorAction SilentlyContinue
}
New-Item -ItemType Directory -Path $dest -Force | Out-Null

Write-Host "2. Copying source files (excluding node_modules/git)..." -ForegroundColor Cyan
# Using robocopy for robustness. 
# /E = recursive, /XD = exclude directories, /R:2 /W:1 = retries
$robocopyArgs = @(
    "`"$source`"",
    "`"$dest`"",
    "/E",
    "/XD", ".git", ".next", "node_modules", ".vscode", ".idea",
    "/R:2", "/W:1"
)
$p = Start-Process robocopy -ArgumentList $robocopyArgs -Wait -PassThru -NoNewWindow

# Robocopy exit codes 0-7 are successful
if ($p.ExitCode -ge 8) { 
    Write-Error "Copy failed with code $($p.ExitCode)"
    exit 1 
}

Write-Host "3. Installing dependencies in build folder..." -ForegroundColor Cyan
Set-Location $dest
# Use cmd /c to ensure npm is found and runs correctly
cmd /c "npm install"

if ($LASTEXITCODE -ne 0) {
    Write-Error "npm install failed"
    exit 1
}

Write-Host "4. Running build..." -ForegroundColor Cyan
cmd /c "npm run build"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ BUILD SUCCESSFUL!" -ForegroundColor Green
    Write-Host "You can verify the production build by running: npm start" -ForegroundColor Green
} else {
    Write-Error "❌ Build failed"
}
