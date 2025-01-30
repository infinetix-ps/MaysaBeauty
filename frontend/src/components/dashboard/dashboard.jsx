import { useEffect, useState } from "react"
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
import { DollarSign, Users, ShoppingBag, Activity, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"

const StatCard = ({ title, value, change, icon: Icon, gradient }) => (
    <Card
        className={`relative overflow-hidden ${gradient} h-[130px] border-none shadow-lg hover:shadow-xl transition-all duration-300`}
    >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20" />
            <div className="absolute -right-5 -bottom-5 h-24 w-24 rounded-full bg-white/20" />
        </div>

        <CardContent className="p-4 relative h-full">
            <div className="flex flex-col h-full">
                {/* Icon and Title */}
                <div className="flex items-center gap-3 mb-2">
                    <div className="rounded-xl bg-white/10 backdrop-blur-sm p-2 shadow-inner">
                        <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-sm font-medium text-white/90">{title}</h3>
                </div>

                {/* Value and Change */}
                <div className="mt-auto">
                    <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
                    <div className="flex items-center gap-1 mt-1">
                        <div className="flex items-center text-xs font-medium text-white/80">{change}</div>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
)

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
            {/* Mobile-friendly header */}
            <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
                <div className="container flex h-16 items-center justify-between px-4">
                    {/* Mobile menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-md">
                                <Menu className="h-5 w-5" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[80%] sm:w-[350px] bg-white">
                            <div className="py-4">
                                <MainNav className="flex flex-col space-y-4" />
                            </div>
                        </SheetContent>
                    </Sheet>

                    {/* Desktop navigation */}
                    <MainNav className="hidden lg:flex mx-6" />

                    <div className="flex items-center space-x-4">
                        <Search />
                        <UserNav />
                    </div>
                </div>
            </header>

            <main className="flex-1 space-y-4 p-4 sm:p-6 lg:p-8">
                {/* Dashboard Header */}
                <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between">
                    <motion.div
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-pink-600">LittleDiva Dashboard</h2>
                    </motion.div>
                    <div className="w-full sm:w-auto">
                        <CalendarDateRangePicker />
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Stat Cards */}
                    <motion.div
                        className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <StatCard
                            title="Total Revenue"
                            value="$45,231.89"
                            change="+20.1% from last month"
                            icon={DollarSign}
                            gradient="bg-gradient-to-br from-pink-500 via-pink-600 to-purple-700"
                        />

                        <StatCard
                            title="New Customers"
                            value="+2350"
                            change="+180.1% from last month"
                            icon={Users}
                            gradient="bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700"
                        />

                        <StatCard
                            title="Sales"
                            value="+12,234"
                            change="+19% from last month"
                            icon={ShoppingBag}
                            gradient="bg-gradient-to-br from-indigo-500 via-blue-600 to-blue-700"
                        />

                        <StatCard
                            title="Active Now"
                            value="+573"
                            change="+201 since last hour"
                            icon={Activity}
                            gradient="bg-gradient-to-br from-blue-500 via-cyan-600 to-cyan-700"
                        />
                    </motion.div>

                    {/* Charts Section */}
                    <div className="space-y-4">
                        {/* Overview and Recent Sales */}
                        <motion.div
                            className="grid gap-4 grid-cols-1 lg:grid-cols-7"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Card className="lg:col-span-4">
                                <CardHeader>
                                    <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">Sales Overview</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <Overview />
                                </CardContent>
                            </Card>
                            <Card className="lg:col-span-3">
                                <CardHeader>
                                    <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">Recent Sales</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <RecentSales />
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Trending Products and Age Distribution */}
                        <motion.div
                            className="grid gap-4 grid-cols-1 lg:grid-cols-7"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <Card className="lg:col-span-3">
                                <CardHeader>
                                    <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">Trending Products</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <TrendingProducts />
                                </CardContent>
                            </Card>
                            <Card className="lg:col-span-4">
                                <CardHeader>
                                    <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">Age Distribution</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <AgeGroupDistribution />
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Seasonal Trends and Notifications */}
                        <motion.div
                            className="grid gap-4 grid-cols-1 lg:grid-cols-7"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            <Card className="lg:col-span-4">
                                <CardHeader>
                                    <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">Seasonal Trends</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <SeasonalTrends />
                                </CardContent>
                            </Card>
                            <Card className="lg:col-span-3">
                                <CardHeader>
                                    <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">Notifications</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            checked={notificationsMuted}
                                            onCheckedChange={setNotificationsMuted}
                                            id="mute-notifications"
                                        />
                                        <label htmlFor="mute-notifications" className="text-sm font-medium text-gray-700">
                                            Mute Notifications
                                        </label>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard

