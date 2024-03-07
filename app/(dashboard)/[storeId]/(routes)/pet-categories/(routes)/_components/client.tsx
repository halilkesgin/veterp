"use client"

import { useParams, useRouter } from "next/navigation"


import { columns, PetCategoriesColumn } from "./columns"
import { DataTable } from "./data-table"

interface PetsCategoriesColumnProps {
    data: PetCategoriesColumn[]
}

export const PetsCategoriesClient= ({ 
    data 
}: PetsCategoriesColumnProps) => {
    const params = useParams()
    const router = useRouter()

    return (
        <div className="grid lg:grid-cols-3 gap-4">
            <div className="col-span-1">
                <div className="flex flex-col gap-1">
                    <h1 className="font-semibold">
                        Türler
                    </h1>
                	<p className="text-sm text-muted-foreground lg:max-w-80">
                        Kliniğinizde bulunan dostlarımızın türlerini buradan girebilirsiniz.
                	</p>
            	</div>
        	</div>
            <div className="col-span-2">
                <DataTable searchKey="name" columns={columns} data={data} />
            </div>
        </div>
    )
}
