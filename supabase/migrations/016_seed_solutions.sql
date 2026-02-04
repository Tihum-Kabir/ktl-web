-- 1. Add category column if it doesn't exist (to match "By Industry" vs "By Use Case")
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'solutions' AND column_name = 'category') THEN
        ALTER TABLE solutions ADD COLUMN category TEXT DEFAULT 'Use Case';
    END IF;
END $$;

-- 2. Clear existing entries to avoid duplicates during dev
DELETE FROM solutions WHERE slug IN (
    'education', 'corporate', 'cities-government', 
    'perimeter-security', 'medical-emergencies', 'weapons-detection', 'vsoc'
);

-- 3. Insert "By Industry" Solutions
INSERT INTO solutions (
    slug, category, title, subtitle, description, hero_image, is_published, stats, content_blocks
) VALUES 
(
    'education', 
    'Industry',
    'Education', 
    'K-12 and Higher Education Safety',
    'Transform your existing security cameras into a proactive 24/7 monitoring network. Detect threats like weapons, fights, and medical emergencies in real-time without compromising student privacy.',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop',
    true,
    '[
        {"label": "False Alarms", "value": "0%", "icon_name": "ShieldCheck"},
        {"label": "Monitoring", "value": "24/7", "icon_name": "Clock"},
        {"label": "Response Time", "value": "<3s", "icon_name": "Zap"}
    ]'::JSONB,
    '[
        {
            "id": "edu-1",
            "title": "Real-time Threat Detection",
            "content": "Identify potential threats before they escalate. Our AI detects fights, bullying, intruders, and weapons instantly, notifying school resource officers and administrators immediately.",
            "image": "https://images.unsplash.com/photo-1577896334502-281b31c26027?q=80&w=2071&auto=format&fit=crop",
            "align": "right",
            "list_items": ["Weapon Detection", "Fight Recognition", "Intruder Alerts"]
        },
        {
            "id": "edu-2",
            "title": "Privacy-First Monitoring",
            "content": "Protecting student privacy is paramount. Volt AI focuses on behavioral analysis and object recognition rather than facial recognition, ensuring campus safety without compromising individual identities.",
            "image": "https://images.unsplash.com/photo-1629904853026-6a84d4361559?q=80&w=2070&auto=format&fit=crop",
            "align": "left",
            "list_items": ["No Facial Recognition", "Behavioral Analysis", "GDPR & COPPA Compliant"]
        }
    ]'::JSONB
),
(
    'corporate',
    'Industry', 
    'Corporate', 
    'Enterprise Security Intelligence',
    'Secure your corporate campus with next-generation AI. Protect assets, employees, and intellectual property with automated guarding that never sleeps.',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    true,
    '[
        {"label": "Cost Reduction", "value": "40%", "icon_name": "TrendingDown"},
        {"label": "Coverage", "value": "100%", "icon_name": "Globe"},
        {"label": "Uptime", "value": "99.9%", "icon_name": "Activity"}
    ]'::JSONB,
    '[
        {
            "id": "corp-1",
            "title": "Perimeter Protection",
            "content": "Secure your facilities with a virtual perimeter. Detect unauthorized vehicle or personnel access after hours and receive instant alerts on your mobile device or SOC.",
            "image": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop",
            "align": "right",
            "list_items": ["License Plate Recognition", "Tailgating Detection", "After-hours Alerts"]
        },
        {
            "id": "corp-2",
            "title": "Virtual Guarding",
            "content": "Augment your security team with AI that monitors thousands of streams simultaneously. Reduces the need for large physical guard forces while increasing effectiveness.",
            "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
            "align": "left",
            "list_items": ["Force Multiplier", "Automated Patrols", "Incident Reporting"]
        }
    ]'::JSONB
),
(
    'cities-government',
    'Industry',
    'Cities & Government',
    'Public Safety Infrastructure',
    'Enhance public safety in smart cities. Monitor public spaces, government buildings, and critical infrastructure with advanced anomaly detection.',
    'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop',
    true,
    '[]'::JSONB,
    '[
        {
            "id": "city-1",
            "title": "Crowd & Traffic Analysis",
            "content": "Analyze crowd patterns and traffic flows to detect anomalies, prevent congestion, and manage large public events safely.",
            "image": "https://images.unsplash.com/photo-1449824913929-49f9fb400cec?q=80&w=2070&auto=format&fit=crop",
            "align": "right",
            "list_items": ["Crowd Density", "Traffic Flow", "Loitering Detection"]
        }
    ]'::JSONB
);

-- 4. Insert "By Use Case" Solutions
INSERT INTO solutions (
    slug, category, title, subtitle, description, hero_image, is_published, stats, content_blocks
) VALUES
(
    'perimeter-security',
    'Use Case',
    'Perimeter Security',
    'Real-time Threat Detection',
    'Stop threats at the edge. Our system creates a virtual fence around your property, detecting intruders the moment they cross your boundary.',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop',
    true,
    '[
        {"label": "Detection Range", "value": "Unlimited", "icon_name": "Maximize"},
        {"label": "Precision", "value": "High", "icon_name": "Crosshair"},
        {"label": "Latency", "value": "Real-time", "icon_name": "Zap"}
    ]'::JSONB,
    '[
        {
            "id": "peri-1",
            "title": "Virtual Fencing",
            "content": "Define custom zones and tripping lines. Any object crossing these lines triggers an immediate classification and alert process.",
            "image": "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2069&auto=format&fit=crop",
            "align": "right",
            "list_items": ["Zone Intrusion", "Line Crossing", "Loitering"]
        },
        {
            "id": "peri-2",
            "title": "Night Vision & Thermal",
            "content": "Works seamlessly in low-light conditions or with thermal cameras to provide 24/7 protection regardless of visibility.",
            "image": "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=2070&auto=format&fit=crop",
            "align": "left",
            "list_items": ["Low Light Capable", "Thermal Support", "Weather Resistant AI"]
        }
    ]'::JSONB
),
(
    'medical-emergencies',
    'Use Case',
    'Medical Emergencies',
    'Instant Medical Response',
    'Detect falls, slip-and-trip accidents, and people in distress instantly. Reduce response times when seconds count.',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
    true,
    '[
        {"label": "Response Improved", "value": "90%", "icon_name": "TrendingUp"},
        {"label": "Privacy", "value": "100%", "icon_name": "Shield"}
    ]'::JSONB,
    '[
        {
            "id": "med-1",
            "title": "Fall Detection",
            "content": "Automatically identify when a person has fallen and remains on the floor. Critical for hospitals, senior living, and lone worker safety.",
            "image": "https://images.unsplash.com/photo-1516574187841-69301976eec4?q=80&w=2070&auto=format&fit=crop",
            "align": "right",
            "list_items": ["Fall Detection", "Man Down", "Prolonged Inactivity"]
        }
    ]'::JSONB
),
(
    'weapons-detection',
    'Use Case',
    'Weapons Detection',
    'AI-Powered Identification',
    'Detect visible firearms in real-time. Our specialized model is trained to identify handguns and long guns with high precision.',
    'https://images.unsplash.com/photo-1595163363251-4131d2347209?q=80&w=2070&auto=format&fit=crop',
    true,
    '[
        {"label": "Accuracy", "value": "99.2%", "icon_name": "CheckCircle"},
        {"label": "Alert Speed", "value": "<2s", "icon_name": "Zap"}
    ]'::JSONB,
    '[
        {
            "id": "weap-1",
            "title": "Zero Tolerance Safety",
            "content": "Immediate lockdown protocols can be triggered upon positive detection. Integration with access control systems allows for automated door locking.",
            "image": "https://images.unsplash.com/photo-1583060851834-0805c8794c48?q=80&w=2071&auto=format&fit=crop",
            "align": "right",
            "list_items": ["Gun Detection", "Brandishing Detection", "Auto-Lockdown"]
        }
    ]'::JSONB
),
(
    'vsoc',
    'Use Case',
    'VSOC',
    'Virtual Security Operations',
    'Centralized commmand and control. Your Virtual Security Operations Center for managing alerts across multiple sites.',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    true,
    '[]'::JSONB,
    '[
        {
            "id": "vsoc-1",
            "title": "Centralized Dashboard",
            "content": "Manage thousands of cameras from a single pane of glass. Prioritize alerts, dispatch resources, and generate compliance reports effortlessly.",
            "image": "https://images.unsplash.com/photo-1504384308090-c54be3855485?q=80&w=2070&auto=format&fit=crop",
            "align": "right",
            "list_items": ["Multi-site View", "Alert Prioritization", "Audit Logs"]
        }
    ]'::JSONB
);
