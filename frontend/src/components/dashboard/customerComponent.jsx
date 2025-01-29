import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../uiDashboard/card.jsx";
import { Input } from "../uiDashboard/input.jsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../uiDashboard/table.jsx";
import { Button } from "../uiDashboard/button.jsx";
import { Search, ArrowLeft, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../uiDashboard/avatar.jsx";
import { useToast } from "../ui/useToast.js";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../uiDashboard/alertDialog.jsx";

const initialCustomers = [
    { id: 1, name: "Emma Thompson", email: "emma.thompson@email.com", orders: 5, totalSpent: 249.95 },
    { id: 2, name: "Sophia Chen", email: "sophia.chen@email.com", orders: 3, totalSpent: 174.97 },
    { id: 3, name: "Olivia Brown", email: "olivia.brown@email.com", orders: 7, totalSpent: 374.93 },
    { id: 4, name: "Ava Singh", email: "ava.singh@email.com", orders: 2, totalSpent: 99.98 },
    { id: 5, name: "Zoe Patel", email: "zoe.patel@email.com", orders: 4, totalSpent: 199.96 },
];

const CustomersPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [customers, setCustomers] = useState(initialCustomers);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const { toast } = useToast();

    const filteredCustomers = customers.filter(
        (customer) =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleDeleteCustomer = (customer) => {
        setCustomerToDelete(customer);
    };

    const confirmDelete = () => {
        if (customerToDelete) {
            const updatedCustomers = customers.filter((c) => c.id !== customerToDelete.id);
            setCustomers(updatedCustomers);
            toast({
                title: "Customer Deleted",
                description: `${customerToDelete.name} has been removed from the customer list.`,
                variant: "destructive",
            });
            setCustomerToDelete(null);
        }
    };

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div className="flex items-center space-x-2">
                    <Link to="/dashboard">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search customers..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Customer List</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Orders</TableHead>
                                <TableHead>Total Spent</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCustomers.map((customer) => (
                                <TableRow key={customer.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center">
                                            <Avatar className="h-8 w-8 mr-2">
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
                                        <Button variant="ghost" onClick={() => handleDeleteCustomer(customer)}>
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <AlertDialog open={!!customerToDelete} onOpenChange={() => setCustomerToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this customer?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the customer and remove their data from our
                            servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default CustomersPage;