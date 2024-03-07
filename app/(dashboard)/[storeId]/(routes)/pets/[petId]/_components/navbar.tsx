"use client"

import { useParams, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"

export const Navbar = () => {
    const params = useParams()
    const pathname = usePathname()

    const routes = [
        {
            label: "Klinik",
            href: `/${params.storeId}/settings`
        },
        {
            label: "Profil",
            href: `/${params.storeId}/settings/profile`
        },
        {
            label: "Veterinerler",
            href: `/${params.storeId}/settings/vets`
        },
        {
            label: "Bildirimler",
            href: `/${params.storeId}/settings/notifications`
        },
    ]

    if (pathname.startsWith(`/${params.storeId}/pets/new`)) {
        return null
    }

    return (
        <div className="w-full h-14 items-center px-6 border-b flex gap-y-2 gap-x-4">
            <div className="flex items-center gap-x-4">
                {routes.map((route) => (
                    <Link key={route.href} href={route.href} passHref>
                        <div className={cn(
                            "text-muted-foreground font-semibold text-sm",
                            pathname.startsWith(route.href) && !pathname.includes("/settings", `${route.href}/`.length) ? "text-indigo-400" : ""
                        )}>
                            {route.label}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
