'use client';

import { useState } from 'react';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';

export function AboutContentManager() {
    const [isLoading, setIsLoading] = useState(false);
    const [extraSections, setExtraSections] = useState<{ title: string, content: string }[]>([]);

    const addSection = () => setExtraSections([...extraSections, { title: '', content: '' }]);
    const updateSection = (index: number, field: 'title' | 'content', value: string) => {
        const newSections = [...extraSections];
        newSections[index][field] = value;
        setExtraSections(newSections);
    };
    const removeSection = (index: number) => setExtraSections(extraSections.filter((_, i) => i !== index));

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate save - In real app, you'd send `extraSections` to backend
        console.log('Saving sections:', extraSections);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        alert('Content saved!');
    };

    return (
        <div className="space-y-6">
            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">About Page Content</h2>
                <form onSubmit={handleSave} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Mission Statement</label>
                        <textarea
                            className="w-full h-32 bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-violet-500"
                            placeholder="Enter your mission statement..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Vision Statement</label>
                        <textarea
                            className="w-full h-32 bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-violet-500"
                            placeholder="Enter your vision statement..."
                        />
                    </div>

                    {/* Dynamic Extra Sections */}
                    <div className="space-y-4 pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-white">Additional Information</h3>
                            <button
                                type="button"
                                onClick={addSection}
                                className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1"
                            >
                                <Plus className="w-4 h-4" /> Add Section
                            </button>
                        </div>

                        {extraSections.map((section, index) => (
                            <div key={index} className="bg-black/20 p-4 rounded-lg border border-white/5 space-y-3 relative group">
                                <button
                                    type="button"
                                    onClick={() => removeSection(index)}
                                    className="absolute top-2 right-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <input
                                    type="text"
                                    value={section.title}
                                    onChange={(e) => updateSection(index, 'title', e.target.value)}
                                    placeholder="Section Title (e.g., Core Values)"
                                    className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white text-sm"
                                />
                                <textarea
                                    value={section.content}
                                    onChange={(e) => updateSection(index, 'content', e.target.value)}
                                    placeholder="Content..."
                                    className="w-full h-20 bg-black/40 border border-white/10 rounded px-3 py-2 text-white text-sm"
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center gap-2 px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Content
                    </button>
                </form>
            </div>
        </div>
    );
}
