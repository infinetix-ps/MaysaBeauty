import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../components/ui/button.jsx"
import Header from "../components/Header.jsx"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { useCart } from "../pages/contexts/cartContext.jsx"
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify"
import WhatsAppButton from "../components/ui/whatsappButton.jsx"
import ReviewList from "../components/reviewList.jsx"
import ReviewForm from "../components/reviewForm.jsx"
import axios from "axios"

const StarRating = ({ rating, size = 20 }) => {
    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={size}
                    className={`${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
            ))}
        </div>
    )
}

export default function ProductPage() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const { addToCart } = useCart()


    // Fetch products and orders from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch products from the backend API
                const productResponse = await axios.get(`http://147.93.127.60:4000/products/${id}`);
                setProduct(productResponse.data.product);
                setLoading(false);

            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs only once on mount

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length)
    }

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length)
    }

    const handleAddToCart = () => {
        const cartItem = {
            id: product._id,
            name: product.name,
            price: product?.price,
            image: product?.images[0] || null,
            quantity,
        }
        addToCart(cartItem)
        toast.success("Added to cart!", {
            position: "bottom-right",
            autoClose: 2000,
        })
    }

    const handleReviewSubmit = async (reviewData) => {
        // Here you would typically send the review data to your backend
        // For now, we'll just update the local state
        const newReview = {
            id: Date.now(), // Use a proper ID in production
            author: "Anonymous", // In a real app, this would be the logged-in user
            rating: reviewData.rating,
            text: reviewData.review,
        }

        setProduct((prevProduct) => ({
            ...prevProduct,
            reviews: [newReview, ...prevProduct.reviews],
            numReviews: prevProduct.numReviews + 1,
            rating: (prevProduct.rating * prevProduct.numReviews + reviewData.rating) / (prevProduct.numReviews + 1),
        }))

        toast.success("Review submitted successfully!", {
            position: "bottom-right",
            autoClose: 2000,
        })
    }

    return (
        <div className="min-h-screen bg-[#f5f0eb] dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <main className="container mx-auto px-4 pt-24 pb-12">
                {loading ? (
                    <div className="flex items-center justify-center h-[60vh]">
                        <div className="text-[#402e20] dark:text-gray-100">Loading...</div>
                    </div>
                ) : !product ? (
                    <div className="flex items-center justify-center h-[60vh]">
                        <div className="text-[#402e20] dark:text-gray-100">Product not found</div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-7xl mx-auto"
                    >
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                            {/* Product Images */}
                            <motion.div
                                initial={{ x: -50 }}
                                animate={{ x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
                            >
                                <div className="relative aspect-square overflow-hidden rounded-lg border border-[#C17F82] dark:border-gray-700">
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
                                                src={product?.images ? product?.images[currentImageIndex] : "/placeholder.svg"}
                                                alt={product.name}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </motion.div>
                                    </AnimatePresence>
                                    {product?.images?.length > 1 && (
                                        <>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={prevImage}
                                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                                            >
                                                <ChevronLeft className="w-6 h-6 text-[#402e20] dark:text-gray-100" />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={nextImage}
                                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                                            >
                                                <ChevronRight className="w-6 h-6 text-[#402e20] dark:text-gray-100" />
                                            </motion.button>
                                        </>
                                    )}
                                </div>
                                <div className="flex gap-4 overflow-x-auto pb-2">
                                    {product?.images?.map((image, index) => (
                                        <motion.button
                                            key={index}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-colors ${index === currentImageIndex
                                                ? "border-[#C17F82]"
                                                : "border-gray-200 dark:border-gray-700 hover:border-[#C17F82]"
                                                }`}
                                        >
                                            <img
                                                src={image || "/placeholder.svg"}
                                                alt={`${product.name} - View ${index + 1}`}
                                                className="w-full h-full object-cover rounded-lg"
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
                                className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
                            >
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <h1 className="text-3xl font-bold text-[#402e20] dark:text-gray-100 mb-4">{product.name}</h1>
                                    <p className="text-lg text-[#6d4c41] dark:text-gray-300">{product.description}</p>
                                </motion.div>

                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="text-3xl font-bold text-[#C17F82] dark:text-[#e5ddd3]"
                                >
                                    ${product.price?.toFixed(2)}
                                </motion.div>

                                <div className="flex items-center space-x-2">
                                    <StarRating rating={product.rating} />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">({product.numReviews} reviews)</span>
                                </div>

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="space-y-4"
                                >
                                    <div className="flex items-center space-x-4">
                                        <label htmlFor="quantity" className="text-sm font-medium text-[#6d4c41] dark:text-gray-300">
                                            Quantity:
                                        </label>
                                        <div className="flex items-center rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                            <button
                                                type="button"
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="h-10 w-10 flex items-center justify-center bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors disabled:opacity-50"
                                                aria-label="Decrease quantity"
                                                disabled={quantity <= 1}
                                            >
                                                −
                                            </button>
                                            <input
                                                type="number"
                                                id="quantity"
                                                name="quantity"
                                                min="1"
                                                max="99"
                                                value={quantity}
                                                onChange={(e) => {
                                                    const value = e.target.value
                                                    if (value === "") {
                                                        setQuantity(1)
                                                        return
                                                    }
                                                    const newQuantity = Math.min(99, Math.max(1, Number.parseInt(value, 10) || 1))
                                                    setQuantity(newQuantity)
                                                }}
                                                onBlur={() => {
                                                    if (quantity < 1) setQuantity(1)
                                                }}
                                                className="w-12 text-center border-x border-gray-200 dark:border-gray-700 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                aria-label="Product quantity"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setQuantity(Math.min(99, quantity + 1))}
                                                className="h-10 w-10 flex items-center justify-center bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors disabled:opacity-50"
                                                aria-label="Increase quantity"
                                                disabled={quantity >= 99}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            onClick={handleAddToCart}
                                            className="w-full bg-[#C17F82] !important hover:bg-[#A66467] text-white transition-colors"
                                        >
                                            Add to Cart
                                        </Button>
                                    </motion.div>
                                </motion.div>

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                    className="space-y-4 pt-6 border-t border-[#C17F82] dark:border-gray-700"
                                >
                                    <h3 className="text-lg font-semibold text-[#402e20] dark:text-gray-100">Product Details:</h3>
                                    <div className="space-y-2 text-[#6d4c41] dark:text-gray-300">
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

                        {/* Review Section */}
                        <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-[#402e20] dark:text-gray-100 mb-6">Customer Reviews</h2>
                            <div className="flex items-center mb-6">
                                <StarRating rating={product.rating} size={24} />
                                <span className="ml-2 text-lg text-gray-600 dark:text-gray-400">
                                    {product.rating?.toFixed(1)} out of 5
                                </span>
                            </div>
                            <ReviewForm productId={product.id} onSubmit={handleReviewSubmit} />
                            <div className="mt-8">
                                {/* <ReviewList reviews={product.reviews} /> */}
                            </div>
                        </div>
                    </motion.div>
                )}
                <WhatsAppButton />
            </main>
        </div>
    )
}

