-- CMS for Company Pages

-- 1. FAQs
CREATE TABLE IF NOT EXISTS cms_faqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT DEFAULT 'General', -- e.g. Product, Support, Billing
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Team Members
CREATE TABLE IF NOT EXISTS cms_team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT,
    image_url TEXT,
    social_linkedin TEXT,
    social_twitter TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. About Content
CREATE TABLE IF NOT EXISTS cms_about_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    section_key TEXT UNIQUE NOT NULL, -- 'mission', 'vision', 'story', 'stats'
    title TEXT,
    content TEXT,
    image_url TEXT,
    meta_data JSONB, -- For stats or extra fields
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE cms_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_about_content ENABLE ROW LEVEL SECURITY;

-- FAQs Policies
DROP POLICY IF EXISTS "Public view faqs" ON cms_faqs;
CREATE POLICY "Public view faqs" ON cms_faqs FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins manage faqs" ON cms_faqs;
CREATE POLICY "Admins manage faqs" ON cms_faqs FOR ALL USING (
    (SELECT role FROM users WHERE id = auth.uid()) IN ('SUPER_ADMIN', 'COMPANY_ADMIN')
);

-- Team Policies
DROP POLICY IF EXISTS "Public view team" ON cms_team_members;
CREATE POLICY "Public view team" ON cms_team_members FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins manage team" ON cms_team_members;
CREATE POLICY "Admins manage team" ON cms_team_members FOR ALL USING (
    (SELECT role FROM users WHERE id = auth.uid()) IN ('SUPER_ADMIN', 'COMPANY_ADMIN')
);

-- About Policies
DROP POLICY IF EXISTS "Public view about" ON cms_about_content;
CREATE POLICY "Public view about" ON cms_about_content FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins manage about" ON cms_about_content;
CREATE POLICY "Admins manage about" ON cms_about_content FOR ALL USING (
    (SELECT role FROM users WHERE id = auth.uid()) IN ('SUPER_ADMIN', 'COMPANY_ADMIN')
);

-- Seed Initial Data
INSERT INTO cms_about_content (section_key, title, content) VALUES
('mission', 'Our Mission', 'To eliminate operational inefficiency through sovereign-grade intelligence.'),
('vision', 'Our Vision', 'We serve the autonomous future where systems adapt, predict, and protect with zero latency.')
ON CONFLICT (section_key) DO NOTHING;

INSERT INTO cms_faqs (question, answer, category, sort_order) VALUES
('What is Kingsforth?', 'Kingsforth is an advanced intelligence system provider specializing in autonomous enterprise solutions.', 'General', 1),
('How do I integrate KTL?', 'Our system seamlessly integrates with existing IP cameras and IoT infrastructure via our Edge Gateway.', 'Technical', 2)
ON CONFLICT DO NOTHING;

INSERT INTO cms_team_members (name, role, bio, sort_order) VALUES
('Asif Mahbub', 'Co-Founder & CEO', 'The visionary architect behind the Neural Fabric.', 1),
('Shoaib Bin Noor', 'Co-Founder & CTO', 'Engineers the backbone of our IoT orchestration.', 2),
('Arifin Islam', 'Co-Founder & COO', 'Governs the operational velocity of KTL.', 3)
ON CONFLICT DO NOTHING;
