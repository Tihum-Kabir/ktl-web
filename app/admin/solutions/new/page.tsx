import SolutionEditorForm from '@/components/admin/SolutionEditorForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewSolutionPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/solutions" className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Create New Solution</h1>
                    <p className="text-gray-400">Add a detailed use-case page.</p>
                </div>
            </div>

            <SolutionEditorForm isNew />
        </div>
    );
}
