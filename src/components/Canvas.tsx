import React, { forwardRef, useEffect } from 'react'
import * as S from './Canvas.styles';

type CanvasProps = React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> & {
    draw: (context: CanvasRenderingContext2D) => void;
}

export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
    ({ draw, ...props }, canvasRef) => {

        useEffect(() => {

            if (!canvasRef) {
                return;
            }
            const canvas = (canvasRef as React.RefObject<HTMLCanvasElement>).current;
            if (!canvas) {
                return;
            }

            const context = canvas.getContext('2d');
            if (!context) {
                return;
            }

            const render = () => {
                //console.log("canvas before draw");
                draw(context);
                //console.log("canvas after draw");
                requestAnimationFrame(render);
            };
            render();
            

        }, [draw, canvasRef])

        if (!canvasRef) {
            return null;
        }
        return (<S.Canvas width={800} height={400} ref={canvasRef} {...props}></S.Canvas>);
});
