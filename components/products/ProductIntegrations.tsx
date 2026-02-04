'use client';

export function ProductIntegrations({ product }: { product: any }) {
    if (!product.integrations || product.integrations.length === 0) return null;

    return (
        <section className="py-24 px-4 lg:px-6">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Seamless Integrations</h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {product.integrations.map((integration: string, index: number) => (
                        <div key={index} className="px-6 py-3 bg-white/5 rounded-full border border-white/10 text-gray-300">
                            {integration}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
