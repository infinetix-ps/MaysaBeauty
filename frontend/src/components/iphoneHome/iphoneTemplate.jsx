import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, AlertCircle } from "lucide-react"
import "./iphoneTemplate.css"

const IPhoneTemplate = ({ content }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % content.length)
        }, 3000)

        return () => clearInterval(timer)
    }, [content.length])

    const handleLoadingComplete = () => {
        setIsLoading(false)
        setHasError(false)
    }

    const handleError = () => {
        setIsLoading(false)
        setHasError(true)
    }

    return (
        <div className="iphone-container">
            <motion.div
                className="iphone-frame"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <div className="relative w-[320px] h-[655px]">
                    <motion.div
                        className="relative w-full h-full"
                        animate={{
                            rotateY: isHovered ? "5deg" : "0deg",
                            scale: isHovered ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    >
                        {/* Phone Frame */}
                        <svg
                            viewBox="0 0 320 655"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute inset-0 w-full h-full"
                        >
                            {/* SVG content */}
                        </svg>

                        {/* Screen Content */}
                        <div className="absolute inset-[10px] overflow-hidden rounded-[44px] bg-black">
                            <div className="w-full h-full relative">
                                <AnimatePresence mode="wait">
                                    {isLoading && (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 flex items-center justify-center bg-black"
                                        >
                                            <Loader2 className="w-8 h-8 animate-spin text-white" />
                                        </motion.div>
                                    )}

                                    {hasError && (
                                        <motion.div
                                            key="error"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white gap-4"
                                        >
                                            <AlertCircle className="w-8 h-8" />
                                            <p className="text-sm">Failed to load content</p>
                                        </motion.div>
                                    )}

                                    <motion.div
                                        key={currentSlide}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute inset-0"
                                    >
                                        {content[currentSlide].type === "image" ? (
                                            <img
                                                src={content[currentSlide].src || "/placeholder.svg"}
                                                alt={content[currentSlide].alt}
                                                className="w-full h-full object-cover"
                                                onLoad={handleLoadingComplete}
                                                onError={handleError}
                                            />
                                        ) : (
                                            <video
                                                src={content[currentSlide].src}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="w-full h-full object-cover"
                                                onLoadedData={handleLoadingComplete}
                                                onError={handleError}
                                            />
                                        )}
                                    </motion.div>
                                </AnimatePresence>

                                {/* Screen Reflection Overlay */}
                                <div
                                    className="absolute inset-0 opacity-5 pointer-events-none"
                                    style={{
                                        background: "linear-gradient(145deg, white 0%, transparent 20%)",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Dynamic Island */}
                        <div
                            className="absolute top-[1px] left-1/2 transform -translate-x-1/2 w-[106px] h-[31px] overflow-visible"
                            style={{
                                filter: "drop-shadow(0 0 1px rgba(0,0,0,0.5))",
                            }}
                        >
                            {/* Main Pill Shape */}
                            <div className="absolute inset-0 bg-black rounded-b-[22px] rounded-t-[20px]">
                                {/* Camera System */}
                                <div className="absolute right-[20px] top-1/2 -translate-y-1/2">
                                    <div className="relative w-[10px] h-[10px]">
                                        {/* Outer Ring */}
                                        <div
                                            className="absolute inset-[-1px] rounded-full"
                                            style={{
                                                background: "linear-gradient(135deg, #333 0%, #222 100%)",
                                            }}
                                        />
                                        {/* Inner Ring */}
                                        <div
                                            className="absolute inset-0 rounded-full bg-black"
                                            style={{
                                                boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.1)",
                                            }}
                                        />
                                        {/* Camera Lens */}
                                        <div
                                            className="absolute inset-[2px] rounded-full"
                                            style={{
                                                background: "radial-gradient(circle at 30% 30%, #222, #000)",
                                            }}
                                        />
                                        {/* Lens Reflection */}
                                        <div
                                            className="absolute top-[3px] left-[3px] w-[3px] h-[3px] rounded-full"
                                            style={{
                                                background: "linear-gradient(135deg, rgba(255,255,255,0.2), transparent)",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Side Buttons - Left */}
                        <div className="absolute left-0 top-[100px] w-[2px] h-[22px] bg-[#2a2a2a] rounded-l" />
                        <div className="absolute left-0 top-[134px] w-[2px] h-[22px] bg-[#2a2a2a] rounded-l" />
                        <div className="absolute left-0 top-[168px] w-[2px] h-[22px] bg-[#2a2a2a] rounded-l" />

                        {/* Side Button - Right */}
                        <div className="absolute right-0 top-[100px] w-[2px] h-[34px] bg-[#2a2a2a] rounded-r" />
                    </motion.div>
                </div>
            </motion.div>
            <motion.div
                className="background-glow"
                animate={{
                    opacity: isHovered ? 0.7 : 0.5,
                    scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.4 }}
            ></motion.div>
        </div>
    )
}

export default IPhoneTemplate

