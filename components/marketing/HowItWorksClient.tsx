'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Zap, Shield, CheckCircle } from 'lucide-react';

const iconMap: Record<string, any> = {
    'AlertCircle': AlertCircle,
    'Zap': Zap,
    'Shield': Shield,
    'CheckCircle': CheckCircle
};

interface HowItWorksClientProps {
    steps: any[];
}

export function HowItWorksClient({ steps }: HowItWorksClientProps) {
    // Helper to get icon component
    const getIcon = (name: string) => iconMap[name] || AlertCircle;

    return (
        <section id="features" className="relative py-24 sm:py-32 overflow-hidden transition-colors duration-300">
            {/* Background - Made transparent for Starfall visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-transparent dark:via-slate-950/40 dark:to-transparent" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20 relative z-10"
                >
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                            ORCHESTRATING THE
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-cyan-700 to-violet-700 dark:from-cyan-400 dark:to-violet-600 bg-clip-text text-transparent">
                            AUTONOMOUS ENTERPRISE
                        </span>
                    </h2>
                    <p className="text-xl text-gray-700 dark:text-gray-400 max-w-3xl mx-auto font-medium">
                        True digitization isn't about buying new tools; it's about making them talk to each other.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Connection Line */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 via-violet-500/50 to-green-500/50" />

                    {/* Steps */}
                    <div className="space-y-16">
                        {steps.map((step: any, index: number) => (
                            <ProcessStep
                                key={step.id || index}
                                number={step.step_number}
                                icon={getIcon(step.icon_name)}
                                title={step.title}
                                description={step.description}
                                color={step.color_theme || "from-cyan-500 to-blue-500"}
                                index={index}
                                delay={index * 0.2}
                                mediaUrl={step.media_url}
                                mediaType={step.media_type}
                                mediaFit={step.media_fit}
                            />
                        ))}
                    </div>
                </div>

                {/* Result Highlight */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-block px-8 py-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl">
                        <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                            &lt; 60 seconds
                        </div>
                        <div className="text-gray-400">Average Threat Response Time</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

interface ProcessStepProps {
    number: string;
    icon: any;
    title: string;
    description: string;
    color: string;
    index: number;
    delay: number;
    mediaUrl?: string;
    mediaType?: string;
    mediaFit?: string;
}

function ProcessStep({ number, icon: Icon, title, description, color, index, delay, mediaUrl, mediaType, mediaFit = 'cover' }: ProcessStepProps) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className={`relative grid lg:grid-cols-2 gap-8 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}
        >
            {/* Content */}
            <div className={`${isEven ? 'lg:text-right lg:pr-16' : 'lg:col-start-2 lg:pl-16'}`}>
                <div className={`inline-block ${isEven ? 'lg:float-right' : ''}`}>
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}>
                            <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                        </div>
                        <div className={`text-4xl sm:text-6xl font-bold bg-gradient-to-br ${color} bg-clip-text text-transparent`}>
                            {number}
                        </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">{title}</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
                        {description}
                    </p>
                </div>
            </div>

            {/* Visual/Placeholder */}
            <div className={`${isEven ? 'lg:col-start-2' : 'lg:col-start-1 lg:row-start-1'}`}>
                <div className={`aspect-video bg-gray-100 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg ${color.includes('cyan') ? 'shadow-cyan-500/10' : color.includes('violet') ? 'shadow-violet-500/10' : color.includes('green') ? 'shadow-green-500/10' : 'shadow-orange-400/10'}`}>
                    <div className="h-full w-full relative group">
                        {mediaUrl ? (
                            mediaType === 'video' ? (
                                <video
                                    src={mediaUrl}
                                    className={`w-full h-full object-${mediaFit}`}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                />
                            ) : (
                                <img
                                    src={mediaUrl}
                                    alt={title}
                                    className={`w-full h-full object-${mediaFit}`}
                                />
                            )
                        ) : (
                            <div className="h-full flex items-center justify-center">
                                <Icon className="w-20 h-20 text-white/10" />
                            </div>
                        )}

                        {/* Live/Active Badge for Visual Flair (Optional) */}
                        {mediaUrl && (
                            <div className="absolute top-4 right-4 flex items-center gap-2 px-2 py-1 bg-black/50 backdrop-blur rounded text-[10px] border border-white/10">
                                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${color} animate-pulse`} />
                                <span className="text-white/80 font-mono">LIVE FEED</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Center Node */}
            <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className={`w-4 h-4 bg-gradient-to-br ${color} rounded-full shadow-lg`} />
            </div>
        </motion.div>
    );
}
