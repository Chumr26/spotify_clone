'use client';

import useAuthModal from '@/hooks/useAuthModal';
import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from '@supabase/auth-helpers-react';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbPlaylist } from 'react-icons/tb';

import { Song } from '@/types';
import MediaItem from './MediaItem';
import useHandlePlay from '@/hooks/useHandlePlay';

const Library = ({ songs }: { songs: Song[] }) => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const user = useUser();

    const onPlay = useHandlePlay(songs)

    const handleUpload = () => {
        if (!user) {
            authModal.handleOpen();
        } else uploadModal.handleOpen();
    };
    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4 text-neutral-400">
                <div className="flex gap-x-2">
                    <TbPlaylist size={26} />
                    <p className="font-medium">Your Library</p>
                </div>
                <AiOutlinePlus
                    onClick={handleUpload}
                    size={20}
                    className="cursor-pointer hover:text-white transition"
                />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {songs.map((song) => (
                    <MediaItem key={song.id} song={song} handleClick={onPlay}/>
                ))}
            </div>
        </div>
    );
};

export default Library;
