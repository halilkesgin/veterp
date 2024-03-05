"use client"

import { Shell } from "@/components/shell"
import { Heading } from "@/components/heading"

import { ProfileForm } from "./_components/profile-form"
import { Button } from "@/components/ui/button"
import { useStoreModal } from "@/hooks/use-store-modal"

const ProfilePage = () => {
    const storeModal = useStoreModal()

    return (
        <Shell>
            <Heading title="Profil" />
            <ProfileForm />
            <Button onClick={() => storeModal.onOpen()}>
                Open
            </Button>
        </Shell>
    )
}

export default ProfilePage