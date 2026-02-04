import { Shield, Lock, Activity, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { MOCK_LOGS, ForensicLog } from './mock-data';

export function ActivityLog() {
    return (
        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Recent Forensic Logs</h3>
                <span className="text-xs font-mono text-gray-500 animate-pulse">LIVE FEED</span>
            </div>

            <div className="p-4 space-y-2 overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                {MOCK_LOGS.map((log) => (
                    <LogItem key={log.id} log={log} />
                ))}
            </div>
        </div>
    );
}

function LogItem({ log }: { log: ForensicLog }) {
    const getStatusColor = (type: string) => {
        switch (type) {
            case 'ACCESS': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'SYSTEM': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'AUTH': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'MOTION': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    return (
        <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group">
            <span className="text-xs font-mono text-gray-500 shrink-0 w-16">{log.timestamp}</span>

            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border shrink-0 w-16 text-center ${getStatusColor(log.type)}`}>
                {log.type}
            </span>

            <span className="text-sm text-gray-300 truncate group-hover:text-white transition-colors">
                {log.message}
            </span>
        </div>
    );
}
