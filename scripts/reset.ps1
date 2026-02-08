# Windows-Safe Project Reset Script
# Stops all Node processes, cleans build artifacts, and reinstalls dependencies

Write-Host "🔄 Starting project reset..." -ForegroundColor Cyan

# 1. Kill all Node processes
Write-Host "Stopping Node processes..." -ForegroundColor Yellow
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue

# 2. Free up ports
Write-Host "Freeing ports 3000 and 3001..." -ForegroundColor Yellow
npx kill-port 3000 3001 2>$null

# 3. Remove build artifacts
Write-Host "Removing .next directory..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

Write-Host "Removing node_modules..." -ForegroundColor Yellow
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue

Write-Host "Removing package-lock.json..." -ForegroundColor Yellow
Remove-Item package-lock.json -ErrorAction SilentlyContinue

# 4. Clean npm cache
Write-Host "Cleaning npm cache..." -ForegroundColor Yellow
npm cache clean --force

# 5. Reinstall dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "✅ Clean completed successfully!" -ForegroundColor Green
Write-Host "Run: npm run dev" -ForegroundColor Cyan
