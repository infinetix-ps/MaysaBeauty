import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../uiDashboard/card.jsx"
import { Input } from "../uiDashboard/input.jsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../uiDashboard/table.jsx"
import { Button } from "../uiDashboard/button.jsx"
import { Search, ArrowLeft, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "../uiDashboard/avatar.jsx"
import { useToast } from "../ui/useToast.js"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../uiDashboard/alertDialog.jsx"
import { motion, AnimatePresence } from "framer-motion"

// const initialCustomers = [
//     { id: 1, name: "Emma Thompson", email: "emma.thompson@email.com", orders: 5, totalSpent: 249.95 },
//     { id: 2, name: "Sophia Chen", email: "sophia.chen@email.com", orders: 3, totalSpent: 174.97 },
//     { id: 3, name: "Olivia Brown", email: "olivia.brown@email.com", orders: 7, totalSpent: 374.93 },
//     { id: 4, name: "Ava Singh", email: "ava.singh@email.com", orders: 2, totalSpent: 99.98 },
//     { id: 5, name: "Zoe Patel", email: "zoe.patel@email.com", orders: 4, totalSpent: 199.96 },
// ]
const initialCustomers = [];
const CustomersPage = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [customers, setCustomers] = useState(initialCustomers)
    const [customerToDelete, setCustomerToDelete] = useState(null)
    const { toast } = useToast()

    const filteredCustomers = customers.filter(
        (customer) =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleDeleteCustomer = (customer) => {
        setCustomerToDelete(customer)
    }

    const confirmDelete = () => {
        if (customerToDelete) {
            const updatedCustomers = customers.filter((c) => c.id !== customerToDelete.id)
            setCustomers(updatedCustomers)
            toast({
                title: "Customer Deleted",
                description: `${customerToDelete.name} has been removed from the customer list.`,
                variant: "destructive",
            })
            setCustomerToDelete(null)
        }
    }

    return (
        <motion.div
            className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="flex items-center justify-between space-y-2"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center space-x-2">
                    <Link to="/dashboard">
                        <Button variant="outline" size="icon" className="bg-white hover:bg-gray-100 border-2 border-black">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h2 className="text-3xl font-bold tracking-tight text-black">Customers</h2>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            placeholder="Search customers..."
                            className="pl-8 bg-white border-2 border-black focus:border-gray-600"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </motion.div>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card className="bg-white shadow-lg border-2 border-black">
                    <CardHeader className="border-b border-gray-200">
                        <CardTitle className="text-2xl font-bold text-black">Customer List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-black">
                                    <TableHead className="text-white font-medium h-12">Name</TableHead>
                                    <TableHead className="text-white font-medium h-12">Email</TableHead>
                                    <TableHead className="text-white font-medium h-12">Orders</TableHead>
                                    <TableHead className="text-white font-medium h-12">Total Spent</TableHead>
                                    <TableHead className="text-white font-medium h-12">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <AnimatePresence>
                                    {filteredCustomers.map((customer, index) => (
                                        <motion.tr
                                            key={customer.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                        >
                                            <TableCell className="font-medium">
                                                <div className="flex items-center">
                                                    <Avatar className="h-8 w-8 mr-2 bg-gray-200">
                                                        <AvatarImage src={`/placeholder.svg?text=${customer.name.charAt(0)}`} />
                                                        <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    {customer.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>{customer.email}</TableCell>
                                            <TableCell>{customer.orders}</TableCell>
                                            <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => handleDeleteCustomer(customer)}
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-100 border border-red-300"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </motion.div>

            <AlertDialog open={!!customerToDelete} onOpenChange={() => setCustomerToDelete(null)}>
                <AlertDialogContent className="bg-white border-2 border-black">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-bold">Are you sure you want to delete this customer?</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-600">
                            This action cannot be undone. This will permanently delete the customer and remove their data from our
                            servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-white text-black border-2 border-black hover:bg-gray-100">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-black text-white hover:bg-gray-800">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </motion.div>
    )
}

export default CustomersPage
