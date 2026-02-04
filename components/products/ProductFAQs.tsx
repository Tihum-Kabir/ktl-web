'use client';

export function ProductFAQs({ product }: { product: any }) {
    if (!product.faqs || product.faqs.length === 0) return null;

    return (
        <section className="py-24 px-4 lg:px-6 bg-tertiary/5">
            <div className="container mx-auto max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Common Questions</h2>
                <div className="space-y-6">
                    {product.faqs.map((faq: any, index: number) => (
                        <div key={index} className="p-6 bg-background rounded-xl border border-white/10">
                            <h3 className="text-lg font-bold text-white mb-2">{faq.question}</h3>
                            <p className="text-gray-400">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
