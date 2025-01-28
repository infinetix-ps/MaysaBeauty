import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getProduct } from "../App.js";
import { Button } from "../components/ui/button.jsx";
import Header from "../components/Header.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../pages/contexts/cartContext.jsx";
import "react-toastify/dist/ReactToastify.css";
// import Image from "react-image";
export default function ProductPage() {
    const { id } = useParams();
    // const history = useHistory();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const fetchedProduct = getProduct(Number(id));
            if (fetchedProduct) {
                setProduct(fetchedProduct);
            } else {
                // history.push("/404");
            }
            setLoading(false);
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
    };

    const handleAddToCart = () => {
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity,
        };
        addToCart(cartItem);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <Header />
            <main className="container mx-auto px-4 pt-24 pb-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-7xl mx-auto"
                >
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                        {/* Product Images */}
                        <motion.div initial={{ x: -50 }} animate={{ x: 0 }} transition={{ duration: 0.6 }} className="space-y-4">
                            <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentImageIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative w-full h-full"
                                    >
                                        <img
                                            src={product.images[currentImageIndex] || "/placeholder.svg"}
                                            alt={product.name}
                                            className="rounded-lg"
                                        />
                                    </motion.div>
                                </AnimatePresence>
                                {product.images.length > 1 && (
                                    <>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={prevImage}
                                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={nextImage}
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </motion.button>
                                    </>
                                )}
                            </div>
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {product.images.map((image, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-colors ${index === currentImageIndex
                                            ? "border-pink-500"
                                            : "border-gray-200 dark:border-gray-800 hover:border-pink-300"
                                            }`}
                                    >
                                        <img
                                            src={image || "/placeholder.svg"}
                                            alt={`${product.name} - View ${index + 1}`}
                                            className="rounded-lg"
                                        />
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Product Info */}
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{product.name}</h1>
                                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{product.description}</p>
                            </motion.div>

                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-3xl font-bold text-gray-900 dark:text-gray-100"
                            >
                                ${product.price.toFixed(2)}
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="space-y-4"
                            >
                                <div className="flex items-center space-x-4">
                                    <label htmlFor="quantity" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Quantity:
                                    </label>
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                                            aria-label="Decrease quantity"
                                        >
                                            <span className="text-xl font-bold">−</span>
                                        </button>
                                        <input
                                            type="number"
                                            id="quantity"
                                            min="1"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                                            className="w-16 text-center border-y border-gray-300 dark:border-gray-700 py-2 px-3 text-gray-900 dark:text-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-pink-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-10 h-10 flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                                            aria-label="Increase quantity"
                                        >
                                            <span className="text-xl font-bold">+</span>
                                        </button>
                                    </div>
                                </div>

                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button onClick={handleAddToCart} size="lg" className="w-full">
                                        Add to Cart
                                    </Button>
                                </motion.div>
                            </motion.div>

                            {/* Product Details */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="space-y-4 pt-6"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Product Details:</h3>
                                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                                    <p>
                                        <span className="font-medium">Category:</span> {product.category}
                                    </p>
                                    <p>
                                        <span className="font-medium">Usage:</span> {product.usage}
                                    </p>
                                    <p>
                                        <span className="font-medium">Ingredients:</span> {product.ingredients}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
