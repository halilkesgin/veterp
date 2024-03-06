import { ACTION, ENTITY_TPYE } from "@prisma/client"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

interface CreateLogProps {
    entityId: string
    entityType: ENTITY_TPYE
    entityTitle: string
    action: ACTION
}

export const createLog = async (props: CreateLogProps) => {
    try {
        const user = await currentUser()

        if (!user) {
            throw new Error("Unauthorized")
        }

        const { entityId, entityTitle, entityType, action } = props

        await db.log.create({
            data: {
                entityId,
                entityType,
                entityTitle,
                action,
                userId: user.id,
                name: `${user.name}`,
                surname: `${user.surname}`
            }
        })
    } catch (error) {
        console.log("Log error.", error)
    }
}