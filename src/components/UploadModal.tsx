import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useUploadModal from '@/hooks/useUploadModal';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import { error } from 'console';

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
    const [isLoading, setIsLoading] = useState();
    const handleChange = (open: boolean) => {
        if (!open) {
            reset();
            handleClose();
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = (values) => {
        console.log(errors.root);
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
                <Button type="submit" disabled={isLoading}>
                    Create
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
