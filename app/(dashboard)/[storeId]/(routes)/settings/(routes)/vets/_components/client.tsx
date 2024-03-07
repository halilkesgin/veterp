"use client"

import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/heading"

import { columns, VetsColumn } from "./columns"
import { DataTable } from "./data-table"

interface VetsColumnProps {
    data: VetsColumn[]
}

export const VetsClient= ({ 
    data 
}: VetsColumnProps) => {
    const params = useParams()
    const router = useRouter()

    return (
        <div className="grid lg:grid-cols-3 gap-4">
            <div className="col-span-1">
                <div className="flex flex-col gap-1">
                    <h1 className="font-semibold">
                        Veterinerler
                    </h1>
                	<p className="text-sm text-muted-foreground lg:max-w-80">
                        Kliniğinizde çalışan veterinerler ya da çalışanların bilgilerini girebilirsiniz. Unutmayın oluşturduğunuz her bir kullanıcı, kliniklerinize de erişebilecektir.
                	</p>
            	</div>
        	</div>
            <div className="col-span-2">
                <DataTable searchKey="name" columns={columns} data={data} />
            </div>
        </div>
    )
}
