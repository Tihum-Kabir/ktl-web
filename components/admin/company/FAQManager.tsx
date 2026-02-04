'use client';

import { useState, useEffect } from 'react';
import { getFAQs, createFAQ, updateFAQ, deleteFAQ } from '@/app/actions/company';
import { Plus, Pencil, Trash2, X, ChevronDown, ChevronRight, File, Loader2, Save } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader'; // Reusing for file upload if compatible, or simple default Input

export function FAQManager() {
    const [faqs, setFaqs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<any>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await getFAQs();
            setFaqs(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this FAQ?')) return;
        await deleteFAQ(id);
        loadData();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-pink-500 rounded-full"></span>
                    FAQ Management
                </h2>
                <button
                    onClick={() => { setCurrentItem(null); setIsEditing(true); }}
                    className="flex items-center gap-2 px-4 py-2 bg-pink-600/20 text-pink-400 hover:bg-pink-600/30 rounded-lg transition-colors border border-pink-500/30 font-medium"
                >
                    <Plus className="w-4 h-4" /> Add FAQ
                </button>
            </div>

            {loading ? (
                <div className="p-12 flex justify-center text-gray-500">
                    <Loader2 className="w-6 h-6 animate-spin" />
                </div>
            ) : (
                <div className="space-y-3">
                    {faqs.map((faq) => (
                        <div key={faq.id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-pink-500/30 transition-all duration-300 group">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-semibold text-white">{faq.question}</h3>
                                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] uppercase font-bold text-gray-400 border border-white/5">
                                            {faq.category}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400 line-clamp-2">{faq.answer}</p>

                                    {/* Attachment Badge */}
                                    {faq.attachment_url && (
                                        <div className="flex items-center gap-2 mt-2 text-xs text-pink-400 bg-pink-500/10 px-2 py-1 rounded w-fit border border-pink-500/20">
                                            <File className="w-3 h-3" />
                                            {faq.attachment_name || 'Attached Document'}
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => { setCurrentItem(faq); setIsEditing(true); }}
                                        className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(faq.id)}
                                        className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {faqs.length === 0 && (
                        <div className="text-center py-12 bg-white/5 rounded-xl border border-dashed border-white/10 text-gray-500">
                            No FAQs found. Create your first one!
                        </div>
                    )}
                </div>
            )}

            {isEditing && (
                <FAQModal
                    item={currentItem}
                    onClose={() => setIsEditing(false)}
                    onSave={() => { setIsEditing(false); loadData(); }}
                />
            )}
        </div>
    );
}

function FAQModal({ item, onClose, onSave }: { item?: any, onClose: () => void, onSave: () => void }) {
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);
        const formData = new FormData(e.currentTarget);

        try {
            if (item) {
                await updateFAQ(item.id, formData);
            } else {
                await createFAQ(formData);
            }
            onSave();
        } catch (error) {
            console.error(error);
            alert('Error saving FAQ');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
            <div className="bg-[#0A0A0F] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl ring-1 ring-white/10">
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        {item ? <Pencil className="w-4 h-4 text-pink-500" /> : <Plus className="w-4 h-4 text-pink-500" />}
                        {item ? 'Edit FAQ' : 'Add FAQ'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-400">Question</label>
                        <input name="question" defaultValue={item?.question} required className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-pink-500/50 outline-none transition-colors" placeholder="e.g. How do I reset my password?" />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-400">Answer</label>
                        <textarea name="answer" defaultValue={item?.answer} required rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm resize-none focus:border-pink-500/50 outline-none transition-colors" placeholder="Type your answer here..." />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-400">Category</label>
                            <select name="category" defaultValue={item?.category || 'General'} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-pink-500/50 outline-none">
                                <option value="General">General</option>
                                <option value="Billing">Billing</option>
                                <option value="Technical">Technical</option>
                                <option value="Account">Account</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-400">Sort Order</label>
                            <input type="number" name="sort_order" defaultValue={item?.sort_order || 0} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-pink-500/50 outline-none" />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                        <label className="text-xs font-medium text-gray-400 mb-2 block">Related Document (Optional)</label>
                        <div className="space-y-2">
                            <input type="text" name="attachment_name" defaultValue={item?.attachment_name} placeholder="Document Name (e.g. User Guide PDF)" className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-pink-500/50 outline-none" />
                            <input type="text" name="attachment_url" defaultValue={item?.attachment_url} placeholder="Document URL (https://...)" className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-pink-500/50 outline-none" />
                            <p className="text-[10px] text-gray-500">Paste a direct link to a PDF or document.</p>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>
                        <button type="submit" disabled={submitting} className="px-6 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-pink-600/20">
                            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save FAQ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
