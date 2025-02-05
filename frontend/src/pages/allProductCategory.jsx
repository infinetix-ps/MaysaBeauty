import React from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom"; // React Router for routing
import Header from "../../components/Header";
import { Button } from "../../components/ui/button";
import { Heart, Filter, ChevronRight } from "lucide-react";

// Mock category data
const categories = {
    "skin-care": {
        name: "Skin Care",
        description: "Discover premium skincare products for a radiant complexion",
        image: "/placeholder.svg", // Replace with a valid URL or local path
        subcategories: ["Cleansers", "Moisturizers", "Serums", "Masks", "Eye Care"],
        products: [
            { id: 1, name: "Hydrating Serum", price: 49.99, image: "/placeholder.svg" },
            { id: 2, name: "Gentle Cleanser", price: 29.99, image: "/placeholder.svg" },
            { id: 3, name: "Night Cream", price: 59.99, image: "/placeholder.svg" },
        ],
    },
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

const CategoryPage = () => {
    const { slug } = useParams(); // Get the slug from the route
    const category = categories[slug];

    if (!category) return <p>Category not found</p>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative h-[40vh] overflow-hidden"
            >
                <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="absolute inset-0 object-cover w-full h-full brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-2xl text-white"
                        >
                            <h1 className="text-5xl font-bold mb-4">{category.name}</h1>
                            <p className="text-xl">{category.description}</p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <Link to="/" className="hover:text-pink-500">
                            Home
                        </Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="text-gray-900 font-medium">{category.name}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold">Filters</h2>
                                <Filter className="w-5 h-5 text-gray-500" />
                            </div>

                            <div className="space-y-6">
                                {/* Subcategories */}
                                <div>
                                    <h3 className="font-medium mb-4">Categories</h3>
                                    <div className="space-y-2">
                                        {category.subcategories.map((subcat) => (
                                            <motion.button
                                                key={subcat}
                                                whileHover={{ x: 4 }}
                                                className="block text-gray-600 hover:text-pink-500"
                                            >
                                                {subcat}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <h3 className="font-medium mb-4">Price Range</h3>
                                    <input
                                        type="range"
                                        className="w-full"
                                        min="0"
                                        max="200"
                                        step="10"
                                    />
                                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                                        <span>$0</span>
                                        <span>$200</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.aside>

                    {/* Product Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-3"
                    >
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {category.products.map((product) => (
                                <motion.div
                                    key={product.id}
                                    variants={itemVariants}
                                    whileHover={{ y: -8 }}
                                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                                >
                                    <div className="relative aspect-square">
                                        <img
                                            src={product.image || "/placeholder.svg"}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md"
                                        >
                                            <Heart className="w-4 h-4 text-gray-600" />
                                        </motion.button>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                                        <p className="text-gray-600 mb-4">${product.price}</p>
                                        <Button className="w-full">Add to Cart</Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
