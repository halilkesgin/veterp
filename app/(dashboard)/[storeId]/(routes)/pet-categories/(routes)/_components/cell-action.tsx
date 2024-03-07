"use client"

import axios from "axios"
import { useState } from "react"
import { Edit, Trash2 } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { AlertModal } from "@/components/ui/alert-modal"

import { PetCategoriesColumn } from "./columns"

interface CellActionProps {
    data: PetCategoriesColumn
}

export const CellAction = ({ 
    data 
}: CellActionProps) => {
    const params = useParams()
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const onDelete = async () => {
        try {
            setIsLoading(true)
            toast.success("Kategori silindi.")
            router.refresh()
        } catch (error) {
            toast.error("Hay aksi! Bir şeyler ters gitti.")
        } finally {
            setIsOpen(false)
            setIsLoading(false)
        }
    }

    return (
        <>
            <AlertModal 
                isOpen={isOpen} 
                onClose={() => setIsOpen(false)}
                onConfirm={onDelete}
                disabled={isLoading}
            />
            <div className="flex gap-x-2 items-center">
                <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => router.push(`/${params.storeId}/pet-categories/${data.id}`)}
                >
                    <Edit className="w-4 h-4" /> 11
                </Button>
                <Button 
                    variant="destructive"
                    size="icon" 
                    onClick={() => setIsOpen(true)}
                >
                    <Trash2 className="w-4 h-4" /> 
                </Button>
            </div>
        </>
    )
}
