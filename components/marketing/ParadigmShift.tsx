'use client';

import { motion } from 'framer-motion';
import { X, Check, AlertTriangle, Zap, Database, Users, Clock, Shield } from 'lucide-react';

export function ParadigmShift() {
    return (
        <section className="relative py-24 overflow-hidden transition-colors duration-300">
            {/* Background gradient - Made transparent for Starfall visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent dark:from-transparent dark:via-slate-900/40 dark:to-transparent opacity-80" />

            <div className="relative max-w-7xl mx-auto px-4 md:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20 relative z-10"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                            PARADIGM
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-cyan-700 to-violet-700 dark:from-cyan-400 dark:to-violet-600 bg-clip-text text-transparent">
                            SHIFT
                        </span>
                    </h2>
                    <p className="text-xl text-gray-700 dark:text-gray-400 max-w-3xl mx-auto font-medium">
                        Moving from legacy fragmentation to unified autonomy. The future isn't about more software; it's about intelligence.
                    </p>
                </motion.div>

                {/* Comparison Grid */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    {/* Old Way - Reactive Systems */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-red-200 dark:border-red-500/20 hover:border-red-500/40 transition-all shadow-sm dark:shadow-none">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-red-100 dark:bg-red-500/20 rounded-lg flex items-center justify-center">
                                    <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-300">Reactive Systems</h3>
                            </div>

                            <p className="text-gray-600 dark:text-gray-600 dark:text-gray-400 mb-8">
                                Disparate sensors, human latency, and data silos. Security alerts trigger only after the breach. Decisions are made on stale data.
                            </p>

                            <div className="space-y-4">
                                <ProblemItem icon={X} text="High Latency" subtext="Manual response delays" />
                                <ProblemItem icon={X} text="Data Silos Detected" subtext="Fragmented information" />
                                <ProblemItem icon={X} text="Manual Intervention Required" subtext="Human bottlenecks" />
                                <ProblemItem icon={X} text="Reactive Alerts" subtext="Post-breach notifications" />
                            </div>

                            {/* Metrics */}
                            <div className="mt-8 pt-6 border-t border-red-200 dark:border-red-500/20">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <div className="text-3xl font-bold text-red-600 dark:text-red-400">5-10min</div>
                                        <div className="text-xs text-gray-500 mt-1">Response Time</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-red-600 dark:text-red-400">60%</div>
                                        <div className="text-xs text-gray-500 mt-1">False Positives</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* New Way - Autonomous Action */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="relative"
                    >
                        <div className="bg-white dark:bg-slate-900/30 backdrop-blur-sm rounded-2xl p-8 border border-cyan-200 dark:border-cyan-400/40 hover:border-cyan-400/60 transition-all shadow-xl shadow-cyan-500/10 dark:shadow-cyan-400/10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-violet-100 dark:from-cyan-500/20 dark:to-violet-500/20 rounded-lg flex items-center justify-center">
                                    <Zap className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Autonomous Action</h3>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 mb-8">
                                A unified nervous system. Agents detect, analyze, and execute protocols in real-time. Threats are neutralized before they materialize.
                            </p>

                            <div className="space-y-4">
                                <SolutionItem icon={Check} text="Zero Latency" subtext="Instant AI response" />
                                <SolutionItem icon={Check} text="Unified Intelligence" subtext="Connected ecosystem" />
                                <SolutionItem icon={Check} text="Automated Defense" subtext="Proactive protection" />
                                <SolutionItem icon={Check} text="Predictive Alerts" subtext="Pre-breach detection" />
                            </div>

                            {/* Metrics */}
                            <div className="mt-8 pt-6 border-t border-cyan-200 dark:border-cyan-400/20">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-violet-600 dark:from-cyan-400 dark:to-violet-400 bg-clip-text text-transparent">&lt;60s</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-600 dark:text-gray-400 mt-1">Response Time</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-violet-600 dark:from-cyan-400 dark:to-violet-400 bg-clip-text text-transparent">99.9%</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-600 dark:text-gray-400 mt-1">Accuracy</div>
                                    </div>
                                </div>
                            </div>

                            {/* Live Indicator */}
                            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-cyan-600 dark:text-cyan-400">
                                <div className="w-2 h-2 bg-cyan-600 dark:bg-cyan-400 rounded-full animate-pulse" />
                                <span>System Active</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Arrow indicator */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                >
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// Problem Item Component (Red/Old Way)
function ProblemItem({ icon: Icon, text, subtext }: { icon: any; text: string; subtext: string }) {
    return (
        <div className="flex items-start gap-3 group">
            <div className="w-6 h-6 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <div>
                <div className="text-gray-900 dark:text-gray-300 font-medium">{text}</div>
                <div className="text-sm text-gray-500">{subtext}</div>
            </div>
        </div>
    );
}

// Solution Item Component (Cyan/New Way)
function SolutionItem({ icon: Icon, text, subtext }: { icon: any; text: string; subtext: string }) {
    return (
        <div className="flex items-start gap-3 group">
            <div className="w-6 h-6 bg-gradient-to-br from-cyan-100 to-violet-100 dark:from-cyan-500/20 dark:to-violet-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
                <div className="text-gray-900 dark:text-white font-medium">{text}</div>
                <div className="text-sm text-gray-600 dark:text-gray-600 dark:text-gray-400">{subtext}</div>
            </div>
        </div>
    );
}
