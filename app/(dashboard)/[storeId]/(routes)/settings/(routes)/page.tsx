import { Shell } from "@/components/shell"
import { currentStore } from "@/lib/store"
import { Separator } from "@/components/ui/separator"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

import { SettingsForm } from "./_components/settings-form"
import { DangerZone } from "./_components/danger-zone"

interface SettingsPageProps {
    params: { storeId: string }
}

const SettingsPage = async ({
    params
}: SettingsPageProps) => {
    const self = await currentUser()

    const store = await db.store.findUnique({
        where: {
            id: params.storeId
        }
    })

    return (
        <Shell>
            <SettingsForm data={store} />
            <Separator />
            <DangerZone />
        </Shell>
    )
}

export default SettingsPage