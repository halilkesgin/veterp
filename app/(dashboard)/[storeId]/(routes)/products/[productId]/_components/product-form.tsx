"use client"

import * as z from "zod"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Product, Storage } from "@prisma/client"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductFormProps {
    data: Product | null
    storages: Storage[]
}

export const ProductForm = ({
    data,
    storages
}: ProductFormProps) => {
    const params = useParams()
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const formSchema = z.object({
        name: z.string().min(1),
        piece: z.string().min(1),
        price: z.string().min(1),
        storageId: z.string().min(1)
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data?.name || "",
            price: data?.price || "",
            piece: data?.piece || "",
            storageId: data?.storageId || ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            if (data) {
                await axios.patch(`/api/${params.storeId}/products/${params.storageId}`, values)
            } else {
                await axios.post(`/api/${params.storeId}/products`, values)
            }
            toast.success(data ? "Ürün güncellendi." : "Ürün oluşturuldu.")
            router.push(`/${params.storeId}/products`)
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
                            <FormLabel>Ürün Adı</FormLabel>
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
                            <FormLabel>Ürün Adet</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fiyat</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="storageId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Depo</FormLabel>
                            <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue defaultValue={field.value} placeholder="Select seniority" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {storages.map((storage) => (
                                        <SelectItem key={storage.id} value={storage.id}>{storage.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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