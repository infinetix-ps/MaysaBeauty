import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

// const categories = [
//     {
//         name: "Slimming",
//         image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=1000",
//         color: "bg-blue-100 dark:bg-blue-900",
//     },
//     {
//         name: "Fattening",
//         image: "https://images.unsplash.com/photo-1565895405140-6b9830a88c19?auto=format&fit=crop&q=80&w=1000",
//         color: "bg-pink-100 dark:bg-pink-900",
//     },
//     {
//         name: "Skin Care",
//         image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1000",
//         color: "bg-green-100 dark:bg-green-900",
//     },
//     {
//         name: "Body Sculpting",
//         image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1000",
//         color: "bg-purple-100 dark:bg-purple-900",
//     },
//     {
//         name: "Cellulite Treatment",
//         image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1000",
//         color: "bg-yellow-100 dark:bg-yellow-900",
//     },
//     {
//         name: "Stretch Mark Care",
//         image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1000",
//         color: "bg-red-100 dark:bg-red-900",
//     },
//     {
//         name: "Breast Enhancement",
//         image: "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?auto=format&fit=crop&q=80&w=1000",
//         color: "bg-indigo-100 dark:bg-indigo-900",
//     },
//     {
//         name: "Anti-Aging",
//         image: "https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?auto=format&fit=crop&q=80&w=1000",
//         color: "bg-teal-100 dark:bg-teal-900",
//     },
// ]

const ProductCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://147.93.127.60:4000/categories")
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "success") {
                    setCategories(data.categorise);
                }
            })
            .catch((error) => console.error("Error fetching categories:", error));
    }, []);
    const navigate = useNavigate()
    return (
        <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-gray-100"
                >
                    Explore Our Categories
                </motion.h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div
                                onClick={() => navigate(`/products?categoryName=${encodeURIComponent(category.name)}`)}
                                className="cursor-pointer"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`relative overflow-hidden rounded-full shadow-lg ${category.color} w-32 h-32 flex flex-col items-center justify-center`}
                                >
                                    <div className="absolute inset-0 w-full h-full">
                                        <img
                                            src={category.image?.secure_url || "/placeholder.svg"}
                                            alt={category.name}
                                            className="transition-transform duration-300 hover:scale-110 w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black opacity-20 dark:opacity-40"></div>
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileHover={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative z-10 text-center px-4"
                                    >
                                        <h3 className="text-sm font-semibold text-white drop-shadow-lg">{category.name}</h3>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ProductCategories

