-- Create product_features table
CREATE TABLE IF NOT EXISTS product_features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    media_url TEXT,
    media_type TEXT DEFAULT 'image', -- 'image' or 'video'
    features_list JSONB DEFAULT '[]'::jsonb,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    image_position TEXT DEFAULT 'left', -- 'left' or 'right'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE product_features ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public read product_features" ON product_features 
    FOR SELECT USING (true);

CREATE POLICY "Admin write product_features" ON product_features 
    FOR ALL USING (
        auth.uid() IN (SELECT id FROM users WHERE role IN ('COMPANY_ADMIN', 'SUPER_ADMIN'))
    );

-- Seed Data (from ProductShowcase.tsx)
INSERT INTO product_features (title, description, features_list, image_position, display_order)
VALUES 
(
    'Cognitive Analytics',
    'Identifies anomalies (theft, intrusion, fire) in real-time, instantly flagging threats that human operators miss.',
    '["Real-time threat detection", "Behavioral pattern analysis", "Instant alert notifications", "24/7 autonomous monitoring"]'::jsonb,
    'left',
    1
),
(
    'Forensic Search',
    'Search terabytes of footage in seconds using natural language (e.g., "Find red truck, north gate, 2 PM").',
    '["Natural language queries", "Instant video retrieval", "Object & person tracking", "Timeline reconstruction"]'::jsonb,
    'right',
    2
),
(
    'Automated Compliance',
    'Ensures PPE usage, safety zone adherence, and protocol verification without manual oversight.',
    '["PPE detection & verification", "Safety zone monitoring", "Protocol compliance tracking", "Automated reporting"]'::jsonb,
    'left',
    3
);
