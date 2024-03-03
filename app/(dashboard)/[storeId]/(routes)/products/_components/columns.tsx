"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type ProductsColumn = {
    id: string
    name: string
    piece: string
    createdAt: string
}

export const columns: ColumnDef<ProductsColumn>[] = [
    {
        accessorKey: "name",
        header: "Ürün Adı"
    },
    {
        accessorKey: "piece",
        header: "Ürün Adet"
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