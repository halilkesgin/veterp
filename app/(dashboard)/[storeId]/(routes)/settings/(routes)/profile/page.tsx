"use client"

import { Shell } from "@/components/shell"
import { Separator } from "@/components/ui/separator"

import { ProfileForm } from "./_components/profile-form"
import { PasswordForm } from "./_components/password-form"
import { DangerZone } from "./_components/danger-zone"

const ProfilePage = () => {

    return (
        <Shell>
            <ProfileForm />
            <Separator />
            <PasswordForm />
            <Separator />
            <DangerZone />
        </Shell>
    )
}

export default ProfilePage