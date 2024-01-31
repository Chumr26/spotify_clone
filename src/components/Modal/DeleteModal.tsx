import { useState } from 'react';
import toast from 'react-hot-toast';
import { BounceLoader } from 'react-spinners';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

import Modal from '.';
import Button from '../Button';
import SongItem from '../SongItem';

import useDeleteModal from '@/hooks/useDeleteModal';
import usePlayer from '@/hooks/usePlayer';

const DeleteModal = () => {
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const router = useRouter();

    const { isOpen, song, handleClose } = useDeleteModal();
    const [isLoading, setIsLoading] = useState(false);
    const player = usePlayer();

    const handleChange = (open: boolean) => {
        if (!open && !isLoading) {
            handleClose();
        }
    };

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const { error, data } = await supabaseClient
                .from('songs')
                .delete()
                .eq('id', song?.id)
                .eq('user_id', user?.id);
            await supabaseClient.storage
                .from('songs')
                .remove([song?.song_path!]);
            if (song?.poster_path) {
                await supabaseClient.storage
                    .from('posters')
                    .remove([song?.poster_path!]);
            }
            if (song?.id === player.activeSong?.id) player.reset();
            
            toast.success(`Deleted ${song?.title}`);
            router.refresh();
        } catch (error) {
            toast.error('Delete Song Error.');
            console.log(
                'Delete Song Error: ',
                error,
                'Date: ',
                new Date().toLocaleString
            );
        } finally {
            setIsLoading(false);
            handleClose();
        }
    };

    return (
        <Modal title="Delete song" isOpen={isOpen} handleChange={handleChange}>
            <div className="w-48 md:w-60 mx-auto mb-10">
                <SongItem song={song!} />
            </div>
            <div className="flex justify-around">
                <Button
                    onClick={handleDelete}
                    disabled={isLoading}
                    className={`bg-red-500 ${
                        isLoading && 'cursor-not-allowed'
                    }`}
                >
                    {isLoading ? <BounceLoader size={24} /> : 'Delete'}
                </Button>
                <Button
                    onClick={handleClose}
                    disabled={isLoading}
                    className={`text-neutral-900 ${
                        isLoading && 'cursor-not-allowed'
                    }`}
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    );
};
export default DeleteModal;
