'use client'

import MediaItem from '@/components/MediaItem';
import { Song } from '@/types';

const SearchContent = ({ songs }: { songs: Song[] }) => {
    if (songs.length === 0)
        return <p className="px-6 text-neutral-400">No songs found.</p>;
    return (
        <div className="px-6">
            {songs.map((song) => (
                <MediaItem key={song.id} song={song} />
            ))}
        </div>
    );
};
export default SearchContent;
