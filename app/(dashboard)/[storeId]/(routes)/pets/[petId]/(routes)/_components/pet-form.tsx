"use client"

import * as z from "zod"
import { Gen, Kind, Owner, Pet } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import axios from "axios"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PetFormProps {
    data: Pet | null
    owners: Owner[]
    kinds: Kind[]
    gens: Gen[]
}

export const PetForm = ({
    data,
    owners,
    kinds,
    gens
}: PetFormProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const params = useParams()

    const formSchema = z.object({
        name: z.string(),
        birthDate: z.date(),
        ownerId: z.string(),
        genId: z.string(),
        kindId: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data?.name || "",
            birthDate: data?.birthDate || new Date("2010-01-01"),
            ownerId: data?.ownerId || "",
            genId: data?.genId || "",
            kindId: data?.kindId || ""
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
            router.push(`/${params.storeId}/pets`)
            router.refresh()
            toast.success(data ? "Dostumuz güncellendi." : "Dostumuz oluşturuldu.")
        } catch {
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
                        Pet {data ? "Güncelleme" : "Oluşturma"}
                    </h1>
                	<p className="text-sm text-muted-foreground lg:max-w-80">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis animi atque non vitae suscipit eum!
                	</p>
            	</div>
        	</div>
        	<div className="col-span-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid lg:grid-cols-3 gap-4">
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
                            <FormField  
                                control={form.control}
                                name="birthDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel>Doğum Tarihi</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "!mt-2.5",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                        size="sm"
                                                        type="button"
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="ownerId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Sahip
                                        </FormLabel>
                                        <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} placeholder="Sahip seçiniz" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {owners.map((owner) => (
                                                    <SelectItem key={owner.id} value={owner.id}>{owner.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid lg:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="kindId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Tür
                                        </FormLabel>
                                        <Select 
                                            disabled={isLoading} 
                                            onValueChange={(value) => {
                                                field.onChange(value)
                                                form.setValue("genId", "")
                                            }} 
                                            value={field.value} 
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} placeholder="Tür seçiniz" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {kinds.map((kind) => (
                                                    <SelectItem key={kind.id} value={kind.id}>{kind.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="genId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Cins
                                        </FormLabel>
                                        <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} placeholder="Cins seçiniz" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {gens
                                                    .filter((gen) => gen.kindId === form.getValues("kindId"))
                                                    .map((item) => (
                                                        <SelectItem key={item.id} value={item.id}>
                                                            {item.name}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
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