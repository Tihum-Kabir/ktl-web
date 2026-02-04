'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play, Shield } from 'lucide-react';
import Image from 'next/image';

interface ProductHeroProps {
    product: any;
}

export function ProductHero({ product }: ProductHeroProps) {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/40 z-10" />
                {product.hero_image ? (
                    <Image
                        src={product.hero_image}
                        alt={product.title}
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                ) : (
                    <div className="w-full h-full bg-zinc-900" />
                )}
            </div>

            <div className="container mx-auto px-4 lg:px-6 relative z-30">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 backdrop-blur-sm mb-8">
                            <Shield className="w-4 h-4 text-violet-400" />
                            <span className="text-sm font-medium text-violet-300 tracking-wide uppercase">
                                Enterprise Solution
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight break-words">
                            {product.title}
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl leading-relaxed font-light">
                            {product.subtitle || product.description?.substring(0, 150)}
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/contact" className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                                Request Demo <ArrowRight className="w-4 h-4" />
                            </Link>
                            {product.hero_video_url && (
                                <a
                                    href={product.hero_video_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Play className="w-4 h-4 fill-current" /> Watch Video
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
