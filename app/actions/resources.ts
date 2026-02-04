'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export type ResourceContentBlock = {
    id: string;
    type: 'text' | 'image' | 'video' | 'file' | 'code';
    content: string; // Text content or URL
    caption?: string; // For images/videos
    language?: string; // For code blocks
    file_name?: string; // For file downloads
    file_size?: string; // For file downloads
};

export type Resource = {
    id: string;
    title: string;
    slug: string;
    category: string;
    summary: string | null;
    content: ResourceContentBlock[];
    cover_image: string | null;
    external_link: string | null;
    tags: string[];
    is_published: boolean;
    published_at: string | null;
    created_at: string;
    updated_at: string;
};

export async function getResources() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) console.error('Error fetching resources:', error);
    return (data as Resource[]) || [];
}

export async function getPublishedResources() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

    if (error) console.error('Error fetching published resources:', error);
    return (data as Resource[]) || [];
}

export async function getResourceBySlug(slug: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

    if (error) console.error('Error fetching resource details:', error);
    if (error) console.error('Error fetching resource details:', error);
    return data as Resource | null;
}

export async function getResourceById(id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('id', id)
        .single();

    if (error) console.error('Error fetching resource by id:', error);
    return data as Resource | null;
}

export async function createResource(data: Partial<Resource>) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'Unauthorized' };

    const { error } = await supabase
        .from('resources')
        .insert({
            ...data,
            created_by: user.id,
            updated_by: user.id
        });

    if (error) return { error: error.message };

    revalidatePath('/admin/resources');
    revalidatePath('/resources');
    return { success: true };
}

export async function updateResource(id: string, data: Partial<Resource>) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'Unauthorized' };

    const { error } = await supabase
        .from('resources')
        .update({
            ...data,
            updated_by: user.id,
            updated_at: new Date().toISOString()
        })
        .eq('id', id);

    if (error) return { error: error.message };

    revalidatePath('/admin/resources');
    revalidatePath('/resources');
    return { success: true };
}

export async function deleteResource(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from('resources').delete().eq('id', id);

    if (error) return { error: error.message };

    revalidatePath('/admin/resources');
    return { success: true };
}
