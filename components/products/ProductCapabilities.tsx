'use client';

export function ProductCapabilities({ product }: { product: any }) {
    if (!product.capabilities || product.capabilities.length === 0) return null;

    return (
        <section className="py-24 px-4 lg:px-6 bg-zinc-950">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">Core Capabilities</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {product.capabilities.map((cap: any, index: number) => (
                        <div key={index} className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-violet-500/30 transition-colors">
                            <h3 className="text-xl font-bold text-white mb-4">{cap.title}</h3>
                            <p className="text-gray-400">{cap.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
