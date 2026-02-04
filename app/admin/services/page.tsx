import { getAllServices, deleteService, publishService, unpublishService } from '@/app/actions/services';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, EyeOff, Search } from 'lucide-react';
import { ServiceActions } from '@/components/admin/ServiceActions';

export default async function ServicesPage() {
    const services = await getAllServices();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Services</h1>
                    <p className="text-gray-400">Manage your service catalog</p>
                </div>
                <Link
                    href="/admin/services/new"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-violet-600/25"
                >
                    <Plus className="w-5 h-5" />
                    New Service
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                    <p className="text-sm text-gray-400 mb-1">Total Services</p>
                    <p className="text-3xl font-bold text-white">{services.length}</p>
                </div>
                <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                    <p className="text-sm text-gray-400 mb-1">Published</p>
                    <p className="text-3xl font-bold text-emerald-400">
                        {services.filter(s => s.is_published).length}
                    </p>
                </div>
                <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                    <p className="text-sm text-gray-400 mb-1">Drafts</p>
                    <p className="text-3xl font-bold text-amber-400">
                        {services.filter(s => !s.is_published).length}
                    </p>
                </div>
            </div>

            {/* Services Table */}
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-800/50 border-b border-white/10">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Service
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Order
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {services.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl flex items-center justify-center">
                                                <Search className="w-8 h-8 text-gray-600" />
                                            </div>
                                            <p className="text-gray-500 font-medium">No services found</p>
                                            <Link
                                                href="/admin/services/new"
                                                className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                                            >
                                                Create your first service →
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                services.map((service) => (
                                    <tr key={service.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-violet-600/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                                                    <span className="text-lg">{getIconEmoji(service.icon)}</span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{service.title}</p>
                                                    <p className="text-sm text-gray-500">{service.subtitle}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                                {service.category || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {service.is_published ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                    <Eye className="w-3 h-3" />
                                                    Published
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                                    <EyeOff className="w-3 h-3" />
                                                    Draft
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-400">{service.order_index || '-'}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <ServiceActions service={service} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function getIconEmoji(icon: string | null): string {
    const iconMap: Record<string, string> = {
        'database': '🗄️',
        'eye': '👁️',
        'cpu': '🤖',
        'bot': '🤖',
        'network': '🌐',
        'trending-up': '📈',
    };
    return iconMap[icon || ''] || '⚡';
}
