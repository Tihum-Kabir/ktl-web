import ResourceEditorForm from '@/components/admin/ResourceEditorForm';

export default function NewResourcePage() {
    return (
        <div className="p-8">
            <ResourceEditorForm initialResource={null} />
        </div>
    );
}
