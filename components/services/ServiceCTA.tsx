'use client';

import type { Service } from '@/app/actions/services';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function ServiceCTA({ service }: { service: Service }) {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl mx-auto"
            >
                <div className="relative overflow-hidden rounded-[3rem] border border-white/10">
                    {/* Background Aurora */}
                    <div className="absolute inset-0 bg-slate-950">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] mix-blend-screen" />
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[100px] mix-blend-screen" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-12 md:p-20 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
                            <Sparkles className="w-4 h-4 text-violet-300" />
                            <span className="text-xs font-medium text-violet-200 tracking-wide uppercase">Ready to Deploy?</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-semibold text-white mb-6 tracking-tight max-w-3xl mx-auto">
                            Secure your infrastructure with next-gen intelligence.
                        </h2>

                        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                            Join the leading organizations trusting Kingsforth for critical response and threat detection.
                        </p>

                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium text-lg transition-all duration-300 hover:scale-105 hover:bg-gray-100 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                        >
                            Start Transformation
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
