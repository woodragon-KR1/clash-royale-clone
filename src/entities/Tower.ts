import { Entity, Team } from './Entity';

export enum TowerType {
    KING = 'KING',
    PRINCESS_LEFT = 'PRINCESS_LEFT',
    PRINCESS_RIGHT = 'PRINCESS_RIGHT'
}

export class Tower extends Entity {
    type: TowerType;
    damage: number;
    range: number;
    attackSpeed: number; // attacks per second
    timeSinceLastAttack: number = 0;
    target: Entity | null = null;
    isActive: boolean; // King towers start inactive

    constructor(x: number, y: number, team: Team, type: TowerType) {
        const hp = type === TowerType.KING ? 4000 : 2500;
        super(x, y, team, hp, 40);
        this.type = type;

        // Tower stats based on type
        if (type === TowerType.KING) {
            this.damage = 150;
            this.range = 140;
            this.attackSpeed = 0.8;
            this.isActive = false; // King tower starts inactive
        } else {
            this.damage = 120;
            this.range = 120;
            this.attackSpeed = 1.0;
            this.isActive = true; // Princess towers are always active
        }
    }


    takeDamage(damage: number): void {
        // Activate King Tower when it takes damage
        if (this.type === TowerType.KING && !this.isActive) {
            this.isActive = true;
            console.log(`${this.team} King Tower activated!`);
        }
        super.takeDamage(damage);
    }

    update(deltaTime: number, entities: Entity[]): void {
        // King towers only attack when active
        if (!this.isActive) return;

        this.timeSinceLastAttack += deltaTime;

        // Find target
        if (!this.target || !this.target.isAlive || this.distanceTo(this.target) > this.range) {
            this.target = this.findNearestEnemy(entities);
        }

        // Attack target
        if (this.target && this.timeSinceLastAttack >= 1 / this.attackSpeed) {
            this.target.takeDamage(this.damage);
            this.timeSinceLastAttack = 0;
        }
    }

    findNearestEnemy(entities: Entity[]): Entity | null {
        let nearest: Entity | null = null;
        let minDistance = this.range;

        for (const entity of entities) {
            if (entity !== this && entity.isAlive && entity.team !== this.team) {
                const distance = this.distanceTo(entity);
                if (distance <= this.range && distance < minDistance) {
                    minDistance = distance;
                    nearest = entity;
                }
            }
        }

        return nearest;
    }

    render(ctx: CanvasRenderingContext2D): void {
        // Tower body - gray if inactive King Tower
        const isInactiveKing = this.type === TowerType.KING && !this.isActive;
        if (isInactiveKing) {
            ctx.fillStyle = this.team === Team.PLAYER ? '#6b7280' : '#9ca3af';
        } else {
            ctx.fillStyle = this.team === Team.PLAYER ? '#3b82f6' : '#ef4444';
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.hitRadius, 0, Math.PI * 2);
        ctx.fill();

        // Tower roof (triangle crown)
        if (isInactiveKing) {
            ctx.fillStyle = this.team === Team.PLAYER ? '#4b5563' : '#6b7280';
        } else {
            ctx.fillStyle = this.team === Team.PLAYER ? '#1d4ed8' : '#b91c1c';
        }
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - this.hitRadius - 15);
        ctx.lineTo(this.x - this.hitRadius * 0.8, this.y - this.hitRadius);
        ctx.lineTo(this.x + this.hitRadius * 0.8, this.y - this.hitRadius);
        ctx.closePath();
        ctx.fill();

        // HP Bar
        this.renderHealthBar(ctx);

        // King tower special marker
        if (this.type === TowerType.KING) {
            ctx.fillStyle = isInactiveKing ? '#9ca3af' : '#fbbf24';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            // Show sleeping emoji if inactive, crown if active
            ctx.fillText(isInactiveKing ? '😴' : '👑', this.x, this.y + 5);
        }
    }

    renderHealthBar(ctx: CanvasRenderingContext2D): void {
        const barWidth = 50;
        const barHeight = 5;
        const barX = this.x - barWidth / 2;
        const barY = this.y + this.hitRadius + 5;

        // Background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(barX, barY, barWidth, barHeight);

        // Health
        const healthPercent = this.hp / this.maxHp;
        ctx.fillStyle = healthPercent > 0.5 ? '#10b981' : healthPercent > 0.25 ? '#f59e0b' : '#ef4444';
        ctx.fillRect(barX, barY, barWidth * healthPercent, barHeight);

        // Border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, barY, barWidth, barHeight);
    }
}
