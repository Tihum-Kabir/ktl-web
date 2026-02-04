'use client';

import { motion } from 'framer-motion';
import { Brain, Search, Shield, Eye, CheckCircle, Video, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export interface ProductFeature {
    id: string;
    title: string;
    description: string;
    media_url?: string;
    media_type?: 'image' | 'video';
    media_fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    features_list: string[];
    image_position: 'left' | 'right';
}

export function ProductShowcaseClient({ features }: { features: ProductFeature[] }) {
    // Map icons to features based on title as a fallback/heuristic or just cycle them
    // For now, we'll use a helper to get icon by title or index
    const getIcon = (title: string, index: number) => {
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes('cognitive') || lowerTitle.includes('analytics')) return Brain;
        if (lowerTitle.includes('search') || lowerTitle.includes('forensic')) return Search;
        if (lowerTitle.includes('compliance') || lowerTitle.includes('automated')) return Shield;
        return [Brain, Search, Shield][index % 3];
    };

    return (
        <section className="relative py-24 sm:py-32 overflow-hidden transition-colors duration-300">
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
                    <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
                        <span className="text-cyan-700 dark:text-cyan-400 text-sm font-semibold uppercase tracking-wider">Featured Product</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-cyan-700 via-violet-700 to-cyan-700 dark:from-cyan-400 dark:via-violet-400 dark:to-cyan-400 bg-clip-text text-transparent">
                            KINGSEYE
                        </span>
                    </h2>
                    <p className="text-lg md:text-2xl text-gray-800 dark:text-gray-300 max-w-3xl mx-auto font-medium">
                        Turn Passive Footage into Actionable Intelligence
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-400 max-w-3xl mx-auto mt-4">
                        Legacy security cameras are reactive—they only record. Kingseye is active. It watches, understands, and alerts you instantly.
                    </p>
                </motion.div>

                {/* Features Loop */}
                {features.map((feature, index) => (
                    <FeatureBlock
                        key={feature.id}
                        icon={getIcon(feature.title, index)}
                        title={feature.title}
                        description={feature.description}
                        features={feature.features_list}
                        imagePosition={feature.image_position}
                        delay={0.2 * (index + 1)}
                        mediaUrl={feature.media_url}
                        mediaType={feature.media_type}
                        mediaFit={feature.media_fit}
                    />
                ))}

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-20"
                >
                    <Link
                        href="/product/features"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
                    >
                        <Eye className="w-5 h-5" />
                        Explore KINGSEYE
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

interface FeatureBlockProps {
    icon: any;
    title: string;
    description: string;
    features: string[];
    imagePosition: 'left' | 'right';
    delay: number;
    mediaUrl?: string;
    mediaType?: 'image' | 'video';
    mediaFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

function FeatureBlock({ icon: Icon, title, description, features, imagePosition, delay, mediaUrl, mediaType, mediaFit = 'cover' }: FeatureBlockProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="mb-24 last:mb-0"
        >
            <div className={`grid md:grid-cols-2 gap-12 items-center ${imagePosition === 'right' ? 'md:flex-row-reverse' : ''}`}>
                {/* Text Content */}
                <div className={imagePosition === 'right' ? 'md:order-2' : ''}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-violet-100 dark:from-cyan-500/20 dark:to-violet-500/20 rounded-xl flex items-center justify-center">
                            <Icon className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h3>
                    </div>

                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        {description}
                    </p>

                    <div className="space-y-3">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Image/Visual Placeholder */}
                <div className={imagePosition === 'right' ? 'md:order-1' : ''}>
                    <div className="relative aspect-video bg-gray-100 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-cyan-400/20 shadow-lg shadow-gray-200 dark:shadow-cyan-400/10 group">
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
                                    className={`w-full h-full object-${mediaFit} transition-transform duration-700 group-hover:scale-105`}
                                />
                            )
                        ) : (
                            /* Placeholder if no media */
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <Icon className="w-16 h-16 text-cyan-400/30 mx-auto mb-4" />
                                    <p className="text-gray-500 text-sm">Demo Video / Screenshot</p>
                                </div>
                            </div>
                        )}

                        {/* Animated overlay effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        {/* Live indicator */}
                        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full border border-cyan-400/30">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                            <span className="text-xs text-cyan-400 font-medium">LIVE</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
