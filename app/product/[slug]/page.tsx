import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts } from '@/app/actions/products';
import { ProductHero } from '@/components/products/ProductHero';
import { ProductCapabilities } from '@/components/products/ProductCapabilities';
import { ProductIntegrations } from '@/components/products/ProductIntegrations';
import { ProductFAQs } from '@/components/products/ProductFAQs';
import { ProductCTA } from '@/components/products/ProductCTA';
import { RelatedProducts } from '@/components/products/RelatedProducts';
import type { Metadata } from 'next';

interface ProductPageProps {
    params: { slug: string };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const product = await getProductBySlug(params.slug);

    if (!product) {
        return {
            title: 'Product Not Found',
        };
    }

    return {
        title: product.meta_title || product.title,
        description: product.meta_description || product.subtitle || undefined,
        openGraph: {
            title: product.meta_title || product.title,
            description: product.meta_description || product.subtitle || undefined,
            images: product.og_image_url ? [product.og_image_url] : undefined,
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const product = await getProductBySlug(params.slug);

    if (!product) {
        notFound();
    }

    // Fetch related products if any
    const relatedProducts = product.related_product_ids && product.related_product_ids.length > 0
        ? await getRelatedProducts(product.related_product_ids)
        : [];

    return (
        <main className="min-h-screen bg-background text-white">
            {/* Hero with Video */}
            <ProductHero product={product} />

            {/* Capabilities */}
            <ProductCapabilities product={product} />

            {/* Integrations */}
            <ProductIntegrations product={product} />

            {/* FAQs */}
            <ProductFAQs product={product} />

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <RelatedProducts products={relatedProducts} />
            )}

            {/* CTA */}
            <ProductCTA product={product} />
        </main>
    );
}
