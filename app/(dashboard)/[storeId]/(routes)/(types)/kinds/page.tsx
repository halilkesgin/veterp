import { format } from "date-fns"

import { db } from "@/lib/db"
import { Shell } from "@/components/shell"

import { KindsClient } from "./_components/client"
import { KindsColumn } from "./_components/columns"

interface ProductsPageProps {
    params: { storeId: string }
}

const KindsPage = async ({
    params
}: ProductsPageProps) => {
    const kinds = await db.kind.findMany({
        where: {
            storeId: params.storeId 
        }
    })

    const formattedData: KindsColumn[] = kinds.map((data) => ({
        id: data.id,
        name: data.name,
        createdAt: format(data.createdAt, "MMMM")
    }))

    return (
        <Shell>
            <KindsClient data={formattedData} />
        </Shell>
    )
}

export default KindsPage