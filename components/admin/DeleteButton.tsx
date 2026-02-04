'use client';

import { Trash2, Loader2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteButtonProps {
    id: string;
    onDelete: (id: string) => Promise<{ error?: string; success?: boolean }>;
    confirmMessage?: string;
}

export default function DeleteButton({ id, onDelete, confirmMessage = 'Are you sure you want to delete this item?' }: DeleteButtonProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm(confirmMessage)) return;

        startTransition(async () => {
            const result = await onDelete(id);
            if (result.error) {
                alert('Error deleting: ' + result.error);
            } else {
                router.refresh();
            }
        });
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="flex items-center gap-1 p-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 text-xs font-medium"
            title="Delete"
        >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            <span>Delete</span>
        </button>
    );
}
