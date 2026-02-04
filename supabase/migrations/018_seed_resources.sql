-- Seed Resources based on the Volt AI menu design

-- 1. AI Agents (LLMs)
INSERT INTO resources (title, slug, category, summary, cover_image, external_link, is_published, published_at)
VALUES
(
    'Perplexity',
    'perplexity-ai',
    'AI Agent',
    'Start a conversation to research Kingsforth AI on Perplexity.',
    'https://logo.clearbit.com/perplexity.ai',
    'https://www.perplexity.ai',
    true,
    NOW()
),
(
    'ChatGPT',
    'chatgpt',
    'AI Agent',
    'Start a conversation to research Kingsforth AI on ChatGPT.',
    'https://logo.clearbit.com/openai.com',
    'https://chat.openai.com',
    true,
    NOW()
),
(
    'Claude',
    'claude',
    'AI Agent',
    'Start a conversation to research Kingsforth AI on Claude.',
    'https://logo.clearbit.com/anthropic.com',
    'https://claude.ai',
    true,
    NOW()
);

-- 2. Categories / Placeholder Content for the Menu Sections

-- Product Documentation
INSERT INTO resources (title, slug, category, summary, content, is_published, published_at)
VALUES
(
    'Kingsforth Platform Manual',
    'platform-manual',
    'Documentation',
    'Comprehensive guide to installing and configuring the Kingsforth Security Platform.',
    '[{"id":"doc1","type":"text","content":"# Platform Installation\n\nFollow these steps..."}]'::JSONB,
    true,
    NOW()
),
(
    'API Reference',
    'api-reference',
    'Documentation',
    'Developer documentation for integrating with Kingsforth API.',
    '[{"id":"doc2","type":"text","content":"# API Keys\n\nGenerate your keys in the admin panel..."}]'::JSONB,
    true,
    NOW()
);

-- Resource Library
INSERT INTO resources (title, slug, category, summary, content, is_published, published_at)
VALUES
(
    'Campus Safety Data Sheet',
    'campus-safety-ds',
    'Library',
    'Technical specifications for deploying AI in educational environments.',
    '[{"id":"lib1","type":"file","content":"https://example.com/datasheet.pdf"}]'::JSONB,
    true,
    NOW()
);

-- Customers
INSERT INTO resources (title, slug, category, summary, content, is_published, published_at)
VALUES
(
    'Metropolis High School',
    'metropolis-high',
    'Customer Story',
    'How Metropolis High reduced incident response time by 60% using Kingsforth AI.',
    '[{"id":"cust1","type":"text","content":"# Success Story\n\n..."}]'::JSONB,
    true,
    NOW()
);

-- Partners
INSERT INTO resources (title, slug, category, summary, content, is_published, published_at)
VALUES
(
    'SecurTech Distributors',
    'securtech',
    'Partner',
    'Authorized distributor for the West Coast region.',
    '[{"id":"part1","type":"text","content":"# Partner Profile\n\n..."}]'::JSONB,
    true,
    NOW()
);

-- Grants
INSERT INTO resources (title, slug, category, summary, content, is_published, published_at)
VALUES
(
    'Federal Safety Grant 2026',
    'fed-grant-2026',
    'Grant',
    'Complete guide to applying for the 2026 Federal School Safety Grant.',
    '[{"id":"grant1","type":"text","content":"# Grant Application Process\n\n..."}]'::JSONB,
    true,
    NOW()
);
