import Link from 'next/link';
import { getSolutions } from '@/app/actions/solutions';
import { Plus, Search, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { deleteSolution } from '@/app/actions/solutions';
import DeleteButton from '@/components/admin/DeleteButton';

export default async function SolutionsAdminPage() {
    const solutions = await getSolutions();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Solutions</h1>
                    <p className="text-gray-400">Manage detailed use-case pages.</p>
                </div>
                <Link
                    href="/admin/solutions/new"
                    className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors font-medium"
                >
                    <Plus className="w-4 h-4" />
                    New Solution
                </Link>
            </div>

            <div className="bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10">
                                <th className="px-6 py-4 text-sm font-semibold text-gray-300">Solution</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-300">Category</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-300">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-300 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {solutions.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                        No solutions found. Create your first one!
                                    </td>
                                </tr>
                            ) : (
                                solutions.map((solution) => (
                                    <tr key={solution.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-white/10 overflow-hidden relative">
                                                    {solution.hero_image ? (
                                                        <Image
                                                            src={solution.hero_image}
                                                            alt={solution.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-center h-full text-gray-600">
                                                            <Eye className="w-4 h-4" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-white font-medium">{solution.title}</div>
                                                    <div className="text-xs text-gray-500 mb-0.5">{solution.subtitle}</div>
                                                    <code className="text-[10px] text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded border border-violet-500/20">/{solution.slug}</code>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${solution.category === 'Industry'
                                                ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                : 'bg-violet-500/10 text-violet-400 border-violet-500/20'
                                                }`}>
                                                {solution.category || 'Use Case'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {solution.is_published ? (
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
                                                <Link
                                                    href={`/solutions/${solution.slug}`}
                                                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                                    title="View Page"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/solutions/${solution.id}`}
                                                    className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <DeleteButton id={solution.id} onDelete={deleteSolution} />
                                            </div>
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
