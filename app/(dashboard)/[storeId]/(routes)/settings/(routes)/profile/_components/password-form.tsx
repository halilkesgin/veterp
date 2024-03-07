"use client"

import { useTransition } from "react"
import { toast } from "sonner"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useCurrentUser } from "@/hooks/use-current-user"
import { PasswordSchema } from "@/schemas"
import { changePassword } from "@/actions/user"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const PasswordForm = () => {
    const user = useCurrentUser()

    const { update } = useSession()
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof PasswordSchema>>({
        resolver: zodResolver(PasswordSchema),
        defaultValues: {
            password: undefined,
            newPassword: undefined,
        }
    })

    const onSubmit = (values: z.infer<typeof PasswordSchema>) => {
        startTransition(() => {
            changePassword(values)
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
        <div className="grid lg:grid-cols-3 gap-4">
            <div className="col-span-1">
                <div className="flex flex-col gap-1">
                    <h1 className="font-semibold">
                        Şifre Değiştirme
                    </h1>
                	<p className="text-sm text-muted-foreground lg:max-w-80">
                        Hesabınızla ilişkili şifrenizi güncelleyin. 
                	</p>
            	</div>
        	</div>
        	<div className="col-span-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Eski Şifreniz</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Yeni Şifreniz</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isPending} size="sm" variant="bulury" type="submit">
                            Kaydet
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}