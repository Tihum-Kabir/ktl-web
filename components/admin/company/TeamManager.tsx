'use client';

import { useState, useEffect } from 'react';
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } from '@/app/actions/company';
import { Plus, Pencil, Trash2, X, Upload, Loader2, Linkedin, Twitter, Users } from 'lucide-react';

export function TeamManager() {
    const [team, setTeam] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<any>(null);

    useEffect(() => {
        loadTeam();
    }, []);

    async function loadTeam() {
        try {
            const data = await getTeamMembers();
            setTeam(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to remove this team member?')) return;
        await deleteTeamMember(id);
        loadTeam();
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-violet-500 rounded-full"></span>
                    Team Members
                </h2>
                <button
                    onClick={() => { setCurrentItem(null); setIsEditing(true); }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition-all shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 font-medium text-sm"
                >
                    <Plus className="w-4 h-4" /> Add Member
                </button>
            </div>

            {loading ? (
                <div className="text-center py-20 flex justify-center text-violet-500/50">
                    <Loader2 className="w-8 h-8 animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {team.map((member) => (
                        <div key={member.id} className="bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 p-5 rounded-2xl flex gap-5 group hover:border-violet-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-900/10 hover:-translate-y-1 relative overflow-hidden">
                            {/* Glossy overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/5 via-transparent to-transparent pointer-events-none" />

                            <div className="w-20 h-20 bg-black rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-lg relative">
                                {member.image_url ? (
                                    <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-white/5">
                                        <Users className="w-8 h-8 text-white/20" />
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <h3 className="font-bold text-white truncate text-lg">{member.name}</h3>
                                <p className="text-sm text-violet-400 truncate font-medium mb-1">{member.role}</p>

                                <div className="flex gap-2 mt-auto pt-2">
                                    <button
                                        onClick={() => { setCurrentItem(member); setIsEditing(true); }}
                                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-600 dark:text-gray-400 hover:text-white transition-colors"
                                    >
                                        <Pencil className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(member.id)}
                                        className="p-2 bg-white/5 hover:bg-red-500/20 rounded-lg text-gray-600 dark:text-gray-400 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {team.length === 0 && (
                        <div className="col-span-full border border-dashed border-white/10 rounded-2xl p-12 text-center text-gray-500">
                            No team members yet. Click "Add Member" to get started.
                        </div>
                    )}
                </div>
            )}

            {isEditing && (
                <TeamModal
                    item={currentItem}
                    onClose={() => setIsEditing(false)}
                    onSave={() => { setIsEditing(false); loadTeam(); }}
                />
            )}
        </div>
    );
}

function TeamModal({ item, onClose, onSave }: { item?: any, onClose: () => void, onSave: () => void }) {
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);
        const formData = new FormData(e.currentTarget);
        try {
            if (item) {
                await updateTeamMember(item.id, formData);
            } else {
                await createTeamMember(formData);
            }
            onSave();
        } catch (error) {
            alert('Error saving');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
            <div className="bg-[#0A0A0F] border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl ring-1 ring-white/10">
                <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        {item ? <Pencil className="w-4 h-4 text-violet-500" /> : <Plus className="w-4 h-4 text-violet-500" />}
                        {item ? 'Edit Team Member' : 'Add Team Member'}
                    </h3>
                    <button onClick={onClose} className="text-gray-600 dark:text-gray-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest pl-1">Name</label>
                            <input name="name" defaultValue={item?.name} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 outline-none transition-all placeholder:text-gray-600" placeholder="Full Name" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest pl-1">Role</label>
                            <input name="role" defaultValue={item?.role} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 outline-none transition-all placeholder:text-gray-600" placeholder="Job Title" />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest pl-1">Bio</label>
                        <textarea name="bio" defaultValue={item?.bio} rows={3} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm resize-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 outline-none transition-all placeholder:text-gray-600" placeholder="Short biography..." />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest pl-1">Image URL</label>
                        <input name="image_url" defaultValue={item?.image_url} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 outline-none transition-all placeholder:text-gray-600" placeholder="https://..." />
                        <p className="text-[10px] text-gray-500 pl-1">Direct link to profile photo</p>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest pl-1 flex items-center gap-1"><Linkedin className="w-3 h-3 text-blue-400" /> LinkedIn</label>
                            <input name="social_linkedin" defaultValue={item?.social_linkedin} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-violet-500/50 outline-none" placeholder="Profile URL" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest pl-1 flex items-center gap-1"><Twitter className="w-3 h-3 text-sky-400" /> Twitter</label>
                            <input name="social_twitter" defaultValue={item?.social_twitter} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-violet-500/50 outline-none" placeholder="Profile URL" />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest pl-1">Sort Order</label>
                        <input name="sort_order" type="number" defaultValue={item?.sort_order || 0} className="w-24 bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-violet-500/50 outline-none" />
                    </div>

                    <div className="pt-6 border-t border-white/10 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm text-gray-400 hover:text-white transition-colors font-medium">Cancel</button>
                        <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-violet-600/20 transition-all hover:scale-[1.02]">
                            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                            Save Member
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
