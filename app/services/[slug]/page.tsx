import { getServiceBySlug } from '@/app/actions/services';
import { notFound } from 'next/navigation';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceFeatures } from '@/components/services/ServiceFeatures';
import { ServicePricing } from '@/components/services/ServicePricing';
import { ServiceCTA } from '@/components/services/ServiceCTA';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service) {
        return {
            title: 'Service Not Found',
        };
    }

    return {
        title: service.meta_title || `${service.title} | Kingsforth`,
        description: service.meta_description || service.subtitle || service.description,
    };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service || !service.is_published) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-950">
            {/* Hero Section */}
            <ServiceHero service={service} />

            {/* Features Section */}
            <ServiceFeatures service={service} />

            {/* Pricing Section (if available) */}
            {service.pricing && service.pricing.tiers && (
                <ServicePricing service={service} />
            )}

            {/* Expertise/Trust Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Trusted, qualified expertise
                        </h2>
                        <div className="max-w-3xl mx-auto">
                            <p className="text-lg text-gray-300 leading-relaxed">
                                Kingsforth applies its complete science background and forensic analysis credentials to perform
                                thorough analysis in any format. We have provided expert solutions on
                                numerous projects and have been called upon to consult on cases in various industries.
                            </p>
                            <p className="text-lg text-violet-400 mt-6 font-medium">
                                We know we can help you meet your needs today while reducing costs going forward.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <ServiceCTA service={service} />
        </main>
    );
}
