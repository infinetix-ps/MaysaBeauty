import { motion } from "framer-motion"
import { Star } from "lucide-react"
import "./productTag.css"

const ProductTag = ({ name, price, rating, isVisible }) => {
    return (
        <motion.div
            className="product-tag absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-2 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="product-tag__name text-sm font-semibold text-white mb-1">{name}</div>
            <div className="product-tag__price text-xs text-blue-300">{price}</div>
            <div className="product-tag__rating flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`product-tag__star w-3 h-3 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                    />
                ))}
            </div>
        </motion.div>
    )
}

export default ProductTag

