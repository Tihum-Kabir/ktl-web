'use client';

import { useState } from 'react';
import SettingsForm from '@/app/admin/settings/SettingsForm';
import { TeamManager } from '@/components/admin/company/TeamManager';
import { AboutContentManager } from '@/components/admin/company/AboutContentManager';
import { FAQManager } from '@/components/admin/company/FAQManager'; // Import FAQManager
import { Building2, Users, FileText, HelpCircle, LayoutTemplate } from 'lucide-react';

interface SettingsTabsProps {
    initialLogo: any;
    initialSocialLinks: any;
    initialContactInfo: any;
}

export default function SettingsTabs({ initialLogo, initialSocialLinks, initialContactInfo }: SettingsTabsProps) {
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'General & Brand', icon: Building2 },
        { id: 'team', label: 'Team Members', icon: Users },
        { id: 'about', label: 'About Content', icon: FileText },
        { id: 'faqs', label: 'FAQs', icon: HelpCircle }, // Add FAQs Tab
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
                <a
                    href="/admin/settings/homepage"
                    className="flex items-center gap-2 px-4 py-2 rounded-t-lg text-gray-400 hover:text-white hover:bg-white/5 ml-auto text-sm transition-colors"
                >
                    <LayoutTemplate className="w-4 h-4" />
                    <span>Homepage Content &rarr;</span>
                </a>
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
