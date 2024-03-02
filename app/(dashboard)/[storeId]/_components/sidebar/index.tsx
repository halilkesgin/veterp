import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

import { Wrapper } from "./wrapper"
import { Nav, NavSkeleton } from "./nav"
import { Toggle, ToggleSkeleton } from "./toggle"
import { getStoreById } from "@/data/store"

export const Sidebar = async () => {
    const store = await getStoreById("isad")

    return (
        <Wrapper>
            <Toggle />
            <div className="space-y-4 pt-4 lg:pt-0">
                <Nav />
            </div>
        </Wrapper>
    )
}

export const SidebarSkeleton = () => {
    return (
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background z-50">
            <ToggleSkeleton />
            <NavSkeleton />
        </aside>
    )
}