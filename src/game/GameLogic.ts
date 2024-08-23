import { MAX_LEVELS, BRICK_PADDING, BrickCollision, Level, STAGE_COLS, STAGE_PADDING, BrickColor, BrickEnergy, BrickValue } from '../constants/setup';
import { GAME_WIDTH, GAME_HEIGHT, BALL_SIZE, BALL_STARTX, BALL_STARTY, BALL_SPEED, BALLS_GAME, BRICK_WIDTH, BRICK_HEIGHT, PADDLE_SPEED, PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_STARTX, PADDLE_STARTY } from '../constants/setup';
import { ScoreBoard } from '../components/ScoreBoard';
import { Ball } from '../components/Ball';
import { Brick } from '../components/Brick';
import { Paddle } from '../components/Paddle';
import { Message } from '../components/Message';
import { DrawProps } from '../constants/types';

interface DrawArgs {
    ctx: CanvasRenderingContext2D;    
};

enum GameState {
    stopped = 0,
    running = 1,
    start = 2,
    over = 3
}
export class GameLogic {
    private score: number = 0;
    private balls: number = BALLS_GAME;
    private level: number = 1;
    private state: GameState = GameState.stopped;
    private scoreBoard = new ScoreBoard(GAME_WIDTH, 30, { x: 0, y: 380 });
    private ball: Ball = new Ball(BALL_SIZE, { x: BALL_STARTX, y: BALL_STARTY }, BALL_SPEED);
    private bricks: Brick[] = this.createBricks();
    private paddle: Paddle = new Paddle(PADDLE_WIDTH, PADDLE_HEIGHT, { x: PADDLE_STARTX, y: PADDLE_STARTY }, "white", PADDLE_SPEED);
    private message: Message = new Message(GAME_WIDTH, 30, { x: 0, y: 200 });


    createBricks(): Brick[] {
        const Bricks: number[] = Level[this.level-1];
        return Bricks.reduce((ack, element, i) => {
            const row = Math.floor((i) / STAGE_COLS);
            const col = i % STAGE_COLS;
            const x = STAGE_PADDING + col * (BRICK_WIDTH + BRICK_PADDING);
            const y = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING);
            // console.log(row + " " + col + " " + x + " " + y);
            if (element === 0) return ack;

            return [
                ...ack,
                new Brick(
                    BRICK_WIDTH,
                    BRICK_HEIGHT,
                    { x, y },
                    BrickColor[element],
                    BrickEnergy[element],
                    BrickValue[element]
                )
            ]
        }, [] as Brick[])
    }

    handleKeyDown = (e: KeyboardEvent): void => {
        if (this.state !== GameState.running) {
            if (e.code === "Space" || e.key === "Space") {
                if (this.state === GameState.over) {
                    this.state = GameState.start;
                    this.startGame();
                } else {
                    this.ball.pos = { x: BALL_STARTX, y: BALL_STARTY };
                    this.state = GameState.running;
                }
            }
        }
    };

    public constructor() {
        document.addEventListener('keydown', this.handleKeyDown);
        this.state = GameState.start;
        this.startGame();
    }

    startGame() {
        console.log('start game');
        this.level = 1;
        this.scoreBoard.level = this.level;
        this.ball.pos = { x: BALL_STARTX, y: BALL_STARTY };
        this.paddle.pos = { x: PADDLE_STARTX, y: PADDLE_STARTY };
        this.balls = BALLS_GAME;
        this.scoreBoard.balls = this.balls;
        this.score = 0;
        this.scoreBoard.score = this.score;
        this.message.message = "Press Space to Start the Game";
        this.message.visible = true;
        this.bricks = this.createBricks();


        //const messageLoop = () => {
        //    console.log('run game');


        //};
        //useInterval(messageLoop, 100);

        return {  };
    }


    isHitBrick (ball: Ball, brick: Brick): boolean {
        if (
            ball.pos.x < brick.pos.x + brick.width &&
            ball.pos.x + ball.diameter > brick.pos.x &&
            ball.pos.y < brick.pos.y + brick.height &&
            ball.pos.y + ball.diameter > brick.pos.y
        ) {
            return true;
        }
        return false;
    }

    checkBricksCollision (ball: Ball, bricks: Brick[]): BrickCollision {
        const collision: BrickCollision = {hit: false, value: 0};
        bricks.forEach((brick, i) => {
            if (this.isHitBrick(ball, brick)) {
                ball.changeYDirection();
                bricks.splice(i, 1);
                collision.value = brick.value;
                collision.hit = true;
            }
        })
        return collision;
    }

    checkBallCollision (ball: Ball, paddle: Paddle): boolean {
        // Check paddle hit
        if (
            ball.pos.x - ball.diameter >= paddle.pos.x &&
            ball.pos.x + ball.diameter <= paddle.pos.x + paddle.width &&
            ball.pos.y + ball.diameter === paddle.pos.y
        ) {
            ball.changeYDirection();
            return true;
        }
        // check wall hit
        if (ball.pos.x > GAME_WIDTH - ball.diameter || ball.pos.x < 0) {
            ball.changeXDirection();
            return true;
        }
        // check top
        if (ball.pos.y < 0 + ball.diameter) {
            ball.changeYDirection();
            return true;
        }
        return false;
    }

    gameLoop() {
        //console.log('run game');
        if (this.state !== GameState.over && this.state !== GameState.start) {
            if ((this.paddle.isMovingLeft && this.paddle.pos.x > 0) ||
                (this.paddle.isMovingRight && this.paddle.pos.x < GAME_WIDTH - this.paddle.width)) {
                this.paddle.movePaddle();
            }
        }
        if (this.state == GameState.running) {
            this.ball.moveBall();
            if (!this.checkBallCollision(this.ball, this.paddle)) {
                const collision: BrickCollision = this.checkBricksCollision(this.ball, this.bricks);
                if (collision.hit) {
                    this.score += collision.value;
                    this.scoreBoard.score = this.score;
                    if (this.bricks.length <= 0) {
                        this.ball.pos = { x: BALL_STARTX, y: BALL_STARTY };
                        this.ball.speed = { x: BALL_SPEED, y: BALL_SPEED };
                        if (this.level < MAX_LEVELS) {
                            this.message.message = `Level Completed Press Space to Resume`;
                            this.message.visible = true;
                            this.state = GameState.stopped;
                            this.level++;
                            this.scoreBoard.level = this.level;
                            this.bricks = this.createBricks();
                        } else {
                            this.message.message = `Winner!`;
                            this.message.visible = true;
                            this.state = GameState.over;
                        }
                    }
                }
            }
            if ((this.state !== GameState.stopped) && (this.state !== GameState.over)) {
                if (this.ball.pos.y > GAME_HEIGHT + this.ball.diameter) {
                    this.state = GameState.stopped;
                    this.balls--;
                    this.scoreBoard.balls = this.balls;
                    if (this.balls == 0) {
                        this.message.message = `Game Over`;
                        this.state = GameState.over;

                    } else {
                        this.message.message = `Ball ${this.balls}`;
                    }
                    this.message.visible = true;
                }
                else {
                    this.message.visible = false;
                }
            }
        }
    };

    drawGame ({ ctx }: DrawArgs) {
        const obj: DrawProps = { ctx: ctx };
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        this.gameLoop();

        //console.log("Draw Game");
        this.scoreBoard.draw(obj);
        this.ball.draw(obj);
        this.bricks.forEach(item => item.draw(obj));
        this.paddle.draw(obj);
        this.message.draw(obj);
    }
}