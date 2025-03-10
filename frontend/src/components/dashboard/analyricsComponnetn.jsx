import React from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../uiDashboard/card.jsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../uiDashboard/tabs.jsx"
import { Overview } from "./overview"
import { RecentSales } from "./recentSales"
import { AgeGroupDistribution } from "./ageGroupDistribution.jsx"
import { SeasonalTrends } from "./seasonalTrends"
import { Button } from "../uiDashboard/button.jsx"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

const AnalyticsPage = () => {
    return (
        <motion.div
            className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50"
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
                        <Button variant="outline" size="icon" className="bg-white hover:bg-blue-100">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h2 className="text-3xl font-bold tracking-tight text-blue-800">Analytics</h2>
                </div>
            </motion.div>
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="bg-white">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-blue-100">
                        Overview
                    </TabsTrigger>
                    <TabsTrigger value="sales" className="data-[state=active]:bg-blue-100">
                        Sales
                    </TabsTrigger>
                    {/* <TabsTrigger value="customers" className="data-[state=active]:bg-blue-100">
                        Customers
                    </TabsTrigger>
                    <TabsTrigger value="products" className="data-[state=active]:bg-blue-100">
                        Products
                    </TabsTrigger> */}
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <motion.div
                        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className="bg-gradient-to-br from-blue-400 to-indigo-300 text-white">
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
                                <div className="text-2xl font-bold">$0</div>
                                <p className="text-xs text-blue-100">+0% from last month</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-indigo-400 to-purple-300 text-white">
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
                                <div className="text-2xl font-bold">+0</div>
                                <p className="text-xs text-indigo-100">+0% from last month</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-purple-400 to-pink-300 text-white">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
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
                                <div className="text-2xl font-bold">+</div>
                                <p className="text-xs text-purple-100">+0 since last hour</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-pink-400 to-red-300 text-white">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Inventory Status</CardTitle>
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
                                <div className="text-2xl font-bold">0%</div>
                                <p className="text-xs text-pink-100">+0% from last week</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div
                        className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
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
                    </motion.div>
                </TabsContent>
                <TabsContent value="sales" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Seasonal Trends</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <SeasonalTrends />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="customers" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Age Group Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <AgeGroupDistribution />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </motion.div>
    )
}

export default AnalyticsPage

