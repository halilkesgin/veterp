"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type PetCategoriesColumn = {
    id: string
    name: string
    createdAt: string
}

export const columns: ColumnDef<PetCategoriesColumn>[] = [
    {
        accessorKey: "name",
        header: "Ürün Adı"
    },
    {
        header: "İşlemler",
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    }
]