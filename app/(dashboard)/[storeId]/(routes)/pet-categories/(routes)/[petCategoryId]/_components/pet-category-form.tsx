"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { PetCategory } from "@prisma/client"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Form } from "@/components/ui/form"

interface Props {
    data: PetCategory | null
}

export const PetCategoryForm = ({
    data
}: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const params = useParams()

    const formSchema = z.object({
        name: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data?.name || ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            if (data) {
                axios.patch(`/${params.storeId}/pet-categories/${data.id}`, values)
            } else {
                axios.post(`/${params.store}/pet-categories`, values)
            }
            toast.success("Pet kategori oluşturuldu.")
            router.push(`/${params.storeId}/pet-categories`)
            router.refresh()
        } catch {
            toast.error("Hay aksi! Bir şeyler ters gitti.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="grid lg:grid-cols-3 gap-4">
            <div className="col-span-1">
                <div className="flex flex-col gap-1">
                    <h1 className="font-semibold">
                        Klinik Bilgileri
                    </h1>
                    <p className="text-sm text-muted-foreground lg:max-w-80">
                        Kliniğiniz ile ilgili önemli bilgileri doldurunuz.
                    </p>
                </div>
            </div>
            <div className="col-span-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    </form>
                </Form>
            </div>
        </div>
    )
}