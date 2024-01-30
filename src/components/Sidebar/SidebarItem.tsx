
import Link from 'next/link';
import { IconType } from 'react-icons';

interface SidebarItemProps {
    label: string;
    icon: IconType;
    active: boolean;
    href: string;
}

const SidebarItem = ({ label, icon: Icon, active, href }: SidebarItemProps) => {
    return (
        <Link
            href={href}
            className={`flex items-center py-1 gap-x-4 font-medium cursor-pointer text-neutral-400 hover:text-white transition ${
                active && 'text-white'
            }`}
        >
            <Icon className='w-6'/>
            <p>{label}</p>
        </Link>
    );
};

export default SidebarItem;
