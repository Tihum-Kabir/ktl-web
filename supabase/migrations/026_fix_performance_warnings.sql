-- =============================================
-- Migration 026: Fix Performance Warnings (Refined & Idempotent)
-- 1. Wrap auth calls in (select ...) to avoid initplan re-evaluation
-- 2. Consolidate overlapping permissive policies
-- 3. Explicit drops for all new policy names to ensure idempotency
-- =============================================

-- HELPER: Optimizing is_super_admin check if possible, ensuring it uses safe auth check
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
DECLARE
  is_admin BOOLEAN;
BEGIN
  -- Check if the user has the SUPER_ADMIN role
  SELECT (role = 'SUPER_ADMIN') INTO is_admin
  FROM public.users
  WHERE id = auth.uid();
  
  RETURN COALESCE(is_admin, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================================
-- 1. CMS & PUBLIC TABLES
-- ==============================================================================

-- CMS ABOUT CONTENT
DROP POLICY IF EXISTS "Admins manage about" ON cms_about_content;
DROP POLICY IF EXISTS "Public view about" ON cms_about_content;
DROP POLICY IF EXISTS "cms_about_select" ON cms_about_content;
DROP POLICY IF EXISTS "cms_about_modify" ON cms_about_content;
-- Explicit drops for granular policies
DROP POLICY IF EXISTS "cms_about_insert" ON cms_about_content;
DROP POLICY IF EXISTS "cms_about_update" ON cms_about_content;
DROP POLICY IF EXISTS "cms_about_delete" ON cms_about_content;

CREATE POLICY "cms_about_select" ON cms_about_content
  FOR SELECT USING (true);

CREATE POLICY "cms_about_insert" ON cms_about_content
  FOR INSERT WITH CHECK ((SELECT public.is_super_admin()));

CREATE POLICY "cms_about_update" ON cms_about_content
  FOR UPDATE USING ((SELECT public.is_super_admin()));

CREATE POLICY "cms_about_delete" ON cms_about_content
  FOR DELETE USING ((SELECT public.is_super_admin()));


-- CMS FAQS
DROP POLICY IF EXISTS "Admins manage faqs" ON cms_faqs;
DROP POLICY IF EXISTS "Public view faqs" ON cms_faqs;
DROP POLICY IF EXISTS "cms_faqs_select" ON cms_faqs;
DROP POLICY IF EXISTS "cms_faqs_modify" ON cms_faqs;
DROP POLICY IF EXISTS "cms_faqs_insert" ON cms_faqs;
DROP POLICY IF EXISTS "cms_faqs_update" ON cms_faqs;
DROP POLICY IF EXISTS "cms_faqs_delete" ON cms_faqs;

CREATE POLICY "cms_faqs_select" ON cms_faqs
  FOR SELECT USING (true);

CREATE POLICY "cms_faqs_insert" ON cms_faqs
  FOR INSERT WITH CHECK ((SELECT public.is_super_admin()));

CREATE POLICY "cms_faqs_update" ON cms_faqs
  FOR UPDATE USING ((SELECT public.is_super_admin()));

CREATE POLICY "cms_faqs_delete" ON cms_faqs
  FOR DELETE USING ((SELECT public.is_super_admin()));


-- CMS TEAM MEMBERS
DROP POLICY IF EXISTS "Admins manage team" ON cms_team_members;
DROP POLICY IF EXISTS "Public view team" ON cms_team_members;
DROP POLICY IF EXISTS "cms_team_select" ON cms_team_members;
DROP POLICY IF EXISTS "cms_team_modify" ON cms_team_members;
DROP POLICY IF EXISTS "cms_team_insert" ON cms_team_members;
DROP POLICY IF EXISTS "cms_team_update" ON cms_team_members;
DROP POLICY IF EXISTS "cms_team_delete" ON cms_team_members;

CREATE POLICY "cms_team_select" ON cms_team_members
  FOR SELECT USING (true);

CREATE POLICY "cms_team_insert" ON cms_team_members
  FOR INSERT WITH CHECK ((SELECT public.is_super_admin()));

CREATE POLICY "cms_team_update" ON cms_team_members
  FOR UPDATE USING ((SELECT public.is_super_admin()));

CREATE POLICY "cms_team_delete" ON cms_team_members
  FOR DELETE USING ((SELECT public.is_super_admin()));


-- HOW IT WORKS STEPS
DROP POLICY IF EXISTS "Admins can manage steps" ON how_it_works_steps;
DROP POLICY IF EXISTS "Public can view steps" ON how_it_works_steps;
DROP POLICY IF EXISTS "hiw_steps_select" ON how_it_works_steps;
DROP POLICY IF EXISTS "hiw_steps_modify" ON how_it_works_steps;
DROP POLICY IF EXISTS "hiw_steps_insert" ON how_it_works_steps;
DROP POLICY IF EXISTS "hiw_steps_update" ON how_it_works_steps;
DROP POLICY IF EXISTS "hiw_steps_delete" ON how_it_works_steps;

CREATE POLICY "hiw_steps_select" ON how_it_works_steps
  FOR SELECT USING (true);

CREATE POLICY "hiw_steps_insert" ON how_it_works_steps
  FOR INSERT WITH CHECK ((SELECT public.is_super_admin()));

CREATE POLICY "hiw_steps_update" ON how_it_works_steps
  FOR UPDATE USING ((SELECT public.is_super_admin()));

CREATE POLICY "hiw_steps_delete" ON how_it_works_steps
  FOR DELETE USING ((SELECT public.is_super_admin()));


-- KNOWLEDGE BASE ARTICLES
DROP POLICY IF EXISTS kba_read_public ON knowledge_base_articles;
DROP POLICY IF EXISTS kba_admin_all ON knowledge_base_articles;
DROP POLICY IF EXISTS "kba_select" ON knowledge_base_articles;
DROP POLICY IF EXISTS "kba_modify" ON knowledge_base_articles;
DROP POLICY IF EXISTS "kba_insert" ON knowledge_base_articles;
DROP POLICY IF EXISTS "kba_update" ON knowledge_base_articles;
DROP POLICY IF EXISTS "kba_delete" ON knowledge_base_articles;

CREATE POLICY "kba_select" ON knowledge_base_articles
  FOR SELECT USING (published = true OR (SELECT public.is_super_admin()));

CREATE POLICY "kba_insert" ON knowledge_base_articles
  FOR INSERT WITH CHECK ((SELECT public.is_super_admin()));

CREATE POLICY "kba_update" ON knowledge_base_articles
  FOR UPDATE USING ((SELECT public.is_super_admin()));

CREATE POLICY "kba_delete" ON knowledge_base_articles
  FOR DELETE USING ((SELECT public.is_super_admin()));


-- PAGES
DROP POLICY IF EXISTS pages_read_public ON pages;
DROP POLICY IF EXISTS pages_admin_all ON pages;
DROP POLICY IF EXISTS "pages_select" ON pages;
DROP POLICY IF EXISTS "pages_modify" ON pages;
DROP POLICY IF EXISTS "pages_insert" ON pages;
DROP POLICY IF EXISTS "pages_update" ON pages;
DROP POLICY IF EXISTS "pages_delete" ON pages;

CREATE POLICY "pages_select" ON pages
  FOR SELECT USING (published = true OR (SELECT public.is_super_admin()));

CREATE POLICY "pages_insert" ON pages
  FOR INSERT WITH CHECK ((SELECT public.is_super_admin()));

CREATE POLICY "pages_update" ON pages
  FOR UPDATE USING ((SELECT public.is_super_admin()));

CREATE POLICY "pages_delete" ON pages
  FOR DELETE USING ((SELECT public.is_super_admin()));


-- SECTION BLOCKS
DROP POLICY IF EXISTS section_blocks_read_public ON section_blocks;
DROP POLICY IF EXISTS section_blocks_admin_all ON section_blocks;
DROP POLICY IF EXISTS "section_blocks_select" ON section_blocks;
DROP POLICY IF EXISTS "section_blocks_modify" ON section_blocks;
DROP POLICY IF EXISTS "section_blocks_insert" ON section_blocks;
DROP POLICY IF EXISTS "section_blocks_update" ON section_blocks;
DROP POLICY IF EXISTS "section_blocks_delete" ON section_blocks;

CREATE POLICY "section_blocks_select" ON section_blocks
  FOR SELECT USING (true); 

CREATE POLICY "section_blocks_insert" ON section_blocks
  FOR INSERT WITH CHECK ((SELECT public.is_super_admin()));

CREATE POLICY "section_blocks_update" ON section_blocks
  FOR UPDATE USING ((SELECT public.is_super_admin()));

CREATE POLICY "section_blocks_delete" ON section_blocks
  FOR DELETE USING ((SELECT public.is_super_admin()));


-- PARTNER LOGOS
DROP POLICY IF EXISTS partner_logos_modify ON partner_logos;
DROP POLICY IF EXISTS partner_logos_select_admin ON partner_logos;
DROP POLICY IF EXISTS partner_logos_select_public ON partner_logos;
DROP POLICY IF EXISTS "partner_logos_select" ON partner_logos;
DROP POLICY IF EXISTS "partner_logos_modify" ON partner_logos;
DROP POLICY IF EXISTS "partner_logos_insert" ON partner_logos;
DROP POLICY IF EXISTS "partner_logos_update" ON partner_logos;
DROP POLICY IF EXISTS "partner_logos_delete" ON partner_logos;

CREATE POLICY "partner_logos_select" ON partner_logos
  FOR SELECT USING (true);

CREATE POLICY "partner_logos_insert" ON partner_logos
  FOR INSERT WITH CHECK ((SELECT public.is_super_admin()));

CREATE POLICY "partner_logos_update" ON partner_logos
  FOR UPDATE USING ((SELECT public.is_super_admin()));

CREATE POLICY "partner_logos_delete" ON partner_logos
  FOR DELETE USING ((SELECT public.is_super_admin()));


-- PRODUCT FEATURES
DROP POLICY IF EXISTS "Admin write product_features" ON product_features;
DROP POLICY IF EXISTS "Public read product_features" ON product_features;
DROP POLICY IF EXISTS "product_features_select" ON product_features;
DROP POLICY IF EXISTS "product_features_modify" ON product_features;
DROP POLICY IF EXISTS "product_features_insert" ON product_features;
DROP POLICY IF EXISTS "product_features_update" ON product_features;
DROP POLICY IF EXISTS "product_features_delete" ON product_features;

CREATE POLICY "product_features_select" ON product_features
  FOR SELECT USING (true);

CREATE POLICY "product_features_insert" ON product_features
  FOR INSERT WITH CHECK ((SELECT public.is_super_admin()));

CREATE POLICY "product_features_update" ON product_features
  FOR UPDATE USING ((SELECT public.is_super_admin()));

CREATE POLICY "product_features_delete" ON product_features
  FOR DELETE USING ((SELECT public.is_super_admin()));


-- RESOURCES
DROP POLICY IF EXISTS "Admins can do everything with resources" ON resources;
DROP POLICY IF EXISTS "Public resources are viewable by everyone" ON resources;
DROP POLICY IF EXISTS "resources_select" ON resources;
DROP POLICY IF EXISTS "resources_modify" ON resources;
DROP POLICY IF EXISTS "resources_insert" ON resources;
DROP POLICY IF EXISTS "resources_update" ON resources;
DROP POLICY IF EXISTS "resources_delete" ON resources;

CREATE POLICY "resources_select" ON resources
  FOR SELECT USING (true);

CREATE POLICY "resources_insert" ON resources
  FOR INSERT WITH CHECK ((SELECT public.is_super_admin()));

CREATE POLICY "resources_update" ON resources
  FOR UPDATE USING ((SELECT public.is_super_admin()));

CREATE POLICY "resources_delete" ON resources
  FOR DELETE USING ((SELECT public.is_super_admin()));


-- SERVICES
DROP POLICY IF EXISTS services_select_admin ON services;
DROP POLICY IF EXISTS services_select_public ON services;
DROP POLICY IF EXISTS "services_select" ON services;

DROP POLICY IF EXISTS services_insert ON services;
DROP POLICY IF EXISTS services_insert_admin ON services;
DROP POLICY IF EXISTS services_update ON services;
DROP POLICY IF EXISTS services_update_admin ON services;
DROP POLICY IF EXISTS services_delete ON services;
DROP POLICY IF EXISTS services_delete_admin ON services;

-- Also drop the new names in case
DROP POLICY IF EXISTS "services_insert" ON services;
DROP POLICY IF EXISTS "services_update" ON services;
DROP POLICY IF EXISTS "services_delete" ON services;

CREATE POLICY "services_select" ON services
  FOR SELECT USING (true);

CREATE POLICY "services_insert" ON services
  FOR INSERT WITH CHECK ((SELECT public.is_super_admin()));

CREATE POLICY "services_update" ON services
  FOR UPDATE USING ((SELECT public.is_super_admin()));

CREATE POLICY "services_delete" ON services
  FOR DELETE USING ((SELECT public.is_super_admin()));


-- SITE SETTINGS
DROP POLICY IF EXISTS site_settings_modify ON site_settings;
DROP POLICY IF EXISTS site_settings_read_public ON site_settings;
DROP POLICY IF EXISTS site_settings_select ON site_settings;
DROP POLICY IF EXISTS "site_settings_select" ON site_settings;
DROP POLICY IF EXISTS "site_settings_modify" ON site_settings;
DROP POLICY IF EXISTS "site_settings_insert" ON site_settings;
DROP POLICY IF EXISTS "site_settings_update" ON site_settings;
DROP POLICY IF EXISTS "site_settings_delete" ON site_settings;

CREATE POLICY "site_settings_select" ON site_settings
  FOR SELECT USING (true);

CREATE POLICY "site_settings_insert" ON site_settings
  FOR INSERT WITH CHECK ((SELECT public.is_super_admin()));

CREATE POLICY "site_settings_update" ON site_settings
  FOR UPDATE USING ((SELECT public.is_super_admin()));

CREATE POLICY "site_settings_delete" ON site_settings
  FOR DELETE USING ((SELECT public.is_super_admin()));


-- SOLUTIONS
DROP POLICY IF EXISTS "Admins can manage solutions" ON solutions;
DROP POLICY IF EXISTS "Solutions are viewable by everyone" ON solutions;
DROP POLICY IF EXISTS "solutions_select" ON solutions;
DROP POLICY IF EXISTS "solutions_modify" ON solutions;
DROP POLICY IF EXISTS "solutions_insert" ON solutions;
DROP POLICY IF EXISTS "solutions_update" ON solutions;
DROP POLICY IF EXISTS "solutions_delete" ON solutions;

CREATE POLICY "solutions_select" ON solutions
  FOR SELECT USING (true);

CREATE POLICY "solutions_insert" ON solutions
  FOR INSERT WITH CHECK ((SELECT public.is_super_admin()));

CREATE POLICY "solutions_update" ON solutions
  FOR UPDATE USING ((SELECT public.is_super_admin()));

CREATE POLICY "solutions_delete" ON solutions
  FOR DELETE USING ((SELECT public.is_super_admin()));


-- ==============================================================================
-- 2. USER & APP TABLES
-- ==============================================================================

-- USERS
-- Ensure all old policies are dropped
DROP POLICY IF EXISTS users_select ON users;
DROP POLICY IF EXISTS users_insert ON users;
DROP POLICY IF EXISTS users_update ON users;
DROP POLICY IF EXISTS users_view_own ON users;
DROP POLICY IF EXISTS users_view_admin ON users;
DROP POLICY IF EXISTS users_update_admin ON users;
DROP POLICY IF EXISTS "users_select" ON users;
DROP POLICY IF EXISTS "users_insert" ON users;
DROP POLICY IF EXISTS "users_update" ON users;

CREATE POLICY "users_select" ON users
  FOR SELECT USING (
    (SELECT auth.uid()) = id OR
    company_id = (SELECT company_id FROM users WHERE id = (SELECT auth.uid())) OR
    (SELECT public.is_super_admin())
  );

CREATE POLICY "users_insert" ON users
  FOR INSERT WITH CHECK (
    (SELECT public.is_super_admin()) OR
    (SELECT role FROM users WHERE id = (SELECT auth.uid())) IN ('COMPANY_ADMIN')
  );

CREATE POLICY "users_update" ON users
  FOR UPDATE USING (
    (SELECT auth.uid()) = id OR
    (SELECT public.is_super_admin()) OR
    (SELECT role FROM users WHERE id = (SELECT auth.uid())) IN ('COMPANY_ADMIN')
  );


-- COMPANIES
DROP POLICY IF EXISTS companies_select ON companies;
DROP POLICY IF EXISTS companies_insert ON companies;
DROP POLICY IF EXISTS companies_update ON companies;
DROP POLICY IF EXISTS "companies_select" ON companies;
DROP POLICY IF EXISTS "companies_insert" ON companies;
DROP POLICY IF EXISTS "companies_update" ON companies;

CREATE POLICY "companies_select" ON companies
  FOR SELECT USING (
    id = (SELECT company_id FROM users WHERE id = (SELECT auth.uid())) OR
    (SELECT public.is_super_admin())
  );

CREATE POLICY "companies_insert" ON companies
  FOR INSERT WITH CHECK (
    (SELECT public.is_super_admin())
  );

CREATE POLICY "companies_update" ON companies
  FOR UPDATE USING (
    id = (SELECT company_id FROM users WHERE id = (SELECT auth.uid())) OR
    (SELECT public.is_super_admin())
  );


-- SUBSCRIPTIONS
DROP POLICY IF EXISTS subscriptions_select ON subscriptions;
DROP POLICY IF EXISTS subscriptions_insert ON subscriptions;
DROP POLICY IF EXISTS "subscriptions_select" ON subscriptions;
DROP POLICY IF EXISTS "subscriptions_insert" ON subscriptions;

CREATE POLICY "subscriptions_select" ON subscriptions
  FOR SELECT USING (
    company_id = (SELECT company_id FROM users WHERE id = (SELECT auth.uid())) OR
    (SELECT public.is_super_admin())
  );

CREATE POLICY "subscriptions_insert" ON subscriptions
  FOR INSERT WITH CHECK (
    (SELECT public.is_super_admin())
  );


-- INVOICES
DROP POLICY IF EXISTS invoices_select ON invoices;
DROP POLICY IF EXISTS "invoices_select" ON invoices;

CREATE POLICY "invoices_select" ON invoices
  FOR SELECT USING (
    subscription_id IN (
      SELECT id FROM subscriptions WHERE company_id = (SELECT company_id FROM users WHERE id = (SELECT auth.uid()))
    ) OR
    (SELECT public.is_super_admin())
  );


-- INVOICE ITEMS
DROP POLICY IF EXISTS invoice_items_select ON invoice_items;
DROP POLICY IF EXISTS "invoice_items_select" ON invoice_items;

CREATE POLICY "invoice_items_select" ON invoice_items
  FOR SELECT USING (
    invoice_id IN (
      SELECT i.id FROM invoices i
      JOIN subscriptions s ON i.subscription_id = s.id
      WHERE s.company_id = (SELECT company_id FROM users WHERE id = (SELECT auth.uid()))
    ) OR
    (SELECT public.is_super_admin())
  );


-- SUPPORT TICKETS
DROP POLICY IF EXISTS tickets_select ON support_tickets;
DROP POLICY IF EXISTS tickets_insert ON support_tickets;
DROP POLICY IF EXISTS tickets_update ON support_tickets;
DROP POLICY IF EXISTS "tickets_select" ON support_tickets;
DROP POLICY IF EXISTS "tickets_insert" ON support_tickets;
DROP POLICY IF EXISTS "tickets_update" ON support_tickets;

CREATE POLICY "tickets_select" ON support_tickets
  FOR SELECT USING (
    company_id = (SELECT company_id FROM users WHERE id = (SELECT auth.uid())) OR
    (SELECT public.is_super_admin()) OR
    (SELECT role FROM users WHERE id = (SELECT auth.uid())) = 'STAFF'
  );

CREATE POLICY "tickets_insert" ON support_tickets
  FOR INSERT WITH CHECK (
    company_id = (SELECT company_id FROM users WHERE id = (SELECT auth.uid()))
  );

CREATE POLICY "tickets_update" ON support_tickets
  FOR UPDATE USING (
    (SELECT role FROM users WHERE id = (SELECT auth.uid())) IN ('STAFF', 'SUPER_ADMIN')
  );


-- TICKET MESSAGES
DROP POLICY IF EXISTS ticket_messages_select ON ticket_messages;
DROP POLICY IF EXISTS ticket_messages_insert ON ticket_messages;
DROP POLICY IF EXISTS "ticket_messages_select" ON ticket_messages;
DROP POLICY IF EXISTS "ticket_messages_insert" ON ticket_messages;

CREATE POLICY "ticket_messages_select" ON ticket_messages
  FOR SELECT USING (
    ticket_id IN (
      SELECT id FROM support_tickets WHERE company_id = (SELECT company_id FROM users WHERE id = (SELECT auth.uid()))
    ) OR
    (SELECT public.is_super_admin()) OR
    (SELECT role FROM users WHERE id = (SELECT auth.uid())) = 'STAFF'
  );

CREATE POLICY "ticket_messages_insert" ON ticket_messages
  FOR INSERT WITH CHECK (
    ticket_id IN (
      SELECT id FROM support_tickets WHERE company_id = (SELECT company_id FROM users WHERE id = (SELECT auth.uid()))
    ) OR
    (SELECT public.is_super_admin()) OR
    (SELECT role FROM users WHERE id = (SELECT auth.uid())) = 'STAFF'
  );


-- ANALYTICS
DROP POLICY IF EXISTS analytics_select ON analytics;
DROP POLICY IF EXISTS "analytics_select" ON analytics;

CREATE POLICY "analytics_select" ON analytics
  FOR SELECT USING (
    company_id = (SELECT company_id FROM users WHERE id = (SELECT auth.uid())) OR
    (SELECT public.is_super_admin())
  );


-- LEADS
DROP POLICY IF EXISTS leads_select ON leads;
DROP POLICY IF EXISTS "leads_select" ON leads;

CREATE POLICY "leads_select" ON leads
  FOR SELECT USING (
    (SELECT public.is_super_admin())
  );


-- AUDIT LOGS
DROP POLICY IF EXISTS audit_logs_select ON audit_logs;
DROP POLICY IF EXISTS "audit_logs_select" ON audit_logs;

CREATE POLICY "audit_logs_select" ON audit_logs
  FOR SELECT USING (
    (SELECT public.is_super_admin())
  );
