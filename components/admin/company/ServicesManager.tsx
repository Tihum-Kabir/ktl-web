'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Edit, Eye, EyeOff, Plus, Search, Trash2, Loader2 } from 'lucide-react';
import { deleteService, publishService, unpublishService } from '@/app/actions/services';
import type { Service } from '@/app/actions/services';
import { useRouter } from 'next/navigation';

export function ServicesManager({ initialServices }: { initialServices: Service[] }) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [isToggling, setIsToggling] = useState<string | null>(null);

    const filteredServices = initialServices.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
        setIsDeleting(id);
        const res = await deleteService(id);
        setIsDeleting(null);
        if (res.success) router.refresh();
        else alert('Error deleting service');
    };

    const handleTogglePublish = async (service: Service) => {
        setIsToggling(service.id);
        const res = service.is_published
            ? await unpublishService(service.id)
            : await publishService(service.id);
        setIsToggling(null);
        if (res.data) router.refresh();
        else alert('Error updating status');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search services..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                    />
                </div>
                <Link
                    href="/admin/services/new"
                    className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Service</span>
                </Link>
            </div>

            <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Service</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {filteredServices.map((service) => (
                            <tr key={service.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {service.icon && <div className="text-2xl">{service.icon}</div>}
                                        <div>
                                            <div className="font-medium text-white">{service.title}</div>
                                            <div className="text-xs text-gray-500 truncate max-w-[200px]">{service.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-400">{service.category || '—'}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${service.is_published
                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                        }`}>
                                        {service.is_published ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => handleTogglePublish(service)}
                                            disabled={!!isToggling}
                                            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                                            title={service.is_published ? "Unpublish" : "Publish"}
                                        >
                                            {isToggling === service.id ? <Loader2 className="w-4 h-4 animate-spin" /> :
                                                (service.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />)
                                            }
                                        </button>
                                        <Link
                                            href={`/admin/services/${service.id}`}
                                            className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded transition-colors"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(service.id, service.title)}
                                            disabled={!!isDeleting}
                                            className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                                            title="Delete"
                                        >
                                            {isDeleting === service.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredServices.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                    No services found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
