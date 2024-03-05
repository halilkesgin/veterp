"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type OwnersColumn = {
    id: string
    name: string
    surname: string
    createdAt: string
}

export const columns: ColumnDef<OwnersColumn>[] = [
    {
        accessorKey: "name",
        header: "İsim"
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