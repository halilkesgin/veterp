"use client"

import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/heading"

import { columns, StoragesColumn } from "./columns"

interface StoragesClientProps {
    data: StoragesColumn[]
}

export const StoragesClient= ({ 
    data 
}: StoragesClientProps) => {
    const params = useParams()
    const router = useRouter()

    return (
        <>
            <div className="flex justify-between gap-4">
                <Heading title="Depo" description="Klinik'e ait deponuzu 'Yeni Depo' butonuna basarak oluşturun. " />
                <Button 
                    size="sm" 
                    onClick={() => router.push(`/${params.storeId}/storages/new`)} 
                    variant="outline"
                >
                    Yeni Depo
                </Button>
            </div>
            <DataTable searchKey="name" columns={columns} data={data} />
        </>
    )
}
