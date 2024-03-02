import { format } from "date-fns"

import { db } from "@/lib/db"
import { Shell } from "@/components/shell"

import { StoragesClient } from "./_components/client"
import { StoragesColumn } from "./_components/columns"

interface StoragesPageProps {
    params: { storeId: string }
}

const StoragesPage = async ({
    params
}: StoragesPageProps) => {
    const storages = await db.storage.findMany({
        where: {
            storeId: params.storeId 
        }
    })

    const formattedStorages: StoragesColumn[] = storages.map((storage) => ({
        id: storage.id,
        name: storage.name,
        piece: storage.piece,
        createdAt: format(storage.createdAt, "MMMM")
    }))

    return (
        <Shell>
            <StoragesClient data={formattedStorages} />
        </Shell>
    )
}

export default StoragesPage