import { getAboutContent } from '@/app/actions/company';
import { Shield, Zap, Target, Eye } from 'lucide-react';

export const revalidate = 0;

export default async function AboutPage() {
    const content = await getAboutContent();
    const mission = content.find(c => c.section_key === 'mission');
    const vision = content.find(c => c.section_key === 'vision');
    // const story = content.find(c => c.section_key === 'story');

    return (
        <main className="min-h-screen bg-background text-foreground pt-24 pb-20 overflow-hidden">
            {/* Background Effects */}
            <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12">
                {/* Header */}
                <div className="text-center mb-24 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300 mb-6 backdrop-blur-sm">
                        <Shield className="w-4 h-4 text-violet-400" />
                        <span>About Kingsforth</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-8 break-words">
                        Architecting the <br />
                        <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                            Autonomous Future
                        </span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-gray-400 leading-relaxed font-light">
                        We are building the neural fabric of enterprise security, where intelligence is sovereign and response is instantaneous.
                    </p>
                </div>

                {/* Mission & Vision Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    {/* Mission Card */}
                    <div className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-violet-500/30 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/10">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Target className="w-32 h-32 text-white" />
                        </div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform duration-500">
                                <Target className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                {mission?.title || 'Our Mission'}
                            </h2>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                {mission?.content || 'To eliminate operational inefficiency through sovereign-grade intelligence.'}
                            </p>
                        </div>
                    </div>

                    {/* Vision Card */}
                    <div className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500/30 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Eye className="w-32 h-32 text-white" />
                        </div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-500">
                                <Eye className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                {vision?.title || 'Our Vision'}
                            </h2>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                {vision?.content || 'We serve the autonomous future where systems adapt, predict, and protect with zero latency.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Values / Stats Section (Hardcoded layout, dynamic content possibility) */}
                <div className="bg-gradient-to-b from-[#0F0518] to-black rounded-3xl border border-white/10 p-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px] pointer-events-none"></div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold mb-12">Designed for Critical Scale</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="space-y-4">
                                <div className="text-4xl md:text-5xl font-mono font-bold text-violet-400">
                                    &lt;2ms
                                </div>
                                <p className="text-gray-500 uppercase tracking-widest text-sm font-semibold">Processing Latency</p>
                            </div>
                            <div className="space-y-4">
                                <div className="text-4xl md:text-5xl font-mono font-bold text-cyan-400">
                                    99.9%
                                </div>
                                <p className="text-gray-500 uppercase tracking-widest text-sm font-semibold">Detection Accuracy</p>
                            </div>
                            <div className="space-y-4">
                                <div className="text-4xl md:text-5xl font-mono font-bold text-indigo-400">
                                    24/7
                                </div>
                                <p className="text-gray-500 uppercase tracking-widest text-sm font-semibold">Autonomous Operation</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
