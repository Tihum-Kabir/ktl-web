'use client';

import { useEffect, useRef } from 'react';

export default function LaserCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Configuration
        const amount = 12; // Shorter trail (was 20)
        const width = 1;
        const idleTimeout = 150;
        const colors = ['#22D3EE', '#0066ff']; // Cyan (#22D3EE) to Deep Blue

        let mouse = { x: 0, y: 0 };
        let lastMove = 0;
        let dots: Dot[] = [];
        let animationFrameId: number;

        // --- Dot Class Adaptation ---
        class Dot {
            x: number;
            y: number;
            index: number;

            constructor(index: number) {
                this.x = 0;
                this.y = 0;
                this.index = index;
            }

            draw(nextDot: { x: number; y: number }) {
                // Smooth movement logic (Follow the leader)
                this.x += (nextDot.x - this.x) * 0.4; // Slightly faster follow for snappy feel
                this.y += (nextDot.y - this.y) * 0.4;

                ctx!.beginPath();
                ctx!.strokeStyle = colors[0];

                // Thinner tapered end
                // max width was ~10. Now (12 * 0.3) = 3.6px max width.
                ctx!.lineWidth = (amount - this.index) * 0.3;
                ctx!.lineCap = 'round';

                ctx!.moveTo(this.x, this.y);
                ctx!.lineTo(nextDot.x, nextDot.y);
                ctx!.stroke();
            }
        }

        // Initialize Canvas
        function initCanvas() {
            const dpr = window.devicePixelRatio || 1;
            canvas!.width = window.innerWidth * dpr;
            canvas!.height = window.innerHeight * dpr;
            ctx!.scale(dpr, dpr);
            canvas!.style.width = window.innerWidth + 'px';
            canvas!.style.height = window.innerHeight + 'px';
        }

        // Initialize Dots
        function initDots() {
            dots = [];
            for (let i = 0; i < amount; i++) {
                dots.push(new Dot(i));
            }
        }

        const onMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            lastMove = Date.now();
        };

        const onResize = () => initCanvas();

        function render() {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            // Fade out effect when idle
            if (Date.now() - lastMove < idleTimeout) {
                ctx.globalAlpha = 1;
            } else {
                ctx.globalAlpha *= 0.9;
                if (ctx.globalAlpha < 0.01) ctx.globalAlpha = 0;
            }

            if (ctx.globalAlpha > 0) {
                let nextDot = { x: mouse.x, y: mouse.y };
                dots.forEach(dot => {
                    dot.draw(nextDot);
                    nextDot = dot;
                });
            }

            animationFrameId = requestAnimationFrame(render);
        }

        window.addEventListener('resize', onResize);
        window.addEventListener('mousemove', onMouseMove);

        initCanvas();
        initDots();
        render();

        return () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 9999999,
            }}
        />
    );
}
