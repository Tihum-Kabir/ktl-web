import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kingsforth - Intelligence Systems for Critical Response",
  description: "Real-time incident detection, facility-wide situational awareness, and intelligent response workflows for education, corporate, and government sectors.",
};

import { getSetting } from "@/app/actions/settings";
import StarfallBackground from "@/components/ui/StarfallBackground";
import { SiteWrapper } from "@/components/layout/SiteWrapper";
import { getUser } from "@/app/actions/auth";
import { getPublishedServices } from "@/app/actions/services";
import { getPublishedSolutions } from "@/app/actions/solutions";
import { getPublishedResources } from "@/app/actions/resources";
import LaserCursor from '@/components/ui/LaserCursor';
import { ThemeProvider } from "@/components/theme-provider";

// ...

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch global data for navigation
  const user = await getUser();
  const services = await getPublishedServices();
  const solutions = await getPublishedSolutions();
  const resources = await getPublishedResources();
  const logoSetting = await getSetting('logo');
  const logoUrl = logoSetting?.url || null;

  const footerLogoSetting = await getSetting('footer_logo');
  const footerLogoUrl = footerLogoSetting?.url || null; // Kept for consistency if needed later

  const socialLinksPromise = getSetting('social_links');
  const socialLinks = await socialLinksPromise || {};

  const contactInfoPromise = getSetting('contact_info');
  const contactInfo = await contactInfoPromise || {};

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} font-sans antialiased bg-background text-foreground transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <StarfallBackground />
          <div className="relative z-10">
            <SiteWrapper
              user={user}
              services={services}
              solutions={solutions}
              resources={resources}
              logoUrl={logoUrl}
              socialLinks={socialLinks}
              contactInfo={contactInfo}
            >
              {children}
            </SiteWrapper>
          </div>
          <LaserCursor />
        </ThemeProvider>
      </body>
    </html>
  );
}
