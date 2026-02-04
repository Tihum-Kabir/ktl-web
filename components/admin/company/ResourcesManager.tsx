'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Edit, Eye, Link as LinkIcon, Plus, Search, Trash2, Loader2, FileText } from 'lucide-react';
import { deleteResource } from '@/app/actions/resources';
import type { Resource } from '@/app/actions/resources';
import { useRouter } from 'next/navigation';

export function ResourcesManager({ initialResources }: { initialResources: Resource[] }) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const filteredResources = initialResources.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
        setIsDeleting(id);
        const res = await deleteResource(id);
        setIsDeleting(null);
        if (res.success) router.refresh();
        else alert('Error deleting resource');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search resources..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                    />
                </div>
                <Link
                    href="/admin/resources/new"
                    className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Resource</span>
                </Link>
            </div>

            <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Resource</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {filteredResources.map((resource) => (
                            <tr key={resource.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                            <FileText className="w-4 h-4 text-blue-400" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-white">{resource.title}</div>
                                            <div className="text-xs text-gray-500 truncate max-w-[200px]">
                                                {resource.external_link ? resource.external_link : `/${resource.slug}`}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-gray-300">
                                        {resource.category || 'General'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${resource.is_published
                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                        }`}>
                                        {resource.is_published ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {/* High Visibility Actions Container */}
                                    <div className="flex items-center justify-end gap-2 bg-slate-800/50 p-1.5 rounded-lg border border-white/10 w-fit ml-auto">
                                        {resource.external_link ? (
                                            <a
                                                href={resource.external_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 p-1.5 text-gray-200 hover:text-white hover:bg-white/20 rounded transition-colors text-xs font-medium"
                                                title="Visit Link"
                                            >
                                                <LinkIcon className="w-4 h-4" />
                                                <span>Visit</span>
                                            </a>
                                        ) : (
                                            <Link
                                                href={`/resources/${resource.slug}`}
                                                className="flex items-center gap-1 p-1.5 text-gray-200 hover:text-white hover:bg-white/20 rounded transition-colors text-xs font-medium"
                                                title="View Page"
                                            >
                                                <Eye className="w-4 h-4" />
                                                <span>View</span>
                                            </Link>
                                        )}

                                        <Link
                                            href={`/admin/resources/${resource.id}`}
                                            className="flex items-center gap-1 p-1.5 text-blue-300 hover:text-blue-100 hover:bg-blue-500/20 rounded transition-colors text-xs font-medium"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4" />
                                            <span>Edit</span>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(resource.id, resource.title)}
                                            disabled={!!isDeleting}
                                            className="flex items-center gap-1 p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors text-xs font-medium disabled:opacity-50"
                                            title="Delete"
                                        >
                                            {isDeleting === resource.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredResources.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                    No resources found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
