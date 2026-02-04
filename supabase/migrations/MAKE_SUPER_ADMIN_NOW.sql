-- =============================================
-- COMPREHENSIVE FIX: Make User Super Admin
-- Run ALL of these queries in Supabase SQL Editor
-- =============================================

-- Step 1: Check if user exists in auth.users
SELECT id, email, created_at 
FROM auth.users 
WHERE email = 'fktihum03@gmail.com';

-- Step 2: Check if user exists in users table
SELECT id, email, role, name 
FROM users 
WHERE email = 'fktihum03@gmail.com';

-- Step 3: Insert or update user to SUPER_ADMIN
-- This will work whether the user exists or not
INSERT INTO users (id, email, role, name)
SELECT 
    au.id,
    au.email,
    'SUPER_ADMIN'::user_role,
    COALESCE(au.raw_user_meta_data->>'name', 'Super Admin')
FROM auth.users au
WHERE au.email = 'fktihum03@gmail.com'
ON CONFLICT (id) 
DO UPDATE SET 
    role = 'SUPER_ADMIN'::user_role,
    email = EXCLUDED.email,
    updated_at = NOW();

-- Step 4: Verify the update
SELECT u.id, u.email, u.role, u.name, u.created_at, u.updated_at
FROM users u
WHERE u.email = 'fktihum03@gmail.com';

-- =============================================
-- Expected Result from Step 4:
-- You should see ONE row with:
-- - email: fktihum03@gmail.com
-- - role: SUPER_ADMIN
-- - updated_at: (current timestamp)
-- =============================================

-- Step 5: Also check auth.users to make sure they're linked
SELECT 
    au.id as auth_id,
    au.email as auth_email,
    u.id as user_id,
    u.email as user_email,
    u.role as user_role
FROM auth.users au
LEFT JOIN users u ON au.id = u.id
WHERE au.email = 'fktihum03@gmail.com';

-- =============================================
-- Expected Result from Step 5:
-- auth_id and user_id should be THE SAME UUID
-- user_role should be 'SUPER_ADMIN'
-- =============================================
