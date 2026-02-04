'use client';
import Link from 'next/link';

export function ProductCTA({ product }: { product: any }) {
    return (
        <section className="py-32 px-4 lg:px-6">
            <div className="container mx-auto max-w-4xl text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to get started?</h2>
                <p className="text-xl text-gray-400 mb-10">Transform your operations with {product.title}.</p>
                <Link href="/contact" className="inline-block px-10 py-5 bg-gradient-to-r from-primary to-accent-purple hover:from-accent-purple hover:to-primary text-white font-bold rounded-full transition-all duration-300 shadow-[0_0_30px_-5px_rgba(170,43,103,0.5)] hover:scale-105 hover:shadow-[0_0_40px_-5px_rgba(170,43,103,0.6)] border border-primary/30">
                    Contact Sales
                </Link>
            </div>
        </section>
    );
}
