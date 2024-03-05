import { NextResponse } from "next/server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(
    req: Request,
    { params }: { params: { ownerId: string }}
) {
    try {
        if (!params.ownerId) {
            return new NextResponse("Owner id is required", { status: 400 })
        }

        const owner = await db.owner.findUnique({
            where: {
                id: params.ownerId
            }
        })

        return NextResponse.json(owner)
    } catch {
        return new NextResponse("Server error.", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, ownerId: string }}
) {
    try {
        const user = await currentUser()
        const body = await req.json()

        const { name, surname, birthDate, phone, email } = body

        if (!user) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 403 })
        }
        
        if (!surname) {
            return new NextResponse("Surname is required", { status: 403 })
        }

        if (!birthDate) {
            return new NextResponse("Birth date is required.", { status: 400 })
        }

        if (!phone) {
            return new NextResponse("Phone id is required.", { status: 400 })
        }

        if (!email) {
            return new NextResponse("Email is required.", { status: 400 })
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

        const owner = await db.owner.update({
            where: {
                id: params.ownerId
            },
            data: {
                name,
                surname,
                birthDate,
                phone,
                email
            }
        })

        return NextResponse.json(owner)
    } catch {
        return new NextResponse("Server error.", { status: 500 })
    }
}


export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, ownerId: string } }
) {
    try {
        const user = await currentUser()

        if (!user) {
            return new NextResponse("Unauthenticated", { status: 403 })
        }

        if (!params.ownerId) {
            return new NextResponse("Owner id is required", { status: 400 })
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

        const owner = await db.owner.delete({
            where: {
                id: params.ownerId,
            }
        })
  
        return NextResponse.json(owner)
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 })
    }
}