'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Solution } from '@/app/actions/solutions';
import { Check, Play, ArrowRight, Activity, Shield, Users, Clock, Globe, Lock } from 'lucide-react';
import * as Icons from 'lucide-react';

const iconMap: any = Icons;

export default function SolutionDetails({ solution }: { solution: Solution }) {

    // Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="bg-black min-h-screen">

            {/* 1. Hero Section */}
            <section className="relative min-h-[90vh] flex items-center pt-32 pb-32 overflow-hidden">
                {/* Background Image / Video */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/40 z-10" />
                    {solution.hero_image && (
                        <Image
                            src={solution.hero_image}
                            alt={solution.title}
                            fill
                            className="object-cover opacity-60"
                            priority
                        />
                    )}
                </div>

                <div className="container mx-auto px-6 relative z-30 grid lg:grid-cols-2 gap-12 items-center pointer-events-none">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="max-w-3xl pointer-events-auto"
                    >
                        <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight break-words">
                            {solution.title}
                        </h1>
                        {/* Text Shimmer Effect on Subtitle or Tagline */}
                        <p className="text-xl md:text-2xl text-violet-200 mb-8 font-light leading-relaxed">
                            {solution.subtitle || solution.description?.slice(0, 150)}...
                        </p>

                        <div className="flex flex-wrap gap-4 relative z-40 mb-12">
                            <Link href="#contact" className="px-8 py-4 bg-white text-slate-950 rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center gap-2">
                                Get Started <ArrowRight className="w-4 h-4" />
                            </Link>
                            {solution.hero_video_url && (
                                <a href={solution.hero_video_url} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold hover:bg-white/20 transition-colors flex items-center gap-2">
                                    <Play className="w-4 h-4 fill-current" /> Watch Demo
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. Stats / Key Benefits Bar */}
            {solution.stats && solution.stats.length > 0 && (
                <section className="relative z-20 -mt-16 pb-24 px-6 pointer-events-none">
                    <div className="container mx-auto pointer-events-auto">
                        <div className="grid md:grid-cols-3 gap-6">
                            {solution.stats.map((stat, i) => {
                                const Icon = iconMap[stat.icon_name] || Activity;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:border-violet-500/30 transition-colors"
                                    >
                                        <div className="w-12 h-12 bg-violet-500/10 rounded-2xl flex items-center justify-center mb-4 text-violet-400">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
                                        <p className="text-gray-400 font-medium">{stat.label}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* 3. Zig-Zag Content Blocks */}
            <section className="py-24 px-6">
                <div className="container mx-auto space-y-32">
                    {solution.content_blocks?.map((block, i) => (
                        <div key={block.id} className={`flex flex-col lg:flex-row gap-16 items-center ${block.align === 'right' ? 'lg:flex-row-reverse' : ''}`}>

                            {/* Text Content */}
                            <motion.div
                                initial={{ opacity: 0, x: block.align === 'left' ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="flex-1 space-y-8"
                            >
                                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                                    {block.title}
                                </h2>
                                <div className="text-gray-400 text-lg leading-relaxed whitespace-pre-wrap">
                                    {block.content}
                                </div>
                                {block.list_items && block.list_items.length > 0 && (
                                    <ul className="space-y-4 pt-4">
                                        {block.list_items.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <div className="mt-1 w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                                                    <Check className="w-3.5 h-3.5 text-cyan-400" strokeWidth={3} />
                                                </div>
                                                <span className="text-gray-300 font-medium">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </motion.div>

                            {/* Image / Visual */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="flex-1 w-full"
                            >
                                <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/10 group">
                                    {/* Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                    {block.image ? (
                                        <Image
                                            src={block.image}
                                            alt={block.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-gray-700">
                                            No Image
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Map Section */}
            {solution.map_embed_url && (
                <section className="py-24 bg-zinc-900 border-y border-white/5 mx-6 rounded-[3rem] my-12">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Global Deployment & Coverage</h2>
                        <div className="relative w-full h-[500px] rounded-3xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
                            <iframe
                                src={(() => {
                                    const url = solution.map_embed_url || '';
                                    if (url.startsWith('<iframe') && url.includes('src="')) {
                                        const match = url.match(/src="([^"]+)"/);
                                        return match ? match[1] : url;
                                    }
                                    return url;
                                })()}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* 5. CTA Section */}
            <section id="contact" className="py-32 px-6">
                <div className="container mx-auto max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-[3rem] overflow-hidden p-8 md:p-24 text-center border border-white/10"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-[#061632] to-[#061632] z-0" />
                        {/* Animated Mesh/Grid bg could go here */}

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
                                Ready to secure your future?
                            </h2>
                            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                                Deploy {solution.title} today and experience the Kingsforth standard in intelligence and response.
                            </p>
                            <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-slate-950 text-lg font-bold rounded-full hover:bg-cyan-50 transition-colors shadow-[0_0_40px_-5px_rgba(255,255,255,0.3)]">
                                Schedule Consultation
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
