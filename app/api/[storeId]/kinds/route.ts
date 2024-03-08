import { NextResponse } from "next/server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

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

        if (!name) {
            return new NextResponse("Name is required.", { status: 400 })
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required.", { status: 400 })
        }

        const kind = await db.kind.create({
            data: {
                name,
                storeId: params.storeId
            }
        })

        return NextResponse.json(kind)
    } catch {
        return new NextResponse("Server error.", { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        if (!params.storeId) {
            return new NextResponse("Store id is required.", { status: 400 })
        }

        const kinds = await db.kind.findMany({
            where: {
                storeId: params.storeId
            }
        });
  
        return NextResponse.json(kinds)
    } catch (error) {
        return new NextResponse("Server error.", { status: 500 })
    }
}