import { Hero } from "@/components/marketing/Hero";

import { ParadigmShift } from "@/components/marketing/ParadigmShift";
import { ProductShowcase } from "@/components/marketing/ProductShowcase";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { CoreCapabilities } from "@/components/marketing/CoreCapabilities";
import { StatsSection } from "@/components/marketing/StatsSection";
import { FinalCTA } from "@/components/marketing/FinalCTA";


import { getSetting } from '@/app/actions/settings';

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const socialLinks = await getSetting('social_links');

  return (
    <>
      <main>
        <Hero socialLinks={socialLinks} />
        <ParadigmShift />
        <ProductShowcase />
        <StatsSection />
        <HowItWorks />
        <CoreCapabilities />
        <FinalCTA />
      </main>
    </>
  );
}
