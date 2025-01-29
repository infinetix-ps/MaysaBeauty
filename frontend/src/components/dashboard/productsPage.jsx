import React, { useState, useCallback } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../uiDashboard/card.jsx"
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
        <Card className="h-full">
            <CardContent className="p-4">
                <div className="grid gap-2">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {product.photos.length > 0 ? (
                            product.photos.map((photo, index) => (
                                <img
                                    key={index}
                                    src={photo || "/placeholder.svg"}
                                    alt={`${product.name} ${index + 1}`}
                                    className="h-20 w-20 rounded-md object-cover"
                                />
                            ))
                        ) : (
                            <div className="h-20 w-20 rounded-md bg-muted" />
                        )}
                    </div>
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => onEdit(product)}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onDelete(product.id)} className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline">{product.category}</Badge>
                        <Badge
                            variant={
                                product.status === "In Stock" ? "default" : product.status === "Low Stock" ? "warning" : "destructive"
                            }
                            className={product.status === "Low Stock" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80" : ""}
                        >
                            {product.status}
                        </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
                </div>
            </CardContent>
        </Card>
    )
}

const ProductTable = ({ products, onEdit, onDelete }) => {
    return (
        <div className="hidden md:block">
            <Card>
                <CardHeader>
                    <CardTitle>Products</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Photos</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{product.category}</Badge>
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
                                            className={
                                                product.status === "Low Stock" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80" : ""
                                            }
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
                                                    className="h-10 w-10 rounded-md object-cover"
                                                />
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => onEdit(product)}>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => onDelete(product.id)} className="text-red-600">
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
                </CardContent>
            </Card>
        </div>
    )
}

const ProductGrid = ({ products, onEdit, onDelete }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:hidden">
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

    const handleEditProductOld = () => {
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
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Link to="/dashboard">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h2 className="text-3xl font-bold tracking-tight">Products</h2>
                </div>
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search products..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full md:w-auto">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Product
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[625px]">
                            <DialogHeader>
                                <DialogTitle>Add New Product</DialogTitle>
                                <DialogDescription>
                                    Enter the details of the new product here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        value={newProduct.name}
                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="category" className="text-right">
                                        Category
                                    </Label>
                                    <Select onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select a category" />
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
                                    <Label htmlFor="price" className="text-right">
                                        Price
                                    </Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={newProduct.price}
                                        onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="stock" className="text-right">
                                        Stock
                                    </Label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        value={newProduct.stock}
                                        onChange={(e) => setNewProduct({ ...newProduct, stock: Number.parseInt(e.target.value) })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Photos</Label>
                                    <div className="col-span-3">
                                        <div
                                            {...getRootProps()}
                                            className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer"
                                        >
                                            <input {...getInputProps()} />
                                            {isDragActive ? (
                                                <p>Drop the files here ...</p>
                                            ) : (
                                                <p>Drag 'n' drop up to 4 product photos here, or click to select files</p>
                                            )}
                                        </div>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {newProduct.photos.map((photo, index) => (
                                                <div key={index} className="relative">
                                                    <img
                                                        src={photo || "/placeholder.svg"}
                                                        alt={`Product ${index + 1}`}
                                                        className="w-20 h-20 object-cover rounded"
                                                    />
                                                    <button
                                                        onClick={() => removePhoto(index)}
                                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={handleAddProduct} className="w-full md:w-auto">
                                    Save Product
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <Tabs defaultValue="all" className="space-y-4">
                <ScrollArea className="w-full whitespace-nowrap">
                    <TabsList>
                        <TabsTrigger value="all">All Products</TabsTrigger>
                        <TabsTrigger value="dresses">Dresses</TabsTrigger>
                        <TabsTrigger value="tops">Tops</TabsTrigger>
                        <TabsTrigger value="bottoms">Bottoms</TabsTrigger>
                        <TabsTrigger value="accessories">Accessories</TabsTrigger>
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
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription>Make changes to the product here. Click save when you're done.</DialogDescription>
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
                        <Button type="submit" onClick={handleEditProductOld}>
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ProductsPage

