'use client';

import MediaItem from '@/components/MediaItem';
import useDeleteModal from '@/hooks/useDeleteModal';
import useHandlePlay from '@/hooks/useHandlePlay';
import useUpdateModal from '@/hooks/useUpdateModal';
import { Song } from '@/types';
import { FiEdit3 } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';

const LibraryContent = ({ songs }: { songs: Song[] }) => {
    if (songs.length === 0) {
        return <p className="px-6 text-neutral-400">No liked songs.</p>;
    }

    const onPlay = useHandlePlay(songs);
    const updateModal = useUpdateModal();
    const deleteModal = useDeleteModal();

    return (
        <div className="flex flex-col gap-y-2 p-6">
            {songs.map((song) => (
                <div key={song.id} className="flex items-center gap-x-4">
                    <div className="flex-1">
                        <MediaItem song={song} handleClick={onPlay} isOpen />
                    </div>
                    <div className="flex gap-x-10 text-neutral-400 transition">
                        <FiEdit3
                            onClick={() => updateModal.handleOpen(song)}
                            size={25}
                            className="hover:text-white hover:cursor-pointer"
                        />
                        <MdDelete
                            onClick={() => deleteModal.handleOpen(song)}
                            size={25}
                            className="hover:text-white hover:cursor-pointer"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};
export default LibraryContent;
