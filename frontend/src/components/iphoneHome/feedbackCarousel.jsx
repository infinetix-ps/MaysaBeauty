"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import FloatingProductCard from "./floatingProduct.jsx"
import ProductTag from "./productTag.jsx"
import ProductIcon from "./productIcon.jsx"
import { useInView } from "react-intersection-observer"
import "./feedbackCarousel.css"
const feedbacks = [
    { id: 1, name: "شهد", comment: "كنت مجربة منتجات كثيرة قبل بس رويال سليم عند ميساء  فعلاً فرق معي. بطني خف وبطلت أحس بجوع كثير", productId: 1 },
    { id: 1, name: "شهد", comment: "ما في آثار جانبية، خفيف عالمعدة، وفعلاً حسّيت بفرق بعد أسبوع واحد.", productId: 1 },
    { id: 3, name: "ضياء عليان", comment: "عندي حساسية من كتير منتجات، بس رويال سليم كان طبيعي وآمن عليّ.", productId: 1 },
    { id: 4, name: "احمد", comment: "أنا شب كنت نحيف زيادة عن اللزوم، ما بلاقي اواعي ع مقاسي. بعد شهرين استخدام، صار في فرق كبير وكل اللي حواليا لاحظوا.", productId: 2 },
    { id: 4, name: "محمد نبيل", comment: "كنت أعاني من النحافة، بس بعد استخدام المنتج زدت 5 كيلو بشهر، وشكلي صار أرتب، وثقتي بنفسي رجعت. المنتج فتحلي الشهية بدون أي أعراض جانبية. بنصح فيه من قلبي!", productId: 2 },

]

const products = [
    {
        id: 1,
        name: "ٌRoyal Slim ",
        image: "/images/royalTea.jpg",
        rating: 5,
    },
    {
        id: 2,
        name: "Royal Gain",
        image: "/images/RoyalU.png",
        rating: 5,
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

