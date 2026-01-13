@echo off
echo ================================================
echo Clash Royale Clone - Clean Deployment
echo ================================================
echo.
echo This script will:
echo 1. Clean build folders
echo 2. Reinstall dependencies
echo 3. Test build locally
echo 4. Commit all changes
echo 5. Force push to GitHub
echo.
echo Press any key to continue...
pause > nul

echo.
echo [1/5] Cleaning node_modules and dist folders...
if exist node_modules rmdir /s /q node_modules
if exist dist rmdir /s /q dist

echo.
echo [2/5] Installing dependencies...
call npm install

if %ERRORLEVEL% neq 0 (
    echo.
    echo ERROR: npm install failed!
    echo Please check if Node.js is installed.
    pause
    exit /b 1
)

echo.
echo [3/5] Building project...
call npm run build

if %ERRORLEVEL% neq 0 (
    echo.
    echo ERROR: Build failed!
    echo Please check TypeScript errors above.
    pause
    exit /b 1
)

echo.
echo [4/5] Preparing Git commit...
git add .
git commit -m "Clean deployment: rebuilt project for GitHub Pages"

echo.
echo [5/5] Force pushing to GitHub...
git push origin main --force

if %ERRORLEVEL% neq 0 (
    echo.
    echo ERROR: Push failed!
    echo Please check your internet connection and GitHub login.
    pause
    exit /b 1
)

echo.
echo ================================================
echo SUCCESS! Deployment started.
echo ================================================
echo.
echo Next steps:
echo.
echo 1. Check GitHub Actions (1-2 minutes):
echo    https://github.com/woodragon-KR1/clash-royale-clone/actions
echo.
echo 2. When you see green check, visit:
echo    https://woodragon-kr1.github.io/clash-royale-clone/
echo.
echo 3. Press Ctrl + Shift + R in browser to refresh
echo.
echo ================================================
pause
