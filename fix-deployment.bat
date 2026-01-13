@echo off
REM Clash Royale Clone - 배포 문제 해결 스크립트

echo =====================================
echo GitHub Pages 배포 문제 해결
echo =====================================
echo.

echo [1/4] package-lock.json 다시 생성 중...
if exist package-lock.json del package-lock.json
call npm install

if %ERRORLEVEL% neq 0 (
    echo ERROR: npm install 실패!
    pause
    exit /b 1
)

echo.
echo [2/4] 로컬 빌드 테스트 중...
call npm run build

if %ERRORLEVEL% neq 0 (
    echo ERROR: 빌드 실패! TypeScript 에러를 확인하세요.
    pause
    exit /b 1
)

echo.
echo [3/4] Git에 추가 중...
git add package-lock.json

echo.
echo [4/4] 커밋 및 푸시 중...
git commit -m "Fix: Regenerate package-lock.json for deployment"
git push

echo.
echo =====================================
echo 완료! 잠시 후 다음을 확인하세요:
echo.
echo 1. GitHub Actions:
echo    https://github.com/woodragon-KR1/clash-royale-clone/actions
echo.
echo 2. 녹색 체크가 뜨면 게임 접속:
echo    https://woodragon-kr1.github.io/clash-royale-clone/
echo =====================================
pause
