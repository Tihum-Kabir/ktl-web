import Link from 'next/link';

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">User Profile</h1>
                <p className="text-gray-400 mb-8">Coming soon...</p>
                <Link
                    href="/"
                    className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-lg transition-colors"
                >
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
