'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Service } from '@/app/actions/services';
import { updateService, createService } from '@/app/actions/services';
import { PricingTierEditor } from './PricingTierEditor';
import { FeatureEditor } from './FeatureEditor';
import { Save, Eye, Trash2 } from 'lucide-react';
import ImageUploader from './ImageUploader';

export function ServiceEditorForm({ service }: { service: Service | null }) {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    // Basic Info State
    const [title, setTitle] = useState(service?.title || '');
    const [slug, setSlug] = useState(service?.slug || '');
    const [subtitle, setSubtitle] = useState(service?.subtitle || '');
    const [description, setDescription] = useState(service?.description || '');
    const [icon, setIcon] = useState(service?.icon || 'zap');
    const [category, setCategory] = useState(service?.category || 'other');
    const [orderIndex, setOrderIndex] = useState(service?.order_index || 0);
    const [isPublished, setIsPublished] = useState(service?.is_published || false);
    const [imageUrl, setImageUrl] = useState(service?.image_url || '');
    const [videoUrl, setVideoUrl] = useState(service?.video_url || '');

    // Features State
    const [features, setFeatures] = useState(service?.features || []);

    // Pricing State
    const [pricingTiers, setPricingTiers] = useState(service?.pricing?.tiers || []);

    // SEO State
    const [metaTitle, setMetaTitle] = useState(service?.meta_title || '');
    const [metaDescription, setMetaDescription] = useState(service?.meta_description || '');

    // Auto-generate slug from title
    const handleTitleChange = (value: string) => {
        setTitle(value);
        if (!service) { // Only auto-generate for new services
            const generatedSlug = value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
            setSlug(generatedSlug);
        }
    };

    const handleSave = async (publish: boolean = false) => {
        setIsSaving(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('slug', slug);
        formData.append('subtitle', subtitle);
        formData.append('description', description);
        formData.append('icon', icon);
        formData.append('category', category);
        formData.append('is_published', publish ? 'true' : isPublished.toString());
        formData.append('image_url', imageUrl);
        formData.append('video_url', videoUrl);
        formData.append('features', JSON.stringify(features));
        formData.append('pricing', JSON.stringify({ tiers: pricingTiers }));
        formData.append('meta_title', metaTitle);
        formData.append('meta_description', metaDescription);

        try {
            if (service) {
                const result = await updateService(service.id, formData);
                if (result.error) {
                    alert('Error updating service: ' + result.error);
                } else {
                    router.push('/admin/services');
                    router.refresh();
                }
            } else {
                const result = await createService(formData);
                if (result.error) {
                    alert('Error creating service: ' + result.error);
                } else {
                    router.push('/admin/services');
                    router.refresh();
                }
            }
        } catch (error) {
            alert('Error saving service');
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Header & Status */}
            {/* Header & Status */}
            <div className="flex items-center justify-end">
                <div className="flex items-center gap-3">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${isPublished ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'}`}>
                        {isPublished ? 'Published Live' : 'Draft Mode'}
                    </span>
                </div>
            </div>

            {/* Basic Information */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-8">
                <h2 className="text-xl font-semibold text-white mb-6">General Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                            Service Name
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                            className="w-full px-5 py-3 bg-slate-950 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all font-medium"
                            placeholder="e.g. Cognitive Surveillance"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-2">The public display name for this service.</p>
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                            Page URL (Slug)
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-3.5 text-gray-500 text-sm">/services/</span>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full pl-20 pr-5 py-3 bg-slate-950 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all font-mono text-sm"
                                placeholder="my-service-name"
                                required
                            />
                        </div>
                    </div>

                    {/* Icon */}
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                            Display Icon
                        </label>
                        <select
                            value={icon}
                            onChange={(e) => setIcon(e.target.value)}
                            className="w-full px-5 py-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all appearance-none cursor-pointer"
                        >
                            <option value="database">Database</option>
                            <option value="eye">Eye (Surveillance)</option>
                            <option value="cpu">CPU (Processing)</option>
                            <option value="bot">Bot (AI/Robotics)</option>
                            <option value="network">Network</option>
                            <option value="trending-up">Trending Up (Charts)</option>
                            <option value="zap">Zap (Speed)</option>
                            <option value="shield">Shield (Security)</option>
                        </select>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                            Service Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-5 py-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all appearance-none cursor-pointer"
                        >
                            <option value="other">General / Other</option>
                            <option value="surveillance">Surveillance & Monitoring</option>
                            <option value="forensic">Forensics & Analysis</option>
                            <option value="automation">Automation & Robotics</option>
                            <option value="iot">IoT & Hardware</option>
                            <option value="consulting">Consulting & Strategy</option>
                        </select>
                    </div>

                    {/* Subtitle */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                            Short Tagline
                        </label>
                        <input
                            type="text"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            className="w-full px-5 py-3 bg-slate-950 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                            placeholder="e.g. Search terabytes of historical data in seconds"
                        />
                    </div>

                    {/* Service Image */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                            Service Image / Hero Graphics
                        </label>
                        <ImageUploader
                            defaultValue={imageUrl}
                            onUpload={setImageUrl}
                            bucket="service-media"
                        />
                        <p className="text-xs text-gray-500 mt-2">Upload a high-quality futuristic image or GIF (16:9 aspect ratio recommended).</p>
                    </div>

                    {/* Video URL */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                            Demo Video URL (YouTube Embed)
                        </label>
                        <input
                            type="text"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            className="w-full px-5 py-3 bg-slate-950 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all font-mono text-sm"
                            placeholder="https://www.youtube.com/embed/VIDEO_ID"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            Enter the YouTube embed URL (e.g., https://www.youtube.com/embed/dQw4w9WgXcQ). This will display as a video player on the service page.
                        </p>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                            Full Description (HTML)
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={8}
                            className="w-full px-5 py-3 bg-slate-950 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm font-mono leading-relaxed"
                            placeholder="<p>Enter detailed service description here...</p>"
                        />
                        <p className="text-xs text-gray-500 mt-2">You can use standard HTML tags for formatting.</p>
                    </div>

                    {/* Publish Toggle */}
                    <div className="flex items-center gap-4 py-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${isPublished ? 'bg-violet-600' : 'bg-gray-700'}`}>
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${isPublished ? 'translate-x-6' : 'translate-x-0'}`} />
                            </div>
                            <input
                                type="checkbox"
                                checked={isPublished}
                                onChange={(e) => setIsPublished(e.target.checked)}
                                className="hidden"
                            />
                            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Make this service publicly visible</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Features Editor */}
            <FeatureEditor features={features} onChange={setFeatures} />

            {/* Pricing Tiers Editor */}
            <PricingTierEditor tiers={pricingTiers} onChange={setPricingTiers} />

            {/* SEO Settings */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-8">
                <h2 className="text-xl font-semibold text-white mb-6">Search Engine Optimization (SEO)</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                            Browser Title
                        </label>
                        <input
                            type="text"
                            value={metaTitle}
                            onChange={(e) => setMetaTitle(e.target.value)}
                            className="w-full px-5 py-3 bg-slate-950 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                            placeholder="e.g. Best Forensic Data Solutions | Kingsforth"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                            Search Result Description
                        </label>
                        <textarea
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                            rows={3}
                            className="w-full px-5 py-3 bg-slate-950 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all resize-none"
                            placeholder="Brief summary that appears in Google search results..."
                        />
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="sticky bottom-6 z-40 bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-2xl">
                <button
                    onClick={() => router.push('/admin/services')}
                    className="px-6 py-2.5 bg-transparent hover:bg-white/5 text-gray-400 hover:text-white rounded-xl font-medium transition-colors"
                >
                    Discard Changes
                </button>

                <div className="flex items-center gap-3">
                    {service && (
                        <button
                            onClick={() => window.open(`/services/${service.slug}`, '_blank')}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors border border-white/5"
                        >
                            <Eye className="w-4 h-4" />
                            Preview Page
                        </button>
                    )}

                    <button
                        onClick={() => handleSave(false)}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors border border-white/5 disabled:opacity-50"
                    >
                        {isSaving ? 'Saving...' : 'Save Draft'}
                    </button>

                    <button
                        onClick={() => handleSave(true)}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-violet-600/20 hover:shadow-violet-600/40 disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        {isSaving ? 'Publishing...' : 'Save & Publish'}
                    </button>
                </div>
            </div>
        </div>
    );
}
