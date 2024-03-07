import { Shell } from "@/components/shell"
import { currentStore } from "@/lib/store"
import { Separator } from "@/components/ui/separator"

import { SettingsForm } from "./_components/settings-form"
import { DangerZone } from "./_components/danger-zone"

const SettingsPage = async () => {
    const store = await currentStore()

    if (!store) {
        return null
    }

    return (
        <Shell>
            <SettingsForm data={store} />
            <Separator />
            <DangerZone />
        </Shell>
    )
}

export default SettingsPage