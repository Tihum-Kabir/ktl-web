'use client';
// Re-trigger HMR

import Link from 'next/link';
import { Shield, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

interface FooterProps {
    showAdminPortal?: boolean;
    logoUrl?: string | null;
    contactInfo?: {
        email?: string;
        phone?: string;
        address?: string;
        map_embed?: string;
    };
    socialLinks?: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
        linkedin?: string;
        youtube?: string;
    };
}

export function Footer({ showAdminPortal = false, logoUrl, socialLinks, contactInfo }: FooterProps) {
    return (
        <footer
            style={{
                background: 'rgba(10, 10, 15, 0.4)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.3)' // inverted shadow for footer
            }}
            className="border-t-0"
        >
            <div className="max-w-[1400px] mx-auto px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            {logoUrl ? (
                                <div className="h-10 w-10 relative flex items-center justify-center">
                                    <img
                                        src={logoUrl}
                                        alt="Kingsforth Logo"
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>
                            ) : (
                                <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-cyan-600 rounded-lg flex items-center justify-center">
                                    <Shield className="w-6 h-6 text-white" strokeWidth={2.5} />
                                </div>
                            )}
                            <span className="text-xl font-black tracking-tight uppercase bg-gradient-to-r from-violet-600 to-sky-500 bg-clip-text text-transparent transform scale-y-90">
                                KINGSFORTH
                            </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            Enterprise intelligence systems for critical response and threat detection.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {socialLinks?.facebook && (
                                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg text-gray-600 dark:text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                                    <Facebook className="w-5 h-5" />
                                </a>
                            )}
                            {socialLinks?.instagram && (
                                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg text-gray-600 dark:text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            )}
                            {socialLinks?.twitter && (
                                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg text-gray-600 dark:text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </a>
                            )}
                            {socialLinks?.linkedin && (
                                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg text-gray-600 dark:text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            )}
                            {socialLinks?.youtube && (
                                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg text-gray-600 dark:text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                                    <Youtube className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Solutions */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Solutions</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/solutions/education" className="text-gray-600 dark:text-gray-400 hover:text-white transition-colors text-sm">
                                    Education
                                </Link>
                            </li>
                            <li>
                                <Link href="/solutions/corporate" className="text-gray-600 dark:text-gray-400 hover:text-white transition-colors text-sm">
                                    Corporate
                                </Link>
                            </li>
                            <li>
                                <Link href="/solutions/cities-government" className="text-gray-600 dark:text-gray-400 hover:text-white transition-colors text-sm">
                                    Cities & Government
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Resources</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/resources/docs" className="text-gray-600 dark:text-gray-400 hover:text-white transition-colors text-sm">
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="/resources/case-studies" className="text-gray-600 dark:text-gray-400 hover:text-white transition-colors text-sm">
                                    Case Studies
                                </Link>
                            </li>
                            <li>
                                <Link href="/resources/blog" className="text-gray-600 dark:text-gray-400 hover:text-white transition-colors text-sm">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                <Mail className="w-4 h-4" />
                                <span>contact@kingsforth.com</span>
                            </li>
                            <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                <Phone className="w-4 h-4" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                <MapPin className="w-4 h-4" />
                                <a
                                    href={contactInfo?.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}` : '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors underline decoration-dotted underline-offset-4"
                                >
                                    View Office Location
                                </a>
                            </li>
                        </ul>

                        {/* Map Visual */}
                        {contactInfo?.map_embed && (
                            <div className="mt-6 w-full h-[200px] rounded-xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500">
                                <iframe
                                    src={contactInfo.map_embed.includes('<iframe') ? contactInfo.map_embed.match(/src="([^"]+)"/)?.[1] : contactInfo.map_embed}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © 2026 Kingsforth. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors text-sm">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-gray-500 hover:text-white transition-colors text-sm">
                            Terms of Service
                        </Link>

                        {/* Admin Portal Button - Only visible to Super Admin */}
                        {showAdminPortal && (
                            <Link
                                href="/admin"
                                className="px-4 py-2 bg-red-600/20 border border-red-500/30 hover:bg-red-600/30 text-red-400 text-sm font-medium rounded-lg transition-all duration-200"
                            >
                                🔐 Admin Portal
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}
