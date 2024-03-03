import { db } from "@/lib/db"

export async function checkAvailableSpace(storageId: string, requestedPieces: number): Promise<boolean> {
    const storage = await db.storage.findUnique({
        where: {
            id: storageId
        },
        include: {
            products: true
        }
    })

    if (!storage) {
        throw new Error("Storage not found.")
    }

    const availableSpace = parseInt(storage.piece) - storage.products.reduce((total, product) => total + parseInt(product.piece), 0)

    return availableSpace >= requestedPieces
}