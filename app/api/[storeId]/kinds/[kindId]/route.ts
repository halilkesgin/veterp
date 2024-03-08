import { NextResponse } from "next/server"

import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"
import { checkAvailableSpace } from "@/actions/product"

export async function GET(
    req: Request,
    { params }: { params: { kindId: string }}
) {
    try {
        if (!params.kindId) {
            return new NextResponse("Product id is required", { status: 400 })
        }

        const kind = await db.kind.findUnique({
            where: {
                id: params.kindId
            }
        })

        return NextResponse.json(kind)
    } catch {
        return new NextResponse("Server error.", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, kindId: string }}
) {
    try {
        const user = await currentUser()
        const body = await req.json()

        const { name } = body

        if (!user) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 403 })
        }
        
        if (!params.kindId) {
            return new NextResponse("Kind id is required", { status: 400 })
        }

        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId: user.id
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 405 })
        }

        const kind = await db.kind.update({
            where: {
                id: params.kindId
            },
            data: {
                name,
            }
        })

        return NextResponse.json(kind)
    } catch {
        return new NextResponse("Server error.", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, kindId: string } }
) {
    try {
        const user = await currentUser()

        if (!user) {
            return new NextResponse("Unauthenticated", { status: 403 })
        }

        if (!params.kindId) {
            return new NextResponse("Product id is required", { status: 400 })
        }

        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId: user.id,
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

        const kind = await db.kind.delete({
            where: {
                id: params.kindId,
            }
        })
  
        return NextResponse.json(kind)
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 })
    }
}