import { create } from 'zustand';

interface YoutubeUploadModalStore {
    isOpen: boolean;
    handleOpen: () => void;
    handleClose: () => void;
}

const useYoutubeUploadModal = create<YoutubeUploadModalStore>((set) => ({
    isOpen: false,
    handleOpen: () => set({ isOpen: true }),
    handleClose: () => set({ isOpen: false }),
}));

export default useYoutubeUploadModal;
