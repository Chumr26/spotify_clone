import Modal from '.';
import useYoutubeUploadModal from '@/hooks/useYoutubeUploadModal';

const YoutubeUploadModal = () => {
    const { isOpen, handleClose } = useYoutubeUploadModal();

    const handleChange = (open: boolean) => {
        if (!open) {
            handleClose();
        }
    };

    return (
        <Modal
            title="Youtube"
            description="Upload a youtube link"
            isOpen={isOpen}
            handleChange={handleChange}
        >
            <div>youtube</div>
        </Modal>
    );
};
export default YoutubeUploadModal;
