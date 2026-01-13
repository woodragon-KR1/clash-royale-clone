#!/bin/bash

# Clash Royale Clone - 배포 문제 해결 스크립트

echo "====================================="
echo "GitHub Pages 배포 문제 해결"
echo "====================================="
echo ""

echo "[1/4] package-lock.json 다시 생성 중..."
rm -f package-lock.json
npm install

echo ""
echo "[2/4] 로컬 빌드 테스트 중..."
npm run build

if [ $? -eq 0 ]; then
  echo "✅ 빌드 성공!"
else
  echo "❌ 빌드 실패! package.json을 확인하세요."
  exit 1
fi

echo ""
echo "[3/4] Git에 추가 중..."
git add package-lock.json
git add dist/

echo ""
echo "[4/4] 커밋 및 푸시 중..."
git commit -m "Fix: Regenerate package-lock.json and test build"
git push

echo ""
echo "====================================="
echo "완료! GitHub Actions를 확인하세요:"
echo "https://github.com/woodragon-KR1/clash-royale-clone/actions"
echo "====================================="
