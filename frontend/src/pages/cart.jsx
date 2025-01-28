import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "../pages/contexts/cartContext.jsx"
import Header from "../components/Header.jsx"
import { Button } from "../components/ui/button"
import { Trash2, Plus, Minus } from "lucide-react"
import { Link } from "react-router-dom"

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">Your Shopping Cart</h1>
                {cart.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <p className="text-xl mb-4 dark:text-gray-300">Your cart is empty</p>
                        <Link to="/products">
                            <Button>Continue Shopping</Button>
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <AnimatePresence>
                            {cart.map((item) => (
                                <motion.div
                                    key={`${item.id}-${item.color}-${item.size}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 flex items-center"
                                >
                                    <img
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-md mr-4"
                                    />
                                    <div className="flex-grow">
                                        <h2 className="text-xl font-semibold dark:text-gray-100">{item.name}</h2>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {item.color && `Color: ${item.color}`}
                                            {item.color && item.size && " | "}
                                            {item.size && `Size: ${item.size}`}
                                        </p>
                                        <p className="text-gray-800 dark:text-gray-200 font-semibold">${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                            className="dark:border-gray-600 dark:text-gray-300"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </Button>
                                        <span className="mx-2 font-semibold dark:text-gray-300">{item.quantity}</span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="dark:border-gray-600 dark:text-gray-300"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="ml-4 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </Button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xl font-semibold dark:text-gray-100">Total:</span>
                                <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <Button variant="outline" onClick={clearCart} className="dark:border-gray-600 dark:text-gray-300">
                                    Clear Cart
                                </Button>
                                <Link to="/checkout">
                                    <Button>Proceed to Checkout</Button>
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </main>
        </div>
    )
}

