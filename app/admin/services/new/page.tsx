import { ServiceEditorForm } from '@/components/admin/ServiceEditorForm';

export default function NewServicePage() {
    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Create New Service</h1>
            <ServiceEditorForm service={null} />
        </div>
    );
}
