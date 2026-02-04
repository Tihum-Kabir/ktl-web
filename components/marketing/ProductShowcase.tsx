import { getProductFeatures } from '@/app/actions/homepage';
import { ProductShowcaseClient } from './ProductShowcaseClient';

export async function ProductShowcase() {
    // 1. Fetch from DB
    const features = await getProductFeatures();

    // 2. Fallback if DB is empty (e.g., before migration run)
    // In a real scenario, we might want to return null or the seeded data if the fetch fails silently.
    // Given the task, we assume the DB is ready or will be ready.
    // If features array is empty, we could pass an empty array, and the UI would show nothing in the loop.
    // But since we want "Import current content", we can define the fallback here if needed, 
    // but the migration should have handled it.

    // We map the DB snake_case fields to the component expected props if necessary, 
    // but our types align mostly.

    return <ProductShowcaseClient features={features} />;
}
