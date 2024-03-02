import { auth } from "@/auth"

import { db } from "./db"

export const currentStore = async () => {
    const session = await auth()

    const store = await db.store.findFirst({
        where: {
            userId: session?.user.id
        }
    })

    return store
}