import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import './globals.tailwind.css';
import Sidebar from '@/components/Sidebar';
import SupabaseProvider from '@/provider/SupabaseProvider';
import ModalProvider from '@/provider/ModalProvider';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Spotify Clone',
    description: 'Listen to music!',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={font.className}>
                <SupabaseProvider>
                    <ModalProvider />
                    <Sidebar>{children}</Sidebar>
                </SupabaseProvider>
            </body>
        </html>
    );
}
