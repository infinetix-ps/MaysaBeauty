import React, { useState, useEffect } from "react";
import { Heart } from 'lucide-react';
import { Button } from "./ui/button.jsx";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useCart } from "../pages/contexts/cartContext.jsx"

const ProductGrid = ({ showAll = false, products = [], limit = 8 }) => {
    const [favorites, setFavorites] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [page, setPage] = useState(1);
    const productsPerPage = 12;
    const { addToCart } = useCart();

    useEffect(() => {
        // Calculate products to display based on pagination or showAll flag
        const slicedProducts = showAll 
            ? products.slice(0, page * productsPerPage)
            : products.slice(0, limit);
        setDisplayedProducts(slicedProducts);
    }, [products, page, showAll, limit]);

    const toggleFavorite = (productId) => {
        setFavorites(prev => {
            const newFavorites = prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId];
            return newFavorites;
        });
    };

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

    const loadMore = () => {
        setPage(prev => prev + 1);
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
            <div className="container mx-auto px-4 py-16 relative">
                {!showAll && (
                    <>
                        <div className="flex flex-col items-center mb-16">
                            <div className="w-full max-w-3xl h-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-8" />
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white"
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
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                    >
                        {displayedProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: (index % 8) * 0.1 }}
                                className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl"
                            >
                                <Link to={`/products/${product.id}`}>
                                    <div className="relative overflow-hidden aspect-square">
                                        <img
                                            src={product.images[0] || "/placeholder.svg"}
                                            alt={product.name}
                                            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                    </div>
                                </Link>
                                <div className="p-6">
                                    <Link to={`/products/${product.id}`}>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                            {product.name}
                                        </h3>
                                    </Link>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        ${product.price.toFixed(2)}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <Button
                                            onClick={() => handleAddToCart(product)}
                                            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0"
                                        >
                                            Add to Cart
                                        </Button>
                                        <button
                                            onClick={() => toggleFavorite(product.id)}
                                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <Heart
                                                className={`h-6 w-6 transition-colors ${
                                                    favorites.includes(product.id)
                                                        ? "text-pink-500 fill-pink-500"
                                                        : "text-gray-400 dark:text-gray-500"
                                                }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {showAll && products.length > displayedProducts.length && (
                    <div className="mt-12 text-center">
                        <Button
                            onClick={loadMore}
                            variant="outline"
                            className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            Load More Products
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductGrid;