import NextAuth from "next-auth"
import { UserRole } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { db } from "@/lib/db"
import authConfig from "@/auth.config"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
    update,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { 
                    id: user.id 
                },
                data: { 
                    emailVerified: new Date() 
                }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            // Allow OAuth without email verification
            if (account?.provider !== "credentials") return true

            const existingUser = await db.user.findUnique({
                where: {
                    id: user.id
                }
            })

            // Prevent sign in without email verification
            if (!existingUser?.emailVerified) return false

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
            
                if (!twoFactorConfirmation) return false
            
                // Delete two factor confirmation for next sign in
                await db.twoFactorConfirmation.delete({
                    where: { 
                        id: twoFactorConfirmation.id 
                    }
                })
            }
            return true
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole
            }

            if (session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
            }

            if (session.user) {
                session.user.name = token.name
                session.user.surname = token.surname
                session.user.phone = token.phone
                session.user.image = token.image
                session.user.email = token.email
                session.user.isOAuth = token.isOAuth as boolean
            }
            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token

            const existingUser = await db.user.findUnique({
                where: {
                    id: token.sub
                }
            })

            if (!existingUser) return token

            const existingAccount = await db.user.findFirst({
                where: {
                    id: token.sub
                }
            })

            token.isOAuth = !!existingAccount
            token.name = existingUser.name
            token.surname = existingUser.surname
            token.phone = existingUser.phone
            token.email = existingUser.email
            token.image = existingUser.image
            token.role = existingUser.role
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})