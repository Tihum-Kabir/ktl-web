'use client';

import { useState } from 'react';
import ImageUploader from '@/components/admin/ImageUploader';
import { updateSetting } from '@/app/actions/settings';
import { Loader2, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SettingsForm({ initialLogo, initialSocialLinks, initialContactInfo }: { initialLogo: any, initialSocialLinks: any, initialContactInfo: any }) {
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [currentLogo, setCurrentLogo] = useState(initialLogo?.url || '');
    const router = useRouter();

    const handleLogoUpload = async (url: string) => {
        try {
            setSaving(true);
            setSuccess(false);

            // If url is empty string, it means removal
            const newValue = url ? { url, alt: 'Kingsforth' } : null;

            await updateSetting('logo', newValue);
            setCurrentLogo(url);

            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
            router.refresh(); // Refresh to update any server components

        } catch (error) {
            console.error('Error saving logo:', error);
            // Handle error (maybe show toast)
        } finally {
            setSaving(false);
        }
    };

    const [socialLinks, setSocialLinks] = useState({
        facebook: '',
        instagram: '',
        twitter: '',
        linkedin: '',
        youtube: '',
        ...initialSocialLinks
    });

    // ... existing logo handler ...

    const handleSocialSave = async () => {
        try {
            setSaving(true);
            setSuccess(false);

            await updateSetting('social_links', socialLinks);

            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
            router.refresh();
        } catch (error) {
            console.error('Error saving social links:', error);
        } finally {
            setSaving(false);
        }
    };

    const [contactInfo, setContactInfo] = useState({
        email: '',
        phone: '',
        address: '',
        map_embed: '',
        ...(initialContactInfo || {})
    });

    const handleContactSave = async () => {
        try {
            setSaving(true);
            setSuccess(false);

            await updateSetting('contact_info', contactInfo);

            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
            router.refresh();
        } catch (error) {
            console.error('Error saving contact info:', error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-12">
            {/* Logo Section */}
            <div className="max-w-xl">
                <h3 className="text-lg font-medium text-white mb-4">Logo</h3>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                    Website Logo
                </label>
                {/* ... existing ImageUploader ... */}
                <ImageUploader
                    defaultValue={currentLogo}
                    onUpload={handleLogoUpload}
                    bucket="site-assets"
                />
            </div>

            {/* Social Links Section */}
            <div className="max-w-xl pt-8 border-t border-white/10">
                <h3 className="text-lg font-medium text-white mb-6">Social Media Links</h3>
                <div className="space-y-4">
                    {['facebook', 'instagram', 'twitter', 'linkedin', 'youtube'].map((platform) => (
                        <div key={platform}>
                            <label className="block text-sm font-medium text-gray-400 mb-1 capitalize">
                                {platform}
                            </label>
                            <input
                                type="url"
                                value={(socialLinks as any)[platform]}
                                onChange={(e) => setSocialLinks({ ...socialLinks, [platform]: e.target.value })}
                                placeholder={`https://${platform}.com/...`}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500 transition-colors"
                            />
                        </div>
                    ))}
                    <button
                        onClick={handleSocialSave}
                        disabled={saving}
                        className="mt-4 px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save Social Links'}
                    </button>
                </div>
            </div>

            {/* Contact Info Section */}
            <div className="max-w-xl pt-8 border-t border-white/10">
                <h3 className="text-lg font-medium text-white mb-6">Contact Information</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                            Contact Email
                        </label>
                        <input
                            type="email"
                            value={contactInfo.email}
                            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                            placeholder="contact@kingsforth.com"
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            value={contactInfo.phone}
                            onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                            placeholder="+1 (555) 123-4567"
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                            Office Address (Text)
                        </label>
                        <input
                            type="text"
                            value={contactInfo.address}
                            onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                            placeholder="123 Tech Blvd, San Francisco, CA"
                            className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-violet-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                            Map Embed Code or URL
                        </label>
                        <p className="text-xs text-gray-500 mb-2">
                            Paste the "Embed a map" HTML code from Google Maps (iframe), OR just the Share URL.
                        </p>
                        <textarea
                            value={contactInfo.map_embed}
                            onChange={(e) => setContactInfo({ ...contactInfo, map_embed: e.target.value })}
                            placeholder='<iframe src="https://www.google.com/maps/embed?..." ...></iframe>'
                            className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-violet-500 transition-colors font-mono text-sm"
                        />
                    </div>
                    <button
                        onClick={handleContactSave}
                        disabled={saving}
                        className="mt-4 px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save Contact Info'}
                    </button>
                </div>
            </div>

            {/* Status Indicators */}
            <div className="fixed bottom-8 right-8">
                {/* Reusing existing status logic but positioning it better */}
                {/* ... */}
            </div>
            <div className="flex items-center gap-3 h-6">
                {saving && (
                    <div className="flex items-center gap-2 text-violet-400 text-sm animate-pulse">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving changes...</span>
                    </div>
                )}
                {success && (
                    <div className="flex items-center gap-2 text-emerald-400 text-sm">
                        <Check className="w-4 h-4" />
                        <span>Settings updated successfully</span>
                    </div>
                )}
            </div>
        </div>
    );
}
