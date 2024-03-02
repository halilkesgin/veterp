import { NextResponse } from "next/server"

import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"

export async function GET(
    req: Request,
    { params }: { params: { storageId: string }}
) {
    try {
        if (!params.storageId) {
            return new NextResponse("Storage id is required", { status: 400 })
        }

        const storage = await db.storage.findUnique({
            where: {
                id: params.storageId
            }
        })

        return NextResponse.json(storage)
    } catch {
        return new NextResponse("Server error.", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, storageId: string }}
) {
    try {
        const user = await currentUser()
        const body = await req.json()

        const { name, piece } = body

        if (!user) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 403 })
        }
        
        if (!piece) {
            return new NextResponse("Piece is required", { status: 403 })
        }

        if (!params.storageId) {
            return new NextResponse("Storage id is required", { status: 400 })
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

        const storage = await db.storage.update({
            where: {
                id: params.storageId
            },
            data: {
                name,
                piece
            }
        })

        return NextResponse.json(storage)
    } catch {
        return new NextResponse("Server error.", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, storageId: string } }
) {
    try {
        const user = await currentUser()

        if (!user) {
            return new NextResponse("Unauthenticated", { status: 403 })
        }

        if (!params.storageId) {
            return new NextResponse("Storage id is required", { status: 400 })
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

        const storage = await db.storage.delete({
            where: {
                id: params.storageId,
            }
        })
  
        return NextResponse.json(storage)
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 })
    }
}