import { db } from "@/lib/db"

export const getStoreById = async (id: string) => {
    try {
        const store = await db.store.findUnique({
            where: {
                id
            }
        })

        return store
    } catch {
        return null
    }
}