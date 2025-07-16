import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../uiDashboard/card.jsx"
import { Input } from "../uiDashboard/input.jsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../uiDashboard/table.jsx"
import { Button } from "../uiDashboard/button.jsx"
import { Search, ArrowLeft, Filter } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx"
import { Label } from "../ui/label.jsx"
import { Checkbox } from "../ui/checkbox.jsx"
import { motion } from "framer-motion"

// Simple DateRangePicker placeholder (replace with your actual component)
const CalendarDateRangePicker = ({ date, onSelect }) => {
  const handleChangeFrom = (e) => {
    onSelect({ from: e.target.value ? new Date(e.target.value) : undefined, to: date.to })
  }
  const handleChangeTo = (e) => {
    onSelect({ from: date.from, to: e.target.value ? new Date(e.target.value) : undefined })
  }
  return (
    <div className="flex space-x-2">
      <input type="date" onChange={handleChangeFrom} className="border rounded px-2 py-1" />
      <input type="date" onChange={handleChangeTo} className="border rounded px-2 py-1" />
    </div>
  )
}

// Custom Select for OrderDetails
const Select = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring focus:border-blue-500"
  >
    {options.map((opt) => (
      <option key={opt} value={opt}>
        {opt}
      </option>
    ))}
  </select>
)

const OrderDetails = ({ order, open, onOpenChange, onStatusChange }) => {
  if (!open) return null

  const statusOptions = ["pending", "Processing", "Shipped", "Delivered", "Cancelled"]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50 overflow-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full p-8 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded px-3 py-1"
          >
            Close
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p>
              <span className="font-semibold">Order ID:</span> {order._id}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {order.email || "Guest"}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {order.phone || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {order.address}
            </p>
            <p>
              <span className="font-semibold">Payment Type:</span> {order.paymentType}
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Created At:</span> {new Date(order.createdAt).toLocaleString()}
            </p>
            <p className="flex items-center space-x-2">
              <span className="font-semibold">Status:</span>
              <Select
                value={order.status}
                onChange={(newStatus) => onStatusChange(order._id, newStatus)}
                options={statusOptions}
              />
            </p>
            <p>
              <span className="font-semibold">Total Price:</span> ₪ {order.finalPrice.toFixed(2)}
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-4 border-b pb-2">Products</h3>
        {order.products && order.products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-96 overflow-auto">
            {order.products.map((item) => (
              <div
                key={item._id || item.productId?._id}
                className="border rounded-lg p-4 flex space-x-4 items-center shadow-sm hover:shadow-md transition"
              >
                {item.productId?.mainImage?.secure_url ? (
                  <img
                    src={item.productId.mainImage.secure_url}
                    alt={item.productId.name}
                    className="h-20 w-20 object-cover rounded"
                  />
                ) : (
                  <div className="h-20 w-20 bg-gray-200 flex items-center justify-center rounded text-gray-400">
                    No Image
                  </div>
                )}
                <div>
                  <p className="font-semibold">{item.productId?.name || "Unknown product"}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Unit Price: ₪ {item.unitPrice}</p>
                  <p>Final Price: ₪ {item.finalPrice}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No products in this order.</p>
        )}
      </div>
    </div>
  )
}

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // Filters state
  const [filters, setFilters] = useState({
    status: [],
    dateRange: { from: undefined, to: undefined },
    priceRange: { min: "", max: "" },
  })

  // Load statuses from localStorage
  const loadStatuses = () => {
    try {
      return JSON.parse(localStorage.getItem("orderStatuses") || "{}")
    } catch {
      return {}
    }
  }

  const [localStatuses, setLocalStatuses] = useState(loadStatuses())

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://api.maysabeauty.store/order")
        const fetchedOrders = res.data.map((order) => {
          // Override status if saved in localStorage
          const statusFromStorage = localStatuses[order._id]
          return {
            id: order._id,
            customer: order.email || "Guest",
            total: order.finalPrice,
            status: statusFromStorage || order.status,
            date: new Date(order.createdAt).toLocaleDateString(),
            raw: { ...order, status: statusFromStorage || order.status },
          }
        })
        setOrders(fetchedOrders)
      } catch (err) {
        console.error("Failed to fetch orders:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [localStatuses])

  // Handle status change (local state + localStorage)
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Send PATCH request to backend
      await axios.patch(`https://api.maysabeauty.store/order/${orderId}/status`, {
        status: newStatus,
      });

      // Update UI
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? {
              ...order,
              status: newStatus,
              raw: { ...order.raw, status: newStatus },
            }
            : order
        )
      );

      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
      }

      // Save to localStorage
      setLocalStatuses((prev) => {
        const updated = { ...prev, [orderId]: newStatus };
        localStorage.setItem('orderStatuses', JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      console.error('Failed to update order status:', err);
      alert('Failed to update status. Please try again.');
    }
  };


  const handleViewDetails = (order) => {
    if (order.raw) {
      setSelectedOrder(order.raw)
      setIsDetailsOpen(true)
    }
  }

  // Filter handlers
  const handleStatusFilter = (status) => {
    setFilters((prev) => ({
      ...prev,
      status: prev.status.includes(status) ? prev.status.filter((s) => s !== status) : [...prev.status, status],
    }))
  }

  const resetFilters = () => {
    setFilters({
      status: [],
      dateRange: { from: undefined, to: undefined },
      priceRange: { min: "", max: "" },
    })
  }

  // Filtering logic
  const filteredOrders = orders.filter((order) => {
    // Search filter
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())

    // Status filter
    const matchesStatus = filters.status.length === 0 || filters.status.includes(order.status)

    // Date range filter
    const orderDate = new Date(order.raw.createdAt)
    const matchesDateRange =
      (!filters.dateRange.from || orderDate >= filters.dateRange.from) &&
      (!filters.dateRange.to || orderDate <= filters.dateRange.to)

    // Price range filter
    const matchesPriceRange =
      (!filters.priceRange.min || order.total >= Number.parseFloat(filters.priceRange.min)) &&
      (!filters.priceRange.max || order.total <= Number.parseFloat(filters.priceRange.max))

    return matchesSearch && matchesStatus && matchesDateRange && matchesPriceRange
  })

  return (
    <motion.div className="flex-1 min-h-screen bg-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="container mx-auto p-4 md:p-8 space-y-4">
        {/* Header + Search + Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Link to="/dashboard">
              <Button variant="outline" size="icon" className="bg-white hover:bg-gray-100">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h2 className="text-3xl font-bold tracking-tight text-black">Orders</h2>
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0 max-w-md w-full">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-10 w-full bg-white border-2 border-black focus:border-gray-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white hover:bg-gray-200 border-2 border-black relative"
                >
                  <Filter className="h-4 w-4" />
                  {(filters.status.length > 0 ||
                    filters.dateRange.from ||
                    filters.priceRange.min ||
                    filters.priceRange.max) && (
                      <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-black" />
                    )}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-80 bg-white">
                <div className="space-y-4">
                  <h4 className="font-medium leading-none">Filter Orders</h4>

                  <div className="space-y-2">
                    <Label>Status</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {["pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
                        <div key={status} className="flex items-center space-x-2">
                          <Checkbox
                            id={status}
                            checked={filters.status.includes(status)}
                            onCheckedChange={() => handleStatusFilter(status)}
                          />
                          <Label htmlFor={status} className="capitalize">
                            {status}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <CalendarDateRangePicker
                      date={filters.dateRange}
                      onSelect={(newDate) => setFilters((prev) => ({ ...prev, dateRange: newDate }))}
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

        {/* Orders Table */}
        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading orders...</p>
        ) : (
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-2xl font-bold text-black">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table className="border-2 border-black">
                  <TableHeader>
                    <TableRow className="bg-black border-none">
                      <TableHead className="text-white font-medium h-12 border-none">Order ID</TableHead>
                      <TableHead className="text-white font-medium h-12 border-none">Customer</TableHead>
                      <TableHead className="text-white font-medium h-12 border-none hidden md:table-cell">Date</TableHead>
                      <TableHead className="text-white font-medium h-12 border-none">Total</TableHead>
                      <TableHead className="text-white font-medium h-12 border-none">Status</TableHead>
                      <TableHead className="text-white font-medium h-12 border-none">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order, index) => (
                      <TableRow key={order.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                        <TableCell>₪ {order.total.toFixed(2)}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            onClick={() => handleViewDetails(order)}
                            className="border border-black hover:bg-black hover:text-white"
                          >
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
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          onStatusChange={handleStatusChange}
        />
      )}
    </motion.div>
  )
}

export default OrdersPage
