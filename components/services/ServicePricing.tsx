'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Service } from '@/app/actions/services';
import Link from 'next/link';
import { Check, Sparkles } from 'lucide-react';

type BillingPeriod = 'monthly' | 'annual';

export function ServicePricing({ service }: { service: Service }) {
    const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');

    if (!service.pricing || !service.pricing.tiers) {
        return null;
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50 } }
    };

    const tiers = service.pricing.tiers;
    const hasBothPeriods = tiers.some((tier: any) => tier.monthly_price && tier.annual_price);

    // Calculate discount percentage
    const getDiscount = (tier: any) => {
        if (tier.discount_percentage) return tier.discount_percentage;
        if (tier.monthly_price && tier.annual_price) {
            const monthlyYearly = tier.monthly_price * 12;
            const savings = monthlyYearly - tier.annual_price;
            return Math.round((savings / monthlyYearly) * 100);
        }
        return 0;
    };

    const formatPrice = (tier: any) => {
        if (tier.custom_pricing) return 'Custom';

        const price = billingPeriod === 'monthly' ? tier.monthly_price : tier.annual_price;
        if (!price) return tier.price || 'Custom';

        // If simple number, format it
        return `$${Number(price).toLocaleString()}`;
    };

    return (
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
            {/* Removed opaque bg to show global stars */}

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4 tracking-tight">Flexible Plans</h2>
                    <p className="text-gray-400 text-lg font-light tracking-wide max-w-2xl mx-auto">Enterprise-grade security tailored to your exact infrastructure needs.</p>

                    {/* Billing Period Toggle */}
                    {hasBothPeriods && (
                        <div className="flex justify-center mt-10">
                            <div className="bg-white/5 p-1.5 rounded-full border border-white/10 flex items-center">
                                <button
                                    onClick={() => setBillingPeriod('monthly')}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${billingPeriod === 'monthly' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setBillingPeriod('annual')}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${billingPeriod === 'annual' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    Yearly
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Pricing tiers */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
                >
                    {tiers.map((tier: any, index: number) => {
                        const isRecommended = tier.is_recommended;
                        const price = formatPrice(tier);

                        return (
                            <motion.div
                                key={index}
                                variants={item}
                                className={`relative p-1 rounded-[2.5rem] transition-all duration-500 group ${isRecommended ? 'bg-gradient-to-b from-violet-500/50 to-cyan-500/50 shadow-[0_0_50px_-10px_rgba(124,58,237,0.3)]' : 'bg-gradient-to-b from-white/10 to-white/5 hover:from-white/20 hover:to-white/10'}`}
                            >
                                <div className="h-full relative flex flex-col p-8 rounded-[2.3rem] bg-slate-950/90 backdrop-blur-xl overflow-hidden">
                                    {/* Background Gradient */}
                                    {isRecommended && (
                                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-violet-600/10 via-transparent to-cyan-600/10 opacity-50" />
                                    )}

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="mb-8">
                                            {isRecommended && (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 text-[11px] font-bold uppercase tracking-widest text-white bg-gradient-to-r from-violet-600 to-cyan-600 rounded-full shadow-lg shadow-violet-500/20">
                                                    <Sparkles className="w-3 h-3" /> Recommended
                                                </span>
                                            )}
                                            <h3 className="text-xl font-semibold text-white mb-2">{tier.name}</h3>
                                            <p className="text-gray-400 text-sm h-10 font-light">{tier.subtitle}</p>
                                        </div>

                                        <div className="mb-8 flex items-baseline gap-1">
                                            <span className="text-5xl font-bold tracking-tighter bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">{price}</span>
                                            {(!tier.custom_pricing && (billingPeriod === 'monthly' || tier.monthly_price) && tier.price !== 'Custom') && (
                                                <span className="text-gray-500 text-sm font-medium">/{billingPeriod === 'monthly' ? 'mo' : 'yr'}</span>
                                            )}
                                        </div>

                                        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

                                        <ul className="space-y-4 mb-8 flex-1">
                                            {tier.features?.map((feature: string, featureIndex: number) => (
                                                <li key={featureIndex} className="flex items-start gap-3 group/item">
                                                    <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isRecommended ? 'bg-violet-500/20 text-violet-300 group-hover/item:text-white group-hover/item:bg-violet-500' : 'bg-white/10 text-gray-400 group-hover/item:text-white group-hover/item:bg-white/20'}`}>
                                                        <Check className="w-3 h-3" />
                                                    </div>
                                                    <span className="text-gray-300 text-sm font-light leading-relaxed group-hover/item:text-white transition-colors">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Link
                                            href="/contact"
                                            className={`w-full py-4 px-6 rounded-2xl text-center font-bold text-sm transition-all duration-300 relative overflow-hidden group/btn ${isRecommended
                                                ? 'bg-gradient-to-r from-[#6ac4f1] to-[#3a9fd0] hover:from-[#5ab3e0] hover:to-[#2a8fb0] text-black hover:scale-[1.02] shadow-[0_0_30px_-5px_rgba(106,196,241,0.5)] border border-[#a2dcf7]/30'
                                                : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'
                                                }`}
                                        >
                                            <span className="relative z-10">{tier.cta || (tier.custom_pricing ? 'Contact Sales' : 'Get Started')}</span>
                                            {isRecommended && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />}
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Special pricing notice */}
                <div className="mt-16 text-center">
                    <p className="text-sm text-gray-500 font-light">
                        Are you an educational institution? <Link href="/contact" className="text-white underline underline-offset-4 hover:text-cyan-400 transition-colors">Contact us for special grants.</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
