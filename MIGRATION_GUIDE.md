# Database Migration Guide

## Step-by-Step: Applying CMS Migrations

### Step 1: Run Migration 005 (CMS Extensions)

1. Open **Supabase Dashboard** → Your Project
2. Go to **SQL Editor** (left sidebar)
3. Click **"New query"**
4. Copy all content from `supabase/migrations/005_cms_extensions.sql`
5. Paste into the SQL Editor
6. Click **"Run"** (or press Ctrl/Cmd + Enter)
7. ✅ You should see "Success. No rows returned"

**What this does**:
- Extends `companies` table with logo_url, status, etc.
- Creates new `services` table with full CMS fields
- Creates `media_assets` table
- Creates `email_campaigns` and `email_recipients` tables
- Creates `partner_logos` table with auto-sync triggers
- Sets up all RLS policies

### Step 2: Create Storage Buckets

1. In Supabase Dashboard, go to **Storage** (left sidebar)
2. Click **"New bucket"**
3. Create each bucket with these settings:

**Bucket 1: company-logos**
- Name: `company-logos`
- Public: ✅ Yes
- File size limit: 2 MB
- Allowed MIME types: `image/png, image/jpeg, image/svg+xml`

**Bucket 2: service-media**
- Name: `service-media`
- Public: ✅ Yes
- File size limit: 50 MB
- Allowed MIME types: `image/*, video/mp4, video/webm, image/gif`

**Bucket 3: site-assets**
- Name: `site-assets`
- Public: ✅ Yes
- File size limit: 10 MB
- Allowed MIME types: `image/*, image/x-icon`

**Bucket 4: media-library**
- Name: `media-library`
- Public: ✅ Yes
- File size limit: 100 MB
- Allowed MIME types: `image/*, video/*, application/pdf`

### Step 3: Run Migration 006 (Storage Policies)

1. Go back to **SQL Editor**
2. Click **"New query"**
3. Copy all content from `supabase/migrations/006_storage_setup.sql`
4. Paste into the SQL Editor
5. Click **"Run"**
6. ✅ You should see "Success. No rows returned"

**What this does**:
- Sets up public read access for all buckets
- Allows authenticated users to upload company logos
- Restricts upload/delete to super admins for other buckets

---

## Verification

After running the migrations, verify everything is set up:

### Check Tables
```sql
-- Run this in SQL Editor to see all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

You should see:
- ✅ companies (with new columns)
- ✅ services (new table)
- ✅ media_assets (new table)
- ✅ email_campaigns (new table)
- ✅ email_recipients (new table)
- ✅ partner_logos (new table)

### Check Storage Buckets
Go to **Storage** → You should see 4 buckets listed

### Test the Auto-Sync Trigger
```sql
-- Insert a test company with logo
INSERT INTO companies (name, email, logo_url, status)
VALUES ('Test Company', 'test@example.com', 'https://example.com/logo.png', 'active');

-- Check if partner logo was auto-created
SELECT * FROM partner_logos;
```

You should see a partner logo entry automatically created! 🎉

---

## Troubleshooting

### Error: "relation already exists"
- Some tables might already exist from previous migrations
- The migration uses `DROP TABLE IF EXISTS` for services and media_assets
- For companies, it uses `ALTER TABLE ADD COLUMN IF NOT EXISTS`
- This is safe to run multiple times

### Error: "permission denied"
- Make sure you're running as the database owner
- In Supabase Dashboard SQL Editor, you have full permissions

### Storage policies not working
- Make sure buckets are created BEFORE running storage policies
- Bucket names must match exactly (case-sensitive)

---

## Next: Test the Admin Dashboard

Once migrations are complete:

1. Make sure you're logged in as a super admin
2. Navigate to `/admin` in your browser
3. You should see the admin dashboard!
4. Check the stats cards - they should show real counts from your database

---

## Need Help?

If you encounter any errors:
1. Copy the error message
2. Check which line number it references
3. Let me know and I'll help debug!
