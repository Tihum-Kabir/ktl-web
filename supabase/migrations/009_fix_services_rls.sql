-- =============================================
-- Migration 009: Fix Services RLS Recursion
-- Disable RLS on services table to avoid recursive policy issues
-- =============================================

-- Drop existing services policies that cause recursion
DROP POLICY IF EXISTS services_select_public ON services;
DROP POLICY IF EXISTS services_select_admin ON services;
DROP POLICY IF EXISTS services_insert ON services;
DROP POLICY IF EXISTS services_update ON services;
DROP POLICY IF EXISTS services_delete ON services;

-- Temporarily DISABLE RLS on services table
-- This allows super admins to manage services without recursion errors
ALTER TABLE services DISABLE ROW LEVEL SECURITY;

-- =============================================
-- IMPORTANT NOTES:
-- =============================================
-- 1. This disables RLS on the services table entirely
-- 2. Your app code will now work correctly for service management
-- 3. Published services are still accessible via the app logic
-- 4. You should re-enable RLS later with non-recursive policies
--
-- To re-enable RLS later (after testing):
-- ALTER TABLE services ENABLE ROW LEVEL SECURITY;
-- Then create policies that don't query the users table
-- =============================================
