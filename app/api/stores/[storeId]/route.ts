import { NextResponse } from "next/server"

import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const user = await currentUser()
        const body = await req.json()

        const { name, address, phoneOne, phoneTwo, email, map } = body

        if (!user) {
            return new NextResponse("Unauthenticated.", { status: 403 })
        }

        if (!name) {
            return new NextResponse("Name is required.", { status: 400 })
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required.", { status: 400 })
        }

        const store = await db.store.update({
            where: {
                id: params.storeId,
                userId: user.id,
            },
            data: {
                name,
                address,
                phoneOne,
                phoneTwo,
                email,
                map
            }
        })
  
        return NextResponse.json(store)
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 })
    }
};


export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const user = await currentUser()
        
        if (!user) {
            return new NextResponse("Unauthenticated", { status: 403 })
        }
      
        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 })
        }

        const store = await db.store.deleteMany({
            where: {
                id: params.storeId,
                userId: user.id
            }
        });
    
        return NextResponse.json(store)
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 })
    }
}