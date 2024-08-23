import { Vector, DrawProps } from "../constants/types";

export class Message {
    private messageText: string = "";
    private messageVisible: boolean = false;

    constructor(
        private boardWidth: number,
        private boardHeight: number,
        private position: Vector
    ) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.position = position;
    }

    // Getters`
    get message(): string {
        return this.messageText;
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

    get visible(): boolean {
        return this.messageVisible;
    }

    // Setters
    set message(mesage: string) {
        this.messageText = mesage;
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
    set visible(visible: boolean) {
        this.messageVisible = visible;
    }

    draw({ ctx }: DrawProps) {
        if (this.messageVisible) {
            ctx.fillStyle = 'white';
            ctx.font = "20px Arial";
            const m: TextMetrics = ctx.measureText(this.messageText);
            ctx.fillText(this.messageText, this.position.x + this.width / 2 - m.width / 2, this.position.y + this.height / 2, this.width);
        }
    }
}