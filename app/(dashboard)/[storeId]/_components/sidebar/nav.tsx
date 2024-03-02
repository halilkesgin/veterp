"use client"

import { useParams } from "next/navigation"
import { LayoutDashboard, Settings } from "lucide-react"

import { NavItem, NavItemSkeleton } from "./nav-item"

export const Nav = () => {
    const params = useParams()

    const mainRoutes = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            href: `/${params.storeId}`
        },
        {
            label: "Settings",
            icon: Settings,
            href: `/${params.storeId}/settings`
        }
    ]

    return (
        <div className="bg-background">
            <ul className="space-y-1 px-2">
                {mainRoutes.map((route) => (
                    <NavItem
                        key={route.href}
                        label={route.label}
                        icon={route.icon}
                        href={route.href}
                    />
                ))}
            </ul>
        </div>
    )
}

export const NavSkeleton = () => {
    return (
        <ul className="px-2">
            {[...Array(3)].map((_, i) => (
                <NavItemSkeleton key={i} />
            ))}
        </ul>
    )
}