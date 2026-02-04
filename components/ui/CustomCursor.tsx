'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const crossRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // User requested fix implies running without the pointer media check, or the check was causing the "missing" issue.
        // We'll keep a basic check for non-touch to avoid mobile glitches, or just let it run if requested.
        // For safety/best practice, we'll check if the elements exist.

        const dot = dotRef.current;
        const cross = crossRef.current;
        // Trail removed as requested

        if (!dot || !cross) return;

        let mouse = { x: -100, y: -100 };
        let posDot = { x: 0, y: 0 };
        let posCross = { x: 0, y: 0 };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            // Detection Logic
            const target = e.target as HTMLElement;
            const isLocked = target.closest('.partner-box') !== null || // updated to new class
                target.closest('.tag') !== null || // legacy support just in case
                window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName === 'A' ||
                target.tagName === 'BUTTON';

            if (isLocked) {
                document.body.classList.add('locked-on');
            } else {
                document.body.classList.remove('locked-on');
            }
        };

        const render = () => {
            // Smooth Lerp Physics
            posDot.x += (mouse.x - posDot.x) * 0.45;
            posDot.y += (mouse.y - posDot.y) * 0.45;

            posCross.x += (mouse.x - posCross.x) * 0.2;
            posCross.y += (mouse.y - posCross.y) * 0.2;

            // Apply with Hardware Acceleration - Note: CSS center transform handled in class mostly, 
            // but we need to match user's JS specific translate(-50%, -50%) for crosshair if it's not strictly doing it via CSS only.
            // User's latest JS snippet:
            // dot: translate3d(${posDot.x - 3}px, ...)
            // cross: translate3d(${posCross.x}px, ...) translate(-50%, -50%)

            // Actually user's CSS has `transform: translate(-50%, -50%)` for dot/cross.
            // When we set `style.transform` in JS, we overwrite that CSS transform.
            // So we MUST append `translate(-50%, -50%)` in JS if we want to honor that centring.
            if (dot) dot.style.transform = `translate3d(${posDot.x}px, ${posDot.y}px, 0) translate(-50%, -50%)`;
            if (cross) cross.style.transform = `translate3d(${posCross.x}px, ${posCross.y}px, 0) translate(-50%, -50%)`;

            setTimeout(() => {
                requestAnimationFrame(render);
            }, 25);
        };

        window.addEventListener('mousemove', handleMouseMove);
        const animationId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
            document.body.classList.remove('locked-on');
        };
    }, []);

    // Hidden on touch devices via CSS media query implicitly, or we can force return null
    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={crossRef} className="cursor-crosshair" />
            {/* Trail Removed */}
        </>
    );
}
