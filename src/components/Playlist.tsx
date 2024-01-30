'use client';

import useAuthModal from '@/hooks/useAuthModal';
import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from '@supabase/auth-helpers-react';
import { AiFillHeart } from 'react-icons/ai';

import { Song } from '@/types';
import useHandlePlay from '@/hooks/useHandlePlay';
import MediaItem from './MediaItem';
import useSidebar from '@/hooks/useSidebar';

const Playlist = ({ likedSongs }: { likedSongs: Song[] }) => {
    // const authModal = useAuthModal();
    // const uploadModal = useUploadModal();
    // const user = useUser();
    const sidebar = useSidebar();

    const onPlay = useHandlePlay(likedSongs);

    // const handleUpload = () => {
    //     if (!user) {
    //         authModal.handleOpen();
    //     } else uploadModal.handleOpen();
    // };
    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4 text-neutral-400">
                <div
                    onClick={() =>
                        sidebar.isOpen
                            ? sidebar.handleClose()
                            : sidebar.handleOpen()
                    }
                    className="flex items-center gap-x-4 hover:text-white transition cursor-pointer pl-1"
                >
                    <AiFillHeart size={26} />
                    {sidebar.isOpen && (
                        <p className="font-medium text-nowrap">Playlist</p>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-1">
                {likedSongs.map((song) => (
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
