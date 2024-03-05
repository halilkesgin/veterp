import { create } from "zustand"

interface PasswordStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export const usePasswordModal = create<PasswordStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))