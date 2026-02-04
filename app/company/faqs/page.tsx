import { getFAQs } from '@/app/actions/company';
import { FAQList } from '@/components/marketing/FAQList';
import { HelpCircle } from 'lucide-react';

export const revalidate = 0;

export default async function FAQsPage() {
  const faqs = await getFAQs();

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-12">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300 mb-6 backdrop-blur-sm">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>Support Center</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
            Frequently Asked <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-400 leading-relaxed font-light">
            Find answers about our technology, integration process, and enterprise support.
          </p>
        </div>

        <FAQList faqs={faqs} />
      </div>
    </main>
  );
}
