'use client';

import { useEffect, useRef } from 'react';

export default function LaserCursor() {
    // We don't strictly need refs to DOM elements if we use document.getElementById 
    // like the snippet, but React refs are cleaner. 
    // However, since the user's CSS targets IDs, we will strictly follow their IDs.

    const requestRef = useRef<number>(0);
    const mouse = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const dot = document.getElementById('cursor-dot');
        const ring = document.getElementById('cursor-ring');

        if (!dot || !ring) return;

        // Track mouse movement
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        // The Animation Loop
        const animate = () => {
            // 1. Move the Dot (Instant - No Lag)
            // We use the ref values directly
            dot.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;

            // 2. Move the Ring (Lerp - Weighted Lag)
            // The 0.15 factor determines the "weight" of the scope.
            ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
            ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;

            ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;

            requestRef.current = requestAnimationFrame(animate);
        };

        document.addEventListener('mousemove', handleMouseMove);
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    // Universal Hover Detection
    useEffect(() => {
        const isClickable = (element: Element): boolean => {
            // 1. Check for obvious tags
            const clickableTags = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT', 'LABEL'];
            if (clickableTags.includes(element.tagName)) return true;

            // 2. Check if it's inside a clickable parent
            if (element.closest('a, button, label')) return true;

            // 3. Check computed style for 'cursor: pointer'
            // This is expensive to do on every mouseover, but requested by user.
            // We can optimize slightly by checking if it's an HTMLElement.
            if (element instanceof HTMLElement) {
                const style = window.getComputedStyle(element);
                return style.cursor === 'pointer';
            }
            return false;
        };

        const handleMouseOver = (e: MouseEvent) => {
            if (e.target instanceof Element && isClickable(e.target)) {
                document.body.classList.add('locked-on');
            }
        };

        const handleMouseOut = () => {
            document.body.classList.remove('locked-on');
        };

        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            // Ensure cleanup
            document.body.classList.remove('locked-on');
        };
    }, []);

    return (
        <>
            <style jsx global>{`
        /* Base settings for both parts */
        #cursor-dot, #cursor-ring {
            position: fixed;
            top: 0;
            left: 0;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            z-index: 9999;
            pointer-events: none; /* Crucial: lets you click through them */
        }

        /* 1. The Sniper Center (Plus Button) */
        #cursor-dot {
            width: 6px;
            height: 6px;
            background-color: transparent;
            /* Center the plus manually */
            display: flex;
            align-items: center;
            justify-content: center;
            /* Only transition colors/size, NOT transform to avoid lag */
            transition: width 0.2s, height 0.2s, background-color 0.2s;
        }
        
        /* Plus vertical line */
        #cursor-dot::before {
            content: '';
            position: absolute;
            width: 1px;
            height: 100%;
            background-color: #00ff00;
            box-shadow: 0 0 6px #00ff00;
        }

        /* Plus horizontal line */
        #cursor-dot::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 1px;
            background-color: #00ff00;
            box-shadow: 0 0 6px #00ff00;
        }

        /* 2. The Scope (Outer Ring) */
        #cursor-ring {
            width: 30px; /* Smaller scope */
            height: 30px;
            border: 1.5px solid rgba(0, 255, 0, 0.6); /* Thinner border */
            background: rgba(0, 255, 0, 0.03); /* Faint green fill for tracking */
            /* Add inset shadow as requested + soft outer glow */
            box-shadow: 0 0 8px rgba(0, 255, 0, 0.2), inset 0 0 10px rgba(0, 255, 0, 0.1); 
            transition: width 0.2s, height 0.2s, background-color 0.2s, border-color 0.2s, box-shadow 0.2s;
        }

        /* --- LOCKED ON STATE (Red) --- */
        body.locked-on #cursor-dot::before,
        body.locked-on #cursor-dot::after {
            background-color: #ff0000; /* Kill Red */
            box-shadow: 0 0 15px #ff0000;
        }

        body.locked-on #cursor-ring {
            border-color: #ff0000;
            width: 16px; /* Ring snaps tight */
            height: 16px;
            background-color: rgba(255, 0, 0, 0.2); /* Stronger red fill */
            box-shadow: 0 0 15px #ff0000; /* Red outer glow */
            border-width: 2px;
        }

        /* Hide default cursor globally */
        body, a, button, input, textarea, label {
            cursor: none !important;
        }
      `}</style>
            <div id="cursor-dot"></div>
            <div id="cursor-ring"></div>
        </>
    );
}
