'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import {
    Shield,
    User,
    LogOut,
    LayoutDashboard,
    ChevronDown,
    GraduationCap,
    Building2,
    MapPin,
    Crosshair,
    Heart,
    AlertTriangle,
    Radio,
    FileText,
    BookOpen,
    Users,
    Info,
    Database,
    Eye,
    Cpu,
    Bot,
    Network,
    TrendingUp,
    Globe,
    GitCompare,
    HelpCircle,
    Library,
    Award,
    Lock,
    LucideIcon
} from 'lucide-react';
import { signOut } from '@/app/actions/auth';
import type { Service } from '@/app/actions/services';
import { TextScramble } from '@/components/ui/TextScramble';

interface NavigationProps {
    user?: any;
    services?: Service[];
    solutions?: any[];
    resources?: any[];
    logoUrl?: string | null;
}

const iconMap: Record<string, LucideIcon> = {
    database: Database,
    eye: Eye,
    cpu: Cpu,
    bot: Bot,
    network: Network,
    'trending-up': TrendingUp,
    'file-text': FileText,
    'download': Library, // resource library
    'image': Users, // customer story (using users for now)
    'link': Users, // partners
    'award': Award, // grant
    'help-circle': HelpCircle,
    'info': Info,
    'users': Users,
    'mail': FileText, // contact
};

export function Navigation({ user, services = [], solutions = [], resources = [], logoUrl }: NavigationProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const userDropdownRef = useRef<HTMLDivElement>(null);
    const menuTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
                setUserDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMenuEnter = (menu: string) => {
        if (menuTimeoutRef.current) {
            clearTimeout(menuTimeoutRef.current);
        }
        setActiveMenu(menu);
    };

    const handleMenuLeave = () => {
        menuTimeoutRef.current = setTimeout(() => {
            setActiveMenu(null);
        }, 150);
    };

    const isSuperAdmin = user?.role === 'SUPER_ADMIN';

    // Map services
    const serviceItems = services.length > 0 ? services.map(service => ({
        href: `/services/${service.slug}`,
        title: service.title,
        description: service.subtitle || service.description?.substring(0, 50) || '',
        iconName: service.icon || 'database'
    })) : [
        { href: '/services/big-data-forensic', title: 'Big Data Forensic', description: 'Search terabytes of historical data', iconName: 'database' },
        { href: '/services/cognitive-surveillance', title: 'Cognitive Surveillance', description: 'Real-time video analysis', iconName: 'eye' },
        { href: '/services/autonomous-field-ops', title: 'Autonomous Field Ops', description: 'Robotic process automation', iconName: 'cpu' },
        { href: '/services/ai-agentic-saas', title: 'AI Agentic SaaS', description: 'Self-evolving software agents', iconName: 'bot' },
        { href: '/services/iot-orchestration', title: 'IoT Orchestration', description: 'Unifying fragmented sensors', iconName: 'network' },
        { href: '/services/go-to-market', title: 'Go-to-Market Expert', description: 'Strategic guidance', iconName: 'trending-up' }
    ];

    // Map Solutions
    const solutionItems = solutions.length > 0 ? solutions.map(sol => ({
        href: `/solutions/${sol.slug}`,
        title: sol.title,
        description: sol.subtitle || sol.category || 'Solution',
        iconName: sol.category === 'Industry' ? 'building-2' : 'crosshair' // simple heuristic
    })) : [
        // Fallback or static items if none
        { href: '/solutions/education', title: 'Education', description: 'K-12 and higher education', iconName: 'graduation-cap' },
        { href: '/solutions/corporate', title: 'Corporate', description: 'Enterprise security', iconName: 'building-2' },
    ];

    // Map Resources
    // Group by category if needed, or just list recent
    const resourceItems = resources.length > 0 ? resources
        .filter(res => !['Perplexity', 'ChatGPT', 'Claude'].includes(res.title))
        .slice(0, 5)
        .map(res => ({
            href: res.external_link || `/resources/${res.slug}`,
            title: res.title,
            description: res.summary || res.category,
            iconName: 'file-text',
            external: !!res.external_link
        })) : [
        { href: '/resources', title: 'Resource Library', description: 'View all resources', iconName: 'library' },
        { href: '/docs', title: 'API Reference', description: 'Developer documentation', iconName: 'file-text' },
        { href: '/safety', title: 'Campus Safety Data Sheet', description: 'Technical specifications', iconName: 'shield' }
    ];

    return (
        <nav
            style={{
                background: 'rgba(10, 10, 15, 0.4)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                height: '65px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center"
        >
            <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full">
                <div className="flex items-center justify-between h-full">
                    {/* Logo */}
                    <div className="flex items-center gap-4 relative">
                        {/* Ambient Glow matching Gradient */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-24 bg-gradient-to-r from-violet-600/20 to-cyan-500/20 blur-[60px] -z-10 pointer-events-none animate-pulse opacity-80"></div>

                        <Link href="/" className="flex items-center gap-3 group relative z-10">
                            {logoUrl ? (
                                <div className="h-10 w-10 relative flex items-center justify-center drop-shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                                    <img
                                        src={logoUrl}
                                        alt="Kingsforth"
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>
                            ) : (
                                /* Default Shield */
                                <div className="h-10 w-10 relative flex items-center justify-center">
                                    <Shield className="w-8 h-8 fill-transparent stroke-[1.5px] text-[#0cb9f4] drop-shadow-[0_0_10px_rgba(12,185,244,0.5)]" />
                                </div>
                            )}
                            <span className="text-xl font-black tracking-tight uppercase bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent transform scale-y-90 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                                <TextScramble text="KINGSFORTH" />
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Links with Mega Menus */}
                    <div className="hidden lg:flex items-center gap-8">
                        {/* Services */}
                        <div
                            className="relative"
                            onMouseEnter={() => handleMenuEnter('services')}
                            onMouseLeave={handleMenuLeave}
                        >
                            <Link
                                href="/services"
                                className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 px-4 py-2 rounded-full transition-all duration-300 group"
                            >
                                Services
                                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 text-gray-500 group-hover:text-white" />
                            </Link>
                            {activeMenu === 'services' && <ServicesMegaMenu items={serviceItems} />}
                        </div>

                        {/* Solutions */}
                        <div
                            className="relative"
                            onMouseEnter={() => handleMenuEnter('solutions')}
                            onMouseLeave={handleMenuLeave}
                        >
                            <Link
                                href="/solutions"
                                className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 px-4 py-2 rounded-full transition-all duration-300 group"
                            >
                                Solutions
                                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 text-gray-500 group-hover:text-white" />
                            </Link>
                            {activeMenu === 'solutions' && <SolutionsMegaMenu items={solutionItems} />}
                        </div>

                        {/* Resources */}
                        <div
                            className="relative"
                            onMouseEnter={() => handleMenuEnter('resources')}
                            onMouseLeave={handleMenuLeave}
                        >
                            <Link
                                href="/resources"
                                className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 px-4 py-2 rounded-full transition-all duration-300 group"
                            >
                                Resources
                                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 text-gray-500 group-hover:text-white" />
                            </Link>
                            {activeMenu === 'resources' && <ResourcesMegaMenu items={resourceItems} />}
                        </div>



                        {/* Company */}
                        <div
                            className="relative"
                            onMouseEnter={() => handleMenuEnter('company')}
                            onMouseLeave={handleMenuLeave}
                        >
                            <button className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 px-4 py-2 rounded-full transition-all duration-300 group">
                                Company
                                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 text-gray-500 group-hover:text-white" />
                            </button>
                            {activeMenu === 'company' && <CompanyMegaMenu />}
                        </div>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    {/* CTA Buttons */}
                    <div className="hidden lg:flex items-center gap-4">
                        {user ? (
                            <div className="relative" ref={userDropdownRef}>
                                <button
                                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/20 border border-white/10 hover:border-violet-500/30 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-cyan-600 rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-white text-[15px] font-medium">
                                        {user.name || user.email?.split('@')[0]}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {userDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-zinc-950 border border-white/10 rounded-lg shadow-2xl overflow-hidden">
                                        <div className="p-3 border-b border-white/10">
                                            <p className="text-sm font-medium text-white">{user.name || 'User'}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{user.email}</p>
                                            {isSuperAdmin && (
                                                <span className="inline-block mt-1 px-2 py-0.5 bg-violet-600/20 border border-violet-500/30 text-violet-400 text-xs font-medium rounded">
                                                    Super Admin
                                                </span>
                                            )}
                                        </div>

                                        <div className="py-2">
                                            <Link
                                                href="/profile"
                                                className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                                                onClick={() => setUserDropdownOpen(false)}
                                            >
                                                <User className="w-4 h-4" />
                                                <span className="text-sm">Profile</span>
                                            </Link>

                                            <Link
                                                href={isSuperAdmin ? '/admin' : '/dashboard'}
                                                className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                                                onClick={() => setUserDropdownOpen(false)}
                                            >
                                                <LayoutDashboard className="w-4 h-4" />
                                                <span className="text-sm">
                                                    {isSuperAdmin ? 'Admin Portal' : 'Dashboard'}
                                                </span>
                                            </Link>

                                            <form action={signOut}>
                                                <button
                                                    type="submit"
                                                    className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500/10 transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    <span className="text-sm">Sign Out</span>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 px-4 py-2 rounded-full transition-all duration-300"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/contact"
                                    className="px-6 py-2.5 bg-gradient-to-r from-[#6ac4f1] to-[#3a9fd0] hover:from-[#5ab3e0] hover:to-[#2a8fb0] text-black text-[15px] font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_-5px_rgba(106,196,241,0.5)] hover:shadow-[0_0_25px_-5px_rgba(106,196,241,0.7)] hover:scale-105 active:scale-95 border border-[#a2dcf7]/30"
                                >
                                    Book a Demo
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="lg:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Dropdown Menu */}
                    <div className="lg:hidden fixed top-20 left-0 right-0 z-[70] bg-[#020617] border-b border-white/10 shadow-2xl overflow-y-auto max-h-[60vh] ring-1 ring-white/5 animate-in slide-in-from-top-2 duration-200">
                        <div className="px-6 py-6 space-y-4">
                            {/* User Profile in Mobile */}
                            {user && (
                                <div className="border-b border-white/10 pb-4 mb-4">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-[#6ac4f1] to-cyan-600 rounded-full flex items-center justify-center ring-2 ring-white/10">
                                            <User className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-white text-sm uppercase tracking-wider">{user.name || 'User'}</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">{user.email}</div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Link href="/profile" className="flex items-center gap-2 p-2 bg-white/5 rounded-lg text-xs font-medium text-gray-300 hover:bg-white/10 hover:text-white">
                                            <User className="w-3 h-3" /> Profile
                                        </Link>
                                        <Link href={isSuperAdmin ? '/admin' : '/dashboard'} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg text-xs font-medium text-gray-300 hover:bg-white/10 hover:text-white">
                                            <LayoutDashboard className="w-3 h-3" /> {isSuperAdmin ? 'Admin' : 'Dashboard'}
                                        </Link>
                                        <form action={signOut} className="col-span-2">
                                            <button className="w-full flex items-center justify-center gap-2 p-2 bg-red-500/10 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/20">
                                                <LogOut className="w-3 h-3" /> Sign Out
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}

                            <MobileMenuSection title="Services" items={serviceItems} />

                            <MobileMenuSection title="Solutions" items={solutionItems} />

                            <MobileMenuSection title="Resources" items={resourceItems} />

                            <MobileMenuSection title="Company" items={[
                                { href: '/company/about', title: 'About Us', description: 'Our mission and values', iconName: 'info' },
                                { href: '/company/team', title: 'Team', description: 'Meet the people behind Kingsforth', iconName: 'users' },
                                { href: '/contact', title: 'Contact', description: 'Get in touch with us', iconName: 'mail' },
                                { href: '/company/faqs', title: 'FAQs', description: 'Frequently asked questions', iconName: 'help-circle' }
                            ]} />

                            {!user && (
                                <div className="pt-4 border-t border-white/10 space-y-2">
                                    <Link
                                        href="/login"
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-white hover:bg-white/5 rounded-lg transition-colors border border-white/10 uppercase tracking-widest text-xs font-bold"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#6ac4f1] to-[#3a9fd0] hover:from-[#5ab3e0] hover:to-[#2a8fb0] text-black rounded-lg uppercase tracking-widest text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all duration-300"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Book a Demo
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
}

// Product Mega Menu
function ProductMegaMenu({ items }: { items: any[] }) {
    return (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[900px] bg-gradient-to-b from-[#0F0518] to-[#0A0112] backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,1)] border border-white/10 overflow-hidden ring-1 ring-white/5">
            <div className="p-6">
                <div className="grid grid-cols-3 gap-4">
                    {items.map((item, index) => (
                        <DarkMegaMenuItem
                            key={index}
                            href={item.href}
                            icon={iconMap[item.iconName] || Shield}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Services Mega Menu
function ServicesMegaMenu({ items }: { items: any[] }) {
    return (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[900px] bg-gradient-to-b from-[#0F0518] to-[#0A0112] backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,1)] border border-white/10 overflow-hidden ring-1 ring-white/5">
            <div className="p-6">
                <div className="grid grid-cols-3 gap-4">
                    {items.map((item, index) => (
                        <DarkMegaMenuItem
                            key={index}
                            href={item.href}
                            icon={iconMap[item.iconName] || Database}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Solutions Mega Menu
function SolutionsMegaMenu({ items }: { items: any[] }) {
    return (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[700px] bg-gradient-to-b from-[#0F0518] to-[#0A0112] backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,1)] border border-white/10 overflow-hidden ring-1 ring-white/5">
            <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                    {/* For now, just listing them. If we want categories, we'd need to pre-process 'items' prop by category */}
                    {items.map((item, index) => (
                        <DarkMegaMenuItem
                            key={index}
                            href={item.href}
                            icon={iconMap[item.iconName] || Crosshair}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Resources Mega Menu with LLM Models
function ResourcesMegaMenu({ items }: { items: any[] }) {
    return (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[800px] bg-gradient-to-b from-[#0F0518] to-[#0A0112] backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,1)] border border-white/10 overflow-hidden ring-1 ring-white/5">
            <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {items.map((item, index) => (
                        <DarkMegaMenuItem
                            key={index}
                            href={item.href}
                            icon={iconMap[item.iconName] || FileText}
                            title={item.title}
                            description={item.description}
                            external={item.external}
                        />
                    ))}
                </div>

                <div className="border-t border-white/10 pt-6">
                    <h3 className="text-[10px] font-bold text-gray-500 mb-4 uppercase tracking-[0.2em]">
                        START A CONVERSATION TO RESEARCH KINGSFORTH AI ON LLMS:
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        <DarkMegaMenuItem
                            href="https://www.perplexity.ai"
                            icon={Globe}
                            title="Perplexity"
                            description="Start a conversation with Perplexity"
                            external
                        />
                        <DarkMegaMenuItem
                            href="https://chat.openai.com"
                            icon={Globe}
                            title="ChatGPT"
                            description="Start a conversation with ChatGPT"
                            external
                        />
                        <DarkMegaMenuItem
                            href="https://claude.ai"
                            icon={Globe}
                            title="Claude"
                            description="Start a conversation with Claude"
                            external
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Company Mega Menu
function CompanyMegaMenu() {
    return (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] bg-gradient-to-b from-[#0F0518] to-[#0A0112] backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,1)] border border-white/10 overflow-hidden ring-1 ring-white/5">
            <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                    <DarkMegaMenuItem
                        href="/company/about"
                        icon={Info}
                        title="About Us"
                        description="Our mission and values"
                    />
                    <DarkMegaMenuItem
                        href="/company/team"
                        icon={Users}
                        title="Team"
                        description="Meet the people behind Kingsforth"
                    />
                    <DarkMegaMenuItem
                        href="/contact"
                        icon={FileText}
                        title="Contact"
                        description="Get in touch with us"
                    />
                    <DarkMegaMenuItem
                        href="/company/faqs"
                        icon={HelpCircle}
                        title="FAQs"
                        description="Frequently asked questions"
                    />
                </div>
            </div>
        </div>
    );
}

// Dark Mega Menu Item Component
function DarkMegaMenuItem({ href, icon: Icon, title, description, external = false }: any) {
    const content = (
        <>
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-violet-600/20 group-hover:scale-110 transition-all duration-300 border border-white/5 group-hover:border-violet-500/20 shadow-sm">
                <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-violet-300 transition-colors" />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
                <h4 className="text-[15px] font-semibold text-gray-200 group-hover:text-white mb-1 transition-colors">{title}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{description}</p>
            </div>
        </>
    );

    if (external) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#1a0033]/60 transition-colors group"
            >
                {content}
            </a>
        );
    }

    return (
        <Link
            href={href}
            className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/[0.03] transition-all duration-300 border border-transparent hover:border-white/[0.05]"
        >
            {content}
        </Link>
    );
}

// Mobile Menu Section Component
function MobileMenuSection({ title, items }: { title: string; items: Array<{ href: string; title: string; description?: string, iconName?: string }> }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/10 pb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-white hover:bg-[#1a0033]/60 rounded-lg transition-colors text-[16px] uppercase tracking-wider font-bold"
            >
                <span className="flex items-center gap-3">
                    {/* Optional: Add a main section icon if needed, for now just text */}
                    {title}
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="mt-2 space-y-1 pl-2">
                    {items.map((item, index) => {
                        const Icon = item.iconName ? (iconMap[item.iconName] || Shield) : Shield;
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                            >
                                <div className="mt-1 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                    <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                </div>
                                <div>
                                    <div className="text-[15px] font-medium text-white">{item.title}</div>
                                    {item.description && <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{item.description}</div>}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
