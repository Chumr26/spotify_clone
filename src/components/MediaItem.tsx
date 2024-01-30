import Image from 'next/image';

import useLoadPoster from '@/hooks/useLoadPoster';
import { Song } from '@/types';
import useLoadSongUrl from '@/hooks/useLoadSongUrl';

interface MediaItemProps {
    song: Song;
    handleClick?: (activeSong: Song, activeUrl: string) => void;
}

const MediaItem = ({ song, handleClick }: MediaItemProps) => {
    const posterUrl = song.youtube_poster || useLoadPoster(song.poster_path);
    const songUrl = useLoadSongUrl(song.song_path);

    return (
        <div
            onClick={() => {
                handleClick?.(song, songUrl!);
            }}
            className="flex items-center gap-x-3 p-2 rounded-md cursor-pointer hover:bg-neutral-800/50"
        >
            <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                <Image
                    fill
                    src={posterUrl!}
                    sizes="auto"
                    className={
                        posterUrl?.includes('img.youtube.com')
                            ? 'object-cover'
                            : undefined
                    }
                    alt="Media poster"
                />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="truncate">{song.title}</p>
                <p className="text-neutral-400 text-sm">{song.author}</p>
            </div>
        </div>
    );
};

export default MediaItem;
