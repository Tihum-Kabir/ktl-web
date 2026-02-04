'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Building2,
    Users,
    Wrench,
    DollarSign,
    Mail,
    Image,
    Settings,
    Menu,
    X,
    Shield,
    LogOut,
    ChevronDown,
    Database,
    Library,
    FileText
} from 'lucide-react';
import { signOut } from '@/app/actions/auth';
import { AdminSidebar } from './AdminSidebar';

interface AdminLayoutProps {
    children: React.ReactNode;
    user: any;
}

const navigation = [
    { name: 'Command Center', href: '/admin', icon: LayoutDashboard },
    { name: 'Overview', href: '/admin/companies', icon: Building2 }, // Icon usage in layout doesn't strictly matter for header title, but keeping consistent names is key
    { name: 'Tactical Map', href: '/admin/users', icon: Users },
    { name: 'Live Intel', href: '/admin/services', icon: Wrench },
    { name: 'Forensics Lab', href: '/admin/solutions', icon: Database },
    { name: 'Business Intel', href: '/admin/resources', icon: Library },
    { name: 'Security Insights', href: '/admin/subscriptions', icon: DollarSign }, // Mapped to subscriptions
    { name: 'Alert Center', href: '/admin/tickets', icon: Mail },
    { name: 'System Logs', href: '/admin/invoices', icon: FileText },
    { name: 'Comms Uplink', href: '/admin/email-campaigns', icon: Mail },
    { name: 'Media Library', href: '/admin/media', icon: Image },
    { name: 'Site Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children, user }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const pathname = usePathname();

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <AdminSidebar />
                {/* Mobile Close Button Overlay - optional if AdminSidebar handles its own width/layout, but usually we wrap it */}
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="absolute top-4 right-4 lg:hidden p-2 text-gray-400 hover:text-white"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top header */}
                <header className="sticky top-0 z-30 h-16 bg-background/80 dark:bg-zinc-950/95 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
                    <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                        {/* Mobile menu button */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-foreground"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Page title - could be dynamic */}
                        <div className="hidden lg:block">
                            <h1 className="text-xl font-bold text-foreground">
                                {navigation.find(item => pathname === item.href)?.name || 'Admin Dashboard'}
                            </h1>
                        </div>

                        {/* Right side - User menu */}
                        <div className="relative ml-auto">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#0a0112]/40 transition-colors"
                            >
                                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">
                                        {user?.name?.charAt(0).toUpperCase() || 'A'}
                                    </span>
                                </div>
                                <span className="hidden sm:block text-sm font-medium text-foreground">
                                    {user?.name || 'Admin'}
                                </span>
                                <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </button>

                            {/* Dropdown menu */}
                            {userMenuOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setUserMenuOpen(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-white/10 rounded-lg shadow-xl z-20">
                                        <div className="p-3 border-b border-gray-200 dark:border-white/10">
                                            <p className="text-sm font-medium text-foreground">{user?.name || 'Admin'}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                                        </div>
                                        <div className="p-2">
                                            <Link
                                                href="/"
                                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-foreground hover:bg-gray-100 dark:hover:bg-[#0a0112]/40 rounded-lg transition-colors"
                                            >
                                                <Shield className="w-4 h-4" />
                                                View Site
                                            </Link>
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
