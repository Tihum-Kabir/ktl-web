import { getSetting } from '@/app/actions/settings';
import { getAllServices } from '@/app/actions/services';
import { getSolutions } from '@/app/actions/solutions';
import { getResources } from '@/app/actions/resources';
import SettingsTabs from '@/components/admin/settings/SettingsTabs';

export default async function SettingsPage() {
    const [logoSetting, socialLinks, contactInfo, services, solutions, resources] = await Promise.all([
        getSetting('logo'),
        getSetting('social_links'),
        getSetting('contact_info'),
        getAllServices(),
        getSolutions(),
        getResources()
    ]);

    return (
        <div className="p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Site Settings</h1>
                        <p className="text-gray-400">Manage your website's content, services, and configurations</p>
                    </div>
                </div>

                <SettingsTabs
                    initialLogo={logoSetting}
                    initialSocialLinks={socialLinks}
                    initialContactInfo={contactInfo}
                    initialServices={services}
                    initialSolutions={solutions}
                    initialResources={resources}
                />
            </div>
        </div>
    );
}
