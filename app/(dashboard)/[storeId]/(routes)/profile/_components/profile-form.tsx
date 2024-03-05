"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition, useState } from "react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { ImageIcon } from "lucide-react"

import { ProfileSchema } from "@/schemas"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCurrentUser } from "@/hooks/use-current-user"
import { updateUser } from "@/actions/user"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export const ProfileForm = () => {
    const user = useCurrentUser()

    const { update } = useSession()
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            name: user?.name || "",
            surname: user?.surname || "",
            phone: user?.phone || "",
            email: user?.email || "",
        }
    })

    const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
        startTransition(() => {
            updateUser(values)
                .then((data) => {
                    if (data.error) {
                        toast.error("Hay aksi! Bir şeyler ters gitti.")
                    }
              
                    if (data.success) {
                        update()
                        toast.success("Profil güncellendi.")
                    }
                })
                .catch(() => toast.error("Hay aksi! Bir şeyler ters gitti."))
        })
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
                            {user?.name || ""} {user?.surname || ""}
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>
            <div className="col-span-3">
                <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="surname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Soyisim</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid lg:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Telefon</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button disabled={isPending} variant="outline" type="submit">
                                Kaydet
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}