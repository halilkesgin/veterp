"use client"

import { logMessage } from "@/lib/logs/message"
import { Log } from "@prisma/client"
import { format } from "date-fns"

interface SignleLogDetailProps {
    data: Log
}

export const SignleLogDetail = ({
    data
}: SignleLogDetailProps) => {
    return (
        <li className="flex items-center gap-x-2">
            <div className="flex flex-col space-y-0.5">
                <p className="text-sm text-muted-foreground">
                    <span className="font-semibold lowercase text-neutral-700">
                        {data.name} hello
                    </span> {logMessage(data)}
                </p>
                <p className="text-xs text-muted-foreground">
                    {format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a")}
                </p>
            </div>
        </li>
    )
}