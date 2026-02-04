import Link from 'next/link';

export default async function PricingPage() {

    return (
        <main className="min-h-screen bg-background text-foreground pt-32 pb-20">
            <div className="max-w-[1400px] mx-auto px-8">
                <h1 className="text-5xl font-bold mb-6">Pricing</h1>
                <p className="text-xl text-gray-400 mb-8">Coming soon...</p>
                <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-lg transition-colors"
                >
                    ← Back to Home
                </Link>
            </div>
        </main>
    );
}
