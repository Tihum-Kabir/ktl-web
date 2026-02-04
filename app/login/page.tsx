'use client';

import { useState } from 'react';
import { signIn, signUp } from '../actions/auth';
import Link from 'next/link';
import { Shield, Mail, Lock, User, CheckCircle } from 'lucide-react';

export default function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [verificationSent, setVerificationSent] = useState(false);
    const [verificationEmail, setVerificationEmail] = useState('');

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError('');

        const result = isSignUp ? await signUp(formData) : await signIn(formData);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
        } else if (result && 'requiresVerification' in result && result.requiresVerification) {
            // Show verification message
            setVerificationSent(true);
            setVerificationEmail(result.email || '');
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="absolute top-32 left-20 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-32 right-20 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="relative z-10 w-full max-w-md">
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-cyan-600 rounded-lg flex items-center justify-center">
                        <Shield className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-2xl font-bold text-white">Kingsforth</span>
                </Link>

                {/* Form Card */}
                <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-2xl">
                    {verificationSent ? (
                        // Email Verification Message
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-8 h-8 text-green-400" />
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-3">
                                Check Your Email
                            </h1>
                            <p className="text-gray-300 mb-6">
                                We've sent a verification email to:
                            </p>
                            <p className="text-cyan-400 font-semibold text-lg mb-8">
                                {verificationEmail}
                            </p>
                            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4 mb-6">
                                <p className="text-cyan-300 text-sm leading-relaxed">
                                    Please check your inbox and click the verification link to activate your account.
                                    Once verified, you'll be automatically signed in.
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setVerificationSent(false);
                                    setIsSignUp(false);
                                    setVerificationEmail('');
                                }}
                                className="text-gray-400 hover:text-white transition-colors text-sm"
                            >
                                Back to{' '}
                                <span className="text-violet-400 font-medium">Sign In</span>
                            </button>
                        </div>
                    ) : (
                        <>
                            <h1 className="text-3xl font-bold text-white mb-2">
                                {isSignUp ? 'Create Account' : 'Welcome Back'}
                            </h1>
                            <p className="text-gray-400 mb-8">
                                {isSignUp
                                    ? 'Sign up to access the Kingsforth platform'
                                    : 'Sign in to your account to continue'}
                            </p>

                            {error && (
                                <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                                    <p className="text-red-400 text-sm">{error}</p>
                                </div>
                            )}

                            <form action={handleSubmit} className="space-y-5">
                                {isSignUp && (
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                className="w-full pl-12 pr-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            className="w-full pl-12 pr-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => {
                                        setIsSignUp(!isSignUp);
                                        setError('');
                                    }}
                                    className="text-gray-400 hover:text-white transition-colors text-sm"
                                >
                                    {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                                    <span className="text-violet-400 font-medium">
                                        {isSignUp ? 'Sign In' : 'Sign Up'}
                                    </span>
                                </button>
                            </div>
                        </>
                    )}
                </div>

                <p className="text-center text-gray-500 text-sm mt-8">
                    By continuing, you agree to our{' '}
                    <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                        Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                        Privacy Policy
                    </Link>
                </p>
            </div>
        </div>
    );
}
