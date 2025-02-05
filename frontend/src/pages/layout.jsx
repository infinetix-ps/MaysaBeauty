import React from "react"
import { Toaster } from "../components/ui/Toasters.jsx"

const RootLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-background">
            {children}
            <Toaster />
        </div>
    )
}

export default RootLayout

