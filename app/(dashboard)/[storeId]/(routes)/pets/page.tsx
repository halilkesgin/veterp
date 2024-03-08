import { format } from "date-fns"

import { db } from "@/lib/db"
import { Shell } from "@/components/shell"

import { PetsClient } from "./_components/client"
import { PetsColumn } from "./_components/columns"

interface PetsPageProps {
    params: { storeId: string }
}

const PetsPage = async ({
    params
}: PetsPageProps) => {
    const pets = await db.pet.findMany({
        where: {
            storeId: params.storeId 
        },
        include: {
            owner: true,
            kind: true,
            gen: true
        }
    })

    const formattedPets: PetsColumn[] = pets.map((pet) => ({
        id: pet.id,
        name: pet.name,
        ownerId: pet.owner.name,
        kindId: pet.kind.name,
        genId: pet.gen.name,
        createdAt: format(pet.createdAt, "MMMM")
    }))

    return (
        <Shell>
            <PetsClient data={formattedPets} />
        </Shell>
    )
}

export default PetsPage