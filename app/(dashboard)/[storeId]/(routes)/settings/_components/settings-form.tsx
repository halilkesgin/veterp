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
            <div className="grid lg:grid-cols-4 gap-4">
                <div className="col-span-1">
                    <Card>
                        <CardHeader className="flex items-center justify-center">
                            <div className="flex items-center justify-center h-[100px] w-[100px] rounded-lg border">
                                <ImageIcon className="h-5 w-5" />
                            </div>
                            <CardTitle className="text-lg font-semibold">
                                {data?.name || ""}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-1">
                            <div className="flex items-center gap-x-2">
                                <Mail className="h-4 w-4" />
                                <span className="text-sm text-muted-foreground">{data?.email || ""}</span>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <Phone className="h-4 w-4" />
                                <span className="text-sm text-muted-foreground">{data?.phoneOne || ""}</span>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <Phone className="h-4 w-4" />
                                <span className="text-sm text-muted-foreground">{data?.phoneTwo || ""}</span>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <LandPlot className="h-4 w-4" />
                                <span className="text-sm text-muted-foreground">{data?.address || ""}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="col-span-3">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                            <div className="flex justify-end">
                                <Button disabled={isLoading} variant="outline" type="submit">
                                    Kaydet
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        )
    }