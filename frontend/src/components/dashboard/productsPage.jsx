"use client"

import React from "react"

import { useState, useCallback, useEffect } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "../uiDashboard/card.jsx"
import { Input } from "../uiDashboard/input.jsx"
import { Label } from "../ui/label.jsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../uiDashboard/tabs.jsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../uiDashboard/table.jsx"
import { Badge } from "../uiDashboard/badge.jsx"
import { Button } from "../uiDashboard/button.jsx"
import { PlusCircle, Search, Trash2, MoreHorizontal, X, ArrowLeft, Pencil } from "lucide-react"
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
import {
  Sparkles,
  Heart,
  Droplet,
  Scissors,
  Palette,
  Flower,
  Leaf,
  Sun,
  SprayCanIcon as Spray,
  Gem,
  Snowflake,
  Waves,
  Shirt,
  ShoppingBag,
} from "lucide-react"

// Icon names in Arabic with their corresponding Lucide React components
const icons = {
  // Skin Care
  "كريم الوجه": Droplet,
  مرطب: Snowflake,
  منظف: Waves,
  سيروم: Sparkles,

  // Hair Care
  شامبو: Spray,
  بلسم: Waves,
  "تصفيف الشعر": Scissors,
  "صبغة شعر": Palette,

  // Body Care
  "لوشن الجسم": Flower,
  "كريم اليدين": Heart,
  "العناية بالقدم": Leaf,
  "واقي شمس": Sun,

  // Accessories
  مكياج: Gem,
  عطر: Spray,
  ملابس: Shirt,
  إكسسوارات: ShoppingBag,
}

// English to Arabic mapping for reference (not used in code)
const englishToArabic = {
  "Face Cream": "كريم الوجه",
  Moisturizer: "مرطب",
  Cleanser: "منظف",
  Serum: "سيروم",
  Shampoo: "شامبو",
  Conditioner: "بلسم",
  "Hair Styling": "تصفيف الشعر",
  "Hair Color": "صبغة شعر",
  "Body Lotion": "لوشن الجسم",
  "Hand Cream": "كريم اليدين",
  "Foot Care": "العناية بالقدم",
  "Sun Care": "واقي شمس",
  Makeup: "مكياج",
  Fragrance: "عطر",
  Clothing: "ملابس",
  Accessories: "إكسسوارات",
}
const getStatusFromStock = (stock) => {
  if (stock > 10) return "In Stock";
  if (stock > 0) return "Low Stock";
  return "Out of Stock";
};



const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <Card className="h-full bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4">
        <div className="grid gap-2">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product?.mainImage ? (
              // product.photos.map((photo, index) => (
              <img
                // key={index}
                src={product.mainImage.secure_url || "/placeholder.svg"}
                alt={`${product.name} `}
                className="h-20 w-20 rounded-md object-cover border border-gray-200"
              />
            ) : (
              <div className="h-20 w-20 rounded-md bg-gray-100" />
            )}
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              {product.categoryIcon && icons[product.categoryIcon] && (
                <div className="flex items-center gap-1 text-pink-600 mt-1">
                  {React.createElement(icons[product.categoryIcon], { className: "h-4 w-4" })}
                  <span className="text-xs font-medium">{product.categoryIcon}</span>
                </div>
              )}
              <p className="text-sm text-gray-600 mt-1">₪ {product.price.toFixed(2)}</p>
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
                <DropdownMenuItem onClick={() => onEdit(product)} className="text-black hover:bg-gray-100">
                  <Pencil className="mr-2 h-4 w-4 stroke-black" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(product._id)} className="text-red-600 hover:bg-red-50">
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
                <Badge
                  variant="outline"
                  className="bg-pink-50 text-pink-800 border-pink-200 flex items-center gap-1 px-2 py-1"
                >
                  {product.categoryIcon &&
                    icons[product.categoryIcon] &&
                    React.createElement(icons[product.categoryIcon], { className: "h-4 w-4 mr-1" })}
                  {product.category}
                </Badge>
              </TableCell>
              <TableCell>₪ {product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    product.stock > 10
                      ? "default"
                      : product.stock > 0
                        ? "warning"
                        : "destructive"
                  }
                  className={getStatusClassName(
                    product.stock > 10
                      ? "In Stock"
                      : product.stock > 0
                        ? "Low Stock"
                        : "Out of Stock"
                  )}
                >
                  {product.stock > 10
                    ? "In Stock"
                    : product.stock > 0
                      ? "Low Stock"
                      : "Out of Stock"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {/* {product?.photos?.map((photo, index) => (
                                        <img
                                            key={index}
                                            src={photo || "/placeholder.svg"}
                                            alt={`Product ${index + 1}`}
                                            className="h-10 w-10 rounded-md object-cover border border-gray-200"
                                        />
                                    ))} */}
                  {product?.mainImage ? (
                    // product.photos.map((photo, index) => (
                    <img
                      // key={index}
                      src={product.mainImage.secure_url || "/placeholder.svg"}
                      alt={`${product.name} `}
                      className="h-10 w-10 rounded-md object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-md object-cover border border-gray-200" />
                  )}
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
                    <DropdownMenuItem onClick={() => onEdit(product)} className="text-black hover:bg-gray-100">
                      <Pencil className="mr-2 h-4 w-4 stroke-black" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(product._id)} className="text-red-600 hover:bg-red-50">
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
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    categoryIcon: "", // Add this line
    price: 0,
    stock: 0,
    photos: [],
    description: "",
    usage: "",
  })
  const [editingProduct, setEditingProduct] = useState(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedCategoryIcon, setSelectedCategoryIcon] = useState("")

  const fetchData = async () => {
    try {
      // Fetch products from the backend API
      const productResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products?limit=50`)
      setProducts(productResponse.data.products)
    } catch (error) {
      console.error("Error fetching data", error)
    }
  }

  // Fetch products and orders from backend
  useEffect(() => {
    fetchData()
  }, []) // Empty dependency array ensures this runs only once on mount
  const onDrop = useCallback((acceptedFiles, mode = "add") => {
    const newPhotos = acceptedFiles.slice(0, 4).map((file) => URL.createObjectURL(file))

    if (mode === "add") {
      setNewProduct((prev) => ({
        ...prev,
        photos: [...(prev.photos || []), ...newPhotos].slice(0, 4),
      }))
    } else if (mode === "edit") {
      setEditingProduct((prev) => ({
        ...prev,
        photos: [...(prev?.photos || []), ...newPhotos].slice(0, 4),
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
        photos: prev.photos.filter((_, i) => i !== index),
      }))
    } else if (mode === "edit") {
      setEditingProduct((prev) => ({
        ...prev,
        photos: prev.photos.filter((_, i) => i !== index),
      }))
    }
  }

  const filteredProducts = products.filter((product) =>
    product?.name?.toLowerCase().includes(searchTerm?.toLowerCase()),
  )

  const handleAddProduct = async () => {
    try {
      // Validate required fields
      if (!newProduct.name.trim()) throw new Error("Product name is required")
      if (!newProduct.category) throw new Error("Please select a category")
      if (!newProduct.price || newProduct.price <= 0) throw new Error("Please enter a valid price")
      if (newProduct.stock < 0) throw new Error("Stock cannot be negative")

      // Determine product status
      const productStatus = newProduct.stock > 10 ? "In Stock" : newProduct.stock > 0 ? "Low Stock" : "Out of Stock"

      // Convert blob URL to File (if needed)
      const convertBlobToFile = async (blobUrl, filename) => {
        const response = await fetch(blobUrl)
        const blob = await response.blob()
        return new File([blob], filename, { type: blob.type })
      }

      // Ensure photos are File objects
      let mainImage = null
      const subImages = []

      if (newProduct.photos.length > 0) {
        if (typeof newProduct.photos[0] === "string") {
          mainImage = await convertBlobToFile(newProduct.photos[0], "mainImage.jpg")
        } else {
          mainImage = newProduct.photos[0]
        }

        for (let i = 1; i < newProduct.photos.length; i++) {
          if (typeof newProduct.photos[i] === "string") {
            const file = await convertBlobToFile(newProduct.photos[i], `subImage${i}.jpg`)
            subImages.push(file)
          } else {
            subImages.push(newProduct.photos[i])
          }
        }
      }

      // Create FormData
      const formData = new FormData()
      formData.append("name", newProduct.name)
      formData.append("categoryId", newProduct.category)
      formData.append("price", Number(newProduct.price))
      formData.append("stock", Number(newProduct.stock))
      // formData.append("status", productStatus);
      formData.append("description", newProduct.description)
      formData.append("usage", newProduct.usage)
      formData.append("categoryIcon", newProduct.categoryIcon)

      // Append images to FormData
      if (mainImage) formData.append("mainImage", mainImage)
      subImages.forEach((image) => formData.append("subImages", image))
      formData.append("subImages", subImages)
      //console.log([...formData]); // Debugging: Check FormData before sending

      // Send API request with multipart/form-data
      const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      // Update products state
      setProducts((prevProducts) => [...prevProducts, data])

      // Show success message
      toast({
        title: "Success",
        description: `${data.name} has been added successfully.`,
      })

      // Reset form fields
      setNewProduct({
        name: "",
        category: "",
        categoryIcon: "", // Add this line
        price: 0,
        stock: 0,
        photos: [],
        description: "",
        usage: "",
      })
      handleCloseAddDialog()
      fetchData()
      window.location.reload();

    } catch (error) {
      // Show error message
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message,
        variant: "destructive",
      })
    }
  }

  const fetchCategories = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/categories`)
      .then((response) => {
        if (response.data.message === "success") {
          setCategories(response.data.categorise)
        }
      })
      .catch((error) => console.error("Error fetching categories:", error))
  }
  useEffect(() => {
    fetchCategories()
  }, [])

  const handleCategoryChange = async (value) => {
    setSelectedCategory(value)
    setNewProduct((prev) => ({ ...prev, category: value }))
  }

  const handleCategoryIconSelect = (iconName) => {
    setSelectedCategoryIcon(iconName)
  }

  const handleKeyDown = async (event) => {
    if (event.key === "Enter" && !selectedCategory) {
      const newCategory = event.target.value.trim()
      if (!newCategory) return

      try {
        // Get the index of the selected icon or default to 0
        const iconNames = Object.keys(icons)
        const iconIndex = selectedCategoryIcon ? iconNames.indexOf(selectedCategoryIcon) : 0

        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/categories`, {
          name: newCategory,
          index: iconIndex, // Send the icon index to the backend
        })

        if (response.data && response.data._id) {
          const newCatId = response.data._id
          const newCat = { _id: newCatId, name: newCategory, icon: iconIndex }

          // Update categories state
          setCategories((prevCategories) => [...prevCategories, newCat])

          // Set the selected category to the new category
          setSelectedCategory(newCatId)

          // Update the new product's category to the new category ID
          setNewProduct((prev) => ({ ...prev, category: newCatId }))

          // Show success toast
          toast({
            title: "تم إضافة الفئة",
            description: `تم إضافة فئة "${newCategory}" بنجاح`,
          })
        }
      } catch (error) {
        console.error("Error adding category:", error)
        toast({
          title: "خطأ",
          description: "فشل في إضافة الفئة الجديدة",
          variant: "destructive",
        })
      }
    }
  }

  const handleCloseAddDialog = (open) => {
    if (!open) {
      // Only reset the form when explicitly closing the modal
      setNewProduct({
        name: "",
        category: "",
        categoryIcon: "", // Add this line
        price: 0,
        stock: 0,
        photos: [],
        description: "",
        usage: "",
      })
    }
    setAddDialogOpen(open)
  }

  const handleEditProduct = async (product) => {
    try {
      const response = await fetch(`https://api.maysabeauty.store/products/${product._id}`);
      const data = await response.json();

      if (!response.ok || !data.product) {
        throw new Error(data.message || "Failed to fetch product details");
      }

      const fetchedProduct = data.product;

      const photos = [
        ...(fetchedProduct.mainImage?.secure_url ? [fetchedProduct.mainImage.secure_url] : []),
        ...((fetchedProduct.subImages || []).map(img => img.secure_url)),
      ];


      setEditingProduct({
        _id: product._id,
        name: fetchedProduct.name || "",
        price: fetchedProduct.price || 0,
        stock: fetchedProduct.stock || 0,
        description: fetchedProduct.description || "",
        usage: fetchedProduct.usage || "",
        discount: fetchedProduct.discount || 0,
        finalPrice: fetchedProduct.finalPrice || fetchedProduct.price || 0,
        category: fetchedProduct.categoryId?.toString() || "", // ensure it's a string
        categoryIcon: fetchedProduct.categoryIcon || "",
        sizes: fetchedProduct.sizes || [],
        colers: fetchedProduct.colers || [],
        photos,
      });

      setEditDialogOpen(true);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast({
        title: "خطأ في جلب بيانات المنتج",
        description: error.message,
        variant: "destructive",
      });
    }
  };


  const handleUpdateProduct = async () => {
    try {
      const updated = editingProduct;

      // تحقق من الحقول المطلوبة
      if (!updated.name.trim()) throw new Error("Product name is required");
      if (!updated.category) throw new Error("Please select a category");
      if (updated.price == null || updated.price <= 0) throw new Error("Please enter a valid price");
      if (updated.stock < 0) throw new Error("Stock cannot be negative");

      // تحديد حالة المنتج
      const productStatus =
        updated.stock > 10 ? "In Stock" : updated.stock > 0 ? "Low Stock" : "Out of Stock";

      const convertBlobToFile = async (blobUrl, filename) => {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        return new File([blob], filename, { type: blob.type });
      };

      let mainImage = null;
      const subImages = [];

      if (updated.photos && updated.photos.length > 0) {
        const isBlob = typeof updated.photos[0] === "string";
        mainImage = isBlob
          ? await convertBlobToFile(updated.photos[0], "mainImage.jpg")
          : updated.photos[0];

        for (let i = 1; i < updated.photos.length; i++) {
          const isBlob = typeof updated.photos[i] === "string";
          const file = isBlob
            ? await convertBlobToFile(updated.photos[i], `subImage${i}.jpg`)
            : updated.photos[i];
          subImages.push(file);
        }
      }

      // حساب الخصم والسعر النهائي
      const discount = updated.discount || 0;
      const finalPrice = updated.price - (updated.price * discount) / 100;

      // إنشاء FormData
      const formData = new FormData();
      formData.append("name", updated.name);
      formData.append("categoryId", updated.category); // تأكد أن المفتاح هو categoryId
      formData.append("price", Number(updated.price));
      formData.append("stock", Number(updated.stock));
      formData.append("status", productStatus);
      formData.append("description", updated.description || "");
      formData.append("usage", updated.usage || "");
      formData.append("discount", discount);
      formData.append("finalPrice", finalPrice);
      formData.append("categoryIcon", updated.categoryIcon || "");
      formData.append("sizes", JSON.stringify(updated.sizes || []));
      formData.append("colers", JSON.stringify(updated.colers || []));

      if (mainImage) formData.append("mainImage", mainImage);
      subImages.forEach((img) => formData.append("subImages", img));

      // إرسال الطلب للتحديث
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/products/${updated._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // تحديث المنتجات محليًا
      setProducts((prev) => prev.map((p) => (p._id === data.updatedProduct._id ? data.updatedProduct : p)));


      // إغلاق النافذة
      setEditingProduct(null);
      setEditDialogOpen(false);
      window.location.reload();
      toast({
        title: "تم التحديث بنجاح",
        description: `${data.updatedProduct.name} تم تحديثه بنجاح.`,
      });

    } catch (error) {
      toast({
        title: "خطأ",
        description: error.response?.data?.message || error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`)

      if (response.status === 200) {
        const updatedProducts = products.filter((p) => p.id !== id)
        setProducts(updatedProducts)

        toast({
          title: "Product Deleted",
          description: "The product has been removed from the inventory.",
          variant: "destructive",
        })
        window.location.reload();

      } else {
        throw new Error("Failed to delete product")
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      toast({
        title: "Error",
        description: "Failed to delete the product. Please try again.",
        variant: "danger",
      })
    }
  }

  useEffect(() => {
    console.log("Products state updated:", products)
  }, [products])

  // Add this useEffect after the other useEffects
  useEffect(() => {
    // This effect will run whenever the categories array changes
    console.log("Categories updated:", categories)
    // If there are categories and a selected category, find the matching category
    if (categories.length > 0 && selectedCategory) {
      const currentCategory = categories.find((cat) => cat._id === selectedCategory)
      if (currentCategory) {
        console.log("Current selected category:", currentCategory)
      }
    }
  }, [categories, selectedCategory])

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-white">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
        <div className="flex items-center space-x-2">
          <Link to="/dashboard">
            <Button variant="outline" size="icon" className="border-gray-200 hover:bg-gray-100 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">المنتجات</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="البحث عن المنتجات..."
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
              إضافة منتج
            </Button>
            <DialogContent className="max-h-[90vh] overflow-y-auto w-[95vw] sm:max-w-[625px] md:max-w-[750px] lg:max-w-[900px] bg-white p-4 sm:p-6">
              <div className="grid gap-6 py-4">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        اسم المنتج <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="أدخل اسم المنتج"
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
                        الفئة <span className="text-red-500">*</span>
                      </Label>
                      <Select onValueChange={handleCategoryChange}>
                        <SelectTrigger className="border-gray-200 focus:border-black focus:ring-black">
                          <SelectValue placeholder="اختر أو أضف فئة" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200">
                          {categories.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                        <input
                          type="text"
                          placeholder="اكتب واضغط Enter للإضافة"
                          onKeyDown={handleKeyDown}
                          className="mt-2 w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </Select>
                    </div>

                    {/* Add the category icon selection field with Arabic names */}
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="categoryIcon" className="text-sm font-medium text-gray-700">
                        أيقونة الفئة <span className="text-red-500">*</span>
                      </Label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {Object.entries(icons).map(([name, Icon]) => (
                          <div
                            key={name}
                            onClick={() => {
                              setNewProduct((prev) => ({ ...prev, categoryIcon: name }))
                              handleCategoryIconSelect(name)
                            }}
                            className={`flex flex-col items-center justify-center p-3 border rounded-md cursor-pointer transition-all ${newProduct.categoryIcon === name
                              ? "border-pink-500 bg-pink-50 shadow-sm"
                              : "border-gray-200 hover:border-pink-200 hover:bg-pink-50/30"
                              }`}
                          >
                            <Icon
                              className={`h-8 w-8 mb-2 ${newProduct.categoryIcon === name ? "text-pink-500" : "text-gray-600"}`}
                            />
                            <span
                              className={`text-xs text-center ${newProduct.categoryIcon === name ? "font-medium text-pink-700" : "text-gray-600"}`}
                            >
                              {name}
                            </span>
                          </div>
                        ))}
                      </div>
                      {!newProduct.categoryIcon && (
                        <p className="text-xs text-amber-600 mt-1">الرجاء اختيار أيقونة لفئة المنتج</p>
                      )}
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                          السعر (₪) <span className="text-red-500">*</span>
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
                          المخزون <span className="text-red-500">*</span>
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
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                        وصف المنتج
                      </Label>
                      <Input
                        id="description"
                        placeholder="أدخل وصف المنتج"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct((prev) => ({ ...prev, description: e.target.value }))}
                        className="border-gray-200 focus:border-black focus:ring-black"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="usage" className="text-sm font-medium text-gray-700">
                        طريقة الاستخدام
                      </Label>
                      <Input
                        id="usage"
                        placeholder="أدخل تعليمات استخدام المنتج"
                        value={newProduct.usage}
                        onChange={(e) => setNewProduct((prev) => ({ ...prev, usage: e.target.value }))}
                        className="border-gray-200 focus:border-black focus:ring-black"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">صور المنتج</Label>
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
                            <p className="text-sm font-medium text-gray-900">تحميل صور المنتج</p>
                            <p className="text-xs text-gray-500">اسحب وأفلت حتى 4 صور، أو انقر للتصفح</p>
                          </div>
                        </div>
                      </div>
                      {newProduct?.photos?.length > 0 && (
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
                    handleAddProduct()
                    // Modal stays open as we're not calling setAddDialogOpen(false)
                  }}
                  className="bg-black hover:bg-gray-800 text-white w-full sm:w-auto"
                >
                  إضافة منتج
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleCloseAddDialog(false)}
                  className="border-gray-200 hover:bg-gray-50 w-full sm:w-auto"
                >
                  إغلاق
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
              كل المنتجات
            </TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger
                key={category._id}
                value={category._id}
                className="px-4 py-2 text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <TabsContent value="all" className="space-y-4">
          <ProductTable products={filteredProducts} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
          <ProductGrid products={filteredProducts} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category._id} value={category._id} className="space-y-4">
            <ProductTable
              products={filteredProducts.filter((p) => p.category === category.name)}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
            <ProductGrid
              products={filteredProducts.filter((p) => p.category === category.name)}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          </TabsContent>
        ))}
      </Tabs>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto w-[95vw] sm:max-w-[625px] md:max-w-[750px] lg:max-w-[900px] bg-white p-4 sm:p-6">
          {editingProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-4">
                <div className="grid sm:grid-cols-4 items-center gap-4">
                  {console.log(editingProduct, 'mm')
                  }
                  <Label htmlFor="edit-name" className="sm:text-right-black">
                    الاسم
                  </Label>
                  <Input
                    id="edit-name"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-category" className="sm:text-right-black">
                    الفئة
                  </Label>
                  <Select
                    value={editingProduct.category}
                    onValueChange={(value) => setEditingProduct({ ...editingProduct, category: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-price" className="sm:text-right-black">
                    السعر
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
                  <Label htmlFor="edit-stock" className="sm:text-right-black">
                    المخزون
                  </Label>
                  <Input
                    id="edit-stock"
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number.parseInt(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-description" className="sm:text-right-black">
                    الوصف
                  </Label>
                  <Input
                    id="edit-description"
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-usage" className="sm:text-right-black">
                    الاستخدام
                  </Label>
                  <Input
                    id="edit-usage"
                    value={editingProduct.usage}
                    onChange={(e) => setEditingProduct({ ...editingProduct, usage: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">صور المنتج</Label>
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
                        <p className="text-sm font-medium text-gray-900">تحميل صور المنتج</p>
                        <p className="text-xs text-gray-500">اسحب وأفلت حتى 4 صور، أو انقر للتصفح</p>
                      </div>
                    </div>
                  </div>
                  {editingProduct?.photos?.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {editingProduct.photos.map((photo, index) => (
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
              حفظ التغييرات
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
              إلغاء
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
