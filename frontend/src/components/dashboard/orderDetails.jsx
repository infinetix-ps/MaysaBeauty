import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../uiDashboard/alertDialog.jsx"
import { Badge } from "../uiDashboard/badge.jsx"
import { motion } from "framer-motion"

export const OrderDetails = ({ order, open, onOpenChange }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-pink-50 to-purple-50">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-pink-800">Order Details</DialogTitle>
                    <DialogDescription className="text-purple-600">Order ID: {order.id}</DialogDescription>
                </DialogHeader>
                <motion.div
                    className="grid gap-4 py-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold text-pink-700">Customer:</span>
                        <span className="col-span-3 text-purple-800">{order.customer}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold text-pink-700">Date:</span>
                        <span className="col-span-3 text-purple-800">{order.date}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold text-pink-700">Total:</span>
                        <span className="col-span-3 text-purple-800">${order.total.toFixed(2)}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold text-pink-700">Status:</span>
                        <span className="col-span-3">
                            <Badge
                                variant={
                                    order.status === "Delivered" ? "default" : order.status === "Shipped" ? "secondary" : "outline"
                                }
                                className="bg-gradient-to-r from-pink-400 to-purple-400 text-white"
                            >
                                {order.status}
                            </Badge>
                        </span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold text-pink-700">Location:</span>
                        <span className="col-span-3 text-purple-800">{order.location}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold text-pink-700 col-span-4">Items:</span>
                        <ul className="col-span-4 list-disc pl-5 space-y-2">
                            {order.items.map((item, index) => (
                                <motion.li
                                    key={index}
                                    className="text-purple-800"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    {item.name} - Qty: {item.quantity} - ${item.price.toFixed(2)}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    )
}

