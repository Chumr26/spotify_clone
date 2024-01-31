import Modal from '.';
import Button from '../Button';

import useUpdateModal from '@/hooks/useUpdateModal';

const UpdateModal = () => {
    const { isOpen, handleClose } = useUpdateModal();

    const handleChange = (open: boolean) => {
        if (!open) {
            handleClose();
        }
    };

    return (
        <Modal
            title="Update song"
            isOpen={isOpen}
            handleChange={handleChange}
        >
            Upload modal
        </Modal>
    );
};
export default UpdateModal;
