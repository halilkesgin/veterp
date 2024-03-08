import { Shell } from "@/components/shell"

import { GenForm } from "./_components/gen-form"
import { db } from "@/lib/db"

interface GenIdPageProps {
    params: { genId: string, storeId: string }
}

const GenIdPage = async ({
    params
}: GenIdPageProps) => {
    const gen = await db.gen.findUnique({
        where: {
            id: params.genId
        }
    })

    const kinds = await db.kind.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: "asc"
        }
    })

    return (
        <Shell>
            <GenForm data={gen} kinds={kinds}  />
        </Shell>
    )
}

export default GenIdPage