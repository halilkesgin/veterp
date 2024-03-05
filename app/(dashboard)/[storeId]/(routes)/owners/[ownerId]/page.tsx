import { db } from "@/lib/db"
import { OwnerForm } from "./_components/owner-form"
import { Shell } from "@/components/shell"

interface OwnerIdPageProps {
    params: { storeId: string, ownerId: string }
}

const OwnerIdPage = async ({
    params
}: OwnerIdPageProps) => {

    const owner = await db.owner.findUnique({
        where: {
            id: params.ownerId,
        }
    })

    return (
        <Shell>
            <OwnerForm data={owner} />
        </Shell>
    )
}

export default OwnerIdPage