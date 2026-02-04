'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from '@/components/marketing/Navigation';
import { Footer } from '@/components/marketing/Footer';

interface SiteWrapperProps {
    children: React.ReactNode;
    user: any;
    services: any[];
    solutions?: any[];
    resources?: any[];
    logoUrl?: string | null;
    socialLinks?: any;
    contactInfo?: any;
}

export function SiteWrapper({ children, user, services, solutions = [], resources = [], logoUrl, socialLinks, contactInfo }: SiteWrapperProps) {
    const pathname = usePathname();

    // valid routes for marketing layout
    // We exclude admin and dashboard which likely have their own layouts
    const isAppPanel = pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard');
    const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/register');

    const showLayout = !isAppPanel && !isAuthPage;

    // Determine if Super Admin for Footer
    const isSuperAdmin = user?.role === 'SUPER_ADMIN';

    return (
        <>
            {showLayout && <Navigation user={user} services={services} solutions={solutions} resources={resources} logoUrl={logoUrl} />}
            {children}
            {showLayout && <Footer showAdminPortal={isSuperAdmin} logoUrl={logoUrl} socialLinks={socialLinks} contactInfo={contactInfo} />}
        </>
    );
}
