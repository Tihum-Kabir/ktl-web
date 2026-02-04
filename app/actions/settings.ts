'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface SiteSetting {
    key: string;
    value: any;
}

export async function getSetting(key: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', key)
        .single();

    if (error) {
        // If not found, return null
        if (error.code === 'PGRST116') return null;
        console.error(`Error fetching setting ${key}:`, error);
        return null;
    }

    return data.value;
}

export async function updateSetting(key: string, value: any) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('site_settings')
        .upsert(
            { key, value, updated_at: new Date().toISOString() },
            { onConflict: 'key' }
        );

    if (error) {
        console.error(`Error updating setting ${key}:`, error);
        throw new Error('Failed to update setting');
    }

    revalidatePath('/', 'layout');
    return { success: true };
}
