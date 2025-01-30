import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx"
import { Input } from "../components/ui/input.jsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.jsx"
import { Button } from "../components/ui/button.jsx"
import { Search, ArrowLeft, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select.jsx"
import { OrderDetails } from "../components/dashboard/orderDetails.jsx"

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
    // ... (other order objects)
]

function OrdersPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [orders, setOrders] = useState(initialOrders)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)

    const filteredOrders = orders.filter(
        (order) =>
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleStatusChange = (orderId, newStatus) => {
        setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    }

    const handleViewDetails = (order) => {
        setSelectedOrder(order)
        setIsDetailsOpen(true)
    }

    return (
        <div className="flex-1 min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
            <div className="container mx-auto p-4 md:p-8 space-y-4">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
                    <div className="flex items-center space-x-2">
                        <a href="/dashboard">
                            <Button variant="outline" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </a>
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
                        <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                        </Button>
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

