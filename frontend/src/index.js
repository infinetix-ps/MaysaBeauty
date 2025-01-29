import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductPage from "./pages/products.jsx";
import CartPage from "./pages/cart.jsx";
import CheckoutPage from "./pages/checkout.jsx";
import OrdersPage from "./pages/orders.jsx";
import SearchPage from "./pages/search.jsx";
import AllProductsPage from "./pages/allProduct.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./pages/contexts/cartContext.jsx";
import Dashboard from "./components/dashboard/dashboard.jsx";
import ProductsPage from "./components/dashboard/productsPage.jsx";
import CustomersPage from "./components/dashboard/customerComponent.jsx";
import AnalyticsPage from "./components/dashboard/analyricsComponnetn.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/all-products" element={<AllProductsPage />} />
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
