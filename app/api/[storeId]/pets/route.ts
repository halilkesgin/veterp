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

        const { name, birthDate, ownerId, kindId, genId } = body

        if (!user) {
            return new NextResponse("Unauthorized.", { status: 403 })
        }

        if (!name) {
            return new NextResponse("Name is required.", { status: 400 })
        }

        if (!birthDate) {
            return new NextResponse("Birth date is required.", { status: 400 })
        }

        if (!ownerId) {
            return new NextResponse("Owner id is required.", { status: 400 })
        }

        if (!kindId) {
            return new NextResponse("Kind id is required.", { status: 400 })
        }
        if (!genId) {
            return new NextResponse("Gen id required.", { status: 400 })
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required.", { status: 400 })
        }

        const pet = await db.pet.create({
            data: {
                name,
                birthDate,
                ownerId,
                kindId,
                genId,
                storeId: params.storeId
            }
        })

        return NextResponse.json(pet)
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

        const pets = await db.pet.findMany({
            where: {
                storeId: params.storeId
            }
        });
  
        return NextResponse.json(pets)
    } catch (error) {
        return new NextResponse("Server error.", { status: 500 })
    }
}