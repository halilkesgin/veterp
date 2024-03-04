"use client"

import axios from "axios"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Store } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


interface SettingsFormProps {
    data: Store | null
}

export const SettingsForm = ({
    data
}: SettingsFormProps) => {
    const params = useParams()
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const formSchema = z.object({
        name: z.string().min(1),
        address: z.string().nullable(),
        phoneOne: z.string().nullable(),
        phoneTwo: z.string().nullable(),
        email: z.string().nullable(),
        map: z.string().nullable(),

    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data?.name || "",
            address: data?.address || "",
            phoneOne: data?.phoneOne || "",
            phoneTwo: data?.phoneTwo || "",
            email: data?.email || "",
            map: data?.map || ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            await axios.patch(`/api/stores/${params.storeId}`, values);
            router.refresh()
            toast.success('Store updated.')
        } catch (error: any) {
            toast.error('Something went wrong.')
        } finally {
            setIsLoading(false)
        }
    }

        return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Klinik Adı</FormLabel>
                                <FormControl>
                                    <Input disabled={isLoading} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid lg:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="phoneOne"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Telefon 1</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} {...field} value={field.name || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneTwo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Telefon 2</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} {...field} value={field.name || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={isLoading} className="ml-auto" type="submit">
                        Save changes
                    </Button>
                </form>
            </Form>
        )
    }