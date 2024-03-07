"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { ActivitySquare, Archive, BellPlus, CalendarDays, MailWarning, Mailbox, Send, UserRoundCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Switch } from "@/components/ui/switch"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Heading } from "@/components/heading"
import axios from "axios"

interface NotificationFormProps {
    
}

export const NotificationForm = ({ 
}: NotificationFormProps) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const formSchema = z.object({
        isJobPosted: z.boolean(),
        isJobArchived: z.boolean(),
        isNewCandidate: z.boolean(),
        isUnreadMessage: z.boolean(),
        isNewUpdated: z.boolean(),
        isOffer: z.boolean(),
        isEvent: z.boolean(),
        isOnboardEmail: z.boolean(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isJobPosted: false,
            isJobArchived:  false,
            isNewCandidate:  false,
            isUnreadMessage:  false,
            isNewUpdated:  false,
            isOffer:false,
            isEvent:false, 
            isOnboardEmail:  false
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
         try {
            setIsLoading(true)
            toast.success("Notification updated")
            router.refresh()
        } catch {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="grid lg:grid-cols-3 gap-4">
            <div className="col-span-1">
                <div className="flex flex-col gap-1">
                    <h1 className="font-semibold">
                        Bildirimler
                    </h1>
                	<p className="text-sm text-muted-foreground lg:max-w-80">
                    	Kliğiniz veya veterp sistemi ile ilgili güncellemeleri ya da bildirimlerinizi buradan kontrol edebilirsiniz.
                	</p>
            	</div>
        	</div>
        	<div className="col-span-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="isJobPosted"
                            render={({ field }) => (
                                <FormItem className="flex flex-row p-2 items-center justify-between rounded-lg">
                                    <div className="flex gap-x-2 items-center">
                                        <div className={buttonVariants({ size: "sm", variant: "outline", className: "hover:bg-background" })}>
                                            <Send className="h-4 w-4" />
                                        </div>
                                        <div className="flex flex-col justify-center space-y-0.5">
                                            <FormLabel className="text-sm">
                                                Job posted
                                            </FormLabel>
                                            <FormDescription className="text-xs">
                                                Get a confirmation when you post a new job.
                                            </FormDescription>
                                        </div>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            disabled={isLoading}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isJobArchived"
                            render={({ field }) => (
                                <FormItem className="flex flex-row p-2 items-center justify-between rounded-lg">
                                    <div className="flex gap-x-2 items-center">
                                        <div className={buttonVariants({ size: "sm", variant: "outline", className: "hover:bg-background" })}>
                                            <Archive className="h-4 w-4" />
                                        </div>
                                        <div className="flex flex-col justify-center space-y-0.5">
                                            <FormLabel className="text-sm">
                                                Job archived
                                            </FormLabel>
                                            <FormDescription className="text-xs">
                                                Get a confirmation when you archive a job.
                                            </FormDescription>
                                        </div>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            disabled={isLoading}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <h1 className="text-lg pt-4 pb-2">Candidates</h1>
                        <FormField
                            control={form.control}
                            name="isNewCandidate"
                            render={({ field }) => (
                                <FormItem className="flex flex-row p-2 items-center justify-between rounded-lg">
                                    <div className="flex gap-x-2 items-center">
                                        <div className={buttonVariants({ size: "sm", variant: "outline", className: "hover:bg-background" })}>
                                            <UserRoundCheck className="h-4 w-4" />
                                        </div>
                                        <div className="flex flex-col justify-center space-y-0.5">
                                            <FormLabel className="text-sm">
                                                New candidates
                                            </FormLabel>
                                            <FormDescription className="text-xs">
                                                Get a notification when a candidate applies for your jobs.
                                            </FormDescription>
                                        </div>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            disabled={isLoading}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isUnreadMessage"
                            render={({ field }) => (
                                <FormItem className="flex flex-row p-2 items-center justify-between rounded-lg">
                                    <div className="flex gap-x-2 items-center">
                                        <div className={buttonVariants({ size: "sm", variant: "outline", className: "hover:bg-background" })}>
                                            <MailWarning className="h-4 w-4" />
                                        </div>
                                        <div className="flex flex-col justify-center space-y-0.5">
                                            <FormLabel className="text-sm">
                                                Unread messages
                                            </FormLabel>
                                            <FormDescription className="text-xs">
                                                Get a notification when you receive new replies from candidates.
                                            </FormDescription>
                                        </div>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            disabled={isLoading}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <h1 className="text-lg pt-4 pb-2">News and Resources</h1>
                        <FormField
                            control={form.control}
                            name="isNewUpdated"
                            render={({ field }) => (
                                <FormItem className="flex flex-row p-2 items-center justify-between rounded-lg">
                                    <div className="flex gap-x-2 items-center">
                                        <div className={buttonVariants({ size: "sm", variant: "outline", className: "hover:bg-background" })}>
                                            <BellPlus className="h-4 w-4" />
                                        </div>
                                        <div className="flex flex-col justify-center space-y-0.5">
                                            <FormLabel className="text-sm">
                                                Product launches & updates
                                            </FormLabel>
                                            <FormDescription className="text-xs">
                                                Get seasonal and exclusive offers.
                                            </FormDescription>
                                        </div>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            disabled={isLoading}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isOffer"
                            render={({ field }) => (
                                <FormItem className="flex flex-row p-2 items-center justify-between rounded-lg">
                                    <div className="flex gap-x-2 items-center">
                                        <div className={buttonVariants({ size: "sm", variant: "outline", className: "hover:bg-background" })}>
                                            <ActivitySquare className="h-4 w-4" />
                                        </div>
                                        <div className="flex flex-col justify-center space-y-0.5">
                                            <FormLabel className="text-sm">
                                                Offers & specials
                                            </FormLabel>
                                            <FormDescription className="text-xs">
                                                Get a notification when you receive new replies from candidates.
                                            </FormDescription>
                                        </div>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            disabled={isLoading}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isEvent"
                            render={({ field }) => (
                                <FormItem className="flex flex-row p-2 items-center justify-between rounded-lg">
                                    <div className="flex gap-x-2 items-center">
                                        <div className={buttonVariants({ size: "sm", variant: "outline", className: "hover:bg-background" })}>
                                            <CalendarDays className="h-4 w-4" />
                                        </div>
                                        <div className="flex flex-col justify-center space-y-0.5">
                                            <FormLabel className="text-sm">
                                                Events & webinars
                                            </FormLabel>
                                            <FormDescription className="text-xs">
                                                Stay updated to our events and webinars.
                                            </FormDescription>
                                        </div>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            disabled={isLoading}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isOnboardEmail"
                            render={({ field }) => (
                                <FormItem className="flex flex-row p-2 items-center justify-between rounded-lg">
                                    <div className="flex gap-x-2 items-center">
                                        <div className={buttonVariants({ size: "sm", variant: "outline", className: "hover:bg-background" })}>
                                            <Mailbox className="h-4 w-4" />
                                        </div>
                                        <div className="flex flex-col justify-center space-y-0.5">
                                            <FormLabel className="text-sm">
                                                Onboarding emails
                                            </FormLabel>
                                            <FormDescription className="text-xs">
                                                Receive expert tips and resources to help you get the most of our products.
                                            </FormDescription>
                                        </div>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            disabled={isLoading}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button disabled={isLoading} size="sm" variant="bulury" type="button">
                            Kaydet
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}