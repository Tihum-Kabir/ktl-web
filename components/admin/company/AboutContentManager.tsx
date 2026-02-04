'use client';

import { useState, useEffect } from 'react';
import { getAboutContent, updateAboutContent } from '@/app/actions/company';
import { Save, Loader2, Sparkles, FileText } from 'lucide-react';

export function AboutContentManager() {
    const [content, setContent] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadContent();
    }, []);

    async function loadContent() {
        // We ensure we have default sections even if DB is empty
        const data = await getAboutContent();
        const defaultSections = ['mission', 'vision'];

        // Merge DB data with defaults to ensure forms exist
        const merged = defaultSections.map(key => {
            const found = data.find((d: any) => d.section_key === key);
            return found || { section_key: key, title: '', content: '' };
        });

        setContent(merged);
        setLoading(false);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-cyan-500 rounded-full"></span>
                    About Page Content
                </h2>
            </div>

            {loading ? (
                <div className="p-12 flex justify-center text-cyan-500/50">
                    <Loader2 className="w-8 h-8 animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {content.map((section) => (
                        <AboutSectionForm key={section.section_key} section={section} />
                    ))}
                </div>
            )}
        </div>
    );
}

function AboutSectionForm({ section }: { section: any }) {
    const [saving, setSaving] = useState(false);
    const [title, setTitle] = useState(section.title || '');
    const [message, setMessage] = useState(section.content || '');

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', message);

        try {
            await updateAboutContent(section.section_key, formData);
        } catch (error) {
            console.error(error);
            alert('Failed to save');
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={handleSave} className="bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 rounded-2xl p-6 shadow-xl hover:border-cyan-500/20 transition-all duration-300 group relative overflow-hidden">
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-transparent pointer-events-none" />

            <div className="flex justify-between items-center mb-6 relative">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                        {section.section_key === 'mission' ? <Sparkles className="w-4 h-4 text-cyan-400" /> : <FileText className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <h3 className="font-bold text-white uppercase tracking-wider text-sm">{section.section_key}</h3>
                </div>
                <button
                    type="submit"
                    disabled={saving}
                    className="p-2 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/40 rounded-lg transition-all duration-300 disabled:opacity-50 hover:shadow-[0_0_15px_-3px_rgba(6,182,212,0.4)]"
                    title="Save Changes"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                </button>
            </div>

            <div className="space-y-4 relative">
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest pl-1">Title</label>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all placeholder:text-gray-600"
                        placeholder={`Enter ${section.section_key} title...`}
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest pl-1">Content</label>
                    <textarea
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        rows={6}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm resize-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all placeholder:text-gray-600 leading-relaxed"
                        placeholder={`Enter ${section.section_key} description...`}
                    />
                </div>
            </div>
        </form>
    );
}
