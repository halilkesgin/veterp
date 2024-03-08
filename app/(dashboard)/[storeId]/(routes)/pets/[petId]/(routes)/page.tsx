import { db } from "@/lib/db"
import { PetForm } from "./_components/pet-form"
import { Shell } from "@/components/shell"

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
            owner: true,
            gen: true
        }
    })

    const owners = await db.owner.findMany({
        where: {
            storeId: params.storeId,
        }
    })

    const kinds = await db.kind.findMany({
        where: {
            storeId: params.storeId,
        }
    })

    const gens = await db.gen.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            kind: true
        }
    })

    return (
        <Shell>
            <PetForm 
                data={pet} 
                owners={owners}
                kinds={kinds}
                gens={gens}
            />
        </Shell>
    )
}

export default PetIdPage