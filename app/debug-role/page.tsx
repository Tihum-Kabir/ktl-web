import { createClient } from '@/lib/supabase/server';

export default async function DebugRolePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return <div className="p-10 text-white">Not logged in</div>;
    }

    // Attempt to read profile
    const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

    // Attempt to check boolean function
    const { data: isSuper, error: funcError } = await supabase
        .rpc('is_super_admin');

    return (
        <div className="min-h-screen bg-black text-white p-10 font-mono space-y-6">
            <h1 className="text-2xl font-bold text-violet-400">Role Debugger</h1>

            <div className="border border-white/20 p-4 rounded">
                <h2 className="text-xl font-bold mb-2">Auth User</h2>
                <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>

            <div className="border border-white/20 p-4 rounded">
                <h2 className="text-xl font-bold mb-2">Public User Profile (RLS Check)</h2>
                {profileError ? (
                    <div className="text-red-400">Error: {profileError.message}</div>
                ) : (
                    <pre>{JSON.stringify(profile, null, 2)}</pre>
                )}
            </div>

            <div className="border border-white/20 p-4 rounded">
                <h2 className="text-xl font-bold mb-2">is_super_admin() RPC</h2>
                {funcError ? (
                    <div className="text-red-400">Error: {funcError.message}</div>
                ) : (
                    <div className="text-xl">{String(isSuper)}</div>
                )}
            </div>
        </div>
    );
}
