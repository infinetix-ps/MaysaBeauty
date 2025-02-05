import React, { createContext, useContext, useState, useEffect } from "react"

const FavoritesContext = createContext()

export const useFavorites = () => {
    const context = useContext(FavoritesContext)
    if (!context) {
        throw new Error("useFavorites must be used within a FavoritesProvider")
    }
    return context
}

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const savedFavorites = localStorage.getItem("favorites")
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

    const toggleFavorite = (productId) => {
        setFavorites((prevFavorites) =>
            prevFavorites.includes(productId)
                ? prevFavorites.filter((id) => id !== productId)
                : [...prevFavorites, productId],
        )
    }

    const isFavorite = (productId) => favorites.includes(productId)

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>{children}</FavoritesContext.Provider>
    )
}

