'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export type SolutionContentBlock = {
    id: string;
    title: string;
    content: string;
    image: string;
    align: 'left' | 'right';
    list_items: string[];
};

export type SolutionStat = {
    label: string;
    value: string;
    icon_name: string;
};

export type SolutionFAQ = {
    question: string;
    answer: string;
};

export type Solution = {
    id: string;
    slug: string;
    title: string;
    subtitle: string | null;
    category: string | null; // 'Industry' or 'Use Case'
    description: string | null;
    hero_image: string | null;
    hero_video_url: string | null;
    stats: SolutionStat[];
    content_blocks: SolutionContentBlock[];
    map_embed_url: string | null;
    faqs: SolutionFAQ[];
    is_published: boolean;
    created_at: string;
    updated_at: string;
};

export async function getSolutions() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('solutions')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) console.error('Error fetching solutions:', error);
    return (data as Solution[]) || [];
}

export async function getPublishedSolutions() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('solutions')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

    if (error) console.error('Error fetching published solutions:', error);
    return (data as Solution[]) || [];
}

export async function getSolutionBySlug(slug: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('solutions')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

    if (error) console.error('Error fetching solution by slug:', JSON.stringify(error, null, 2));
    return data as Solution | null;
}

export async function createSolution(data: Partial<Solution>) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'Unauthorized' };

    const { error } = await supabase
        .from('solutions')
        .insert({
            ...data,
            created_by: user.id,
            updated_by: user.id
        });

    if (error) return { error: error.message };

    revalidatePath('/admin/solutions');
    revalidatePath('/solutions');
    return { success: true };
}

export async function updateSolution(id: string, data: Partial<Solution>) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'Unauthorized' };

    console.log('[updateSolution] Updating id:', id, 'with data:', data);

    const { error } = await supabase
        .from('solutions')
        .update({
            ...data,
            updated_by: user.id,
            updated_at: new Date().toISOString()
        })
        .eq('id', id);

    if (error) {
        console.error('[updateSolution] Error:', error);
        return { error: error.message };
    }

    console.log('[updateSolution] Success');

    revalidatePath('/admin/solutions');
    revalidatePath('/solutions');
    return { success: true };
}

export async function deleteSolution(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from('solutions').delete().eq('id', id);

    if (error) return { error: error.message };

    revalidatePath('/admin/solutions');
    return { success: true };
}
