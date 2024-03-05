import { Shell } from "@/components/shell"
import { Heading } from "@/components/heading"
import { currentStore } from "@/lib/store"
import { SettingsForm } from "./_components/settings-form"

const SettingsPage = async () => {
    const store = await currentStore()

    if (!store) {
        return null
    }

    return (
        <Shell>
            <Heading title="Ayarlar" />
            <SettingsForm data={store} />
        </Shell>
    )
}

export default SettingsPage