'use client';

import { Plus, Trash2, MoveUp, MoveDown } from 'lucide-react';

interface PricingTier {
    name: string;
    subtitle?: string;
    monthly_price?: number;
    annual_price?: number;
    discount_percentage?: number;
    custom_pricing?: boolean;
    features: string[];
    cta: string;
    is_recommended?: boolean;
}

interface PricingTierEditorProps {
    tiers: PricingTier[];
    onChange: (tiers: PricingTier[]) => void;
}

export function PricingTierEditor({ tiers, onChange }: PricingTierEditorProps) {
    const addTier = () => {
        if (tiers.length >= 3) {
            alert('Maximum 3 pricing tiers allowed');
            return;
        }

        onChange([
            ...tiers,
            {
                name: '',
                subtitle: '',
                monthly_price: 0,
                annual_price: 0,
                discount_percentage: 0,
                custom_pricing: false,
                features: [],
                cta: 'Get Started',
                is_recommended: false,
            },
        ]);
    };

    const removeTier = (index: number) => {
        onChange(tiers.filter((_, i) => i !== index));
    };

    const updateTier = (index: number, field: keyof PricingTier, value: any) => {
        const updated = [...tiers];
        updated[index] = { ...updated[index], [field]: value };

        const tier = updated[index];

        // If discount percentage is manually changed, calculate annual price
        if (field === 'discount_percentage' && tier.monthly_price) {
            const discountDecimal = (value || 0) / 100;
            const monthlyYearly = tier.monthly_price * 12;
            tier.annual_price = Math.round(monthlyYearly * (1 - discountDecimal));
        }
        // If monthly price changes and discount exists, recalculate annual
        else if (field === 'monthly_price' && tier.discount_percentage) {
            const discountDecimal = tier.discount_percentage / 100;
            const monthlyYearly = (value || 0) * 12;
            tier.annual_price = Math.round(monthlyYearly * (1 - discountDecimal));
        }
        // If annual price is manually changed, recalculate discount
        else if (field === 'annual_price' && tier.monthly_price) {
            const monthlyYearly = tier.monthly_price * 12;
            const savings = monthlyYearly - (value || 0);
            tier.discount_percentage = Math.round((savings / monthlyYearly) * 100);
        }

        onChange(updated);
    };

    const addFeature = (tierIndex: number) => {
        const updated = [...tiers];
        updated[tierIndex].features = [...updated[tierIndex].features, ''];
        onChange(updated);
    };

    const updateFeature = (tierIndex: number, featureIndex: number, value: string) => {
        const updated = [...tiers];
        updated[tierIndex].features[featureIndex] = value;
        onChange(updated);
    };

    const removeFeature = (tierIndex: number, featureIndex: number) => {
        const updated = [...tiers];
        updated[tierIndex].features = updated[tierIndex].features.filter((_, i) => i !== featureIndex);
        onChange(updated);
    };

    const moveTier = (index: number, direction: 'up' | 'down') => {
        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === tiers.length - 1)
        ) {
            return;
        }

        const updated = [...tiers];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
        onChange(updated);
    };

    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-xl font-semibold text-white">Pricing Plans</h2>
                    <p className="text-sm text-gray-700 dark:text-gray-400 mt-1">Configure pricing packages (max 3).</p>
                </div>
                {tiers.length < 3 && (
                    <button
                        onClick={addTier}
                        className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-full font-medium transition-all shadow-lg shadow-violet-600/20 hover:shadow-violet-600/40"
                    >
                        <Plus className="w-4 h-4" />
                        Add Plan
                    </button>
                )}
            </div>

            {tiers.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-white/5 rounded-2xl bg-white/[0.02]">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-700 dark:text-gray-400">
                        <Plus className="w-6 h-6" />
                    </div>
                    <p className="text-gray-300 font-medium">No pricing plans added</p>
                    <p className="text-sm text-gray-500 mt-1">Create plans like 'Basic', 'Pro', or 'Enterprise'.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {tiers.map((tier, tierIndex) => (
                        <div
                            key={tierIndex}
                            className={`bg-slate-950 border rounded-2xl p-6 space-y-5 transition-all ${tier.is_recommended ? 'border-violet-500/50 shadow-lg shadow-violet-500/10' : 'border-white/10 hover:border-white/20'
                                }`}
                        >
                            {/* Tier Header */}
                            <div className="flex items-center justify-between pb-4 border-b border-white/5">
                                <span className={`text-xs font-bold uppercase tracking-wider ${tier.is_recommended ? 'text-violet-400' : 'text-gray-500'}`}>
                                    Plan #{tierIndex + 1} {tier.is_recommended && '(Recommended)'}
                                </span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => moveTier(tierIndex, 'up')}
                                        disabled={tierIndex === 0}
                                        className="p-1.5 bg-white/5 hover:bg-white/10 text-white rounded-lg disabled:opacity-30 transition-colors"
                                        title="Move Left/Up"
                                    >
                                        <MoveUp className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => moveTier(tierIndex, 'down')}
                                        disabled={tierIndex === tiers.length - 1}
                                        className="p-1.5 bg-white/5 hover:bg-white/10 text-white rounded-lg disabled:opacity-30 transition-colors"
                                        title="Move Right/Down"
                                    >
                                        <MoveDown className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => removeTier(tierIndex)}
                                        className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors border border-transparent hover:border-red-500/30"
                                        title="Remove Plan"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            {/* Tier Name & Subtitle */}
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                                        Plan Name
                                    </label>
                                    <input
                                        type="text"
                                        value={tier.name}
                                        onChange={(e) => updateTier(tierIndex, 'name', e.target.value)}
                                        className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all font-bold text-lg"
                                        placeholder="e.g. Professional"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                                        Subtitle / Description
                                    </label>
                                    <input
                                        type="text"
                                        value={tier.subtitle || ''}
                                        onChange={(e) => updateTier(tierIndex, 'subtitle', e.target.value)}
                                        className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                                        placeholder="e.g. Most popular for growing teams"
                                    />
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <div className="flex items-start justify-between mb-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={tier.custom_pricing || false}
                                            onChange={(e) => updateTier(tierIndex, 'custom_pricing', e.target.checked)}
                                            className="w-4 h-4 rounded bg-white/10 border-white/20 text-violet-600 focus:ring-violet-500"
                                        />
                                        <span className="text-sm font-medium text-white">Contact for Price</span>
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={tier.is_recommended || false}
                                            onChange={(e) => updateTier(tierIndex, 'is_recommended', e.target.checked)}
                                            className="w-4 h-4 rounded bg-white/10 border-white/20 text-violet-600 focus:ring-violet-500"
                                        />
                                        <span className="text-sm text-gray-300">Recommended</span>
                                    </label>
                                </div>

                                {!tier.custom_pricing && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-400 mb-1.5">
                                                Monthly Price ($)
                                            </label>
                                            <input
                                                type="number"
                                                value={tier.monthly_price || ''}
                                                onChange={(e) =>
                                                    updateTier(tierIndex, 'monthly_price', parseFloat(e.target.value) || 0)
                                                }
                                                className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500 font-mono"
                                                placeholder="2999"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-400 mb-1.5">
                                                Annual Price ($)
                                            </label>
                                            <input
                                                type="number"
                                                value={tier.annual_price || ''}
                                                onChange={(e) =>
                                                    updateTier(tierIndex, 'annual_price', parseFloat(e.target.value) || 0)
                                                }
                                                className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500 font-mono"
                                                placeholder="29990"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Features */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-400 uppercase tracking-wide">
                                        Included Features
                                    </label>
                                    <button
                                        onClick={() => addFeature(tierIndex)}
                                        className="text-xs text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1"
                                    >
                                        <Plus className="w-3 h-3" />
                                        Add Item
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {tier.features.map((feature, featureIndex) => (
                                        <div key={featureIndex} className="flex items-center gap-2 group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-violet-500/50" />
                                            <input
                                                type="text"
                                                value={feature}
                                                onChange={(e) =>
                                                    updateFeature(tierIndex, featureIndex, e.target.value)
                                                }
                                                className="flex-1 px-3 py-1.5 bg-transparent border-b border-white/10 focus:border-violet-500 text-white placeholder-gray-600 focus:outline-none transition-colors text-sm"
                                                placeholder="Feature description"
                                            />
                                            <button
                                                onClick={() => removeFeature(tierIndex, featureIndex)}
                                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/10 text-gray-600 hover:text-red-400 rounded transition-all"
                                                title="Remove Item"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                    {tier.features.length === 0 && (
                                        <p className="text-xs text-gray-600 italic py-2">No features listed yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
