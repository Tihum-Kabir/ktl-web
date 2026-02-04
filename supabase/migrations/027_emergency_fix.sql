-- =============================================
-- EMERGENCY FIX: Restore Admin Access
-- Run this in Supabase SQL Editor immediately
-- =============================================

-- 1. Create the missing function that is causing access denied errors
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

-- 2. Force the user fktihum03@gmail.com to be SUPER_ADMIN
INSERT INTO users (id, email, role, name)
SELECT 
    id,
    email,
    'SUPER_ADMIN'::user_role,
    COALESCE(raw_user_meta_data->>'name', 'Super Admin')
FROM auth.users 
WHERE email = 'fktihum03@gmail.com'
ON CONFLICT (id) 
DO UPDATE SET 
    role = 'SUPER_ADMIN'::user_role,
    updated_at = NOW();

-- 3. Verify it worked
SELECT email, role FROM users WHERE email = 'fktihum03@gmail.com';
