import PropTypes from "prop-types"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alertDialog.jsx"
import { Badge } from "../ui/badge.jsx"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "../ui/button.jsx"

export function OrderDetails({ order, open, onOpenChange }) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="sm:max-w-[525px] bg-white border-2 border-black p-0 overflow-hidden">
                <div className="relative">
                    {/* Black header section */}
                    <div className="bg-black text-white p-6">
                        <AlertDialogHeader className="mb-2">
                            <div className="flex justify-between items-center">
                                <AlertDialogTitle className="text-2xl font-bold">Order Details</AlertDialogTitle>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onOpenChange(false)}
                                    className="text-white hover:text-gray-200 hover:bg-gray-800 rounded-full"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                            <AlertDialogDescription className="text-gray-300 mt-2">Order ID: {order.id}</AlertDialogDescription>
                        </AlertDialogHeader>
                    </div>

                    {/* Content section */}
                    <motion.div
                        className="p-6 space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Customer Info Section */}
                        <div className="space-y-4 border-b border-gray-200 pb-4">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <span className="font-semibold text-gray-600">Customer:</span>
                                <span className="col-span-2 font-medium">{order.customer}</span>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <span className="font-semibold text-gray-600">Location:</span>
                                <span className="col-span-2">{order.location}</span>
                            </div>
                        </div>

                        {/* Order Info Section */}
                        <div className="space-y-4 border-b border-gray-200 pb-4">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <span className="font-semibold text-gray-600">Date:</span>
                                <span className="col-span-2">{order.date}</span>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <span className="font-semibold text-gray-600">Status:</span>
                                <span className="col-span-2">
                                    <Badge
                                        variant="outline"
                                        className={`
                                            ${order.status === "Delivered" ? "border-green-500 text-green-500" : ""}
                                            ${order.status === "Shipped" ? "border-blue-500 text-blue-500" : ""}
                                            ${order.status === "Processing" ? "border-orange-500 text-orange-500" : ""}
                                            ${order.status === "Cancelled" ? "border-red-500 text-red-500" : ""}
                                        `}
                                    >
                                        {order.status}
                                    </Badge>
                                </span>
                            </div>
                        </div>

                        {/* Items Section */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg border-b border-gray-200 pb-2">Order Items</h3>
                            <div className="space-y-4">
                                {order.items.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <div className="flex-1">
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">${item.price.toFixed(2)}</p>
                                            <p className="text-sm text-gray-500">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Total Section */}
                        <div className="border-t border-gray-200 pt-4 mt-6">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold">Total Amount:</span>
                                <span className="text-2xl font-bold">${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

OrderDetails.propTypes = {
    order: PropTypes.shape({
        id: PropTypes.string.isRequired,
        customer: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                quantity: PropTypes.number.isRequired,
                price: PropTypes.number.isRequired,
            }),
        ).isRequired,
    }).isRequired,
    open: PropTypes.bool.isRequired,
    onOpenChange: PropTypes.func.isRequired,
}

export default OrderDetails

