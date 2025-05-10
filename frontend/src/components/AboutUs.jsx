import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function AboutUs() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
    const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [45, 0, -45]);

    return (
        <section ref={containerRef} className="py-32 relative overflow-hidden">
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900"
                style={{ opacity }}
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.05),transparent)] animate-[grain_8s_steps(10)_infinite]" />
            </motion.div>

            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div style={{ scale }} className="relative grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative h-[600px] perspective-1000">
                            <motion.div
                                className="w-full h-full"
                                style={{ rotateY }}
                                transition={{ type: "spring", stiffness: 100 }}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1000&auto=format&fit=crop"
                                    alt="Maysa Beauty Brands Journey"
                                    className="w-full h-full object-cover rounded-lg shadow-2xl"
                                />
                            </motion.div>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-tr from-pink-500/30 to-purple-500/30 mix-blend-overlay rounded-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                            />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative z-10"
                        >
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "100px" }}
                                transition={{ duration: 0.8 }}
                                className="h-1 bg-gradient-to-r from-pink-500 to-purple-500 mb-8"
                            />
                            <h2 className="text-5xl font-bold mb-8 text-gray-800 dark:text-gray-100">Our Beauty Journey</h2>
                            <div className="space-y-6 text-gray-600 dark:text-gray-300">
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="text-lg leading-relaxed"
                                >
                                    At Maysa Beauty Brands, we believe in enhancing your natural beauty. Our journey began with a simple
                                    vision: to provide high-quality slimming, fattening, and skin care products that help you achieve your
                                    desired look.
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="text-lg leading-relaxed"
                                >
                                    We understand that beauty is personal and unique to each individual. That's why we offer a diverse
                                    range of products to cater to various beauty goals, whether you're looking to slim down, add curves,
                                    or achieve radiant skin.
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    className="text-lg leading-relaxed"
                                >
                                    With our worldwide delivery service, we're committed to making beauty accessible to everyone, no
                                    matter where you are. Join us on this journey to discover your most confident and charming self.
                                </motion.p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-8 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
                                >
                                    Explore Our Products
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default AboutUs;
