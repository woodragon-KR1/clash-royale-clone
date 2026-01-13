import { Entity, Team } from './entities/Entity';
import { Tower, TowerType } from './entities/Tower';
import { Unit, UnitType } from './entities/Unit';

export enum GameState {
    MENU = 'MENU',
    PLAYING = 'PLAYING',
    ENDED = 'ENDED'
}

export class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number = 400;
    height: number = 600;
    state: GameState = GameState.MENU;

    entities: Entity[] = [];
    playerElixir: number = 5;
    maxElixir: number = 10;
    elixirRegenRate: number = 1; // per second

    enemyElixir: number = 5;
    enemyAITimer: number = 0;
    enemyAIInterval: number = 3; // seconds

    lastTime: number = 0;
    selectedCard: UnitType | null = null;
    gameResult: 'victory' | 'defeat' | null = null;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.setupCanvas();
    }

    setupCanvas(): void {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    start(): void {
        this.state = GameState.PLAYING;
        this.entities = [];
        this.playerElixir = 5;
        this.enemyElixir = 5;
        this.gameResult = null;
        this.enemyAITimer = 0;

        // Create towers
        // Player towers (bottom)
        this.entities.push(new Tower(this.width / 2, this.height - 80, Team.PLAYER, TowerType.KING));
        this.entities.push(new Tower(this.width * 0.25, this.height - 160, Team.PLAYER, TowerType.PRINCESS_LEFT));
        this.entities.push(new Tower(this.width * 0.75, this.height - 160, Team.PLAYER, TowerType.PRINCESS_RIGHT));

        // Enemy towers (top)
        this.entities.push(new Tower(this.width / 2, 80, Team.ENEMY, TowerType.KING));
        this.entities.push(new Tower(this.width * 0.25, 160, Team.ENEMY, TowerType.PRINCESS_LEFT));
        this.entities.push(new Tower(this.width * 0.75, 160, Team.ENEMY, TowerType.PRINCESS_RIGHT));

        this.lastTime = performance.now();
        this.gameLoop();
    }

    gameLoop = (): void => {
        if (this.state !== GameState.PLAYING) return;

        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds
        this.lastTime = currentTime;

        this.update(deltaTime);
        this.render();

        requestAnimationFrame(this.gameLoop);
    };

    update(deltaTime: number): void {
        // Regenerate elixir
        this.playerElixir = Math.min(this.maxElixir, this.playerElixir + this.elixirRegenRate * deltaTime);
        this.enemyElixir = Math.min(this.maxElixir, this.enemyElixir + this.elixirRegenRate * deltaTime);

        // Update all entities
        for (const entity of this.entities) {
            if (entity.isAlive) {
                entity.update(deltaTime, this.entities);
            }
        }

        // Remove dead entities
        this.entities = this.entities.filter(e => e.isAlive);

        // Enemy AI
        this.enemyAITimer += deltaTime;
        if (this.enemyAITimer >= this.enemyAIInterval) {
            this.enemyAIAction();
            this.enemyAITimer = 0;
        }

        // Check win/loss conditions
        this.checkGameEnd();
    }

    enemyAIAction(): void {
        const unitTypes = [UnitType.KNIGHT, UnitType.ARCHER, UnitType.GIANT];
        const costs = [3, 2, 5];

        for (let i = 0; i < unitTypes.length; i++) {
            if (this.enemyElixir >= costs[i]) {
                const type = unitTypes[i];
                const cost = costs[i];

                // Random spawn position in enemy territory
                const x = this.width * (0.3 + Math.random() * 0.4);
                const y = this.height * 0.3;

                this.spawnUnit(x, y, Team.ENEMY, type);
                this.enemyElixir -= cost;
                break;
            }
        }
    }

    spawnUnit(x: number, y: number, team: Team, type: UnitType): void {
        this.entities.push(new Unit(x, y, team, type));
    }

    checkGameEnd(): void {
        const playerKingTower = this.entities.find(
            e => e instanceof Tower && e.team === Team.PLAYER && e.type === TowerType.KING
        );
        const enemyKingTower = this.entities.find(
            e => e instanceof Tower && e.team === Team.ENEMY && e.type === TowerType.KING
        );

        if (!playerKingTower || !playerKingTower.isAlive) {
            this.endGame('defeat');
        } else if (!enemyKingTower || !enemyKingTower.isAlive) {
            this.endGame('victory');
        }
    }

    endGame(result: 'victory' | 'defeat'): void {
        this.state = GameState.ENDED;
        this.gameResult = result;

        // Trigger UI update
        const event = new CustomEvent('gameEnd', { detail: { result } });
        window.dispatchEvent(event);
    }

    render(): void {
        // Clear canvas
        this.ctx.fillStyle = '#1a4d2e';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Draw river (middle line)
        this.ctx.fillStyle = '#4682b4';
        this.ctx.fillRect(0, this.height / 2 - 20, this.width, 40);

        // Draw bridges
        this.ctx.fillStyle = '#8b7355';
        this.ctx.fillRect(this.width * 0.2, this.height / 2 - 15, this.width * 0.2, 30);
        this.ctx.fillRect(this.width * 0.6, this.height / 2 - 15, this.width * 0.2, 30);

        // Render all entities
        for (const entity of this.entities) {
            if (entity.isAlive) {
                entity.render(this.ctx);
            }
        }

        // Update UI
        this.updateUI();
    }

    updateUI(): void {
        // Update player elixir
        const playerElixirFill = document.getElementById('player-elixir') as HTMLElement;
        const elixirCount = document.getElementById('elixir-count') as HTMLElement;
        if (playerElixirFill && elixirCount) {
            const percent = (this.playerElixir / this.maxElixir) * 100;
            playerElixirFill.style.width = `${percent}%`;
            elixirCount.textContent = `${Math.floor(this.playerElixir)}/${this.maxElixir}`;
        }

        // Update enemy elixir
        const enemyElixirFill = document.getElementById('enemy-elixir') as HTMLElement;
        if (enemyElixirFill) {
            const percent = (this.enemyElixir / this.maxElixir) * 100;
            enemyElixirFill.style.width = `${percent}%`;
        }

        // Update card availability
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const cost = parseInt(card.getAttribute('data-cost') || '0');
            if (this.playerElixir >= cost) {
                card.classList.remove('disabled');
            } else {
                card.classList.add('disabled');
            }
        });
    }

    handleCanvasClick(x: number, y: number): void {
        console.log('Canvas clicked at:', x, y, 'Selected card:', this.selectedCard);

        if (!this.selectedCard) {
            console.log('No card selected');
            return;
        }

        // Get canvas bounds
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;

        const canvasX = x * scaleX;
        const canvasY = y * scaleY;

        console.log('Canvas coordinates:', canvasX, canvasY, 'Canvas height:', this.height);

        // Only allow spawning in player's half
        if (canvasY < this.height * 0.5) {
            console.log('Spawn blocked: not in player half');
            return;
        }

        // Get card cost
        const costs: { [key in UnitType]: number } = {
            [UnitType.KNIGHT]: 3,
            [UnitType.ARCHER]: 2,
            [UnitType.GIANT]: 5
        };

        const cost = costs[this.selectedCard];
        console.log('Spawn attempt - Cost:', cost, 'Available elixir:', this.playerElixir);

        if (this.playerElixir >= cost) {
            console.log('Spawning unit:', this.selectedCard, 'at', canvasX, canvasY);
            this.spawnUnit(canvasX, canvasY, Team.PLAYER, this.selectedCard);
            this.playerElixir -= cost;
            this.selectedCard = null;

            // Remove visual selection
            document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
        } else {
            console.log('Not enough elixir');
        }
    }

    selectCard(type: UnitType): void {
        console.log('Card selected in Game class:', type);
        this.selectedCard = type;
    }
}
