"use client"

import * as z from "zod"
import { Owner, Pet } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { toast } from "sonner"
import axios from "axios"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface PetFormProps {
    data: Pet | null
    owner: Owner[]
}

export const PetForm = ({
    data,
    owner
}: PetFormProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const params = useParams()

    const formSchema = z.object({
        name: z.string(),
        birthDate: z.date(),
        ownerId: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data?.name || "",
            birthDate: data?.birthDate || new Date("2010-01-01"),
            ownerId: data?.ownerId || ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            if (data) {
                axios.patch(`/api/${params.storeId}/pets/${data.id}`, values)
            } else {
                axios.post(`/api/${params.storeId}/pets`, values)
            }
        } catch {
            toast.error("Hay aksi! Bir şeyler ters gitti.")
        } finally {
            setIsLoading(false)
        }   
    }

    return (
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
                                    <Input {...field} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    )
}