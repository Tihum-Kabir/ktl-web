import Link from 'next/link';
import { ContactForm } from '@/components/marketing/ContactForm';

export default async function ContactPage() {

    return (
        <main className="min-h-screen bg-background text-foreground pt-32 pb-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0">
                <div className="absolute top-20 left-20 w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-8">
                <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Contact Us</h1>
                <p className="text-xl text-gray-400 mb-12 max-w-2xl">
                    Ready to transform your critical operations? Get in touch with our team of experts to discuss your needs.
                </p>

                <ContactForm />

                <div className="mt-12 text-center">
                    <Link
                        href="/"
                        className="text-gray-500 hover:text-white transition-colors text-sm"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </main>
    );
}
