-- Add attachment columns to cms_faqs
ALTER TABLE cms_faqs
ADD COLUMN IF NOT EXISTS attachment_url TEXT,
ADD COLUMN IF NOT EXISTS attachment_name TEXT;

-- Ensure RLS allows relevant updates (already covered by existing policies, but good to double check)
-- Existing policy: "Admins manage faqs" ON cms_faqs FOR ALL USING ( ... IN ('SUPER_ADMIN', 'COMPANY_ADMIN') )
