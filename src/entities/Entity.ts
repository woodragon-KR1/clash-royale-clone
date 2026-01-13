export enum Team {
    PLAYER = 'PLAYER',
    ENEMY = 'ENEMY'
}

export abstract class Entity {
    x: number;
    y: number;
    team: Team;
    hp: number;
    maxHp: number;
    hitRadius: number;
    isAlive: boolean = true;

    constructor(x: number, y: number, team: Team, hp: number, hitRadius: number = 20) {
        this.x = x;
        this.y = y;
        this.team = team;
        this.hp = hp;
        this.maxHp = hp;
        this.hitRadius = hitRadius;
    }

    takeDamage(damage: number): void {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.hp = 0;
            this.isAlive = false;
        }
    }

    distanceTo(other: Entity): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    abstract update(deltaTime: number, entities: Entity[]): void;
    abstract render(ctx: CanvasRenderingContext2D): void;
}
