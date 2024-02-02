import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { Song } from '@/types';
import useLoadSongUrl from '@/hooks/useLoadSongUrl';

interface MediaItemProps {
    song: Song;
    handleClick?: (activeSong: Song, activeUrl: string) => void;
    isOpen: boolean;
}

const MediaItem = ({ song, handleClick, isOpen }: MediaItemProps) => {
    const supabaseClient = useSupabaseClient();
    const songUrl = useLoadSongUrl(song.song_path);
    const posterUrl =
        song.youtube_poster ||
        supabaseClient.storage.from('posters').getPublicUrl(song.poster_path)
            .data.publicUrl;

    return (
        <div
            onClick={() => {
                handleClick?.(song, songUrl!);
            }}
            className="overflow-hidden max-w-full flex items-center gap-x-3 p-2 rounded-md cursor-pointer hover:bg-neutral-800/50"
        >
            <div className="relative rounded-md h-[48px] min-w-[48px] w-[48px] overflow-x-hidden">
                <img
                    src={posterUrl!}
                    className={'w-full h-full object-cover'}
                    alt="Media poster"
                />
            </div>
            {isOpen && (
                <div className="flex flex-col gap-y-1 overflow-hidden">
                    <p className="truncate">{song.title}</p>
                    <p className="text-neutral-400 text-sm truncate">{song.author}</p>
                </div>
            )}
        </div>
    );
};

export default MediaItem;
