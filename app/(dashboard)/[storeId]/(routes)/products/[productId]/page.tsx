import { Shell } from "@/components/shell"
import { db } from "@/lib/db"

import { ProductForm } from "./_components/product-form"

interface ProductIdPageProps {
    params: { storeId: string, productId: string }
}

const ProductIdPage = async ({
    params
}: ProductIdPageProps) => {
    const product = await db.product.findUnique({
        where: {
            id: params.productId
        }
    })

    const storages = await db.storage.findMany({
        where: {
            storeId: params.storeId
        }
    })

    return (
        <Shell>
            <ProductForm 
                data={product} 
                storages={storages}
            />
        </Shell>
    )
}

export default ProductIdPage