import { NextResponse } from "next/server"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { createLog } from "@/lib/logs/create"
import { ACTION, ENTITY_TPYE } from "@prisma/client"

export async function POST(
    req: Request,
    { params }: { params: { storeId: string }}
) {
    try {
        const user = await currentUser()
        const body = await req.json()

        const { name, surname, birthDate, phone, email } = body

        if (!user) {
            return new NextResponse("Unauthorized.", { status: 403 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 401 })
        }

        if (!surname) {
            return new NextResponse("Surname is required", { status: 401 })
        }

        if (!birthDate) {
            return new NextResponse("Birth date is required", { status: 401 })
        }

        if (!phone) {
            return new NextResponse("Phone is required", { status: 401 })
        }

        if (!email) {
            return new NextResponse("Email is required", { status: 401 })
        }

        const owner = await db.owner.create({
            data: {
                name,
                surname,
                birthDate,
                phone,
                email,
                storeId: params.storeId
            }
        })

        await createLog({
            entityTitle: owner.name,
            entityId: owner.id,
            entityType: ENTITY_TPYE.OWNER,
            action: ACTION.CREATE
        })

        return NextResponse.json(owner)
    } catch {
        return new NextResponse("Server error", { status: 500 })
    }
}