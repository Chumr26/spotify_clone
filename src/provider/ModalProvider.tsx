'use client';

import AuthModal from '@/components/Modal/AuthModal';
import UploadModal from '@/components/Modal/UploadModal';

const ModalProvider = () => {
    return (
        <>
            <AuthModal />
            <UploadModal />
        </>
    );
};

export default ModalProvider;
