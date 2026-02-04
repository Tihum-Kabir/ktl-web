'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Edit, Trash2, Eye, EyeOff, MoreVertical } from 'lucide-react';
import { deleteService, publishService, unpublishService } from '@/app/actions/services';
import type { Service } from '@/app/actions/services';
import Link from 'next/link';

export function ServiceActions({ service }: { service: Service }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isToggling, setIsToggling] = useState(false);

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete "${service.title}"? This action cannot be undone.`)) {
            return;
        }

        setIsDeleting(true);
        const result = await deleteService(service.id);

        if (result.error) {
            alert('Error deleting service: ' + result.error);
            setIsDeleting(false);
        } else {
            router.refresh();
        }
    };

    const handleTogglePublish = async () => {
        setIsToggling(true);
        const result = service.is_published
            ? await unpublishService(service.id)
            : await publishService(service.id);

        if (result.error) {
            alert('Error updating service: ' + result.error);
        } else {
            router.refresh();
        }
        setIsToggling(false);
    };

    return (
        <div className="flex items-center justify-end gap-2">
            {/* Edit Button */}
            <Link
                href={`/admin/services/${service.id}`}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
                title="Edit service"
            >
                <Edit className="w-4 h-4 text-gray-400 group-hover:text-violet-400 transition-colors" />
            </Link>

            {/* Publish/Unpublish Button */}
            <button
                onClick={handleTogglePublish}
                disabled={isToggling}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors group disabled:opacity-50"
                title={service.is_published ? 'Unpublish' : 'Publish'}
            >
                {service.is_published ? (
                    <EyeOff className="w-4 h-4 text-gray-400 group-hover:text-amber-400 transition-colors" />
                ) : (
                    <Eye className="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                )}
            </button>

            {/* Delete Button */}
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors group disabled:opacity-50"
                title="Delete service"
            >
                <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors" />
            </button>
        </div>
    );
}
