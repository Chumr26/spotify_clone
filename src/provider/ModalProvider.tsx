'use client';

import Modal from '@/components/Modal';

const ModalProvider = () => {
    return (
        <>
            <Modal
                title="Test Modal"
                description="Test description"
                isOpen
                handleChange={() => {}}
            >
                Test children
            </Modal>
        </>
    );
};

export default ModalProvider;
