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
            {/* Gradient Orbs - Boosted for "Alive" feel */}
            <div className="absolute top-0 left-10 w-[600px] h-[600px] bg-secondary/20 dark:bg-secondary/20 rounded-full blur-[140px] animate-pulse"></div>
            <div className="absolute bottom-0 right-10 w-[600px] h-[600px] bg-primary/20 dark:bg-primary/20 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '1s' }}></div>

            {/* Additional Central Glow for Pop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[160px] pointer-events-none"></div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-secondary/10 via-secondary/10 to-tertiary/10 border border-secondary/20 backdrop-blur-sm"
                    >
                        <Shield className="w-4 h-4 text-secondary" strokeWidth={2.5} />
                        <span className="text-[13px] font-medium text-secondary tracking-wide">ENTERPRISE INTELLIGENCE SYSTEMS</span>
                    </motion.div>

                    {/* Main Headline */}
                    <div className="mb-6 sm:mb-8 px-2">
                        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[7rem] font-bold tracking-tighter leading-tight md:leading-[0.95] break-words text-balance flex flex-col items-center">
                            <span className="bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] tracking-tight">
                                Global Standard in
                            </span>
                            <br className="block sm:hidden" /> {/* Force break on mobile, maybe desktop too if requested, but let's stick to user request "response in 3rd line" which implies a break after "in" and "Detection &" */}
                            <span className="mt-1 md:mt-0 animate-text-shimmer bg-gradient-to-r from-[#0cb9f4] via-[#a452a1] to-[#0cb9f4] bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_0_80px_rgba(134,120,207,0.3)] block">
                                Detection & <br /> Response
                            </span>
                        </h1>
                    </div>

                    {/* Mobile: 3 lines implied by narrowing width. Desktop: 1 line allowed by full width. */}
                    <p className="mx-auto text-sm sm:text-xl text-gray-400 font-light leading-relaxed px-6 mb-8 text-center max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
                        Secure your infrastructure with AI-driven surveillance and real-time threat intelligence. Trusted by educational institutions and enterprises worldwide.
                    </p>

                    <div className="flex flex-row flex-wrap items-center justify-center gap-4 pt-4 px-1 w-full">
                        <Link
                            href="/contact"
                            className="w-auto min-w-[140px] sm:min-w-[170px] group relative px-8 h-[50px] sm:h-[60px] flex items-center justify-center bg-gradient-to-r from-[#aa2b67] to-[#a452a1] hover:from-[#a452a1] hover:to-[#aa2b67] text-white text-sm sm:text-lg font-bold rounded-full overflow-hidden hover:scale-105 transition-all duration-300 shadow-[0_10px_20px_-5px_rgba(170,43,103,0.5)] border border-white/10 ring-1 ring-white/20"
                        >
                            <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
                                Get Started <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                            </span>
                            {/* Inner Shine Effect */}
                            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 blur-md pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>

                        <a
                            href={socialLinks?.youtube || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-auto min-w-[140px] sm:min-w-[160px] group flex items-center justify-center gap-2 px-6 h-[50px] sm:h-[64px] bg-[#F2EDE4] text-slate-900 text-sm sm:text-lg font-medium rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_-5px_rgba(255,255,255,0.2)] ring-1 ring-white/50"
                        >
                            <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                                <div className="w-0 h-0 border-t-[3px] sm:border-t-[5px] border-t-transparent border-l-[5px] sm:border-l-[8px] border-l-white border-b-[3px] sm:border-b-[5px] border-b-transparent ml-0.5" />
                            </div>
                            <span className="truncate">Watch Story</span>
                        </a>
                    </div>

                    {/* Partner Logos */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="pt-6"
                    >
                        <InfiniteLogoScrollInline />
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 pt-6 sm:pt-12 max-w-[800px] mx-auto px-4"
                    >
                        <div className="space-y-2 sm:space-y-3">
                            <div className="flex items-center justify-center gap-2.5">
                                <Zap className="w-5 h-5 text-violet-600 dark:text-violet-400" strokeWidth={2.5} />
                                <div className="text-4xl sm:text-[42px] font-bold text-gray-900 dark:text-white leading-none">&lt;2s</div>
                            </div>
                            <div className="text-[11px] sm:text-[13px] font-medium text-gray-500 uppercase tracking-wider">Alert Response Time</div>
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                            <div className="flex items-center justify-center gap-2.5">
                                <Eye className="w-5 h-5 text-cyan-600 dark:text-cyan-400" strokeWidth={2.5} />
                                <div className="text-4xl sm:text-[42px] font-bold text-gray-900 dark:text-white leading-none">24/7</div>
                            </div>
                            <div className="text-[11px] sm:text-[13px] font-medium text-gray-500 uppercase tracking-wider">Continuous Monitoring</div>
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                            <div className="flex items-center justify-center gap-2.5">
                                <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" strokeWidth={2.5} />
                                <div className="text-4xl sm:text-[42px] font-bold text-gray-900 dark:text-white leading-none">99.9%</div>
                            </div>
                            <div className="text-[11px] sm:text-[13px] font-medium text-gray-500 uppercase tracking-wider">System Uptime</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
