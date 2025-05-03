import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Heart,
  Droplet,
  Scissors,
  Palette,
  Flower,
  Leaf,
  Sun,
  SprayCanIcon as Spray,
  Gem,
  Snowflake,
  Waves,
  Shirt,
  ShoppingBag,
} from "lucide-react";

// Icon mapping for categories
const icons = {
  // Skin Care
  Droplet,
  Snowflake,
  Waves,
  Sparkles,

  // Hair Care
  Spray,
  Waves,
  Scissors,
  Palette,

  // Body Care
  Flower,
  Heart,
  Leaf,
  Sun,

  // Accessories
  Gem,
  Spray,
  Shirt,
  ShoppingBag,
};

const ProductCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch categories from the API
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/categories`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "success") {
          setCategories(data.categorise);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

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
          {categories.map((category, index) => {
            // Select a random icon from the icons object
            const randomIndex = Math.floor(Math.random() * Object.keys(icons).length);
            const Icon = icons[Object.keys(icons)[category.index]] || Heart; // Fallback to Heart icon if undefined

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div
                  onClick={() =>
                    navigate(`/products?categoryName=${encodeURIComponent(category.name)}`)
                  }
                  className="cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative overflow-hidden rounded-full shadow-lg ${category.color} w-32 h-32 flex flex-col items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-pink-500" />
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
