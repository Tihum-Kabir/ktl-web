import { getMediaFiles } from '@/app/actions/media';
import MediaLibrary from './MediaLibrary';

export default async function MediaPage() {
    const files = await getMediaFiles();

    return (
        <div className="p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Media Library</h1>
                        <p className="text-gray-400">Manage all site assets, images, and documents.</p>
                    </div>
                </div>

                <MediaLibrary initialFiles={files} />
            </div>
        </div>
    );
}
