@echo off
echo ========================================
echo Clash Royale Clone - Git Setup
echo ========================================
echo.

REM Check if git is installed
where git >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [1/6] Initializing Git repository...
git init
if %ERRORLEVEL% neq 0 (
    echo ERROR: Failed to initialize Git repository
    pause
    exit /b 1
)

echo.
echo [2/6] Adding all files...
git add .

echo.
echo [3/6] Creating initial commit...
git commit -m "Initial commit: Clash Royale Clone v1.2"

echo.
echo ========================================
echo Next Steps:
echo ========================================
echo.
echo 1. Go to GitHub: https://github.com/new
echo 2. Create a new repository named: clash-royale-clone
echo 3. Make it PUBLIC
echo 4. Do NOT initialize with README
echo.
echo 5. Then run these commands (replace YOUR_USERNAME):
echo.
echo    git remote add origin https://github.com/YOUR_USERNAME/clash-royale-clone.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 6. Go to repository Settings ^> Pages
echo 7. Set Source to: GitHub Actions
echo.
echo Your game will be live at:
echo https://YOUR_USERNAME.github.io/clash-royale-clone/
echo.
echo ========================================
pause
