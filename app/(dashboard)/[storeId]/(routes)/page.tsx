import { Shell } from "@/components/shell"
import { getStoreById } from "@/data/store"

interface HomePageProps {
    params: { storeId: string }
}

const HomePage = async ({
    params
}: HomePageProps) => {
    const store = await getStoreById(params.storeId)

    return (
        <Shell>
            {store?.name}
        </Shell>
    )
}

export default HomePage