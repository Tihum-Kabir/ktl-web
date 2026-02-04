-- =============================================
-- Migration 008: Seed Services
-- Populate the services table with all 6 core services
-- =============================================

-- Clear existing services (safe for re-running migration)
DELETE FROM services;

-- Insert Big Data Forensic
INSERT INTO services (
    slug,
    title,
    subtitle,
    description,
    features,
    pricing,
    media,
    icon,
    category,
    order_index,
    is_published,
    meta_title,
    meta_description
) VALUES (
    'big-data-forensic',
    'Big Data Forensic',
    'Search terabytes of historical data in seconds',
    '<p>In the digital age, organizations face the challenge of managing and analyzing massive volumes of data. Our Big Data Forensic service provides cutting-edge solutions to search, analyze, and extract insights from terabytes of historical data in mere seconds.</p><p>Whether you''re conducting investigations, performing compliance audits, or seeking patterns in complex datasets, our forensic tools deliver unmatched speed and accuracy.</p>',
    '[
        {
            "icon": "search",
            "title": "Rapid Search",
            "description": "Search terabytes of data in seconds with our advanced indexing algorithms"
        },
        {
            "icon": "shield",
            "title": "Forensic Analysis",
            "description": "Conduct in-depth forensic analysis with military-grade precision"
        },
        {
            "icon": "database",
            "title": "Scalability",
            "description": "Handle massive datasets that scale with your organization''s needs"
        },
        {
            "icon": "lock",
            "title": "Security",
            "description": "Enterprise-grade security with end-to-end encryption"
        },
        {
            "icon": "zap",
            "title": "Real-time Insights",
            "description": "Get actionable insights in real-time for faster decision making"
        },
        {
            "icon": "check-circle",
            "title": "Compliance Ready",
            "description": "Meet regulatory requirements with comprehensive audit trails"
        }
    ]'::jsonb,
    '{
        "model": "custom",
        "description": "Pricing tailored to your data volume and requirements",
        "cta": "Contact us for a custom quote"
    }'::jsonb,
    '{
        "hero": "/images/services/big-data-forensic-hero.jpg",
        "gallery": []
    }'::jsonb,
    'database',
    'forensic',
    1,
    true,
    'Big Data Forensic Services | Kingsforth',
    'Search and analyze terabytes of historical data in seconds with our advanced big data forensic solutions. Enterprise-grade security and compliance.'
);

-- Insert Cognitive Surveillance
INSERT INTO services (
    slug,
    title,
    subtitle,
    description,
    features,
    pricing,
    media,
    icon,
    category,
    order_index,
    is_published,
    meta_title,
    meta_description
) VALUES (
    'cognitive-surveillance',
    'Cognitive Surveillance',
    'Real-time video analysis and threat detection',
    '<p>Transform your security operations with AI-powered cognitive surveillance. Our advanced system analyzes video feeds in real-time, detecting threats, anomalies, and patterns that human operators might miss.</p><p>Leveraging cutting-edge computer vision and machine learning, we provide 24/7 intelligent monitoring that adapts and learns from your environment.</p>',
    '[
        {
            "icon": "eye",
            "title": "Real-time Analysis",
            "description": "Analyze video feeds in real-time with AI-powered threat detection"
        },
        {
            "icon": "alert-triangle",
            "title": "Threat Detection",
            "description": "Automatically identify and alert on potential security threats"
        },
        {
            "icon": "cpu",
            "title": "AI-Powered",
            "description": "Advanced machine learning models that improve over time"
        },
        {
            "icon": "clock",
            "title": "24/7 Monitoring",
            "description": "Continuous surveillance without human fatigue"
        },
        {
            "icon": "trending-up",
            "title": "Pattern Recognition",
            "description": "Identify behavioral patterns and anomalies automatically"
        },
        {
            "icon": "shield",
            "title": "Proactive Security",
            "description": "Prevent incidents before they occur with predictive analytics"
        }
    ]'::jsonb,
    '{
        "model": "subscription",
        "tiers": [
            {
                "name": "Basic",
                "price": "$999/month",
                "features": ["Up to 10 cameras", "Real-time alerts", "7-day storage"],
                "cta": "Get Started"
            },
            {
                "name": "Professional",
                "price": "$2,499/month",
                "features": ["Up to 50 cameras", "Advanced AI features", "30-day storage", "Priority support"],
                "cta": "Get Started"
            },
            {
                "name": "Enterprise",
                "price": "Custom",
                "features": ["Unlimited cameras", "Custom AI models", "Unlimited storage", "Dedicated support"],
                "cta": "Contact Sales"
            }
        ]
    }'::jsonb,
    '{
        "hero": "/images/services/cognitive-surveillance-hero.jpg",
        "gallery": []
    }'::jsonb,
    'eye',
    'surveillance',
    2,
    true,
    'Cognitive Surveillance Solutions | Kingsforth',
    'AI-powered real-time video analysis and threat detection. Transform your security operations with intelligent surveillance.'
);

-- Insert Autonomous Field Ops
INSERT INTO services (
    slug,
    title,
    subtitle,
    description,
    features,
    pricing,
    media,
    icon,
    category,
    order_index,
    is_published,
    meta_title,
    meta_description
) VALUES (
    'autonomous-field-ops',
    'Autonomous Field Ops',
    'Robotic process automation for critical response',
    '<p>Deploy autonomous robotic systems for critical field operations where speed, precision, and safety are paramount. Our field ops solutions combine robotics, AI, and real-time data processing to handle high-stakes scenarios.</p><p>From emergency response to infrastructure inspection, our autonomous systems operate in environments too dangerous or complex for human teams alone.</p>',
    '[
        {
            "icon": "cpu",
            "title": "Autonomous Operations",
            "description": "Fully autonomous robots that operate independently in the field"
        },
        {
            "icon": "shield",
            "title": "Critical Response",
            "description": "Rapid deployment for emergency and high-stakes situations"
        },
        {
            "icon": "zap",
            "title": "Real-time Processing",
            "description": "Process data and make decisions in real-time"
        },
        {
            "icon": "settings",
            "title": "Adaptive Systems",
            "description": "Systems that adapt to changing field conditions"
        },
        {
            "icon": "radio",
            "title": "Remote Control",
            "description": "Seamless transition between autonomous and manual control"
        },
        {
            "icon": "check-circle",
            "title": "Safety First",
            "description": "Built-in safety protocols and fail-safes"
        }
    ]'::jsonb,
    '{
        "model": "custom",
        "description": "Pricing based on deployment scope and requirements",
        "cta": "Request a consultation"
    }'::jsonb,
    '{
        "hero": "/images/services/autonomous-field-ops-hero.jpg",
        "gallery": []
    }'::jsonb,
    'cpu',
    'automation',
    3,
    true,
    'Autonomous Field Operations | Kingsforth',
    'Robotic process automation for critical response operations. Deploy autonomous systems for high-stakes field scenarios.'
);

-- Insert AI Agentic SaaS
INSERT INTO services (
    slug,
    title,
    subtitle,
    description,
    features,
    pricing,
    media,
    icon,
    category,
    order_index,
    is_published,
    meta_title,
    meta_description
) VALUES (
    'ai-agentic-saas',
    'AI Agentic SaaS',
    'Self-evolving software agents for workflows',
    '<p>Experience the future of workflow automation with our AI Agentic SaaS platform. Our intelligent software agents don''t just follow scripts—they learn, adapt, and evolve to optimize your business processes continuously.</p><p>From customer service to data processing, our AI agents work autonomously to improve efficiency and reduce operational overhead.</p>',
    '[
        {
            "icon": "bot",
            "title": "Intelligent Agents",
            "description": "AI agents that learn and improve from every interaction"
        },
        {
            "icon": "trending-up",
            "title": "Self-Evolving",
            "description": "Continuously optimize workflows without manual intervention"
        },
        {
            "icon": "zap",
            "title": "Workflow Automation",
            "description": "Automate complex business processes end-to-end"
        },
        {
            "icon": "users",
            "title": "Multi-Agent Systems",
            "description": "Deploy multiple agents that collaborate seamlessly"
        },
        {
            "icon": "bar-chart",
            "title": "Performance Analytics",
            "description": "Track agent performance and ROI in real-time"
        },
        {
            "icon": "settings",
            "title": "Easy Integration",
            "description": "Integrate with your existing tools and platforms"
        }
    ]'::jsonb,
    '{
        "model": "subscription",
        "tiers": [
            {
                "name": "Starter",
                "price": "$499/month",
                "features": ["Up to 5 agents", "Basic workflows", "Email support"],
                "cta": "Start Free Trial"
            },
            {
                "name": "Business",
                "price": "$1,999/month",
                "features": ["Up to 25 agents", "Advanced workflows", "Priority support", "Custom integrations"],
                "cta": "Start Free Trial"
            },
            {
                "name": "Enterprise",
                "price": "Custom",
                "features": ["Unlimited agents", "Custom AI models", "Dedicated support", "SLA guarantee"],
                "cta": "Contact Sales"
            }
        ]
    }'::jsonb,
    '{
        "hero": "/images/services/ai-agentic-saas-hero.jpg",
        "gallery": []
    }'::jsonb,
    'bot',
    'automation',
    4,
    true,
    'AI Agentic SaaS Platform | Kingsforth',
    'Self-evolving AI software agents for workflow automation. Intelligent agents that learn and optimize your business processes.'
);

-- Insert IoT Orchestration
INSERT INTO services (
    slug,
    title,
    subtitle,
    description,
    features,
    pricing,
    media,
    icon,
    category,
    order_index,
    is_published,
    meta_title,
    meta_description
) VALUES (
    'iot-orchestration',
    'IoT Orchestration',
    'Unifying fragmented hardware sensors',
    '<p>Bring order to the chaos of IoT devices with our comprehensive orchestration platform. We unify fragmented hardware sensors, protocols, and data streams into a single, coherent system.</p><p>Whether you''re managing smart buildings, industrial equipment, or city-wide sensor networks, our platform provides the control and insights you need.</p>',
    '[
        {
            "icon": "network",
            "title": "Unified Platform",
            "description": "Connect and manage all IoT devices from a single interface"
        },
        {
            "icon": "git-compare",
            "title": "Protocol Agnostic",
            "description": "Support for all major IoT protocols and standards"
        },
        {
            "icon": "bar-chart",
            "title": "Real-time Monitoring",
            "description": "Monitor device health and performance in real-time"
        },
        {
            "icon": "zap",
            "title": "Edge Computing",
            "description": "Process data at the edge for faster response times"
        },
        {
            "icon": "shield",
            "title": "Secure by Design",
            "description": "Enterprise-grade security for all device communications"
        },
        {
            "icon": "trending-up",
            "title": "Scalable",
            "description": "Scale from hundreds to millions of devices seamlessly"
        }
    ]'::jsonb,
    '{
        "model": "subscription",
        "tiers": [
            {
                "name": "Starter",
                "price": "$799/month",
                "features": ["Up to 1,000 devices", "Basic analytics", "Email support"],
                "cta": "Get Started"
            },
            {
                "name": "Professional",
                "price": "$2,999/month",
                "features": ["Up to 10,000 devices", "Advanced analytics", "Priority support", "Custom integrations"],
                "cta": "Get Started"
            },
            {
                "name": "Enterprise",
                "price": "Custom",
                "features": ["Unlimited devices", "Custom analytics", "Dedicated support", "On-premise deployment"],
                "cta": "Contact Sales"
            }
        ]
    }'::jsonb,
    '{
        "hero": "/images/services/iot-orchestration-hero.jpg",
        "gallery": []
    }'::jsonb,
    'network',
    'iot',
    5,
    true,
    'IoT Orchestration Platform | Kingsforth',
    'Unify fragmented IoT hardware sensors and devices. Comprehensive orchestration platform for smart buildings and industrial IoT.'
);

-- Insert Go-to-Market Expert
INSERT INTO services (
    slug,
    title,
    subtitle,
    description,
    features,
    pricing,
    media,
    icon,
    category,
    order_index,
    is_published,
    meta_title,
    meta_description
) VALUES (
    'go-to-market-expert',
    'Go-to-Market Expert',
    'Strategic guidance for product launch',
    '<p>Launch your product with confidence using our expert go-to-market consulting services. We provide strategic guidance from market research to launch execution, ensuring your product reaches the right audience with the right message.</p><p>Our team of seasoned experts has helped dozens of companies successfully bring innovative products to market across various industries.</p>',
    '[
        {
            "icon": "trending-up",
            "title": "Market Strategy",
            "description": "Develop comprehensive go-to-market strategies tailored to your product"
        },
        {
            "icon": "users",
            "title": "Audience Targeting",
            "description": "Identify and reach your ideal customer segments"
        },
        {
            "icon": "bar-chart",
            "title": "Competitive Analysis",
            "description": "Deep dive into market landscape and competitive positioning"
        },
        {
            "icon": "zap",
            "title": "Launch Execution",
            "description": "End-to-end support from planning to post-launch optimization"
        },
        {
            "icon": "award",
            "title": "Brand Positioning",
            "description": "Craft compelling brand narratives that resonate"
        },
        {
            "icon": "check-circle",
            "title": "Success Metrics",
            "description": "Define and track KPIs to measure launch success"
        }
    ]'::jsonb,
    '{
        "model": "project-based",
        "tiers": [
            {
                "name": "Strategy Sprint",
                "price": "$15,000",
                "features": ["2-week engagement", "Market research", "GTM strategy document", "Launch roadmap"],
                "cta": "Book Consultation"
            },
            {
                "name": "Full Launch",
                "price": "$50,000",
                "features": ["3-month engagement", "Complete GTM strategy", "Launch execution support", "Post-launch optimization"],
                "cta": "Book Consultation"
            },
            {
                "name": "Ongoing Partnership",
                "price": "Custom",
                "features": ["Long-term engagement", "Continuous optimization", "Dedicated team", "Quarterly strategy reviews"],
                "cta": "Contact Sales"
            }
        ]
    }'::jsonb,
    '{
        "hero": "/images/services/go-to-market-expert-hero.jpg",
        "gallery": []
    }'::jsonb,
    'trending-up',
    'consulting',
    6,
    true,
    'Go-to-Market Consulting | Kingsforth',
    'Strategic guidance for product launch success. Expert go-to-market consulting from research to execution.'
);

-- Verify the inserts
SELECT slug, title, is_published, order_index FROM services ORDER BY order_index;
