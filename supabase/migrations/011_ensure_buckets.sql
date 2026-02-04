-- Ensure storage buckets exist
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('site-assets', 'site-assets', true),
  ('company-logos', 'company-logos', true),
  ('service-media', 'service-media', true),
  ('media-library', 'media-library', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Ensure RLS is enabled

