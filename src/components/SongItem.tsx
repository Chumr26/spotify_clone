'use client';

import Image from 'next/image';

import type { Song } from '@/types';
import useLoadPoster from '@/hooks/useLoadPoster';
import PlayButton from './PlayButton';

const SongItem = ({ song }: { song: Song }) => {
    const posterUrl = useLoadPoster(song.poster_path);

    return (
        <div className="group relative flex flex-col justify-center rounded-md bg-neutral-400/5 hover:bg-neutral-400/10 cursor-pointer transtiion p-3">
            <div className="relative aspect-square w-full overflow-hidden rounded-md">
                <Image
                    src={posterUrl!}
                    priority
                    fill
                    alt="Poster"
                    sizes="auto"
                />
            </div>
            <div className="pt-4 gap-y-5">
                <p className="font-semibold truncate">{song.title}</p>
                <p className="text-neutral-400 text-sm pt-1 pb-4">
                    By {song.author}
                </p>
            </div>
            <div className="absolute bottom-24 right-5">
                <PlayButton />
            </div>
        </div>
    );
};

export default SongItem;
