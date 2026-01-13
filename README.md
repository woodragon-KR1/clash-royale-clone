# 🎮 Clash Royale Clone

<div align="center">

![Clash Royale Clone](https://img.shields.io/badge/Game-Clash%20Royale%20Clone-purple?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**실시간 전략 웹 게임 | PC & Mobile 지원**

[🎮 Play Now](https://YOUR_USERNAME.github.io/clash-royale-clone/) | [📖 Documentation](#-features) | [🚀 Deployment](#-deployment)

</div>

---

## ✨ Features

- 🎯 **실시간 1v1 전투**: AI 상대와 즉시 대결
- 🏰 **킹타워 메커니즘**: 피격 시 활성화되는 전략적 시스템
- ⚔️ **3가지 유닛 타입**: Knight, Archer, Giant
- 💎 **엘릭서 시스템**: 전략적 자원 관리
- 📱 **모바일 최적화**: 터치 컨트롤 완벽 지원
- 🎨 **현대적 UI**: 글래스모피즘 & 그라디언트 디자인
- ⚡ **60 FPS**: 부드러운 게임플레이

## 🎯 How to Play

1. **Start Game** 버튼 클릭
2. 엘릭서가 충전될 때까지 대기
3. 카드를 선택하고 경기장에 배치
4. 적의 킹타워를 파괴하여 승리!

### 🃏 Units

| 유닛 | 엘릭서 | 설명 |
|------|--------|------|
| ⚔️ **Knight** | 3 | 균형잡힌 근접 탱커 |
| 🏹 **Archer** | 2 | 빠른 사이클 원거리 유닛 |
| 💪 **Giant** | 5 | 최강 탱커, 건물 우선 공격 |

## 🚀 Quick Start

### Play Online

게임을 바로 플레이하세요:
```
https://YOUR_USERNAME.github.io/clash-royale-clone/
```

### Run Locally

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/clash-royale-clone.git
cd clash-royale-clone

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🛠️ Tech Stack

- **Frontend**: HTML5 Canvas, TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 with animations
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
clash-royale-clone/
├── src/
│   ├── main.ts           # Entry point
│   ├── Game.ts           # Game loop & state
│   ├── style.css         # Styling
│   └── entities/
│       ├── Entity.ts     # Base class
│       ├── Tower.ts      # Tower entities
│       └── Unit.ts       # Unit entities
├── index.html            # Main HTML
├── vite.config.ts        # Vite configuration
└── .github/
    └── workflows/
        └── deploy.yml    # Auto-deployment
```

## 🎮 Game Mechanics

### 🏰 Towers
- **Princess Tower**: 2500 HP, 120 DMG, Always active
- **King Tower**: 4000 HP, 150 DMG, Activates when hit

### ⚔️ Combat System
- Auto-targeting nearest enemy
- Range-based attacks
- Health regeneration (elixir)
- Strategic unit placement

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages.

### Setup

1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Set source to "GitHub Actions"
4. Automatic deployment on every push!

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📝 Documentation

- [📘 Setup Guide](./SETUP.md) - Installation and configuration
- [🐛 Bug Fixes](./BUGFIX.md) - Known issues and solutions
- [⚖️ Balance Changes](./BALANCE_v1.2.md) - Latest balance updates
- [🚀 Deployment Guide](./DEPLOYMENT.md) - GitHub Pages deployment

## 🎯 Roadmap

- [ ] More unit types
- [ ] Spell cards
- [ ] Sound effects
- [ ] Multiplayer support
- [ ] Leaderboard system
- [ ] Tournament mode

## 📱 Mobile Support

The game is fully optimized for mobile devices:
- ✅ Touch controls
- ✅ Responsive design
- ✅ Optimized performance
- ✅ Works on iOS & Android

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - feel free to use this project for learning or personal projects!

## 🙏 Acknowledgments

Inspired by Supercell's Clash Royale

---

<div align="center">

**Made with ❤️ using TypeScript & Vite**

⭐ Star this repo if you enjoyed the game!

</div>
