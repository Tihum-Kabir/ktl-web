import { getUser } from '@/app/actions/auth';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function DebugPage() {
    const user = await getUser();

    if (!user) {
        redirect('/login');
    }

    const supabase = await createClient();

    // Get raw data from users table
    const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold">User Debug Info</h1>

                <div className="bg-slate-900 border border-white/10 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">getUser() Result</h2>
                    <pre className="bg-slate-950 p-4 rounded overflow-auto text-sm">
                        {JSON.stringify(user, null, 2)}
                    </pre>
                </div>

                <div className="bg-slate-900 border border-white/10 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Direct Database Query</h2>
                    {error ? (
                        <div className="text-red-400">Error: {error.message}</div>
                    ) : (
                        <pre className="bg-slate-950 p-4 rounded overflow-auto text-sm">
                            {JSON.stringify(userData, null, 2)}
                        </pre>
                    )}
                </div>

                <div className="bg-slate-900 border border-white/10 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Role Check</h2>
                    <div className="space-y-2">
                        <p>user.role: <span className="text-cyan-400">{user.role || 'undefined'}</span></p>
                        <p>Is SUPER_ADMIN: <span className="text-cyan-400">{user.role === 'SUPER_ADMIN' ? 'YES ✅' : 'NO ❌'}</span></p>
                        <p>userData.role: <span className="text-cyan-400">{userData?.role || 'undefined'}</span></p>
                    </div>
                </div>

                <div className="bg-slate-900 border border-white/10 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Expected Behavior</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                        <li>user.role should be "SUPER_ADMIN"</li>
                        <li>Is SUPER_ADMIN should show "YES ✅"</li>
                        <li>If not, run the SQL in MAKE_SUPER_ADMIN_NOW.sql</li>
                        <li>After running SQL, refresh this page</li>
                    </ul>
                </div>

                <div className="flex gap-4">
                    <a
                        href="/"
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                        ← Back to Home
                    </a>
                    <a
                        href="/admin"
                        className="px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
                    >
                        Try Admin Dashboard →
                    </a>
                </div>
            </div>
        </div>
    );
}
