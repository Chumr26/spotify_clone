'use client';

import { useContext } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';

import useHandlePlay from '@/hooks/useHandlePlay';
import MediaItem from './MediaItem';
import useSidebar from '@/hooks/useSidebar';
import { LikedSongContext } from '@/provider/LikedSongsProvider';

const Playlist = () => {
    const sidebar = useSidebar();
    const likedSongs = useContext(LikedSongContext);

    const onPlay = useHandlePlay(likedSongs!);

    return (
        <div className="flex flex-col text-nowrap max-w-48">
            <div className="sticky bg-neutral-900 top-0 z-10 flex items-center justify-between py-4 text-neutral-400">
                <div
                    onClick={() =>
                        sidebar.isOpen
                            ? sidebar.handleClose()
                            : sidebar.handleOpen()
                    }
                    className={twMerge(
                        'flex w-full justify-center items-center gap-x-4 hover:text-white transition cursor-pointer',
                        sidebar.isOpen && 'justify-start ml-[23px]'
                    )}
                >
                    <AiFillHeart size={26} />
                    {sidebar.isOpen && <p className="font-medium">Playlist</p>}
                </div>
            </div>
            <div className="flex flex-col gap-y-2 px-1">
                {likedSongs?.map((song) => (
                    <MediaItem
                        key={song.id}
                        song={song}
                        handleClick={onPlay}
                        isOpen={sidebar.isOpen}
                    />
                ))}
            </div>
        </div>
    );
};

export default Playlist;
