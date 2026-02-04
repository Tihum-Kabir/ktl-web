import { getTeamMembers } from '@/app/actions/company';
import { Linkedin, Twitter, Users } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

export default async function TeamPage() {
    const team = await getTeamMembers();

    return (
        <main className="min-h-screen bg-black text-white pt-24 pb-20 overflow-hidden">
            {/* Background Effects */}
            <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-[120px] opacity-50"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12">
                <div className="text-center mb-24 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-8 break-words">
                        The Minds Behind <br />
                        <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                            The Machine
                        </span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-gray-400 leading-relaxed font-light">
                        Expertise ranging from cognitive AI to autonomous hardware, united by a mission to secure the future.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {team.map((member, index) => (
                        <div key={member.id} className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-violet-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10 blur-xl"></div>

                            <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 transition-all duration-300 group-hover:-translate-y-2 group-hover:border-violet-500/30 overflow-hidden">
                                {/* Image */}
                                <div className="w-32 h-32 mx-auto mb-8 relative rounded-full p-1 bg-gradient-to-br from-white/10 to-transparent group-hover:from-violet-500 group-hover:to-cyan-500 transition-colors duration-500">
                                    <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                                        {member.image_url ? (
                                            <img src={member.image_url} alt={member.name} className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-white/5">
                                                <Users className="w-10 h-10 text-gray-600" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                                    <p className="text-violet-400 font-medium mb-4 text-sm uppercase tracking-wider">{member.role}</p>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 h-20 overflow-y-auto no-scrollbar">
                                        {member.bio}
                                    </p>

                                    {/* Socials */}
                                    <div className="flex justify-center gap-4">
                                        {member.social_linkedin && (
                                            <a href={member.social_linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-[#0077b5] hover:text-white transition-colors text-gray-400">
                                                <Linkedin className="w-4 h-4" />
                                            </a>
                                        )}
                                        {member.social_twitter && (
                                            <a href={member.social_twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-[#1DA1F2] hover:text-white transition-colors text-gray-400">
                                                <Twitter className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
