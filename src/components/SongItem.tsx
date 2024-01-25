'use client';

import Image from 'next/image';

import type { Song } from '@/types';
import useLoadPoster from '@/hooks/useLoadPoster';
import PlayButton from './PlayButton';
import useLoadSongUrl from '@/hooks/useLoadSongUrl';

interface SongItemProps {
    song: Song;
    onPlay: (activeSong: Song, activeUrl: string) => void;
}

const SongItem = ({ song, onPlay }: SongItemProps) => {
    const posterUrl = useLoadPoster(song.poster_path);
    const songUrl = useLoadSongUrl(song.song_path);

    return (
        <div className="group relative flex flex-col justify-center rounded-md bg-neutral-400/5 hover:bg-neutral-400/10 cursor-pointer transtiion p-3">
            <div className="relative aspect-square w-full overflow-hidden rounded-md">
                <Image
                    priority
                    src={posterUrl!}
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
                <PlayButton handleClick={() => onPlay(song, songUrl!)} />
            </div>
        </div>
    );
};

export default SongItem;
