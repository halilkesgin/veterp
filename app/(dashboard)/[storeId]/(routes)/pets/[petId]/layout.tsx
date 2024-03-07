
import { ReactNode } from "react"

import { Navbar } from "./_components/navbar"

interface PetsLayoutProps {
    children: ReactNode
}

const PetsLayout = ({
    children
}: PetsLayoutProps) => {

    return (
        <div className="flex flex-col">
            <Navbar />
            {children}
        </div>
    )
}

export default PetsLayout