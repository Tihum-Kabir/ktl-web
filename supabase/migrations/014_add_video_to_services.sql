-- =============================================
-- Migration 014: Add Video URL to Services
-- Add video_url field to services table for YouTube embeds
-- =============================================

-- Add video_url column to services table
ALTER TABLE services
ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Add comment
COMMENT ON COLUMN services.video_url IS 'YouTube embed URL for service demo videos (e.g., https://www.youtube.com/embed/VIDEO_ID)';

-- Log the migration
DO $$
BEGIN
    RAISE NOTICE 'Successfully added video_url column to services table';
END $$;
