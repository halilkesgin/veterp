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
    data: Store
}

export const SettingsForm = ({
    data
}: SettingsFormProps) => {
    const params = useParams()
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const formSchema = z.object({
        name: z.string().min(1)
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: data || {
            name: ""
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
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input disabled={isLoading} placeholder="Store name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isLoading} className="ml-auto" type="submit">
                    Save changes
                </Button>
            </form>
        </Form>
    )
}