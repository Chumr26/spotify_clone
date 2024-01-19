import { create } from 'zustand';

interface useUploadModalStore {
    isOpen: boolean;
    handleOpen: () => void;
    handleClose: () => void;
}

const useUploadModal = create<useUploadModalStore>((set) => ({
    isOpen: false,
    handleOpen: () => set({ isOpen: true }),
    handleClose: () => set({ isOpen: false }),
}));

export default useUploadModal;
