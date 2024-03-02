import { redirect } from "next/navigation"
import { ReactNode } from "react"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

interface RootLayoutProps {
    children: ReactNode
}

const RootLayout = async ({
    children
}: RootLayoutProps) => {
    const user = await currentUser()

    if (!user) {
        redirect("/sign-in")
    }

    const store = await db.store.findFirst({
        where: {
            userId: user.id
        }
    });

    if (store) {
        redirect(`/${store.id}`)
    }

    return (
        <>
            {children}
        </>
    )
}

export default RootLayout