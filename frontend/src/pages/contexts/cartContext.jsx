import React, { createContext, useContext, useState, useEffect } from "react"
import { toast } from "react-toastify"

const CartContext = createContext()

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    useEffect(() => {
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
            setCart(JSON.parse(savedCart))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem,
                )
            }
            return [...prevCart, item]
        })
        toast.success(`Added ${item.name} to cart!`, {
            position: "bottom-right",
            autoClose: 2000,
        })
    }

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id))
        toast.info("Item removed from cart", {
            position: "bottom-right",
            autoClose: 2000,
        })
    }

    const updateQuantity = (id, quantity) => {
        setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }

    const clearCart = () => {
        setCart([])
        toast.info("Cart cleared", {
            position: "bottom-right",
            autoClose: 2000,
        })
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

