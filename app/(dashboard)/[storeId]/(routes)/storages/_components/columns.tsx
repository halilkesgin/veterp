"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type StoragesColumn = {
    id: string
    name: string
    piece: number
    availablePiece: string
    createdAt: string
}

export const columns: ColumnDef<StoragesColumn>[] = [
    {
        accessorKey: "name",
        header: "Depo Adı"
    },
    {
        accessorKey: "piece",
        header: "Toplam Alan"
    },
    {
        accessorKey: "availablePiece",
        header: "Kullanılabilir Alan"
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