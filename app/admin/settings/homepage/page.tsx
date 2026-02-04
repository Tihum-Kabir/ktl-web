'use client';

import { useState, useEffect } from 'react';
import { getProductFeatures, updateProductFeature, createProductFeature, deleteProductFeature, getHowItWorksSteps, updateHowItWorksStep } from '@/app/actions/homepage';
import { Plus, Trash2, Save, Move, Video, Image as ImageIcon, Loader2, Upload, AlertCircle, Zap, Shield, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function HomepageSettings() {
    const [features, setFeatures] = useState<any[]>([]);
    const [steps, setSteps] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const [featuresData, stepsData] = await Promise.all([
                getProductFeatures(),
                getHowItWorksSteps()
            ]);
            setFeatures(featuresData);
            setSteps(stepsData);
        } catch (error) {
            console.error('Failed to load data:', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleCreateFeature() {
        if (!confirm('Add a new feature block?')) return;

        const data = new FormData();
        data.append('title', 'New Feature');
        data.append('description', 'Feature description goes here.');
        data.append('media_type', 'image');
        data.append('features_list', JSON.stringify(['Feature point 1']));

        try {
            await createProductFeature(data);
            loadData();
        } catch (error) {
            console.error(error);
            alert('Failed to create feature');
        }
    }

    return (
        <div className="space-y-12 max-w-5xl mx-auto pb-20">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Homepage Content</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage the content sections on the landing page.</p>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
                </div>
            ) : (
                <>
                    {/* SECTION 1: PRODUCT SHOWCASE */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <div>
                                <h2 className="text-xl font-bold text-white">Product Showcase</h2>
                                <p className="text-sm text-gray-400">Manage feature highlights (The visible cards).</p>
                            </div>
                            <button
                                onClick={handleCreateFeature}
                                className="flex items-center gap-2 px-3 py-1.5 bg-violet-600/20 text-violet-300 hover:bg-violet-600/30 text-sm font-semibold rounded-lg transition-colors border border-violet-500/20"
                            >
                                <Plus className="w-4 h-4" />
                                Add Feature
                            </button>
                        </div>

                        {features.map((feature) => (
                            <FeatureEditor key={feature.id} feature={feature} onUpdate={loadData} />
                        ))}

                        {features.length === 0 && (
                            <div className="text-center py-10 bg-white/5 rounded-xl border border-white/10 border-dashed">
                                <p className="text-gray-400 mb-2">No features found.</p>
                                <button
                                    onClick={handleCreateFeature}
                                    className="text-violet-400 hover:text-violet-300 font-medium text-sm"
                                >
                                    Create your first feature
                                </button>
                            </div>
                        )}
                    </div>

                    {/* SECTION 2: HOW IT WORKS (ORCHESTRATING) */}
                    <div className="space-y-6">
                        <div className="border-b border-white/10 pb-4">
                            <h2 className="text-xl font-bold text-white">How It Works (Orchestrating)</h2>
                            <p className="text-sm text-gray-400">Manage the 4-step process timeline. (Steps are fixed, edit content only).</p>
                        </div>

                        <div className="grid gap-6">
                            {steps.map((step) => (
                                <StepEditor key={step.id} step={step} onUpdate={loadData} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

// ... FeatureEditor Component (Kept as is, but compacted for brevity if needed, but I'll include it full)
function FeatureEditor({ feature, onUpdate }: { feature: any, onUpdate: () => void }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [formData, setFormData] = useState({
        title: feature.title,
        description: feature.description,
        media_url: feature.media_url || '',
        media_type: feature.media_type || 'image',
        media_fit: feature.media_fit || 'cover',
        image_position: feature.image_position || 'left',
        features_list: feature.features_list || []
    });

    async function handleSave() {
        setIsSaving(true);
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('media_url', formData.media_url);
        data.append('media_type', formData.media_type);
        data.append('media_fit', formData.media_fit);
        data.append('image_position', formData.image_position);
        data.append('features_list', JSON.stringify(formData.features_list));

        try {
            await updateProductFeature(feature.id, data);
            setIsEditing(false);
            onUpdate();
        } catch (error) {
            alert('Failed to save changes');
        } finally {
            setIsSaving(false);
        }
    }

    async function handleDelete() {
        if (!confirm('Are you sure you want to delete this feature?')) return;
        setIsDeleting(true);
        try {
            await deleteProductFeature(feature.id);
            onUpdate();
        } catch (error) {
            alert('Failed to delete feature');
            setIsDeleting(false);
        }
    }

    return (
        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden relative group">
            {/* Delete Button */}
            <button
                onClick={handleDelete}
                disabled={isDeleting || isEditing}
                className="absolute top-4 right-4 p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 z-10"
                title="Delete Feature"
            >
                {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            </button>

            <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-6 pr-12">
                    {isEditing ? (
                        <input
                            type="text"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xl font-bold text-white w-full focus:outline-none focus:border-violet-500"
                        />
                    ) : (
                        <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                    )}

                    <div className="flex gap-2 shrink-0">
                        {isEditing ? (
                            <>
                                <button onClick={() => setIsEditing(false)} className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors">Cancel</button>
                                <button onClick={handleSave} disabled={isSaving} className="px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2">
                                    {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />} Save
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white text-xs font-medium rounded-lg transition-colors">Edit</button>
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Description</label>
                            {isEditing ? (
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-violet-500"
                                />
                            ) : (
                                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Bullet Points</label>
                            <div className="space-y-2">
                                {formData.features_list.map((point: string, idx: number) => (
                                    <div key={idx} className="flex gap-2 items-center group/point">
                                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                                        {isEditing ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={point}
                                                    onChange={e => {
                                                        const newList = [...formData.features_list];
                                                        newList[idx] = e.target.value;
                                                        setFormData({ ...formData, features_list: newList });
                                                    }}
                                                    className="w-full bg-transparent border-b border-white/10 focus:border-violet-500 text-sm text-gray-300 pb-1 focus:outline-none"
                                                />
                                                <button
                                                    onClick={() => {
                                                        const newList = formData.features_list.filter((_: string, i: number) => i !== idx);
                                                        setFormData({ ...formData, features_list: newList });
                                                    }}
                                                    className="p-1 text-gray-500 hover:text-red-400 opacity-0 group-hover/point:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </>
                                        ) : (
                                            <span className="text-sm text-gray-300">{point}</span>
                                        )}
                                    </div>
                                ))}
                                {isEditing && (
                                    <button onClick={() => setFormData({ ...formData, features_list: [...formData.features_list, 'New point'] })} className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 mt-2 mb-4">
                                        <Plus className="w-3 h-3" /> Add Point
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Reuse Media Settings Logic */}
                    <MediaSettingsEditor formData={formData} setFormData={setFormData} isEditing={isEditing} feature={feature} bucket="media-library" />
                </div>
            </div>
        </div>
    );
}

function StepEditor({ step, onUpdate }: { step: any, onUpdate: () => void }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: step.title,
        description: step.description,
        media_url: step.media_url || '',
        media_type: step.media_type || 'image',
        media_fit: step.media_fit || 'cover',
    });

    async function handleSave() {
        setIsSaving(true);
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('media_url', formData.media_url);
        data.append('media_type', formData.media_type);
        data.append('media_fit', formData.media_fit);

        try {
            await updateHowItWorksStep(step.id, data);
            setIsEditing(false);
            onUpdate();
        } catch (error) {
            alert('Failed to save changes');
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden group">
            <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center font-bold text-xl text-white/50 border border-white/10">
                        {step.step_number}
                    </div>
                    <div className="flex-1">
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-lg font-bold text-white w-full focus:outline-none focus:border-violet-500"
                            />
                        ) : (
                            <h3 className="text-lg font-bold text-white">{step.title}</h3>
                        )}
                    </div>
                    <div className="flex gap-2">
                        {isEditing ? (
                            <>
                                <button onClick={() => setIsEditing(false)} className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors">Cancel</button>
                                <button onClick={handleSave} disabled={isSaving} className="px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2">
                                    {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />} Save
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white text-xs font-medium rounded-lg transition-colors">Edit</button>
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Description</label>
                        {isEditing ? (
                            <textarea
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:border-violet-500"
                            />
                        ) : (
                            <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                        )}
                    </div>
                    {/* Reuse Media Settings Logic */}
                    <MediaSettingsEditor formData={formData} setFormData={setFormData} isEditing={isEditing} feature={step} bucket="media-library" />
                </div>
            </div>
        </div>
    );
}

// Extracted Media Settings Component to DRY up code
function MediaSettingsEditor({ formData, setFormData, isEditing, feature, bucket }: any) {
    return (
        <div className="bg-black/40 rounded-xl p-4 border border-white/5">
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-4">Media Settings</label>

            <div className="space-y-4">
                <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">Media URL</label>
                    {isEditing ? (
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={formData.media_url}
                                    onChange={e => {
                                        let url = e.target.value;
                                        if (url.includes('drive.google.com') && url.includes('/file/d/')) {
                                            const matches = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
                                            if (matches && matches[1]) {
                                                url = `https://drive.google.com/uc?export=view&id=${matches[1]}`;
                                            }
                                        }
                                        setFormData({ ...formData, media_url: url });
                                    }}
                                    placeholder="https://... or upload"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
                                />
                                <label className="cursor-pointer px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors flex items-center justify-center relative">
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*,video/*"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;

                                            const btn = e.target.parentElement!;
                                            btn.style.opacity = '0.5';
                                            btn.style.pointerEvents = 'none';

                                            try {
                                                const supabase = createClient();
                                                const fileExt = file.name.split('.').pop();
                                                const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
                                                const filePath = `cms-uploads/${fileName}`;

                                                const { error: uploadError } = await supabase.storage
                                                    .from(bucket)
                                                    .upload(filePath, file);

                                                if (uploadError) throw uploadError;

                                                const { data: { publicUrl } } = supabase.storage
                                                    .from(bucket)
                                                    .getPublicUrl(filePath);

                                                setFormData((prev: any) => ({
                                                    ...prev,
                                                    media_url: publicUrl,
                                                    media_type: file.type.startsWith('video') ? 'video' : 'image'
                                                }));
                                            } catch (error) {
                                                console.error('Upload failed:', error);
                                                alert('Upload failed.');
                                            } finally {
                                                btn.style.opacity = '1';
                                                btn.style.pointerEvents = 'auto';
                                            }
                                        }}
                                    />
                                    <Upload className="w-4 h-4" />
                                </label>
                            </div>
                            <p className="text-[10px] text-gray-500">Max 50MB. Images & Videos.</p>
                        </div>
                    ) : (
                        <div className="truncate text-sm text-violet-400 hover:text-violet-300">
                            {formData.media_url ? (
                                <a href={formData.media_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    {formData.media_url}
                                </a>
                            ) : 'No media set'}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-gray-400 mb-1.5 block">Type</label>
                        {isEditing ? (
                            <select
                                value={formData.media_type}
                                onChange={e => setFormData({ ...formData, media_type: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
                            >
                                <option value="image" className="bg-slate-900">Image</option>
                                <option value="video" className="bg-slate-900">Video</option>
                            </select>
                        ) : (
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                {formData.media_type === 'video' ? <Video className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                                <span className="capitalize">{formData.media_type}</span>
                            </div>
                        )}
                    </div>
                    {/* Position is specific to Feature, but safe to ignore if undefined/not used in Step */}
                    {formData.image_position && (
                        <div>
                            <label className="text-xs text-gray-400 mb-1.5 block">Position</label>
                            {isEditing ? (
                                <select
                                    value={formData.image_position}
                                    onChange={e => setFormData({ ...formData, image_position: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
                                >
                                    <option value="left" className="bg-slate-900">Left</option>
                                    <option value="right" className="bg-slate-900">Right</option>
                                </select>
                            ) : (
                                <span className="text-sm text-gray-300 capitalize">{formData.image_position}</span>
                            )}
                        </div>
                    )}
                </div>

                {/* Preview */}
                {(formData.media_url) && (
                    <div className="mt-4 rounded-lg overflow-hidden border border-white/10 aspect-video relative group">
                        {formData.media_type === 'video' ? (
                            <video src={formData.media_url} className={`w-full h-full object-${formData.media_fit}`} muted loop />
                        ) : (
                            <img src={formData.media_url} alt="Preview" className={`w-full h-full object-${formData.media_fit}`} />
                        )}

                        {/* Edit Overlay for Fit */}
                        {isEditing && (
                            <div className="absolute top-2 right-2 flex gap-2">
                                <select
                                    value={formData.media_fit}
                                    onChange={e => setFormData({ ...formData, media_fit: e.target.value })}
                                    className="bg-black/80 backdrop-blur border border-white/20 rounded px-2 py-1 text-xs text-white focus:outline-none cursor-pointer"
                                    title="Image Resizing / Fit"
                                >
                                    <option value="cover" className="bg-slate-900">Cover (Fill)</option>
                                    <option value="contain" className="bg-slate-900">Contain (Fit)</option>
                                    <option value="fill" className="bg-slate-900">Stretch</option>
                                    <option value="none" className="bg-slate-900">None</option>
                                    <option value="scale-down" className="bg-slate-900">Scale Down</option>
                                </select>
                            </div>
                        )}

                        {!isEditing && (
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
                                <span className="text-xs font-mono text-white">PREVIEW ({formData.media_fit})</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
