"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useTransition } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { login } from "@/actions/login"
import { toast } from "sonner"

export const SignInForm = () => {
    const [isPending, startTransition] = useTransition()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl")

    const formSchema = z.object({
        email: z.string().min(1),
        password: z.string().min(1)
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        startTransition(() => {
            login(values, callbackUrl)
                .then((data) => {
                    if (data?.error) {
                        form.reset()
                        toast.error("Something went wrong.")
                    }

                    if (data?.success) {
                        form.reset()
                        toast.error("Logged successfully.")
                    }
                })
                .catch(() => {
                    toast.error("Something went wrong.")
                })
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Password
                            </FormLabel>
                            <FormControl>
                                <Input {...field} type="password" disabled={isPending} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    variant="outline"
                >
                    Sign in
                </Button>
            </form>
        </Form>
    )
}