'use client';

import AuthModal from '@/components/Modal/AuthModal';
import DeleteModal from '@/components/Modal/DeleteModal';
import Mp3UploadModal from '@/components/Modal/Mp3UploadModal';
import UpdateModal from '@/components/Modal/UpdateModal';
import UploadModal from '@/components/Modal/UploadModal';
import YoutubeUploadModal from '@/components/Modal/YoutubeUploadModal';

const ModalProvider = () => {
    return (
        <>
            <AuthModal />
            <UploadModal />
            <Mp3UploadModal />
            <YoutubeUploadModal />
            <DeleteModal />
            <UpdateModal />
        </>
    );
};

export default ModalProvider;
