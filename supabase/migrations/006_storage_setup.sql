-- =============================================
-- Supabase Storage Buckets Setup
-- Run this in Supabase SQL Editor after creating buckets in UI
-- Or use Supabase CLI: supabase storage create
-- =============================================

-- Note: Create these buckets in Supabase Dashboard > Storage first:
-- 1. company-logos (public)
-- 2. service-media (public)
-- 3. site-assets (public)
-- 4. media-library (public)

-- ===== STORAGE POLICIES =====

-- Company Logos Bucket
-- Public read, authenticated upload, super admin delete
CREATE POLICY "Public can view company logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'company-logos');

CREATE POLICY "Authenticated users can upload company logos"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'company-logos' AND
    auth.role() = 'authenticated'
);

CREATE POLICY "Super admin can delete company logos"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'company-logos' AND
    (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
);

-- Service Media Bucket
-- Public read, super admin write/delete
CREATE POLICY "Public can view service media"
ON storage.objects FOR SELECT
USING (bucket_id = 'service-media');

CREATE POLICY "Super admin can upload service media"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'service-media' AND
    (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
);

CREATE POLICY "Super admin can delete service media"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'service-media' AND
    (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
);

-- Site Assets Bucket
-- Public read, super admin write/delete
CREATE POLICY "Public can view site assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-assets');

CREATE POLICY "Super admin can upload site assets"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'site-assets' AND
    (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
);

CREATE POLICY "Super admin can delete site assets"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'site-assets' AND
    (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
);

-- Media Library Bucket
-- Public read, super admin write/delete
CREATE POLICY "Public can view media library"
ON storage.objects FOR SELECT
USING (bucket_id = 'media-library');

CREATE POLICY "Super admin can upload to media library"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'media-library' AND
    (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
);

CREATE POLICY "Super admin can delete from media library"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'media-library' AND
    (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
);

-- ===== BUCKET CONFIGURATION NOTES =====
-- 
-- In Supabase Dashboard > Storage, configure each bucket:
-- 
-- 1. company-logos:
--    - Public: Yes
--    - File size limit: 2MB
--    - Allowed MIME types: image/png, image/jpeg, image/svg+xml
--
-- 2. service-media:
--    - Public: Yes
--    - File size limit: 50MB
--    - Allowed MIME types: image/*, video/mp4, video/webm, image/gif
--
-- 3. site-assets:
--    - Public: Yes
--    - File size limit: 10MB
--    - Allowed MIME types: image/*, image/x-icon
--
-- 4. media-library:
--    - Public: Yes
--    - File size limit: 100MB
--    - Allowed MIME types: image/*, video/*, application/pdf
