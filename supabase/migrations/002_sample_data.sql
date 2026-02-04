-- =============================================
-- Kingsforth Platform - Sample Data
-- Run this AFTER running 001_initial_schema.sql
-- =============================================

-- ===== SERVICES (Volt-inspired catalog) =====

INSERT INTO services (name, description, base_price, billing_period, features) VALUES
(
  'Real-Time Incident Detection',
  'AI-powered threat detection with instant alerts and mobile notifications',
  999.00,
  'MONTHLY',
  '{"alerts": true, "ai_detection": true, "mobile_app": true, "real_time": true}'::jsonb
),
(
  'Facility-Wide Situational Awareness',
  'Interactive mapping, real-time tracking, and comprehensive analytics dashboard',
  1499.00,
  'MONTHLY',
  '{"mapping": true, "tracking": true, "analytics": true, "dashboard": true}'::jsonb
),
(
  'Education Package',
  'Complete security solution for K-12 and higher education institutions',
  2499.00,
  'MONTHLY',
  '{"perimeter": true, "weapons_detection": true, "medical_alerts": true, "vsoc": true, "education_focused": true}'::jsonb
),
(
  'Corporate Package',
  'Enterprise-grade security and emergency response workflows for businesses',
  3499.00,
  'MONTHLY',
  '{"perimeter": true, "violence_detection": true, "emergency_response": true, "analytics": true, "corporate_features": true}'::jsonb
),
(
  'Government/Cities Package',
  'Public safety and critical infrastructure protection for municipalities',
  4999.00,
  'MONTHLY',
  '{"perimeter": true, "weapons_detection": true, "medical_alerts": true, "vsoc": true, "multi_site": true, "government_compliance": true}'::jsonb
);

-- ===== SITE SETTINGS (CMS globals) =====

INSERT INTO site_settings (key, value) VALUES
('logo', '{"url": "/logo.svg", "alt": "Kingsforth"}'::jsonb),
('theme', '{"primary": "#0066FF", "secondary": "#00FFAA", "accent": "#8B5CF6"}'::jsonb),
('nav_menu', '{
  "items": [
    {
      "label": "Solutions",
      "type": "mega",
      "children": [
        {
          "label": "By Industry",
          "items": [
            {"label": "Education", "href": "/solutions/education"},
            {"label": "Corporate", "href": "/solutions/corporate"},
            {"label": "Cities & Government", "href": "/solutions/cities-gov"}
          ]
        },
        {
          "label": "By Use Case",
          "items": [
            {"label": "Perimeter Security", "href": "/solutions/perimeter"},
            {"label": "Medical Emergencies", "href": "/solutions/medical"},
            {"label": "Weapons Detection", "href": "/solutions/weapons"},
            {"label": "VSOC", "href": "/solutions/vsoc"}
          ]
        }
      ]
    },
    {
      "label": "Resources",
      "type": "mega",
      "children": [
        {"label": "Product Docs", "href": "/resources/docs"},
        {"label": "Resource Library", "href": "/resources/library"},
        {"label": "Case Studies", "href": "/resources/case-studies"},
        {"label": "Blog", "href": "/resources/blog"}
      ]
    },
    {"label": "Pricing", "href": "/pricing"},
    {"label": "Company", "href": "/company"}
  ]
}'::jsonb),
('cta_primary', '{"text": "Book a Demo", "href": "/contact"}'::jsonb),
('cta_secondary', '{"text": "Login", "href": "/login"}'::jsonb);

-- ===== KNOWLEDGE BASE ARTICLES (Sample) =====

INSERT INTO knowledge_base_articles (title, content, published) VALUES
(
  'Getting Started with Kingsforth',
  '# Getting Started

Welcome to Kingsforth! This guide will help you get started with our intelligence platform.

## Initial Setup

1. Log in to your portal
2. Configure your company profile
3. Add team members
4. Set up notification preferences

## Key Features

- Real-time threat detection
- Interactive facility mapping
- 24/7 monitoring dashboard
- Mobile alerts

For more information, contact our support team.',
  true
),
(
  'How to Create a Support Ticket',
  '# Creating a Support Ticket

Need help? Here''s how to create a support ticket:

## Steps

1. Navigate to the Support section in your portal
2. Click "New Ticket"
3. Enter a descriptive title
4. Provide detailed information about your issue
5. Click "Submit"

Our team will respond within 24 hours.',
  true
),
(
  'Understanding Your Analytics Dashboard',
  '# Analytics Dashboard Guide

Your analytics dashboard provides real-time insights into your security operations.

## Key Metrics

- **Page Views**: Total views of your portal
- **Unique Visitors**: Individual users accessing the system
- **Service Usage**: Breakdown of feature utilization

## Exporting Data

You can export your analytics data as CSV or PDF from the dashboard.',
  true
);

-- ===== PAGES (Sample marketing pages) =====

INSERT INTO pages (slug, title, meta_description, published) VALUES
(
  'home',
  'Kingsforth - Intelligence Systems for Critical Response',
  'Real-time incident detection, facility-wide situational awareness, and intelligent response workflows for education, corporate, and government sectors.',
  true
),
(
  'solutions-education',
  'Education Security Solutions',
  'Comprehensive security solutions for K-12 and higher education institutions with real-time threat detection and response.',
  true
),
(
  'solutions-corporate',
  'Corporate Security Solutions',
  'Enterprise-grade security and emergency response workflows for businesses of all sizes.',
  true
),
(
  'solutions-cities-gov',
  'Government & Cities Solutions',
  'Public safety and critical infrastructure protection for municipalities and government agencies.',
  true
);
