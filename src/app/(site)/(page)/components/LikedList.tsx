'use client';

import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { PiUploadSimpleBold } from 'react-icons/pi';

import LibraryIcon from '@/components/Icons/LibraryIcon';
import useAuthModal from '@/hooks/useAuthModal';
import useUploadModal from '@/hooks/useUploadModal';
import UploadButton from '@/components/UploadButton';

interface LikedListProps {
    name: string;
    href: string;
}

const LikedList = ({ name, href }: LikedListProps) => {
    const router = useRouter();
    const user = useUser();

    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    if (!user) return null;

    const handleClick = () => router.push(href);
    const handleUpload = () => {
        if (!user) {
            authModal.handleOpen();
        } else uploadModal.handleOpen();
    };
    return (
        <button
            onClick={handleClick}
            className="relative group pr-4 flex items-center rounded-md gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition overflow-hidden"
        >
            <LibraryIcon className="w-10 md:w-14 ml-2" />
            <p className="font-medium py-5">{name}</p>
            <div className="absolute right-5 flex items-center justify-center transition opacity-0 rounded-full bg-green-500 drop-shadow-md group-hover:opacity-100 hover:scale-110">
                <UploadButton size={26} className="hover:opacity-100" />
            </div>
        </button>
    );
};

export default LikedList;
