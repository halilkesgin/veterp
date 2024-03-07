import { Shell } from "@/components/shell"

import { PetsCategoriesClient } from "./_components/client"
import { db } from "@/lib/db"
import { PetCategoriesColumn } from "./_components/columns"
import { format } from "date-fns"

interface PetCategoriesPageProps {
    params: { storeId: string, petCategoryId: string}
}

const PetCategoriesPage = async ({
    params
}: PetCategoriesPageProps) => {

    const petCategories = await db.petCategory.findMany({
        where: {
            storeId: params.storeId 
        }
    })

    const formattedProducts: PetCategoriesColumn[] = petCategories.map((petCategory) => ({
        id: petCategory.id,
        name: petCategory.name,
        createdAt: format(petCategory.createdAt, "MMMM")
    }))

    return (
        <Shell>
            <PetsCategoriesClient data={formattedProducts} />
        </Shell>
    )
}

export default PetCategoriesPage