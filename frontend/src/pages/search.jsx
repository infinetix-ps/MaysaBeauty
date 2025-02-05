import React, { useState } from "react";
import { products } from "../App.js";
import Header from "../components/Header.jsx";
import { Link } from "react-router-dom";
import { Input } from "../components/ui/input.jsx";
import { motion } from "framer-motion";

export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
                    Search Products
                </h1>
                <Input
                    type="text"
                    placeholder="Search for products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border mb-8 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredProducts.map((product) => (
                        <Link to={`/products/${product.id}`} key={product.id}>
                            <motion.div
                                whileHover={{ y: -4 }}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300"
                            >
                                <img
                                    src={product.images?.[0] || "/placeholder.svg"}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                                    {product.name}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    ${product.price.toFixed(2)}
                                </p>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </main>
        </div>
    );
}
