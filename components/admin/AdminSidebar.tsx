import Link from 'next/link';
import {
    LayoutDashboard,
    Settings,
    MessageSquare,
    FileText,
    Users,
    Building2,
    CreditCard,
    Ticket,
    Shield,
    Database, // Use for Solutions
    Library // Use for Resources
} from 'lucide-react';
import { usePathname } from 'next/navigation';

export function AdminSidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname?.startsWith(path);

    const menuItems = [
        { href: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
        { href: '/admin/companies', icon: Building2, label: 'Companies' },
        { href: '/admin/users', icon: Users, label: 'Users' },
        { href: '/admin/subscriptions', icon: CreditCard, label: 'Subscriptions' },
        { href: '/admin/solutions', icon: Database, label: 'Solutions' }, // Already Added
        { href: '/admin/tickets', icon: Ticket, label: 'Support Tickets' },
        { href: '/admin/invoices', icon: FileText, label: 'Invoices' },
        { href: '/admin/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <aside className="w-64 bg-background border-r border-border flex flex-col h-screen fixed left-0 top-0 overflow-y-auto transition-colors duration-300">
            <div className="p-6">
                <Link href="/" className="flex items-center gap-3 mb-8 px-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-cyan-600 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg text-foreground tracking-tight">KINGSFORTH</span>
                </Link>

                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${(item.exact ? pathname === item.href : isActive(item.href))
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
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

                </div>
            </div>
        </aside>
    );
}
