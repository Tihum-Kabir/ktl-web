'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// --- FAQs ---

export async function getFAQs() {
    const supabase = await createClient();
    const { data } = await supabase.from('cms_faqs').select('*').order('sort_order', { ascending: true });
    return data || [];
}

export async function createFAQ(formData: FormData) {
    const supabase = await createClient();
    // Auth Check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const data = {
        question: formData.get('question'),
        answer: formData.get('answer'),
        category: formData.get('category'),
        sort_order: parseInt(formData.get('sort_order') as string) || 0,
        attachment_url: formData.get('attachment_url'),
        attachment_name: formData.get('attachment_name')
    };

    const { error } = await supabase.from('cms_faqs').insert(data);
    if (error) throw error;
    revalidatePath('/company/faqs');
    return { success: true };
}

export async function updateFAQ(id: string, formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const data = {
        question: formData.get('question'),
        answer: formData.get('answer'),
        category: formData.get('category'),
        sort_order: parseInt(formData.get('sort_order') as string) || 0,
        attachment_url: formData.get('attachment_url'),
        attachment_name: formData.get('attachment_name')
    };

    const { error } = await supabase.from('cms_faqs').update(data).eq('id', id);
    if (error) throw error;
    revalidatePath('/company/faqs');
    return { success: true };
}

export async function deleteFAQ(id: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { error } = await supabase.from('cms_faqs').delete().eq('id', id);
    if (error) throw error;
    revalidatePath('/company/faqs');
    return { success: true };
}

// --- Team ---

export async function getTeamMembers() {
    const supabase = await createClient();
    const { data } = await supabase.from('cms_team_members').select('*').order('sort_order', { ascending: true });
    return data || [];
}

export async function createTeamMember(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const data = {
        name: formData.get('name'),
        role: formData.get('role'),
        bio: formData.get('bio'),
        image_url: formData.get('image_url'),
        social_linkedin: formData.get('social_linkedin'),
        social_twitter: formData.get('social_twitter'),
        sort_order: parseInt(formData.get('sort_order') as string) || 0
    };

    const { error } = await supabase.from('cms_team_members').insert(data);
    if (error) throw error;
    revalidatePath('/company/team');
    return { success: true };
}

export async function updateTeamMember(id: string, formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const data = {
        name: formData.get('name'),
        role: formData.get('role'),
        bio: formData.get('bio'),
        image_url: formData.get('image_url'),
        social_linkedin: formData.get('social_linkedin'),
        social_twitter: formData.get('social_twitter'),
        sort_order: parseInt(formData.get('sort_order') as string) || 0
    };

    const { error } = await supabase.from('cms_team_members').update(data).eq('id', id);
    if (error) throw error;
    revalidatePath('/company/team');
    return { success: true };
}

export async function deleteTeamMember(id: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { error } = await supabase.from('cms_team_members').delete().eq('id', id);
    if (error) throw error;
    revalidatePath('/company/team');
    return { success: true };
}

// --- About Content ---

export async function getAboutContent() {
    const supabase = await createClient();
    const { data } = await supabase.from('cms_about_content').select('*');
    return data || [];
}

export async function updateAboutContent(section_key: string, formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const data = {
        title: formData.get('title'),
        content: formData.get('content'),
        image_url: formData.get('image_url'),
        // meta_data: JSON.parse(formData.get('meta_data') as string || '{}') // Optional if needed
    };

    const { error } = await supabase.from('cms_about_content').update(data).eq('section_key', section_key);

    // Fallback specific for new sections if they don't exist? (Upsert is better)
    if (error || (await supabase.from('cms_about_content').select('*').eq('section_key', section_key)).data?.length === 0) {
        await supabase.from('cms_about_content').upsert({ section_key, ...data });
    }

    revalidatePath('/company/about');
    return { success: true };
}
