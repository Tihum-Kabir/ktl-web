import { createClient } from '@/lib/supabase/server';
import { Sparkles, Building2, Wrench, Users, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { DashboardStats } from '@/components/admin/dashboard/DashboardStats';
import { SurveillanceMap } from '@/components/admin/dashboard/SurveillanceMap';
import { ActivityLog } from '@/components/admin/dashboard/ActivityLog';
import { GrantAdminForm } from '@/components/admin/dashboard/GrantAdminForm';
import { TextScramble } from '@/components/ui/TextScramble';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

export default async function AdminDashboard() {
    // Keep the "server action" style look for future real data
    const supabase = await createClient();

    // Quick Actions Data
    const quickActions = [
        {
            title: 'Manage Companies',
            description: 'View and edit companies',
            href: '/admin/companies',
            icon: Building2,
            gradient: 'from-cyan-500 to-blue-600',
        },
        {
            title: 'Manage Services',
            description: 'Create and publish services',
            href: '/admin/services',
            icon: Wrench,
            gradient: 'from-violet-500 to-purple-600',
        },
        {
            title: 'Manage Users',
            description: 'View and contact users',
            href: '/admin/users',
            icon: Users,
            gradient: 'from-emerald-500 to-green-600',
        },
    ];

    return (
        <div className="space-y-8 min-h-screen pb-20">
            {/* Welcome header with gradient */}
            <ScrollReveal>
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-cyan-600/10 to-violet-600/10 rounded-2xl blur-3xl pointer-events-none" />
                    <div className="relative bg-white/70 dark:bg-gradient-to-br dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-8 flex justify-between items-end shadow-sm dark:shadow-none">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <Sparkles className="w-6 h-6 text-violet-500 dark:text-violet-400" />
                                <h1 className="text-4xl font-bold text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-gray-100 dark:to-gray-300 flex items-center gap-2">
                                    <TextScramble text="Command Center" />
                                </h1>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-lg">System Status: <span className="text-emerald-500 dark:text-emerald-400 font-semibold">Nominal</span></p>
                        </div>
                        <div className="text-right hidden md:block">
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">Last Updated</p>
                            <p className="text-gray-900 dark:text-white font-mono">{new Date().toLocaleTimeString()}</p>
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            {/* Dashboard Mock Grid */}
            <ScrollReveal delay={0.1}>
                <DashboardStats />
            </ScrollReveal>

            {/* Split View: Map & Logs */}
            <ScrollReveal delay={0.2}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
                    <div className="lg:col-span-2 h-full">
                        <SurveillanceMap />
                    </div>
                    <div className="h-full">
                        <ActivityLog />
                    </div>
                </div>
            </ScrollReveal>

            {/* Quick Actions (Moved to bottom) */}
            <ScrollReveal delay={0.3}>
                <div className="relative pt-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-gradient-to-b from-gray-500 to-gray-700 rounded-full" />
                        Admin Controls
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* New Grant Admin Card */}
                        <GrantAdminForm />

                        {quickActions.map((action) => (
                            <Link
                                key={action.title}
                                href={action.href}
                                className="block h-full"
                            >
                                <SpotlightCard
                                    className="group h-full bg-white dark:bg-gradient-to-br dark:from-[#0A0A0A] dark:to-[#111111] border border-gray-200 dark:border-white/5 rounded-xl p-6 hover:border-violet-500/20 dark:hover:border-white/20 transition-all duration-300 hover:scale-[1.01] shadow-sm dark:shadow-none"
                                    border="rgba(139, 92, 246, 0.3)"
                                >
                                    {/* Gradient overlay on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                                    <div className="relative flex items-center gap-4">
                                        {/* Icon */}
                                        <div className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                            <action.icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-transparent dark:group-hover:bg-gradient-to-r dark:group-hover:bg-clip-text dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">
                                                {action.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                                                {action.description}
                                            </p>
                                        </div>
                                        <ArrowUpRight className="w-5 h-5 text-gray-400 dark:text-gray-600 group-hover:text-violet-500 dark:group-hover:text-white transition-colors" />
                                    </div>
                                </SpotlightCard>
                            </Link>
                        ))}
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}
