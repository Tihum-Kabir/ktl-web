-- =============================================
-- Migration 028: Fix Infinite Recursion in RLS
-- =============================================

-- PROBLEM:
-- The `users` policy checks `company_id = (SELECT company_id FROM users ...)`
-- This recursive query on the same table triggers the policy again, forever.

-- SOLUTION:
-- Use SECURITY DEFINER functions to look up the current user's metadata.
-- These functions run with the creator's permissions, bypassing RLS for the lookup.

-- 1. Helper: Get Current User's Role
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS user_role AS $$
DECLARE
  my_role user_role;
BEGIN
  SELECT role INTO my_role
  FROM public.users
  WHERE id = auth.uid();
  RETURN my_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Helper: Get Current User's Company ID
CREATE OR REPLACE FUNCTION public.get_my_company_id()
RETURNS UUID AS $$
DECLARE
  my_company_id UUID;
BEGIN
  SELECT company_id INTO my_company_id
  FROM public.users
  WHERE id = auth.uid();
  RETURN my_company_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 3. Refactor Policies using safe lookups

-- Drop existing policies causing recursion
DROP POLICY IF EXISTS "users_select" ON users;
DROP POLICY IF EXISTS "users_insert" ON users;
DROP POLICY IF EXISTS "users_update" ON users;

-- Re-create `users_select`
CREATE POLICY "users_select" ON users
  FOR SELECT USING (
    auth.uid() = id OR                                 -- I can see myself
    company_id = public.get_my_company_id() OR         -- My company colleagues (Safe lookup)
    public.is_super_admin()                            -- Super Admin (Safe lookup)
  );

-- Re-create `users_insert`
-- Note: inserting users usually restricted, but existing logic allowed admins or self-registration logic?
-- Keeping logic consistent with 026 but safe.
CREATE POLICY "users_insert" ON users
  FOR INSERT WITH CHECK (
    public.is_super_admin() OR
    public.get_my_role() = 'COMPANY_ADMIN'::user_role
  );

-- Re-create `users_update`
CREATE POLICY "users_update" ON users
  FOR UPDATE USING (
    auth.uid() = id OR
    public.is_super_admin() OR
    public.get_my_role() = 'COMPANY_ADMIN'::user_role
  );

-- 4. Also fix Companies policies which might have similar issues if they query users
-- Companies select: id = (SELECT company_id FROM users ...) -> Accessing users uses safe function?
-- Actually, accessing OTHER tables is usually fine, but if that other table (users) has a policy checking COMPANIES, it loops.
-- users -> companies -> users -> ...
-- Best to be safe and use helper in companies/subscriptions too.

DROP POLICY IF EXISTS "companies_select" ON companies;
CREATE POLICY "companies_select" ON companies
  FOR SELECT USING (
    id = public.get_my_company_id() OR
    public.is_super_admin()
  );

DROP POLICY IF EXISTS "companies_update" ON companies;
CREATE POLICY "companies_update" ON companies
  FOR UPDATE USING (
    id = public.get_my_company_id() OR
    public.is_super_admin()
  );

-- Safe Subscriptions
DROP POLICY IF EXISTS "subscriptions_select" ON subscriptions;
CREATE POLICY "subscriptions_select" ON subscriptions
  FOR SELECT USING (
    company_id = public.get_my_company_id() OR
    public.is_super_admin()
  );

-- Safe Invoices
DROP POLICY IF EXISTS "invoices_select" ON invoices;
CREATE POLICY "invoices_select" ON invoices
  FOR SELECT USING (
    subscription_id IN (
      SELECT id FROM subscriptions WHERE company_id = public.get_my_company_id()
    ) OR
    public.is_super_admin()
  );
