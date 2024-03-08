import { Shell } from "@/components/shell"

import { KindForm } from "./_components/kind-form"
import { db } from "@/lib/db"

interface KindIdPageProps {
    params: { kindId: string }
}

const KindIdPage = async ({
    params
}: KindIdPageProps) => {
    const kind = await db.kind.findUnique({
        where: {
            id: params.kindId
        }
    })

    return (
        <Shell>
            <KindForm data={kind} />
        </Shell>
    )
}

export default KindIdPage