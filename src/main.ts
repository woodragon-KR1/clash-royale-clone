import './style.css';
import { Game } from './Game';
import { UnitType } from './entities/Unit';

let game: Game | null = null;

// DOM Elements
const startScreen = document.getElementById('start-screen') as HTMLElement;
const gameScreen = document.getElementById('game-screen') as HTMLElement;
const endScreen = document.getElementById('end-screen') as HTMLElement;
const startBtn = document.getElementById('start-btn') as HTMLButtonElement;
const restartBtn = document.getElementById('restart-btn') as HTMLButtonElement;
const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const resultText = document.getElementById('result-text') as HTMLElement;

// Initialize game
function init() {
    game = new Game(canvas);

    // Start button
    startBtn.addEventListener('click', () => {
        showScreen('game');
        game?.start();
    });

    // Restart button
    restartBtn.addEventListener('click', () => {
        showScreen('game');
        game?.start();
    });

    // Card selection
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const unitTypeStr = card.getAttribute('data-unit');

            // Convert string to UnitType enum
            let unitType: UnitType;
            switch (unitTypeStr?.toLowerCase()) {
                case 'knight':
                    unitType = UnitType.KNIGHT;
                    break;
                case 'archer':
                    unitType = UnitType.ARCHER;
                    break;
                case 'giant':
                    unitType = UnitType.GIANT;
                    break;
                default:
                    console.error('Unknown unit type:', unitTypeStr);
                    return;
            }

            console.log('Card selected:', unitType);

            // Remove previous selection
            cards.forEach(c => c.classList.remove('selected'));

            // Add selection to clicked card
            card.classList.add('selected');

            game?.selectCard(unitType);
        });
    });

    // Canvas click/touch
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        game?.handleCanvasClick(x, y);
    });

    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        game?.handleCanvasClick(x, y);
    });

    // Game end event
    window.addEventListener('gameEnd', ((e: CustomEvent) => {
        const result = e.detail.result;
        resultText.textContent = result === 'victory' ? '🏆 Victory!' : '💀 Defeat!';
        setTimeout(() => {
            showScreen('end');
        }, 1000);
    }) as EventListener);
}

function showScreen(screen: 'start' | 'game' | 'end') {
    startScreen.classList.add('hidden');
    gameScreen.classList.add('hidden');
    endScreen.classList.add('hidden');

    switch (screen) {
        case 'start':
            startScreen.classList.remove('hidden');
            break;
        case 'game':
            gameScreen.classList.remove('hidden');
            break;
        case 'end':
            endScreen.classList.remove('hidden');
            break;
    }
}

// Start the app
init();
