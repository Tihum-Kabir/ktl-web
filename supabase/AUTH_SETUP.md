# Run These SQL Migrations in Supabase

## Step 1: Run the Auth Trigger (Required)

This creates a trigger that automatically creates a user profile when someone signs up, and automatically makes `fktihum03@gmail.com` a SUPER_ADMIN.

**File**: `supabase/migrations/004_auth_trigger.sql`

Copy and paste this into Supabase SQL Editor and run it:

```sql
-- Trigger to automatically create user profile when someone signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    CASE 
      WHEN NEW.email = 'fktihum03@gmail.com' THEN 'SUPER_ADMIN'::user_role
      ELSE 'STAFF'::user_role
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Step 2: Make Existing User Super Admin (If Already Signed Up)

If you've already created the account `fktihum03@gmail.com`, run this to make it a super admin:

**File**: `supabase/migrations/003_make_super_admin.sql`

```sql
-- Make fktihum03@gmail.com a SUPER_ADMIN
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
```

## What This Does

1. **Auth Trigger**: Automatically creates a user profile in the `users` table when someone signs up
2. **Super Admin Detection**: Automatically gives `fktihum03@gmail.com` the SUPER_ADMIN role
3. **Default Role**: All other users get the STAFF role by default

## After Running These Migrations

1. Go to `http://localhost:3000`
2. Click "Login" in the navigation
3. Sign in with:
   - Email: `fktihum03@gmail.com`
   - Password: `ktl-database26`
4. You'll be redirected to the home page
5. Scroll to the footer - you should see a **🔐 Admin Portal** button
6. Click it to access the full admin dashboard

## Troubleshooting

If the Admin Portal button doesn't show:
1. Make sure you ran both SQL migrations
2. Sign out and sign in again
3. Check the database: `SELECT * FROM users WHERE email = 'fktihum03@gmail.com';`
4. The `role` column should show `SUPER_ADMIN`
