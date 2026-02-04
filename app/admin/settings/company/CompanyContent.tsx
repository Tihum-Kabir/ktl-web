'use client';

import { useState } from 'react';
import { Plus, Trash2, Save, MoreVertical, Search, Filter, Loader2, Upload, HelpCircle, Users, Info } from 'lucide-react';
import { createFAQ, updateFAQ, deleteFAQ, createTeamMember, updateTeamMember, deleteTeamMember, updateAboutContent } from '@/app/actions/company';
import ImageUploader from '@/components/admin/ImageUploader';

export default function CompanyContent({ initialFAQs, initialTeam, initialAbout }: { initialFAQs: any[], initialTeam: any[], initialAbout: any[] }) {
    const [activeTab, setActiveTab] = useState<'faqs' | 'team' | 'about'>('faqs');

    return (
        <div className="space-y-6">
            {/* Tabs */}
            <div className="flex p-1 bg-white/5 rounded-xl border border-white/10 w-fit">
                <button
                    onClick={() => setActiveTab('faqs')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'faqs' ? 'bg-violet-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                    <HelpCircle className="w-4 h-4" /> FAQs
                </button>
                <button
                    onClick={() => setActiveTab('team')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'team' ? 'bg-violet-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                    <Users className="w-4 h-4" /> Team
                </button>
                <button
                    onClick={() => setActiveTab('about')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'about' ? 'bg-violet-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                    <Info className="w-4 h-4" /> About Content
                </button>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 min-h-[600px]">
                {activeTab === 'faqs' && <FAQManager initialData={initialFAQs} />}
                {activeTab === 'team' && <TeamManager initialData={initialTeam} />}
                {activeTab === 'about' && <AboutManager initialData={initialAbout} />}
            </div>
        </div>
    );
}

// --- SUB COMPONENTS ---

function FAQManager({ initialData }: { initialData: any[] }) {
    const [faqs, setFaqs] = useState(initialData);
    const [isEditing, setIsEditing] = useState<string | null>(null); // ID or 'new'

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
                <button
                    onClick={() => setIsEditing('new')}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10"
                >
                    <Plus className="w-4 h-4" /> Add FAQ
                </button>
            </div>

            {isEditing === 'new' && (
                <FAQEditor
                    faq={{}}
                    onSave={async (formData: FormData) => {
                        await createFAQ(formData);
                        // Ideally re-fetch or optimistically update, for now simple reload or parent refresh needed?
                        // Since we use server actions with revalidatePath, pure client state might be stale unless we refresh.
                        // For simplicity in this "CompanyContent", we might need a refresh logic or passed down re-fetcher.
                        // Let's assume standard router.refresh() if needed, usually passed from parent or handled by state.
                        window.location.reload();
                    }}
                    onCancel={() => setIsEditing(null)}
                />
            )}

            <div className="space-y-4">
                {faqs.map(faq => (
                    isEditing === faq.id ? (
                        <FAQEditor
                            key={faq.id}
                            faq={faq}
                            onSave={async (formData: FormData) => {
                                await updateFAQ(faq.id, formData);
                                window.location.reload();
                            }}
                            onCancel={() => setIsEditing(null)}
                        />
                    ) : (
                        <div key={faq.id} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-violet-500/30 transition-colors group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-[10px] uppercase font-bold text-violet-400 mb-1 block">{faq.category}</span>
                                    <h4 className="font-medium text-white mb-2">{faq.question}</h4>
                                    <p className="text-sm text-gray-400 line-clamp-2">{faq.answer}</p>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => setIsEditing(faq.id)} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white">
                                        Edit
                                    </button>
                                    <button
                                        onClick={async () => {
                                            if (!confirm('Delete?')) return;
                                            await deleteFAQ(faq.id);
                                            window.location.reload();
                                        }}
                                        className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}

function FAQEditor({ faq, onSave, onCancel }: any) {
    const [saving, setSaving] = useState(false);
    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                setSaving(true);
                const formData = new FormData(e.currentTarget);
                await onSave(formData);
                setSaving(false);
            }}
            className="p-6 bg-slate-900/50 border border-violet-500/30 rounded-xl space-y-4"
        >
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Category</label>
                    <input name="category" defaultValue={faq.category || 'General'} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Sort Order</label>
                    <input name="sort_order" type="number" defaultValue={faq.sort_order || 0} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                </div>
            </div>
            <div>
                <label className="block text-xs text-gray-500 mb-1">Question</label>
                <input name="question" defaultValue={faq.question} required className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white font-medium" />
            </div>
            <div>
                <label className="block text-xs text-gray-500 mb-1">Answer</label>
                <textarea name="answer" defaultValue={faq.answer} required rows={3} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-gray-300 text-sm" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={onCancel} className="px-3 py-1.5 text-sm text-gray-400 hover:text-white">Cancel</button>
                <button type="submit" disabled={saving} className="px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium">
                    {saving ? 'Saving...' : 'Save FAQ'}
                </button>
            </div>
        </form>
    );
}

function TeamManager({ initialData }: { initialData: any[] }) {
    const [members, setMembers] = useState(initialData);
    const [isEditing, setIsEditing] = useState<string | null>(null);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Team Members</h3>
                <button
                    onClick={() => setIsEditing('new')}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10"
                >
                    <Plus className="w-4 h-4" /> Add Member
                </button>
            </div>

            {isEditing === 'new' && (
                <TeamEditor
                    member={{}}
                    onSave={async (formData: FormData) => {
                        await createTeamMember(formData);
                        window.location.reload();
                    }}
                    onCancel={() => setIsEditing(null)}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {members.map(member => (
                    isEditing === member.id ? (
                        <TeamEditor
                            key={member.id}
                            member={member}
                            onSave={async (formData: FormData) => {
                                await updateTeamMember(member.id, formData);
                                window.location.reload();
                            }}
                            onCancel={() => setIsEditing(null)}
                        />
                    ) : (
                        <div key={member.id} className="flex gap-4 p-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:border-violet-500/30 transition-colors group">
                            <div className="w-16 h-16 bg-black rounded-full overflow-hidden shrink-0 border border-white/10">
                                {member.image_url ? (
                                    <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-600"><Users className="w-6 h-6" /></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-white truncate">{member.name}</h4>
                                <p className="text-sm text-violet-400 truncate">{member.role}</p>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{member.bio}</p>
                            </div>
                            <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => setIsEditing(member.id)} className="p-1.5 hover:bg-white/10 rounded text-gray-400 hover:text-white"><MoreVertical className="w-4 h-4" /></button>
                                <button onClick={async () => { if (confirm('Delete?')) { await deleteTeamMember(member.id); window.location.reload(); } }} className="p-1.5 hover:bg-red-500/10 rounded text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}

function TeamEditor({ member, onSave, onCancel }: any) {
    const [saving, setSaving] = useState(false);
    const [imageUrl, setImageUrl] = useState(member.image_url || '');

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                setSaving(true);
                const formData = new FormData(e.currentTarget);
                formData.set('image_url', imageUrl);
                await onSave(formData);
                setSaving(false);
            }}
            className="col-span-2 p-6 bg-slate-900/50 border border-violet-500/30 rounded-xl space-y-4"
        >
            <div className="flex gap-6">
                <div className="w-32 shrink-0">
                    <label className="block text-xs text-gray-500 mb-2">Photo</label>
                    <ImageUploader defaultValue={imageUrl} onUpload={setImageUrl} bucket="site-assets" />
                </div>
                <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Name</label>
                            <input name="name" defaultValue={member.name} required className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Role</label>
                            <input name="role" defaultValue={member.role} required className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Bio</label>
                        <textarea name="bio" defaultValue={member.bio} rows={3} className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-gray-300 text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">LinkedIn URL</label>
                            <input name="social_linkedin" defaultValue={member.social_linkedin} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Twitter URL</label>
                            <input name="social_twitter" defaultValue={member.social_twitter} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={onCancel} className="px-3 py-1.5 text-sm text-gray-400 hover:text-white">Cancel</button>
                <button type="submit" disabled={saving} className="px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium">
                    {saving ? 'Saving...' : 'Save Member'}
                </button>
            </div>
        </form>
    );
}

function AboutManager({ initialData }: { initialData: any[] }) {
    // Assuming keys: mission, vision, story, stats
    const sections = ['mission', 'vision'];

    return (
        <div className="space-y-8">
            <h3 className="text-xl font-bold text-white">About Page Content</h3>
            <div className="grid gap-6">
                {sections.map(key => {
                    const data = initialData.find(d => d.section_key === key) || { section_key: key, title: key.charAt(0).toUpperCase() + key.slice(1), content: '' };
                    return <AboutSectionEditor key={key} data={data} />;
                })}
            </div>
        </div>
    );
}

function AboutSectionEditor({ data }: any) {
    const [saving, setSaving] = useState(false);
    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                setSaving(true);
                const formData = new FormData(e.currentTarget);
                await updateAboutContent(data.section_key, formData);
                setSaving(false);
                alert('Saved!');
            }}
            className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4"
        >
            <div className="flex justify-between">
                <h4 className="font-semibold text-violet-300 capitalize">{data.section_key}</h4>
                {saving && <Loader2 className="w-4 h-4 animate-spin text-violet-500" />}
            </div>

            <div>
                <label className="block text-xs text-gray-500 mb-1">Title</label>
                <input name="title" defaultValue={data.title} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white" />
            </div>
            <div>
                <label className="block text-xs text-gray-500 mb-1">Content</label>
                <textarea name="content" defaultValue={data.content} rows={4} className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-gray-300 text-sm" />
            </div>
            <div className="text-right">
                <button type="submit" disabled={saving} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors">
                    Save Section
                </button>
            </div>
        </form>
    );
}
