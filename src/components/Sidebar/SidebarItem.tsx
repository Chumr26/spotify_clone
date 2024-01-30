import Link from 'next/link';
import { IconType } from 'react-icons';

import useSidebar from '@/hooks/useSidebar';

interface SidebarItemProps {
    label: string;
    icon: IconType;
    active: boolean;
    href: string;
}

const SidebarItem = ({ label, icon: Icon, active, href }: SidebarItemProps) => {
    const sidebar = useSidebar();
    return (
        <Link
            href={href}
            className={`flex items-center py-1 pl-1 gap-x-4 font-medium cursor-pointer text-neutral-400 hover:text-white transition ${
                active && 'text-white'
            }`}
        >
            <Icon className="w-6" />
            {sidebar.isOpen && <p>{label}</p>}
        </Link>
    );
};

export default SidebarItem;
