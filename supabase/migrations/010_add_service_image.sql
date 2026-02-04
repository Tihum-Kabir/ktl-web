-- Migration 010: Add Image URL to Services and Create Storage Bucket

-- 1. Create storage bucket for service media if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('service-media', 'service-media', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Add policies for the bucket (simplistic: public read, authenticated insert)
-- Note: 'storage.objects' policies might need to be adjusted based on existing policies
-- We use DO block to avoid errors if policies exist

DO $$
BEGIN
    -- Public Read
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'Public Access service-media' AND tablename = 'objects' AND schemaname = 'storage'
    ) THEN
        CREATE POLICY "Public Access service-media" ON storage.objects FOR SELECT USING ( bucket_id = 'service-media' );
    END IF;

    -- Authenticated Upload (Any authenticated user for now, or refine to admin)
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated Upload service-media' AND tablename = 'objects' AND schemaname = 'storage'
    ) THEN
        CREATE POLICY "Authenticated Upload service-media" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'service-media' AND auth.role() = 'authenticated' );
    END IF;
    
    -- Authenticated Update
     IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated Update service-media' AND tablename = 'objects' AND schemaname = 'storage'
    ) THEN
        CREATE POLICY "Authenticated Update service-media" ON storage.objects FOR UPDATE USING ( bucket_id = 'service-media' AND auth.role() = 'authenticated' );
    END IF;
END $$;

-- 3. Add image_url column to services table
ALTER TABLE services ADD COLUMN IF NOT EXISTS image_url TEXT;
