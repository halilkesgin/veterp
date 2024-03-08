"use client"

import * as z from "zod"
import { Gen, Kind } from "@prisma/client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface GenFormProps {
    data: Gen | null
    kinds: Kind[]
}

export const GenForm = ({
    data,
    kinds
}: GenFormProps) => {
    const router = useRouter()
    const params = useParams()
    const [isLoading, setIsLoading] = useState(false)

    const formSchema = z.object({
        name: z.string(),
        kindId: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data?.name || "",
            kindId: data?.kindId || ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            if (data) {
                axios.patch(`/api/${params.storeId}/gens/${data.id}`, values)
            } else {
                axios.post(`/api/${params.storeId}/gens`, values)
            }
            toast.success(data ? "Cins güncellendi" : "Cins oluşturuldu.")
            router.refresh()
            router.push(`/${params.storeId}/gens`)
        } catch {
            toast.error("Hay aksi! Bir şeyler ters gitti!")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="grid lg:grid-cols-3 gap-4">
            <div className="col-span-1">
                <div className="flex flex-col gap-1">
                    <h1 className="font-semibold">
                        Cins {data ? "Güncelleme" : "Oluşturma"} 
                    </h1>
                	<p className="text-sm text-muted-foreground lg:max-w-80">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse eum molestiae deleniti quidem pariatur iure!
                	</p>
            	</div>
        	</div>
        	<div className="col-span-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid lg:grid-cols-2 gap-4">

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>İsim</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isLoading}
                                                />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="kindId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} placeholder="Tür seçiniz" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {kinds.map((kind) => (
                                                    <SelectItem key={kind.id} value={kind.id}>{kind.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button disabled={isLoading} size="sm" variant="bulury" type="submit">
                            Kaydet
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}