import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Footer from "./components/Footer";
import ProductPage from "./pages/products.jsx";
import CartPage from "./pages/cart.jsx";
import CheckoutPage from "./pages/checkout.jsx";
import OrdersPage from "./components/dashboard/orderPage.jsx";
import SearchPage from "./pages/search.jsx";
import AllProductsPage from "./pages/allProduct.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./pages/contexts/cartContext.jsx";
import Dashboard from "./components/dashboard/dashboard.jsx";
import ProductsPage from "./components/dashboard/productsPage.jsx";
import CustomersPage from "./components/dashboard/customerComponent.jsx";
import AnalyticsPage from "./components/dashboard/analyricsComponnetn.jsx";
import SignIn from "./components/auth/signIn.jsx";
import SignUp from "./components/auth/signUp.jsx";
import Verify from "./components/auth/verify.jsx";
import SignUpSuccess from "./components/auth/signUpSuccess.jsx";
import ForgotPassword from "./components/auth/forgetPassword.jsx";
import ResetPassword from "./components/auth/resetPassword.jsx";
import EnhancedSettingsPage from "./pages/setting.jsx";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" /> : element;
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/signin" element={<ProtectedRoute element={<SignIn />} />} />
            <Route path="/signup" element={<ProtectedRoute element={<SignUp />} />} />
            <Route path="/verify" element={<ProtectedRoute element={<Verify />} />} />
            <Route path="/signup-success" element={<ProtectedRoute element={<SignUpSuccess />} />} />
            <Route path="/forgot-password" element={<ProtectedRoute element={<ForgotPassword />} />} />
            <Route path="/reset-password" element={<ProtectedRoute element={<ResetPassword />} />} />
            <Route path="/setting" element={<EnhancedSettingsPage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/products" element={<AllProductsPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/productsDash" element={<ProductsPage />} />
            <Route path="/ordersDash" element={<OrdersPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Routes>
          <Footer />
          <ToastContainer />
        </div>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
