'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

export function FinalCTA() {
    return (
        <section className="py-24 relative overflow-hidden transition-colors duration-300">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-violet-900/10 to-cyan-900/10 dark:from-cyan-900/30 dark:via-violet-900/30 dark:to-cyan-900/30" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

            {/* Animated gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="relative max-w-5xl mx-auto px-4 sm:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Badge */}
                    <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-8">
                        <span className="text-cyan-600 dark:text-cyan-400 text-sm font-semibold uppercase tracking-wider">Get Started Today</span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-gray-900 via-cyan-600 to-gray-900 dark:from-white dark:via-cyan-200 dark:to-white bg-clip-text text-transparent">
                            Ready to Secure
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-cyan-600 via-violet-600 to-cyan-600 dark:from-cyan-400 dark:via-violet-400 dark:to-cyan-400 bg-clip-text text-transparent">
                            Your Future?
                        </span>
                    </h2>

                    {/* Subheadline */}
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Join hundreds of organizations already protecting their assets with autonomous intelligence.
                        Transform your security infrastructure today.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/contact"
                            className="group px-8 py-4 bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 flex items-center gap-2"
                        >
                            <Calendar className="w-5 h-5" />
                            Book a Demo
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="/pricing"
                            className="px-8 py-4 bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 border border-gray-200 dark:border-white/20 hover:border-cyan-400/40 text-gray-900 dark:text-white text-lg font-semibold rounded-xl transition-all backdrop-blur-sm"
                        >
                            View Pricing
                        </Link>
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse" />
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyan-500 dark:bg-cyan-400 rounded-full animate-pulse" />
                            <span>Free consultation</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-violet-500 dark:bg-violet-400 rounded-full animate-pulse" />
                            <span>24/7 support</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
