'use client';

import { useState } from 'react';
import { SiteSettingsForm } from '@/components/admin/company/SiteSettingsForm';
import { TeamManager } from '@/components/admin/company/TeamManager';
import { AboutContentManager } from '@/components/admin/company/AboutContentManager';
import { Building2, Users, FileText } from 'lucide-react';

export default function CompanyAdminPage() {
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'General Settings', icon: Building2 },
        { id: 'team', label: 'Team Members', icon: Users },
        { id: 'about', label: 'About Content', icon: FileText },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Company Settings</h1>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-white/10 pb-1 overflow-x-auto">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors relative ${isActive ? 'text-white bg-white/5 border-b-2 border-violet-500' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm font-medium whitespace-nowrap">{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Content Area */}
            <div className="min-h-[500px]">
                {activeTab === 'general' && (
                    <div className="animate-in fade-in duration-300">
                        <SiteSettingsForm />
                    </div>
                )}
                {activeTab === 'team' && (
                    <div className="animate-in fade-in duration-300">
                        <TeamManager />
                    </div>
                )}
                {activeTab === 'about' && (
                    <div className="animate-in fade-in duration-300">
                        <AboutContentManager />
                    </div>
                )}
            </div>
        </div>
    );
}
