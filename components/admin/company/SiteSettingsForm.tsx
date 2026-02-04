'use client';

import { useState, useEffect } from 'react';
import { getSetting, updateSetting } from '@/app/actions/settings';
import { Save, Globe, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';

export function SiteSettingsForm() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({
        siteName: '',
        logoUrl: ''
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const name = await getSetting('site_name');
                const logo = await getSetting('logo_url');
                setSettings({
                    siteName: name || 'Kingsforth',
                    logoUrl: logo || ''
                });
            } catch (error) {
                console.error('Failed to fetch settings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await updateSetting('site_name', settings.siteName);
            await updateSetting('logo_url', settings.logoUrl);
            // Show success toast or feedback here
            alert('Settings saved successfully');
        } catch (error) {
            alert('Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-400">Loading settings...</div>;
    }

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-violet-400" />
                General Settings
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Site Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Website Name</label>
                    <input
                        type="text"
                        value={settings.siteName}
                        onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                        placeholder="e.g. Kingsforth"
                    />
                </div>

                {/* Logo URL */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Logo URL</label>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={settings.logoUrl}
                                onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                                placeholder="https://..."
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Enter the full URL of your logo image.
                            </p>
                        </div>

                        {/* Preview */}
                        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                            {settings.logoUrl ? (
                                <img src={settings.logoUrl} alt="Logo Preview" className="w-full h-full object-contain" />
                            ) : (
                                <ImageIcon className="w-8 h-8 text-gray-600" />
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
