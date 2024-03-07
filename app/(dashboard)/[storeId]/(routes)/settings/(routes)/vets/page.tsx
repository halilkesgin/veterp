import { format } from "date-fns"

import { db } from "@/lib/db"
import { Shell } from "@/components/shell"

import { VetsClient } from "./_components/client"
import { VetsColumn } from "./_components/columns"

interface ProductsPageProps {
    params: { storeId: string }
}

const VetsPage = async ({
    params
}: ProductsPageProps) => {
    const products = await db.product.findMany({
        where: {
            storeId: params.storeId 
        }
    })

    const formattedProducts: VetsColumn[] = products.map((product) => ({
        id: product.id,
        name: product.name,
        piece: product.piece,
        createdAt: format(product.createdAt, "MMMM")
    }))

    return (
        <Shell>
            <VetsClient data={formattedProducts} />
        </Shell>
    )
}

export default VetsPage