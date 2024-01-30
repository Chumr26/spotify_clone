'use client';

import useAuthModal from '@/hooks/useAuthModal';
import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from '@supabase/auth-helpers-react';
import { AiOutlinePlus } from 'react-icons/ai';

import { Song } from '@/types';
import useHandlePlay from '@/hooks/useHandlePlay';
import MediaItem from './MediaItem';
import LibraryIcon from './Icons/LibraryIcon';
import useSidebar from '@/hooks/useSidebar';

const Library = ({ songs }: { songs: Song[] }) => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const user = useUser();
    const { isOpen, handleClose, handleOpen } = useSidebar();

    const onPlay = useHandlePlay(songs);

    const handleUpload = () => {
        if (!user) {
            authModal.handleOpen();
        } else uploadModal.handleOpen();
    };
    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4 text-neutral-400">
                <div
                    onClick={() => (isOpen ? handleClose() : handleOpen())}
                    className="flex gap-x-2 hover:text-white transition cursor-pointer pl-1"
                >
                    <LibraryIcon className="w-6" />
                    {isOpen && <p className="font-medium">Your Library</p>}
                </div>
                {isOpen && (
                    <AiOutlinePlus
                        onClick={handleUpload}
                        size={20}
                        className="cursor-pointer hover:text-white transition"
                    />
                )}
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-1">
                {songs.map((song) => (
                    <MediaItem
                        key={song.id}
                        song={song}
                        handleClick={onPlay}
                        isOpen={isOpen}
                    />
                ))}
            </div>
        </div>
    );
};

export default Library;
