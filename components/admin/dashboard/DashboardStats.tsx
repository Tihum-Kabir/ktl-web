import { Wifi, Eye, HardDrive, TrendingUp, Activity } from 'lucide-react';
import { MOCK_STATS } from './mock-data';

export function DashboardStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Network Uptime */}
            <div className="relative group overflow-hidden bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 hover:border-violet-500/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-violet-500/10 rounded-xl border border-violet-500/20">
                        <Wifi className="w-6 h-6 text-violet-400" />
                    </div>
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full border border-emerald-400/20">
                        <TrendingUp className="w-3 h-3" /> +12%
                    </span>
                </div>

                <div className="space-y-1 relative z-10">
                    <h3 className="text-4xl font-bold text-white tracking-tight flex items-baseline gap-1">
                        {MOCK_STATS.uptime}<span className="text-xl text-gray-500 font-medium">%</span>
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">Network Uptime</p>
                </div>

                {/* Decorative Pulse */}
                <div className="absolute bottom-6 right-6 w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
            </div>

            {/* Active Cameras */}
            <div className="relative group overflow-hidden bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                        <Eye className="w-6 h-6 text-cyan-400" />
                    </div>
                    <span className="text-xs font-semibold text-gray-500 px-2 py-1">Total</span>
                </div>

                <div className="space-y-1 relative z-10">
                    <h3 className="text-4xl font-bold text-white tracking-tight">
                        {MOCK_STATS.activeCameras}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">Active Cameras</p>
                </div>
            </div>

            {/* Forensic Data */}
            <div className="relative group overflow-hidden bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <HardDrive className="w-6 h-6 text-amber-400" />
                    </div>
                    <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 px-2 py-1 rounded-full border border-amber-400/20">New</span>
                </div>

                <div className="space-y-1 relative z-10">
                    <h3 className="text-4xl font-bold text-white tracking-tight">
                        {MOCK_STATS.forensicData}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">Forensic Data Processed</p>
                </div>
            </div>
        </div>
    );
}
