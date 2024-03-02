import { ReactNode } from "react"

interface AuthLayoutProps {
    children: ReactNode
}

const AuthLayout = ({
    children
}: AuthLayoutProps) => {
    return (
        <div className="h-full flex flex-col justify-center items-center">
            {children}
        </div>
    )
}

export default AuthLayout