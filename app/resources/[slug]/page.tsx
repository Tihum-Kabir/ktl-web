import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Download } from 'lucide-react';
import { marked } from 'marked';

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const supabase = await createClient();
    const { data: resource } = await supabase
        .from('resources')
        .select('title, summary')
        .eq('slug', params.slug)
        .single();

    return {
        title: resource ? `${resource.title} | Kingsforth` : 'Resource Not Found',
        description: resource?.summary,
    };
}

export default async function ResourceDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const supabase = await createClient();
    const { data: resource, error } = await supabase
        .from('resources')
        .select('*')
        .eq('slug', params.slug)
        .eq('is_published', true)
        .single();

    if (error || !resource) {
        notFound();
    }

    if (resource.external_link) {
        // Should really be handled by redirect if it was a stored redirect, 
        // but for now we render a page that says "Redirecting..." or just show the link.
        // Actually the design implies clicking cards goes to external link.
        // If user lands here, we show a button.
    }

    // Pre-process content blocks to handle async markdown parsing
    const processedBlocks = await Promise.all((resource.content || []).map(async (block: any) => {
        if (block.type === 'text') {
            return {
                ...block,
                htmlContent: await marked(block.content || '')
            };
        }
        return block;
    }));

    return (
        <article className="min-h-screen bg-black text-white selection:bg-violet-500/30 pt-32 pb-20">
            {/* ... Header ... */}
            <div className="max-w-4xl mx-auto px-8 mb-16">
                {/* (Header content omitted for brevity, keeping structure) */}
                <Link
                    href="/resources"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Resources
                </Link>

                <div className="space-y-6">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20">
                        {resource.category}
                    </span>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                        {resource.title}
                    </h1>

                    {resource.summary && (
                        <p className="text-xl text-gray-400 leading-relaxed font-light">
                            {resource.summary}
                        </p>
                    )}

                    <div className="flex items-center gap-6 text-sm text-gray-500 border-t border-white/10 pt-6">
                        {resource.published_at && (
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {new Date(resource.published_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {Math.max(1, Math.ceil((resource.content || []).length / 2))} min read
                        </div>
                    </div>
                </div>
            </div>

            {/* Cover Image */}
            {resource.cover_image && (
                <div className="max-w-6xl mx-auto px-4 sm:px-8 mb-16">
                    <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-violet-900/20">
                        <Image
                            src={resource.cover_image}
                            alt={resource.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                </div>
            )}

            {/* Content Blocks */}
            <div className="max-w-3xl mx-auto px-8 space-y-12">
                {processedBlocks.map((block: any, index: number) => {
                    switch (block.type) {
                        case 'text':
                            return (
                                <div
                                    key={block.id}
                                    className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-violet-400 prose-img:rounded-xl"
                                    dangerouslySetInnerHTML={{ __html: block.htmlContent }}
                                />
                            );

                        case 'image':
                            return (
                                <figure key={block.id} className="my-8">
                                    <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-slate-900">
                                        <Image
                                            src={block.content}
                                            alt={block.caption || 'Resource image'}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    {block.caption && (
                                        <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
                                            {block.caption}
                                        </figcaption>
                                    )}
                                </figure>
                            );

                        case 'file':
                            return (
                                <div key={block.id} className="my-8">
                                    <a
                                        href={block.content}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-6 bg-slate-900/50 border border-white/10 rounded-xl hover:border-violet-500/50 hover:bg-violet-900/10 transition-all group"
                                    >
                                        <div className="w-12 h-12 bg-violet-600/20 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-violet-600 group-hover:text-white transition-colors text-violet-400">
                                            <Download className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-lg font-medium text-white truncate group-hover:text-violet-300">
                                                Download Attachment
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                {block.content.split('/').pop()}
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            );

                        default:
                            return null;
                    }
                })}
            </div>

            <div className="max-w-4xl mx-auto px-8 mt-20 pt-10 border-t border-white/5 text-center">
                <Link
                    href="/resources"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors"
                >
                    Browser more resources
                </Link>
            </div>
        </article>
    );
}
