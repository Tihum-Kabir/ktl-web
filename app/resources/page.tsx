import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ArrowRight, Search, FileText, Download, Users, Building2, Ticket, Bot, Sparkles, BookOpen, Share2, ExternalLink } from 'lucide-react';

const categoryIcons: Record<string, any> = {
    'Documentation': FileText,
    'Library': Download,
    'Customer Story': Users,
    'Partner': Building2,
    'Grant': Ticket,
    'AI Agent': Bot
};

export const metadata = {
    title: 'Resources | Kingsforth',
    description: 'Documentation, guides, and tools for the Kingsforth Security Platform.',
};

export default async function ResourcesPage(props: { searchParams: Promise<{ category?: string }> }) {
    const searchParams = await props.searchParams;
    const supabase = await createClient();
    const categoryFilter = searchParams.category;

    let query = supabase
        .from('resources')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

    if (categoryFilter) {
        query = query.eq('category', categoryFilter);
    }

    const { data: resources } = await query;

    // Grouping
    const aiAgents = resources?.filter(r => r.category === 'AI Agent') || [];
    const documentation = resources?.filter(r => ['Documentation', 'Library'].includes(r.category)) || [];
    const stories = resources?.filter(r => ['Customer Story', 'Partner', 'Grant'].includes(r.category)) || [];

    const isFiltered = !!categoryFilter;
    const categories = ['All', 'Documentation', 'Library', 'Customer Story', 'Partner', 'Grant', 'AI Agent'];

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-violet-500/30 overflow-x-hidden relative">
            {/* Vivid Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-violet-600/20 rounded-full blur-[150px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 rounded-full blur-[120px]" />
                <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] bg-fuchsia-600/10 rounded-full blur-[180px] opacity-50" />
            </div>

            {/* Hero Section */}
            <div className="relative pt-32 pb-16 px-6 overflow-hidden z-10">
                <div className="max-w-5xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_0_15px_rgba(139,92,246,0.3)] animate-fade-in-up">
                        <BookOpen className="w-4 h-4 text-violet-400" />
                        <span className="text-sm font-semibold text-gray-200 tracking-wide uppercase">Knowledge Hub</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 relative animate-fade-in-up delay-100 break-words">
                        <span className="relative z-10">Resource</span> <span className="animate-text-shimmer bg-gradient-to-r from-violet-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]">Library</span>
                        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 to-cyan-600/20 blur-2xl opacity-50 -z-10" />
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-up delay-200">
                        Master the platform with comprehensive guides, interactive tools, and community insights.
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="px-6 mb-24 relative z-20 animate-fade-in-up delay-300">
                <div className="flex flex-wrap items-center justify-center gap-3 max-w-5xl mx-auto">
                    {categories.map((cat) => (
                        <Link
                            key={cat}
                            href={cat === 'All' ? '/resources' : `/resources?category=${encodeURIComponent(cat)}`}
                            className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border backdrop-blur-xl ${(cat === 'All' && !categoryFilter) || categoryFilter === cat
                                ? 'bg-white/10 border-violet-500/50 text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] scale-105'
                                : 'bg-white/[0.03] border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-105'
                                }`}
                        >
                            {cat}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Content Content */}
            <div className="max-w-[1500px] mx-auto px-6 pb-32 space-y-32 relative z-10 animate-fade-in-up delay-500">

                {isFiltered ? (
                    // Filtered View
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {resources?.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
                    </div>
                ) : (
                    // Grouped View
                    <>
                        {/* AI Agents */}
                        {aiAgents.length > 0 && (
                            <section>
                                <SectionHeader title="Interactive Agents" subtitle="Direct integrations with leading LLMs" icon={Bot} />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {aiAgents.map((resource) => <ResourceCard key={resource.id} resource={resource} variant="featured" />)}
                                </div>
                            </section>
                        )}

                        {/* Documentation & Library */}
                        {documentation.length > 0 && (
                            <section>
                                <SectionHeader title="Documentation & Guides" subtitle="Everything you need to build and deploy" icon={FileText} />
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {documentation.map((resource) => <ResourceCard key={resource.id} resource={resource} variant="compact" />)}
                                </div>
                            </section>
                        )}

                        {/* Stories & Partners */}
                        {stories.length > 0 && (
                            <section>
                                <SectionHeader title="Community & Success" subtitle="Real-world applications and partnerships" icon={Users} />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {stories.map((resource) => <ResourceCard key={resource.id} resource={resource} variant="standard" />)}
                                </div>
                            </section>
                        )}
                    </>
                )}

                {(!resources || resources.length === 0) && (
                    <div className="text-center py-32 border border-white/5 rounded-3xl bg-white/[0.02]">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center animate-bounce-slow">
                                <Search className="w-10 h-10 text-gray-600" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No resources found</h3>
                        <p className="text-gray-500 text-lg">Try adjusting your filters or check back later.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function SectionHeader({ title, subtitle, icon: Icon }: { title: string, subtitle: string, icon: any }) {
    return (
        <div className="flex items-end justify-between gap-4 mb-12 relative">
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="flex items-center gap-4 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-white mb-1">{title}</h2>
                    <p className="text-gray-400 font-medium">{subtitle}</p>
                </div>
            </div>
        </div>
    );
}

function ResourceCard({ resource, variant = 'standard' }: { resource: any, variant?: 'featured' | 'compact' | 'standard' }) {
    const Icon = categoryIcons[resource.category] || FileText;
    const href = resource.external_link || `/resources/${resource.slug}`;
    const isExternal = !!resource.external_link;

    // Featured (Horizontal / Hero Style) for AI Agents
    if (variant === 'featured') {
        return (
            <Link
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="group relative h-[300px] rounded-[32px] overflow-hidden bg-[#0A0A0A] border border-white/10 hover:border-violet-500/50 transition-all duration-500 flex flex-col justify-end p-8 hover:shadow-[0_0_50px_-10px_rgba(139,92,246,0.3)] hover:-translate-y-2"
            >
                {/* Background Image / Pattern */}
                <div className="absolute inset-0 z-0">
                    {resource.cover_image ? (
                        <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                            <img
                                src={resource.cover_image}
                                alt={resource.title}
                                className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-700"
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-violet-900/30 via-black to-black group-hover:from-violet-800/40 transition-colors duration-700" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md border border-white/10 group-hover:bg-violet-500 group-hover:border-violet-400 transition-all duration-300 shadow-lg">
                            <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            <ExternalLink className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">{resource.title}</h3>
                        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed group-hover:text-gray-300">{resource.summary}</p>
                    </div>
                </div>
            </Link>
        );
    }

    // Compact (For Documentation)
    if (variant === 'compact') {
        return (
            <Link
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="group relative p-6 rounded-2xl bg-[#0F0F16] border border-white/5 hover:border-violet-500/30 hover:bg-[#151520] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10"
            >
                <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/5 flex items-center justify-center shrink-0 group-hover:from-violet-600 group-hover:to-cyan-600 group-hover:border-transparent transition-all duration-500 shadow-inner">
                        <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                    <div className="min-w-0 flex-1 py-1">
                        <h3 className="text-lg font-bold text-gray-200 group-hover:text-white truncate transition-colors mb-1">
                            {resource.title}
                        </h3>
                        {/* Decorative Line */}
                        <div className="h-0.5 w-8 bg-white/10 rounded-full mb-2 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-violet-500 group-hover:to-cyan-500 transition-all duration-500" />
                        <p className="text-xs text-gray-500 line-clamp-2 group-hover:text-gray-400">
                            {resource.summary}
                        </p>
                    </div>
                </div>
            </Link>
        );
    }

    // Standard (For articles/stories)
    return (
        <Link
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="group flex flex-col bg-[#08080A] border border-white/10 rounded-[28px] overflow-hidden hover:border-violet-500/40 hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.2)] transition-all duration-500 hover:-translate-y-2 relative"
        >
            {/* Glow Effect on Hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-[30px] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

            <div className="aspect-[16/9] relative overflow-hidden bg-zinc-900 border-b border-white/5 z-10">
                {resource.cover_image ? (
                    <img
                        src={resource.cover_image}
                        alt={resource.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/[0.02]">
                        <Icon className="w-20 h-20 text-gray-800" />
                    </div>
                )}
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1.5 rounded-lg text-[10px] uppercase font-heavy tracking-wider bg-black/80 backdrop-blur-xl border border-white/10 text-white shadow-lg">
                        {resource.category}
                    </span>
                </div>
            </div>

            <div className="p-8 flex-1 flex flex-col relative z-10 bg-[#08080A]">
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-cyan-400 transition-all duration-300">
                    {resource.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-8 flex-1 font-light group-hover:text-gray-300">
                    {resource.summary}
                </p>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                        <Sparkles className="w-3 h-3 text-violet-500" />
                        {new Date(resource.published_at || Date.now()).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <span className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-cyan-400 transition-colors bg-white/5 px-4 py-2 rounded-full group-hover:bg-cyan-900/20">
                        {isExternal ? 'Visit' : 'Read'} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                </div>
            </div>
        </Link>
    );
}
