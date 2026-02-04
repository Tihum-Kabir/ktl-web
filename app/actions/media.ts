'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface MediaFile {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
    created_at: string;
}

const BUCKET_NAME = 'site-assets'; // Using the main assets bucket

export async function getMediaFiles(path: string = ''): Promise<MediaFile[]> {
    const supabase = await createClient();

    const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .list(path, {
            limit: 100,
            offset: 0,
            sortBy: { column: 'created_at', order: 'desc' },
        });

    if (error) {
        console.error('Error fetching media:', error);
        return [];
    }

    const { data: { publicUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl((path ? path + '/' : ''));

    // Construct full URLs and determine types
    return data.map((file) => {
        // file.name is just the filename. We need to construct the full public URL.
        const fullPath = path ? `${path}/${file.name}` : file.name;
        const { data: { publicUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fullPath);

        let type = 'unknown';
        if (file.metadata?.mimetype) type = file.metadata.mimetype;
        else if (file.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) type = 'image';
        else if (file.name.match(/\.pdf$/i)) type = 'pdf';
        else if (file.name.match(/\.(mp4|webm|mov)$/i)) type = 'video';
        else if (file.name.match(/\.(doc|docx)$/i)) type = 'document';

        return {
            id: file.id,
            name: file.name,
            url: publicUrl,
            type: type,
            size: file.metadata?.size || 0,
            created_at: file.created_at,
        };
    });
}

export async function deleteFile(fileName: string) {
    const supabase = await createClient();

    // Auth check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.role !== 'SUPER_ADMIN') {
        throw new Error('Unauthorized');
    }

    const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([fileName]);

    if (error) throw error;
    revalidatePath('/admin/media');
    return { success: true };
}

// NOTE: For large file uploads, strict Server Actions might hit Vercel body limits (4.5MB).
// However, for typical CMS usage it works. For larger files, we might need Signed Upload URLs.
// We'll implement a basic Server Action upload for now.
export async function uploadFileServerAction(formData: FormData) {
    const supabase = await createClient();

    // Auth check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.role !== 'SUPER_ADMIN') {
        throw new Error('Unauthorized');
    }

    const file = formData.get('file') as File;
    if (!file) throw new Error('No file provided');

    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;

    const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, file, {
            upsert: false,
        });

    if (error) throw error;
    revalidatePath('/admin/media');
    return { success: true };
}
