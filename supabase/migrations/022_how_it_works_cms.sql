-- Create table for How It Works steps
CREATE TABLE IF NOT EXISTS how_it_works_steps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    step_number TEXT NOT NULL, -- e.g. "01", "02"
    icon_name TEXT, -- e.g. "AlertCircle", "Zap"
    media_url TEXT,
    media_type TEXT DEFAULT 'image', -- 'image' or 'video'
    media_fit TEXT DEFAULT 'cover', -- 'cover', 'contain', 'fill'
    color_theme TEXT, -- e.g. "from-red-500 to-orange-500"
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE how_it_works_steps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view steps"
    ON how_it_works_steps FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage steps"
    ON how_it_works_steps FOR ALL
    USING (
        (SELECT role FROM users WHERE id = auth.uid()) IN ('SUPER_ADMIN', 'COMPANY_ADMIN')
    );

-- Insert Initial Seed Data (matching the hardcoded content)
INSERT INTO how_it_works_steps (title, description, step_number, icon_name, color_theme, sort_order)
VALUES 
    ('The Event', 'Kingseye detects an unauthorized entry at a remote facility', '01', 'AlertCircle', 'from-red-500 to-orange-500', 1),
    ('The Analysis', 'AI processes threat level, location, and optimal response protocol', '02', 'Zap', 'from-cyan-500 to-blue-500', 2),
    ('The Action', 'Automatically locks down Zone B, triggers perimeter lighting, initiates drone flyover', '03', 'Shield', 'from-violet-500 to-purple-500', 3),
    ('The Result', 'Threat neutralized in < 60 seconds without risking a single human life', '04', 'CheckCircle', 'from-green-500 to-emerald-500', 4)
ON CONFLICT DO NOTHING;
