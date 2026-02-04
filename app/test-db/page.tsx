import { createClient } from "@/lib/supabase/server";

export default async function TestPage() {
    const supabase = await createClient();

    // Test connection by fetching services
    const { data: services, error } = await supabase
        .from('services')
        .select('*')
        .limit(5);

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Supabase Connection Test</h1>

                {error ? (
                    <div className="bg-red-900/20 border border-red-500 rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-red-400 mb-2">❌ Connection Error</h2>
                        <p className="text-red-300">{error.message}</p>
                        <p className="text-sm text-gray-400 mt-4">
                            Make sure you've run the database migrations in Supabase SQL Editor.
                        </p>
                    </div>
                ) : (
                    <div className="bg-green-900/20 border border-green-500 rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-green-400 mb-4">✅ Connection Successful!</h2>
                        <p className="text-gray-300 mb-4">Found {services?.length || 0} services in database:</p>

                        {services && services.length > 0 ? (
                            <div className="space-y-4">
                                {services.map((service: any) => (
                                    <div key={service.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                                        <h3 className="font-semibold text-lg text-white">{service.name}</h3>
                                        <p className="text-gray-400 text-sm mt-1">{service.description}</p>
                                        <div className="flex items-center gap-4 mt-3">
                                            <span className="text-violet-400 font-medium">
                                                ${service.base_price}/{service.billing_period.toLowerCase()}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {Object.keys(service.features || {}).length} features
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400">
                                No services found. Run the sample data migration (002_sample_data.sql) to add services.
                            </p>
                        )}
                    </div>
                )}

                <div className="mt-8 bg-white/5 rounded-lg p-6 border border-white/10">
                    <h3 className="font-semibold text-lg mb-3">Next Steps:</h3>
                    <ol className="list-decimal list-inside space-y-2 text-gray-300">
                        <li>Go to <a href="https://app.supabase.com/project/pxzcmmgxtktipqoxmftf/sql" className="text-violet-400 hover:underline" target="_blank" rel="noopener noreferrer">Supabase SQL Editor</a></li>
                        <li>Run <code className="bg-black/50 px-2 py-1 rounded text-sm">supabase/migrations/001_initial_schema.sql</code></li>
                        <li>Run <code className="bg-black/50 px-2 py-1 rounded text-sm">supabase/migrations/002_sample_data.sql</code></li>
                        <li>Refresh this page to see the services</li>
                    </ol>
                </div>

                <div className="mt-6">
                    <a
                        href="/"
                        className="inline-block px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-lg transition-colors"
                    >
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}
