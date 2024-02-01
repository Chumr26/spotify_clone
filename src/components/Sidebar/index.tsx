'use client';

import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import Box from '../Box';
import SidebarItem from './SidebarItem';
import Playlist from '../Playlist';
import usePlayer from '@/hooks/usePlayer';
import HomeIcon from '../Icons/HomeIcon';
import SearchIcon from '../Icons/SearchIcon';

import useSidebar from '@/hooks/useSidebar';

interface SidebarPros {
    children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarPros) => {
    const pathname = usePathname();

    const player = usePlayer();
    const sidebar = useSidebar();

    const routes = [
        {
            label: 'Home',
            icon: HomeIcon,
            active: pathname === '/',
            href: '/',
        },
        {
            label: 'Search',
            icon: SearchIcon,
            active: pathname === '/search',
            href: '/search',
        },
    ];

    return (
        <div
            className={twMerge(
                'flex h-full overflow-x-hidden',
                player.activeSong && 'h-[calc(100%-80px)]'
            )}
        >
            <div
                className={twMerge(
                    'md:w-auto flex flex-col p-2 gap-y-2 transition',
                    sidebar.isOpen && 'w-full'
                )}
            >
                <Box>
                    <div className="flex flex-col gap-y-4 px-5 py-4">
                        {routes.map((item) => (
                            <SidebarItem key={item.label} {...item} />
                        ))}
                    </div>
                </Box>
                <Box className="h-[calc(100%-80px)] overflow-y-auto no-scrollbar">
                    <Playlist />
                </Box>
            </div>
            <main
                className={twMerge(
                    'md:block w-full py-2 pr-2',
                    sidebar.isOpen && 'hidden'
                )}
            >
                {children}
            </main>
        </div>
    );
};

export default Sidebar;
