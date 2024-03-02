"use client"

import { useTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { register } from "@/actions/register"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const SignUpForm = () => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const formSchema = z.object({
        name: z.string().min(1),
        surname: z.string().min(1),
        phone: z.string().min(1),
        email: z.string().min(1),
        password: z.string().min(1)
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            surname: "",
            phone: "",
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        startTransition(() => {
            register(values)
                .then(() => {
                    toast.success("Kullanıcı başarıyla kayıt edilmiştir. Lütfen email adresinizi kontrol ediniz.")
                    router.push("/sign-in")
                })
                .catch(() => {
                    toast.error("Hay aksi! Bir şeyler ters gitti.")
                })
        })
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
                                <FormLabel>
                                    İsim
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="surname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Soyisim
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <FormField 
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isPending} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Telefon
                            </FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isPending} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Şifre
                            </FormLabel>
                            <FormControl>
                                <Input {...field} type="password" disabled={isPending} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full !mt-8"
                    variant="bulury"
                >
                    Kayıt Ol
                </Button>
            </form>
        </Form>
    )
}