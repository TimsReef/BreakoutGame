import { useRef } from 'react'
import { GameLogic } from './GameLogic';
import { Canvas } from '../components/Canvas';
import { GameWrapper } from './Games.styles';
import { UILayout } from '../components/UILayout';
import { log, logType } from '../utils/logger';

interface GameProps {

}

export const Game: React.FC<GameProps> = ({ }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const layoutRef = new UILayout(window.innerWidth, window.innerHeight);
    const gameLogic: GameLogic = new GameLogic(layoutRef);

    const draw = (ctx: CanvasRenderingContext2D) => {
        log(logType.drawing, "game before draw");
        gameLogic.drawGame({ ctx });
        log(logType.drawing, "game after draw");
    }

    return (
        <GameWrapper id="game">
            <Canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} layout={layoutRef} draw={draw} />
        </GameWrapper>
    );
}
