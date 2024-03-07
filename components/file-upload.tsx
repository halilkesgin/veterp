import { FileIcon, ImageIcon, X } from "lucide-react"
import Image from "next/image"
import React from "react"

import { UploadButton } from "@/lib/uploadthing"
import { Button, buttonVariants } from "@/components/ui/button"

type Props = {
    apiEndpoint: "storeLogo" | "userImage" | "petImage"
    onChange: (url?: string) => void
    value?: string
}

const FileUpload = ({ apiEndpoint, onChange, value }: Props) => {
    const type = value?.split(".").pop()

    if (value) {
        return (
            <div className="flex items-center gap-x-2">
                {type !== "pdf" ? (
                    <div className="relative w-28 h-28 rounded-2xl">
                        <Image
                            src={value}
                            alt="Image"
                            className="object-contain rounded-2xl"
                            fill
                        />
                    </div>
                ) : (
                    <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                        <FileIcon />
                        <a
                            href={value}
                            target="_blank"
                            rel="noopener_noreferrer"
                            className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                        >
                            View PDF
                        </a>
                    </div>
                )}
                <Button
                    onClick={() => onChange("")}
                    variant="destructive"
                    size="sm"
                    type="button"
                    className="w-32 h-9 px-3"
                >
                    Kaldır
                </Button>
            </div>
        )
    }
  
    return (
        <div className="flex items-center gap-x-2">
            <div className="flex items-center justify-center relative w-28 h-28 rounded-2xl border">
                <ImageIcon className="h-5 w-5" />
            </div>
            <UploadButton
                endpoint={apiEndpoint}
                onClientUploadComplete={(res) => {
                    onChange(res?.[0].url)
                }}
                onUploadError={(error: Error) => {
                    console.log(error)
                }}
                appearance={{
                    allowedContent: "hidden",
                    button: "text-sm bg-background border border-input w-32 h-9 rounded-md px-3 text-black dark:text-white hover:bg-accent transition-all",
                }}
            />
        </div>
    )
}

export default FileUpload