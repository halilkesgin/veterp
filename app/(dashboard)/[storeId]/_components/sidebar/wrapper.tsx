"use client"

import { useEffect, useState } from "react"

import { useSidebar } from "@/hooks/use-sidebar"
import { cn } from "@/lib/utils"

import { ToggleSkeleton } from "./toggle"
import { NavSkeleton } from "./nav"

interface WrapperProps {
    children: React.ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
    const [isClient, setIsClient] = useState(false)
    const { collapsed } = useSidebar((state) => state)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return (
            <aside className="fixed left-0 flex flex-col w-[70px] bg-background lg:w-60 h-full border-r z-50">
                <ToggleSkeleton />
                <NavSkeleton />
            </aside>
        )
    }

    return (
        <aside className={cn(
            "fixed left-0 flex flex-col w-60 h-full border-r bg-background z-50 transition-all duration-300",
            collapsed && "w-[70px]"
        )}>
            {children}
        </aside>
    )
}