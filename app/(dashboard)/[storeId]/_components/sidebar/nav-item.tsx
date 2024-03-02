"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/hooks/use-sidebar"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Hint } from "@/components/hint"

interface NavItemProps {
    label: string
    icon: LucideIcon
    href: string
}

export const NavItem = ({ label, icon: Icon, href }: NavItemProps) => {
    const pathname = usePathname()
    const { collapsed } = useSidebar((state) => state)

    return (
        <Button
            asChild
            variant="ghost"
            className={cn(
                "w-full ",
                collapsed ? "justify-center" : "justify-start",
                pathname === href && "bg-accent",
            )}
        >
            <Link href={href}>
                <div className={cn(
                    "flex items-center gap-x-2",
                    collapsed && "justify-center"
                )}>
                    {collapsed ? (
                        <Hint label={label} side="right" asChild>
                            <Icon className="h-5 w-5" />
                        </Hint>
                    ) : (
                        <Icon className="h-5 w-5" />
                    )}
                    {!collapsed && (
                        <p className="truncate">
                            {label}
                        </p>
                    )}
                </div>
            </Link>
        </Button>
    )
}

export const NavItemSkeleton = () => {
    return (
        <li className="flex items-center gap-x-4 px-3 py-2">
            <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
            <div className="flex-1">
                <Skeleton className="h-6" />
            </div>
        </li>
    )
}