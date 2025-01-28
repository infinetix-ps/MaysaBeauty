import React, { useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { Button } from "./ui/button.jsx"; // Ensure you have a Button component
import { Link } from "react-router-dom"; // React Router for navigation
import { motion } from "framer-motion";
import { toast } from "react-toastify"; // Ensure react-toastify is installed and configured
import { useCart } from "../pages/contexts/cartContext.jsx"
const ProductGrid = ({ showAll = false, products = [], limit = 8 }) => {
    const [favorites, setFavorites] = useState([]); // State for managing favorites
    const { addToCart } = useCart();

    // Toggle favorite state for a product
    const toggleFavorite = (productId) => {
        setFavorites((prevFavorites) =>
            prevFavorites.includes(productId)
                ? prevFavorites.filter((id) => id !== productId)
                : [...prevFavorites, productId]
        );
    };

    // Check if a product is in the favorites list
    const isFavorite = (productId) => favorites.includes(productId);

    const handleAddToCart = (product) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1,
        });
        toast.success("Added to cart!", {
            position: "bottom-right",
            autoClose: 2000,
        });
    };

    const displayedProducts = showAll ? products : products.slice(0, limit);

    return (
        <div className="container mx-auto px-4 py-16 relative bg-[#0f1117]">
            {!showAll && (
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold mb-12 text-center text-white"
                >
                    Featured Products
                </motion.h2>
            )}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
                {displayedProducts.map((product) => (
                    <motion.div
                        key={product.id}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-800"
                    >
                        <Link to={`/products/${product.id}`}>
                            <div className="relative overflow-hidden h-64">
                                <img
                                    src={product.images[0] || "/placeholder.svg"}
                                    alt={product.name}
                                    className="transition-transform duration-300 hover:scale-110 w-full h-full object-cover"
                                />
                            </div>
                        </Link>
                        <div className="p-4">
                            <Link to={`/products/${product.id}`}>
                                <h3 className="text-lg font-semibold mb-2 text-white">{product.name}</h3>
                            </Link>
                            <p className="text-gray-300 mb-4">${product.price.toFixed(2)}</p>
                            <div className="flex justify-between items-center">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleAddToCart(product)}
                                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                                >
                                    Add to Cart
                                </Button>
                                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                                    <Heart
                                        className={`h-6 w-6 cursor-pointer transition ${isFavorite(product.id) ? "text-pink-500 fill-current" : "text-gray-500"
                                            }`}
                                        onClick={() => toggleFavorite(product.id)}
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {!showAll && (
                <div className="mt-16 flex justify-center">
                    <Link to="/all-products">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                            <Button size="lg" className="relative px-8 py-6 bg-gray-900 hover:bg-gray-800 text-white border-0">
                                <span className="relative flex items-center gap-2">
                                    <Sparkles className="w-5 h-5" />
                                    <span className="text-lg">Discover All Products</span>
                                    <Sparkles className="w-5 h-5" />
                                </span>
                            </Button>
                        </motion.div>
                    </Link>
                </div>
            )}

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"
                        initial={{
                            x: Math.random() * 100 - 50 + "%",
                            y: "100%",
                            scale: Math.random() * 0.5 + 0.5,
                            opacity: Math.random() * 0.5 + 0.25,
                        }}
                        animate={{
                            y: "-100%",
                            x: `${Math.random() * 100 - 50}%`,
                        }}
                        transition={{
                            duration: Math.random() * 10 + 20,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                            delay: Math.random() * 10,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
