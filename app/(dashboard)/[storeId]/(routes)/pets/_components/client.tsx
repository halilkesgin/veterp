"use client"

import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/heading"

import { columns, PetsColumn } from "./columns"

interface PetsColumnProps {
    data: PetsColumn[]
}

export const PetsClient= ({ 
    data 
}: PetsColumnProps) => {
    const params = useParams()
    const router = useRouter()

    return (
        <>
            <div className="flex justify-between gap-4">
                <Heading title="Depo" description="Deponuza ürün ekleyin." />
                <Button 
                    size="sm" 
                    onClick={() => router.push(`/${params.storeId}/pets/new`)} 
                    variant="outline"
                >
                    Yeni Ürün
                </Button>
            </div>
            <DataTable searchKey="name" columns={columns} data={data} />
        </>
    )
}
