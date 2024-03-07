import { createUploadthing, type FileRouter } from "uploadthing/next"
import { useCurrentUser } from "@/hooks/use-current-user"
import { currentUser } from "@/lib/auth"
import { getUserById } from "@/data/user"

const f = createUploadthing()

const authenticateUser = async () => {
    const user = await currentUser()

    if (!user) {
        return { error: "Unauthorized" }
    }

    const dbUser = await getUserById(user.id)

    if (!dbUser) throw new Error("Unauthorized")

    return { dbUser }
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  storeLogo: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(authenticateUser)
    .onUploadComplete(() => {}),
  userImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(authenticateUser)
    .onUploadComplete(() => {}),
  petImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(authenticateUser)
    .onUploadComplete(() => {}),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
