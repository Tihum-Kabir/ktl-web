'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Resource, ResourceContentBlock, createResource, updateResource } from '@/app/actions/resources';
import {
    Loader2, Save, ArrowLeft, Plus, Trash2, GripVertical,
    Type, Image as ImageIcon, Video, FileText, Code, Link as LinkIcon
} from 'lucide-react';
import Image from 'next/image';

interface ResourceEditorFormProps {
    initialResource?: Resource | null;
}

export default function ResourceEditorForm({ initialResource }: ResourceEditorFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Basic Fields
    const [title, setTitle] = useState(initialResource?.title || '');
    const [slug, setSlug] = useState(initialResource?.slug || '');
    const [category, setCategory] = useState(initialResource?.category || 'Documentation');
    const [summary, setSummary] = useState(initialResource?.summary || '');
    const [coverImage, setCoverImage] = useState(initialResource?.cover_image || '');
    const [externalLink, setExternalLink] = useState(initialResource?.external_link || '');
    const [isPublished, setIsPublished] = useState(initialResource?.is_published || false);

    // Content Cells
    const [blocks, setBlocks] = useState<ResourceContentBlock[]>(initialResource?.content || []);

    const categories = ['Documentation', 'Library', 'Customer Story', 'Partner', 'Grant', 'AI Agent'];

    // --- Media Upload Helper ---
    const handleUpload = async (file: File): Promise<string | null> => {
        try {
            setUploading(true);
            const supabase = createClient();
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `resources/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('resource-assets')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('resource-assets')
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Check console.');
            return null;
        } finally {
            setUploading(false);
        }
    };

    // --- Block Management ---
    const addBlock = (type: ResourceContentBlock['type']) => {
        const newBlock: ResourceContentBlock = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            content: '',
        };
        setBlocks([...blocks, newBlock]);
    };

    const removeBlock = (id: string) => {
        setBlocks(blocks.filter(b => b.id !== id));
    };

    const updateBlock = (id: string, updates: Partial<ResourceContentBlock>) => {
        setBlocks(blocks.map(b => b.id === id ? { ...b, ...updates } : b));
    };

    const moveBlock = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === blocks.length - 1) return;

        const newBlocks = [...blocks];
        const swapIndex = direction === 'up' ? index - 1 : index + 1;
        [newBlocks[index], newBlocks[swapIndex]] = [newBlocks[swapIndex], newBlocks[index]];
        setBlocks(newBlocks);
    };

    // --- Save Handler ---
    const handleSave = async () => {
        if (!title || !slug) {
            alert('Title and Slug are required');
            return;
        }
        setSaving(true);

        const data = {
            title,
            slug,
            category,
            summary,
            cover_image: coverImage,
            external_link: externalLink,
            is_published: isPublished,
            content: blocks,
            published_at: isPublished && !initialResource?.published_at ? new Date().toISOString() : undefined
        };

        const result = initialResource
            ? await updateResource(initialResource.id, data)
            : await createResource(data);

        setSaving(false);

        if (result.success) {
            router.push('/admin/resources');
            router.refresh();
        } else {
            alert('Error saving: ' + (result as any).error);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between sticky top-0 bg-slate-950/80 backdrop-blur-xl py-4 z-50 border-b border-white/10">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-white/10 rounded-lg">
                        <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-400" />
                    </button>
                    <h1 className="text-2xl font-bold text-white">
                        {initialResource ? 'Edit Resource' : 'New Resource'}
                    </h1>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving || uploading}
                    className="flex items-center gap-2 px-6 py-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Resource
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info */}
                    <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    if (!initialResource) {
                                        setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
                                    }
                                }}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-violet-500/50 outline-none text-lg"
                                placeholder="e.g., Q3 Security Report"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Summary (SEO & Cards)</label>
                            <textarea
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                rows={3}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-violet-500/50 outline-none resize-none"
                                placeholder="Brief description..."
                            />
                        </div>
                    </div>

                    {/* CELL EDITOR */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Content Blocks</h3>

                        <div className="space-y-4 min-h-[200px]">
                            {blocks.map((block, index) => (
                                <div key={block.id} className="group relative bg-slate-900/50 border border-white/10 rounded-xl p-4 hover:border-violet-500/30 transition-colors">
                                    {/* Valid Drag Handle / Controls */}
                                    <div className="absolute right-4 top-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => moveBlock(index, 'up')} className="p-1 hover:text-white text-gray-500" disabled={index === 0}>↑</button>
                                        <button onClick={() => moveBlock(index, 'down')} className="p-1 hover:text-white text-gray-500" disabled={index === blocks.length - 1}>↓</button>
                                        <button onClick={() => removeBlock(block.id)} className="p-1 hover:text-red-400 text-gray-500"><Trash2 className="w-4 h-4" /></button>
                                    </div>

                                    {/* Block Content */}
                                    <div className="pr-12">
                                        <div className="flex items-center gap-2 mb-3 text-xs font-mono text-violet-400 uppercase tracking-wider">
                                            {block.type === 'text' && <Type className="w-3 h-3" />}
                                            {block.type === 'image' && <ImageIcon className="w-3 h-3" />}
                                            {block.type === 'video' && <Video className="w-3 h-3" />}
                                            {block.type} BLOCK
                                        </div>

                                        {/* Text Block */}
                                        {block.type === 'text' && (
                                            <textarea
                                                value={block.content}
                                                onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                                                className="w-full bg-transparent border-none text-white focus:ring-0 p-0 text-base min-h-[100px]"
                                                placeholder="Type your content here (Markdown supported)..."
                                            />
                                        )}

                                        {/* Image Block */}
                                        {block.type === 'image' && (
                                            <div className="space-y-4">
                                                {block.content ? (
                                                    <div className="relative aspect-video rounded-lg overflow-hidden bg-black/50 border border-white/10">
                                                        <Image src={block.content} alt="Block image" fill className="object-cover" />
                                                        <button
                                                            onClick={() => updateBlock(block.id, { content: '' })}
                                                            className="absolute top-2 right-2 p-1 bg-black/60 rounded-full text-white hover:bg-black"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-violet-500/50 transition-colors">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={async (e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) {
                                                                    const url = await handleUpload(file);
                                                                    if (url) updateBlock(block.id, { content: url });
                                                                }
                                                            }}
                                                            className="hidden"
                                                            id={`upload-${block.id}`}
                                                        />
                                                        <label htmlFor={`upload-${block.id}`} className="cursor-pointer flex flex-col items-center gap-2">
                                                            <ImageIcon className="w-8 h-8 text-gray-500" />
                                                            <span className="text-sm text-gray-700 dark:text-gray-400">Click to upload image</span>
                                                        </label>
                                                    </div>
                                                )}
                                                <input
                                                    type="text"
                                                    value={block.caption || ''}
                                                    onChange={(e) => updateBlock(block.id, { caption: e.target.value })}
                                                    placeholder="Image caption (optional)"
                                                    className="w-full bg-black/20 border-b border-white/10 px-2 py-1 text-sm text-gray-300 focus:border-violet-500 outline-none"
                                                />
                                            </div>
                                        )}

                                        {/* File/Download Block */}
                                        {block.type === 'file' && (
                                            <div className="flex items-center gap-4 bg-black/20 p-4 rounded-lg border border-white/10">
                                                <FileText className="w-8 h-8 text-violet-400" />
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        value={block.content}
                                                        onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                                                        placeholder="File URL (Upload manually to storage bucket first for now)"
                                                        className="w-full bg-transparent border-none text-white focus:ring-0 p-0 text-sm"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add Block Controls */}
                        <div className="flex items-center gap-2 mt-4 p-4 border-2 border-dashed border-white/10 rounded-xl justify-center hover:border-white/20 transition-colors">
                            <span className="text-sm text-gray-500 mr-2">Add Block:</span>
                            <button onClick={() => addBlock('text')} className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-gray-300">
                                <Type className="w-3 h-3" /> Text
                            </button>
                            <button onClick={() => addBlock('image')} className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-gray-300">
                                <ImageIcon className="w-3 h-3" /> Image
                            </button>
                            <button onClick={() => addBlock('file')} className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-gray-300">
                                <FileText className="w-3 h-3" /> File
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 space-y-6 sticky top-24">
                        <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-4">Settings</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Slug</label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-gray-300 focus:ring-2 focus:ring-violet-500/50 outline-none text-sm font-mono"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-violet-500/50 outline-none"
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Cover Image</label>
                            {coverImage ? (
                                <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 mb-2 group">
                                    <Image src={coverImage} alt="Cover" fill className="object-cover" />
                                    <button
                                        onClick={() => setCoverImage('')}
                                        className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 className="w-6 h-6 text-white" />
                                    </button>
                                </div>
                            ) : (
                                <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center hover:border-violet-500/50 transition-colors">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const url = await handleUpload(file);
                                                if (url) setCoverImage(url);
                                            }
                                        }}
                                        className="hidden"
                                        id="cover-upload"
                                    />
                                    <label htmlFor="cover-upload" className="cursor-pointer">
                                        <ImageIcon className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                                        <span className="text-xs text-gray-700 dark:text-gray-400">Upload Cover</span>
                                    </label>
                                </div>
                            )}
                        </div>

                        {(category === 'AI Agent' || category === 'Partner') && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">External Link</label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                                    <input
                                        type="text"
                                        value={externalLink}
                                        onChange={(e) => setExternalLink(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-violet-500/50 outline-none text-sm"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <span className="text-sm font-medium text-white">Published</span>
                            <button
                                onClick={() => setIsPublished(!isPublished)}
                                className={`w-12 h-6 rounded-full transition-colors relative ${isPublished ? 'bg-emerald-500' : 'bg-white/10'}`}
                            >
                                <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${isPublished ? 'translate-x-6' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
