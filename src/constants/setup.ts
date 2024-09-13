export const PADDLE_SPEED = 3;
export const BALL_SPEED = 3;
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