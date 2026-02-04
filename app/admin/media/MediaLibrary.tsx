'use client';

import { useState, useTransition } from 'react';
import { Upload, Trash2, FileText, File, ExternalLink, Search, Loader2, Copy, Check } from 'lucide-react';
import { uploadFileServerAction, deleteFile } from '@/app/actions/media';
import { useRouter } from 'next/navigation';

interface MediaFile {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
    created_at: string;
}

export default function MediaLibrary({ initialFiles }: { initialFiles: MediaFile[] }) {
    const [files, setFiles] = useState<MediaFile[]>(initialFiles);
    const [isPending, startTransition] = useTransition();
    const [search, setSearch] = useState('');
    const [uploading, setUploading] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const router = useRouter();

    const filteredFiles = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            await uploadFileServerAction(formData);

            // Refresh logic: ideally fetch new list or router refresh
            router.refresh();
            // Just for instant UI feedback (the full list will update on refresh)
            window.location.reload();
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (fileName: string) => {
        if (!confirm('Are you sure you want to delete this file?')) return;

        startTransition(async () => {
            try {
                await deleteFile(fileName);
                setFiles(prev => prev.filter(f => f.name !== fileName));
                router.refresh();
            } catch (error) {
                console.error('Delete failed:', error);
                alert('Delete failed');
            }
        });
    };

    const copyToClipboard = (url: string, id: string) => {
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    return (
        <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-[#0A0A0A] p-4 rounded-xl border border-white/10">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search files..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <label className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${uploading ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-violet-600 hover:bg-violet-500 text-white'
                        }`}>
                        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        {uploading ? 'Uploading...' : 'Upload File'}
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleUpload}
                            disabled={uploading}
                        />
                    </label>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {filteredFiles.map((file) => (
                    <div key={file.id} className="group relative bg-[#0A0A0A] rounded-xl border border-white/10 overflow-hidden hover:border-violet-500/50 transition-all">
                        {/* File Preview */}
                        <div className="aspect-square relative bg-white/5 flex items-center justify-center overflow-hidden">
                            {file.type.startsWith('image/') ? (
                                <img src={file.url} alt={file.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                            ) : file.type === 'pdf' ? (
                                <FileText className="w-12 h-12 text-red-400/80" />
                            ) : (
                                <File className="w-12 h-12 text-violet-400/80" />
                            )}

                            {/* Overlay Actions */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <a
                                    href={file.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition-colors"
                                    title="View"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                                <button
                                    onClick={() => copyToClipboard(file.url, file.id)}
                                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition-colors relative"
                                    title="Copy URL"
                                >
                                    {copiedId === file.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={() => handleDelete(file.name)}
                                    className="p-2 bg-red-500/20 rounded-full hover:bg-red-500/40 text-red-400 transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* File Info */}
                        <div className="p-3">
                            <p className="text-sm font-medium text-gray-200 truncate mb-1" title={file.name}>{file.name}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>{formatSize(file.size)}</span>
                                <span className="uppercase">{file.type.split('/')[1] || file.type}</span>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredFiles.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-500">
                        No files found.
                    </div>
                )}
            </div>
        </div>
    );
}
