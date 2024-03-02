"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type StoragesColumn = {
    id: string
    name: string
    piece: string
    createdAt: string
}

export const columns: ColumnDef<StoragesColumn>[] = [
    {
        accessorKey: "name",
        header: "Depo Adı"
    },
    {
        accessorKey: "piece",
        header: "Stok Adet"
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