import { useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import "./dynamicBG.css"

const DynamicBackground = () => {
    const containerRef = useRef(null)
    const controls = useAnimation()

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return
            const { clientX, clientY } = e
            const { width, height } = containerRef.current.getBoundingClientRect()
            const moveX = (clientX - width / 2) / 25
            const moveY = (clientY - height / 2) / 25

            controls.start({ x: moveX, y: moveY })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [controls])

    return (
        <div ref={containerRef} className="dynamic-background">
            <motion.div animate={controls} className="w-full h-full">
                {/* Blurred Floating Shapes */}
                <div className="floating-shape shape-1"></div>
                <div className="floating-shape shape-2"></div>
                <div className="floating-shape shape-3"></div>

                {/* Subtle Gradient Overlay */}
                <div className="gradient-overlay"></div>
            </motion.div>
        </div>
    )
}

export default DynamicBackground

