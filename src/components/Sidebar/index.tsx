'use client';

import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import Box from '../Box';
import SidebarItem from './SidebarItem';
import Playlist from '../Playlist';
import { Song } from '@/types';
import usePlayer from '@/hooks/usePlayer';
import HomeIcon from '../Icons/HomeIcon';
import SearchIcon from '../Icons/SearchIcon';

interface SidebarPros {
    children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarPros) => {
    const pathname = usePathname();
    const player = usePlayer();

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
                'flex h-full',
                player.activeSong && 'h-[calc(100%-80px)]'
            )}
        >
            <div className="flex flex-col p-2 gap-y-2 transition">
                <Box>
                    <div className="flex flex-col gap-y-4 px-5 py-4">
                        {routes.map((item) => (
                            <SidebarItem key={item.label} {...item} />
                        ))}
                    </div>
                </Box>
                <Box className="h-full">
                    <Playlist />
                </Box>
            </div>
            <main className="w-full md:py-2 md:pr-2">{children}</main>
        </div>
    );
};

export default Sidebar;
