import { getService } from '@/app/actions/services';
import { notFound, redirect } from 'next/navigation';
import { getUser } from '@/app/actions/auth';
import { ServiceEditorForm } from '@/components/admin/ServiceEditorForm';

export default async function ServiceEditorPage({ params }: { params: Promise<{ id: string }> }) {
    const user = await getUser();

    // Check if user is super admin
    if (!user || user.role !== 'SUPER_ADMIN') {
        redirect('/admin');
    }

    // Await params (Next.js 15+ requirement)
    const { id } = await params;

    // Handle "new" service creation
    if (id === 'new') {
        return (
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Create New Service</h1>
                    <p className="text-gray-400">Add a new service to your catalog</p>
                </div>
                <ServiceEditorForm service={null} />
            </div>
        );
    }

    // Fetch existing service
    const service = await getService(id);

    if (!service) {
        notFound();
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Edit Service</h1>
                <p className="text-gray-400">Update service details and pricing</p>
            </div>
            <ServiceEditorForm service={service} />
        </div>
    );
}
