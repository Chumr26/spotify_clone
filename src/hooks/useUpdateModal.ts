import { Song } from '@/types';
import { create } from 'zustand';

interface UpdateModalStore {
    isOpen: boolean;
    song?: Song;
    handleOpen: (song: Song) => void;
    handleClose: () => void;
}

const useUpdateModal = create<UpdateModalStore>((set) => ({
    isOpen: false,
    song: undefined,
    handleOpen: (song) => set({ isOpen: true, song }),
    handleClose: () => set({ isOpen: false }),
}));

export default useUpdateModal;
