import React, { forwardRef, useEffect } from 'react'
import { UILayout } from './UILayout';
import * as S from './Canvas.styles';

type CanvasProps = React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> & {
    draw: (context: CanvasRenderingContext2D) => void;
    layout: UILayout;
}

export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
    ({ draw, layout, ...props }, canvasRef) => {
        useEffect(() => {
           
            let animationId: number;

            const handleResize = () => {
                if (canvas) {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                }
                layout.resize(window.innerWidth, window.innerHeight);
            };
            window.addEventListener("resize", handleResize);

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
                animationId = requestAnimationFrame(render);
            };
            render();

            return () => cancelAnimationFrame(animationId);

        }, [draw, canvasRef])

        if (!canvasRef) {
            return null;
        }
        return (<S.Canvas id="gameboard" ref={canvasRef} {...props}></S.Canvas>);
});
