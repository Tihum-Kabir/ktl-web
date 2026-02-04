import ResourceEditorForm from '@/components/admin/ResourceEditorForm';
import { getResourceBySlug, getResources } from '@/app/actions/resources';
import { createClient } from '@/lib/supabase/server';

export default async function EditResourcePage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const supabase = await createClient();
    const { data: resource } = await supabase
        .from('resources')
        .select('*')
        .eq('id', params.id)
        .single();

    if (!resource) {
        return <div>Resource not found</div>;
    }

    return <ResourceEditorForm initialResource={resource} />;
}
