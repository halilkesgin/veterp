"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type PetsColumn = {
    id: string
    name: string
    ownerId: string
    kindId: string
    genId: string
    createdAt: string
}

export const columns: ColumnDef<PetsColumn>[] = [
    {
        accessorKey: "name",
        header: "Ürün Adı"
    },
    {
        accessorKey: "ownerId",
        header: "Sahip ID",
    },
    {
        accessorKey: "kindId",
        header: "Tür"
    },
    {
        accessorKey: "genId",
        header: "Cins"
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