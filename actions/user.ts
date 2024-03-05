"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"

import { update } from "@/auth"
import { db } from "@/lib/db"
import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { PasswordSchema, ProfileSchema } from "@/schemas"

export const updateUser = async (
    values: z.infer<typeof ProfileSchema>
) => {
    const user = await currentUser()

    if (!user) {
        return { error: "Unauthorized" }
    }

    const dbUser = await getUserById(user.id)

    if (!dbUser) {
        return { error: "Unauthorized" }
    }

    

    const updatedUser = await db.user.update({
        where: { 
            id: dbUser.id 
        },
        data: {
            ...values,
        }
    })

    update({
        user: {
            name: updatedUser.name,
            email: updatedUser.email,
            isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
            role: updatedUser.role,
        }
    })

    return { success: "Profile Updated!" }
}

export const changePassword = async (
    values: z.infer<typeof PasswordSchema>
) => {
    const user = await currentUser()

    if (!user) {
        return { error: "Unauthorized" }
    }

    const dbUser = await getUserById(user.id)

    if (!dbUser) {
        return { error: "Unauthorized" }
    }

    if (values.password && values.newPassword && dbUser.password) {
        const passwordsMatch = await bcrypt.compare(values.password, dbUser.password)

        if (!passwordsMatch) {
            return { error: "Incorrect password!" }
        }

        const hashedPassword = await bcrypt.hash(values.newPassword,10)
        
        values.password = hashedPassword
        values.newPassword = undefined
    }

     await db.user.update({
        where: { 
            id: dbUser.id 
        },
        data: {
            ...values,
        }
    })
    
    return { success: "Password Updated!" }
}