"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type GensColumn = {
    id: string
    name: string
    kindId: string
    createdAt: string
}

export const columns: ColumnDef<GensColumn>[] = [
    {
        accessorKey: "name",
        header: "Cins Adı"
    },
    {
        accessorKey: "kindId",
        header: "Tür Adı"
    },
    {
        header: "İşlemler",
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    }
]