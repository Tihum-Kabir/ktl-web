-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL, -- 'Documentation', 'Library', 'Customer Story', 'Partner', 'Grant', 'AI Agent'
    summary TEXT,
    content JSONB DEFAULT '[]'::JSONB, -- Array of blocks: { id, type, content, ... }
    cover_image TEXT,
    external_link TEXT, -- For AI Agents or Partners
    tags TEXT[] DEFAULT '{}',
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id)
);

-- RLS Policies
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public resources are viewable by everyone" 
ON resources FOR SELECT 
USING (is_published = true);

-- Admin full access
CREATE POLICY "Admins can do everything with resources" 
ON resources FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM users 
        WHERE users.id = auth.uid() 
        AND users.role IN ('SUPER_ADMIN', 'COMPANY_ADMIN')
    )
);

-- Create storage bucket for resource assets if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('resource-assets', 'resource-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'resource-assets' );

CREATE POLICY "Admin Upload"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'resource-assets' AND
    EXISTS (
        SELECT 1 FROM users 
        WHERE users.id = auth.uid() 
        AND users.role IN ('SUPER_ADMIN', 'COMPANY_ADMIN')
    )
);

CREATE POLICY "Admin Update/Delete"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'resource-assets' AND
    EXISTS (
        SELECT 1 FROM users 
        WHERE users.id = auth.uid() 
        AND users.role IN ('SUPER_ADMIN', 'COMPANY_ADMIN')
    )
);
