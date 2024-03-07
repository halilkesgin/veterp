"use client"

import { useParams, usePathname, useRouter } from "next/navigation"

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
        {
            label: "Entegrasyonlar",
            href: `/${params.storeId}/settings/integrations`
        },
    ]

    return (
        <div className="w-full h-14 items-center px-6 border-b flex gap-y-2 gap-x-4">
            <div className="flex items-center gap-x-4">
                {routes.map((route) => (
                    <Link key={route.href} href={route.href} className={cn(
                        "text-muted-foreground font-semibold text-sm",
                        pathname === `${route.href}` && "text-indigo-400" 
                        )}>
                        {route.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}