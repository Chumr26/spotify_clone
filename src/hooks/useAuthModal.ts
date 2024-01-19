import { create } from 'zustand';

interface AuthModalStore {
    isOpen: boolean;
    handleOpen: () => void;
    handleClose: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
    isOpen: false,
    handleOpen: () => set({ isOpen: true }),
    handleClose: () => set({ isOpen: false }),
}));

export default useAuthModal;
