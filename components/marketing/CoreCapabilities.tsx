import { Database, Eye, Cpu, Bot, Network, TrendingUp } from 'lucide-react';
import { getPublishedServices } from '@/app/actions/services';
import { CoreCapabilitiesClient } from './CoreCapabilitiesClient';

const gradientMap: Record<string, string> = {
    forensic: 'from-blue-500 to-cyan-500',
    surveillance: 'from-violet-500 to-purple-500',
    automation: 'from-cyan-500 to-teal-500',
    iot: 'from-green-500 to-emerald-500',
    consulting: 'from-orange-500 to-amber-500',
};

export async function CoreCapabilities() {
    const services = await getPublishedServices();

    console.log('=== CORE CAPABILITIES DEBUG ===');
    console.log('Number of services fetched:', services.length);
    console.log('Services:', services.map(s => ({ title: s.title, slug: s.slug, icon: s.icon })));
    console.log('=== END DEBUG ===');

    // Map services to capabilities format - pass icon name as string
    const capabilities = services.map(service => ({
        iconName: service.icon || 'database', // Pass icon name as string
        title: service.title,
        description: service.subtitle || service.description?.substring(0, 150) || '',
        href: `/services/${service.slug}`,
        gradient: gradientMap[service.category || 'forensic'] || 'from-blue-500 to-cyan-500',
    }));

    return <CoreCapabilitiesClient capabilities={capabilities} />;
}
