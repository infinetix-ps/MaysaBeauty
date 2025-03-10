import { motion } from "framer-motion"

const trendingProducts = [
    // { id: 1, name: "Unicorn Princess Dress", sales: 1234, image: "/placeholder.svg?height=50&width=50" },
    // { id: 2, name: "Sparkly Tutu Skirt", sales: 987, image: "/placeholder.svg?height=50&width=50" },
    // { id: 3, name: "Butterfly Hair Clips Set", sales: 876, image: "/placeholder.svg?height=50&width=50" },
    // { id: 4, name: "Rainbow Sneakers", sales: 765, image: "/placeholder.svg?height=50&width=50" },
]

export const TrendingProducts = () => {
    return (
        <div className="space-y-8">
            {trendingProducts.map((product, index) => (
                <motion.div
                    key={product.id}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                    <div className="relative h-16 w-16 rounded-full overflow-hidden">
                        <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none text-indigo-600">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                    </div>
                    <div className="ml-auto font-medium text-pink-600">#{product.id}</div>
                </motion.div>
            ))}
        </div>
    )
}

