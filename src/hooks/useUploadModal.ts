import { create } from 'zustand';

interface UploadModalStore {
    isOpen: boolean;
    handleOpen: () => void;
    handleClose: () => void;
}

const useUploadModal = create<UploadModalStore>((set) => ({
    isOpen: false,
    handleOpen: () => set({ isOpen: true }),
    handleClose: () => set({ isOpen: false }),
}));

export default useUploadModal;
