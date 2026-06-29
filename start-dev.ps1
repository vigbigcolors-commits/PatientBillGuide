# PatientBillGuide — Astro dev server
# Double-click or run:  .\start-dev.ps1

Set-Location $PSScriptRoot

if (-not (Test-Path "node_modules")) {
  Write-Host "Installing dependencies..." -ForegroundColor Cyan
  npm install
}

# Kill ALL stale Astro servers (old CSS = wrong layout)
Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue |
  Where-Object { $_.LocalPort -in 4321, 4322, 4323, 4324 } |
  ForEach-Object {
    Write-Host "Stopping old server on port $($_.LocalPort) (PID $($_.OwningProcess))..." -ForegroundColor Yellow
    Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue
  }
Start-Sleep -Seconds 1

Write-Host ""
Write-Host "  PatientBillGuide dev server" -ForegroundColor Cyan
Write-Host "  ONLY use this URL:" -ForegroundColor Green
Write-Host "  http://localhost:4321/" -ForegroundColor Green -BackgroundColor DarkGray
Write-Host ""
Write-Host "  Do NOT use Go Live. Hard refresh: Ctrl+Shift+R" -ForegroundColor DarkGray
Write-Host "  Press Ctrl+C to stop." -ForegroundColor DarkGray
Write-Host ""

npm run dev
