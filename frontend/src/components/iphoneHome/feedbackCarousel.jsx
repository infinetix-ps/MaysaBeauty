"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import FloatingProductCard from "./floatingProduct.jsx"
import ProductTag from "./productTag.jsx"
import ProductIcon from "./productIcon.jsx"
import { useInView } from "react-intersection-observer"
import "./feedbackCarousel.css"

const feedbacks = [
    { id: 1, name: "Alice", comment: "Absolutely love this product! It's a game-changer.", productId: 1 },
    { id: 2, name: "Bob", comment: "The user experience is top-notch. Highly recommended!", productId: 2 },
    { id: 3, name: "Charlie", comment: "Great value for money. I use it every day.", productId: 3 },
    { id: 4, name: "Diana", comment: "Customer support is excellent. They're always helpful.", productId: 1 },
]

const products = [
    {
        id: 1,
        name: "Smart Watch Pro",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop",
        price: "$199.99",
        rating: 4,
    },
    {
        id: 2,
        name: "Wireless Earbuds",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop",
        price: "$129.99",
        rating: 5,
    },
    {
        id: 3,
        name: "Fitness Tracker",
        image: "https://images.unsplash.com/photo-1575311373937-040b8e3fd59f?w=300&h=300&fit=crop",
        price: "$79.99",
        rating: 3,
    },
]

const FeedbackCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [hoveredProductId, setHoveredProductId] = useState(null)
    const [ref, inView] = useInView({
        threshold: 0.5,
        triggerOnce: false,
    })

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbacks.length)
        }, 6000)
        return () => clearInterval(timer)
    }, [])

    const currentProduct = products.find((p) => p.id === feedbacks[currentIndex].productId)

    return (
        <div className="feedback-carousel">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="feedback-card"
                    onMouseEnter={() => setHoveredProductId(feedbacks[currentIndex].productId)}
                    onMouseLeave={() => setHoveredProductId(null)}
                >
                    <p className="feedback-comment">"{feedbacks[currentIndex].comment}"</p>
                    <p className="feedback-author">- {feedbacks[currentIndex].name}</p>
                    <div className="product-icon-wrapper">
                        <ProductIcon productId={feedbacks[currentIndex].productId} />
                    </div>
                    {currentProduct && (
                        <ProductTag
                            name={currentProduct.name}
                            price={currentProduct.price}
                            rating={currentProduct.rating}
                            isVisible={inView}
                        />
                    )}
                </motion.div>
            </AnimatePresence>
            <div className="product-grid">
                {products.map((product) => (
                    <FloatingProductCard
                        key={product.id}
                        product={product}
                        isVisible={hoveredProductId === product.id}
                        isSpotlighted={feedbacks[currentIndex].productId === product.id}
                    />
                ))}
            </div>
        </div>
    )
}

export default FeedbackCarousel

