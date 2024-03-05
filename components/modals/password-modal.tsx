"use client"

import { useTransition } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

import { Modal } from "@/components/ui/modal"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useStoreModal } from "@/hooks/use-store-modal"
import { PasswordSchema } from "@/schemas"
import { changePassword } from "@/actions/user"
import { Button } from "@/components/ui/button"

export const PasswordModal = () => {
	const { update } = useSession()
	const storeModal = useStoreModal()
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
        <Modal
            title="Klinik Oluştur"
            description="Veteriner kliniğinizi yönetmek için yeni bir klinik oluşturun."
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                        		control={form.control}
                        		name="password"
                        		render={({ field }) => (
                        		    <FormItem>
                        		        <FormLabel>Password</FormLabel>
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
                    		            <FormLabel>New Password</FormLabel>
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
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button variant="outline" onClick={storeModal.onClose}>
                                    İptal
                                </Button>
                                <Button type="submit" variant="secondary" disabled={isPending}>
                                    Değiştir
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}