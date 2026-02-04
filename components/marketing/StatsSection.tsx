'use client';

import { motion } from 'framer-motion';
import { Users, Target, Clock, Shield } from 'lucide-react';

const stats = [
    {
        icon: Target,
        value: "1M+",
        label: "Threats Detected",
        color: "from-primary to-accent-purple"
    },
    {
        icon: Clock,
        value: "<60s",
        label: "Response Time",
        color: "from-tertiary to-accent-blue"
    },
    {
        icon: Shield,
        value: "99.9%",
        label: "System Uptime",
        color: "from-accent-cyan to-tertiary"
    },
    {
        icon: Users,
        value: "500+",
        label: "Customers Protected",
        color: "from-secondary to-accent-purple"
    }
];

export function StatsSection() {
    return (
        <section className="relative py-24 overflow-hidden transition-colors duration-300">
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/50 to-transparent dark:from-tertiary/10 dark:via-secondary/10 dark:to-tertiary/10" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} delay={index * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface StatCardProps {
    icon: any;
    value: string;
    label: string;
    color: string;
    delay: number;
}

function StatCard({ icon: Icon, value, label, color, delay }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="text-center group"
        >
            <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm dark:shadow-none`}>
                <Icon className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            <div className="text-4xl md:text-5xl font-extrabold text-foreground mb-2">
                {value}
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm md:text-base font-bold uppercase tracking-wider">
                {label}
            </div>
        </motion.div>
    );
}
