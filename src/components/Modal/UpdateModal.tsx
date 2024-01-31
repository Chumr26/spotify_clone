import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { BounceLoader } from 'react-spinners';
import { FiEdit3 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import uniqid from 'uniqid';

import useUpdateModal from '@/hooks/useUpdateModal';

import Modal from '.';
import Button from '../Button';
import { useEffect, useState } from 'react';
import SongItem from '../SongItem';
import Input from '../Input';

const UpdateModal = () => {
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const router = useRouter();

    const { isOpen, song, handleClose } = useUpdateModal();
    const [updatedSong, setUpdatedSong] = useState(song);
    const [isLoading, setIsLoading] = useState(false);

    const httpsRegex = /^https:\/\//i;

    const handleChange = (open: boolean) => {
        if (!open && !isLoading) {
            handleClose();
        }
    };

    const handleUpdate = async () => {
        setIsLoading(true);

        //setup data
        const posterUrl = document.getElementById(
            'poster_url'
        ) as HTMLInputElement;
        const posterFile = document.getElementById(
            'poster_file'
        ) as HTMLInputElement;
        const updatedTitle = document.getElementById(
            'updated_title'
        ) as HTMLInputElement;
        const updatedAuthor = document.getElementById(
            'updated_author'
        ) as HTMLInputElement;

        if (posterUrl.value) {
            if (!httpsRegex.test(posterUrl.value)) {
                toast.error('Invalid poster url.');
                setIsLoading(false);
                return;
            }
        }

        try {
            const uniqueId = uniqid();

            // update poster file
            if (posterFile.files?.[0]!) {
                // delete old poster
                const { error: oldPosterDeleteError } =
                    await supabaseClient.storage
                        .from('posters')
                        .remove([song?.poster_path!]);

                if (oldPosterDeleteError) {
                    throw {
                        info: 'Delete old poster error.',
                        message: oldPosterDeleteError.message,
                    };
                }
                // update new poster
                const { error: newPosterUpdateError } =
                    await supabaseClient.storage
                        .from('posters')
                        .upload(`poster-${uniqueId}`, posterFile.files[0], {
                            cacheControl: '3600',
                            upsert: false,
                        });

                if (newPosterUpdateError) {
                    throw {
                        info: 'Update new poster error.',
                        message: newPosterUpdateError.message,
                    };
                }
                // update song path
                const { error: updateSongPathError } =
                    await supabaseClient.storage
                        .from('songs')
                        .move(song?.song_path!, `song-${uniqueId}`);
                if (updateSongPathError) {
                    throw {
                        info: 'Update song path error.',
                        message: updateSongPathError.message,
                    };
                }
            }

            // update record
            const { error } = await supabaseClient
                .from('songs')
                .update({
                    title: updatedTitle.value,
                    author: updatedAuthor.value,
                    youtube_poster: posterUrl.value || null,
                    ...(posterFile.files?.[0]! && {
                        song_path: `song-${uniqueId}`,
                        poster_path: `poster-${uniqueId}`,
                    }),
                })
                .eq('id', song?.id)
                .eq('user_id', user?.id);
            if (error) {
                throw { info: 'Update poster error.', message: error.message };
            }

            toast.success('Edited song success.');
            router.refresh();
        } catch (error) {
            toast.error((error as { info: string }).info);
            console.log(error, 'Date: ', new Date().toLocaleString());
        } finally {
            setIsLoading(false);
            handleClose();
        }
    };

    useEffect(() => {
        setUpdatedSong(song);
    }, [song]);

    return (
        <Modal title="Edit song" isOpen={isOpen} handleChange={handleChange}>
            <div className="relative w-48 md:w-60 mx-auto mb-10">
                <SongItem
                    song={updatedSong!}
                    isUpdate
                    inputDisabled={isLoading}
                    handleUpdate={(value: {}) =>
                        setUpdatedSong((preValue) => ({
                            ...preValue!,
                            ...value,
                        }))
                    }
                />
                <label
                    className={`absolute top-5 right-5 ${
                        isLoading && 'hidden'
                    }`}
                >
                    <Input
                        onChange={(e) => {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                setUpdatedSong((preValue) => ({
                                    ...preValue!,
                                    updated_poster: e.target?.result as string,
                                }));
                            };
                            reader.readAsDataURL(e.target.files?.[0]!);
                        }}
                        id="poster_file"
                        disabled={isLoading}
                        type="file"
                        accept="image/*"
                        className="hidden"
                    />
                    <div className="bg-white text-black rounded-full w-10 h-10 grid place-items-center cursor-pointer hover:opacity-70 transition">
                        <FiEdit3 />
                    </div>
                </label>
                <Input
                    onChange={(e) => {
                        if (
                            httpsRegex.test(e.target.value) ||
                            !e.target.value
                        ) {
                            setUpdatedSong((preValue) => ({
                                ...preValue!,
                                updated_poster: e.target.value,
                                //  || song?.youtube_poster!,
                                // poster_path: song?.poster_path!,
                            }));
                        }
                    }}
                    disabled={isLoading}
                    id="poster_url"
                    placeholder="New poster url"
                    className="mt-5"
                />
            </div>
            <div className="flex justify-around">
                <Button
                    onClick={handleUpdate}
                    disabled={isLoading}
                    className={`bg-neutral-100 ${
                        isLoading && 'cursor-not-allowed'
                    }`}
                >
                    {isLoading ? <BounceLoader size={24} /> : 'Edit'}
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
export default UpdateModal;
