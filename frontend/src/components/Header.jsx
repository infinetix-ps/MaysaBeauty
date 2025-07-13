import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Search,
  Menu,
  User,
  X,
  ChevronDown,
  Droplet,
  SprayCanIcon as Spray,
  Snowflake,
  Waves,
  Sparkles,
  Scissors,
  Palette,
  Flower,
  Heart,
  Leaf,
  Sun,
  Gem,
  Shirt,
  Home,
} from "lucide-react";

import { useCart } from "../pages/contexts/cartContext";
import WhatsAppButton from "./ui/whatsappButton.jsx";

const icons = [
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
  const [categories, setCategories] = useState([]);
  const { cart } = useCart();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const { scrollY } = useScroll();
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]
  );

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const navigate = useNavigate();

  // Fetch categories
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

  // Scroll listener for header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsUserMenuOpen(false);
    navigate("/signin");
  };

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
              <Link
                to="/"
                className="text-lg md:text-xl lg:text-2xl font-bold truncate"
              >
                Maysa Beauty
              </Link>
            </motion.div>

            <nav className="hidden lg:flex items-center space-x-6">
              <Link
                to="/"
                className="hover:text-pink-400 transition-colors relative group"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="hover:text-pink-400 transition-colors relative group"
              >
                All Products
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setIsCategoryMenuOpen(true)}
                onMouseLeave={() => setIsCategoryMenuOpen(false)}
              >
                {/* <button
                  className="flex items-center space-x-1 hover:text-pink-400 transition-colors focus:outline-none"
                >
                  <span>Categories</span>
                  <ChevronDown className="h-4 w-4" />
                </button> */}

                {isCategoryMenuOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
                    <div className="grid grid-cols-2 gap-6 p-6">
                      {categories?.map((category, index) => {
                        const Icon = icons[category.index];
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
                                <Link
                                  to={`/products?categoryName=${category.name}`}
                                  className="text-lg font-semibold text-gray-800 mb-1"
                                >
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
            </nav>

            <div className="flex items-center space-x-4 relative">
              {/* Search Icon */}
              <Link to="/products">
                <Search className="h-6 w-6 cursor-pointer" />
              </Link>

              {/* Shopping Cart Icon */}
              <Link to="/cart" className="relative">
                <ShoppingBag className="h-6 w-6 cursor-pointer" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* User Icon with dropdown if logged in */}
              <div ref={userMenuRef} className="relative">
                {isLoggedIn ? (
                  <>
                    <User
                      className="h-6 w-6 cursor-pointer"
                      onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    />
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-100"
                        >
                          Log Out
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <Link to="/signin">
                    <User className="h-6 w-6 cursor-pointer" />
                  </Link>
                )}
              </div>
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
                <motion.div
                  variants={mobileMenuItemVariants}
                  custom={0}
                  initial="closed"
                  animate="open"
                >
                  <Link
                    to="/"
                    className="flex items-center space-x-2 text-xl font-bold text-gray-800 hover:text-pink-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Home className="w-5 h-5" />
                    <span>Home</span>
                  </Link>
                </motion.div>

                <motion.div
                  variants={mobileMenuItemVariants}
                  custom={1}
                  initial="closed"
                  animate="open"
                >
                  <Link
                    to="/products"
                    className="flex items-center space-x-2 text-xl font-bold text-gray-800 hover:text-pink-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>All Products</span>
                  </Link>
                </motion.div>

                <motion.div
                  variants={mobileMenuItemVariants}
                  custom={2}
                  initial="closed"
                  animate="open"
                >
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                      <Menu className="w-5 h-5" />
                      <span>Categories</span>
                    </h3>
                    <div className="grid gap-6">
                      {categories?.map((category, index) => {
                        const image = category.image?.secure_url;
                        return (
                          <div
                            key={category.name}
                            className={`p-4 rounded-lg transition-colors hover:bg-gray-50 ${index % 2 === 0 ? "border-r border-gray-200" : ""
                              }`}
                          >
                            <div className="flex items-start space-x-4">
                              <img
                                src={image}
                                alt={category.name}
                                className="w-6 h-6 text-pink-500"
                              />
                              <div className="flex-1">
                                <Link
                                  to={`/products?categoryName=${category.name}`}
                                  className="text-lg font-semibold text-gray-800 mb-1"
                                >
                                  {category.name}
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
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