import { Vector, DrawProps } from "../constants/types";

export class Brick {

    constructor(
        private brickWidth: number,
        private brickHeight: number,
        private position: Vector,
        private color: string,
        private brickEnergy: number,
        private brickValue: number
    ) {
        this.brickWidth = brickWidth;
        this.brickHeight = brickHeight;
        this.position = position;
        this.color = color;
        this.brickEnergy = brickEnergy;
        this.brickValue = brickValue;
    }

    // Getters
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
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}