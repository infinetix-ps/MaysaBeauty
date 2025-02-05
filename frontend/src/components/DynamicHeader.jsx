import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const announcements = [
    {
        id: 1,
        image:
            "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        title: "Welcome to Maysa Beauty Brands",
        description: "An online store for slimming, fattening, and skin care products",
    },
    {
        id: 2,
        image:
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
        title: "Enjoy a Charming Look",
        description: "Discover our range of beauty products for a radiant you",
    },
    {
        id: 3,
        image:
            "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        title: "Worldwide Delivery",
        description: "We deliver to all countries around the world",
    },
];

const DynamicHeader = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const navigate = (newDirection) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            if (newDirection === -1) {
                return prevIndex === 0 ? announcements.length - 1 : prevIndex - 1;
            }
            return (prevIndex + 1) % announcements.length;
        });
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    return (
        <header className="relative h-[calc(100vh-4rem)] overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                    }}
                    className="absolute inset-0"
                >
                    <img
                        src={announcements[currentIndex].image || "/placeholder.svg"}
                        alt={announcements[currentIndex].title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white px-4">
                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl md:text-6xl font-bold mb-4"
                            >
                                {announcements[currentIndex].title}
                            </motion.h2>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-xl md:text-2xl"
                            >
                                {announcements[currentIndex].description}
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            <motion.button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white z-10"
                onClick={() => navigate(-1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous announcement"
            >
                <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-gray-200" />
            </motion.button>
            <motion.button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white z-10"
                onClick={() => navigate(1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next announcement"
            >
                <ChevronRight className="w-6 h-6 text-gray-800 dark:text-gray-200" />
            </motion.button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {announcements.map((_, index) => (
                    <motion.button
                        key={index}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"
                            } transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white`}
                        onClick={() => setCurrentIndex(index)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        aria-label={`Go to announcement ${index + 1}`}
                    />
                ))}
            </div>
        </header>
    );
};

export default DynamicHeader;
