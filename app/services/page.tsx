
import { getAllServices } from '@/app/actions/services';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Database, Eye, Cpu, Bot, Network, TrendingUp, Shield, ArrowRight } from 'lucide-react';

const iconMap: any = {
    database: Database,
    eye: Eye,
    cpu: Cpu,
    bot: Bot,
    network: Network,
    'trending-up': TrendingUp,
    shield: Shield,
    default: Database
};

export const metadata = {
    title: 'Our Services | Kingsforth',
    description: 'Explore our AI-driven security and intelligence solutions.',
};

export default async function ServicesPage() {
    const services = await getAllServices({ published: true });

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-violet-500/30 overflow-x-hidden relative">
            {/* Ambient Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse-slow" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
            </div>

            {/* Hero Section */}
            <div className="relative pt-40 pb-20 px-6 z-10">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl animate-fade-in shadow-lg shadow-violet-500/10">
                        <Sparkles className="w-4 h-4 text-violet-400" />
                        <span className="text-sm font-medium text-gray-200">Our Capabilities</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400">
                            Intelligence
                        </span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 drop-shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                            Redefined
                        </span>
                    </h1>

                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        Comprehensive AI-driven security and intelligence services designed for the modern enterprise.
                    </p>
                </div>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-32 relative z-10">
                {/* Optional Grid Background Pattern */}
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const Icon = (service.icon && iconMap[service.icon]) ? iconMap[service.icon] : Database;

                        // Strip HTML tags for the excerpt
                        const descriptionText = service.description?.replace(/<[^>]*>?/gm, '') || '';
                        const excerpt = descriptionText.length > 120
                            ? descriptionText.substring(0, 120) + '...'
                            : descriptionText;

                        return (
                            <div key={service.id} className="group relative flex flex-col h-full">
                                {/* Glow Effect behind card */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-30 blur transition duration-500" />

                                <div className="relative flex flex-col h-full bg-white dark:bg-[#0A0A12]/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/10 hover:-translate-y-1">

                                    {/* Image / Graphic Area */}
                                    <div className="h-56 w-full bg-slate-950/50 relative overflow-hidden">
                                        {service.image_url ? (
                                            <Image
                                                src={service.image_url}
                                                alt={service.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 to-slate-900 flex items-center justify-center group-hover:bg-slate-900/60 transition-all">
                                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                <Icon className="w-20 h-20 text-white/5 group-hover:text-violet-400/50 transition-colors duration-500 transform group-hover:scale-110 group-hover:rotate-3" />
                                            </div>
                                        )}

                                        {/* Overlay Gradient for Text Contrast */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A12] via-transparent to-transparent opacity-90" />

                                        {/* Floating Icon Badge */}
                                        <div className="absolute bottom-4 left-6 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-violet-600/20 group-hover:border-violet-500/40 transition-all duration-300">
                                            <Icon className="w-6 h-6 text-white group-hover:text-violet-200 transition-colors" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 pt-4 flex flex-col flex-grow">
                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                                            {service.title}
                                        </h3>

                                        {service.subtitle && (
                                            <p className="text-sm font-medium text-cyan-400/90 mb-3 font-mono tracking-wide">
                                                {service.subtitle}
                                            </p>
                                        )}

                                        <p className="text-gray-400 text-sm leading-relaxed mb-8 border-t border-white/5 pt-4 mt-2">
                                            {excerpt}
                                        </p>

                                        <div className="mt-auto grid grid-cols-2 gap-4">
                                            <Link
                                                href={`/services/${service.slug}`}
                                                className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-center text-sm font-semibold text-gray-200 transition-all hover:text-white group-hover:border-white/20"
                                            >
                                                Learn More
                                            </Link>
                                            <Link
                                                href="/contact"
                                                className="px-4 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 rounded-xl text-center text-sm font-semibold text-white shadow-lg shadow-violet-900/40 hover:shadow-violet-600/40 transition-all flex items-center justify-center gap-2 group/btn"
                                            >
                                                Book Now
                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {services.length === 0 && (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                        <Sparkles className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-white mb-2">Platform Services</h3>
                        <p className="text-gray-400">Service catalog is currently being updated.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
