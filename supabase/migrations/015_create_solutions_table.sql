-- Create solutions table for detailed use-case pages
CREATE TABLE IF NOT EXISTS solutions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    hero_image TEXT,
    hero_video_url TEXT,
    stats JSONB DEFAULT '[]'::JSONB, -- Array of { label, value, icon_name }
    content_blocks JSONB DEFAULT '[]'::JSONB, -- Array of { title, content, image, align, list_items }
    map_embed_url TEXT,
    faqs JSONB DEFAULT '[]'::JSONB, -- Array of { question, answer }
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id)
);

-- Add RLS policies
ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;

-- Allow read access to everyone for published solutions
CREATE POLICY "Solutions are viewable by everyone" ON solutions
    FOR SELECT
    USING (is_published = true OR auth.role() = 'service_role');

-- Allow full access to admins
CREATE POLICY "Admins can manage solutions" ON solutions
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
            AND users.role = 'SUPER_ADMIN'
        )
    );

-- Create trigger for updated_at
CREATE TRIGGER set_solutions_updated_at
    BEFORE UPDATE ON solutions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
