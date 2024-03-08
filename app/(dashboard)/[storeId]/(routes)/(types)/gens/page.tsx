import { format } from "date-fns"

import { db } from "@/lib/db"

import { Shell } from "@/components/shell"
import { GensClient } from "./_components/client"
import { GensColumn } from "./_components/columns"


interface GensPageProps {
    params: { storeId: string, kindId: string }
}

const GensPage = async ({
    params
}: GensPageProps) => {
    const gens = await db.gen.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            kind: true
        }
    })

    const formattedData: GensColumn[] = gens.map((data) => ({
        id: data.id,
        name: data.name,
        kindId: data.kind.name,
        createdAt: format(data.createdAt, "MMMM")
    }))

    return (
        <Shell>
            <GensClient data={formattedData} />
        </Shell>
    )
}

export default GensPage