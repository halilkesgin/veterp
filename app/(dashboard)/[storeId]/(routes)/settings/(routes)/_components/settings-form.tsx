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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon, LandPlot, Mail, Phone } from "lucide-react"
import FileUpload from "@/components/file-upload"


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
        address: z.string(),
        phoneOne: z.string(),
        phoneTwo: z.string(),
        email: z.string(),
        map: z.string(),
        image: z.string()

    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: data || {
            name: "",
            address: "",
            phoneOne: "",
            phoneTwo: "",
            email: "",
            map: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            await axios.patch(`/api/stores/${params.storeId}`, values);
            router.refresh()
            toast.success("Klinik güncellendi.")
        } catch (error: any) {
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
                        <FormField
                            disabled={isLoading}
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <FileUpload
                                            apiEndpoint="storeLogo"
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid lg:grid-cols-2 gap-4">
                            
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
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input disabled={isLoading} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid lg:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="phoneOne"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Telefon 1</FormLabel>
                                        <FormControl>
                                            <Input disabled={isLoading} {...field}  />
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
                                            <Input disabled={isLoading} {...field}  />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid lg:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Adres</FormLabel>
                                        <FormControl>
                                            <Input disabled={isLoading} {...field}  />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="map"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Google Harita URL</FormLabel>
                                        <FormControl>
                                            <Input disabled={isLoading} {...field}  />
                                        </FormControl>
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