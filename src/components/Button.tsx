import { Vector, DrawProps } from "../constants/types";
import { Handler } from "../@types/Handler";

export enum ButtonType {
    Left,
    Right
}
export interface ButtonPress {type: ButtonType };
export interface ButtonRelease { type: ButtonType };

export class Button {
    private buttonPress: Handler<ButtonPress>[] = [];
    private buttonRelease: Handler<ButtonRelease>[] = [];

    constructor(
        private buttonWidth: number,
        private buttonHeight: number,
        private position: Vector,
        private buttonType: ButtonType,
    ) {
        this.buttonWidth = buttonWidth;
        this.buttonHeight = buttonHeight;
        this.position = position;
        this.buttonType = buttonType;

        document.addEventListener('touchstart', this.handleStart, { passive: false });
        document.addEventListener("touchmove", this.handleMove, { passive: false });
        document.addEventListener('touchend', this.handleEnd, { passive: false });
        document.addEventListener('touchcancel', this.handleCancel, { passive: false });
    }
    // Getters
    get width(): number {
        return this.buttonWidth;
    }

    get height(): number {
        return this.buttonHeight;
    }

    get pos(): Vector {
        return this.position;
    }

    get type(): ButtonType {
        return this.buttonType;
    }

    // Setters
    set width(width: number) {
        this.buttonWidth = width;
    }

    set height(height: number) {
        this.buttonHeight = height;
    }

    set pos(pos: Vector) {
        this.position = pos;
    }

    draw({ ctx }: DrawProps) {
        const gradient = ctx.createLinearGradient(this.position.x + this.width, this.position.y + this.height, this.position.x, this.position.y - 5);
        gradient.addColorStop(0.3, "blue");
        gradient.addColorStop(1.0, "white");
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.strokeStyle = "white";
        ctx.arc(this.position.x + this.width / 2, this.position.y + this.height / 2, this.width / 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    public onButtonPress(handler: Handler<ButtonPress>) {
        this.buttonPress.push(handler);
    }

    public onButtonRelease(handler: Handler<ButtonRelease>) {
        this.buttonRelease.push(handler);
    }

    handleStart = (evt: TouchEvent): void => {
        const touches: TouchList = evt.targetTouches;

        for (let i = 0; i < touches.length; i++) {

            if ((touches[i].pageX >= this.position.x) && (touches[i].pageX <= this.position.x + this.width) &&
                (touches[i].pageY >= this.position.y - this.height / 2) && (touches[i].pageY <= this.position.y + this.height)) {

                for (let c: number = 0; c < this.buttonPress.length; c++) {
                    let h: Handler<ButtonRelease> = this.buttonPress[c];
                    h({ type: this.buttonType });
                }
            }
            else {
                evt.preventDefault();
            }
        }
    };

    handleEnd = (): void => {

        for (let c: number = 0; c < this.buttonRelease.length; c++) {
            let h: Handler<ButtonRelease> = this.buttonRelease[c];
            h({ type: this.buttonType });
        }
    };

    handleMove = (evt: TouchEvent): void => {
        evt.preventDefault();
    }
    handleCancel = (evt: TouchEvent): void => {
        evt.preventDefault();
    }
}