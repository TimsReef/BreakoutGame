import { useRef } from 'react'
import { GameLogic } from './GameLogic';
import { Canvas } from '../components/Canvas';
import { GameWrapper } from './Games.styles';

interface GameProps {

}

export const Game: React.FC<GameProps> = ({ }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameLogic: GameLogic = new GameLogic();

    //gameLogic.startGame();

    const draw = (ctx: CanvasRenderingContext2D) => {
        gameLogic.drawGame({ ctx });
    }

    return (
        <GameWrapper>
            <Canvas ref={canvasRef} draw={draw} />
        </GameWrapper>
    );
}
