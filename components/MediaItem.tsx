'use client';

import Image from 'next/image';

import useLoadImageUrl from '@/hooks/useLoadImageUrl';
import usePlayer from '@/hooks/usePlayer';

import { Song } from '@/types';

interface MediaItemProps {
    data: Song;
    onClick?: (id: string) => void;
}

const MediaItem = ({ data, onClick }: MediaItemProps) => {
    const imagePath = useLoadImageUrl(data);
    const player = usePlayer();

    const handleClick = () => {
        if (onClick) {
            return onClick(data.id);
        }
        // TODO: Default turn on player
        return player.setId(data.id);
    };

    return (
        <div
            onClick={handleClick}
            className="flex items-center gap-x-3 cursor:poiter hover:bg-neutral-800/50 w-full p-2 rounded-md"
        >
            <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                <Image
                    fill
                    src={imagePath || '/images/liked.png'}
                    alt="Media Item"
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate">{data.title}</p>
                <p className="text-sm text-neutral-400 truncate">
                    {data.author}
                </p>
            </div>
        </div>
    );
};

export default MediaItem;
