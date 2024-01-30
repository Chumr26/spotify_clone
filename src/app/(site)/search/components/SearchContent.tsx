'use client';

import { Song } from '@/types';
import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';
import useHandlePlay from '@/hooks/useHandlePlay';

const SearchContent = ({ songs }: { songs: Song[] }) => {
    if (songs.length === 0)
        return <p className="px-6 text-neutral-400">No songs found.</p>;

    const onPlay = useHandlePlay(songs);

    return (
        <div className="flex flex-col gap-y-2 px-6">
            {songs.map((song) => (
                <div key={song.id} className="flex items-center gap-x-4">
                    <div className="flex-1">
                        <MediaItem
                            isOpen
                            key={song.id}
                            song={song}
                            handleClick={onPlay}
                        />
                    </div>
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
    );
};
export default SearchContent;
