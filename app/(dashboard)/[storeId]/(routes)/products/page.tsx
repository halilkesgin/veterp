import { format } from "date-fns"

import { db } from "@/lib/db"
import { Shell } from "@/components/shell"

import { ProductsClient } from "./_components/client"
import { ProductsColumn } from "./_components/columns"

interface ProductsPageProps {
    params: { storeId: string }
}

const ProductsPage = async ({
    params
}: ProductsPageProps) => {
    const products = await db.product.findMany({
        where: {
            storeId: params.storeId 
        }
    })

    const formattedProducts: ProductsColumn[] = products.map((product) => ({
        id: product.id,
        name: product.name,
        piece: product.piece,
        createdAt: format(product.createdAt, "MMMM")
    }))

    return (
        <Shell>
            <ProductsClient data={formattedProducts} />
        </Shell>
    )
}

export default ProductsPage