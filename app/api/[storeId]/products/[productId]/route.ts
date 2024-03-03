import { NextResponse } from "next/server"

import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"
import { checkAvailableSpace } from "@/actions/product"

export async function GET(
    req: Request,
    { params }: { params: { productId: string }}
) {
    try {
        if (!params.productId) {
            return new NextResponse("Product id is required", { status: 400 })
        }

        const product = await db.product.findUnique({
            where: {
                id: params.productId
            }
        })

        return NextResponse.json(product)
    } catch {
        return new NextResponse("Server error.", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, productId: string }}
) {
    try {
        const user = await currentUser()
        const body = await req.json()

        const { name, piece, price, storageId } = body

        if (!user) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 403 })
        }
        
        if (!piece) {
            return new NextResponse("Piece is required", { status: 403 })
        }

        if (!price) {
            return new NextResponse("Price is required.", { status: 400 })
        }

        if (!storageId) {
            return new NextResponse("Storage id is required.", { status: 400 })
        }

        if (!params.productId) {
            return new NextResponse("Product id is required", { status: 400 })
        }

        const requestedPieces = parseInt(piece)

        const hasAvailableSpace = await checkAvailableSpace(storageId, requestedPieces)

        if (!hasAvailableSpace) {
            return new NextResponse("Not enough available space in the storage.", { status: 400 })
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

        const product = await db.product.update({
            where: {
                id: params.productId
            },
            data: {
                name,
                price,
                storageId,
                piece
            }
        })

        return NextResponse.json(product)
    } catch {
        return new NextResponse("Server error.", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, productId: string } }
) {
    try {
        const user = await currentUser()

        if (!user) {
            return new NextResponse("Unauthenticated", { status: 403 })
        }

        if (!params.productId) {
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

        const product = await db.product.delete({
            where: {
                id: params.productId,
            }
        })
  
        return NextResponse.json(product)
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 })
    }
}