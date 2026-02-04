import { getResourceById } from '@/app/actions/resources';
import ResourceEditorForm from '@/components/admin/ResourceEditorForm';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditResourcePage({ params }: PageProps) {
    const { id } = await params;
    const resource = await getResourceById(id);

    if (!resource) {
        notFound();
    }

    return (
        <div className="p-8">
            <ResourceEditorForm initialResource={resource} />
        </div>
    );
}
