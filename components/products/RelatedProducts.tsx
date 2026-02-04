'use client';
import Link from 'next/link';
import Image from 'next/image';

export function RelatedProducts({ products }: { products: any[] }) {
    return (
        <section className="py-24 px-4 lg:px-6 border-t border-white/5">
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold text-white mb-12">Related Products</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <Link key={product.id} href={`/product/${product.slug}`} className="group block bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 hover:border-violet-500/50 transition-all">
                            <div className="aspect-video relative bg-black">
                                {product.hero_image && (
                                    <Image
                                        src={product.hero_image}
                                        alt={product.title}
                                        fill
                                        className="object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                                    />
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
                                <p className="text-sm text-gray-400 line-clamp-2">{product.subtitle}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
