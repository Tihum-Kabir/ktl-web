-- =============================================
-- Migration 005: Super Admin CMS Extensions
-- Extends existing schema with CMS capabilities
-- =============================================

-- ===== ENUMS =====
CREATE TYPE company_status AS ENUM ('active', 'suspended', 'deleted');
CREATE TYPE service_category AS ENUM ('surveillance', 'forensic', 'automation', 'iot', 'consulting', 'other');
CREATE TYPE media_type AS ENUM ('image', 'video', 'gif', 'document');
CREATE TYPE email_campaign_status AS ENUM ('draft', 'scheduled', 'sent', 'failed');

-- ===== EXTEND COMPANIES TABLE =====
-- Add new columns for company management
ALTER TABLE companies ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS website TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS status company_status DEFAULT 'active';

-- Create index for company status
CREATE INDEX IF NOT EXISTS idx_companies_status ON companies(status);
CREATE INDEX IF NOT EXISTS idx_companies_email ON companies(email);

-- ===== ENHANCED SERVICES TABLE =====
-- Drop existing services table and recreate with full CMS fields
DROP TABLE IF EXISTS services CASCADE;

CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    features JSONB DEFAULT '[]'::jsonb, -- Array of feature objects
    pricing JSONB DEFAULT '{}'::jsonb, -- Pricing configuration
    media JSONB DEFAULT '[]'::jsonb, -- Array of media URLs
    icon TEXT, -- Icon identifier (lucide icon name)
    category service_category DEFAULT 'other',
    order_index INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes for services
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_published ON services(is_published);
CREATE INDEX idx_services_order ON services(order_index);

-- ===== ENHANCED MEDIA ASSETS TABLE =====
-- Drop and recreate with enhanced fields
DROP TABLE IF EXISTS media_assets CASCADE;

CREATE TABLE media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename TEXT NOT NULL,
    original_filename TEXT NOT NULL,
    file_type media_type NOT NULL,
    mime_type TEXT NOT NULL,
    file_size INTEGER, -- in bytes
    url TEXT NOT NULL,
    thumbnail_url TEXT, -- For videos/large images
    alt_text TEXT,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for media
CREATE INDEX idx_media_type ON media_assets(file_type);
CREATE INDEX idx_media_uploaded_by ON media_assets(uploaded_by);
CREATE INDEX idx_media_tags ON media_assets USING GIN(tags);

-- ===== ENHANCED SITE SETTINGS TABLE =====
-- Add category field to existing site_settings
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES users(id) ON DELETE SET NULL;

-- Create index for settings category
CREATE INDEX IF NOT EXISTS idx_site_settings_category ON site_settings(category);

-- ===== EMAIL CAMPAIGNS TABLE =====
CREATE TABLE email_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject TEXT NOT NULL,
    body TEXT NOT NULL, -- HTML content
    recipient_filter JSONB, -- Criteria for recipients (e.g., {"role": "COMPANY_ADMIN"})
    sent_to INTEGER DEFAULT 0, -- Count of emails sent
    opened INTEGER DEFAULT 0, -- Count of opens
    clicked INTEGER DEFAULT 0, -- Count of clicks
    status email_campaign_status DEFAULT 'draft',
    scheduled_at TIMESTAMPTZ,
    sent_at TIMESTAMPTZ,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for email campaigns
CREATE INDEX idx_email_campaigns_status ON email_campaigns(status);
CREATE INDEX idx_email_campaigns_created_by ON email_campaigns(created_by);

-- ===== EMAIL RECIPIENTS TABLE =====
-- Track individual email sends
CREATE TABLE email_recipients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID REFERENCES email_campaigns(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    sent_at TIMESTAMPTZ,
    opened_at TIMESTAMPTZ,
    clicked_at TIMESTAMPTZ,
    bounced BOOLEAN DEFAULT false,
    error_message TEXT
);

-- Indexes for email recipients
CREATE INDEX idx_email_recipients_campaign ON email_recipients(campaign_id);
CREATE INDEX idx_email_recipients_user ON email_recipients(user_id);

-- ===== PARTNER LOGOS TABLE =====
-- Separate table for partner logos (linked to companies)
CREATE TABLE partner_logos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    logo_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for partner logos
CREATE INDEX idx_partner_logos_company ON partner_logos(company_id);
CREATE INDEX idx_partner_logos_active ON partner_logos(is_active);
CREATE INDEX idx_partner_logos_order ON partner_logos(display_order);

-- ===== ROW LEVEL SECURITY =====

-- Enable RLS on new tables
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_logos ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;

-- Services: Published services are public, all services visible to super admin
CREATE POLICY services_select_public ON services
    FOR SELECT USING (is_published = true);

CREATE POLICY services_select_admin ON services
    FOR SELECT USING (
        (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
    );

CREATE POLICY services_insert ON services
    FOR INSERT WITH CHECK (
        (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
    );

CREATE POLICY services_update ON services
    FOR UPDATE USING (
        (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
    );

CREATE POLICY services_delete ON services
    FOR DELETE USING (
        (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
    );

-- Email Campaigns: Super admin only
CREATE POLICY email_campaigns_all ON email_campaigns
    FOR ALL USING (
        (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
    );

CREATE POLICY email_recipients_all ON email_recipients
    FOR ALL USING (
        (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
    );

-- Partner Logos: Active logos are public, all visible to super admin
CREATE POLICY partner_logos_select_public ON partner_logos
    FOR SELECT USING (is_active = true);

CREATE POLICY partner_logos_select_admin ON partner_logos
    FOR SELECT USING (
        (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
    );

CREATE POLICY partner_logos_modify ON partner_logos
    FOR ALL USING (
        (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
    );

-- Media Assets: Super admin can manage, others can view
CREATE POLICY media_assets_select ON media_assets
    FOR SELECT USING (true); -- Public read

CREATE POLICY media_assets_insert ON media_assets
    FOR INSERT WITH CHECK (
        (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
    );

CREATE POLICY media_assets_delete ON media_assets
    FOR DELETE USING (
        (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
    );

-- Site Settings: Public read, super admin write
CREATE POLICY site_settings_select ON site_settings
    FOR SELECT USING (true);

CREATE POLICY site_settings_modify ON site_settings
    FOR ALL USING (
        (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
    );

-- ===== TRIGGERS =====

-- Auto-update updated_at for services
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===== FUNCTIONS =====

-- Function to auto-create partner logo when company is created with logo
CREATE OR REPLACE FUNCTION auto_create_partner_logo()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.logo_url IS NOT NULL AND NEW.status = 'active' THEN
        INSERT INTO partner_logos (company_id, logo_url, display_order, is_active)
        VALUES (NEW.id, NEW.logo_url, 0, true)
        ON CONFLICT DO NOTHING;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-create partner logo
CREATE TRIGGER trigger_auto_create_partner_logo
    AFTER INSERT OR UPDATE ON companies
    FOR EACH ROW
    EXECUTE FUNCTION auto_create_partner_logo();

-- Function to sync partner logo when company logo changes
CREATE OR REPLACE FUNCTION sync_partner_logo()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.logo_url IS DISTINCT FROM OLD.logo_url THEN
        UPDATE partner_logos
        SET logo_url = NEW.logo_url
        WHERE company_id = NEW.id;
    END IF;
    
    IF NEW.status IS DISTINCT FROM OLD.status THEN
        UPDATE partner_logos
        SET is_active = (NEW.status = 'active')
        WHERE company_id = NEW.id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to sync partner logo
CREATE TRIGGER trigger_sync_partner_logo
    AFTER UPDATE ON companies
    FOR EACH ROW
    EXECUTE FUNCTION sync_partner_logo();

-- ===== SEED DATA =====

-- Insert default site settings
INSERT INTO site_settings (key, value, category) VALUES
    ('site_name', '"Kingsforth"', 'general'),
    ('site_tagline', '"Enterprise Intelligence Systems"', 'general'),
    ('partner_logos_enabled', 'true', 'features'),
    ('email_from_name', '"Kingsforth Team"', 'email'),
    ('email_from_address', '"noreply@kingsforth.net"', 'email')
ON CONFLICT (key) DO NOTHING;

-- ===== COMMENTS =====
COMMENT ON TABLE services IS 'CMS-managed service catalog with full content management';
COMMENT ON TABLE email_campaigns IS 'Bulk email campaigns sent by super admin';
COMMENT ON TABLE partner_logos IS 'Partner/affiliate logos displayed in carousel';
COMMENT ON TABLE media_assets IS 'Centralized media library for all uploads';
COMMENT ON COLUMN companies.logo_url IS 'Company logo URL, auto-synced to partner_logos';
COMMENT ON COLUMN services.slug IS 'URL-friendly identifier for service detail pages';
COMMENT ON COLUMN services.features IS 'JSON array of feature objects with title, description, icon';
COMMENT ON COLUMN services.pricing IS 'JSON object with pricing tiers and configuration';
