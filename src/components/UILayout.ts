import { Level, BrickColor, BrickEnergy, BrickValue } from '../constants/setup';
import { BALL_SPEED, PADDLE_SPEED } from '../constants/setup';
import { Vector } from '../constants/types';
import { DrawProps, DrawArgs } from '../constants/types';
import { ScoreBoard } from './ScoreBoard';
import { Message } from './Message';
import { Brick } from './Brick';
import { Paddle } from './Paddle';
import { Ball } from './Ball';

export class UILayout {
    private GAME_WIDTH: number;
    private GAME_HEIGHT: number;
    private STAGE_PADDING: number;
    private STAGE_ROWS:number;
    private STAGE_COLS: number;
    private BRICK_PADDING: number;
    private BRICK_WIDTH: number;
    private BRICK_HEIGHT: number;

    private PADDLE_WIDTH: number;
    private PADDLE_HEIGHT: number;
    private PADDLE_STARTX: number;

    private BALL_SIZE: number;
    private BALL_STARTX: number;

    private SCORE_BOARD_HEIGHT: number;
    private SCORE_BOARD_XPOS: number;

    private MESSAGE_HEIGHT: number;
    private MESSAGE_XPOS: number;

    private gameScoreBoard: ScoreBoard;
    private gameMessage: Message;
    private gamePaddle: Paddle;
    private gameBricks: Brick[];
    private gameBall: Ball;

    constructor(width: number, height: number) {
        console.log("build ui width=" + width + " height=" + height);
        this.GAME_WIDTH = width;
        this.GAME_HEIGHT = height;
        this.STAGE_PADDING = 10;
        this.STAGE_ROWS = 6;
        this.STAGE_COLS = 12;
        this.BRICK_PADDING = 5;
        //this.BRICK_WIDTH = canvas ? Math.floor((canvas.width - this.STAGE_PADDING * 2) / this.STAGE_COLS) - this.BRICK_PADDING : 60;
        //this.BRICK_HEIGHT = canvas ? Math.floor((canvas.height * .25 - this.STAGE_PADDING * 2) / this.STAGE_ROWS) - this.BRICK_PADDING : 10;
        this.BRICK_WIDTH = Math.floor((this.GAME_WIDTH - this.STAGE_PADDING * 2) / this.STAGE_COLS) - this.BRICK_PADDING;
        this.BRICK_HEIGHT = Math.floor((this.GAME_HEIGHT * .25 - this.STAGE_PADDING * 2) / this.STAGE_ROWS) - this.BRICK_PADDING;

        this.SCORE_BOARD_HEIGHT = 30;
        this.SCORE_BOARD_XPOS = 0;
        this.gameScoreBoard = new ScoreBoard(this.GAME_WIDTH, this.SCORE_BOARD_HEIGHT, { x: this.SCORE_BOARD_XPOS, y: this.GAME_HEIGHT - this.SCORE_BOARD_HEIGHT });

        this.MESSAGE_HEIGHT = 30;
        this.MESSAGE_XPOS = 0;
        this.gameMessage = new Message(this.GAME_WIDTH, this.MESSAGE_HEIGHT, { x: this.MESSAGE_XPOS, y: (this.GAME_HEIGHT / 2) - (this.MESSAGE_HEIGHT / 2) });

        this.PADDLE_WIDTH = Math.floor(this.GAME_WIDTH * .10);
        this.PADDLE_HEIGHT = 7;
        this.PADDLE_STARTX = Math.floor(this.GAME_WIDTH / 2 - this.PADDLE_WIDTH / 2);
        this.gamePaddle = new Paddle(this.PADDLE_WIDTH, this.PADDLE_HEIGHT, { x: this.PADDLE_STARTX, y: Math.floor((this.GAME_HEIGHT - this.gameScoreBoard.height) - this.GAME_HEIGHT * .10) }, "white", PADDLE_SPEED);

        this.BALL_SIZE = 5;
        this.BALL_STARTX = Math.floor(this.GAME_WIDTH / 2);
        this.gameBall = new Ball(this.BALL_SIZE, { x: this.BALL_STARTX, y: Math.floor(this.GAME_HEIGHT * .30 - this.STAGE_PADDING * 2) }, BALL_SPEED);
    }

    get gameWidth(): number {
        return this.GAME_WIDTH;
    }
    get gameHeight(): number {
        return this.GAME_HEIGHT;
    }
    get stageCols(): number {
        return this.STAGE_COLS;
    }
    get bricks(): Brick[] {
        return this.gameBricks;
    }

    get paddle(): Paddle {
        return this.gamePaddle;
    }
    get ball() : Ball {
        return this.gameBall;
    }
    get ballSize(): number {
        return this.BALL_SIZE;
    }
    get scoreBoard(): ScoreBoard {
        return this.gameScoreBoard;
    }
    get message(): Message {
        return this.gameMessage;
    }

    resize(w: number, h: number) {
        this.GAME_WIDTH = w;
        this.GAME_HEIGHT = h;

        this.BRICK_WIDTH = Math.floor((this.GAME_WIDTH - this.STAGE_PADDING * 2) / this.STAGE_COLS) - this.BRICK_PADDING;
        this.BRICK_HEIGHT = Math.floor((this.GAME_HEIGHT * .25 - this.STAGE_PADDING * 2) / this.STAGE_ROWS) - this.BRICK_PADDING;

        this.BALL_STARTX = Math.floor(this.GAME_WIDTH / 2);
        this.gameBall.pos.x = Math.floor(this.BALL_STARTX = this.GAME_WIDTH / 2);
        this.gameBall.pos.y = Math.floor(this.GAME_HEIGHT * .3 - this.STAGE_PADDING * 2);

        this.gamePaddle.width = Math.floor(this.GAME_WIDTH * .10);
        this.gamePaddle.pos.x = Math.floor(this.PADDLE_STARTX = Math.floor(this.gameWidth / 2 - this.PADDLE_WIDTH / 2));
        this.gamePaddle.pos.y = Math.floor((this.GAME_HEIGHT - this.gameScoreBoard.height) - this.GAME_HEIGHT * .10);

        this.gameScoreBoard.width = this.GAME_WIDTH;
        this.gameScoreBoard.pos.y = this.GAME_HEIGHT - this.SCORE_BOARD_HEIGHT;

        this.gameMessage.width = this.GAME_WIDTH;
        this.gameMessage.pos.y = (this.GAME_HEIGHT / 2) - (this.MESSAGE_HEIGHT / 2);

        this.resizeBricks();
    }

    resetBallPosition() {
        this.gameBall = new Ball(this.BALL_SIZE, { x: this.BALL_STARTX, y: Math.floor(this.GAME_HEIGHT * .30 - this.STAGE_PADDING * 2) }, BALL_SPEED);
    }
    
    calculateBrickPosition(row: number, col: number): Vector {
        const x = this.STAGE_PADDING + col * (this.BRICK_WIDTH + this.BRICK_PADDING);
        const y = this.STAGE_PADDING + row * (this.BRICK_HEIGHT + this.BRICK_PADDING);
        return { x, y };
    }

    createBricks(level: number): void {
        const Bricks: number[] = Level[level-1];
        this.gameBricks = Bricks.reduce((ack, element, i) => {
            const row = Math.floor((i) / this.stageCols);
            const col = i % this.stageCols;
            const v: Vector = this.calculateBrickPosition(row, col);
            // console.log(row + " " + col + " " + x + " " + y);
            if (element === 0) return ack;

            return [
                ...ack,
                new Brick(
                    row,
                    col,
                    this.BRICK_WIDTH,
                    this.BRICK_HEIGHT,
                    v,
                    BrickColor[element],
                    BrickEnergy[element],
                    BrickValue[element]
                )
            ]
        }, [] as Brick[])
    }

    resizeBricks(): void {
        if (this.gameBricks != undefined) {
            for (let i: number = 0; i < this.gameBricks.length; i++) {
                const v: Vector = this.calculateBrickPosition(this.gameBricks[i].row, this.gameBricks[i].col);
                this.gameBricks[i].pos = v;
                this.gameBricks[i].width = this.BRICK_WIDTH;
                this.gameBricks[i].height = this.BRICK_HEIGHT;
            }
        }
    }

    draw({ ctx }: DrawArgs) {
        const obj: DrawProps = { ctx: ctx };

        ctx.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);

        if (this.gameScoreBoard != undefined)
            this.gameScoreBoard.draw(obj);
        if (this.gameBall != undefined)
            this.gameBall.draw(obj);
        if (this.gameBricks != undefined)
            this.gameBricks.forEach(item => item.draw(obj));
        if (this.gamePaddle != undefined)
            this.gamePaddle.draw(obj);
        if (this.gameMessage != undefined)
            this.gameMessage.draw(obj);
    }
}