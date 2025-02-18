import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag, Search, Menu, User, X, ChevronDown, Ruler, Weight, Scissors, Palette, Sparkles, Heart, Droplet, Home } from 'lucide-react';
import { useCart } from "../pages/contexts/cartContext";
import ThemeToggle from "./themeProvider.jsx";
import WhatsAppButton from "./ui/whatsappButton.jsx";

// const categories = [
//   {
//     name: "Slimming",
//     icon: Ruler,
//     subcategories: ["Body Wraps", "Weight Management", "Fitness Supplements"],
//     description: "Achieve your ideal figure with our slimming solutions",
//   },
//   {
//     name: "Fattening",
//     icon: Weight,
//     subcategories: ["Curves Enhancement", "Weight Gain", "Natural Supplements"],
//     description: "Enhance your curves naturally and safely",
//   },
//   {
//     name: "Hair Care",
//     icon: Scissors,
//     subcategories: ["Shampoo & Conditioner", "Styling Products", "Hair Treatments"],
//     description: "Transform your hair with premium care products",
//   },
//   {
//     name: "Makeup",
//     icon: Palette,
//     subcategories: ["Face", "Eyes", "Lips", "Nails"],
//     description: "Express yourself with quality cosmetics",
//   },
//   {
//     name: "Skin Care",
//     icon: Sparkles,
//     subcategories: ["Face Care", "Body Care", "Anti-Aging"],
//     description: "Reveal your natural radiance",
//   },
//   {
//     name: "Body Sculpting",
//     icon: Heart,
//     subcategories: ["Cellulite Treatment", "Firming Solutions", "Body Contouring"],
//     description: "Shape and tone your body effectively",
//   },
//   {
//     name: "Fragrance",
//     icon: Droplet,
//     subcategories: ["Perfumes", "Body Mists", "Essential Oils"],
//     description: "Discover your signature scent",
//   },
// ];

const icons = [

    Ruler,
  Weight,
  
   Scissors,
   Palette,

 Sparkles,

 Heart,
Droplet,

];

const mobileMenuItemVariants = {
  closed: { opacity: 0, x: 50 },
  open: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
    },
  }),
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useCart();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const { scrollY } = useScroll();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/categories")
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "success") {
          setCategories(data.categorise);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: 0 },
  };

  return (
    <>
      <motion.header
        style={{ backgroundColor: headerBackground }}
        className="fixed w-full top-0 z-50 transition-all duration-300 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 py-2 md:py-4 pr-16 lg:pr-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link to="/" className="text-lg md:text-xl lg:text-2xl font-bold truncate">
                Maysa Beauty
              </Link>
            </motion.div>

            <nav className="hidden lg:flex items-center space-x-6">
              <Link to="/" className="hover:text-pink-400 transition-colors relative group">
                Home
              </Link>

              <Link to="/products" className="hover:text-pink-400 transition-colors relative group">
                All Products
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setIsCategoryMenuOpen(true)}
                onMouseLeave={() => setIsCategoryMenuOpen(false)}
              >
                <button
                  className="flex items-center space-x-1 hover:text-pink-400 transition-colors focus:outline-none"
                >
                  <span>Categories</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {isCategoryMenuOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
                    <div className="grid grid-cols-2 gap-6 p-6">
                      {categories?.map((category, index) => {
                         const randomIndex = Math.floor(Math.random() * 5) ;
                       
                         const Icon= icons[randomIndex];
                        return (
                          <div
                            key={category.name}
                            className={`p-4 rounded-lg transition-colors hover:bg-gray-50 ${index % 2 === 0 ? "border-r border-gray-200" : ""
                              }`}
                          >
                            <div className="flex items-start space-x-4">
                              <div className="p-2 rounded-lg bg-pink-100">
                                <Icon className="w-6 h-6 text-pink-500" />
                              </div>
                              <div className="flex-1">
                              <Link  to={`/products?categoryName=${category.name}`}  className="text-lg font-semibold text-gray-800 mb-1">
                                  {category.name}
                                </Link>
                        
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* <Link to="/about-us" className="hover:text-pink-400 transition-colors relative group">
                About Us
              </Link> */}
            </nav>

            <div className="flex items-center space-x-4">
              {[Search, ShoppingBag, User].map((Icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={index === 0 ? "/search" : index === 1 ? "/cart" : "/signin"}>
                    {index === 1 ? (
                      <div className="relative">
                        <ShoppingBag className="h-6 w-6 cursor-pointer" />
                        {cartItemCount > 0 && (
                          <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItemCount}
                          </span>
                        )}
                      </div>
                    ) : (
                      <Icon className="h-6 w-6 cursor-pointer" />
                    )}
                  </Link>
                </motion.div>
              ))}
              {/* <ThemeToggle /> */}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="lg:hidden fixed right-0 top-0 z-[60] p-3 m-2 rounded-lg"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            variants={{
              closed: { opacity: 0, x: "100%" },
              open: { opacity: 1, x: 0 },
            }}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 lg:hidden pt-16 overflow-y-auto"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="grid gap-6">
                <motion.div variants={mobileMenuItemVariants} custom={0} initial="closed" animate="open">
                  <Link
                    to="/"
                    className="flex items-center space-x-2 text-xl font-bold text-gray-800 hover:text-pink-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Home className="w-5 h-5" />
                    <span>Home</span>
                  </Link>
                </motion.div>

                <motion.div variants={mobileMenuItemVariants} custom={1} initial="closed" animate="open">
                  <Link
                    to="/products"
                    className="flex items-center space-x-2 text-xl font-bold text-gray-800 hover:text-pink-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>All Products</span>
                  </Link>
                </motion.div>

                <motion.div variants={mobileMenuItemVariants} custom={2} initial="closed" animate="open">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                      <Menu className="w-5 h-5" />
                      <span>Categories</span>
                    </h3>
                    <div className="grid gap-6">
                    {categories?.map((category, index) => {
                         const image= category.image?.secure_url;
                        return (
                          <div
                            key={category.name}
                            className={`p-4 rounded-lg transition-colors hover:bg-gray-50 ${index % 2 === 0 ? "border-r border-gray-200" : ""
                              }`}
                          >
                            <div className="flex items-start space-x-4">
                                 <img src={image} alt={category.name}className="w-6 h-6 text-pink-500" /> 
                              
                              <div className="flex-1">
                                <Link to={`/products?categoryName=${category.name}`} className="text-lg font-semibold text-gray-800 mb-1">
                                  {category.name}
                                </Link>
                                {/* <p className="text-sm text-gray-500 mb-2">{category.description}</p>
                                <ul className="space-y-1">
                                  {category.subcategories.map((subcategory) => (
                                    <li key={subcategory}>
                                      <Link
                                        to={`/category/${category.name.toLowerCase()}/${subcategory
                                          .toLowerCase()
                                          .replace(/\s+/g, "-")}`}
                                        className="text-sm text-gray-600 hover:text-pink-500 transition-colors flex items-center space-x-1"
                                      >
                                        <span>{subcategory}</span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul> */}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={mobileMenuItemVariants} custom={3} initial="closed" animate="open">
                  {/* <Link
                    to="/about-us"
                    className="flex items-center space-x-2 text-xl font-bold text-gray-800 hover:text-pink-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart className="w-5 h-5" />
                    <span>About Us</span>
                  </Link> */}
                </motion.div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <WhatsAppButton />
    </>
  );
};

export default Header;