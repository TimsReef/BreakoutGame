import React, { forwardRef, useEffect } from 'react'
import { UILayout } from './UILayout';
import * as S from './Canvas.styles';
import { log, logType } from '../utils/logger';
import { isMobile } from 'react-device-detect';

type CanvasProps = React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> & {
    draw: (context: CanvasRenderingContext2D) => void;
    layout: UILayout;
}

export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
    ({ draw, layout, ...props }, canvasRef) => {
        useEffect(() => {
           
            let animationId: number;
            let now: DOMHighResTimeStamp = window.performance.now();
            let then: DOMHighResTimeStamp = window.performance.now();
            let elapsed: DOMHighResTimeStamp = 0;
            let fps: number = 60;
            let fpsInterval: GLfloat = 1000/fps;

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
            let checkFrameRate: boolean = false;
            if (isMobile) {
                checkFrameRate = true;
            }

            const render = () => {
                now = window.performance.now();
                elapsed = now - then;
                let doDraw: boolean;
                if (checkFrameRate) {
                    doDraw = (elapsed > fpsInterval) ? true : false;
                }
                else {
                    doDraw = true;
                }
                animationId = requestAnimationFrame(render);
                if (doDraw) {
                    then = now - (elapsed % fpsInterval);
                    log(logType.drawing, "canvas before draw t=" + elapsed);
                    draw(context);
                    log(logType.drawing, "canvas after draw");
                }
            };
            render();

            return () => cancelAnimationFrame(animationId);

        }, [draw, canvasRef])

        if (!canvasRef) {
            return null;
        }
        return (<S.Canvas id="gameboard" ref={canvasRef} {...props}></S.Canvas>);
});
