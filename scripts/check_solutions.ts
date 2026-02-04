
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log(`URL: ${supabaseUrl ? 'Found' : 'Missing'}`);
console.log(`Service Key: ${serviceKey ? 'Found' : 'Missing'}`);
console.log(`Anon Key: ${supabaseKey ? 'Found' : 'Missing'}`);

// Fallback to anon key if service key missing (might hit RLS but if public it works)
const keyToUse = serviceKey || supabaseKey;

if (!supabaseUrl || !keyToUse) {
    console.error('CRITICAL: Missing URL or Key');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, keyToUse);

async function checkSolutions() {
    console.log('--- Checking Solutions in DB ---');
    const { data, error } = await supabase
        .from('solutions')
        .select('id, title, slug, is_published, category');

    if (error) {
        console.error('Error fetching:', error);
        return;
    }

    if (!data || data.length === 0) {
        console.log('No solutions found (Table empty).');
    } else {
        console.table(data);
    }
    console.log('--------------------------------');
}

checkSolutions();
