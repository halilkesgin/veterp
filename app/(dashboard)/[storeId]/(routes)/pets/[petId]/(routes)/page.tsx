import { db } from "@/lib/db"
import { PetForm } from "./_components/pet-form"

interface PetsIdPageProps {
    params: { storeId: string, petId: string }
}

const PetIdPage = async ({
    params
}: PetsIdPageProps) => {

    const pet = await db.pet.findUnique({
        where: {
            id: params.petId
        },
        include: {
            owner: true
        }
    })

    const owners = await db.owner.findMany({
        where: {
            storeId: params.storeId,
        }
    })

    return (
        <div>
            <PetForm data={pet} owner={owners} />
        </div>
    )
}

export default PetIdPage