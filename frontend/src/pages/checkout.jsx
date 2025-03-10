"use client";
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import Header from "../components/Header.jsx";

const TransactionForm = () => {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [reference, setReference] = useState("");
  const [status, setStatus] = useState(null);
  const [transactionReference, setTransactionReference] = useState("");
  const [loading, setLoading] = useState(false);

  const SECRET_KEY = "sk_test_OOdnmHaKHdcaHffsf1XuCysGm92JEiU34"; // Replace with actual key

  // Handle Create Transaction
  const createTransaction = async () => {
    setLoading(true);
    setStatus(null);

    const url = "https://api.lahza.io/transaction/initialize";
    const headers = {
      Authorization: `Bearer ${SECRET_KEY}`,
      "Content-Type": "application/json",
    };

    const body = {
      amount,
      email,
      currency,
      reference,
      callback_url: "https://yourcallbackurl.com", // Replace with your callback URL
    };

    try {
      const response = await axios.post(url, body, { headers });
      setTransactionReference(response.data.data.reference);
      setStatus("Redirecting to payment...");
      window.location.href = response.data.data.authorization_url; // Automatically open Lahza link
    } catch (error) {
      console.error("Error creating transaction", error);
      setStatus("Failed to create transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
     <Header/>

      {/* Transaction Form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center py-10"
      >
        <Card className="w-full max-w-lg shadow-lg rounded-2xl bg-white p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">Create Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Amount Input */}
              <div>
                <Label>Amount</Label>
                <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" />
              </div>

              {/* Email Input */}
              <div>
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
              </div>

              {/* Currency Selector */}
              <div>
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
              </div>

              {/* Reference Input */}
              <div>
                <Label>Reference</Label>
                <Input type="text" value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Enter reference" />
              </div>

              {/* Create Transaction Button */}
              <Button onClick={createTransaction} disabled={loading} className="w-full">
                {loading ? <Loader2 className="animate-spin mr-2" /> : "Proceed to Payment"}
              </Button>

              {/* Status Messages */}
              {status && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`p-3 rounded-md text-white flex items-center gap-2 ${
                    status.includes("Redirecting") ? "bg-blue-500" : "bg-red-500"
                  }`}
                >
                  {status.includes("Redirecting") ? <CheckCircle /> : <XCircle />}
                  {status}
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TransactionForm;
