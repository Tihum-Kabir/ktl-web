'use client';

import { useEffect, useRef } from 'react';

export default function StarfallBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // --- NEURAL INTERFACE CONFIG (From User JSON) ---
        const particleCount = 30; // Value: 30
        const particles: Particle[] = [];
        const mouse = { x: -9999, y: -9999 };

        // Config constants
        const connectionDistance = 220;
        const mouseObj = {
            enable: true,
            distance: 200, // Bubble distance
        };

        class Particle {
            x: number;
            y: number;
            radius: number;
            baseRadius: number;
            color: string;
            opacity: number;
            vx: number;
            vy: number;
            // Opacity Anim
            opacitySpeed: number;
            opacityDirection: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;

                // Size: Even Smaller (0.2 to 1.5)
                this.baseRadius = Math.random() * 1.3 + 0.2;
                this.radius = this.baseRadius;
                this.color = "#ffffff";

                // Opacity: Value 0.5, Random True, Min 0.1
                this.opacity = Math.random() * 0.4 + 0.1;

                // Anim: Speed 0.6, Sync False
                this.opacitySpeed = Math.random() * 0.01 + 0.002;
                this.opacityDirection = Math.random() > 0.5 ? 1 : -1;

                // Move: Speed 0.25, Random True, Direction None
                const speed = 0.25;
                const angle = Math.random() * Math.PI * 2;
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;

                // Opacity Animation (Breathing)
                this.opacity += this.opacitySpeed * this.opacityDirection;
                if (this.opacity >= 0.5 || this.opacity <= 0.1) {
                    this.opacityDirection *= -1;
                }

                // Interactivity: Bubble Mode
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouseObj.distance) {
                    // Size: 4 (Grow target)
                    const targetRadius = this.baseRadius + 1.5;
                    if (this.radius < targetRadius) this.radius += 0.2;

                    // Opacity: 0.8 (Glow target)
                    if (this.opacity < 0.8) this.opacity += 0.05;
                } else {
                    if (this.radius > this.baseRadius) this.radius -= 0.2;
                    // Opacity natural cycle
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = Math.max(0, Math.min(1, this.opacity));
                ctx.fill();
            }
        }

        function initParticles() {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animateParticles() {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            // 1. Draw connections first (behind particles)
            // line_linked: enable: true, distance 220, opacity 0.05, width 1
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#ffffff";

            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                // Check against others
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        // Opacity 0.05
                        ctx.globalAlpha = 0.05;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            // 2. Update and Draw particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            requestAnimationFrame(animateParticles);
        }

        // --- EVENTS ---
        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        const handleMouseLeave = () => {
            mouse.x = -9999;
            mouse.y = -9999;
        }

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        initParticles();
        const animId = requestAnimationFrame(animateParticles);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
            {/* Background Gradient Layer: #0a0e18 to #030305 */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{ background: 'radial-gradient(circle at center, #030610 0%, #010204 100%)' }}
            />

            {/* Canvas for Particles with Filter */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.2))' }}
            />
        </div>
    );
}
