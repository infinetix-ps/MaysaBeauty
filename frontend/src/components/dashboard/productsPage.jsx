"use client"

import { useState, useCallback, useEffect } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "../uiDashboard/card.jsx"
import { Input } from "../uiDashboard/input.jsx"
import { Label } from "../ui/label.jsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../uiDashboard/tabs.jsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../uiDashboard/table.jsx"
import { Badge } from "../uiDashboard/badge.jsx"
import { Button } from "../uiDashboard/button.jsx"
import { PlusCircle, Search, Pencil, Trash2, MoreHorizontal, X, ArrowLeft } from "lucide-react"
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog.jsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select.jsx"
import { toast } from "../ui/useToast.js"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "../ui/dropDownMenu.jsx"
import { useDropzone } from "react-dropzone"
import { ScrollArea, ScrollBar } from "../ui/scrollArea.jsx"
import axios from "axios"

// const initialProducts = [
//     {
//         id: 1,
//         name: "Sparkly Princess Dress",
//         category: "Dresses",
//         price: 49.99,
//         stock: 50,
//         status: "In Stock",
//         photos: [],
//     },
//     { id: 2, name: "Unicorn T-Shirt", category: "Tops", price: 24.99, stock: 5, status: "Low Stock", photos: [] },
//     {
//         id: 3,
//         name: "Rainbow Tutu Skirt",
//         category: "Bottoms",
//         price: 34.99,
//         stock: 0,
//         status: "Out of Stock",
//         photos: [],
//     },
//     {
//         id: 4,
//         name: "Butterfly Hair Clips Set",
//         category: "Accessories",
//         price: 12.99,
//         stock: 200,
//         status: "In Stock",
//         photos: [],
//     },
//     { id: 5, name: "Glitter Sneakers", category: "Shoes", price: 39.99, stock: 8, status: "Low Stock", photos: [] },
// ]

const ProductCard = ({ product, onEdit, onDelete }) => {
    return (
        <Card className="h-full bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4">
                <div className="grid gap-2">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {product.photos?.length > 0 ? (
                            product.photos?.map((photo, index) => (
                                <img
                                    key={index}
                                    src={photo || "/placeholder.svg"}
                                    alt={`${product.name} ${index + 1}`}
                                    className="h-20 w-20 rounded-md object-cover border border-gray-200"
                                />
                            ))
                        ) : (
                            <div className="h-20 w-20 rounded-md bg-gray-100" />
                        )}
                    </div>
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-500 hover:text-gray-700 touch-manipulation min-h-[44px] min-w-[44px]"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white border border-gray-200">
                                <DropdownMenuLabel className="text-gray-700">Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => onEdit(product)} className="text-gray-700 hover:bg-gray-100">
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onDelete(product.id)} className="text-red-600 hover:bg-red-50">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                            {product.category}
                        </Badge>
                        <Badge
                            variant={
                                product.status === "In Stock" ? "default" : product.status === "Low Stock" ? "warning" : "destructive"
                            }
                            className={getStatusClassName(product.status)}
                        >
                            {product.status}
                        </Badge>
                    </div>
                    <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                </div>
            </CardContent>
        </Card>
    )
}

const ProductTable = ({ products, onEdit, onDelete }) => {
    return (
        <div className="hidden lg:block overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className="text-gray-700">Name</TableHead>
                        <TableHead className="text-gray-700">Category</TableHead>
                        <TableHead className="text-gray-700">Price</TableHead>
                        <TableHead className="text-gray-700">Stock</TableHead>
                        <TableHead className="text-gray-700">Status</TableHead>
                        <TableHead className="text-gray-700">Photos</TableHead>
                        <TableHead className="text-gray-700">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products?.map((product) => (
                        <TableRow key={product.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium text-gray-900">{product.name}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                                    {product.category}
                                </Badge>
                            </TableCell>
                            <TableCell>${product.price.toFixed(2)}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        product.status === "In Stock"
                                            ? "default"
                                            : product.status === "Low Stock"
                                                ? "warning"
                                                : "destructive"
                                    }
                                    className={getStatusClassName(product.status)}
                                >
                                    {product.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-1">
                                    {product.photos?.map((photo, index) => (
                                        <img
                                            key={index}
                                            src={photo || "/placeholder.svg"}
                                            alt={`Product ${index + 1}`}
                                            className="h-10 w-10 rounded-md object-cover border border-gray-200"
                                        />
                                    ))}
                                </div>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-white border border-gray-200">
                                        <DropdownMenuLabel className="text-gray-700">Actions</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => onEdit(product)} className="text-gray-700 hover:bg-gray-100">
                                            <Pencil className="mr-2 h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => onDelete(product.id)} className="text-red-600 hover:bg-red-50">
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

const ProductGrid = ({ products, onEdit, onDelete }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
            {products?.map((product) => (
                <ProductCard key={product.id} product={product} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    )
}

const ProductsPage = () => {
    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [newProduct, setNewProduct] = useState({
        name: "",
        category: "",
        price: 0,
        stock: 0,
        photos: [],
    })
    const [editingProduct, setEditingProduct] = useState(null)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [addDialogOpen, setAddDialogOpen] = useState(false)

    // Fetch products and orders from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch products from the backend API
                const productResponse = await axios.get(`http://147.93.127.60:4000/products`);
                setProducts(productResponse.data.products);


            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs only once on mount

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch("http://147.93.127.60:4000/categories")
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "success") {
                    setCategories(data.categorise);
                }
            })
            .catch((error) => console.error("Error fetching categories:", error));
    }, []);


    const onDrop = useCallback((acceptedFiles, mode = "add") => {
        const newPhotos = acceptedFiles.slice(0, 4).map((file) => URL.createObjectURL(file))
        if (mode === "add") {
            setNewProduct((prev) => ({
                ...prev,
                photos: [...prev.photos, ...newPhotos].slice(0, 4),
            }))
        } else if (mode === "edit") {
            setEditingProduct((prev) => ({
                ...prev,
                photos: [...prev.photos, ...newPhotos].slice(0, 4),
            }))
        }
    }, [])

    const { getRootProps: getAddRootProps, getInputProps: getAddInputProps } = useDropzone({
        onDrop: (files) => onDrop(files, "add"),
        accept: {
            "image/*": [".jpeg", ".png", ".jpg", ".gif"],
        },
        maxFiles: 4,
        noClick: false,
        noKeyboard: false,
    })

    const { getRootProps: getEditRootProps, getInputProps: getEditInputProps } = useDropzone({
        onDrop: (files) => onDrop(files, "edit"),
        accept: {
            "image/*": [".jpeg", ".png", ".jpg", ".gif"],
        },
        maxFiles: 4,
    })

    const removePhoto = (index, mode = "add") => {
        if (mode === "add") {
            setNewProduct((prev) => ({
                ...prev,
                photos: prev.photos?.filter((_, i) => i !== index),
            }))
        } else if (mode === "edit") {
            setEditingProduct((prev) => ({
                ...prev,
                photos: prev.photos?.filter((_, i) => i !== index),
            }))
        }
    }

    const filteredProducts = products?.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

    // const handleAddProduct = () => {
    //     try {
    //         console.log("Adding product:", newProduct)
    //         if (!newProduct.name || !newProduct.category || newProduct.price <= 0 || newProduct.stock < 0) {
    //             throw new Error("Please fill all required fields with valid values.")
    //         }
    //         const productStatus = newProduct.stock > 10 ? "In Stock" : newProduct.stock > 0 ? "Low Stock" : "Out of Stock"
    //         const product = {
    //             ...newProduct,
    //             id: Date.now(), // Use timestamp as a unique ID
    //             status: productStatus,
    //         }
    //         setProducts((prevProducts) => {
    //             console.log("Previous products:", prevProducts)
    //             const updatedProducts = [...prevProducts, product]
    //             console.log("Updated products:", updatedProducts)
    //             return updatedProducts
    //         })
    //         toast({
    //             title: "Product Added",
    //             description: `${product.name} has been added to the inventory.`,
    //         })
    //         console.log("Product added successfully")
    //         return product // Return the newly added product
    //     } catch (error) {
    //         console.error("Error adding product:", error)
    //         toast({
    //             title: "Error",
    //             description: error.message,
    //             variant: "destructive",
    //         })
    //         return null
    //     }
    // }
    const handleAddProduct = async () => {
        try {
            console.log("Adding product:", newProduct);

            if (!newProduct.name || !newProduct.category || newProduct.price <= 0 || newProduct.stock < 0) {
                throw new Error("Please fill all required fields with valid values.");
            }

            // Construct the request payload
            const productData = {
                name: newProduct.name,
                price: newProduct.price,
                discount: newProduct.discount || 0,
                categoryId: newProduct.category, // Ensure this matches your backend schema
                subCategoryId: newProduct.subCategory || null, // Optional subcategory
            };

            // Send a POST request to the backend using Axios
            const { data } = await axios.post("http://147.93.127.60:4000/products", productData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Successfully added product
            setProducts((prevProducts) => [...prevProducts, data.product]);

            toast({
                title: "Product Added",
                description: `${data.product.name} has been added to the inventory.`,
            });

            console.log("Product added successfully:", data.product);
            return data.product; // Return newly created product
        } catch (error) {
            console.error("Error adding product:", error);
            toast({
                title: "Error",
                description: error.response?.data?.message || error.message,
                variant: "destructive",
            });
            return null;
        }
    };

    const handleCloseAddDialog = (open) => {
        if (!open) {
            setNewProduct({ name: "", category: "", price: 0, stock: 0, photos: [] })
        }
        setAddDialogOpen(open)
    }

    const handleEditProduct = (product) => {
        setEditingProduct(product)
        setEditDialogOpen(true)
    }

    const handleUpdateProduct = () => {
        if (editingProduct) {
            const updatedStatus =
                editingProduct.stock > 10 ? "In Stock" : editingProduct.stock > 0 ? "Low Stock" : "Out of Stock"

            const updatedProduct = {
                ...editingProduct,
                status: updatedStatus,
            }

            const updatedProducts = products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
            setProducts(updatedProducts)
            setEditingProduct(null)
            setEditDialogOpen(false)
            toast({
                title: "Product Updated",
                description: `${updatedProduct.name} has been updated.`,
            })
        }
    }

    const handleDeleteProduct = (id) => {
        const updatedProducts = products?.filter((p) => p.id !== id)
        setProducts(updatedProducts)
        toast({
            title: "Product Deleted",
            description: "The product has been removed from the inventory.",
            variant: "destructive",
        })
    }

    useEffect(() => {
        console.log("Products state updated:", products)
    }, [products])

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-white">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
                <div className="flex items-center space-x-2">
                    <Link to="/dashboard">
                        <Button variant="outline" size="icon" className="border-gray-200 hover:bg-gray-100 hover:text-gray-900">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Products</h2>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <div className="relative flex-grow sm:flex-grow-0">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            placeholder="Search products..."
                            className="pl-8 w-full sm:w-[300px] border-gray-200 focus:border-gray-900 bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                        <Button
                            onClick={() => setAddDialogOpen(true)}
                            className="bg-black hover:bg-gray-800 text-white w-full sm:w-auto touch-manipulation"
                        >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Product
                        </Button>
                        <DialogContent className="max-h-[90vh] overflow-y-auto w-[95vw] sm:max-w-[625px] md:max-w-[750px] lg:max-w-[900px] bg-white p-4 sm:p-6">
                            <div className="grid gap-6 py-4">
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                                Product Name <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="name"
                                                placeholder="Enter product name"
                                                value={newProduct.name}
                                                onChange={(e) => {
                                                    const value = e.target.value
                                                    console.log("Name input changed:", value)
                                                    setNewProduct((prev) => ({ ...prev, name: value }))
                                                }}
                                                className="border-gray-200 focus:border-black focus:ring-black"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                                                Category <span className="text-red-500">*</span>
                                            </Label>
                                            <Select
                                                onValueChange={(value) => {
                                                    console.log("Category selected:", value)
                                                    setNewProduct((prev) => ({ ...prev, category: value }))
                                                }}
                                            >
                                                <SelectTrigger className="border-gray-200 focus:border-black focus:ring-black">
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white border border-gray-200">
                                                    {categories?.map((category) => (
                                                        <SelectItem key={category.name} value={category.name}>
                                                            {category.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                                                    Price ($) <span className="text-red-500">*</span>
                                                </Label>
                                                <Input
                                                    id="price"
                                                    type="number"
                                                    placeholder="0.00"
                                                    value={newProduct.price}
                                                    onChange={(e) => {
                                                        const value = Number.parseFloat(e.target.value)
                                                        console.log("Price input changed:", value)
                                                        setNewProduct((prev) => ({ ...prev, price: value }))
                                                    }}
                                                    className="border-gray-200 focus:border-black focus:ring-black"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="stock" className="text-sm font-medium text-gray-700">
                                                    Stock <span className="text-red-500">*</span>
                                                </Label>
                                                <Input
                                                    id="stock"
                                                    type="number"
                                                    placeholder="0"
                                                    value={newProduct.stock}
                                                    onChange={(e) => {
                                                        const value = Number.parseInt(e.target.value)
                                                        console.log("Stock input changed:", value)
                                                        setNewProduct((prev) => ({ ...prev, stock: value }))
                                                    }}
                                                    className="border-gray-200 focus:border-black focus:ring-black"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-gray-700">Product Photos</Label>
                                            <div
                                                {...getAddRootProps()}
                                                className="border-2 border-dashed border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors duration-200 cursor-pointer touch-manipulation"
                                            >
                                                <input {...getAddInputProps()} />
                                                <div className="flex flex-col items-center gap-2 text-center">
                                                    <div className="rounded-full bg-gray-100 p-3">
                                                        <PlusCircle className="h-6 w-6 text-gray-600" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium text-gray-900">Upload product photos</p>
                                                        <p className="text-xs text-gray-500">Drag and drop up to 4 photos, or tap to browse</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {newProduct.photos?.length > 0 && (
                                                <div className="grid grid-cols-2 gap-4 mt-4">
                                                    {newProduct.photos.map((photo, index) => (
                                                        <div key={index} className="relative group">
                                                            <img
                                                                src={photo || "/placeholder.svg"}
                                                                alt={`Product ${index + 1}`}
                                                                className="w-full aspect-square object-cover rounded-lg border-2 border-gray-200"
                                                            />
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault()
                                                                    e.stopPropagation()
                                                                    removePhoto(index)
                                                                }}
                                                                className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50 touch-manipulation"
                                                            >
                                                                <X className="h-4 w-4 text-red-500" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <DialogFooter className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                                <Button
                                    type="button"
                                    onClick={() => {
                                        console.log("Add Product button clicked")
                                        const addedProduct = handleAddProduct()
                                        if (addedProduct) {
                                            setNewProduct({ name: "", category: "", price: 0, stock: 0, photos: [] })
                                        }
                                        // Modal stays open as we're not calling setAddDialogOpen(false)
                                    }}
                                    className="bg-black hover:bg-gray-800 text-white w-full sm:w-auto"
                                >
                                    Add Product
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setAddDialogOpen(false)}
                                    className="border-gray-200 hover:bg-gray-50 w-full sm:w-auto"
                                >
                                    Close
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <Tabs defaultValue="all" className="space-y-4">
                <ScrollArea className="w-full whitespace-nowrap">
                    <TabsList className="border-b border-gray-200 bg-transparent p-0">
                        <TabsTrigger
                            value="all"
                            className="px-4 py-2 text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900"
                        >
                            All Products
                        </TabsTrigger>
                        {categories?.map((category) => (
                            <TabsTrigger
                                key={category._id}
                                value={category?.name?.toLowerCase()}
                                className="px-4 py-2 text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900"
                            >
                                {category?.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>

                <TabsContent value="all" className="space-y-4">
                    <ProductTable products={filteredProducts} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
                    <ProductGrid products={filteredProducts} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
                </TabsContent>
                <TabsContent value="dresses" className="space-y-4">
                    <ProductTable
                        products={filteredProducts?.filter((p) => p.category === "Dresses")}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                    />
                    <ProductGrid
                        products={filteredProducts?.filter((p) => p.category === "Dresses")}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                    />
                </TabsContent>
                <TabsContent value="tops" className="space-y-4">
                    <ProductTable
                        products={filteredProducts?.filter((p) => p.category === "Tops")}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                    />
                    <ProductGrid
                        products={filteredProducts?.filter((p) => p.category === "Tops")}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                    />
                </TabsContent>
                <TabsContent value="bottoms" className="space-y-4">
                    <ProductTable
                        products={filteredProducts?.filter((p) => p.category === "Bottoms")}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                    />
                    <ProductGrid
                        products={filteredProducts?.filter((p) => p.category === "Bottoms")}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                    />
                </TabsContent>
                <TabsContent value="accessories" className="space-y-4">
                    <ProductTable
                        products={filteredProducts?.filter((p) => p.category === "Accessories")}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                    />
                    <ProductGrid
                        products={filteredProducts?.filter((p) => p.category === "Accessories")}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                    />
                </TabsContent>
            </Tabs>
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto w-[95vw] sm:max-w-[625px] md:max-w-[750px] lg:max-w-[900px] bg-white p-4 sm:p-6">
                    {editingProduct && (
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-4">
                                <div className="grid sm:grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-name" className="sm:text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="edit-name"
                                        value={editingProduct.name}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid sm:grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-category" className="sm:text-right">
                                        Category
                                    </Label>
                                    <Select
                                        value={editingProduct.category}
                                        onValueChange={(value) => setEditingProduct({ ...editingProduct, category: value })}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Dresses">Dresses</SelectItem>
                                            <SelectItem value="Tops">Tops</SelectItem>
                                            <SelectItem value="Bottoms">Bottoms</SelectItem>
                                            <SelectItem value="Accessories">Accessories</SelectItem>
                                            <SelectItem value="Shoes">Shoes</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid sm:grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-price" className="sm:text-right">
                                        Price
                                    </Label>
                                    <Input
                                        id="edit-price"
                                        type="number"
                                        value={editingProduct.price}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, price: Number.parseFloat(e.target.value) })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid sm:grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-stock" className="sm:text-right">
                                        Stock
                                    </Label>
                                    <Input
                                        id="edit-stock"
                                        type="number"
                                        value={editingProduct.stock}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number.parseInt(e.target.value) })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">Product Photos</Label>
                                    <div
                                        {...getEditRootProps()}
                                        className="border-2 border-dashed border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors duration-200 cursor-pointer touch-manipulation"
                                    >
                                        <input {...getEditInputProps()} />
                                        <div className="flex flex-col items-center gap-2 text-center">
                                            <div className="rounded-full bg-gray-100 p-3">
                                                <PlusCircle className="h-6 w-6 text-gray-600" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium text-gray-900">Upload product photos</p>
                                                <p className="text-xs text-gray-500">Drag and drop up to 4 photos, or tap to browse</p>
                                            </div>
                                        </div>
                                    </div>
                                    {editingProduct.photos?.length > 0 && (
                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            {editingProduct.photos?.map((photo, index) => (
                                                <div key={index} className="relative group">
                                                    <img
                                                        src={photo || "/placeholder.svg"}
                                                        alt={`Product ${index + 1}`}
                                                        className="w-full aspect-square object-cover rounded-lg border-2 border-gray-200"
                                                    />
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            e.stopPropagation()
                                                            removePhoto(index, "edit")
                                                        }}
                                                        className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50 touch-manipulation"
                                                    >
                                                        <X className="h-4 w-4 text-red-500" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                        <Button
                            type="submit"
                            onClick={handleUpdateProduct}
                            className="bg-black hover:bg-gray-800 text-white w-full sm:w-auto"
                        >
                            Save Changes
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setEditingProduct(null)
                                setEditDialogOpen(false)
                            }}
                            className="border-gray-200 hover:bg-gray-50 hidden sm:inline-flex"
                        >
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

function getStatusClassName(status) {
    switch (status) {
        case "In Stock":
            return "bg-green-50 text-green-700 border-green-200";
        case "Low Stock":
            return "bg-yellow-50 text-yellow-700 border-yellow-200";
        case "Out of Stock":
            return "bg-red-50 text-red-700 border-red-200";
        default:
            return "bg-gray-100 text-gray-800 border-gray-200";
    }
}

export default ProductsPage