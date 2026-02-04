-- =============================================
-- Kingsforth Platform - Database Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- ===== ENUMS =====
CREATE TYPE user_role AS ENUM ('SUPER_ADMIN', 'COMPANY_ADMIN', 'STAFF');
CREATE TYPE subscription_status AS ENUM ('ACTIVE', 'CANCELLED', 'TRIAL');
CREATE TYPE billing_period AS ENUM ('MONTHLY', 'ANNUAL');
CREATE TYPE invoice_status AS ENUM ('DRAFT', 'SENT', 'PAID', 'OVERDUE');
CREATE TYPE ticket_status AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED');

-- ===== CORE ENTITIES =====

-- Companies (create first as it's referenced by users)
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  industry TEXT,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users (extends Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'STAFF',
  company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  phone TEXT,
  two_fa_secret TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services (catalog)
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  base_price DECIMAL(10,2) NOT NULL,
  billing_period billing_period NOT NULL,
  features JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
  status subscription_status NOT NULL DEFAULT 'TRIAL',
  start_date DATE NOT NULL,
  end_date DATE,
  next_billing_date DATE,
  users_allowed INT DEFAULT 5,
  custom_price DECIMAL(10,2),
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invoices
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
  billing_period_start DATE NOT NULL,
  billing_period_end DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  vat DECIMAL(10,2) DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  status invoice_status NOT NULL DEFAULT 'DRAFT',
  pdf_url TEXT,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ,
  stripe_invoice_id TEXT
);

-- Invoice Items
CREATE TABLE invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL
);

-- Analytics (daily aggregates)
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  page_views INT DEFAULT 0,
  unique_visitors INT DEFAULT 0,
  service_usage JSONB,
  UNIQUE(company_id, date)
);

-- Support Tickets
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status ticket_status NOT NULL DEFAULT 'OPEN',
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ticket Messages
CREATE TABLE ticket_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Knowledge Base
CREATE TABLE knowledge_base_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== CMS TABLES =====

-- Site Settings (global config)
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pages (CMS)
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  meta_description TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Section Blocks (page content)
CREATE TABLE section_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  props JSONB,
  pattern_preset TEXT,
  sort_order INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Media Assets
CREATE TABLE media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL,
  size_bytes BIGINT,
  uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads (demo requests)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  message TEXT,
  source TEXT,
  status TEXT DEFAULT 'NEW',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Log
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  changes JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== INDEXES =====
CREATE INDEX idx_users_company ON users(company_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_subscriptions_company ON subscriptions(company_id);
CREATE INDEX idx_subscriptions_stripe ON subscriptions(stripe_subscription_id);
CREATE INDEX idx_invoices_subscription ON invoices(subscription_id);
CREATE INDEX idx_invoices_stripe ON invoices(stripe_invoice_id);
CREATE INDEX idx_tickets_company ON support_tickets(company_id);
CREATE INDEX idx_tickets_assigned ON support_tickets(assigned_to);
CREATE INDEX idx_tickets_status ON support_tickets(status);
CREATE INDEX idx_analytics_company_date ON analytics(company_id, date);
CREATE INDEX idx_section_blocks_page ON section_blocks(page_id, sort_order);
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_email ON leads(email);

-- Full-text search for KB
CREATE INDEX idx_kb_search ON knowledge_base_articles 
  USING gin(to_tsvector('english', title || ' ' || content));

-- ===== ROW LEVEL SECURITY (RLS) =====

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Users: can view own company users + super admin can view all
CREATE POLICY users_select ON users
  FOR SELECT USING (
    auth.uid() = id OR
    company_id = (SELECT company_id FROM users WHERE id = auth.uid()) OR
    (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
  );

CREATE POLICY users_insert ON users
  FOR INSERT WITH CHECK (
    (SELECT role FROM users WHERE id = auth.uid()) IN ('SUPER_ADMIN', 'COMPANY_ADMIN')
  );

CREATE POLICY users_update ON users
  FOR UPDATE USING (
    auth.uid() = id OR
    (SELECT role FROM users WHERE id = auth.uid()) IN ('SUPER_ADMIN', 'COMPANY_ADMIN')
  );

-- Companies: can view own company + super admin can view all
CREATE POLICY companies_select ON companies
  FOR SELECT USING (
    id = (SELECT company_id FROM users WHERE id = auth.uid()) OR
    (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
  );

CREATE POLICY companies_insert ON companies
  FOR INSERT WITH CHECK (
    (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
  );

CREATE POLICY companies_update ON companies
  FOR UPDATE USING (
    id = (SELECT company_id FROM users WHERE id = auth.uid()) OR
    (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
  );

-- Subscriptions: company users + super admin
CREATE POLICY subscriptions_select ON subscriptions
  FOR SELECT USING (
    company_id = (SELECT company_id FROM users WHERE id = auth.uid()) OR
    (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
  );

CREATE POLICY subscriptions_insert ON subscriptions
  FOR INSERT WITH CHECK (
    (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
  );

-- Invoices: company users + super admin
CREATE POLICY invoices_select ON invoices
  FOR SELECT USING (
    subscription_id IN (
      SELECT id FROM subscriptions WHERE company_id = (SELECT company_id FROM users WHERE id = auth.uid())
    ) OR
    (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
  );

-- Invoice Items: same as invoices
CREATE POLICY invoice_items_select ON invoice_items
  FOR SELECT USING (
    invoice_id IN (
      SELECT i.id FROM invoices i
      JOIN subscriptions s ON i.subscription_id = s.id
      WHERE s.company_id = (SELECT company_id FROM users WHERE id = auth.uid())
    ) OR
    (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
  );

-- Support Tickets: company users + staff + super admin
CREATE POLICY tickets_select ON support_tickets
  FOR SELECT USING (
    company_id = (SELECT company_id FROM users WHERE id = auth.uid()) OR
    (SELECT role FROM users WHERE id = auth.uid()) IN ('STAFF', 'SUPER_ADMIN')
  );

CREATE POLICY tickets_insert ON support_tickets
  FOR INSERT WITH CHECK (
    company_id = (SELECT company_id FROM users WHERE id = auth.uid())
  );

CREATE POLICY tickets_update ON support_tickets
  FOR UPDATE USING (
    (SELECT role FROM users WHERE id = auth.uid()) IN ('STAFF', 'SUPER_ADMIN')
  );

-- Ticket Messages: ticket participants + staff + super admin
CREATE POLICY ticket_messages_select ON ticket_messages
  FOR SELECT USING (
    ticket_id IN (
      SELECT id FROM support_tickets WHERE company_id = (SELECT company_id FROM users WHERE id = auth.uid())
    ) OR
    (SELECT role FROM users WHERE id = auth.uid()) IN ('STAFF', 'SUPER_ADMIN')
  );

CREATE POLICY ticket_messages_insert ON ticket_messages
  FOR INSERT WITH CHECK (
    ticket_id IN (
      SELECT id FROM support_tickets WHERE company_id = (SELECT company_id FROM users WHERE id = auth.uid())
    ) OR
    (SELECT role FROM users WHERE id = auth.uid()) IN ('STAFF', 'SUPER_ADMIN')
  );

-- Analytics: company users + super admin
CREATE POLICY analytics_select ON analytics
  FOR SELECT USING (
    company_id = (SELECT company_id FROM users WHERE id = auth.uid()) OR
    (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
  );

-- Leads: super admin only
CREATE POLICY leads_select ON leads
  FOR SELECT USING (
    (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
  );

CREATE POLICY leads_insert ON leads
  FOR INSERT WITH CHECK (true); -- Anyone can submit a lead (public form)

-- Audit Logs: super admin only
CREATE POLICY audit_logs_select ON audit_logs
  FOR SELECT USING (
    (SELECT role FROM users WHERE id = auth.uid()) = 'SUPER_ADMIN'
  );

-- Public tables (no RLS needed for read)
-- knowledge_base_articles (when published)
-- pages, section_blocks, site_settings (public marketing content)

-- ===== FUNCTIONS =====

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON support_tickets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_knowledge_base_articles_updated_at BEFORE UPDATE ON knowledge_base_articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
