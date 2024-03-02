import { create } from "zustand"

interface StoreStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export const useStoreModal = create<StoreStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))