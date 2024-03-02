import { ReactNode } from "react"

interface AuthLayoutProps {
    children: ReactNode
}

const AuthLayout = ({
    children
}: AuthLayoutProps) => {
    return (
        <div className="h-full flex flex-col justify-center items-center bg-gradient-to-tl from-yellow-300 from-0% via-cyan-200 via-0% to-blue-500">
            {children}
        </div>
    )
}

export default AuthLayout