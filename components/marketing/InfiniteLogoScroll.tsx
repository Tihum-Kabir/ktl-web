'use client';

import { useEffect, useRef } from 'react';

const logos = [
    { name: 'NSU', src: '/images/logos/NSU.png' },
    { name: 'Robi', src: '/images/logos/Robi.png' },
    { name: 'Banglalink', src: '/images/logos/Banglalink.png' },
    { name: 'ACI', src: '/images/logos/ACI.png' },
];

export function InfiniteLogoScroll() {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let scrollPosition = 0;
        const scroll = () => {
            scrollPosition += 0.5;
            if (scrollPosition >= scrollContainer.scrollWidth / 2) {
                scrollPosition = 0;
            }
            scrollContainer.scrollLeft = scrollPosition;
        };

        const intervalId = setInterval(scroll, 20);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="w-full bg-black/50 py-12 border-y border-white/5">
            <div className="max-w-[1400px] mx-auto px-8">
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8 uppercase tracking-wider">
                    Trusted Partners & Affiliations
                </p>

                <div
                    ref={scrollRef}
                    className="overflow-hidden relative"
                    style={{ scrollBehavior: 'auto' }}
                >
                    <div className="flex gap-16 items-center" style={{ width: 'max-content' }}>
                        {/* First set of logos */}
                        {logos.map((logo, index) => (
                            <div
                                key={`logo-1-${index}`}
                                className="flex-shrink-0 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300 w-32 h-20 flex items-center justify-center"
                            >
                                <img
                                    src={logo.src}
                                    alt={logo.name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        ))}

                        {/* Duplicate set for seamless loop */}
                        {logos.map((logo, index) => (
                            <div
                                key={`logo-2-${index}`}
                                className="flex-shrink-0 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300 w-32 h-20 flex items-center justify-center"
                            >
                                <img
                                    src={logo.src}
                                    alt={logo.name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
