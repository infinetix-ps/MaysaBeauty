import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import Header from "../components/Header.jsx"
import { Input } from "../components/ui/input.jsx"
import { Label } from "../components/ui/label.jsx"
import { Slider } from "../components/ui/slider.jsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select.jsx"
import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "../components/ui/button.jsx"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../components/ui/sheet.jsx"
import { Checkbox } from "../components/ui/checkbox.jsx"
import { products } from "../App.js"
import ProductGrid from "../components/ProductGrid.jsx"
import debounce from "lodash.debounce"

const AllProductsPage = () => {
    // Extract unique categories
    const categories = [...new Set(products.map((product) => product.category))]
    const maxPrice = Math.max(...products.map((product) => product.price))
    const minPrice = Math.min(...products.map((product) => product.price))

    // States
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategories, setSelectedCategories] = useState([])
    const [priceRange, setPriceRange] = useState([minPrice, maxPrice])
    const [sortBy, setSortBy] = useState("name-asc")
    const [filteredProducts, setFilteredProducts] = useState(products)
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
    const [minPriceInput, setMinPriceInput] = useState(minPrice.toString())
    const [maxPriceInput, setMaxPriceInput] = useState(maxPrice.toString())

    const debouncedSetPriceRange = useCallback(
        debounce((newRange) => setPriceRange(newRange), 300),
        [],
    )

    useEffect(() => {
        let result = [...products]

        if (searchTerm) {
            result = result.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        }

        if (selectedCategories.length > 0) {
            result = result.filter((product) => selectedCategories.includes(product.category))
        }

        result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

        result.sort((a, b) => {
            switch (sortBy) {
                case "price-asc":
                    return a.price - b.price
                case "price-desc":
                    return b.price - a.price
                case "name-desc":
                    return b.name.localeCompare(a.name)
                default:
                    return a.name.localeCompare(b.name)
            }
        })

        setFilteredProducts(result)
    }, [searchTerm, selectedCategories, priceRange, sortBy])

    const FilterControls = () => (
        <div className="space-y-6">
            <div>
                <Label htmlFor="sort" className="text-[#402e20] dark:text-white">
                    Sort By
                </Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full mt-2 bg-white border-[#C17F82]/20 focus:border-[#C17F82]">
                        <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                        <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                        <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                        <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label className="text-[#402e20] dark:text-white">Categories</Label>
                <div className="grid gap-2 mt-2">
                    {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                                id={category}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={(checked) => {
                                    setSelectedCategories((prev) => (checked ? [...prev, category] : prev.filter((c) => c !== category)))
                                }}
                                className="border-[#C17F82] text-[#C17F82]"
                            />
                            <Label htmlFor={category} className="text-sm font-normal text-[#402e20] dark:text-white">
                                {category}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <Label className="text-[#402e20] dark:text-white">Price Range</Label>
                <div className="pt-6 space-y-4">
                    <Slider
                        min={minPrice}
                        max={maxPrice}
                        step={(maxPrice - minPrice) / 100}
                        value={priceRange}
                        onValueChange={(newRange) => {
                            setMinPriceInput(newRange[0].toFixed(2))
                            setMaxPriceInput(newRange[1].toFixed(2))
                            debouncedSetPriceRange(newRange)
                        }}
                        className="mt-2"
                    />
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <Label htmlFor="min-price" className="text-xs text-[#402e20] dark:text-gray-400">
                                Min Price
                            </Label>
                            <Input
                                id="min-price"
                                type="number"
                                value={minPriceInput}
                                onChange={(e) => {
                                    const value = Number(e.target.value)
                                    setMinPriceInput(e.target.value)
                                    if (!isNaN(value) && value >= minPrice) {
                                        debouncedSetPriceRange([value, priceRange[1]])
                                    }
                                }}
                                className="mt-1 bg-white border-[#C17F82]/20 focus:border-[#C17F82]"
                            />
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="max-price" className="text-xs text-[#402e20] dark:text-gray-400">
                                Max Price
                            </Label>
                            <Input
                                id="max-price"
                                type="number"
                                value={maxPriceInput}
                                onChange={(e) => {
                                    const value = Number(e.target.value)
                                    setMaxPriceInput(e.target.value)
                                    if (!isNaN(value) && value <= maxPrice) {
                                        debouncedSetPriceRange([priceRange[0], value])
                                    }
                                }}
                                className="mt-1 bg-white border-[#C17F82]/20 focus:border-[#C17F82]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-[#f5f0eb] dark:bg-gray-900">
            <Header />
            <main className="container mx-auto px-4 py-8 pt-24">
                <div className="flex flex-col space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-bold text-[#402e20] dark:text-white"
                        >
                            All Products
                        </motion.h1>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="relative flex-1 md:w-80">
                                <Input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-white/80 backdrop-blur-sm border-[#C17F82]/20 
                                             focus:border-[#C17F82] transition-colors"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C17F82] h-4 w-4" />
                            </div>
                            <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="md:hidden bg-[#C17F82] text-white hover:bg-[#A66467] 
                                                 border-[#C17F82] transition-colors"
                                    >
                                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                                        Filters
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle className="text-[#402e20]">Filters</SheetTitle>
                                        <SheetDescription>Refine your product search</SheetDescription>
                                    </SheetHeader>
                                    <div className="mt-6">
                                        <FilterControls />
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-4 gap-6">
                        <motion.aside
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="hidden md:block bg-gradient-to-br from-white via-[#f8f3f3] to-[#f5e6e6] 
                                     dark:from-gray-800 dark:via-gray-750 dark:to-gray-700
                                     p-6 rounded-lg shadow-md"
                        >
                            <FilterControls />
                        </motion.aside>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-3"
                        >
                            <ProductGrid showAll={true} products={filteredProducts} />
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AllProductsPage

