import { create } from 'zustand';

interface UpdateModalStore {
    isOpen: boolean;
    handleOpen: () => void;
    handleClose: () => void;
}

const useUpdateModal = create<UpdateModalStore>((set) => ({
    isOpen: false,
    handleOpen: () => set({ isOpen: true }),
    handleClose: () => set({ isOpen: false }),
}));

export default useUpdateModal;
