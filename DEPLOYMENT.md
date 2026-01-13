# 🚀 GitHub Pages 배포 가이드

## 📋 사전 준비

1. **GitHub 계정** 생성 (없다면)
2. **Git 설치** 확인
   ```bash
   git --version
   ```

## 🔧 1단계: Git 저장소 초기화

프로젝트 폴더에서 다음 명령어를 실행하세요:

```bash
cd C:\Users\woodragon\.gemini\antigravity\scratch\clash-royale-clone

# Git 저장소 초기화
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: Clash Royale Clone"
```

## 🌐 2단계: GitHub 저장소 생성

1. **GitHub 웹사이트 접속**: https://github.com
2. **로그인** 후 우측 상단 `+` 버튼 클릭 → `New repository`
3. **저장소 이름**: `clash-royale-clone` (정확히 이 이름으로!)
4. **Public** 선택 (GitHub Pages는 Public 저장소에서 무료)
5. **Create repository** 클릭

## 📤 3단계: 코드 업로드

GitHub에서 제공하는 명령어를 복사하여 실행:

```bash
# 원격 저장소 연결 (YOUR_USERNAME을 본인 GitHub 아이디로 변경)
git remote add origin https://github.com/YOUR_USERNAME/clash-royale-clone.git

# 메인 브랜치로 변경
git branch -M main

# 코드 업로드
git push -u origin main
```

**예시:**
```bash
git remote add origin https://github.com/woodragon/clash-royale-clone.git
git branch -M main
git push -u origin main
```

## ⚙️ 4단계: GitHub Pages 설정

1. GitHub 저장소 페이지에서 **Settings** 탭 클릭
2. 왼쪽 메뉴에서 **Pages** 클릭
3. **Source** 섹션에서:
   - Source: `GitHub Actions` 선택
4. 저장 (자동 저장됨)

## 🚀 5단계: 자동 배포 실행

코드를 push하면 자동으로 배포가 시작됩니다!

1. GitHub 저장소에서 **Actions** 탭 클릭
2. 배포 진행 상황 확인 (1-2분 소요)
3. 완료되면 녹색 체크마크 표시

## 🎮 6단계: 게임 플레이!

배포 완료 후 다음 URL로 접속:

```
https://YOUR_USERNAME.github.io/clash-royale-clone/
```

**예시:**
```
https://woodragon.github.io/clash-royale-clone/
```

이 URL을 **모바일 브라우저**에서도 열면 바로 플레이 가능합니다! 📱

## 📱 모바일 최적화 확인사항

게임이 이미 모바일 최적화되어 있습니다:
- ✅ 터치 이벤트 지원
- ✅ 반응형 디자인
- ✅ viewport 메타 태그 설정
- ✅ 모바일 네트워크 최적화

## 🔄 업데이트 방법

코드를 수정한 후:

```bash
git add .
git commit -m "게임 밸런스 업데이트"
git push
```

push하면 자동으로 재배포됩니다!

## 🐛 문제 해결

### 빌드 실패 시
1. Actions 탭에서 실패한 빌드 클릭
2. 에러 로그 확인
3. 보통 `npm ci` 실패 → `package-lock.json` 커밋 필요

```bash
# package-lock.json 생성
npm install

# 다시 커밋
git add package-lock.json
git commit -m "Add package-lock.json"
git push
```

### 404 에러 발생 시
- `vite.config.ts`의 `base` 경로가 저장소 이름과 일치하는지 확인
- 현재 설정: `/clash-royale-clone/`
- 저장소 이름도 정확히 `clash-royale-clone`이어야 함

### 페이지가 비어있을 때
- Actions 탭에서 배포 완료 확인
- Settings → Pages에서 Source가 `GitHub Actions`인지 확인
- 10분 정도 기다려보기 (첫 배포는 시간이 걸릴 수 있음)

## 📊 배포 상태 확인

**실시간 배포 상태:**
- GitHub 저장소 → **Actions** 탭
- 진행 중: 🟡 노란색 점
- 성공: ✅ 녹색 체크
- 실패: ❌ 빨간색 X

**배포 URL:**
- GitHub 저장소 → **Settings** → **Pages**
- "Your site is live at..." 메시지에 URL 표시

## 🎉 완료!

이제 친구들에게 URL만 공유하면 누구나 플레이할 수 있습니다!

**공유 팁:**
- QR 코드 생성: https://www.qr-code-generator.com/
- 단축 URL: https://bitly.com/
- 모바일 홈 화면에 추가 가능 (PWA처럼 사용)

즐거운 게임 되세요! 🏆
