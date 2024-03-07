"use client"

import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

import { AlertModal } from "@/components/ui/alert-modal"
import { Button } from "@/components/ui/button"

export const DangerZone = () => {
	const [isLoading, setIsLoading] = useState(false)
    const params = useParams()
    const router = useRouter()
    const [open, setOpen] = useState(false)


	const onDelete = async () => {
        try {
          	setIsLoading(true)
          	await axios.delete(`/api/stores/${params.storeId}`)
          	router.refresh()
          	router.push("/")
          	toast.success("Klinik silindi.")
        } catch (error: any) {
          	toast.error("Hay aksi! Bir şeyler ters gitti.")
        } finally {
          	setIsLoading(false)
          	setOpen(false)
        }
    }

  	return (
		<>
			<AlertModal 
                isOpen={open} 
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                disabled={isLoading}
            />
  	  		<div className="grid lg:grid-cols-3 gap-4">
        	    <div className="col-span-1">
        	        <div className="flex flex-col gap-1">
        	            <h1 className="font-semibold">
        	                Hesap Silme
        	            </h1>
                    	<p className="text-sm text-muted-foreground lg:max-w-80">
                        	Artık hesabınızı kullanmak istemiyor musunuz? Hesabınızı buradan silebilirsiniz. Bu eylem geri alınamaz. Bu hesap ilgili tüm bilgiler (klinikleriniz dahil) kalıcı olarak silinecektir.
                    	</p>
                	</div>
            	</div>
            	<div className="col-span-2">
					<Button
          				disabled={isLoading}
          				variant="destructive"
          				size="sm"
          				onClick={() => setOpen(true)}
        			>
						Kalıcı Olarak Sil
        			</Button>
				</div>
			</div>
		</>
  	)
}