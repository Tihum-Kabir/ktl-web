'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type Service = {
    id: string;
    slug: string;
    title: string;
    subtitle: string | null;
    description: string | null;
    features: any[];
    pricing: any;
    media: any;
    icon: string | null;
    category: string | null;
    order_index: number | null;
    is_published: boolean;
    image_url: string | null;
    video_url: string | null;
    meta_title: string | null;
    meta_description: string | null;
    created_at: string;
    updated_at: string;
};

export async function getAllServices(filters?: { published?: boolean; search?: string }) {
    const supabase = await createClient();

    let query = supabase
        .from('services')
        .select('*')
        .order('order_index', { ascending: true });

    if (filters?.published !== undefined) {
        query = query.eq('is_published', filters.published);
    }

    if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching services:', error);
        return [];
    }

    return data as Service[];
}

export async function getPublishedServices() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_published', true)
        .order('updated_at', { ascending: false });

    if (error) {
        console.error('Error fetching published services:', error);
        return [];
    }

    return data as Service[];
}


export async function getService(id: string) {
    try {
        const supabase = await createClient();

        console.log('=== GET SERVICE DEBUG ===');
        console.log('Service ID:', id);
        console.log('ID type:', typeof id);
        console.log('ID length:', id.length);

        // Try to fetch the service
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .eq('id', id)
            .single();

        console.log('Query completed');
        console.log('Data:', data);
        console.log('Error:', error);
        console.log('Error type:', typeof error);
        console.log('Error keys:', error ? Object.keys(error) : 'no error');

        if (error) {
            console.error('Supabase error occurred');
            console.error('Error object:', JSON.stringify(error, null, 2));

            // Try to fetch all services to see if any exist
            const { data: allServices } = await supabase
                .from('services')
                .select('id, title')
                .limit(5);

            console.log('Sample services in DB:', allServices);
            return null;
        }

        if (!data) {
            console.error('No data returned for ID:', id);
            return null;
        }

        console.log('Service found:', data.title);
        console.log('=== END DEBUG ===');
        return data as Service;
    } catch (err) {
        console.error('Caught exception in getService:', err);
        return null;
    }
}

export async function getServiceBySlug(slug: string) {
    try {
        const supabase = await createClient();

        console.log('=== GET SERVICE BY SLUG DEBUG ===');
        console.log('Slug:', slug);

        const { data, error } = await supabase
            .from('services')
            .select('*')
            .eq('slug', slug)
            .single();

        console.log('Query completed');
        console.log('Data:', data);
        console.log('Error:', error);

        if (error) {
            console.error('Supabase error occurred');
            console.error('Error object:', JSON.stringify(error, null, 2));
            return null;
        }

        if (!data) {
            console.error('No service found with slug:', slug);
            return null;
        }

        console.log('Service found:', data.title);
        console.log('=== END DEBUG ===');
        return data as Service;
    } catch (err) {
        console.error('Caught exception in getServiceBySlug:', err);
        return null;
    }
}

export async function createService(formData: FormData) {
    const supabase = await createClient();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'Unauthorized' };
    }

    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;
    const slug = formData.get('slug') as string || generateSlug(title);
    const description = formData.get('description') as string;
    const icon = formData.get('icon') as string;
    const category = formData.get('category') as string;
    const is_published = formData.get('is_published') === 'true';
    const image_url = formData.get('image_url') as string;
    const video_url = formData.get('video_url') as string;
    const meta_title = formData.get('meta_title') as string;
    const meta_description = formData.get('meta_description') as string;
    const featuresStr = formData.get('features') as string;
    const pricingStr = formData.get('pricing') as string;

    const insertData: any = {
        title,
        subtitle,
        slug,
        description,
        icon,
        category,
        is_published,
        image_url,
        video_url,
        meta_title,
        meta_description,
        created_by: user.id,
        updated_by: user.id,
    };

    // Parse features if provided
    if (featuresStr) {
        try {
            insertData.features = JSON.parse(featuresStr);
        } catch (e) {
            console.error('Invalid features JSON');
        }
    }

    // Parse pricing if provided
    if (pricingStr) {
        try {
            insertData.pricing = JSON.parse(pricingStr);
        } catch (e) {
            console.error('Invalid pricing JSON');
        }
    }

    const { data, error } = await supabase
        .from('services')
        .insert(insertData)
        .select()
        .single();

    if (error) {
        console.error('Error creating service:', error);
        return { error: error.message };
    }

    // Revalidate all pages that display services
    revalidatePath('/'); // Home page
    revalidatePath('/admin/services');
    revalidatePath('/services');

    return { data };
}

export async function updateService(id: string, formData: FormData) {
    const supabase = await createClient();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'Unauthorized' };
    }

    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const icon = formData.get('icon') as string;
    const category = formData.get('category') as string;
    const is_published = formData.get('is_published') === 'true';
    const image_url = formData.get('image_url') as string;
    const video_url = formData.get('video_url') as string;
    const meta_title = formData.get('meta_title') as string;
    const meta_description = formData.get('meta_description') as string;
    const features = formData.get('features') as string;
    const pricing = formData.get('pricing') as string;

    const updateData: any = {
        title,
        subtitle,
        slug,
        description,
        icon,
        category,
        is_published,
        image_url,
        video_url,
        meta_title,
        meta_description,
        updated_by: user.id,
    };

    if (features) {
        try {
            updateData.features = JSON.parse(features);
        } catch (e) {
            console.error('Invalid features JSON');
        }
    }

    if (pricing) {
        try {
            updateData.pricing = JSON.parse(pricing);
        } catch (e) {
            console.error('Invalid pricing JSON');
        }
    }

    const { data, error } = await supabase
        .from('services')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating service:', error);
        return { error: error.message };
    }

    // Revalidate all pages that display services
    revalidatePath('/'); // Home page
    revalidatePath('/admin/services');
    revalidatePath(`/admin/services/${id}`);
    revalidatePath('/services');
    revalidatePath(`/services/${slug}`);

    return { data };
}

export async function deleteService(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting service:', error);
        return { error: error.message };
    }

    revalidatePath('/admin/services');
    revalidatePath('/services');

    return { success: true };
}

export async function publishService(id: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'Unauthorized' };
    }

    const { data, error } = await supabase
        .from('services')
        .update({
            is_published: true,
            updated_by: user.id
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error publishing service:', error);
        return { error: error.message };
    }

    revalidatePath('/admin/services');
    revalidatePath(`/admin/services/${id}`);
    revalidatePath('/services');

    return { data };
}

export async function unpublishService(id: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'Unauthorized' };
    }

    const { data, error } = await supabase
        .from('services')
        .update({
            is_published: false,
            updated_by: user.id
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error unpublishing service:', error);
        return { error: error.message };
    }

    revalidatePath('/admin/services');
    revalidatePath(`/admin/services/${id}`);
    revalidatePath('/services');

    return { data };
}

// Helper function to generate URL-friendly slugs
function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
