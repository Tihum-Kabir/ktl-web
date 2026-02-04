'use client';

import { motion } from 'framer-motion';
import type { Service } from '@/app/actions/services';
import { Check, Zap, Shield, Database, Eye, Cpu, TrendingUp, Network } from 'lucide-react';

const iconMap: Record<string, any> = {
    'check': Check,
    'zap': Zap,
    'shield': Shield,
    'database': Database,
    'eye': Eye,
    'cpu': Cpu,
    'trending-up': TrendingUp,
    'network': Network,
};

const hoverColors: Record<string, string> = {
    'surveillance': 'group-hover:border-cyan-500/30',
    'forensic': 'group-hover:border-violet-500/30',
    'automation': 'group-hover:border-emerald-500/30',
    'iot': 'group-hover:border-amber-500/30',
    'consulting': 'group-hover:border-rose-500/30',
    'default': 'group-hover:border-violet-500/30',
};

const iconTargetColors: Record<string, string> = {
    'surveillance': 'group-hover:text-cyan-400',
    'forensic': 'group-hover:text-violet-400',
    'automation': 'group-hover:text-emerald-400',
    'iot': 'group-hover:text-amber-400',
    'consulting': 'group-hover:text-rose-400',
    'default': 'group-hover:text-white',
};

export function ServiceFeatures({ service }: { service: Service }) {
    if (!service.features || service.features.length === 0) {
        return null;
    }

    const category = service.category || 'default';
    const borderClass = hoverColors[category] || hoverColors['default'];
    const textClass = iconTargetColors[category] || iconTargetColors['default'];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative">
            {/* Background Elements */}
            <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section header */}
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-semibold text-white mb-6 tracking-tight"
                    >
                        Capabilities & Features
                    </motion.h2>
                    {service.description && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="max-w-3xl mx-auto text-lg text-gray-400/80 leading-relaxed font-light"
                            dangerouslySetInnerHTML={{ __html: service.description }}
                        />
                    )}
                </div>

                {/* Features grid - Staggered Animation */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {service.features.map((feature: any, index: number) => {
                        const IconComponent = iconMap[feature.icon] || Check;

                        return (
                            <motion.div
                                key={index}
                                variants={item}
                                className={`group relative p-1 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-white/5 hover:from-cyan-500/40 hover:to-violet-600/40 transition-all duration-500 backdrop-blur-xl`}
                            >
                                {/* Persistent Glow Behind */}
                                <div className={`absolute -inset-4 bg-gradient-to-r ${borderClass.replace('border-', 'from-').replace('/30', '/20')} to-transparent rounded-[3rem] opacity-20 group-hover:opacity-40 blur-2xl transition-opacity duration-500`} />

                                {/* Inner Card Content */}
                                <div className="h-full relative p-8 rounded-[2.3rem] bg-[#0b0518] border border-white/10 group-hover:bg-[#130a2a] group-hover:border-transparent transition-all duration-300 overflow-hidden">
                                    {/* Futuristic Grid Overlay */}
                                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.08] group-hover:opacity-[0.15] transition-opacity" />

                                    {/* Ambient Glow */}
                                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${borderClass.replace('border-', 'from-').replace('/30', '/20')} to-transparent opacity-0 group-hover:opacity-100 blur-[80px] transition-all duration-500`} />

                                    <div className="relative z-10">
                                        {/* Floating Icon Base */}
                                        <div className="mb-8 relative">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.4)]">
                                                <IconComponent className={`w-6 h-6 text-gray-300 ${textClass} transition-colors`} strokeWidth={1.5} />
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-semibold text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                                            {feature.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-400 text-sm leading-relaxed font-light group-hover:text-gray-300 transition-colors">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
