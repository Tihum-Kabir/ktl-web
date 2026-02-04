import { redirect } from 'next/navigation';
import { getUser } from '@/app/actions/auth';
import AdminLayout from '@/components/admin/AdminLayout';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await getUser();

    // Redirect if not authenticated
    if (!user) {
        redirect('/login');
    }

    // Redirect if not super admin
    if (user.role !== 'SUPER_ADMIN') {
        redirect('/');
    }

    return <AdminLayout user={user}>{children}</AdminLayout>;
}
