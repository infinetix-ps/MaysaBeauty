import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "./contexts/cartContext.jsx";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const emailSentRef = useRef(false);
  const { clearCart } = useCart();

  // Read from sessionStorage
  const orderId = sessionStorage.getItem("orderId") || "N/A";
  const paymentType = sessionStorage.getItem("paymentType") || "visa";
  const totalPrice = sessionStorage.getItem("finalTotalPrice") || "N/A";

  const paymentDetails = {
    orderId,
    amount: `${totalPrice} شيقل`,
    paymentMethod: paymentType === "cash" ? "الدفع عند الاستلام" : "بطاقة الائتمان",
    cardType: paymentType === "cash" ? "-" : "VISA",
    paymentDate: new Date().toISOString(),
  };

  // Send confirmation email once
  useEffect(() => {
    const sendSuccessEmail = async () => {
      if (emailSentRef.current) return;
      emailSentRef.current = true;

      try {
        const email = sessionStorage.getItem("userEmail");
        const cart = JSON.parse(sessionStorage.getItem("cart") || "[]");
        const locationOption = sessionStorage.getItem("locationOption");
        const deliveryCost = parseFloat(sessionStorage.getItem("deliveryCost") || "0");

        if (!email || cart.length === 0 || !totalPrice) return;

        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/send-cart-email`, {
          email,
          cart,
          totalPrice,
          deliveryCost,
          location: locationOption,
          paymentDetails,
        });

        toast.success("✅ تم إرسال الفاتورة إلى بريدك الإلكتروني");

        // Clear all relevant sessionStorage
        sessionStorage.removeItem("userEmail");
        sessionStorage.removeItem("cart");
        sessionStorage.removeItem("locationOption");
        sessionStorage.removeItem("deliveryCost");
        sessionStorage.removeItem("orderId");
        sessionStorage.removeItem("paymentType");
        sessionStorage.removeItem("finalTotalPrice");

        clearCart();
      } catch (error) {
        console.error("Failed to send email:", error);
        toast.error("❌ حدث خطأ أثناء إرسال البريد الإلكتروني");
      }
    };

    sendSuccessEmail();
  }, [clearCart, totalPrice, paymentDetails]);

  const handleContinueShopping = () => {
    navigate("/products");
  };

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-md mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">تمت عملية الدفع بنجاح</h1>
          <p className="text-gray-500 mb-6">تم استلام طلبك وسيتم معالجته قريباً</p>

          <div className="bg-gray-50 p-4 rounded-lg mb-6" dir="rtl">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">رقم الطلب:</span>
              <span className="font-medium">{paymentDetails.orderId}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">طريقة الدفع:</span>
              <span className="font-medium">{paymentDetails.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">المبلغ المدفوع:</span>
              <span className="font-medium">{paymentDetails.amount}</span>
            </div>
          </div>

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

      <style jsx="true">{`
        :root {
          --primary: #B78283;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        [dir="rtl"] {
          letter-spacing: 0;
          line-height: 1.8;
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccess;
