'use client';

import { useState } from 'react';
import SettingsForm from '@/app/admin/settings/SettingsForm';
import { TeamManager } from '@/components/admin/company/TeamManager';
import { AboutContentManager } from '@/components/admin/company/AboutContentManager';
import { HomepageManager } from '@/components/admin/company/HomepageManager';
import { FAQManager } from '@/components/admin/company/FAQManager';
import { ServicesManager } from '@/components/admin/company/ServicesManager';
import { SolutionsManager } from '@/components/admin/company/SolutionsManager';
import { ResourcesManager } from '@/components/admin/company/ResourcesManager';
import { Building2, Users, FileText, HelpCircle, LayoutTemplate, Briefcase, Database, Library } from 'lucide-react';

interface SettingsTabsProps {
    initialLogo: any;
    initialSocialLinks: any;
    initialContactInfo: any;
    initialServices: any[];
    initialSolutions: any[];
    initialResources: any[];
}

export default function SettingsTabs({
    initialLogo,
    initialSocialLinks,
    initialContactInfo,
    initialServices,
    initialSolutions,
    initialResources
}: SettingsTabsProps) {
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'General & Brand', icon: Building2 },
        { id: 'homepage', label: 'Homepage Content', icon: LayoutTemplate },
        { id: 'services', label: 'Services', icon: Briefcase },
        { id: 'solutions', label: 'Solutions', icon: Database },
        { id: 'resources', label: 'Resources', icon: Library },
        { id: 'team', label: 'Team', icon: Users },
        { id: 'about', label: 'About', icon: FileText },
        { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    ];

    return (
        <div className="space-y-8">
            {/* Tabs Header */}
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-1">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-t-xl transition-all relative font-medium text-sm ${isActive
                                ? 'text-white bg-white/5 border-b-2 border-violet-500 shadow-[0_-1px_10px_-5px_rgba(139,92,246,0.5)]'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Icon className={`w-4 h-4 ${isActive ? 'text-violet-400' : ''}`} />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <div className="min-h-[500px]">
                {activeTab === 'general' && (
                    <div className="animate-in fade-in duration-300 slide-in-from-bottom-2">
                        <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
                            <SettingsForm
                                initialLogo={initialLogo}
                                initialSocialLinks={initialSocialLinks}
                                initialContactInfo={initialContactInfo}
                            />
                        </div>
                    </div>
                )}
                {activeTab === 'homepage' && (
                    <div className="animate-in fade-in duration-300 slide-in-from-bottom-2">
                        <HomepageManager />
                    </div>
                )}
                {activeTab === 'services' && (
                    <div className="animate-in fade-in duration-300 slide-in-from-bottom-2">
                        <ServicesManager initialServices={initialServices} />
                    </div>
                )}
                {activeTab === 'solutions' && (
                    <div className="animate-in fade-in duration-300 slide-in-from-bottom-2">
                        <SolutionsManager initialSolutions={initialSolutions} />
                    </div>
                )}
                {activeTab === 'resources' && (
                    <div className="animate-in fade-in duration-300 slide-in-from-bottom-2">
                        <ResourcesManager initialResources={initialResources} />
                    </div>
                )}
                {activeTab === 'team' && (
                    <div className="animate-in fade-in duration-300 slide-in-from-bottom-2">
                        <TeamManager />
                    </div>
                )}
                {activeTab === 'about' && (
                    <div className="animate-in fade-in duration-300 slide-in-from-bottom-2">
                        <AboutContentManager />
                    </div>
                )}
                {activeTab === 'faqs' && (
                    <div className="animate-in fade-in duration-300 slide-in-from-bottom-2">
                        <FAQManager />
                    </div>
                )}
            </div>
        </div>
    );
}
