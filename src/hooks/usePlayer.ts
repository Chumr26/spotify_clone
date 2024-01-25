import { Song } from '@/types';
import { create } from 'zustand';

interface PlayerStore {
    activeUrl?: string;
    activeSong?: Song;
    ids: string[];
    setActiveUrl: (activeUrl: string) => void;
    setActiveSong: (activeSong: Song) => void;
    setIds: (ids: string[]) => void;
    reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
    activeUrl: undefined,
    activeSong: undefined,
    ids: [],
    setActiveUrl: (activeUrl) => set({ activeUrl }),
    setActiveSong: (activeSong) => set({ activeSong }),
    setIds: (ids) => set({ ids }),
    reset: () => set({ activeUrl: undefined, ids: [] }),
}));

export default usePlayer;
