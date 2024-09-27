import { Vector, DrawProps } from "../constants/types";
import { BALLS_GAME } from "../constants/setup";
import i18n from 'i18next';

export class ScoreBoard {
    private scoreTotal: number = 0;
    private ballCount: number = BALLS_GAME;
    private levelValue: number = 1;
    private BORDER: number = 2;
    private BALL_GAP: number = 3;
    private ballSize: number = 5;

    constructor(
        private boardWidth: number,
        private boardHeight: number,
        private position: Vector
    ) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.position = position;
    }

    // Getters
    get score(): number {
        return this.scoreTotal;
    }

    get balls(): number {
        return this.ballCount;
    }

    get level(): number {
        return this.levelValue;
    }

    get width(): number {
        return this.boardWidth;
    }

    get height(): number {
        return this.boardHeight;
    }

    get pos(): Vector {
        return this.position;
    }

    // Setters
    set score(score: number) {
        this.scoreTotal = score;
    }

    set balls(balls: number) {
        this.ballCount = balls;
    }
    set level(level: number) {
        this.levelValue = level;
    }

    set width(width: number) {
        this.boardWidth = width;
    }

    set height(height: number) {
        this.boardHeight = height;
    }

    set pos(pos: Vector) {
        this.position = pos;
    }

    draw({ ctx }: DrawProps) {
        ctx.strokeStyle = "#004161";
        ctx.strokeRect(this.pos.x, this.pos.y, this.width, this.height);

        ctx.font = "12px Arial";
        ctx.fillStyle = 'red';
        let scoreText = i18n.t('score', { score: this.score });
        let m: TextMetrics = ctx.measureText(scoreText);
        ctx.fillText(scoreText, this.position.x + this.BORDER, this.position.y + this.height / 2, m.width);

        const x = (this.width / 2) - ((this.ballSize + this.BALL_GAP) * this.ballCount) / 2 - (this.BORDER * 2);
        for (let i = 0; i < this.ballCount; i++) {
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.strokeStyle = "white";
            ctx.arc(x + (i * this.ballSize * 2), this.position.y + (this.height / 2 - this.ballSize / 2), 3, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        }
        ctx.fillStyle = 'lime';
        const levelText = i18n.t('level', { level: this.level });
        m = ctx.measureText(levelText);
        ctx.fillText(levelText, this.position.x + this.width - m.width - this.BORDER, this.position.y + this.height / 2, m.width);
    }
}