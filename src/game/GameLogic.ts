import { MAX_LEVELS, BALL_SPEED, BALLS_GAME, BrickCollision } from '../constants/setup';
import { UILayout } from '../components/UILayout';
import { Ball, Direction } from '../components/Ball';
import { Brick } from '../components/Brick';
import { DrawProps, DrawArgs } from '../constants/types';
import { Sound, Sounds } from '../components/Sounds';

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
    private state: GameState | undefined;
    private sound: Sounds = new Sounds();
    private layout: UILayout;

    handleKeyDown = (e: KeyboardEvent): void => {
        if (this.state !== GameState.running) {
            if (e.code === "Space" || e.key === "Space") {
                if (this.state === GameState.over) {
                    this.state = GameState.start;
                    if (this.layout != undefined)
                        this.startGame();
                } else {
                    this.layout.resetBallPosition();
                    this.state = GameState.running;
                }
            }
        }
    };

    public constructor(lo: UILayout) {
        this.layout = lo;
        document.addEventListener('keydown', this.handleKeyDown);
    }

    startGame() {
        console.log('start game');
        this.state = GameState.start;
        this.level = 1;

        this.layout.scoreBoard.level = this.level;
        this.balls = BALLS_GAME;
        this.layout.scoreBoard.balls = this.balls;
        this.score = 0;
        this.layout.scoreBoard.score = this.score;
        this.layout.message.message = "Press Space to Start the Game";
        this.layout.message.visible = true;
        this.layout.createBricks(this.level);


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
                ball.changeYDirection(Direction.none);
                bricks.splice(i, 1);
                collision.value = brick.value;
                collision.hit = true;
                this.sound.playSound(Sound.brick);
            }
        })
        return collision;
    }

    checkBallCollision(layout: UILayout, ball: Ball): boolean {
        // Check paddle hit
        // console.log("ball x=" + (ball.pos.x - ball.diameter) + ", y=" + (ball.pos.y + ball.diameter) + " paddle x=" + paddle.pos.x + " paddle w=" + (paddle.pos.x + layout.paddleWidth) + ", y=" + layout.paddleStartY);
        if (
            ball.pos.x - ball.diameter >= layout.paddle.pos.x &&
            ball.pos.x + ball.diameter <= layout.paddle.pos.x + layout.paddle.width &&
            (ball.pos.y + ball.diameter >= layout.paddle.pos.y &&
                ball.pos.y + ball.diameter <= layout.paddle.pos.y + layout.paddle.height)
        ) {
            console.log("paddle hit");
            ball.changeYDirection(Direction.up);
            this.sound.playSound(Sound.paddle);
            return true;
        }
        // check wall hit
        if (ball.pos.x > layout.gameWidth - ball.diameter || ball.pos.x < 0) {
            console.log("wall hit");
            ball.changeXDirection();
            this.sound.playSound(Sound.wall);
            return true;
        }
        // check top
        if (ball.pos.y < ball.diameter) {
            console.log("top hit");
            ball.changeYDirection(Direction.down);
            this.sound.playSound(Sound.wall);
            return true;
        }
        return false;
    }

    gameLoop() {
        if (this.state == undefined)
            this.startGame();

        //console.log('run game');
        if (this.layout.paddle != undefined && this.layout.ball != undefined && this.layout.bricks != undefined && this.layout.scoreBoard != undefined && this.layout.message != undefined) {
            if (this.state !== GameState.over && this.state !== GameState.start) {
                if ((this.layout.paddle.isMovingLeft && this.layout.paddle.pos.x > 0) ||
                    (this.layout.paddle.isMovingRight && this.layout.paddle.pos.x < this.layout.gameWidth - this.layout.paddle.width)) {
                    this.layout.paddle.movePaddle();
                }
            }
            if (this.state == GameState.running) {
                this.layout.ball.moveBall();
                if (!this.checkBallCollision(this.layout, this.layout.ball)) {
                    const collision: BrickCollision = this.checkBricksCollision(this.layout.ball, this.layout.bricks);
                    if (collision.hit) {
                        this.score += collision.value;
                        this.layout.scoreBoard.score = this.score;
                        if (this.layout.bricks.length <= 0) {
                            this.layout.ball.pos = { x: this.layout.ball.pos.x, y: this.layout.ball.pos.y };
                            this.layout.ball.speed = { x: BALL_SPEED, y: BALL_SPEED };
                            if (this.level < MAX_LEVELS) {
                                this.layout.message.message = `Level Completed Press Space to Resume`;
                                this.layout.message.visible = true;
                                this.state = GameState.stopped;
                                this.level++;
                                this.layout.scoreBoard.level = this.level;
                                this.layout.createBricks(this.level);
                            } else {
                                this.layout.message.message = `Winner!`;
                                this.layout.message.visible = true;
                                this.state = GameState.over;
                            }
                        }
                    }
                }
                if ((this.state !== GameState.stopped) && (this.state !== GameState.over)) {
                    if (this.layout.ball.pos.y > this.layout.gameHeight + this.layout.ball.diameter) {
                        this.state = GameState.stopped;
                        this.balls--;
                        this.layout.scoreBoard.balls = this.balls;
                        if (this.balls == 0) {
                            this.layout.message.message = `Game Over`;
                            this.state = GameState.over;

                        } else {
                            this.layout.message.message = `Ball ${this.balls}`;
                        }
                        this.layout.message.visible = true;
                    }
                    else {
                        this.layout.message.visible = false;
                    }
                }
            }
        }
    };

    drawGame ({ ctx }: DrawArgs) {
        const obj: DrawProps = { ctx: ctx };

        this.gameLoop();
        //console.log("game logic before draw");
        this.layout.draw(obj);
        //console.log("game logic after draw");
    }
}