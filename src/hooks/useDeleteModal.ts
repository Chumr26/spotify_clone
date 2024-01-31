import { Song } from '@/types';
import { create } from 'zustand';

interface DeleteModalStore {
    isOpen: boolean;
    song?: Song;
    handleOpen: (song: Song) => void;
    handleClose: () => void;
}

const useDeleteModal = create<DeleteModalStore>((set) => ({
    isOpen: false,
    song: undefined,
    handleOpen: (song) => set({ isOpen: true, song }),
    handleClose: () => set({ isOpen: false }),
}));

export default useDeleteModal;
