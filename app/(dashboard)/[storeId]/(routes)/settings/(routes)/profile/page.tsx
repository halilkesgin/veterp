import { Shell } from "@/components/shell"
import { Separator } from "@/components/ui/separator"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

import { ProfileForm } from "./_components/profile-form"
import { PasswordForm } from "./_components/password-form"
import { DangerZone } from "./_components/danger-zone"

const ProfilePage = async () => {
    const self = await currentUser()

    const user = await db.user.findUnique({
        where: {
            id: self?.id
        }
    })

    return (
        <Shell>
            <ProfileForm data={user} />
            <Separator />
            <PasswordForm />
            <Separator />
            <DangerZone />
        </Shell>
    )
}

export default ProfilePage