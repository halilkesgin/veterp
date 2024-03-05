import { format } from "date-fns"

import { Shell } from "@/components/shell"
import { db } from "@/lib/db"

import { OwnersColumn } from "./_components/columns"
import { OwnersClient } from "./_components/client"

interface OwnersPageProps {
    params: { storeId: string }
}

const OwnersPage = async ({
    params
}: OwnersPageProps) => {

    const owners = await db.owner.findMany({
        where: {
            storeId: params.storeId
        }
    })

    const formattedOwners: OwnersColumn[] = owners.map((owner) => ({
        id: owner.id,
        name: owner.name,
        surname: owner.surname,
        createdAt: format(owner.createdAt, "MMMM")
    }))

    return (
        <Shell>
            <OwnersClient data={formattedOwners} />
        </Shell>
    )
}

export default OwnersPage