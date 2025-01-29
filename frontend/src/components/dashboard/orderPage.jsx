import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../uiDashboard/card.jsx"
import { Input } from "../uiDashboard/input.jsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../uiDashboard/table.jsx"
import { Badge } from "../uiDashboard/badge.jsx"
import { Button } from "../uiDashboard/button.jsx"
import { Search, ArrowLeft, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select.jsx"
import { OrderDetails } from "./orderDetails"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx"
import { Label } from "../ui/label.jsx"
import { Checkbox } from "../ui/checkbox.jsx"
import { DatePickerWithRange } from "./dateRangePicker.jsx"
import { addDays } from "date-fns"

const initialOrders = [
    {
        id: "ORD001",
        customer: "Emma Thompson",
        date: "2023-06-15",
        total: 89.97,
        status: "Shipped",
        location: "New York, NY",
        items: [
            { name: "Sparkly Princess Dress", quantity: 1, price: 49.99 },
            { name: "Unicorn Hair Clips", quantity: 2, price: 19.99 },
        ],
    },
    {
        id: "ORD002",
        customer: "Sophia Chen",
        date: "2023-06-14",
        total: 124.5,
        status: "Processing",
        location: "San Francisco, CA",
        items: [
            { name: "Rainbow Tutu Skirt", quantity: 1, price: 34.99 },
            { name: "Glitter Sneakers", quantity: 1, price: 39.99 },
            { name: "Butterfly Wings", quantity: 1, price: 49.52 },
        ],
    },
    {
        id: "ORD003",
        customer: "Olivia Brown",
        date: "2023-06-13",
        total: 75.0,
        status: "Delivered",
        location: "Chicago, IL",
        items: [
            { name: "Unicorn T-Shirt", quantity: 2, price: 24.99 },
            { name: "Magic Wand", quantity: 1, price: 25.02 },
        ],
    },
    {
        id: "ORD004",
        customer: "Ava Singh",
        date: "2023-06-12",
        total: 199.99,
        status: "Shipped",
        location: "Houston, TX",
        items: [
            { name: "Fairy Tale Costume Set", quantity: 1, price: 89.99 },
            { name: "Tiara", quantity: 1, price: 29.99 },
            { name: "Princess Shoes", quantity: 1, price: 80.01 },
        ],
    },
    {
        id: "ORD005",
        customer: "Zoe Patel",
        date: "2023-06-11",
        total: 49.99,
        status: "Processing",
        location: "Miami, FL",
        items: [{ name: "Mermaid Tail Blanket", quantity: 1, price: 49.99 }],
    },
]

const OrdersPage = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [orders, setOrders] = useState(initialOrders)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const [filters, setFilters] = useState({
        status: [],
        dateRange: { from: undefined, to: undefined },
        priceRange: { min: "", max: "" },
    })

    const handleStatusChange = (orderId, newStatus) => {
        setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    }

    const handleViewDetails = (order) => {
        setSelectedOrder(order)
        setIsDetailsOpen(true)
    }

    const handleStatusFilter = (status) => {
        setFilters((prev) => ({
            ...prev,
            status: prev.status.includes(status) ? prev.status.filter((s) => s !== status) : [...prev.status, status],
        }))
    }

    const filteredOrders = orders.filter((order) => {
        // Search filter
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase())

        // Status filter
        const matchesStatus = filters.status.length === 0 || filters.status.includes(order.status)

        // Date range filter
        const orderDate = new Date(order.date)
        const matchesDateRange =
            (!filters.dateRange.from || orderDate >= filters.dateRange.from) &&
            (!filters.dateRange.to || orderDate <= filters.dateRange.to)

        // Price range filter
        const matchesPriceRange =
            (!filters.priceRange.min || order.total >= Number.parseFloat(filters.priceRange.min)) &&
            (!filters.priceRange.max || order.total <= Number.parseFloat(filters.priceRange.max))

        return matchesSearch && matchesStatus && matchesDateRange && matchesPriceRange
    })

    const resetFilters = () => {
        setFilters({
            status: [],
            dateRange: { from: undefined, to: undefined },
            priceRange: { min: "", max: "" },
        })
    }

    return (
        <div className="flex-1 min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
            <div className="container mx-auto p-4 md:p-8 space-y-4">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
                    <div className="flex items-center space-x-2">
                        <Link to="/dashboard">
                            <Button variant="outline" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <h2 className="text-3xl font-bold tracking-tight text-pink-800">Orders</h2>
                    </div>
                    <div className="flex items-center space-x-2 w-full md:w-auto">
                        <div className="relative flex-grow md:flex-grow-0">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search orders..."
                                className="pl-8 w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="icon" className="relative">
                                    <Filter className="h-4 w-4" />
                                    {(filters.status.length > 0 ||
                                        filters.dateRange.from ||
                                        filters.priceRange.min ||
                                        filters.priceRange.max) && (
                                            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-pink-500" />
                                        )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="space-y-4">
                                    <h4 className="font-medium leading-none">Filter Orders</h4>
                                    <div className="space-y-2">
                                        <Label>Status</Label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {["Processing", "Shipped", "Delivered"].map((status) => (
                                                <div key={status} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={status}
                                                        checked={filters.status.includes(status)}
                                                        onCheckedChange={() => handleStatusFilter(status)}
                                                    />
                                                    <Label htmlFor={status}>{status}</Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Date Range</Label>
                                        <DatePickerWithRange
                                            date={filters.dateRange}
                                            onDateChange={(newDate) => setFilters((prev) => ({ ...prev, dateRange: newDate }))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Price Range</Label>
                                        <div className="flex space-x-2">
                                            <Input
                                                type="number"
                                                placeholder="Min"
                                                value={filters.priceRange.min}
                                                onChange={(e) =>
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        priceRange: { ...prev.priceRange, min: e.target.value },
                                                    }))
                                                }
                                            />
                                            <Input
                                                type="number"
                                                placeholder="Max"
                                                value={filters.priceRange.max}
                                                onChange={(e) =>
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        priceRange: { ...prev.priceRange, max: e.target.value },
                                                    }))
                                                }
                                            />
                                        </div>
                                    </div>
                                    <Button variant="outline" className="w-full" onClick={resetFilters}>
                                        Reset Filters
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead className="hidden md:table-cell">Date</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredOrders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell>{order.id}</TableCell>
                                            <TableCell>{order.customer}</TableCell>
                                            <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                                            <TableCell>${order.total.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <Select value={order.status} onValueChange={(value) => handleStatusChange(order.id, value)}>
                                                    <SelectTrigger className="w-[120px]">
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Processing">Processing</SelectItem>
                                                        <SelectItem value="Shipped">Shipped</SelectItem>
                                                        <SelectItem value="Delivered">Delivered</SelectItem>
                                                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="ghost" onClick={() => handleViewDetails(order)}>
                                                    View Details
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
            {selectedOrder && <OrderDetails order={selectedOrder} open={isDetailsOpen} onOpenChange={setIsDetailsOpen} />}
        </div>
    )
}

export default OrdersPage

