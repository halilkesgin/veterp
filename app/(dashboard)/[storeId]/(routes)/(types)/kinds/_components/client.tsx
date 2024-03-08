"use client"

import { DataTable } from "@/components/data-table"

import { columns, KindsColumn } from "./columns"

interface KindsColumnProps {
    data: KindsColumn[]
}

export const KindsClient = ({ 
    data 
}: KindsColumnProps) => {
    return (
        <div className="grid lg:grid-cols-3 gap-4">
            <div className="col-span-1">
                <div className="flex flex-col gap-1">
                    <h1 className="font-semibold">
                        Türler
                    </h1>
                	<p className="text-sm text-muted-foreground lg:max-w-80">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. A obcaecati debitis corrupti accusamus labore consequatur.
                	</p>
            	</div>
        	</div>
            <div className="col-span-2">
                <DataTable searchKey="name" link="kinds" columns={columns} data={data} />
            </div>
        </div>
    )
}
