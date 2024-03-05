"use client"

import { useParams } from "next/navigation"
import { Box, LayoutDashboard, Settings, Users2Icon, Warehouse } from "lucide-react"

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { useSidebar } from "@/hooks/use-sidebar"

import { NavItem, NavItemSkeleton } from "./nav-item"
import { cn } from "@/lib/utils"

export const Nav = () => {
    const params = useParams()
    const { collapsed } = useSidebar((state) => state)
    
    const mainRoutes = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            href: `/${params.storeId}`
        },
        {
            label: "Depo",
            icon: Warehouse,
            href: `/${params.storeId}/storages`
        },
        {
            label: "Ürünler",
            icon: Box,
            href: `/${params.storeId}/products`
        },
        {
            label: "Sahipler",
            icon: Users2Icon,
            href: `/${params.storeId}/owners`
        },
        {
            label: "Ayarlar",
            icon: Settings,
            href: `/${params.storeId}/settings`
        },
    ]

    return (
        <div className="bg-background">
            <Command>
                {!collapsed && (
                    <CommandInput placeholder="Arama..." />
                )}
                <CommandList>
                    <CommandEmpty>Sonuç bulunamadı.</CommandEmpty>
                    <CommandGroup className="mt-2">
                        <div className="space-y-1 px-2">
                            {mainRoutes.map((route) => (
                                <CommandItem key={route.href} className={cn(
                                    "bg-transparent rounded-none hover:bg-transparent aria-selected:bg-transparent px-0 py-0",
                                )}>
                                    <NavItem
                                        label={route.label}
                                        icon={route.icon}
                                        href={route.href}
                                    />
                                </CommandItem>
                            ))}
                        </div>
                    </CommandGroup>
                </CommandList>
            </Command>
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