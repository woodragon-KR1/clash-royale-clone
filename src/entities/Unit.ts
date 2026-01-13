import { Entity, Team } from './Entity';

export enum UnitType {
    KNIGHT = 'KNIGHT',
    ARCHER = 'ARCHER',
    GIANT = 'GIANT'
}

export class Unit extends Entity {
    type: UnitType;
    damage: number;
    speed: number;
    attackSpeed: number;
    range: number;
    timeSinceLastAttack: number = 0;
    target: Entity | null = null;
    targetX: number;
    targetY: number;

    constructor(x: number, y: number, team: Team, type: UnitType) {
        let hp: number, damage: number, speed: number, attackSpeed: number, range: number, hitRadius: number;

        // Stats scaled from Clash Royale level 11 values for balanced gameplay
        switch (type) {
            case UnitType.KNIGHT:
                // Balanced melee unit
                hp = 1400;
                damage = 140;
                speed = 50; // pixels per second
                attackSpeed = 1.2;
                range = 35;
                hitRadius = 16;
                break;
            case UnitType.ARCHER:
                // Fast-cycle ranged unit - 2 elixir for versatility
                hp = 350;
                damage = 95;
                speed = 45;
                attackSpeed = 1.2;
                range = 110;
                hitRadius = 13;
                break;
            case UnitType.GIANT:
                // Tank unit that targets buildings
                hp = 2800;
                damage = 180;
                speed = 30;
                attackSpeed = 1.3;
                range = 35;
                hitRadius = 26;
                break;
        }

        super(x, y, team, hp, hitRadius);
        this.type = type;
        this.damage = damage;
        this.speed = speed;
        this.attackSpeed = attackSpeed;
        this.range = range;
        this.targetX = x;
        this.targetY = y;
    }

    update(deltaTime: number, entities: Entity[]): void {
        this.timeSinceLastAttack += deltaTime;

        // Find target
        if (!this.target || !this.target.isAlive) {
            this.target = this.findNearestEnemy(entities);
        }

        if (this.target) {
            const distance = this.distanceTo(this.target);

            if (distance <= this.range) {
                // In attack range, attack
                if (this.timeSinceLastAttack >= 1 / this.attackSpeed) {
                    this.target.takeDamage(this.damage);
                    this.timeSinceLastAttack = 0;
                }
            } else {
                // Move towards target
                this.moveTowards(this.target.x, this.target.y, deltaTime);
            }
        } else {
            // No target, move to enemy base
            const destinationY = this.team === Team.PLAYER ? 100 : 500;
            this.moveTowards(this.x, destinationY, deltaTime);
        }
    }

    moveTowards(targetX: number, targetY: number, deltaTime: number): void {
        const dx = targetX - this.x;
        const dy = targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 5) {
            const moveDistance = this.speed * deltaTime;
            this.x += (dx / distance) * moveDistance;
            this.y += (dy / distance) * moveDistance;
        }
    }

    findNearestEnemy(entities: Entity[]): Entity | null {
        let nearest: Entity | null = null;
        let minDistance = Infinity;

        for (const entity of entities) {
            if (entity !== this && entity.isAlive && entity.team !== this.team) {
                // Giants prioritize buildings
                if (this.type === UnitType.GIANT && entity.constructor.name !== 'Tower') {
                    continue;
                }

                const distance = this.distanceTo(entity);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearest = entity;
                }
            }
        }

        return nearest;
    }

    render(ctx: CanvasRenderingContext2D): void {
        // Unit body
        let color: string;
        switch (this.type) {
            case UnitType.KNIGHT:
                color = this.team === Team.PLAYER ? '#8b5cf6' : '#f97316';
                break;
            case UnitType.ARCHER:
                color = this.team === Team.PLAYER ? '#06b6d4' : '#ec4899';
                break;
            case UnitType.GIANT:
                color = this.team === Team.PLAYER ? '#6366f1' : '#dc2626';
                break;
        }

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.hitRadius, 0, Math.PI * 2);
        ctx.fill();

        // Border
        ctx.strokeStyle = this.team === Team.PLAYER ? '#ffffff' : '#000000';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Unit type indicator
        ctx.fillStyle = '#ffffff';
        ctx.font = `${this.hitRadius}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        let emoji = '';
        switch (this.type) {
            case UnitType.KNIGHT:
                emoji = '⚔️';
                break;
            case UnitType.ARCHER:
                emoji = '🏹';
                break;
            case UnitType.GIANT:
                emoji = '💪';
                break;
        }
        ctx.fillText(emoji, this.x, this.y);

        // HP Bar
        this.renderHealthBar(ctx);
    }

    renderHealthBar(ctx: CanvasRenderingContext2D): void {
        const barWidth = this.hitRadius * 2;
        const barHeight = 4;
        const barX = this.x - barWidth / 2;
        const barY = this.y - this.hitRadius - 8;

        // Background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(barX, barY, barWidth, barHeight);

        // Health
        const healthPercent = this.hp / this.maxHp;
        ctx.fillStyle = healthPercent > 0.5 ? '#10b981' : healthPercent > 0.25 ? '#f59e0b' : '#ef4444';
        ctx.fillRect(barX, barY, barWidth * healthPercent, barHeight);
    }
}
