"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header.jsx";
import { useCart } from "../pages/contexts/cartContext.jsx";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";
import { RadioGroup, RadioGroupItem } from "../components/ui/radioGroub.jsx";
import { Truck, CreditCard } from "lucide-react";

const TransactionForm = () => {
  const location = useLocation();
  const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 };
  const { clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });
  const [currency, setCurrency] = useState("USD");
  const [paymentMethod, setPaymentMethod] = useState("Credit/Debit Card");
  const [loading, setLoading] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [locationOption, setLocationOption] = useState("");

  const deliveryFees = {
    "الداخل": 65,
    "الضفة": 20,
    "رام الله": 20,
    "القدس": 30,
    "تجربة": 1,
  };

  const getDeliveryCost = () => deliveryFees[locationOption] || 0;

  const currencyConversionRates = {
    USD: 1,
    EUR: 0.9,
    ILS: 3.5,
  };

  const convertedTotalPrice = totalPrice * currencyConversionRates[currency];
  const convertedDeliveryCost = getDeliveryCost() * currencyConversionRates[currency];
  const finalTotalPrice = convertedTotalPrice + convertedDeliveryCost;

  const getCurrencySymbol = (currencyCode) => {
    switch (currencyCode) {
      case "USD":
        return "$";
      // case "EUR":
      //   return "€";
      case "ILS":
        return "₪";
      default:
        return "$";
    }
  };

  const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
  const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProcess = async () => {
    if (!recaptchaValue) return toast.error("Please complete the reCAPTCHA.");
    if (Object.values(formData).some((field) => !field)) return toast.error("Please fill all fields.");
    // if (!locationOption) return toast.error("Please select delivery location.");

    setLoading(true);
    try {
      // await axios.post(`${process.env.REACT_APP_API_BASE_URL}/send-cart-email`, {
      //   email: formData.email,
      //   cart,
      //   totalPrice: finalTotalPrice,
      //   deliveryCost: convertedDeliveryCost,
      //   location: locationOption,
      //   paymentDetails: {
      //     paymentMethod,
      //     cardType: "VISA",
      //     cardExpiry: "",
      //     cardNumber: "",
      //     paymentDate: new Date().toISOString(),
      //   },
      // });
      sessionStorage.setItem("userEmail", formData.email);
      sessionStorage.setItem("cart", JSON.stringify(cart));
      sessionStorage.setItem("locationOption", locationOption);
      sessionStorage.setItem("deliveryCost", convertedDeliveryCost.toString());


      const res = await axios.post(
        "https://api.lahza.io/transaction/initialize",
        {
          amount: finalTotalPrice * 100,
          email: formData.email,
          currency,
          callback_url: `https://maysabeauty.store/payment-success?totalPrice=${finalTotalPrice}`,

        },
        {
          headers: {
            Authorization: `Bearer ${SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Redirecting to payment...");
      // clearCart();
      window.location.href = res.data.data.authorization_url;
    } catch (error) {
      console.error("Transaction error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const res = await axios.get("https://api.lahza.io/config", {
          headers: {
            Authorization: `Bearer ${SECRET_KEY}`,
          },
        });
        if (res.data?.currency) setCurrency(res.data.currency);
      } catch (error) {
        console.error("Error fetching currency", error);
      }
    };
    fetchCurrency();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <ToastContainer />
      <main className="container mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-screen-xl mx-auto flex flex-wrap bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8"
        >
          <div className="w-full md:w-1/2 pr-4">
            <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
              Complete Your Purchase
            </h1>
            <div className="space-y-4">
              <Input name="fullName" placeholder="Full Name" onChange={handleInputChange} />
              <Input name="email" placeholder="Email" onChange={handleInputChange} />
              <Input name="address" placeholder="Address" onChange={handleInputChange} />
              <div className="flex gap-4">
                <Input name="city" placeholder="City" className="w-1/2" onChange={handleInputChange} />
                <Input name="zipCode" placeholder="Zip Code" className="w-1/2" onChange={handleInputChange} />
              </div>
              <Input name="country" placeholder="Country" onChange={handleInputChange} />

              <div className="mb-6">
                <Label htmlFor="currency" className="text-gray-800 dark:text-gray-200 mb-2 block">Choose Currency</Label>
                <select
                  id="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                >
                  <option value="USD">USD ($)</option>
                  {/* <option value="EUR">EUR (€)</option> */}
                  <option value="ILS">ILS (₪)</option>
                </select>
              </div>

              <h2 className="text-xl font-semibold my-4 dark:text-white">Payment Method</h2>
              {/* <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4 mb-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Cash on Delivery" id="cod" />
                  <Label htmlFor="cod" className="flex items-center gap-2 dark:text-gray-300">
                    <Truck className="w-5 h-5" /> <span>Cash on Delivery</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Credit/Debit Card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 dark:text-gray-300">
                    <CreditCard className="w-5 h-5" /> <span>Credit/Debit Card</span>
                  </Label>
                </div>
              </RadioGroup> */}
              <div className="mb-6">
                <Label htmlFor="deliveryLocation" className="text-gray-800 dark:text-gray-200 mb-2 block">
                  Select Delivery Location
                </Label>
                <select
                  id="deliveryLocation"
                  value={locationOption}
                  onChange={(e) => setLocationOption(e.target.value)}
                  className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                >
                  <option value="">-- Choose Location --</option>
                  <option value="الداخل">الداخل</option>
                  <option value="الضفة">الضفة</option>
                  <option value="رام الله">رام الله</option>
                  <option value="القدس">القدس</option>
                  <option value="تجربة">تجربة</option>
                </select>
              </div>


              <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={setRecaptchaValue} />
              <Button disabled={loading} onClick={handleProcess} className="w-full">
                {loading ? "Processing..." : "Proceed to Pay"}
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 pl-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Order Summary</h2>
            <ul className="space-y-2 text-sm bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-lg">
              {cart.map((item, idx) => (
                <li key={idx} className="flex justify-between">
                  <span className="text-gray-800 dark:text-gray-200">{item.name} × {item.quantity}</span>
                  <span className="text-gray-600 dark:text-gray-300">{getCurrencySymbol(currency)}{(item.price * item.quantity * currencyConversionRates[currency]).toFixed(2)}</span>
                </li>
              ))}
              <li className="flex justify-between font-semibold">
                <span className="text-gray-800 dark:text-gray-200">Delivery Fee</span>
                <span className="text-gray-600 dark:text-gray-300">
                  {getCurrencySymbol(currency)}{convertedDeliveryCost.toFixed(2)}
                </span>
              </li>
              <li className="flex justify-between font-semibold text-lg">
                <span className="text-gray-800 dark:text-gray-200">Total</span>
                <span className="text-gray-600 dark:text-gray-300">
                  {getCurrencySymbol(currency)}{finalTotalPrice.toFixed(2)}
                </span>
              </li>
            </ul>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default TransactionForm;
