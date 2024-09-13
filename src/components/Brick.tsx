import { Vector, DrawProps } from "../constants/types";

export class Brick {

    constructor(
        private brickRow: number,
        private brickCol: number,
        private brickWidth: number,
        private brickHeight: number,
        private position: Vector,
        private color: string,
        private brickEnergy: number,
        private brickValue: number
    ) {
        this.brickRow = brickRow,
        this.brickCol = brickCol,
        this.brickWidth = brickWidth;
        this.brickHeight = brickHeight;
        this.position = position;
        this.color = color;
        this.brickEnergy = brickEnergy;
        this.brickValue = brickValue;
    }

    // Getters
    get row(): number {
        return this.brickRow;
    }
    get col(): number {
        return this.brickCol;
    }
    get width(): number {
        return this.brickWidth;
    }

    get height(): number {
        return this.brickHeight;
    }

    get pos(): Vector {
        return this.position;
    }

    get energy(): number {
        return this.brickEnergy;
    }
    get value(): number {
        return this.brickValue;
    }

    // Setters
    set width(width: number) {
        this.brickWidth = width;
    }

    set height(height: number) {
        this.brickHeight = height;
    }

    set pos(pos: Vector) {
        this.position = pos;
    }

    set energy(energy: number) {
        this.brickEnergy = energy;
    }

    set value(value: number) {
        this.brickValue = value;
    }

    draw({ ctx }: DrawProps) {
        ctx.fillStyle = this.color;
        const gradient = ctx.createLinearGradient(this.position.x + this.width/2, this.position.y + this.height, this.position.x + this.width/2, this.position.y-5);
        gradient.addColorStop(0.0, this.color);
        gradient.addColorStop(1.0, "white");
        ctx.fillStyle = gradient;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}