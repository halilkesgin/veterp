"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { CellAction } from "./cell-action"

import { Button } from "@/components/ui/button"

export type OwnersColumn = {
    id: string
    name: string
    surname: string
    createdAt: string
}

export const columns: ColumnDef<OwnersColumn>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                İsim
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
    },
    },
    {
        accessorKey: "surname",
        header: "Soyisim"
    },
    {
        accessorKey: "createdAt",
        header: "Oluşturulma Tarihi"
    },
    {
        header: "İşlemler",
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    }
]