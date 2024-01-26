import { type FieldValues, useForm, SubmitHandler } from 'react-hook-form';

import fetchSongApi from '@/helper/fetchSongApi';
import useYoutubeUploadModal from '@/hooks/useYoutubeUploadModal';
import Modal from '.';
import Input from '../Input';
import Button from '../Button';

const YoutubeUploadModal = () => {
    const { isOpen, handleClose } = useYoutubeUploadModal();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            url: '',
        },
    });

    const handleChange = (open: boolean) => {
        if (!open) {
            handleClose();
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        console.log(await fetchSongApi(values.url));
    };

    return (
        <Modal
            title="Youtube"
            description="Upload a youtube link"
            isOpen={isOpen}
            handleChange={handleChange}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
            >
                <Input
                    id="url"
                    placeholder="Url"
                    {...register('url', { required: true })}
                />
                <Button type="submit" className="flex justify-center">
                    Submit
                </Button>
            </form>
        </Modal>
    );
};
export default YoutubeUploadModal;
