import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import './globals.tailwind.css';
import Sidebar from '@/components/Sidebar';
import SupabaseProvider from '@/provider/SupabaseProvider';
import ModalProvider from '@/provider/ModalProvider';
import ToasterProvider from '@/provider/ToasterProvider';
import getSongsByUserId from '@/actions/getSongsByUserId';
import Player from '@/components/Player';
import LikedSongsProvider from '@/provider/LikedSongsProvider';
import getLikedSongs from '@/actions/getLikedSongs';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Spotify Clone',
    description: 'Listen to music!',
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const songs = await getSongsByUserId();
    const likedSongs = await getLikedSongs();
    return (
        <html lang="en">
            <body className={font.className}>
                <ToasterProvider />
                <SupabaseProvider>
                    <ModalProvider />
                    <LikedSongsProvider likedSongs={likedSongs}>
                        <Sidebar songs={songs}>{children}</Sidebar>
                        <Player />
                    </LikedSongsProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
