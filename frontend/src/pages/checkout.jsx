"use client";
import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import Header from "../components/Header";
import { useCart } from "../pages/contexts/cartContext.jsx";


const TransactionForm = () => {
  const location = useLocation();
  const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 };
  const {  clearCart } = useCart();


  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [reference, setReference] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
  const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

  const handleProcess = async () => {
    if (!recaptchaValue) {
      setStatus("Please complete the reCAPTCHA.");
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      // Step 1: Send Email with Cart Summary
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/send-cart-email`, {
        email,
        cart,
        totalPrice,
      });

      // Step 2: Create Transaction
      const transactionRes = await axios.post(
        "https://api.lahza.io/transaction/initialize",
        {
          amount: totalPrice * 100,
          email,
          currency,
          callback_url: "http://maysabeauty.store",
        },
        {
          headers: {
            Authorization: `Bearer ${SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      clearCart();
      setStatus("Redirecting to payment...");
      // Step 3: Redirect to Payment Gateway
      window.location.href = transactionRes.data.data.authorization_url;
    } catch (error) {
      console.error("Process failed:", error);
      setStatus("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center py-10"
      >
        <Card className="w-full max-w-lg shadow-lg rounded-2xl bg-white p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">
              Complete Your Purchase
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* <div>
              <Label>Currency</Label>
              <Select onValueChange={setCurrency} defaultValue={currency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ILS">ILS</SelectItem>
                  <SelectItem value="JOD">JOD</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

            <div>
              <Label>Cart</Label>
              <ul className="bg-gray-50 p-3 rounded-md border space-y-2 text-sm">
                {cart.map((item, idx) => (
                  <li key={idx}>
                    🛒 <strong>{item.name}</strong> — {item.quantity} × ${item.price}
                  </li>
                ))}
              </ul>
              <p className=" text-black">
                Total: ${totalPrice}
              </p>

            </div>

            <div className="flex justify-center">
              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={(value) => setRecaptchaValue(value)}
              />
            </div>

            <Button onClick={handleProcess} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Processing...
                </>
              ) : (
                "Send Email & Proceed to Payment"
              )}
            </Button>

            {status && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`p-3 rounded-md text-white flex items-center gap-2 ${status.includes("Redirecting")
                    ? "bg-blue-500"
                    : status.includes("error") || status.includes("failed")
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
              >
                {status.includes("Redirecting") ? <CheckCircle /> : <XCircle />}
                {status}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TransactionForm;
