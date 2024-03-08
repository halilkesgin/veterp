import { NextResponse } from "next/server"

import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"
import { checkAvailableSpace } from "@/actions/product"

export async function GET(
    req: Request,
    { params }: { params: { genId: string }}
) {
    try {
        if (!params.genId) {
            return new NextResponse("Product id is required", { status: 400 })
        }

        const gen = await db.gen.findUnique({
            where: {
                id: params.genId
            }
        })

        return NextResponse.json(gen)
    } catch {
        return new NextResponse("Server error.", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, genId: string }}
) {
    try {
        const user = await currentUser()
        const body = await req.json()

        const { name, kindId } = body

        if (!user) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 403 })
        }

        if (!kindId) {
            return new NextResponse("Kind id is required", { status: 403 })
        }
        
        if (!params.genId) {
            return new NextResponse("Gen id is required", { status: 400 })
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

        const gen = await db.gen.update({
            where: {
                id: params.genId
            },
            data: {
                name,
                kindId
            }
        })

        return NextResponse.json(gen)
    } catch {
        return new NextResponse("Server error.", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, genId: string } }
) {
    try {
        const user = await currentUser()

        if (!user) {
            return new NextResponse("Unauthenticated", { status: 403 })
        }

        if (!params.genId) {
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

        const gen = await db.gen.delete({
            where: {
                id: params.genId,
            }
        })
  
        return NextResponse.json(gen)
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 })
    }
}