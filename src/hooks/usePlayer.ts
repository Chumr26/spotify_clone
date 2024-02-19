import { Song } from '@/types';
import { create } from 'zustand';

interface PlayerStore {
    activeUrl?: string;
    activeSong?: Song;
    ids: string[];
    playedIds: string[];
    setActiveUrl: (activeUrl: string) => void;
    setActiveSong: (activeSong: Song) => void;
    setIds: (ids: string[]) => void;
    setPlayedIds: (id: string) => void;
    reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
    activeUrl: undefined,
    activeSong: undefined,
    ids: [],
    playedIds: [],
    setActiveUrl: (activeUrl) => set({ activeUrl }),
    setActiveSong: (activeSong) => set({ activeSong }),
    setIds: (ids) => set({ ids }),
    setPlayedIds: (playedId) =>
        set((state) => {
            if ([...state.playedIds, playedId].length === state.ids.length) {
                return { playedIds: [] };
            }
            return {
                playedIds: [...state.playedIds, playedId],
            };
        }),
    reset: () => set({ activeUrl: undefined, activeSong: undefined, ids: [] }),
}));

export default usePlayer;
