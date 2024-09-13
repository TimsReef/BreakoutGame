import { Vector, DrawProps } from "../constants/types";

export class Paddle {
    private moveLeft: boolean;
    private moveRight: boolean;

    constructor(
        private paddleWidth: number,
        private paddleHeight: number,
        private position: Vector,
        private color: string,
        private paddleSpeed: number,
    ) {
        this.paddleWidth = paddleWidth;
        this.paddleHeight = paddleHeight;
        this.position = position;
        this.color = color;
        this.paddleSpeed = paddleSpeed;
        this.moveLeft = false;
        this.moveRight = false;

        // Event Listeners
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    // Getters
    get width(): number {
        return this.paddleWidth;
    }

    get height(): number {
        return this.paddleHeight;
    }

    get pos(): Vector {
        return this.position;
    }

    get speed(): number {
        return this.paddleSpeed;
    }

    get isMovingLeft(): boolean {
        return this.moveLeft;
    }

    get isMovingRight(): boolean {
        return this.moveRight;
    }

    movePaddle(): void {
        if (this.moveLeft) this.pos.x -= this.speed;
        if (this.moveRight) this.pos.x += this.speed;
        console.log("paddle position" + this.pos.x);
    }

    handleKeyUp = (e: KeyboardEvent): void => {
        if (e.code === "ArrowLeft" || e.key === "ArrowLeft") this.moveLeft = false;
        if (e.code === "ArrowRight" || e.key === "ArrowRight") this.moveRight = false;
    };

    handleKeyDown = (e: KeyboardEvent): void => {
        if (e.code === "ArrowLeft" || e.key === "ArrowLeft") this.moveLeft = true;
        if (e.code === "ArrowRight" || e.key === "ArrowRight") this.moveRight = true;
    };

    // Setters
    set width(width: number) {
        this.paddleWidth = width;
    }

    set height(height: number) {
        this.paddleHeight = height;
    }

    set pos(pos: Vector) {
        this.position = pos;
    }

    set speed(speed: number) {
        this.paddleSpeed = speed;
    }

    draw({ ctx }: DrawProps) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.paddleWidth, this.paddleHeight);
    }
}