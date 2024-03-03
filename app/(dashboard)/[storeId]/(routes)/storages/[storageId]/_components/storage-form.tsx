"use client"

import * as z from "zod"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Prisma, Storage } from "@prisma/client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import axios from "axios"

import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface StorageFormProps {
    data: Storage | null
}

export const StorageForm = ({
    data
}: StorageFormProps) => {
    const params = useParams()
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const formSchema = z.object({
        name: z.string().min(1),
        piece: z.number(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: data || {
            name: "",
            piece: 0
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            if (data) {
                await axios.patch(`/api/${params.storeId}/storages/${params.storageId}`, values)
            } else {
                await axios.post(`/api/${params.storeId}/storages`, values)
            }
            toast.success(data ? "Depo güncellendi." : "Depo oluşturuldu.")
            router.push(`/${params.storeId}/storages`)
            router.refresh()

        } catch {
            toast.error("Hay aksi! Bir şeyler ters gitti.")
        } finally {
            setIsLoading(false)
        }
    }

    console.log(onSubmit)

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField 
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Depo Adı</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="piece"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Depo Stok</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isLoading} />
                            </FormControl> 
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    variant="outline"
                    type="submit"
                    disabled={isLoading}
                >
                    Değişiklikleri Kaydet
                </Button>
            </form>
        </Form>
    )
}