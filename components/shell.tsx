import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const shellVariants = cva("grid items-center gap-8 py-8", {
    variants: {
        variant: {
            default: "container",
            centered: "container flex h-[100dvh] max-w-2xl flex-col justify-center",
            markdown: "container max-w-4xl pb-8 md:pb-8 lg:pb-8",
            talent: "container flex justify-between items-center gap-4"
        },
    },
    defaultVariants: {
        variant: "default",
    },
})

interface ShellProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof shellVariants> {
    as?: React.ElementType
}

function Shell({
    className,
    as: Comp = "section",
    variant,
    ...props
}: ShellProps) {
    return (
        <Comp className={cn(shellVariants({ variant }), className)} {...props} />
    )
}

export { Shell, shellVariants }