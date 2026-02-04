'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Eye } from 'lucide-react';
import Link from 'next/link';

// Partner Data
// Partner Data
const PARTNERS = [
    { name: 'Robi', img: '/images/logos/Robi.png' },
    { name: 'ACI', img: '/images/logos/ACI.png' },
    { name: 'Banglalink', img: '/images/logos/Banglalink.png' },
    { name: 'NSU', img: '/images/logos/NSU.png' },
    { name: 'Robi', img: '/images/logos/Robi.png' },
    { name: 'ACI', img: '/images/logos/ACI.png' },
    { name: 'Banglalink', img: '/images/logos/Banglalink.png' },
    { name: 'NSU', img: '/images/logos/NSU.png' },
];

const InfiniteLoopSlider = ({ children, duration, reverse = false }: { children: React.ReactNode, duration: number, reverse?: boolean }) => (
    <div className='loop-slider' style={{
        '--duration': `${duration}ms`,
        '--direction': reverse ? 'reverse' : 'normal'
    } as React.CSSProperties}>
        <div className='inner'>
            {children}
            {children}
            {children} {/* Tripling for safety on wide screens */}
        </div>
    </div>
);

// Inline logo scroll component with infinite animation
function InfiniteLogoScrollInline() {
    return (
        <div className="w-full relative flex flex-col items-center gap-10">
            {/* Header removed as requested to clean up lines */}

            <div className="infinite-gallery-row">
                <div className="loop-slider" style={{ '--duration': '40000ms' } as React.CSSProperties}>
                    <div className="inner">
                        {/* Render duplicates for seamless loop - Tripled for wide screens */}
                        {PARTNERS.map((partner, idx) => (
                            <div className="partner-box" key={`p1-${idx}`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={partner.img} alt={partner.name} />
                            </div>
                        ))}
                        {PARTNERS.map((partner, idx) => (
                            <div className="partner-box" key={`p2-${idx}`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={partner.img} alt={partner.name} />
                            </div>
                        ))}
                        {PARTNERS.map((partner, idx) => (
                            <div className="partner-box" key={`p3-${idx}`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={partner.img} alt={partner.name} />
                            </div>
                        ))}
                        {PARTNERS.map((partner, idx) => (
                            <div className="partner-box" key={`p4-${idx}`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={partner.img} alt={partner.name} />
                            </div>
                        ))}
                        {PARTNERS.map((partner, idx) => (
                            <div className="partner-box" key={`p5-${idx}`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={partner.img} alt={partner.name} />
                            </div>
                        ))}
                        {PARTNERS.map((partner, idx) => (
                            <div className="partner-box" key={`p6-${idx}`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={partner.img} alt={partner.name} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}


interface HeroProps {
    socialLinks?: {
        youtube?: string;
        [key: string]: string | undefined;
    };
}

export function Hero({ socialLinks }: HeroProps) {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 transition-colors duration-300">
            {/* Gradient Orbs - Refined for Eye Comfort */}
            <div className="absolute top-0 left-10 w-[600px] h-[600px] bg-secondary/15 dark:bg-secondary/15 rounded-full blur-[140px] animate-pulse"></div>
            <div className="absolute bottom-0 right-10 w-[600px] h-[600px] bg-primary/10 dark:bg-primary/10 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '1s' }}></div>

            {/* Dark Anchor Glow - Makes text pop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-black/60 rounded-full blur-[120px] pointer-events-none z-0"></div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8"
                >
                    {/* Badge - Muted */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-sm"
                    >
                        <Shield className="w-4 h-4 text-secondary/70" strokeWidth={2} />
                        <span className="text-[13px] font-medium text-secondary/70 tracking-wide">ENTERPRISE INTELLIGENCE SYSTEMS</span>
                    </motion.div>

                    {/* Main Headline */}
                    <div className="mb-6 sm:mb-8 px-2 relative">
                        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[7rem] font-bold tracking-tighter leading-tight md:leading-[0.95] break-words text-balance flex flex-col items-center">
                            <span className="bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] tracking-tight">
                                Global Standard in
                            </span>
                            <br className="block sm:hidden" />
                            <span className="mt-1 md:mt-0 animate-text-shimmer bg-gradient-to-r from-[#0cb9f4] via-[#a452a1] to-[#0cb9f4] bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_0_50px_rgba(134,120,207,0.2)] block">
                                Detection & <br /> Response
                            </span>
                        </h1>
                    </div>

                    {/* Mobile: 3 lines implied by narrowing width. Desktop: 1 line allowed by full width. */}
                    <p className="mx-auto text-sm sm:text-xl text-gray-400 font-light leading-relaxed px-6 mb-8 text-center max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
                        Secure your infrastructure with AI-driven surveillance and real-time threat intelligence. Trusted by educational institutions and enterprises worldwide.
                    </p>

                    <div className="flex flex-row flex-wrap items-center justify-center gap-6 pt-6 px-1 w-full">
                        {/* Get Started - Liquid Gradient & Scanner Effect */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative group"
                        >
                            <Link
                                href="/contact"
                                className="relative w-auto min-w-[160px] sm:min-w-[190px] h-[54px] sm:h-[64px] flex items-center justify-center text-white text-base sm:text-lg font-bold rounded-full shadow-[0_20px_40px_-10px_rgba(170,43,103,0.4)] transition-all duration-500 group-hover:shadow-[0_25px_50px_-12px_rgba(170,43,103,0.6)]"
                            >
                                {/* STRICT CLIPPING CONTAINER */}
                                <div className="absolute inset-0 rounded-full overflow-hidden z-0 pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#aa2b67] via-[#a452a1] to-[#8678cf]" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                                    <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover:animate-scan" />
                                </div>

                                <span className="relative z-10 flex items-center gap-2 drop-shadow-sm">
                                    Get Started <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-white group-hover:animate-pulse" />
                                </span>




                            </Link>
                        </motion.div>

                        {/* Watch Story - Minimal Glass & Pulsing Icon */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative group"
                        >
                            <a
                                href={socialLinks?.youtube || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-auto min-w-[150px] sm:min-w-[180px] h-[54px] sm:h-[64px] flex items-center justify-center gap-3 px-8 bg-white/[0.03] hover:bg-white/[0.08] text-white/90 hover:text-white text-base sm:text-lg font-medium rounded-full border border-white/10 hover:border-white/20 transition-all duration-500 backdrop-blur-xl shadow-2xl relative overflow-hidden"
                            >
                                {/* Animated Background Glow */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10 flex items-center gap-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-[#ff0055]/20 group-hover:border-[#ff0055]/40 transition-all duration-500">
                                        <div className="w-0 h-0 border-t-[4px] sm:border-t-[6px] border-t-transparent border-l-[7px] sm:border-l-[10px] border-l-white border-b-[4px] sm:border-b-[6px] border-b-transparent ml-1 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <span className="tracking-tight">Watch Story</span>
                                </div>

                                {/* Pulse Effect */}
                                <div className="absolute top-1/2 left-8 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 animate-ping opacity-0 group-hover:opacity-30 pointer-events-none" />
                            </a>
                        </motion.div>
                    </div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 pt-8 sm:pt-16 max-w-[800px] mx-auto px-4"
                    >
                        <div className="space-y-2 sm:space-y-3">
                            <div className="flex items-center justify-center gap-2.5">
                                <Zap className="w-5 h-5 text-violet-600 dark:text-violet-400" strokeWidth={2.5} />
                                <div className="text-4xl sm:text-[42px] font-bold text-gray-900 dark:text-white leading-none">&lt;2s</div>
                            </div>
                            <div className="text-[11px] sm:text-[13px] font-medium text-gray-500 uppercase tracking-wider text-center">Alert Response Time</div>
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                            <div className="flex items-center justify-center gap-2.5">
                                <Eye className="w-5 h-5 text-cyan-600 dark:text-cyan-400" strokeWidth={2.5} />
                                <div className="text-4xl sm:text-[42px] font-bold text-gray-900 dark:text-white leading-none">24/7</div>
                            </div>
                            <div className="text-[11px] sm:text-[13px] font-medium text-gray-500 uppercase tracking-wider text-center">Continuous Monitoring</div>
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                            <div className="flex items-center justify-center gap-2.5">
                                <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" strokeWidth={2.5} />
                                <div className="text-4xl sm:text-[42px] font-bold text-gray-900 dark:text-white leading-none">99.9%</div>
                            </div>
                            <div className="text-[11px] sm:text-[13px] font-medium text-gray-500 uppercase tracking-wider text-center">System Uptime</div>
                        </div>
                    </motion.div>

                    {/* Partner Logos */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="pt-12 sm:pt-16"
                    >
                        <InfiniteLogoScrollInline />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
