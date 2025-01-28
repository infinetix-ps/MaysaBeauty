import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function AnimatedDivider() {
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <div className="py-16 bg-[#0f1117]">
            <motion.div
                style={{ scaleX: scale }}
                className="h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600"
            />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mt-8"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-white">Discover Our Collection</h2>
            </motion.div>
        </div>
    );
}

export default AnimatedDivider;