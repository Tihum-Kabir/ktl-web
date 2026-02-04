'use client';

import { Maximize2 } from 'lucide-react';
import { MOCK_LOCATIONS } from './mock-data';

export function SurveillanceMap() {
    return (
        <div className="flex flex-col h-full bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden relative">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
                <h3 className="text-lg font-bold text-white">Live Surveillance Map</h3>
                <button className="text-xs font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                    View Fullscreen <Maximize2 className="w-3 h-3" />
                </button>
            </div>

            {/* Map Area */}
            <div className="relative flex-1 bg-[#1A1A1A] overflow-hidden min-h-[400px]">
                {/* Simulated World Map Background (Vector/Image) */}
                <div
                    className="absolute inset-0 opacity-40 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center grayscale contrast-125"
                    style={{ backgroundBlendMode: 'overlay' }}
                />

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                {/* Markers */}
                {MOCK_LOCATIONS.map((loc) => (
                    <div
                        key={loc.id}
                        className="absolute group z-10 cursor-pointer"
                        style={{
                            top: `${50 - (loc.lat / 90) * 50}%`,
                            left: `${50 + (loc.lng / 180) * 50}%`,
                        }}
                    >
                        {/* Ping Animation */}
                        <div className={`absolute -inset-4 rounded-full opacity-75 animate-ping ${loc.status === 'alert' ? 'bg-red-500' : 'bg-blue-500'
                            }`} />

                        {/* Dot */}
                        <div className={`relative w-4 h-4 rounded-full border-2 border-white shadow-[0_0_10px_rgba(0,0,0,0.5)] ${loc.status === 'alert' ? 'bg-red-500 shadow-red-500/50' : 'bg-blue-500 shadow-blue-500/50'
                            }`} />

                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-black/90 text-white text-xs whitespace-nowrap px-3 py-1.5 rounded-lg border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-md">
                            <span className="font-bold">{loc.name}</span>
                            <div className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">{loc.status}</div>
                            {/* Arrow */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black/90" />
                        </div>
                    </div>
                ))}

                {/* Decorative Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent pointer-events-none" />
            </div>
        </div>
    );
}
