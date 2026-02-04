'use client';

import { useEffect, useRef } from 'react';

export function MouseTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let points: Array<{ x: number; y: number; age: number }> = [];
        const TRAIL_LENGTH = 25; // "Sweet spot" length

        const resize = () => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };
        window.addEventListener('resize', resize);
        resize();

        const onMouseMove = (e: MouseEvent) => {
            // Create a point with microscopic burst potential
            points.push({
                x: e.clientX,
                y: e.clientY,
                age: 0
            });
        };
        window.addEventListener('mousemove', onMouseMove);

        let animationFrameId: number;

        function render() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (points.length > 1) {
                ctx.beginPath();
                ctx.strokeStyle = "white";
                // --- THE THINNESS: 1px for a high-end feel ---
                ctx.lineWidth = 1.2;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';

                for (let i = 0; i < points.length - 1; i++) {
                    const p1 = points[i];
                    const p2 = points[i + 1];

                    // Fades out toward the tail
                    const opacity = i / points.length;
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;

                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }

            // Update points and remove old ones
            // This controls the "Short" vs "Long" feel
            if (points.length > TRAIL_LENGTH) {
                points.shift();
            }

            // If the mouse stops, the trail should still fade out
            if (points.length > 0) {
                points[0].age++;
                if (points[0].age > 1) points.shift();
            }

            animationFrameId = requestAnimationFrame(render);
        }
        render();

        return () => {
            window.removeEventListener('resize', resize);
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
                zIndex: 9999
            }}
        />
    );
}
