import SolutionEditorForm from '@/components/admin/SolutionEditorForm';

export default function NewSolutionPage() {
    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Create New Solution</h1>
            <SolutionEditorForm isNew={true} />
        </div>
    );
}
