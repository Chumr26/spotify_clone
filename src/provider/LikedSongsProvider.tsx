'use client';

import { createContext } from 'react';

import { Song } from '@/types';

export const LikedSongContext = createContext<Song[] | undefined>(undefined);

const LikedSongsProvider = ({
    likedSongs,
    children,
}: {
    children: React.ReactNode;
    likedSongs: Song[];
}) => {
    return (
        <LikedSongContext.Provider value={likedSongs}>
            {children}
        </LikedSongContext.Provider>
    );
};

export default LikedSongsProvider;
