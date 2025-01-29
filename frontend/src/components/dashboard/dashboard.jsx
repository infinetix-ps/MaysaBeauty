import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.jsx"
import { Overview } from "./overview.jsx"
import { RecentSales } from "./recentSales.jsx"
import { Search } from "./search.jsx"
import { UserNav } from "./userNav.jsx"
import { MainNav } from "./mainNav.jsx"
import { CalendarDateRangePicker } from "./dateRangePicker.jsx"
import { TrendingProducts } from "./trendingProducts.jsx"
import { AgeGroupDistribution } from "./ageGroupDistribution.jsx"
import { SeasonalTrends } from "./seasonalTrends.jsx"
import { useToast } from "../ui/useToast.js"
import { Switch } from "../ui/switch.jsx"
import { motion } from "framer-motion"

const Dashboard = () => {
    const [notificationsMuted, setNotificationsMuted] = useState(false)
    const { toast } = useToast()

    useEffect(() => {
        const interval = setInterval(() => {
            if (!notificationsMuted) {
                toast({
                    title: "New Order Received",
                    description: "A new order has been placed. Check the Orders page for details.",
                })
            }
        }, 60000)

        return () => clearInterval(interval)
    }, [notificationsMuted, toast])

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
            <header className="sticky top-0 z-40 border-b bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
                <div className="container flex h-16 items-center justify-between px-4">
                    <MainNav className="mx-6" />
                    <div className="flex items-center space-x-4">
                        <Search />
                        <UserNav />
                    </div>
                </div>
            </header>
            <main className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between">
                    <motion.h2
                        className="text-3xl font-bold tracking-tight text-pink-800"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        LittleDiva Dashboard
                    </motion.h2>
                    <CalendarDateRangePicker />
                </div>
                <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="bg-gradient-to-br from-pink-400 to-purple-300 text-white">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-white"
                                    >
                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">$45,231.89</div>
                                    <p className="text-xs text-pink-100">+20.1% from last month</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <Card className="bg-gradient-to-br from-purple-400 to-indigo-300 text-white">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-white"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+2350</div>
                                    <p className="text-xs text-indigo-100">+180.1% from last month</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Card className="bg-gradient-to-br from-indigo-400 to-blue-300 text-white">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-white"
                                    >
                                        <rect width="20" height="14" x="2" y="5" rx="2" />
                                        <path d="M2 10h20" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+12,234</div>
                                    <p className="text-xs text-blue-100">+19% from last month</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Card className="bg-gradient-to-br from-blue-400 to-cyan-300 text-white">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-white"
                                    >
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+573</div>
                                    <p className="text-xs text-cyan-100">+201 since last hour</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Sales Overview</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <Overview />
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Recent Sales</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RecentSales />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Trending Products</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <TrendingProducts />
                            </CardContent>
                        </Card>
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Age Group Distribution</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <AgeGroupDistribution />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Seasonal Trends</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <SeasonalTrends />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard

