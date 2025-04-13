import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "../pages/contexts/cartContext.jsx"
import Header from "../components/Header.jsx"
import { Button } from "../components/ui/button"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { Link } from "react-router-dom"
import WhatsAppButton from "../components/ui/whatsappButton.jsx"

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    const shippingCost = 10
    const totalPrice = subtotal + shippingCost

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <Header />
            <main className="container mx-auto px-8 py-24 max-w-7xl">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Shopping Cart</h1>
                {cart.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center space-y-4"
                    >
                        <div className="flex justify-center">
                            <ShoppingBag className="h-16 w-16 text-gray-400 dark:text-gray-600" />
                        </div>
                        <p className="text-xl mb-4 dark:text-gray-300">Your cart is empty</p>
                        <Link to="/products">
                            <Button size="lg" className="font-semibold">
                                Continue Shopping
                            </Button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-4 lg:w-2/3"
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                                <AnimatePresence>
                                    {cart.map((item) => (
                                        <motion.div
                                            key={`${item.id}-${item.color}-${item.size}`}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex flex-col sm:flex-row sm:items-center gap-4 py-4 border-b last:border-0 border-gray-100 dark:border-gray-700"
                                        >
                                            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 flex-shrink-0">
                                                <img
                                                    src={item.image || "/placeholder.svg"}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between flex-grow gap-3">
                                                <div className="space-y-1">
                                                    <h2 className="text-base font-semibold dark:text-gray-100">{item.name}</h2>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {item.color && `Color: ${item.color}`}
                                                        {item.color && item.size && " | "}
                                                        {item.size && `Size: ${item.size}`}
                                                    </p>
                                                    <p className="text-base font-semibold dark:text-gray-200">${item.price.toFixed(2)}</p>
                                                </div>
                                                <div className="flex items-center justify-between sm:justify-end gap-4">
                                                    <div className="flex items-center border rounded-lg">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                            className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-l-lg"
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </button>
                                                        <span className="w-10 text-center font-medium dark:text-gray-300">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-r-lg"
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="lg:w-1/3"
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sticky top-4">
                                <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">Order Summary</h2>
                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                        <span className="font-medium dark:text-gray-200">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                                        <span className="font-medium dark:text-gray-200">${shippingCost.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
                                        <div className="flex justify-between">
                                            <span className="font-medium dark:text-gray-100">Total</span>
                                            <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                                                ${totalPrice.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Link
                                        to="/checkout"
                                        state={{ cart, totalPrice }}
                                        className="w-full"
                                    >
                                        <Button className="w-full font-medium">Proceed to Checkout</Button>
                                    </Link>

                                    <Button variant="outline" onClick={clearCart} className="w-full">
                                        Clear Cart
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                <WhatsAppButton />
            </main>
        </div>
    )
}

