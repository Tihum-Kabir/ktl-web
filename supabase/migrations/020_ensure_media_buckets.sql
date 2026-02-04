-- Ensure storage extension is available (Usually built-in, skipping explicit create)
-- CREATE EXTENSION IF NOT EXISTS "storage";

-- Create media-library bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'media-library', 
    'media-library', 
    true, 
    52428800, -- 50MB
    ARRAY['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml', 'video/mp4', 'video/webm']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 52428800,
    allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml', 'video/mp4', 'video/webm'];

-- Ensure RLS policies exist (re-applying or creating checks)
-- We rely on 006_storage_setup.sql for policies, but to be safe/standalone:

-- Drop existing if conflict (optional, but cleaner for idempotency)
DROP POLICY IF EXISTS "Public can view media library" ON storage.objects;
DROP POLICY IF EXISTS "Super admin can upload to media library" ON storage.objects;
DROP POLICY IF EXISTS "Super admin can delete from media library" ON storage.objects;
DROP POLICY IF EXISTS "Company admin can upload to media library" ON storage.objects;

-- Create Policies
CREATE POLICY "Public can view media library"
ON storage.objects FOR SELECT
USING (bucket_id = 'media-library');

-- Allow both SUPER_ADMIN and COMPANY_ADMIN to upload
CREATE POLICY "Admins can upload to media library"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'media-library' AND
    auth.role() = 'authenticated' AND
    (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('SUPER_ADMIN', 'COMPANY_ADMIN')
    )
);

CREATE POLICY "Admins can delete from media library"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'media-library' AND
    auth.role() = 'authenticated' AND
    (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('SUPER_ADMIN', 'COMPANY_ADMIN')
    )
);
