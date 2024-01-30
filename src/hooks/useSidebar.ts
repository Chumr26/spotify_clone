import { create } from 'zustand';

interface SidebarStore {
    isOpen: boolean;
    handleOpen: () => void;
    handleClose: () => void;
}

const useSidebar = create<SidebarStore>((set) => ({
    isOpen: false,
    handleOpen: () => set({ isOpen: true }),
    handleClose: () => set({ isOpen: false }),
}));

export default useSidebar;
