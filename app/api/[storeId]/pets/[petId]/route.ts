import { NextResponse } from "next/server"

import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"

export async function GET(
    req: Request,
    { params }: { params: { petId: string }}
) {
    try {
        if (!params.petId) {
            return new NextResponse("Pet id is required", { status: 400 })
        }

        const pet = await db.pet.findUnique({
            where: {
                id: params.petId
            }
        })

        return NextResponse.json(pet)
    } catch {
        return new NextResponse("Server error.", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, petId: string }}
) {
    try {
        const user = await currentUser()
        const body = await req.json()

        const { name, birthDate, ownerId } = body

        if (!user) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 403 })
        }
        
        if (!birthDate) {
            return new NextResponse("Birth date is required", { status: 403 })
        }

        if (!ownerId) {
            return new NextResponse("Owner id is required.", { status: 400 })
        }

        if (!params.petId) {
            return new NextResponse("Pet id is required", { status: 400 })
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

        const pet = await db.pet.update({
            where: {
                id: params.petId
            },
            data: {
                name,
                birthDate,
                ownerId,
            }
        })

        return NextResponse.json(pet)
    } catch {
        return new NextResponse("Server error.", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, petId: string } }
) {
    try {
        const user = await currentUser()

        if (!user) {
            return new NextResponse("Unauthenticated", { status: 403 })
        }

        if (!params.petId) {
            return new NextResponse("Pet id is required", { status: 400 })
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

        const pet = await db.pet.delete({
            where: {
                id: params.petId,
            }
        })
  
        return NextResponse.json(pet)
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 })
    }
}