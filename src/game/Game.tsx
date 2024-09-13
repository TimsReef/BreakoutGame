import { useRef } from 'react'
import { GameLogic } from './GameLogic';
import { Canvas } from '../components/Canvas';
import { GameWrapper } from './Games.styles';
import { UILayout } from '../components/UILayout';

interface GameProps {

}

export const Game: React.FC<GameProps> = ({ }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const layoutRef = new UILayout(window.innerWidth, window.innerHeight);
    const gameLogic: GameLogic = new GameLogic(layoutRef);

    const draw = (ctx: CanvasRenderingContext2D) => {
        //console.log("game before draw");
        gameLogic.drawGame({ ctx });
        //console.log("game after draw");
    }

    return (
        <GameWrapper id="game">
            <Canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} layout={layoutRef} draw={draw} />
        </GameWrapper>
    );
}
