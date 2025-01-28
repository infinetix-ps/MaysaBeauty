import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function FullScreenPhoto({ src, alt }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="fixed inset-0 z-50 bg-black"
                >
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: 'reverse' }}
                        className="relative w-full h-full"
                    >
                        <img
                            src={src || '/placeholder.svg'} // Use regular <img> tag
                            alt={alt}
                            className="object-cover w-full h-full"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-center"
                    >
                        <p className="text-2xl font-bold mb-2">Welcome to ChicBoutique</p>
                        <p className="text-lg">Scroll down to explore our collection</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default FullScreenPhoto;