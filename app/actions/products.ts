'use server';

import { createClient } from '@/lib/supabase/server';

export interface Product {
    id: string;
    title: string;
    subtitle: string | null;
    slug: string;
    description: string;
    icon: string;
    image_url: string | null;
    meta_title: string | null;
    meta_description: string | null;
    og_image_url: string | null;
    features: any[];
    related_product_ids?: string[];
    created_at: string;
    updated_at: string;
}

export async function getProductBySlug(slug: string) {
    const supabase = await createClient();

    // Check if products table exists, otherwise might need to fallback or check solutions
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return data as Product;
}

export async function getRelatedProducts(ids: string[]) {
    if (!ids || ids.length === 0) return [];

    const supabase = await createClient();
    const { data, error } = await supabase
        .from('products')
        .select('id, title, slug, description, icon, image_url')
        .in('id', ids)
        .limit(3);

    if (error) {
        console.error('Error fetching related products:', error);
        return [];
    }

    return data as Product[];
}

export async function getPublishedProducts() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }

    return data as Product[];
}
