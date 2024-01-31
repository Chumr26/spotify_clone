import Link from 'next/link';
import { useContext } from 'react';
import { IconType } from 'react-icons';

import useSidebar from '@/hooks/useSidebar';
import { LikedSongContext } from '@/provider/LikedSongsProvider';

interface SidebarItemProps {
    label: string;
    icon: IconType;
    active: boolean;
    href: string;
}

const SidebarItem = ({ label, icon: Icon, active, href }: SidebarItemProps) => {
    const sidebar = useSidebar();
    const likedSongs = useContext(LikedSongContext);
    return (
        <Link
            href={href}
            className={`flex items-center py-1 gap-x-4 font-medium cursor-pointer text-neutral-400 hover:text-white transition ${
                active && 'text-white'
            } ${likedSongs?.length && 'pl-1'}`}
        >
            <Icon className="w-6" />
            {sidebar.isOpen && <p>{label}</p>}
        </Link>
    );
};

export default SidebarItem;
