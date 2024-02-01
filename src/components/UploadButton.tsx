'use client';

import { PiUploadSimpleBold } from 'react-icons/pi';
import Button from './Button';
import useUploadModal from '@/hooks/useUploadModal';

const UploadButton = ({
    size,
    className,
}: {
    size: number;
    className?: string;
}) => {
    const uploadModal = useUploadModal();

    return (
        <Button
            onClick={(e) => {
                e.stopPropagation();
                uploadModal.handleOpen();
            }}
            className={className}
        >
            <PiUploadSimpleBold size={size} className="text-neutral-900" />
        </Button>
    );
};
export default UploadButton;
