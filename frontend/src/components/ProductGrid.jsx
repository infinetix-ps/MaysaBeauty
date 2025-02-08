import { useState, useEffect } from "react"
import { Button } from "./ui/button.jsx"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"
import { useCart } from "../pages/contexts/cartContext.jsx"
import StarRating from "./starRating.jsx"

const ProductGrid = ({ showAll = false, products = [], limit = 8 }) => {
    const [displayedProducts, setDisplayedProducts] = useState([])
    const [page, setPage] = useState(1)
    const productsPerPage = 12
    const { addToCart } = useCart()

    useEffect(() => {
        const slicedProducts = showAll ? products.slice(0, page * productsPerPage) : products.slice(0, limit)
        setDisplayedProducts(slicedProducts)
    }, [products, page, showAll, limit])

    const handleAddToCart = (product) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1,
        })
        toast.success("Added to cart!", {
            position: "bottom-right",
            autoClose: 2000,
        })
    }

    const loadMore = () => {
        setPage((prev) => prev + 1)
    }

    return (
        <div className="bg-[#f5f0eb] dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
            <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-16 relative">
                {!showAll && (
                    <>
                        <div className="flex flex-col items-center mb-8 sm:mb-16">
                            <div className="w-full max-w-3xl h-0.5 bg-gradient-to-r from-[#C17F82] via-[#a67c7c] to-[#6d4c41] mb-4 sm:mb-8" />
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#402e20] dark:text-white"
                            >
                                Discover Our Collection
                            </motion.h2>
                        </div>
                    </>
                )}

                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
                    >
                        {displayedProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: (index % 8) * 0.1 }}
                                className="group relative bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden 
                                         shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                                         transition-all duration-500 flex flex-col h-full"
                            >
                                <Link to={`/products/${product.id}`} className="block aspect-square overflow-hidden">
                                    <div className="relative w-full h-full transform transition-transform duration-700 group-hover:scale-105">
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 group-hover:opacity-0 transition-opacity duration-500" />
                                        <img
                                            src={product.images[0] || "/placeholder.svg"}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-[#C17F82]/0 group-hover:bg-[#C17F82]/10 transition-colors duration-500" />
                                    </div>
                                </Link>
                                <div className="relative p-3 sm:p-4 md:p-6 flex flex-col flex-grow bg-gradient-to-b from-white/80 to-white/95 backdrop-blur-sm">
                                    <Link to={`/products/${product.id}`}>
                                        <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-medium mb-1 sm:mb-2 text-[#402e20] group-hover:text-[#C17F82] transition-colors duration-300 line-clamp-2">
                                            {product.name}
                                        </h3>
                                    </Link>
                                    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#402e20] mb-2 sm:mb-3 md:mb-4">
                                        ${product.price.toFixed(2)}
                                    </p>
                                    <div className="flex items-center mb-2 sm:mb-3 md:mb-4">
                                        <StarRating rating={product.rating} size={16} />
                                        <span className="ml-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                            ({product.numReviews})
                                        </span>
                                    </div>
                                    <div className="mt-auto">
                                        <Button
                                            onClick={() => handleAddToCart(product)}
                                            className="w-full !bg-[#C17F82] hover:!bg-[#A66467] !text-white 
                                                     transition-all duration-300 rounded-lg py-1 sm:py-2 md:py-3
                                                     text-xs sm:text-sm md:text-base
                                                     shadow-[0_4px_20px_rgb(193,127,130,0.2)]
                                                     hover:shadow-[0_4px_20px_rgb(193,127,130,0.4)]
                                                     transform hover:-translate-y-0.5"
                                            style={{ backgroundColor: "#C17F82" }}
                                        >
                                            Add to Cart
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {showAll && products.length > displayedProducts.length && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 sm:mt-16 text-center"
                    >
                        <Button
                            onClick={loadMore}
                            className="!bg-[#C17F82] hover:!bg-[#A66467] !text-white 
                                    transition-all duration-300 rounded-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3
                                    text-sm sm:text-base
                                    shadow-[0_4px_20px_rgb(193,127,130,0.2)]
                                    hover:shadow-[0_4px_20px_rgb(193,127,130,0.4)]
                                    transform hover:-translate-y-0.5"
                            style={{ backgroundColor: "#C17F82" }}
                        >
                            Load More Products
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default ProductGrid

