import React from "react";
import { orders } from "../App.js";
import Header from "../components/Header";

export default function OrdersPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">Your Orders</h1>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    {orders.map((order) => (
                        <div key={order.id} className="border-b dark:border-gray-700 last:border-b-0 p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Order #{order.id}</h2>
                                <span className="text-gray-600 dark:text-gray-400">{order.date}</span>
                            </div>
                            <p className="mb-2 text-gray-700 dark:text-gray-300">Total: ${order.total.toFixed(2)}</p>
                            <p className="mb-2 text-gray-700 dark:text-gray-300">Status: {order.status}</p>
                            <p className="text-gray-700 dark:text-gray-300">Items: {order.items.join(", ")}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
