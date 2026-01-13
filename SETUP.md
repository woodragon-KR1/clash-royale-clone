# 🎮 Clash Royale Clone - Setup Guide

## ⚠️ Important: This project MUST be run through Vite's dev server

This project uses **TypeScript** and **ES Modules**, which cannot be run by simply opening `index.html` in a browser. You must use the Vite development server.

## 🚀 Setup Instructions

### Step 1: Install Node.js and npm
Make sure you have Node.js (v14+) and npm installed on your system.

Check if installed:
```bash
node --version
npm --version
```

If not installed, download from: [https://nodejs.org/](https://nodejs.org/)

### Step 2: Navigate to Project Directory
```bash
cd C:\Users\woodragon\.gemini\antigravity\scratch\clash-royale-clone
```

### Step 3: Install Dependencies
```bash
npm install
```

This will install:
- `vite` - Fast development server and build tool
- `typescript` - TypeScript compiler

### Step 4: Run Development Server
```bash
npm run dev
```

The terminal will show a URL (typically `http://localhost:5173`). Open this URL in your web browser.

### Step 5: Play the Game!
1. Click **Start Game** button
2. Wait for elixir to accumulate
3. Click a card (Knight, Archer, or Giant)
4. Click on your half of the arena to spawn units
5. Destroy the enemy King Tower to win!

## 🏗️ Build for Production (Optional)

To create optimized production files:

```bash
npm run build
```

This creates a `dist/` folder with compiled files that can be deployed to any web server.

Preview the production build:
```bash
npm run preview
```

## ❌ Why Opening index.html Directly Doesn't Work

1. **TypeScript files** - Browsers cannot execute `.ts` files natively. Vite compiles them to JavaScript on the fly.
2. **ES Modules** - Modern import/export syntax requires a proper server to resolve module paths.
3. **file:// protocol** - Has security restrictions that prevent module loading.

## 📝 Project Technologies

- **Vite**: Lightning-fast dev server with Hot Module Replacement (HMR)
- **TypeScript**: Type-safe JavaScript for robust code
- **HTML5 Canvas**: Hardware-accelerated rendering
- **CSS3**: Modern styling with animations

## 🎯 Game Features

- 3 Unit Types (Knight, Archer, Giant)
- Elixir Management System
- AI Opponent
- Tower Defense Mechanics
- Real-time Strategy Gameplay
- Mobile-Responsive Design

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Try a different port
npm run dev -- --port 3000
```

**Dependencies not installing?**
```bash
# Clear npm cache
npm cache clean --force
npm install
```

**TypeScript errors?**
```bash
# Reinstall TypeScript
npm install typescript@latest --save-dev
```

## 📱 Mobile Testing

The game supports touch controls. To test on mobile:

1. Find your computer's local IP address
2. Run `npm run dev -- --host`
3. Open the displayed URL on your mobile device (must be on same network)

## 🎮 Controls

**Desktop**: Click to select cards, click arena to deploy
**Mobile**: Tap to select cards, tap arena to deploy

Enjoy the game! 🏆
