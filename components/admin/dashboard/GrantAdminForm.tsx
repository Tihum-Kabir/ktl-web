'use client';

import { useState } from 'react';
import { grantSuperAdmin } from '@/app/actions/users';
import { Shield, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export function GrantAdminForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        setMessage('');

        const result = await grantSuperAdmin(email);

        if (result.error) {
            setStatus('error');
            setMessage(result.error);
        } else {
            setStatus('success');
            setMessage(result.success || 'User promoted successfully!');
            setEmail('');
        }
    };

    return (
        <div className="relative group overflow-hidden bg-white dark:bg-gradient-to-br dark:from-[#0A0A0A] dark:to-[#111111] border border-gray-200 dark:border-white/5 rounded-xl p-6 hover:border-violet-500/20 dark:hover:border-white/20 transition-all duration-300 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-violet-100 dark:bg-violet-600/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Grant Admin Access</h3>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Promote a user to Super Admin by email. They must already have an account.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="email"
                        placeholder="user@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === 'loading'}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === 'loading' || !email}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-violet-500/25"
                >
                    {status === 'loading' ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Promoting...
                        </>
                    ) : (
                        'Grant Access'
                    )}
                </button>

                {message && (
                    <div className={`flex items-start gap-2 text-xs p-3 rounded-lg border ${status === 'error'
                        ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-200'
                        : 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-200'
                        }`}>
                        {status === 'error' ? (
                            <AlertCircle className="w-4 h-4 shrink-0" />
                        ) : (
                            <CheckCircle className="w-4 h-4 shrink-0" />
                        )}
                        <span>{message}</span>
                    </div>
                )}
            </form>
        </div>
    );
}
