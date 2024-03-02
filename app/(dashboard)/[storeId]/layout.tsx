import { ReactNode, Suspense } from "react"
import { Navbar } from "./_components/navbar"
import { Sidebar, SidebarSkeleton } from "./_components/sidebar"
import { Container } from "@/components/container"
import { currentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"

interface StoreIdLayoutProps {
    children: ReactNode
    params: { storeId: string }
}

const StoreIdLayout = async ({
    children,
    params
}: StoreIdLayoutProps) => {
    const user = await currentUser()

    if (!user) {
        redirect("/sign-in")
    }

    const store = await db.store.findFirst({
        where: {
            id: params.storeId,
            userId: user.id
        }
    })

    if (!store) {
        redirect("/")
    }

    return (
        <>
            <Navbar />
            <div className="flex h-full pt-16">
                <Suspense fallback={<SidebarSkeleton />}>
                    <Sidebar />
                    <Container>
                        {children}
                    </Container>
                </Suspense>
            </div>
        </>
    )
}

export default StoreIdLayout