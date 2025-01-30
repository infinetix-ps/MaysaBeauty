import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../uiDashboard/card.jsx"
import { Input } from "../uiDashboard/input.jsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../uiDashboard/table.jsx"
import { Badge } from "../uiDashboard/badge.jsx"
import { Button } from "../uiDashboard/button.jsx"
import { Search, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select.jsx"
import { OrderDetails } from "./orderDetails"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx"
import { Label } from "../ui/label.jsx"
import { DatePickerWithRange } from "./dateRangePicker.jsx"
import { motion } from "framer-motion"
import { MainNav } from "./mainNav"
import { UserNav } from "./userNav"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Menu } from "lucide-react"

const initialOrders = [
    { id: 1, customer: "John Doe", status: "Pending", date: "2024-03-08", total: 100 },
    { id: 2, customer: "Jane Smith", status: "Shipped", date: "2024-03-09", total: 200 },
    { id: 3, customer: "Peter Jones", status: "Delivered", date: "2024-03-10", total: 150 },
]

const OrdersPage = () => {
    const [orders, setOrders] = useState(initialOrders)
    const [searchTerm, setSearchTerm] = useState("")
    const [filters, setFilters] = useState({
        status: [],
        dateRange: { from: null, to: null },
        priceRange: { min: null, max: null },
    })
    const [selectedOrder, setSelectedOrder] = useState(null)

    const filteredOrders = orders.filter((order) => {
        const statusMatch = filters.status.length === 0 || filters.status.includes(order.status)
        const dateMatch = !filters.dateRange.from || order.date >= filters.dateRange.from
        const priceMatch =
            (!filters.priceRange.min || order.total >= filters.priceRange.min) &&
            (!filters.priceRange.max || order.total <= filters.priceRange.max)
        return order.customer.toLowerCase().includes(searchTerm.toLowerCase()) && statusMatch && dateMatch && priceMatch
    })

    const handleFilterChange = (filterType, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: value,
        }))
    }

    const handleOrderSelect = (order) => {
        setSelectedOrder(order)
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
            {/* Dashboard Header */}
            <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
                <div className="container flex h-16 items-center justify-between px-4">
                    {/* Mobile menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-md">
                                <Menu className="h-5 w-5" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[80%] sm:w-[350px] bg-white">
                            <div className="py-4">
                                <MainNav className="flex flex-col space-y-4" />
                            </div>
                        </SheetContent>
                    </Sheet>

                    {/* Desktop navigation */}
                    <MainNav className="hidden lg:flex mx-6" />

                    <div className="flex items-center space-x-4">
                        <Search />
                        <UserNav />
                    </div>
                </div>
            </header>

            {/* Main Content with margin */}
            <div className="container mx-auto p-4 md:p-8 mt-6">
                <motion.div
                    className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 mb-6"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold tracking-tight text-pink-800">Orders</h2>
                    <div className="flex items-center space-x-2 w-full md:w-auto">
                        <div className="relative flex-grow md:flex-grow-0">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search orders..."
                                className="pl-8 w-full bg-white border-pink-200 focus:border-pink-400"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="icon" className="bg-white hover:bg-pink-100 relative">
                                    <Filter className="h-4 w-4" />
                                    {(filters.status.length > 0 ||
                                        filters.dateRange.from ||
                                        filters.priceRange.min ||
                                        filters.priceRange.max) && (
                                            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-pink-500" />
                                        )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="p-4 space-y-4">
                                    <div>
                                        <Label htmlFor="status">Status</Label>
                                        <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={[]}>All</SelectItem>
                                                <SelectItem value={["Pending"]}>Pending</SelectItem>
                                                <SelectItem value={["Shipped"]}>Shipped</SelectItem>
                                                <SelectItem value={["Delivered"]}>Delivered</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="dateRange">Date Range</Label>
                                        <DatePickerWithRange onChange={(value) => handleFilterChange("dateRange", value)} />
                                    </div>
                                    <div>
                                        <Label htmlFor="priceRange">Price Range</Label>
                                        <div className="flex space-x-2">
                                            <Input
                                                type="number"
                                                placeholder="Min"
                                                className="w-20"
                                                onChange={(e) =>
                                                    handleFilterChange("priceRange", {
                                                        ...filters.priceRange,
                                                        min: Number.parseInt(e.target.value, 10) || null,
                                                    })
                                                }
                                            />
                                            <Input
                                                type="number"
                                                placeholder="Max"
                                                className="w-20"
                                                onChange={(e) =>
                                                    handleFilterChange("priceRange", {
                                                        ...filters.priceRange,
                                                        max: Number.parseInt(e.target.value, 10) || null,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <Button className="w-full">Apply Filters</Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card className="bg-white shadow-lg">
                        <CardHeader>
                            <CardTitle>Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableHeader>Customer</TableHeader>
                                        <TableHeader>Status</TableHeader>
                                        <TableHeader>Date</TableHeader>
                                        <TableHeader>Total</TableHeader>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredOrders.map((order) => (
                                        <TableRow key={order.id} onClick={() => handleOrderSelect(order)}>
                                            <TableCell>{order.customer}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        order.status === "Pending"
                                                            ? "secondary"
                                                            : order.status === "Shipped"
                                                                ? "primary"
                                                                : "success"
                                                    }
                                                >
                                                    {order.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{order.date}</TableCell>
                                            <TableCell>${order.total}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
            <OrderDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />
        </div>
    )
}

export default OrdersPage

