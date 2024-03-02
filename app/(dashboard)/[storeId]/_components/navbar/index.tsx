import { db } from "@/lib/db"
import StoreSwitcher from "./store-switcher"
import { currentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { UserButton } from "./user-button"

export const Navbar = async () => {
    const user = await currentUser()

    if (!user) {
        redirect("/sign-in")
    }

    const stores = await db.store.findMany({
        where: {
            userId: user.id
        }
    })

    return (
        <div className="fixed top-0 w-full h-16 z-[49] bg-background px-2 lg:px-4 flex justify-between items-center border-b">
            <div className="flex lg:gap-x-32 gap-x-4 items-center">
               
                <StoreSwitcher items={stores} />
            </div>
            <div className="flex items-center gap-x-2 lg:pr-6 pr-0">
                <ModeToggle />
                <UserButton />
            </div>
        </div>
    )
}