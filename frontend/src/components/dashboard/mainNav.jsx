import React from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "../../lib/utils.ts"

export const MainNav = ({ className, ...props }) => {
    const location = useLocation()

    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
            <Link
                to="/"
                className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location.pathname === "/" ? "text-primary" : "text-muted-foreground",
                )}
            >
                Overview
            </Link>
            <Link
                to="/productsDash"
                className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location.pathname === "/products" ? "text-primary" : "text-muted-foreground",
                )}
            >
                Products
            </Link>
            <Link
                to="/orders"
                className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location.pathname === "/orders" ? "text-primary" : "text-muted-foreground",
                )}
            >
                Orders
            </Link>
            <Link
                to="/customers"
                className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location.pathname === "/customers" ? "text-primary" : "text-muted-foreground",
                )}
            >
                Customers
            </Link>
            <Link
                to="/analytics"
                className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location.pathname === "/analytics" ? "text-primary" : "text-muted-foreground",
                )}
            >
                Analytics
            </Link>
        </nav>
    )
}

