import { Vector, DrawProps } from "../constants/types";
import { BallSpeed } from '../constants/setup';
export enum Direction {
    none,
    up,
    down
}

export class Ball {

    constructor(
        private ballDiameter: number,
        private position: Vector,
        private ballSpeed: Vector
    ) {
        this.ballDiameter = ballDiameter;
        this.position = position;
        this.ballSpeed = {
            x: ballSpeed.x,
            y: ballSpeed.y
        }
    }

    // Getters
    get diameter(): number {
        return this.ballDiameter;
    }

    get pos(): Vector {
        return this.position;
    }

    get speed(): Vector {
        return this.ballSpeed;
    }

    // Setters
    set diameter(diameter: number) {
        this.ballDiameter = diameter;
    }

    set pos(pos: Vector) {
        this.position = pos;
    }

    set speed(speed: Vector) {
        this.ballSpeed = speed;
    }

    draw({ ctx }: DrawProps) {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.strokeStyle = "white";
        ctx.arc(this.position.x, this.position.y, this.diameter, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    changeYDirection(d: Direction, s?: BallSpeed): void {
        if (d === Direction.up)
            this.pos.y -= this.ballDiameter;
        if (d == Direction.down)
            this.pos.y += this.ballDiameter;
        if (s) {
            let sign = Math.sign(this.ballSpeed.y);
            this.ballSpeed.y = s*-sign;
        }
        else
            this.ballSpeed.y = -this.ballSpeed.y;
    }

    changeXDirection(): void {
        this.ballSpeed.x = -this.ballSpeed.x;
    }

    moveBall(): void {
        this.pos.x += this.ballSpeed.x;
        this.pos.y += this.ballSpeed.y;
    }
}