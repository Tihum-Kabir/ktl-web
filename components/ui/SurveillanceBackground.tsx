'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function SurveillanceBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        // Make sure background is transparent so CSS can control base color if needed
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);

        const scene = new THREE.Scene();
        // Camera not strictly needed for clip-space quad but good practice to have one
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        camera.position.z = 1;

        // --- THE SHADER (The "Hacker" Logic) ---
        const fragmentShader = `
            uniform float uTime;
            uniform vec2 uResolution;
            uniform vec2 uMouse;
            uniform vec3 uColor;

            void main() {
                vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.y, uResolution.x);
                vec2 mouse = (uMouse - 0.5 * uResolution.xy) / min(uResolution.y, uResolution.x);
                
                // 1. Perspective Grid Logic
                float perspective = 0.5 / (uv.y + 0.8);
                vec2 gridUv = vec2(uv.x * perspective, perspective + uTime * 0.5);
                float grid = smoothstep(0.02, 0.0, abs(fract(gridUv.x * 10.0) - 0.5));
                grid += smoothstep(0.02, 0.0, abs(fract(gridUv.y * 10.0) - 0.5));
                grid *= smoothstep(-0.2, 0.5, uv.y + 0.5); // Fade grid into distance
                
                // 2. Interactive Scanner Ring
                float dist = length(uv - mouse);
                float ring = smoothstep(0.15, 0.14, dist) * smoothstep(0.12, 0.13, dist);
                float core = smoothstep(0.02, 0.01, dist); // Central dot
                
                // 3. Floating Data Nodes
                float nodes = 0.0;
                for(float i=0.0; i<15.0; i++) {
                    vec2 nodePos = vec2(sin(uTime * 0.2 + i * 7.5), cos(uTime * 0.3 + i * 3.2)) * 0.4;
                    float nodeDist = length(uv - nodePos);
                    nodes += smoothstep(0.005, 0.0, nodeDist);
                    // Connection lines to mouse
                    if(length(nodePos - mouse) < 0.3) {
                        nodes += (1.0 - smoothstep(0.0, 0.3, length(nodePos - mouse))) * 0.1;
                    }
                }

                vec3 finalColor = uColor * (grid * 0.2 + ring + core + nodes);
                gl_FragColor = vec4(finalColor, 1.0);
            }
        `;

        const uniforms = {
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uColor: { value: new THREE.Color(0x22d3ee) } // Cyan default to match Starfall/Kingsforth
        };

        const material = new THREE.ShaderMaterial({
            uniforms,
            fragmentShader,
            vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
            transparent: true,
        });

        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
        scene.add(mesh);

        // --- Interaction ---
        const handleMouseMove = (e: MouseEvent) => {
            // Need to invert Y to match shader expectation if needed, but snippet used window.innerHeight - e.clientY
            uniforms.uMouse.value.set(e.clientX, window.innerHeight - e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);

        const handleResize = () => {
            if (!canvasRef.current) return;
            renderer.setSize(window.innerWidth, window.innerHeight);
            uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        let animationId: number;
        const startTime = Date.now();

        function animate() {
            animationId = requestAnimationFrame(animate);
            const time = (Date.now() - startTime) * 0.001;
            uniforms.uTime.value = time;
            renderer.render(scene, camera);
        }

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            renderer.dispose();
            material.dispose();
            if (canvasRef.current && canvasRef.current.parentNode) {
                // Cleanup if necessary
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            style={{
                opacity: 0.6, // Slight transparency to blend with background color
                mixBlendMode: 'screen' // Cool blending effect
            }}
        />
    );
}
