import { ReactNode } from "react"

import { Navbar } from "./_components/navbar"

interface PetCategoriesLayoutProps {
    children: ReactNode
}

const PetCategoriesLayout = ({
    children
}: PetCategoriesLayoutProps) => {
    return (
        <div className="flex flex-col">
            <Navbar />
            {children}
        </div>
    )
}

export default PetCategoriesLayout