import { Heading } from "@/components/heading"
import { Shell } from "@/components/shell"
import Link from "next/link"

interface OwnersPageProps {
    params: { storeId: string }
}

const OwnersPage = ({
    params
}: OwnersPageProps) => {
    return (
        <Shell>
            <Heading title="Sahipler" />
            <Link href={`/${params.storeId}/owners/new`}>
                Oluştur
            </Link>
        </Shell>
    )
}

export default OwnersPage