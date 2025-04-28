import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    // Simple payment details
    const paymentDetails = {
        orderId: "ORD-" + Math.floor(100000 + Math.random() * 900000),
        amount: "450.00 ريال",
    };

    // Navigation handlers
    const handleContinueShopping = () => {
        navigate("/products"); // Navigate to products page
    };

    const handleReturnHome = () => {
        navigate("/"); // Navigate to home page
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <div className="max-w-md mx-auto px-6 py-12">
                {/* Simple Success Card */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
                    {/* Success Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                    </div>

                    {/* Success Message */}
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">تمت عملية الدفع بنجاح</h1>
                    <p className="text-gray-500 mb-6">
                        تم استلام طلبك وسيتم معالجته قريباً
                    </p>

                    {/* Simple Order Details */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-6" dir="rtl">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-500">رقم الطلب:</span>
                            <span className="font-medium">{paymentDetails.orderId}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">المبلغ المدفوع:</span>
                            <span className="font-medium">{paymentDetails.amount}</span>
                        </div>
                    </div>

                    {/* Action Buttons with Navigation - Updated with website's color */}
                    <div className="flex flex-col gap-3" dir="rtl">
                        <button
                            onClick={handleContinueShopping}
                            style={{ backgroundColor: "#B78283", color: "white" }}
                            className="w-full py-3 rounded-lg transition-colors hover:opacity-90"
                        >
                            متابعة التسوق
                        </button>
                        <button
                            onClick={handleReturnHome}
                            className="w-full py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors border border-gray-200"
                        >
                            العودة للصفحة الرئيسية
                        </button>
                    </div>

                    
                </div>
            </div>

            {/* Custom CSS for enhanced typography and website colors */}
            <style jsx="true">{`
        :root {
          --primary: #B78283;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        /* Enhance Arabic text readability */
        [dir="rtl"] {
          letter-spacing: 0;
          line-height: 1.8;
        }
      `}</style>
        </div>
    );
};

export default PaymentSuccess;