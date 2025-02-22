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
    const getStatusStyles = (status) => {
        switch (status) {
            case "Delivered":
                return "bg-emerald-100 text-emerald-800 border-emerald-300"
            case "Shipped":
                return "bg-sky-100 text-sky-800 border-sky-300"
            case "Processing":
                return "bg-amber-100 text-amber-800 border-amber-300"
            case "Cancelled":
                return "bg-rose-100 text-rose-800 border-rose-300"
            default:
                return "bg-gray-100 text-gray-800 border-gray-300"
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="sm:max-w-[525px] w-full max-h-[90vh] bg-white border-2 border-black p-0 overflow-hidden overflow-y-auto">
                <div className="relative">
                    {/* Header section */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 sm:p-6">
                        <AlertDialogHeader className="mb-2">
                            <div className="flex justify-between items-center">
                                <AlertDialogTitle className="text-xl sm:text-2xl font-bold">Order Details</AlertDialogTitle>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onOpenChange(false)}
                                    className="text-white hover:text-gray-200 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                            <AlertDialogDescription className="text-purple-100 mt-2 text-sm sm:text-base">
                                Order ID: {order.id}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                    </div>

                    {/* Content section */}
                    <motion.div
                        className="p-4 sm:p-6 space-y-4 sm:space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Customer Info Section */}
                        <div className="space-y-3 border-b border-gray-200 pb-4">
                            <div className="grid grid-cols-3 items-center gap-2 sm:gap-4">
                                <span className="font-semibold text-gray-600 text-sm sm:text-base">Customer:</span>
                                <span className="col-span-2 font-medium text-sm sm:text-base">{order.customer}</span>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-2 sm:gap-4">
                                <span className="font-semibold text-gray-600 text-sm sm:text-base">Location:</span>
                                <span className="col-span-2 text-sm sm:text-base">{order.location}</span>
                            </div>
                        </div>

                        {/* Order Info Section */}
                        <div className="space-y-3 border-b border-gray-200 pb-4">
                            <div className="grid grid-cols-3 items-center gap-2 sm:gap-4">
                                <span className="font-semibold text-gray-600 text-sm sm:text-base">Date:</span>
                                <span className="col-span-2 text-sm sm:text-base">{order.date}</span>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-2 sm:gap-4">
                                <span className="font-semibold text-gray-600 text-sm sm:text-base">Status:</span>
                                <span className="col-span-2">
                                    <Badge
                                        variant="outline"
                                        className={`
                      text-xs sm:text-sm font-medium px-2 py-1 rounded-full
                      ${getStatusStyles(order.status)}
                    `}
                                    >
                                        {order.status}
                                    </Badge>
                                </span>
                            </div>
                        </div>

                        {/* Items Section */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-base sm:text-lg border-b border-gray-200 pb-2">Order Items</h3>
                            <div className="space-y-3">
                                {order.items.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex justify-between items-center p-2 sm:p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <div className="flex-1">
                                            <p className="font-medium text-sm sm:text-base">{item.name}</p>
                                            <p className="text-xs sm:text-sm text-gray-500">Quantity: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-sm sm:text-base">${item.price.toFixed(2)}</p>
                                            <p className="text-xs sm:text-sm text-gray-500">
                                                Total: ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Total Section */}
                        <div className="border-t border-gray-200 pt-4 mt-4 sm:mt-6">
                            <div className="flex justify-between items-center">
                                <span className="text-base sm:text-lg font-semibold">Total Amount:</span>
                                <span className="text-xl sm:text-2xl font-bold text-purple-600">${order.total.toFixed(2)}</span>
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

