import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
    const { scrollY } = useScroll();

    const y = useTransform(scrollY, [0, 300], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

    return (
        <div className="relative h-screen overflow-hidden bg-gray-900">
            {/* Background Image with Motion */}
            <motion.div style={{ y }} className="absolute inset-0">
                <motion.div
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                    className="relative w-full h-full"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 mix-blend-overlay" />
                    <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D9%84%D9%82%D8%B7%D8%A9%20%D8%B4%D8%A7%D8%B4%D8%A9%202024-07-18%20123427-5ZOxE5sSyBibHKux8tY93gRYDSeH5R.png"
                        alt="Hero background"
                        className="opacity-70 w-full h-full object-cover"
                    />
                </motion.div>
            </motion.div>

            {/* Hero Content */}
            <motion.div
                style={{ y, opacity, scale }}
                className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white"
            >
                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-bold mb-6"
                >
                    Discover Your Beauty
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl mb-8 max-w-2xl"
                >
                    Explore our curated collection of premium beauty products
                </motion.p>

                {/* Button */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-gray-900 hover:bg-pink-100 transition-colors px-6 py-3 rounded-lg text-lg font-semibold"
                    >
                        Shop Now
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Hero;