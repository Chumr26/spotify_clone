'use client';

import uniqid from 'uniqid';
import { useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from '@/hooks/useUser';

import Modal from './Modal';
import Input from './Input';
import Button from './Button';

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const uploadModal = useUploadModal();
    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        },
    });
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const onChange = (open: boolean) => {
        if (!open) {
            // reset()
            uploadModal.onClose();
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);
            const songFile = values.song?.[0];
            const imageFile = values.image?.[0];

            if (!songFile || !imageFile || !user) {
                return toast.error('Missing fields!');
            }

            const uniqueID = uniqid();

            // Upload song
            const { data: songData, error: songError } =
                await supabaseClient.storage
                    .from('songs')
                    .upload(`song-${uniqueID}`, songFile, {
                        cacheControl: '3600',
                        upsert: false,
                    });
            if (songError) {
                setIsLoading(false);
                console.log(songError);
                return toast.error('Failed song upload!');
            }
            // Upload image
            const { data: imageData, error: imageError } =
                await supabaseClient.storage
                    .from('images')
                    .upload(`image-${uniqueID}`, imageFile, {
                        cacheControl: '3600',
                        upsert: false,
                    });
            if (imageError) {
                setIsLoading(false);
                return toast.error('Failed image upload!');
            }

            // Create record
            const { error: supabaseError } = await supabaseClient
                .from('songs')
                .insert({
                    user_id: user.id,
                    title: values.title,
                    author: values.author,
                    image_path: imageData.path,
                    song_path: songData.path,
                });
            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            // Success
            router.refresh();
            setIsLoading(false);
            toast.success('Song created!');
            reset();
            uploadModal.onClose();
        } catch (error) {
            toast.error('Some thing went wrong!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            title="Add a song"
            description="Upload an mp3 file"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
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
                    <div className="pb-1">Select a song file</div>
                    <Input
                        id="song"
                        type="file"
                        accept=".mp3"
                        disabled={isLoading}
                        {...register('song', { required: true })}
                    />
                </div>
                <div>
                    <div className="pb-1">Select an image</div>
                    <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        disabled={isLoading}
                        {...register('image', { required: true })}
                    />
                </div>
                <Button disabled={isLoading} type="submit">
                    Create
                </Button>
            </form>
        </Modal>
    );
};

export default UploadModal;
