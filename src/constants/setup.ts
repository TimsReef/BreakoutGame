const canvas: HTMLCanvasElement | null = document.querySelector('#playfield');

export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;
export const STAGE_PADDING = 10;
export const STAGE_ROWS = 6;
export const STAGE_COLS = 12;
export const BRICK_PADDING = 5;
export const BRICK_WIDTH = canvas
    ? Math.floor((canvas.width - STAGE_PADDING * 2) / STAGE_COLS) - BRICK_PADDING : 60;
export const BRICK_HEIGHT = canvas
    ? Math.floor((canvas.height - STAGE_PADDING * 2) / STAGE_ROWS) - BRICK_PADDING : 10;

export const PADDLE_SPEED = 5;
export const PADDLE_WIDTH = 50;
export const PADDLE_HEIGHT = 7;
export const PADDLE_STARTX = GAME_WIDTH / 2 - PADDLE_WIDTH / 2;
export const PADDLE_STARTY = 350;
export const BALL_SPEED = 3;
export const BALL_SIZE = 5;
export const BALL_STARTX = 400;
export const BALL_STARTY = 120;
export const BALLS_GAME = 5;

export const BrickColor: { [key: number]: string } = {
    1: "red", // Red Brick
    2: "orange", // Orange Brick
    3: "yellow", // Yellow Brick
    4: "green", // Green Brick
    5: "blue", // Blue Brick
    6: "purple" // Purple Brick
};

export const BrickEnergy: { [key: number]: number } = {
    1: 1, // Red Brick
    2: 1, // Orange Brick
    3: 2, // Yellow Brick
    4: 2, // Green Brick
    5: 2, // Blue Brick
    6: 3 // Purple Brick
};

export const BrickValue: { [key: number]: number } = {
    1: 20,
    2: 15,
    3: 10,
    4: 5,
    5: 2,
    6: 1
};

export type BrickCollision = {
    hit: boolean;
    value: number;
}

export const MAX_LEVELS = 4;
export const Level:number[][] = [
    [
        0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0,
        0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0,
        0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0,
        0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,
        0, 0, 0, 5, 5, 5, 5, 5, 5, 0, 0, 0,
        6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6
    ],
    [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
        5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
        6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6
    ],
    [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2,
        3, 3, 0, 0, 3, 3, 3, 3, 0, 0, 3, 3,
        4, 0, 4, 4, 0, 4, 4, 0, 4, 4, 0, 4,
        5, 5, 0, 0, 5, 0, 0, 5, 0, 0, 5, 5,
        6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6
    ]
];