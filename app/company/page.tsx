import Link from 'next/link';
import { Users, Mail, HelpCircle, Info } from 'lucide-react';
import Image from 'next/image';

const companyItems = [
    {
        title: 'About Us',
        description: 'Learn about our mission, vision, and values.',
        href: '/company/about',
        icon: Info,
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80',
    },
    {
        title: 'Our Team',
        description: 'Meet the experts behind our technology.',
        href: '/company/team',
        icon: Users,
        image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80',
    },
    {
        title: 'Contact Us',
        description: 'Get in touch with our sales and support teams.',
        href: '/contact',
        icon: Mail,
        image: 'https://images.unsplash.com/photo-1423666639041-f14d70fa4c5d?auto=format&fit=crop&q=80',
    },
    {
        title: 'FAQs',
        description: 'Frequently asked questions about our platform.',
        href: '/company/faqs',
        icon: HelpCircle,
        image: 'https://images.unsplash.com/photo-1633613286991-611fe299c4be?auto=format&fit=crop&q=80',
    },
];

export default function CompanyPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-8 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[#061632]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-violet-200 mb-6 uppercase tracking-wider">
                        Our Company
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Building the future of intelligent response systems. Explore who we are and what drives us.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {companyItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className="group relative h-[300px] rounded-2xl overflow-hidden border border-white/10 hover:border-violet-500/50 transition-all duration-500 shadow-2xl shadow-black/50"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-[#061632]/80 group-hover:bg-[#061632]/60 transition-colors duration-500" />
                                </div>

                                {/* Content */}
                                <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-violet-600/20 transition-all duration-300 border border-white/10 group-hover:border-violet-500/30">
                                        <Icon className="w-8 h-8 text-white group-hover:text-violet-300 transition-colors" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-3 uppercase tracking-wide group-hover:text-cyan-200 transition-colors">
                                        {item.title}
                                    </h2>
                                    <p className="text-gray-300 group-hover:text-white transition-colors">
                                        {item.description}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
