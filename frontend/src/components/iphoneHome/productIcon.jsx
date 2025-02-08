    import { motion } from "framer-motion"
    import { Watch, Headphones, Activity } from "lucide-react"
    import "./productIcon.css"

    const ProductIcon = ({ productId }) => {
    const getIcon = () => {
        switch (productId) {
        case 1:
            return <Watch className="product-icon watch" />
        case 2:
            return <Headphones className="product-icon headphones" />
        case 3:
            return <Activity className="product-icon activity" />
        default:
            return null
        }
    }

    return (
        <motion.div
        className="product-icon-container"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        >
        {getIcon()}
        </motion.div>
    )
    }

    export default ProductIcon

