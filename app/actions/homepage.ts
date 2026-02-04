'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getHowItWorksSteps() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('how_it_works_steps')
        .select('*')
        .order('sort_order', { ascending: true });

    if (error) {
        console.error('Error fetching how it works steps:', error);
        return [];
    }

    return data;
}

export async function updateHowItWorksStep(id: string, formData: FormData) {
    const supabase = await createClient();

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { data: roleData } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

    if (!roleData || !['SUPER_ADMIN', 'COMPANY_ADMIN'].includes(roleData.role)) {
        throw new Error('Unauthorized');
    }

    const updates = {
        title: formData.get('title'),
        description: formData.get('description'),
        media_url: formData.get('media_url'),
        media_type: formData.get('media_type'),
        media_fit: formData.get('media_fit'),
        updated_at: new Date().toISOString()
    };

    const { error } = await supabase
        .from('how_it_works_steps')
        .update(updates)
        .eq('id', id);

    if (error) throw error;

    revalidatePath('/');
    return { success: true };
}

export async function getProductFeatures() {
    const supabase = await createClient();

    // Fetch features ordered by display_order
    const { data, error } = await supabase
        .from('product_features')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching product features:', error);
        return [];
    }

    return data;
}

export async function updateProductFeature(id: string, formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const media_url = formData.get('media_url') as string;
    const media_type = formData.get('media_type') as string;
    const features_list_json = formData.get('features_list') as string;
    const image_position = formData.get('image_position') as string;

    const { error } = await supabase
        .from('product_features')
        .update({
            title,
            description,
            media_url,
            media_type,
            features_list: JSON.parse(features_list_json),
            image_position,
            updated_at: new Date().toISOString()
        })
        .eq('id', id);

    if (error) {
        throw new Error(`Failed to update feature: ${error.message}`);
    }

    revalidatePath('/');
    revalidatePath('/admin/settings/homepage');
    return { success: true };
}

export async function createProductFeature(formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const media_url = formData.get('media_url') as string;
    const media_type = formData.get('media_type') as string;
    const features_list_json = formData.get('features_list') as string;

    // Get max order
    const { data: maxOrderData } = await supabase
        .from('product_features')
        .select('display_order')
        .order('display_order', { ascending: false })
        .limit(1)
        .single();

    const nextOrder = (maxOrderData?.display_order || 0) + 1;

    const { error } = await supabase
        .from('product_features')
        .insert({
            title,
            description,
            media_url,
            media_type,
            features_list: JSON.parse(features_list_json),
            display_order: nextOrder
        });

    if (error) {
        throw new Error(`Failed to create feature: ${error.message}`);
    }

    revalidatePath('/');
    revalidatePath('/admin/settings/homepage');
    return { success: true };
}

export async function deleteProductFeature(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('product_features')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error(`Failed to delete feature: ${error.message}`);
    }

    revalidatePath('/');
    revalidatePath('/admin/settings/homepage');
    return { success: true };
}
