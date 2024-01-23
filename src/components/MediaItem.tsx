import Image from 'next/image';

import useLoadPoster from '@/hooks/useLoadPoster';
import { Song } from '@/types';

const MediaItem = ({ song }: { song: Song }) => {
    const posterUrl = useLoadPoster(song.poster_path);

    return (
        <div className="flex items-center gap-x-3 p-2 rounded-md cursor-pointer hover:bg-neutral-800/50">
            <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                <Image fill src={posterUrl!} sizes='auto' alt="Media poster" />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="truncate">{song.title}</p>
                <p className="text-neutral-400 text-sm">{song.author}</p>
            </div>
        </div>
    );
};

export default MediaItem;
