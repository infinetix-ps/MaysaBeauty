    "use client";

    import { motion } from "framer-motion";
    import Link from "next/link";
    import Image from "next/image";
    import Header from "../components/Header";

    const categories = [
    { name: "Skin Care", image: "/placeholder.svg?height=400&width=400&text=Skin+Care", color: "bg-pink-100" },
    { name: "Hair Care", image: "/placeholder.svg?height=400&width=400&text=Hair+Care", color: "bg-purple-100" },
    { name: "Makeup", image: "/placeholder.svg?height=400&width=400&text=Makeup", color: "bg-yellow-100" },
    { name: "Fragrance", image: "/placeholder.svg?height=400&width=400&text=Fragrance", color: "bg-blue-100" },
    { name: "Body Care", image: "/placeholder.svg?height=400&width=400&text=Body+Care", color: "bg-green-100" },
    { name: "Nails", image: "/placeholder.svg?height=400&width=400&text=Nails", color: "bg-red-100" },
    { name: "Tools", image: "/placeholder.svg?height=400&width=400&text=Tools", color: "bg-indigo-100" },
    { name: "Sets", image: "/placeholder.svg?height=400&width=400&text=Sets", color: "bg-orange-100" },
    ];

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

    export default function CategoriesPage() {
    return (
        <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-16">
            <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-12 text-center text-gray-800"
            >
            Explore Our Categories
            </motion.h1>
            <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
            {categories.map((category) => (
                <motion.div key={category.name} variants={itemVariants}>
                <Link href={`/category/${category.name.toLowerCase().replace(" ", "-")}`}>
                    <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative overflow-hidden rounded-lg shadow-lg ${category.color} aspect-square`}
                    >
                    <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        layout="fill"
                        objectFit="cover"
                        className="mix-blend-multiply"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white bg-opacity-90 px-6 py-4 rounded-full"
                        >
                        <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
                        </motion.div>
                    </div>
                    </motion.div>
                </Link>
                </motion.div>
            ))}
            </motion.div>
        </main>
        </div>
    );
    }
