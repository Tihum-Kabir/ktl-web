'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Database, Eye, Cpu, Bot, Network, TrendingUp, LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
    database: Database,
    eye: Eye,
    cpu: Cpu,
    bot: Bot,
    network: Network,
    'trending-up': TrendingUp,
};

interface Capability {
    iconName: string;
    title: string;
    description: string;
    href: string;
    gradient: string;
}

interface CoreCapabilitiesClientProps {
    capabilities: Capability[];
}

export function CoreCapabilitiesClient({ capabilities }: CoreCapabilitiesClientProps) {
    return (
        <section className="relative py-20 md:py-32 overflow-hidden">
            {/* Background */}
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-black dark:via-slate-950 dark:to-black" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            CORE CAPABILITIES
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Empowering your enterprise with cutting-edge technology stacks
                    </p>
                </motion.div>

                {/* Capabilities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {capabilities.map((capability, index) => (
                        <CapabilityCard
                            key={index}
                            {...capability}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function CapabilityCard({ iconName, title, description, href, gradient, index }: Capability & { index: number }) {
    const Icon = iconMap[iconName] || Database;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link href={href}>
                <div className="group relative h-full bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 hover:scale-105">
                    {/* Icon */}
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${gradient} mb-6`}>
                        <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all">
                        {title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        {description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center text-violet-400 group-hover:text-violet-300 transition-colors">
                        <span className="font-medium">Learn more</span>
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Hover Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                </div>
            </Link>
        </motion.div>
    );
}
