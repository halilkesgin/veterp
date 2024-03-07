import { ReactNode } from "react"
import { Navbar } from "./_components/navbar"

interface SettingsLayoutProps {
    children: ReactNode
}

const SettingsLayout = ({
    children
}: SettingsLayoutProps) => {
    return (
        <div className="flex flex-col">
            <Navbar />
            {children}
        </div>
    )
}

export default SettingsLayout