import { NextResponse } from "next/server"

import { currentUser } from "@/lib/auth"

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const user = await currentUser()
        const body = await req.json()

        const { name } = body

        if (!user) {
            return new NextResponse("Unauthorized.", { status: 403 })
        }

        


    } catch {

    }
}