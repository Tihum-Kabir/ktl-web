import { getSolutionBySlug } from '@/app/actions/solutions';
import SolutionDetails from '@/components/solutions/SolutionDetails';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const solution = await getSolutionBySlug(slug);
    if (!solution) return {};

    return {
        title: `${solution.title} | Kingsforth`,
        description: solution.description,
    };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const solution = await getSolutionBySlug(slug);

    if (!solution || !solution.is_published) {
        notFound();
    }

    return <SolutionDetails solution={solution} />;
}
