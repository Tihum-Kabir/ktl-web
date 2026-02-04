'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface ImageUploaderProps {
    defaultValue?: string | null;
    onUpload: (url: string) => void;
    bucket?: string;
}

export default function ImageUploader({ defaultValue, onUpload, bucket = 'service-media' }: ImageUploaderProps) {
    const [image, setImage] = useState<string | null>(defaultValue || null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            setError(null);

            if (!e.target.files || e.target.files.length === 0) {
                return;
            }

            const file = e.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const supabase = createClient();

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            setImage(publicUrl);
            onUpload(publicUrl);

        } catch (err: any) {
            console.error('Upload error:', err);
            setError(err.message || 'Error uploading image');
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        setImage(null);
        onUpload('');
    };

    return (
        <div className="space-y-4">
            {image ? (
                <div className="relative aspect-video w-full max-w-md rounded-xl overflow-hidden border border-white/10 group">
                    <Image
                        src={image}
                        alt="Uploaded preview"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="p-2 bg-red-500/80 rounded-full text-white hover:bg-red-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="relative w-full max-w-md aspect-video rounded-xl border-2 border-dashed border-white/10 bg-slate-950/50 hover:bg-slate-900/50 hover:border-violet-500/50 transition-all flex flex-col items-center justify-center text-center p-6 group cursor-pointer">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={uploading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        {uploading ? (
                            <Loader2 className="w-6 h-6 text-violet-500 animate-spin" />
                        ) : (
                            <Upload className="w-6 h-6 text-violet-500" />
                        )}
                    </div>
                    <p className="text-sm font-medium text-white mb-1">
                        {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (max 800x400px recommended)
                    </p>
                </div>
            )}
            {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
    );
}
