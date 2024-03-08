"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type KindsColumn = {
    id: string
    name: string
    createdAt: string
}

export const columns: ColumnDef<KindsColumn>[] = [
    {
        accessorKey: "name",
        header: "Tür Adı"
    },
    {
        header: "İşlemler",
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    }
]