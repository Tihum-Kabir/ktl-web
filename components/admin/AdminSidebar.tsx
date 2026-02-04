import Link from 'next/link';
import {
    LayoutDashboard,
    Settings,
    FileText,
    Users,
    Shield,
    Database,
    Crosshair, // Overview
    Map, // Tactical Map
    Activity, // Live Intel
    FlaskConical, // Forensics
    Bell, // Alert Center
    Radio, // Comms
    Image, // Media
    ExternalLink
} from 'lucide-react';
import { usePathname } from 'next/navigation';

export function AdminSidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname?.startsWith(path);



    return (
        <aside className="w-64 bg-background border-r border-border flex flex-col h-screen fixed left-0 top-0 overflow-y-auto transition-colors duration-300">
            <div className="p-6">
                <Link href="/" className="flex items-center gap-3 mb-8 px-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg text-foreground tracking-tight">KINGSFORTH</span>
                </Link>

                <div className="space-y-8">
                    {/* COMMAND CENTER */}
                    <div>
                        <div className="px-4 text-xs font-bold text-muted-foreground/50 mb-2 tracking-wider">COMMAND CENTER</div>
                        <nav className="space-y-1">
                            {[
                                { href: '/admin', icon: LayoutDashboard, label: 'Command Center', exact: true },
                                { href: '/admin/companies', icon: Crosshair, label: 'Overview' },
                                { href: '/admin/users', icon: Map, label: 'Tactical Map' },
                                { href: '/admin/services', icon: Activity, label: 'Live Intel' },
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${(item.exact ? pathname === item.href : isActive(item.href))
                                        ? 'bg-primary text-primary-foreground shadow-[0_0_10px_rgba(34,211,238,0.2)] border border-primary/20'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted hover:translate-x-1'
                                        }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* INTELLIGENCE SUITE */}
                    <div>
                        <div className="px-4 text-xs font-bold text-muted-foreground/50 mb-2 tracking-wider">INTELLIGENCE SUITE</div>
                        <nav className="space-y-1">
                            {[
                                { href: '/admin/solutions', icon: FlaskConical, label: 'Forensics Lab' },
                                { href: '/admin/resources', icon: Database, label: 'Business Intel' },
                                { href: '/admin/subscriptions', icon: Users, label: 'Security Insights' },
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${(isActive(item.href))
                                        ? 'bg-primary text-primary-foreground shadow-[0_0_10px_rgba(34,211,238,0.2)] border border-primary/20'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted hover:translate-x-1'
                                        }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* OPERATIONS */}
                    <div>
                        <div className="px-4 text-xs font-bold text-muted-foreground/50 mb-2 tracking-wider">OPERATIONS</div>
                        <nav className="space-y-1">
                            {[
                                { href: '/admin/tickets', icon: Bell, label: 'Alert Center' },
                                { href: '/admin/invoices', icon: FileText, label: 'System Logs' }, // Mapping Invoices/Campaigns here? Let's use Invoices as System Logs for now or keep generic
                                { href: '/admin/email-campaigns', icon: Radio, label: 'Comms Uplink' }, // Renamed from Email Campaigns to sound cooler? Or keep standard? "Email Campaigns"
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${(isActive(item.href))
                                        ? 'bg-primary text-primary-foreground shadow-[0_0_10px_rgba(34,211,238,0.2)] border border-primary/20'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted hover:translate-x-1'
                                        }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* CUSTOMIZE */}
                    <div>
                        <div className="px-4 text-xs font-bold text-muted-foreground/50 mb-2 tracking-wider">CUSTOMIZE</div>
                        <nav className="space-y-1">
                            {[
                                { href: '/admin/media', icon: Image, label: 'Media Library' },
                                { href: '/admin/settings', icon: Settings, label: 'Site Settings' },
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${(isActive(item.href))
                                        ? 'bg-primary text-primary-foreground shadow-[0_0_10px_rgba(34,211,238,0.2)] border border-primary/20'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted hover:translate-x-1'
                                        }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            <div className="mt-auto p-6 border-t border-border">
                <div className="flex items-center justify-between gap-2 px-2">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary text-xs font-bold">
                            SA
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-foreground truncate">Super Admin</div>
                            <div className="text-xs text-muted-foreground truncate">admin@kingsforth.com</div>
                        </div>
                    </div>
                    {/* Back to Website Button */}
                    <a
                        href="/"
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        title="Back to Website"
                    >
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </aside>
    );
}
