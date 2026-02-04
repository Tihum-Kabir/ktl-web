import { getSetting } from '@/app/actions/settings';
import SettingsTabs from '@/components/admin/settings/SettingsTabs';

export default async function SettingsPage() {
    const [logoSetting, socialLinks, contactInfo] = await Promise.all([
        getSetting('logo'),
        getSetting('social_links'),
        getSetting('contact_info')
    ]);

    return (
        <div className="p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Site Settings</h1>
                        <p className="text-gray-400">Manage your website's global configuration and content</p>
                    </div>
                </div>

                <SettingsTabs
                    initialLogo={logoSetting}
                    initialSocialLinks={socialLinks}
                    initialContactInfo={contactInfo}
                />
            </div>
        </div>
    );
}
