-- =============================================
-- Migration 024: Enable RLS and Fix Policies
-- Addresses linter errors for RLS disabled on public tables
-- =============================================

-- 1. Enable RLS on tables flagged by linter
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.section_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_base_articles ENABLE ROW LEVEL SECURITY;

-- 2. Ensure Site Settings policies exist (already partly covered, but safe to re-assert or add missing)
-- Allow public read access to site settings (for logos, colors, etc.)
DROP POLICY IF EXISTS site_settings_read_public ON site_settings;
CREATE POLICY site_settings_read_public ON site_settings
    FOR SELECT USING (true);

-- 3. Pages Policies
-- Public can view published pages
DROP POLICY IF EXISTS pages_read_public ON pages;
CREATE POLICY pages_read_public ON pages
    FOR SELECT USING (published = true);

-- Admins can do everything
DROP POLICY IF EXISTS pages_admin_all ON pages;
CREATE POLICY pages_admin_all ON pages
    FOR ALL USING (is_super_admin());

-- 4. Section Blocks Policies
-- Public can view blocks
DROP POLICY IF EXISTS section_blocks_read_public ON section_blocks;
CREATE POLICY section_blocks_read_public ON section_blocks
    FOR SELECT USING (true);

-- Admins can do everything
DROP POLICY IF EXISTS section_blocks_admin_all ON section_blocks;
CREATE POLICY section_blocks_admin_all ON section_blocks
    FOR ALL USING (is_super_admin());

-- 5. Knowledge Base Policies
-- Public can view published articles
DROP POLICY IF EXISTS kba_read_public ON knowledge_base_articles;
CREATE POLICY kba_read_public ON knowledge_base_articles
    FOR SELECT USING (published = true);

-- Admins can do everything
DROP POLICY IF EXISTS kba_admin_all ON knowledge_base_articles;
CREATE POLICY kba_admin_all ON knowledge_base_articles
    FOR ALL USING (is_super_admin());
