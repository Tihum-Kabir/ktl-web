'use client';

import { Plus, Trash2 } from 'lucide-react';

interface Feature {
    icon: string;
    title: string;
    description: string;
}

interface FeatureEditorProps {
    features: Feature[];
    onChange: (features: Feature[]) => void;
}

export function FeatureEditor({ features, onChange }: FeatureEditorProps) {
    const addFeature = () => {
        onChange([
            ...features,
            {
                icon: 'zap',
                title: '',
                description: '',
            },
        ]);
    };

    const removeFeature = (index: number) => {
        onChange(features.filter((_, i) => i !== index));
    };

    const updateFeature = (index: number, field: keyof Feature, value: string) => {
        const updated = [...features];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-xl font-semibold text-white">Service Highlights</h2>
                    <p className="text-sm text-gray-700 dark:text-gray-400 mt-1">Add key benefits or features displayed on the service page.</p>
                </div>
                <button
                    onClick={addFeature}
                    className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-full font-medium transition-all shadow-lg shadow-violet-600/20 hover:shadow-violet-600/40"
                >
                    <Plus className="w-4 h-4" />
                    Add Feature
                </button>
            </div>

            {features.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-white/5 rounded-2xl bg-white/[0.02]">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-700 dark:text-gray-400">
                        <Plus className="w-6 h-6" />
                    </div>
                    <p className="text-gray-300 font-medium">No highlights added yet</p>
                    <p className="text-sm text-gray-500 mt-1">Click "Add Feature" to showcase what makes this service unique.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-slate-950 border border-white/10 rounded-2xl p-6 space-y-5 transition-all hover:border-violet-500/30 group"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 group-hover:text-violet-400 transition-colors">
                                    Highlight #{index + 1}
                                </span>
                                <button
                                    onClick={() => removeFeature(index)}
                                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors border border-transparent hover:border-red-500/30"
                                    title="Remove this feature"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                                    Icon
                                </label>
                                <select
                                    value={feature.icon}
                                    onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="search">Search (Magnifying Glass)</option>
                                    <option value="shield">Shield (Protection)</option>
                                    <option value="database">Database (Storage)</option>
                                    <option value="lock">Lock (Security)</option>
                                    <option value="zap">Zap (Speed/Power)</option>
                                    <option value="check-circle">Check Circle (Success)</option>
                                    <option value="eye">Eye (Vision)</option>
                                    <option value="alert-triangle">Alert (Warning)</option>
                                    <option value="cpu">CPU (Technology)</option>
                                    <option value="clock">Clock (Time)</option>
                                    <option value="trending-up">Trending Up (Growth)</option>
                                    <option value="settings">Settings (Config)</option>
                                    <option value="radio">Radio (Signal)</option>
                                    <option value="bot">Bot (Automation)</option>
                                    <option value="users">Users (People)</option>
                                    <option value="bar-chart">Bar Chart (Analytics)</option>
                                    <option value="network">Network (Connection)</option>
                                    <option value="git-compare">Git Compare (Diff)</option>
                                    <option value="award">Award (Quality)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                                    Headline
                                </label>
                                <input
                                    type="text"
                                    value={feature.title}
                                    onChange={(e) => updateFeature(index, 'title', e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                                    placeholder="e.g. Real-time Analysis"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                                    Summary
                                </label>
                                <textarea
                                    value={feature.description}
                                    onChange={(e) => updateFeature(index, 'description', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all resize-none text-sm"
                                    placeholder="Brief explanation..."
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
