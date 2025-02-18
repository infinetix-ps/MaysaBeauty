"use client"

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
        <motion.div
          className="iphone-body"
          animate={{
            rotateY: isHovered ? "5deg" : "0deg",
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Phone Frame */}
          <div className="phone-frame">
            <div className="frame-texture" />
          </div>

          {/* Screen Bezel */}
          <div className="screen-bezel" />

          {/* Screen Content */}
          <div className="screen-content">
            <div className="content-wrapper">
              <AnimatePresence mode="wait">
                {isLoading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="loading-screen"
                  >
                    <Loader2 className="loading-icon" />
                  </motion.div>
                )}

                {hasError && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="error-screen"
                  >
                    <AlertCircle className="error-icon" />
                    <p className="error-text">Failed to load content</p>
                  </motion.div>
                )}

                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="slide-content"
                >
                  {content[currentSlide].type === "image" ? (
                    <img
                      src={content[currentSlide].src || "/placeholder.svg"}
                      alt={content[currentSlide].alt}
                      className="content-image"
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
                      className="content-video"
                      onLoadedData={handleLoadingComplete}
                      onError={handleError}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Screen Reflection Overlay */}
              <div className="screen-reflection" />
              <div className="screen-texture" />
            </div>
          </div>

          {/* Dynamic Island */}
          <div className="dynamic-island">
            <div className="island-content" />
            {/* Camera */}
            <div className="camera-system">
              <div className="camera-outer">
                <div className="camera-inner">
                  <div className="camera-lens">
                    <div className="lens-reflection" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Buttons */}
          <div className="side-button left-top" />
          <div className="side-button left-bottom" />
          <div className="side-button right" />

          {/* Bottom Port */}
          <div className="bottom-port" />
        </motion.div>
      </motion.div>
      <div className="frame-reflection" />
      <div className="frame-shadow" />
    </div>
  )
}

export default IPhoneTemplate
