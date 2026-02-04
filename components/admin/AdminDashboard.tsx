'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Shield,
    Users,
    Building2,
    CreditCard,
    Ticket,
    FileText,
    Settings,
    BarChart3,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { signOut } from '@/app/actions/auth';

interface AdminDashboardProps {
    user: any;
}

export function AdminDashboard({ user }: AdminDashboardProps) {
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'companies', label: 'Companies', icon: Building2 },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'services', label: 'Services', icon: CreditCard },
        { id: 'subscriptions', label: 'Subscriptions', icon: FileText },
        { id: 'tickets', label: 'Support Tickets', icon: Ticket },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Top Bar */}
            <div className="fixed top-0 left-0 right-0 h-16 bg-zinc-950 border-b border-white/10 z-50 flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-cyan-600 rounded-lg flex items-center justify-center">
                            <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold">Kingsforth Admin</h1>
                            <p className="text-xs text-gray-500">Super Admin Portal</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-sm font-medium">{user.name || user.email}</p>
                        <p className="text-xs text-violet-400">Super Admin</p>
                    </div>
                    <form action={signOut}>
                        <button
                            type="submit"
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-16 left-0 bottom-0 w-64 bg-zinc-950 border-r border-white/10 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.id
                                        ? 'bg-violet-600 text-white'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm"
                    >
                        ← Back to Website
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div
                className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'pl-64' : 'pl-0'
                    }`}
            >
                <div className="p-8">
                    {activeTab === 'overview' && <OverviewTab />}
                    {activeTab === 'companies' && <CompaniesTab />}
                    {activeTab === 'users' && <UsersTab />}
                    {activeTab === 'services' && <ServicesTab />}
                    {activeTab === 'subscriptions' && <SubscriptionsTab />}
                    {activeTab === 'tickets' && <TicketsTab />}
                    {activeTab === 'settings' && <SettingsTab />}
                </div>
            </div>
        </div>
    );
}

// Tab Components
function OverviewTab() {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Companies" value="0" icon={Building2} color="violet" />
                <StatCard title="Total Users" value="1" icon={Users} color="cyan" />
                <StatCard title="Active Subscriptions" value="0" icon={CreditCard} color="purple" />
                <StatCard title="Open Tickets" value="0" icon={Ticket} color="pink" />
            </div>

            <div className="mt-8 bg-zinc-950 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Welcome to Kingsforth Admin Portal</h3>
                <p className="text-gray-400 mb-4">
                    You have full access to manage the entire platform. Use the sidebar to navigate between different sections.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <QuickAction title="Manage Companies" description="View and manage all companies" icon={Building2} />
                    <QuickAction title="Manage Users" description="View and manage all users" icon={Users} />
                    <QuickAction title="Manage Services" description="View and manage service catalog" icon={CreditCard} />
                    <QuickAction title="Support Tickets" description="View and respond to tickets" icon={Ticket} />
                </div>
            </div>
        </div>
    );
}

function CompaniesTab() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Companies</h2>
                <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg font-medium transition-colors">
                    + Add Company
                </button>
            </div>
            <div className="bg-zinc-950 border border-white/10 rounded-xl p-6">
                <p className="text-gray-400">No companies yet. Click "Add Company" to create your first company.</p>
            </div>
        </div>
    );
}

function UsersTab() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Users</h2>
                <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg font-medium transition-colors">
                    + Add User
                </button>
            </div>
            <div className="bg-zinc-950 border border-white/10 rounded-xl p-6">
                <p className="text-gray-400">User management interface coming soon.</p>
            </div>
        </div>
    );
}

function ServicesTab() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Services</h2>
                <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg font-medium transition-colors">
                    + Add Service
                </button>
            </div>
            <div className="bg-zinc-950 border border-white/10 rounded-xl p-6">
                <p className="text-gray-400">Service catalog management coming soon.</p>
            </div>
        </div>
    );
}

function SubscriptionsTab() {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Subscriptions</h2>
            <div className="bg-zinc-950 border border-white/10 rounded-xl p-6">
                <p className="text-gray-400">Subscription management coming soon.</p>
            </div>
        </div>
    );
}

function TicketsTab() {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Support Tickets</h2>
            <div className="bg-zinc-950 border border-white/10 rounded-xl p-6">
                <p className="text-gray-400">Support ticket management coming soon.</p>
            </div>
        </div>
    );
}

function SettingsTab() {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Settings</h2>
            <div className="bg-zinc-950 border border-white/10 rounded-xl p-6">
                <p className="text-gray-400">Settings interface coming soon.</p>
            </div>
        </div>
    );
}

// Helper Components
function StatCard({ title, value, icon: Icon, color }: any) {
    const colors = {
        violet: 'from-violet-600 to-violet-500',
        cyan: 'from-cyan-600 to-cyan-500',
        purple: 'from-purple-600 to-purple-500',
        pink: 'from-pink-600 to-pink-500',
    };

    return (
        <div className="bg-zinc-950 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${colors[color]} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
        </div>
    );
}

function QuickAction({ title, description, icon: Icon }: any) {
    return (
        <div className="bg-black border border-white/10 rounded-lg p-4 hover:border-violet-500/30 transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-violet-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                    <h4 className="font-semibold mb-1">{title}</h4>
                    <p className="text-sm text-gray-400">{description}</p>
                </div>
            </div>
        </div>
    );
}
