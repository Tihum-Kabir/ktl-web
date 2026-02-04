import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ArrowRight, GraduationCap, Building2, MapPin, Crosshair, Heart, AlertTriangle, Radio, Shield } from 'lucide-react';

const iconMap: Record<string, any> = {
    'Education': GraduationCap,
    'Corporate': Building2,
    'Cities & Government': MapPin,
    'Perimeter Security': Crosshair,
    'Medical Emergencies': Heart,
    'Weapons Detection': AlertTriangle,
    'VSOC': Radio,
};

export const metadata = {
    title: 'Solutions | Kingsforth',
    description: 'AI-driven security solutions for every industry and use case.',
};

export default async function SolutionsIndexPage() {
    const supabase = await createClient();
    const { data: solutions } = await supabase
        .from('solutions')
        .select('*')
        .eq('is_published', true)
        .order('title');

    const industries = solutions?.filter(s => s.category === 'Industry') || [];
    const useCases = solutions?.filter(s => s.category === 'Use Case') || [];

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-violet-500/30">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 px-8 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,_var(--tw-gradient-stops))] from-violet-900/20 via-black to-black opacity-50" />
                <div className="max-w-6xl mx-auto relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-transparent">
                        Intelligence for <br />
                        <span className="text-violet-400">Every Sector</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Tailored AI security solutions designed to detect threats, optimize operations, and protect what matters most across any environment.
                    </p>
                </div>
            </div>

            {/* Industries Section - Horizontal Cards */}
            <section className="py-20 px-8 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent flex-1" />
                        <h2 className="text-2xl font-mono text-violet-400 tracking-wider uppercase">By Industry</h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent flex-1" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {industries.map((solution) => {
                            const Icon = iconMap[solution.title] || Building2;
                            return (
                                <Link
                                    key={solution.id}
                                    href={`/solutions/${solution.slug}`}
                                    className="group relative h-[400px] rounded-3xl overflow-hidden border border-white/10 hover:border-violet-500/50 transition-all duration-500"
                                >
                                    {/* Background Image */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={solution.hero_image || '/placeholder.jpg'}
                                            alt={solution.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
                                    </div>

                                    {/* Content */}
                                    <div className="absolute inset-x-0 bottom-0 p-8 transform transition-transform duration-500">
                                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-white group-hover:bg-violet-600 group-hover:scale-110 transition-all duration-300">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{solution.title}</h3>
                                        <p className="text-gray-400 line-clamp-2 mb-6 group-hover:text-gray-200 transition-colors">
                                            {solution.subtitle}
                                        </p>

                                        <div className="flex items-center gap-2 text-violet-400 font-medium opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                            Explore Solution <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Use Cases Section - Bento / List Style */}
            <section className="py-20 px-8 bg-zinc-950/50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-16">
                        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent flex-1" />
                        <h2 className="text-2xl font-mono text-cyan-400 tracking-wider uppercase">By Use Case</h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent flex-1" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {useCases.map((solution) => {
                            const Icon = iconMap[solution.title] || Shield;
                            return (
                                <Link
                                    key={solution.id}
                                    href={`/solutions/${solution.slug}`}
                                    className="group flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-cyan-500/30 transition-all duration-300"
                                >
                                    <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 relative">
                                        <img
                                            src={solution.hero_image}
                                            alt={solution.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-cyan-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    <div className="flex-1 flex flex-col justify-center">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                                {solution.title}
                                            </h3>
                                            <Icon className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                                        </div>
                                        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                                            {solution.description}
                                        </p>
                                        <div className="mt-auto">
                                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-black/50 rounded-lg text-xs font-medium text-gray-300 border border-white/5 group-hover:border-cyan-500/50 group-hover:text-cyan-300 transition-all">
                                                Explore <ArrowRight className="w-3 h-3" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
