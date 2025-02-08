"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import "./floatingProduct.css"

const FloatingProductCard = ({ product, isVisible, isSpotlighted }) => {
    const cardRef = useRef(null)
    const spotlightRef = useRef(null)

    useEffect(() => {
        const card = cardRef.current
        const spotlight = spotlightRef.current
        if (!card || !spotlight) return

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            spotlight.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)`
        }

        if (isSpotlighted) {
            card.addEventListener("mousemove", handleMouseMove)
        }

        return () => {
            card.removeEventListener("mousemove", handleMouseMove)
        }
    }, [isSpotlighted])

    return (
        <motion.div
            ref={cardRef}
            className="floating-card relative bg-white bg-opacity-90 backdrop-blur-lg rounded-lg overflow-hidden shadow-lg"
            animate={{
                scale: isVisible ? 1.05 : 1,
                filter: isSpotlighted ? "blur(0px)" : "blur(1px)",
            }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative h-32 sm:h-40 w-full">
                <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-semibold text-[#6d4c41] mb-1">{product.name}</h3>
                <p className="text-xs sm:text-sm text-[#C89FA3] font-bold">{product.price}</p>
            </div>
            <motion.div
                className="floating-card__spotlight absolute inset-0 border-2 rounded-lg pointer-events-none"
                animate={{
                    opacity: isSpotlighted ? 1 : 0,
                    boxShadow: isSpotlighted ? "0 0 20px rgba(200, 159, 163, 0.4)" : "0 0 0px rgba(200, 159, 163, 0)",
                }}
                transition={{ duration: 0.3 }}
                style={{
                    borderColor: "rgba(200, 159, 163, 0.4)",
                }}
            />
            <motion.div
                ref={spotlightRef}
                className="floating-card__spotlight-inner absolute inset-0 pointer-events-none"
                animate={{
                    opacity: isSpotlighted ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    )
}

export default FloatingProductCard

