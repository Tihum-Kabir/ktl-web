'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function grantSuperAdmin(email: string) {
    const supabase = await createClient();

    // 1. Verify current user is Super Admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not authenticated' };

    const { data: currentUserData } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

    if (currentUserData?.role !== 'SUPER_ADMIN') {
        return { error: 'Unauthorized: You must be a Super Admin to perform this action.' };
    }

    // 2. Find the target user by email
    // We search the public.users table (which should be synced with auth.users)
    const { data: targetUser, error: findError } = await supabase
        .from('users')
        .select('id, email')
        .eq('email', email)
        .single();

    if (findError || !targetUser) {
        return { error: `User with email ${email} not found. Ensure they have signed up first.` };
    }

    // 3. Update the user's role
    const { error: updateError } = await supabase
        .from('users')
        .update({ role: 'SUPER_ADMIN' })
        .eq('id', targetUser.id);

    if (updateError) {
        return { error: `Failed to update role: ${updateError.message}` };
    }

    revalidatePath('/admin');
    return { success: `Successfully granted SUPER_ADMIN privileges to ${email}` };
}
