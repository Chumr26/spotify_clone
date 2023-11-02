import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

import Link from 'next/link';

interface SidebarItemProps {
    icon: IconType;
    lable: string;
    active?: boolean;
    href: string;
}

export default function SidebarItem({
    icon: Icon,
    lable,
    active,
    href,
}: SidebarItemProps) {
    return (
        <Link
            href={href}
            className={twMerge(
                `flex flex-row h-auto items-center w-full font-medium 
                hover:text-white transition text-neutral-400 py-1 gap-x-4`,
                active && 'text-white'
            )}
        >
            <Icon size={26}/>
            <p className='truncate'>{lable}</p>
        </Link>
    );
}
