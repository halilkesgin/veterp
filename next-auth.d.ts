import { User, UserRole } from "@prisma/client"
import NextAuth, { type DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole
    phone: User.phone
    surname: User.surname
    isTwoFactorEnabled: boolean
    isOAuth: boolean
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}
