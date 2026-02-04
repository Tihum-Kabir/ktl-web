-- Make fktihum03@gmail.com a SUPER_ADMIN
-- Run this in Supabase SQL Editor after the user signs up

-- First, get the user's UUID from auth.users
-- Then insert into users table with SUPER_ADMIN role

-- This will be run automatically via a trigger when user signs up
-- But for existing user, run this manually:

INSERT INTO users (id, email, role, name)
SELECT 
  id,
  email,
  'SUPER_ADMIN'::user_role,
  'Super Admin'
FROM auth.users
WHERE email = 'fktihum03@gmail.com'
ON CONFLICT (id) 
DO UPDATE SET role = 'SUPER_ADMIN'::user_role;
