import { getService } from '@/app/actions/services';
import { ServiceEditorForm } from '@/components/admin/ServiceEditorForm';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditServicePage({ params }: PageProps) {
    const { id } = await params;
    const service = await getService(id);

    if (!service) {
        notFound();
    }

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Edit Service</h1>
            <ServiceEditorForm service={service} />
        </div>
    );
}
