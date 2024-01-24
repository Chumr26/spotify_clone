'use client';

import LikeButton from '@/components/LikeButton';
import MediaItem from '@/components/MediaItem';
import { Song } from '@/types';

const LikedContent = ({ songs }: { songs: Song[] }) => {
    if (songs.length === 0) {
        return <p className="px-6 text-neutral-400">No liked songs.</p>;
    }
    return (
        <div className="flex flex-col gap-y-2 p-6">
            {songs.map((song) => (
                <div key={song.id} className="flex gap-x-4">
                    <div className="flex-1">
                        <MediaItem song={song} />
                    </div>
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
    );
};
export default LikedContent;
