"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../pages/contexts/cartContext.jsx";
import Header from "../components/Header.jsx";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";
import { RadioGroup, RadioGroupItem } from "../components/ui/radioGroub.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Truck, CreditCard } from "lucide-react";
// import Image from "next/image";

const cardPatterns = [
    { name: "Visa", pattern: /^4/, logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" },
    {
        name: "Mastercard",
        pattern: /^5[1-5]/,
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
    },
    {
        name: "American Express",
        pattern: /^3[47]/,
        logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg",
    },
    {
        name: "Discover",
        pattern: /^6(?:011|5)/,
        logo: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Discover_Card_logo.svg",
    },
];

export default function CheckoutPage() {
    const { cart, clearCart } = useCart();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        country: "",
        zipCode: "",
    });
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        expirationDate: "",
        cvv: "",
    });
    const [detectedCardType, setDetectedCardType] = useState(null);

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleCardDetailsChange = (e) => {
        const { name, value } = e.target;
        setCardDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Order placed successfully!", {
            position: "top-center",
            autoClose: 3000,
        });
        clearCart();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <Header />
            <ToastContainer />
            <main className="container mx-auto px-4 py-8 mt-16">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
                    Checkout
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                    >
                        <h2 className="text-xl md:text-2xl font-semibold mb-4 dark:text-gray-100">Your Order</h2>
                        {cart.map((item) => (
                            <div key={item.id} className="flex justify-between items-center mb-2">
                                <span className="dark:text-gray-300 text-sm md:text-base">
                                    {item.name} (x{item.quantity})
                                </span>
                                <span className="dark:text-gray-300 text-sm md:text-base">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        ))}
                        <div className="border-t dark:border-gray-700 mt-4 pt-4">
                            <div className="flex justify-between items-center font-semibold">
                                <span className="dark:text-gray-300">Total:</span>
                                <span className="dark:text-gray-300">${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                        onSubmit={handleSubmit}
                    >
                        <h2 className="text-xl md:text-2xl font-semibold mb-4 dark:text-gray-100">Shipping Information</h2>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="name" className="dark:text-gray-300">
                                    Full Name
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                                />
                            </div>
                            <div>
                                <Label htmlFor="email" className="dark:text-gray-300">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                                />
                            </div>
                            <div>
                                <Label htmlFor="address" className="dark:text-gray-300">
                                    Address
                                </Label>
                                <Input
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                    className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="city" className="dark:text-gray-300">
                                        City
                                    </Label>
                                    <Input
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                        className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="zipCode" className="dark:text-gray-300">
                                        Zip Code
                                    </Label>
                                    <Input
                                        id="zipCode"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        required
                                        className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="country" className="dark:text-gray-300">
                                    Country
                                </Label>
                                <Input
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    required
                                    className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                                />
                            </div>
                        </div>

                        <h2 className="text-xl md:text-2xl font-semibold my-4 dark:text-gray-100">Payment Method</h2>
                        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4 mb-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cod" id="cod" />
                                <Label htmlFor="cod" className="flex items-center gap-2 dark:text-gray-300">
                                    <Truck className="w-5 h-5" />
                                    <span>Cash on Delivery</span>
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="card" id="card" />
                                <Label htmlFor="card" className="flex items-center gap-2 dark:text-gray-300">
                                    <CreditCard className="w-5 h-5" />
                                    <span>Credit/Debit Card</span>
                                </Label>
                            </div>
                        </RadioGroup>

                        <AnimatePresence>
                            {paymentMethod === "card" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4 mb-4"
                                >
                                    <div className="relative">
                                        <Label htmlFor="cardNumber" className="dark:text-gray-300">
                                            Card Number
                                        </Label>
                                        <Input
                                            id="cardNumber"
                                            name="cardNumber"
                                            value={cardDetails.cardNumber}
                                            onChange={(e) => {
                                                const formatted =
                                                    e.target.value
                                                        .replace(/\s/g, "")
                                                        .match(/.{1,4}/g)
                                                        ?.join(" ")
                                                        .substr(0, 19) || "";
                                                setCardDetails((prev) => ({ ...prev, cardNumber: formatted }));
                                                const detectedCard = cardPatterns.find((card) =>
                                                    card.pattern.test(formatted.replace(/\s/g, ""))
                                                );
                                                setDetectedCardType(detectedCard ? detectedCard.name : null);
                                            }}
                                            required
                                            className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 pr-12"
                                            placeholder="1234 5678 9012 3456"
                                        />
                                        {detectedCardType && (
                                            <div className="absolute right-3 top-8 w-10 h-6">
                                                {/* <Image
                    src={
                    cardPatterns.find((card) => card.name === detectedCardType)?.logo || "/placeholder.svg"
                    }
                    alt={detectedCardType}
                    layout="fill"
                    objectFit="contain"
                /> */}
                                            </div>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="expirationDate" className="dark:text-gray-300">
                                                Expiration Date
                                            </Label>
                                            <Input
                                                id="expirationDate"
                                                name="expirationDate"
                                                value={cardDetails.expirationDate}
                                                onChange={(e) => {
                                                    const formatted = e.target.value
                                                        .replace(/\D/g, "")
                                                        .replace(/^(\d{2})/, "$1/")
                                                        .substr(0, 5);
                                                    setCardDetails((prev) => ({ ...prev, expirationDate: formatted }));
                                                }}
                                                required
                                                className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                                                placeholder="MM/YY"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="cvv" className="dark:text-gray-300">
                                                CVV
                                            </Label>
                                            <Input
                                                id="cvv"
                                                name="cvv"
                                                value={cardDetails.cvv}
                                                onChange={handleCardDetailsChange}
                                                required
                                                className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                                                placeholder="123"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Button type="submit" className="w-full mt-6">
                            Place Order
                        </Button>
                    </motion.form>

                </div>
            </main>
        </div>
    );
}
