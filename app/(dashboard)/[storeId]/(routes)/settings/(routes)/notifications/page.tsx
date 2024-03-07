import { Shell } from "@/components/shell"
import { NotificationForm } from "./_components/notification-form"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

const NotificationsPage = async ({
    params
}: {
    params: { notificationId: string }
}) => {
    const user = await currentUser()

    return (
        <Shell >
            <NotificationForm />
        </Shell>
    )
}

export default NotificationsPage