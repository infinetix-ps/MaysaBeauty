import { useState, useCallback } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "../uiDashboard/card.jsx"
import { Input } from "../uiDashboard/input.jsx"
import { Label } from "../ui/label.jsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../uiDashboard/tabs.jsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../uiDashboard/table.jsx"
import { Badge } from "../uiDashboard/badge.jsx"
import { Button } from "../uiDashboard/button.jsx"
import { PlusCircle, Search, Pencil, Trash2, MoreHorizontal, X, ArrowLeft } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog.jsx"
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

const initialProducts = [
    {
        id: 1,
        name: "Sparkly Princess Dress",
        category: "Dresses",
        price: 49.99,
        stock: 50,
        status: "In Stock",
        photos: [],
    },
    { id: 2, name: "Unicorn T-Shirt", category: "Tops", price: 24.99, stock: 5, status: "Low Stock", photos: [] },
    {
        id: 3,
        name: "Rainbow Tutu Skirt",
        category: "Bottoms",
        price: 34.99,
        stock: 0,
        status: "Out of Stock",
        photos: [],
    },
    {
        id: 4,
        name: "Butterfly Hair Clips Set",
        category: "Accessories",
        price: 12.99,
        stock: 200,
        status: "In Stock",
        photos: [],
    },
    { id: 5, name: "Glitter Sneakers", category: "Shoes", price: 39.99, stock: 8, status: "Low Stock", photos: [] },
]

const ProductCard = ({ product, onEdit, onDelete }) => {
    return (
        <Card className="h-full bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4">
                <div className="grid gap-2">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {product.photos.length > 0 ? (
                            product.photos.map((photo, index) => (
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
                    {products.map((product) => (
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
                                    {product.photos.map((photo, index) => (
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
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    )
}

const ProductsPage = () => {
    const [products, setProducts] = useState(initialProducts)
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

    const onDrop = useCallback((acceptedFiles) => {
        const newPhotos = acceptedFiles.slice(0, 4).map((file) => URL.createObjectURL(file))
        setNewProduct((prev) => ({
            ...prev,
            photos: [...prev.photos, ...newPhotos].slice(0, 4),
        }))
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".png", ".jpg", ".gif"],
        },
        maxFiles: 4,
    })

    const removePhoto = (index) => {
        setNewProduct((prev) => ({
            ...prev,
            photos: prev.photos.filter((_, i) => i !== index),
        }))
    }

    const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const handleAddProduct = () => {
        const productStatus = newProduct.stock > 10 ? "In Stock" : newProduct.stock > 0 ? "Low Stock" : "Out of Stock"
        const product = {
            ...newProduct,
            id: products.length + 1,
            status: productStatus,
        }
        setProducts([...products, product])
        setNewProduct({ name: "", category: "", price: 0, stock: 0, photos: [] })
        toast({
            title: "Product Added",
            description: `${product.name} has been added to the inventory.`,
        })
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
        const updatedProducts = products.filter((p) => p.id !== id)
        setProducts(updatedProducts)
        toast({
            title: "Product Deleted",
            description: "The product has been removed from the inventory.",
            variant: "destructive",
        })
    }

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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-black hover:bg-gray-800 text-white w-full sm:w-auto">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Product
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl bg-white border-2 border-gray-200">
                            <DialogHeader className="border-b border-gray-200 pb-4">
                                <DialogTitle className="text-2xl font-bold tracking-tight text-black">Add New Product</DialogTitle>
                                <DialogDescription className="text-base text-gray-600">
                                    Fill in the product details below. All fields marked with <span className="text-red-500">*</span> are
                                    required.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-6 py-4">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                                Product Name <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="name"
                                                placeholder="Enter product name"
                                                value={newProduct.name}
                                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                                className="border-gray-200 focus:border-black focus:ring-black"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                                                Category <span className="text-red-500">*</span>
                                            </Label>
                                            <Select onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}>
                                                <SelectTrigger className="border-gray-200 focus:border-black focus:ring-black">
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white border border-gray-200">
                                                    <SelectItem value="Dresses" className="text-gray-700 hover:bg-gray-100">
                                                        Dresses
                                                    </SelectItem>
                                                    <SelectItem value="Tops" className="text-gray-700 hover:bg-gray-100">
                                                        Tops
                                                    </SelectItem>
                                                    <SelectItem value="Bottoms" className="text-gray-700 hover:bg-gray-100">
                                                        Bottoms
                                                    </SelectItem>
                                                    <SelectItem value="Accessories" className="text-gray-700 hover:bg-gray-100">
                                                        Accessories
                                                    </SelectItem>
                                                    <SelectItem value="Shoes" className="text-gray-700 hover:bg-gray-100">
                                                        Shoes
                                                    </SelectItem>
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
                                                    onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) })}
                                                    className="border-gray-200 focus:border-black focus:ring-black"
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
                                                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number.parseInt(e.target.value) })}
                                                    className="border-gray-200 focus:border-black focus:ring-black"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-gray-700">Product Photos</Label>
                                            <div
                                                {...getRootProps()}
                                                className="border-2 border-dashed border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                                            >
                                                <input {...getInputProps()} />
                                                <div className="flex flex-col items-center gap-2 text-center">
                                                    <div className="rounded-full bg-gray-100 p-3">
                                                        <PlusCircle className="h-6 w-6 text-gray-600" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium text-gray-900">Upload product photos</p>
                                                        <p className="text-xs text-gray-500">Drag and drop up to 4 photos, or click to browse</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {newProduct.photos.length > 0 && (
                                                <div className="grid grid-cols-2 gap-4 mt-4">
                                                    {newProduct.photos.map((photo, index) => (
                                                        <div key={index} className="relative group">
                                                            <img
                                                                src={photo || "/placeholder.svg"}
                                                                alt={`Product ${index + 1}`}
                                                                className="w-full aspect-square object-cover rounded-lg border-2 border-gray-200"
                                                            />
                                                            <button
                                                                onClick={() => removePhoto(index)}
                                                                className="absolute top-2 right-2 p-1 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50"
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
                            <DialogFooter className="border-t border-gray-200 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setNewProduct({ name: "", category: "", price: 0, stock: 0, photos: [] })
                                        document.querySelector('[role="dialog"]')?.closest("button")?.click()
                                    }}
                                    className="border-gray-200 hover:bg-gray-50"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" onClick={handleAddProduct} className="bg-black hover:bg-gray-800 text-white ml-2">
                                    Save Product
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
                        <TabsTrigger
                            value="dresses"
                            className="px-4 py-2 text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900"
                        >
                            Dresses
                        </TabsTrigger>
                        <TabsTrigger
                            value="tops"
                            className="px-4 py-2 text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900"
                        >
                            Tops
                        </TabsTrigger>
                        <TabsTrigger
                            value="bottoms"
                            className="px-4 py-2 text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900"
                        >
                            Bottoms
                        </TabsTrigger>
                        <TabsTrigger
                            value="accessories"
                            className="px-4 py-2 text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900"
                        >
                            Accessories
                        </TabsTrigger>
                    </TabsList>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>

                <TabsContent value="all" className="space-y-4">
                    <ProductTable products={filteredProducts} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
                    <ProductGrid products={filteredProducts} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
                </TabsContent>
                <TabsContent value="dresses" className="space-y-4">
                    <ProductTable
                        products={filteredProducts.filter((p) => p.category === "Dresses")}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                    />
                    <ProductGrid
                        products={filteredProducts.filter((p) => p.category === "Dresses")}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                    />
                </TabsContent>
                <TabsContent value="tops" className="space-y-4">
                    <ProductTable
                        products={filteredProducts.filter((p) => p.category === "Tops")}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                    />
                    <ProductGrid
                        products={filteredProducts.filter((p) => p.category === "Tops")}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                    />
                </TabsContent>
                <TabsContent value="bottoms" className="space-y-4">
                    <ProductTable
                        products={filteredProducts.filter((p) => p.category === "Bottoms")}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                    />
                    <ProductGrid
                        products={filteredProducts.filter((p) => p.category === "Bottoms")}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                    />
                </TabsContent>
                <TabsContent value="accessories" className="space-y-4">
                    <ProductTable
                        products={filteredProducts.filter((p) => p.category === "Accessories")}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                    />
                    <ProductGrid
                        products={filteredProducts.filter((p) => p.category === "Accessories")}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                    />
                </TabsContent>
            </Tabs>
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[625px] bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-black">Edit Product</DialogTitle>
                        <DialogDescription className="text-gray-500">
                            Make changes to the product here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    {editingProduct && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="edit-name"
                                    value={editingProduct.name}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-category" className="text-right">
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
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-price" className="text-right">
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
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-stock" className="text-right">
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
                        </div>
                    )}
                    <DialogFooter>
                        <Button type="submit" onClick={handleUpdateProduct} className="bg-black hover:bg-gray-800 text-white">
                            Save Changes
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
            return "bg-green-50 text-green-700 border-green-200"
        case "Low Stock":
            return "bg-yellow-50 text-yellow-700 border-yellow-200"
        case "Out of Stock":
            return "bg-red-50 text-red-700 border-red-200"
        default:
            return "bg-gray-100 text-gray-800 border-gray-200"
    }
}

export default ProductsPage

