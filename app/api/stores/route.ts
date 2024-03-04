import { NextResponse } from "next/server"

import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"

export async function POST(
    req: Request,
) {
    try {
        const user = await currentUser()
        const body = await req.json()
        
        const { name } = body
        
        if (!user) {
            return new NextResponse("Unauthorized.", { status: 403 })
        }
      
        if (!name) {
            return new NextResponse("Name is required.", { status: 400 })
        }
      
        const store = await db.store.create({
            data: {
                name,
                userId: user?.id,
                phoneOne: "",
                phoneTwo: "",
                address: "",
                email: "",
                map: ""
            }
        })
    
        return NextResponse.json(store)
    } catch (error) {
        return new NextResponse("Server error.", { status: 500 })
    }
}