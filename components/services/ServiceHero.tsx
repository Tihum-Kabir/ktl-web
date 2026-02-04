import type { Service } from '@/app/actions/services';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Helper to extract video ID and create embed URL
function getEmbedUrl(url: string | null): string | null {
    if (!url) return null;

    // Handle standard watch URLs (youtube.com/watch?v=ID)
    const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    if (watchMatch && watchMatch[1]) {
        return `https://www.youtube.com/embed/${watchMatch[1]}`;
    }

    // Handle already embedded URLs
    if (url.includes('youtube.com/embed/')) {
        return url;
    }

    // Return original if no match (fallback)
    return url;
}

export function ServiceHero({ service }: { service: Service }) {
    const embedUrl = getEmbedUrl(service.video_url);

    return (
        <section className="relative pt-32 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[70vh] flex items-center">
            {/* Background Grid & Mesh */}
            <div className="absolute inset-0">
                {/* Abstract animated mesh gradient - BRIGHTER */}
                <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-violet-600/40 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
                <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[100px]" />

                {/* Subtle grid overlay */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
            </div>

            <div className="relative max-w-7xl mx-auto w-full z-10">
                <div className="text-center max-w-5xl mx-auto space-y-10">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md transition-all hover:bg-white/10">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        <span className="text-sm text-cyan-100/90 font-medium tracking-wide uppercase text-[11px]">Enterprise Grade Security</span>
                    </div>

                    {/* Service title - Modern Gradient Text */}
                    <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter leading-[0.95]">
                        <span className="bg-gradient-to-b from-white via-white/90 to-white/60 bg-clip-text text-transparent drop-shadow-sm">
                            {service.title}
                        </span>
                    </h1>

                    {/* Subtitle */}
                    {service.subtitle && (
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl mx-auto tracking-tight">
                            {service.subtitle}
                        </p>
                    )}

                    {/* CTA Button Group */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                        <Link
                            href="/contact"
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#6ac4f1] to-[#3a9fd0] hover:from-[#5ab3e0] hover:to-[#2a8fb0] border border-[#a2dcf7]/30 backdrop-blur-xl rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(106,196,241,0.6)]"
                        >
                            <span className="text-black font-bold text-lg tracking-tight">Get Started</span>
                            <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                                <ArrowRight className="w-4 h-4 text-black transition-transform group-hover:translate-x-0.5" />
                            </div>
                        </Link>

                        <Link
                            href="#features"
                            className="text-gray-400 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase hover:underline underline-offset-4"
                        >
                            Explore Features
                        </Link>
                    </div>

                    {/* Hero Video */}
                    {embedUrl && (
                        <div className="w-full max-w-4xl mx-auto mt-16 perspective-[1000px] group">
                            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 bg-slate-900/50 backdrop-blur-sm group-hover:shadow-[0_20px_50px_-12px_rgba(124,58,237,0.2)] transition-all duration-500">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10" />
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={embedUrl}
                                    title={service.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                />
                            </div>
                            <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-[#6ac4f1] to-[#3a9fd0] hover:from-[#5ab3e0] hover:to-[#2a8fb0] text-black font-bold rounded-full transition-all duration-300 shadow-[0_0_30px_-5px_rgba(106,196,241,0.5)] hover:scale-105 border border-[#a2dcf7]/30 flex items-center justify-center gap-2 mt-8">
                                Book a Demo <ArrowRight className="w-4 h-4" />
                            </Link>
                            {/* Decorative elements behind video */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/30 to-cyan-500/30 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 -z-10" />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
