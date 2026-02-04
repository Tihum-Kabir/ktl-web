-- =============================================
-- Migration 013: Fix RLS for Site Settings and other CMS tables
-- Use is_super_admin() to prevent recursion
-- =============================================

-- Fix Site Settings
DROP POLICY IF EXISTS site_settings_modify ON site_settings;
CREATE POLICY site_settings_modify ON site_settings
    FOR ALL USING (is_super_admin());

-- Fix Media Assets
DROP POLICY IF EXISTS media_assets_insert ON media_assets;
CREATE POLICY media_assets_insert ON media_assets
    FOR INSERT WITH CHECK (is_super_admin());

DROP POLICY IF EXISTS media_assets_delete ON media_assets;
CREATE POLICY media_assets_delete ON media_assets
    FOR DELETE USING (is_super_admin());

-- Fix Partner Logos
DROP POLICY IF EXISTS partner_logos_modify ON partner_logos;
CREATE POLICY partner_logos_modify ON partner_logos
    FOR ALL USING (is_super_admin());

-- Fix Email Campaigns
DROP POLICY IF EXISTS email_campaigns_all ON email_campaigns;
CREATE POLICY email_campaigns_all ON email_campaigns
    FOR ALL USING (is_super_admin());

-- Fix Email Recipients
DROP POLICY IF EXISTS email_recipients_all ON email_recipients;
CREATE POLICY email_recipients_all ON email_recipients
    FOR ALL USING (is_super_admin());
