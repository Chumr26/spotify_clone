import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import uniqid from 'uniqid';
import toast from 'react-hot-toast';
import { BounceLoader } from 'react-spinners';

import useUploadModal from '@/hooks/useUploadModal';
import Modal from '.';
import Input from '../Input';
import Button from '../Button';

const UploadModal = () => {
    const { isOpen, handleClose } = useUploadModal();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            title: '',
            author: '',
            song: null,
            poster: null,
        },
    });
    const router = useRouter();
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (open: boolean) => {
        if (!open) {
            reset();
            handleClose();
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        setIsLoading(true);
        const uniqueId = uniqid();
        try {
            // upload song
            const { data: songData, error: songError } =
                await supabaseClient.storage
                    .from('songs')
                    .upload(`song-${uniqueId}`, values.song[0], {
                        cacheControl: '3600',
                        upsert: false,
                    });
            if (songError) {
                setIsLoading(false);
                console.log(
                    'songError: ',
                    songError,
                    'Date: ',
                    new Date().toLocaleString()
                );
                return toast.error('Fail song upload.');
            }
            // upload poster
            const { data: posterData, error: posterError } =
                await supabaseClient.storage
                    .from('posters')
                    .upload(`poster-${uniqueId}`, values.poster[0], {
                        cacheControl: '3600',
                        upsert: false,
                    });
            if (posterError) {
                setIsLoading(false);
                console.log(
                    'posterError Error: ',
                    posterError,
                    'Date: ',
                    new Date().toLocaleString()
                );
                return toast.error('Fail poster upload.');
            }
            // insert record
            const { error: insertError } = await supabaseClient
                .from('songs')
                .insert({
                    user_id: user!.id,
                    title: values.title,
                    author: values.author,
                    song_path: songData.path,
                    poster_path: posterData.path,
                });

            if (insertError) {
                setIsLoading(false);
                console.log(
                    'insertError: ',
                    insertError,
                    'Date: ',
                    new Date().toLocaleString()
                );
                return toast.error('Insert table error.');
            }
            // success
            handleClose();
            reset();
            router.refresh();
            toast.success('Song added!');
        } catch (error) {
            toast.error('Upload Error');
            console.log(
                'Upload Error: ',
                (error as Error).message,
                'Date: ',
                new Date().toLocaleString()
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            title="Add a song"
            description="Upload a mp3 file"
            isOpen={isOpen}
            handleChange={handleChange}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
            >
                <Input
                    id="title"
                    disabled={isLoading}
                    placeholder="Song title"
                    {...register('title', { required: true })}
                />
                <Input
                    id="author"
                    disabled={isLoading}
                    placeholder="Song author"
                    {...register('author', { required: true })}
                />
                <div>
                    <p className="pb-1">Select a song file</p>
                    <Input
                        id="song"
                        type="file"
                        disabled={isLoading}
                        accept=".mp3"
                        {...register('song', { required: true })}
                        className="cursor-pointer"
                    />
                </div>
                <div>
                    <p className="pb-1">Select a poster</p>
                    <Input
                        id="poster"
                        type="file"
                        disabled={isLoading}
                        accept="image/*"
                        {...register('poster', { required: true })}
                        className="cursor-pointer"
                    />
                </div>
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex justify-center"
                >
                    {isLoading ? <BounceLoader size={24} /> : 'Create'}
                </Button>
                {Object.keys(errors).length > 0 ? (
                    <p className="text-center text-orange-400">
                        All fields required!
                    </p>
                ) : (
                    ''
                )}
            </form>
        </Modal>
    );
};

export default UploadModal;
