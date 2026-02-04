'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Solution, createSolution, updateSolution } from '@/app/actions/solutions';
import ImageUploader from './ImageUploader';
import { Loader2, Plus, Trash2, ChevronUp, ChevronDown, Check, X, GripVertical } from 'lucide-react';

interface SolutionEditorFormProps {
    initialData?: Partial<Solution>;
    isNew?: boolean;
}

export default function SolutionEditorForm({ initialData, isNew = false }: SolutionEditorFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);

    // Core Data
    const [title, setTitle] = useState(initialData?.title || '');
    const [slug, setSlug] = useState(initialData?.slug || '');
    const [category, setCategory] = useState(initialData?.category || 'Use Case');
    const [subtitle, setSubtitle] = useState(initialData?.subtitle || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [heroImage, setHeroImage] = useState(initialData?.hero_image || '');
    const [heroVideo, setHeroVideo] = useState(initialData?.hero_video_url || '');
    const [mapUrl, setMapUrl] = useState(initialData?.map_embed_url || '');
    const [isPublished, setIsPublished] = useState(initialData?.is_published || false);

    // Complex Data
    const [stats, setStats] = useState(initialData?.stats || []);
    const [contentBlocks, setContentBlocks] = useState(initialData?.content_blocks || []);
    const [faqs, setFaqs] = useState(initialData?.faqs || []);

    // --- Stats Handlers ---
    const addStat = () => setStats([...stats, { label: '', value: '', icon_name: 'Activity' }]);
    const removeStat = (index: number) => setStats(stats.filter((_, i) => i !== index));
    const updateStat = (index: number, field: string, value: string) => {
        const newStats = [...stats];
        (newStats[index] as any)[field] = value;
        setStats(newStats);
    };

    // --- Content Block Handlers ---
    const addBlock = () => setContentBlocks([...contentBlocks, {
        id: crypto.randomUUID(),
        title: '',
        content: '',
        image: '',
        align: 'left',
        list_items: []
    }]);
    const removeBlock = (index: number) => setContentBlocks(contentBlocks.filter((_, i) => i !== index));
    const updateBlock = (index: number, field: string, value: any) => {
        const newBlocks = [...contentBlocks];
        (newBlocks[index] as any)[field] = value;
        setContentBlocks(newBlocks);
    };

    const addBlockItem = (blockIndex: number) => {
        const newBlocks = [...contentBlocks];
        newBlocks[blockIndex].list_items.push('');
        setContentBlocks(newBlocks);
    };
    const updateBlockItem = (blockIndex: number, itemIndex: number, value: string) => {
        const newBlocks = [...contentBlocks];
        newBlocks[blockIndex].list_items[itemIndex] = value;
        setContentBlocks(newBlocks);
    };
    const removeBlockItem = (blockIndex: number, itemIndex: number) => {
        const newBlocks = [...contentBlocks];
        newBlocks[blockIndex].list_items = newBlocks[blockIndex].list_items.filter((_, i) => i !== itemIndex);
        setContentBlocks(newBlocks);
    };

    // --- Submit ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const data: Partial<Solution> = {
                title, slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                subtitle, description, category,
                hero_image: heroImage,
                hero_video_url: heroVideo,
                map_embed_url: mapUrl,
                is_published: isPublished,
                stats,
                content_blocks: contentBlocks,
                faqs
            };

            console.log('Submitting data:', data);
            let result;
            if (isNew) {
                result = await createSolution(data);
            } else if (initialData?.id) {
                result = await updateSolution(initialData.id, data);
            }
            console.log('Result:', result);

            if (result?.error) {
                alert(`Error: ${result.error}`);
            } else {
                router.push('/admin/solutions');
                router.refresh();
            }
        } catch (error) {
            console.error('Submit error:', error);
            alert('An unexpected error occurred. Check console.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-12">

            {/* Header / Meta */}
            <div className="bg-slate-900 border border-white/10 rounded-xl p-6 space-y-6">
                <h2 className="text-xl font-semibold text-white mb-4">Core Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Title</label>
                        <input value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Slug</label>
                        <input value={slug} onChange={e => setSlug(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white" placeholder="Auto-generated" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Category</label>
                    <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white">
                        <option value="Use Case">Use Case</option>
                        <option value="Industry">Industry</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Subtitle (Hero Text)</label>
                    <input value={subtitle} onChange={e => setSubtitle(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Description</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white h-24" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Hero Image</label>
                        <ImageUploader defaultValue={heroImage} onUpload={setHeroImage} bucket="services" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Hero Video URL (Optional)</label>
                        <input value={heroVideo} onChange={e => setHeroVideo(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white" placeholder="https://..." />
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">Key Stats</h2>
                    <button type="button" onClick={addStat} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Add Stat
                    </button>
                </div>
                <div className="space-y-4">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex items-center gap-4 bg-black/30 p-4 rounded-lg border border-white/5">
                            <input value={stat.label} onChange={e => updateStat(i, 'label', e.target.value)} placeholder="Label (e.g. Clients)" className="flex-1 bg-transparent border-b border-white/10 px-2 py-1 text-white" />
                            <input value={stat.value} onChange={e => updateStat(i, 'value', e.target.value)} placeholder="Value (e.g. 500+)" className="w-32 bg-transparent border-b border-white/10 px-2 py-1 text-white" />
                            <input value={stat.icon_name} onChange={e => updateStat(i, 'icon_name', e.target.value)} placeholder="Icon (Lucide)" className="w-32 bg-transparent border-b border-white/10 px-2 py-1 text-white" />
                            <button type="button" onClick={() => removeStat(i)} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Content Blocks (Zig Zag) */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">Content Sections</h2>
                    <button type="button" onClick={addBlock} className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium shadow-lg shadow-violet-500/20 transition-all flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Add Section
                    </button>
                </div>

                {contentBlocks.map((block, i) => (
                    <div key={block.id} className="bg-slate-900 border border-white/10 rounded-xl p-6 relative group">
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                            <button type="button" onClick={() => updateBlock(i, 'align', block.align === 'left' ? 'right' : 'left')} className="text-xs uppercase font-bold tracking-wider px-2 py-1 bg-white/5 rounded text-gray-700 dark:text-gray-400 hover:text-white">
                                Image {block.align}
                            </button>
                            <button type="button" onClick={() => removeBlock(i)} className="p-2 text-red-400 hover:bg-red-500/10 rounded"><Trash2 className="w-4 h-4" /></button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-gray-500 uppercase font-semibold">Section Title</label>
                                    <input value={block.title} onChange={e => updateBlock(i, 'title', e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white mt-1" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 uppercase font-semibold">Content</label>
                                    <textarea value={block.content} onChange={e => updateBlock(i, 'content', e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white h-32 mt-1" />
                                </div>

                                {/* List Items for this block */}
                                <div>
                                    <label className="text-xs text-gray-500 uppercase font-semibold mb-2 block">Feature List</label>
                                    <div className="space-y-2">
                                        {block.list_items.map((item, itemIdx) => (
                                            <div key={itemIdx} className="flex gap-2">
                                                <input value={item} onChange={e => updateBlockItem(i, itemIdx, e.target.value)} className="flex-1 bg-black/30 border border-white/10 rounded px-3 py-1 text-sm text-gray-300" />
                                                <button type="button" onClick={() => removeBlockItem(i, itemIdx)} className="text-red-400"><X className="w-3 h-3" /></button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => addBlockItem(i)} className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
                                            <Plus className="w-3 h-3" /> Add Item
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs text-gray-500 uppercase font-semibold mb-2 block">Section Image</label>
                                <ImageUploader defaultValue={block.image} onUpload={(url) => updateBlock(i, 'image', url)} bucket="services" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Google Map */}
            <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Location</h2>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Google Maps Embed URL (or paste full &lt;iframe&gt;)</label>
                    <input
                        value={mapUrl}
                        onChange={e => {
                            let val = e.target.value;
                            if (val.includes('<iframe') && val.includes('src="')) {
                                const match = val.match(/src="([^"]+)"/);
                                if (match && match[1]) val = match[1];
                            }
                            setMapUrl(val);
                        }}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white font-mono text-xs"
                        placeholder="Paste the link OR the full iframe code here..."
                    />
                    <p className="text-xs text-gray-500 mt-2">
                        You can paste the full "Embed a map" code from Google, and we'll automatically extract the link for you.
                    </p>
                </div>
            </div>

            {/* Publishing */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <label className="flex items-center gap-3 cursor-pointer">
                    <div className={`w-12 h-6 rounded-full p-1 transition-colors ${isPublished ? 'bg-emerald-500' : 'bg-slate-700'}`} onClick={() => setIsPublished(!isPublished)}>
                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isPublished ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                    <span className="text-white font-medium">Publish Solution</span>
                </label>

                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-xl font-bold shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-all disabled:opacity-50"
                >
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    {saving ? 'Saving...' : (isNew ? 'Create Solution' : 'Save Changes')}
                </button>
            </div>
        </form>
    );
}
