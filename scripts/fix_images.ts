import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixImages() {
    const updates = [
        { slug: 'perplexity-ai', url: 'https://logo.clearbit.com/perplexity.ai' },
        { slug: 'chatgpt', url: 'https://logo.clearbit.com/openai.com' },
        { slug: 'claude', url: 'https://logo.clearbit.com/anthropic.com' },
        { slug: 'platform-manual', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000' },
        { slug: 'api-reference', url: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=1000' },
        { slug: 'campus-safety-ds', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000' },
        { slug: 'metropolis-high', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000' },
        { slug: 'securtech', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000' },
        { slug: 'fed-grant-2026', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000' }
    ];

    console.log('Fixing resource images...');

    for (const update of updates) {
        const { error } = await supabase
            .from('resources')
            .update({ cover_image: update.url })
            .eq('slug', update.slug);

        if (error) {
            console.error(`Failed to update ${update.slug}:`, error.message);
        } else {
            console.log(`Updated ${update.slug} to ${update.url}`);
        }
    }
}

fixImages();
