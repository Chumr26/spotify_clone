import { create } from 'zustand';

interface Mp3UploadModalStore {
    isOpen: boolean;
    handleOpen: () => void;
    handleClose: () => void;
}

const useMp3UploadModal = create<Mp3UploadModalStore>((set) => ({
    isOpen: false,
    handleOpen: () => set({ isOpen: true }),
    handleClose: () => set({ isOpen: false }),
}));

export default useMp3UploadModal;
