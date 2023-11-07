'use client';

import { twMerge } from 'tailwind-merge';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import Box from './Box';
import SidebarItem from './SidebarItem';
import Library from './Library';

import { Song } from '@/types';

import usePlayer from '@/hooks/usePlayer';

interface SidebarProps {
    children: React.ReactNode;
    songs: Song[];
}

export default function Sidebar({ children, songs }: SidebarProps) {
    const pathname = usePathname();
    const routes = useMemo(
        () => [
            {
                lable: 'Home',
                icon: HiHome,
                active: pathname === '/',
                href: '/',
            },
            {
                lable: 'Search',
                icon: BiSearch,
                active: pathname === '/search',
                href: '/search',
            },
        ],
        [pathname]
    );
    const player = usePlayer();
    return (
        <div
            className={twMerge(
                'flex h-full',
                player.activeId && 'h-[calc(100%-80px)]'
            )}
        >
            <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
                <Box>
                    <div className="flex flex-col gap-y-4 px-5 py-4">
                        {routes.map((route) => (
                            <SidebarItem key={route.lable} {...route} />
                        ))}
                    </div>
                </Box>
                <Box className="overflow-auto h-full">
                    <Library songs={songs} />
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    );
}
