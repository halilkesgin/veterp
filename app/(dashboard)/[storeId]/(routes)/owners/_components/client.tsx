"use client"

import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/heading"

import { columns, OwnersColumn } from "./columns"

interface OwnersColumnProps {
    data: OwnersColumn[]
}

export const OwnersClient= ({ 
    data 
}: OwnersColumnProps) => {
    const params = useParams()
    const router = useRouter()

    return (
        <>
            <div className="flex justify-between gap-4">
                <Heading title="Sahipler" />
                <Button 
                    size="sm" 
                    onClick={() => router.push(`/${params.storeId}/owners/new`)} 
                    variant="outline"
                >
                    Yeni Sahip
                </Button>
            </div>
            <DataTable searchKey="name" columns={columns} data={data} />
        </>
    )
}
