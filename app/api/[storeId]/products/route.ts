import { NextResponse } from "next/server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { checkAvailableSpace } from "@/actions/product"

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const user = await currentUser()
        const body = await req.json()

        const { name, piece, price, storageId } = body

        if (!user) {
            return new NextResponse("Unauthorized.", { status: 403 })
        }

        if (!name) {
            return new NextResponse("Name is required.", { status: 400 })
        }

        if (!piece) {
            return new NextResponse("Piece is required.", { status: 400 })
        }

        if (!price) {
            return new NextResponse("Price is required.", { status: 400 })
        }

        if (!storageId) {
            return new NextResponse("Storage id is required.", { status: 400 })
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required.", { status: 400 })
        }

        const requestedPieces = parseInt(piece)

        const hasAvailableSpace = await checkAvailableSpace(storageId, requestedPieces)

        if (!hasAvailableSpace) {
            return new NextResponse("Not enough available space in the storage.", { status: 400 })
        }

        const product = await db.product.create({
            data: {
                name,
                piece,
                price,
                storageId,
                storeId: params.storeId,
            }
        })

        return NextResponse.json(product)
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

        const products = await db.product.findMany({
            where: {
                storeId: params.storeId
            }
        });
  
        return NextResponse.json(products)
    } catch (error) {
        return new NextResponse("Server error.", { status: 500 })
    }
}