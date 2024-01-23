import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import './globals.tailwind.css';
import Sidebar from '@/components/Sidebar';
import SupabaseProvider from '@/provider/SupabaseProvider';
import ModalProvider from '@/provider/ModalProvider';
import ToasterProvider from '@/provider/ToasterProvider';
import getSongsByUserId from '@/actions/getSongsByUserId';

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
    return (
        <html lang="en">
            <body className={font.className}>
                <ToasterProvider />
                <SupabaseProvider>
                    <ModalProvider />
                    <Sidebar songs={songs}>{children}</Sidebar>
                </SupabaseProvider>
            </body>
        </html>
    );
}
