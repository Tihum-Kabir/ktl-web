-- =============================================
-- Migration 012: Proper Fix for RLS Recursion
-- Implements SECURITY DEFINER function to safely check roles
-- =============================================

-- 1. Create a secure function to check admin status
-- SECURITY DEFINER means this runs with the privileges of the function creator (admin)
-- avoiding the infinite recursion loop when querying the users table
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public -- Secure search path
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM users
    WHERE id = auth.uid()
    AND role = 'SUPER_ADMIN'
  );
END;
$$;

-- 2. Re-enable RLS on services table
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing potentially broken policies
DROP POLICY IF EXISTS services_select_public ON services;
DROP POLICY IF EXISTS services_select_admin ON services;
DROP POLICY IF EXISTS services_insert ON services;
DROP POLICY IF EXISTS services_update ON services;
DROP POLICY IF EXISTS services_delete ON services;

-- 4. Create new safe policies using the helper function

-- Public read access for published services
CREATE POLICY services_select_public ON services
    FOR SELECT USING (is_published = true);

-- Admin full access using the secure function
CREATE POLICY services_select_admin ON services
    FOR SELECT USING (is_super_admin());

CREATE POLICY services_insert_admin ON services
    FOR INSERT WITH CHECK (is_super_admin());

CREATE POLICY services_update_admin ON services
    FOR UPDATE USING (is_super_admin());

CREATE POLICY services_delete_admin ON services
    FOR DELETE USING (is_super_admin());

-- 5. Also fix users table RLS if needed (optional but good practice)
-- Re-enabling RLS on users table which was disabled in migration 007
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS users_select ON users;
DROP POLICY IF EXISTS users_select_own ON users;
DROP POLICY IF EXISTS users_select_admin ON users;

-- Users can view themselves
CREATE POLICY users_view_own ON users
    FOR SELECT USING (auth.uid() = id);

-- Admin can view all users (using secure function to avoid recursion)
CREATE POLICY users_view_admin ON users
    FOR SELECT USING (is_super_admin());

-- Admin can update users
CREATE POLICY users_update_admin ON users
    FOR UPDATE USING (is_super_admin());
