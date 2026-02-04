import Link from 'next/link';
import { getResources } from '@/app/actions/resources';
import { Plus, Search, Edit, Trash2, Eye, FileText, Image as ImageIcon, Video, Link as LinkIcon, Download } from 'lucide-react';
import Image from 'next/image';
import { deleteResource } from '@/app/actions/resources';
import DeleteButton from '@/components/admin/DeleteButton';

const iconMap = {
    'Documentation': FileText,
    'Library': Download,
    'Customer Story': ImageIcon,
    'Partner': LinkIcon,
    'Grant': FileText,
    'AI Agent': LinkIcon
};

export default async function ResourcesAdminPage() {
    const resources = await getResources();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Resources</h1>
                    <p className="text-gray-400">Manage documents, guides, and external links.</p>
                </div>
                <Link
                    href="/admin/resources/new"
                    className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors font-medium"
                >
                    <Plus className="w-4 h-4" />
                    New Resource
                </Link>
            </div>

            <div className="bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10">
                                <th className="px-6 py-4 text-sm font-semibold text-gray-300">Resource</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-300">Category</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-300">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-300 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {resources.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                        No resources found. Create your first one!
                                    </td>
                                </tr>
                            ) : (
                                resources.map((resource) => {
                                    const Icon = iconMap[resource.category as keyof typeof iconMap] || FileText;
                                    return (
                                        <tr key={resource.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-lg bg-slate-800 border border-white/10 overflow-hidden relative flex items-center justify-center">
                                                        {resource.cover_image ? (
                                                            <Image
                                                                src={resource.cover_image}
                                                                alt={resource.title}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        ) : (
                                                            <Icon className="w-5 h-5 text-gray-500" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="text-white font-medium">{resource.title}</div>
                                                        <div className="text-xs text-gray-500 mb-0.5 max-w-md truncate">{resource.summary}</div>
                                                        <code className="text-[10px] text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded border border-violet-500/20">/{resource.slug}</code>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium border bg-white/5 text-gray-300 border-white/10">
                                                    {resource.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {resource.is_published ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                                        Published
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                                                        Draft
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {resource.external_link ? (
                                                        <a
                                                            href={resource.external_link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                                            title="Visit Link"
                                                        >
                                                            <LinkIcon className="w-4 h-4" />
                                                        </a>
                                                    ) : (
                                                        <Link
                                                            href={`/resources/${resource.slug}`}
                                                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                                            title="View Page"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Link>
                                                    )}

                                                    <Link
                                                        href={`/admin/resources/${resource.id}`}
                                                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <DeleteButton id={resource.id} onDelete={deleteResource} />
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
