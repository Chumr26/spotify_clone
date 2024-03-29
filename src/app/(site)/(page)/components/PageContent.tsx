'use client';

import type { Song } from '@/types';
import useHandlePlay from '@/hooks/useHandlePlay';
import SongItem from '@/components/SongItem';

const PageContent = ({ songs }: { songs: Song[] }) => {
    const onPlay = useHandlePlay(songs);
    if (songs.length === 0) {
        return <div className="mt-4 text-neutral-400">No songs available!</div>;
    }
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
            {songs.map((song) => (
                <SongItem key={song.id} song={song} onPlay={onPlay} />
            ))}
        </div>
    );
};

export default PageContent;
