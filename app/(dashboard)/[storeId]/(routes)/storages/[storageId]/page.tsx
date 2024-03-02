import { Shell } from "@/components/shell"
import { db } from "@/lib/db"

import { StorageForm } from "./_components/storage-form"

interface StorageIdPageProps {
    params: { storageId: string }
}

const StorageIdPage = async ({
    params
}: StorageIdPageProps) => {

    const storage = await db.storage.findUnique({
        where: {
            id: params.storageId
        }
    })

    return (
        <Shell>
            <StorageForm data={storage} />
        </Shell>
    )
}

export default StorageIdPage