import { getSolutions } from '@/app/actions/solutions';
import SolutionEditorForm from '@/components/admin/SolutionEditorForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function EditSolutionPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Optimize: fetch single solution. 
    // Since we don't have getSolutionById exported yet, we'll fetch all.
    // TODO: Add getSolutionById in next refactor.
    const solutions = await getSolutions();
    const solution = solutions.find(s => s.id === id);

    if (!solution) {
        notFound();
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/solutions" className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Edit Solution</h1>
                    <p className="text-gray-400">Update content for "{solution.title}"</p>
                </div>
            </div>

            <SolutionEditorForm initialData={solution} />
        </div>
    );
}
