import { Link, useLocation } from "react-router-dom"
import { cn } from "../../lib/utils.ts"
import { motion } from "framer-motion"

export const MainNav = ({ className, ...props }) => {
    const location = useLocation()

    const navItems = [
        { title: "Overview", path: "/" },
        { title: "Products", path: "/productsDash" },
        { title: "Orders", path: "/ordersDash" },
        { title: "Customers", path: "/customers" },
        { title: "Analytics", path: "/analytics" },
    ]

    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
            {navItems.map((item, index) => (
                <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                    <Link
                        to={item.path}
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-pink-600 relative",
                            location.pathname === item.path ? "text-pink-600" : "text-gray-700 hover:text-pink-600",
                        )}
                    >
                        {item.title}
                        {location.pathname === item.path && (
                            <motion.div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-pink-600" layoutId="underline" />
                        )}
                    </Link>
                </motion.div>
            ))}
        </nav>
    )
}

