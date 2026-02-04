import { getFAQs, getTeamMembers, getAboutContent } from '@/app/actions/company';
import CompanyContent from './CompanyContent';

export default async function CompanySettingsPage() {
    const [faqs, team, about] = await Promise.all([
        getFAQs(),
        getTeamMembers(),
        getAboutContent()
    ]);

    return (
        <div className="p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Company Content</h1>
                        <p className="text-gray-400">Manage FAQs, Team Members, and About Page content.</p>
                    </div>
                </div>

                <CompanyContent
                    initialFAQs={faqs}
                    initialTeam={team}
                    initialAbout={about}
                />
            </div>
        </div>
    );
}
