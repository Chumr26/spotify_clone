'use client';

import AuthModal from '@/components/Modal/AuthModal';
import Mp3UploadModal from '@/components/Modal/Mp3UploadModal';
import UploadModal from '@/components/Modal/UploadModal';
import YoutubeUploadModal from '@/components/Modal/YoutubeUploadModal';

const ModalProvider = () => {
    return (
        <>
            <AuthModal />
            <UploadModal />
            <Mp3UploadModal />
            <YoutubeUploadModal />
        </>
    );
};

export default ModalProvider;
