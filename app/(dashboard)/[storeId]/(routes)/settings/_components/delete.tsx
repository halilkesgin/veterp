"use client"

import { AlertModal } from "@/components/ui/alert-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const Delete = () => {
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const onDelete = async () => {
        try {
          setLoading(true);
          await axios.delete(`/api/stores/${params.storeId}`);
          router.refresh();
          router.push('/');
          toast.success('Store deleted.');
        } catch (error: any) {
          toast.error('Make sure you removed all products and categories first.');
        } finally {
          setLoading(false);
          setOpen(false);
        }
      }

    return (
        <>
            <AlertModal 
                isOpen={open} 
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                disabled={loading}
                />

<Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
                </>
    )
}