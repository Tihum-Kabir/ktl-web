import { getSolutionById } from '@/app/actions/solutions';
import SolutionEditorForm from '@/components/admin/SolutionEditorForm';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditSolutionPage({ params }: PageProps) {
    const { id } = await params;
    const solution = await getSolutionById(id);

    if (!solution) {
        notFound();
    }

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Edit Solution</h1>
            <SolutionEditorForm initialData={solution} />
        </div>
    );
}
