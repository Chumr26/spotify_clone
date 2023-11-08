'use client';

import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';

import { Song } from '@/types';

import useOnPlay from '@/hooks/useOnPlay';

interface SearchContentProps {
    songs: Song[];
}

const SearchContent = ({ songs }: SearchContentProps) => {
    if (songs.length === 0) {
        return (
            <div className="flex flex-col gap-x-2 w-full px-6 text-neutral-400">
                No songs found!
            </div>
        );
    }

    const onPlay = useOnPlay(songs);

    return (
        <div className="flex flex-col w-full gap-y-2 px-6">
            {songs.map((song) => {
                return (
                    <div
                        key={song.id}
                        className="flex items-center gap-x-4 w-full"
                    >
                        <div className="flex-1">
                            <MediaItem
                                onClick={(id: string) => {
                                    onPlay(id);
                                }}
                                data={song}
                            />
                        </div>
                        <LikeButton songId={song.id} />
                    </div>
                );
            })}
        </div>
    );
};
export default SearchContent;
