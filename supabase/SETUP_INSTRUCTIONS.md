# Supabase Database Setup Instructions

## Step 1: Access Supabase SQL Editor

1. Go to your Supabase project: https://app.supabase.com/project/pxzcmmgxtktipqoxmftf
2. Click on **SQL Editor** in the left sidebar
3. Click **New query**

## Step 2: Run Schema Migration

1. Open the file: `supabase/migrations/001_initial_schema.sql`
2. Copy the entire contents
3. Paste into the Supabase SQL Editor
4. Click **Run** (or press Ctrl+Enter)

This will create:
- ✅ All enums (user_role, subscription_status, etc.)
- ✅ All tables (users, companies, services, subscriptions, etc.)
- ✅ All indexes for performance
- ✅ Row Level Security (RLS) policies
- ✅ Triggers for auto-updating timestamps

## Step 3: Run Sample Data

1. Open the file: `supabase/migrations/002_sample_data.sql`
2. Copy the entire contents
3. Paste into a new query in Supabase SQL Editor
4. Click **Run**

This will insert:
- ✅ 5 services (Real-Time Detection, Situational Awareness, Education/Corporate/Government packages)
- ✅ Site settings (logo, theme, navigation menu, CTAs)
- ✅ 3 sample knowledge base articles
- ✅ 4 sample pages (home, solutions pages)

## Step 4: Verify Setup

1. In Supabase, go to **Table Editor**
2. You should see all tables listed:
   - companies
   - users
   - services
   - subscriptions
   - invoices
   - support_tickets
   - knowledge_base_articles
   - pages
   - site_settings
   - and more...

3. Click on **services** table - you should see 5 rows
4. Click on **site_settings** table - you should see 5 rows

## Step 5: Enable Storage (for file uploads)

1. Go to **Storage** in Supabase sidebar
2. Create a new bucket called `media-assets`
3. Set it to **Public** (for marketing images) or **Private** (for user uploads)
4. Add storage policies as needed

## Step 6: Test Connection

Your Next.js app should now be able to connect to Supabase!

The `.env.local` file already has your credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://pxzcmmgxtktipqoxmftf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

## Troubleshooting

### If you get an error about existing types:
Some enums might already exist. You can either:
1. Drop them first: `DROP TYPE IF EXISTS user_role CASCADE;`
2. Or skip the enum creation and just run the table creation

### If you get an error about auth.users:
The `auth.users` table is created automatically by Supabase. The `users` table in our schema extends it.

### If RLS policies fail:
Make sure you're running the queries as the project owner (not as a specific user).

## Next Steps

After database setup:
1. ✅ Test Supabase connection in your Next.js app
2. ✅ Create your first user via Supabase Auth
3. ✅ Build authentication flows
4. ✅ Start building portal pages

## Useful Supabase Commands

```sql
-- View all tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- View all services
SELECT * FROM services;

-- View all site settings
SELECT * FROM site_settings;

-- Count rows in each table
SELECT 
  schemaname,
  tablename,
  (SELECT COUNT(*) FROM public.companies) as companies,
  (SELECT COUNT(*) FROM public.services) as services,
  (SELECT COUNT(*) FROM public.site_settings) as site_settings;
```
