import { TfiYoutube } from 'react-icons/tfi';
import { BsFiletypeMp3 } from 'react-icons/bs';

import useUploadModal from '@/hooks/useUploadModal';
import useMp3UploadModal from '@/hooks/useMp3UploadModal';
import useYoutubeUploadModal from '@/hooks/useYoutubeUploadModal';
import Modal from '.';
import Button from '../Button';

const UploadModal = () => {
    const { isOpen, handleClose } = useUploadModal();
    const mp3UploadModal = useMp3UploadModal();
    const youtubeUploadModal = useYoutubeUploadModal();

    const handleChange = (open: boolean) => {
        if (!open) {
            handleClose();
        }
    };

    return (
        <Modal
            title="Upload methods"
            description="Youtube link or Mp3 file"
            isOpen={isOpen}
            handleChange={handleChange}
        >
            <div className="flex justify-around">
                <Button
                    onClick={() => youtubeUploadModal.handleOpen()}
                    className="min-w-24 flex justify-center"
                >
                    <TfiYoutube size={30} />
                </Button>
                <Button
                    onClick={() => mp3UploadModal.handleOpen()}
                    className="min-w-24 flex justify-center"
                >
                    <BsFiletypeMp3 size={30} />{' '}
                </Button>
            </div>
        </Modal>
    );
};
export default UploadModal;
