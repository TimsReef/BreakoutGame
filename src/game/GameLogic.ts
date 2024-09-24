import { MAX_LEVELS, BALLS_GAME, BallSpeed, BrickCollision } from '../constants/setup';
import { UILayout } from '../components/UILayout';
import { Ball, Direction } from '../components/Ball';
import { Brick } from '../components/Brick';
import { DrawProps, DrawArgs } from '../constants/types';
import { Sound, Sounds } from '../components/Sounds';
import { log, logType } from '../utils/logger';
import i18n from 'i18next';
import { isMobile } from 'react-device-detect';

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
        if (e.code === "Space" || e.key === "Space") {
            console.log("key");
            this.handleKeyOrTouch();    
        }
    };

    handleTouchStart = (): void => {
        this.handleKeyOrTouch();
    };

    private handleKeyOrTouch(): void {
        if (this.state !== GameState.running) {
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

    public constructor(lo: UILayout) {
        this.layout = lo;
        document.addEventListener('keydown', this.handleKeyDown);
        if (isMobile) {
            document.addEventListener('touchstart', this.handleTouchStart);
        }
    }

    startGame() {
        log(logType.game, 'start game');
        this.state = GameState.start;
        this.level = 1;

        this.layout.scoreBoard.level = this.level;
        this.balls = BALLS_GAME;
        this.layout.scoreBoard.balls = this.balls;
        this.score = 0;
        this.layout.scoreBoard.score = this.score;
        this.layout.message.message = i18n.t('startgame');
        if (isMobile) {
            this.layout.message.message = i18n.t('startgamemobile');
        }
        this.layout.message.visible = true;
        this.layout.createBricks(this.level);

        //const messageLoop = () => {
        //    log(logType.game, 'run game');
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
                ball.changeYDirection(Direction.none, brick.energy);
                bricks.splice(i, 1);
                collision.value = brick.value;
                collision.hit = true;
                this.sound.playSound(Sound.brick);
            }
        })
        return collision;
    }

    checkBallCollision(layout: UILayout): boolean {
        // Check paddle hit
        log(logType.hittest, "ball x=" + (layout.ball.pos.x - layout.ball.diameter) + ", y=" + (layout.ball.pos.y + layout.ball.diameter) + " paddle x=" + layout.paddle.pos.x + " paddle w=" + (layout.paddle.pos.x + layout.paddle.width) + ", y=" + layout.paddle.pos.y);
        if (
            (layout.ball.pos.x - layout.ball.diameter >= layout.paddle.pos.x &&
            layout.ball.pos.x + layout.ball.diameter <= layout.paddle.pos.x + layout.paddle.width) &&
            (layout.ball.pos.y + Math.floor(layout.ball.diameter/2) >= layout.paddle.pos.y &&
                layout.ball.pos.y + Math.floor(layout.ball.diameter / 2) <= layout.paddle.pos.y + layout.paddle.height)
        ) {
            log(logType.hittest, "paddle hit");
            let per = Math.floor(Math.abs(layout.paddle.pos.x - layout.ball.pos.x) / layout.paddle.width * 100);
            let rate = per % 5;
            layout.ball.changeYDirection(Direction.up, rate);
            this.sound.playSound(Sound.paddle);
            return true;
        }
        // check wall hit
        if (layout.ball.pos.x > layout.gameWidth - layout.ball.diameter || layout.ball.pos.x < 0) {
            log(logType.hittest, "wall hit");
            layout.ball.changeXDirection();
            this.sound.playSound(Sound.wall);
            return true;
        }
        // check top
        if (layout.ball.pos.y < layout.ball.diameter) {
            log(logType.hittest, "top hit");
            layout.ball.changeYDirection(Direction.down, undefined);
            this.sound.playSound(Sound.wall);
            return true;
        }
        return false;
    }

    gameLoop() {
        if (this.state == undefined)
            this.startGame();

        log(logType.game, 'run game');
        if (this.layout.paddle != undefined && this.layout.ball != undefined && this.layout.bricks != undefined && this.layout.scoreBoard != undefined && this.layout.message != undefined) {
            if (this.state !== GameState.over && this.state !== GameState.start) {
                if ((this.layout.paddle.isMovingLeft && this.layout.paddle.pos.x > 0) ||
                    (this.layout.paddle.isMovingRight && this.layout.paddle.pos.x < this.layout.gameWidth - this.layout.paddle.width)) {
                    this.layout.paddle.movePaddle();
                }
            }
            if (this.state == GameState.running) {
                this.layout.ball.moveBall();
                if (!this.checkBallCollision(this.layout)) {
                    const collision: BrickCollision = this.checkBricksCollision(this.layout.ball, this.layout.bricks);
                    if (collision.hit) {
                        this.score += collision.value;
                        this.layout.scoreBoard.score = this.score;
                        if (this.layout.bricks.length <= 0) {
                            this.layout.ball.pos = { x: this.layout.ball.pos.x, y: this.layout.ball.pos.y };
                            this.layout.ball.speed = { x: BallSpeed.slow, y: BallSpeed.slow };
                            if (this.level < MAX_LEVELS) {
                                this.layout.message.message = i18n.t('levelcomplete');
                                this.layout.message.visible = true;
                                this.state = GameState.stopped;
                                this.level++;
                                this.layout.scoreBoard.level = this.level;
                                this.layout.createBricks(this.level);
                            } else {
                                this.layout.message.message = i18n.t('winner');
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
                            this.layout.message.message = i18n.t('gameover');
                            this.state = GameState.over;

                        } else {
                            this.layout.message.message = i18n.t('ball', { balls: this.balls });
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
        log(logType.drawing, "game logic before draw");
        this.layout.draw(obj);
        log(logType.drawing, "game logic after draw");
    }
}