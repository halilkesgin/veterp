"use client"

import { LogOut, User2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCurrentUser } from "@/hooks/use-current-user"
import Link from "next/link"
import { LogoutButton } from "@/components/logout-button"
import { useParams } from "next/navigation"

export const UserButton = () => {
    const params = useParams()
    const user = useCurrentUser()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                >
                    <User2 className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    {user?.name} {user?.surname}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href={`/${params.storeId}/profile`} className="flex items-center gap-x-2"> 
                        <User2 className="h-4 w-4" />
                        <span>Profi</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LogoutButton>
                        <div className="flex items-center gap-x-2">
                            <LogOut className="h-4 w-4" />
                            <span>Çıkış</span>
                        </div>
                    </LogoutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}