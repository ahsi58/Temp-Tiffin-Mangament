import React from "react";
import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import Profile from "../pages/customer/Profile";
import VendorProfile from "../pages/vendor/VendorProfile";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import CustomerDashboard from "../pages/customer/CustomerDashboard";
import VendorDashboard from "../pages/vendor/VendorDashboard";

import WeeklyMenu from "../pages/customer/WeeklyMenu";
import VendorWeeklyMenu from "../pages/vendor/VendorWeeklyMenu";

// ============================================================
// Sharwari's work - Order and Cart pages
// ============================================================

import Cart from "../pages/customer/Cart";
import Checkout from "../pages/customer/Checkout";
import Orders from "../pages/customer/Orders";
import OrderDetails from "../pages/customer/OrderDetails";
import VendorOrders from "../pages/vendor/VendorOrders";

// ============================================================
// End of Sharwari's work
// ============================================================


function AppRoutes() {

    return (

        <Routes>

            {/* ==================== Public Routes ==================== */}

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />


            {/* ==================== Customer Routes ==================== */}

            <Route
                path="/customer/dashboard"
                element={
                    <ProtectedRoute allowedRole="CUSTOMER">
                        <CustomerDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/customer/menu"
                element={
                    <ProtectedRoute allowedRole="CUSTOMER">
                        <WeeklyMenu />
                    </ProtectedRoute>
                }
            />


            {/* ============================================================
                Sharwari's work - Customer Cart
                ============================================================ */}

            <Route
                path="/customer/cart"
                element={
                    <ProtectedRoute allowedRole="CUSTOMER">
                        <Cart />
                    </ProtectedRoute>
                }
            />


            {/* ============================================================
                Sharwari's work - Customer Checkout
                ============================================================ */}

            <Route
                path="/customer/checkout"
                element={
                    <ProtectedRoute allowedRole="CUSTOMER">
                        <Checkout />
                    </ProtectedRoute>
                }
            />


            {/* ============================================================
                Sharwari's work - Customer Orders
                ============================================================ */}

            <Route
                path="/customer/orders"
                element={
                    <ProtectedRoute allowedRole="CUSTOMER">
                        <Orders />
                    </ProtectedRoute>
                }
            />


            {/* ============================================================
                Sharwari's work - Customer Order Details
                ============================================================ */}

            <Route
                path="/customer/orders/:id"
                element={
                    <ProtectedRoute allowedRole="CUSTOMER">
                        <OrderDetails />
                    </ProtectedRoute>
                }
            />


            {/* ==================== Customer Profile ==================== */}

            <Route
                path="/customer/profile"
                element={
                    <ProtectedRoute allowedRole="CUSTOMER">
                        <Profile />
                    </ProtectedRoute>
                }
            />


            {/* ==================== Vendor Routes ==================== */}

            <Route
                path="/vendor/dashboard"
                element={
                    <ProtectedRoute allowedRole="VENDOR">
                        <VendorDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/vendor/menu"
                element={
                    <ProtectedRoute allowedRole="VENDOR">
                        <VendorWeeklyMenu />
                    </ProtectedRoute>
                }
            />


            {/* ============================================================
                Sharwari's work - Vendor Orders
                ============================================================ */}

            <Route
                path="/vendor/orders"
                element={
                    <ProtectedRoute allowedRole="VENDOR">
                        <VendorOrders />
                    </ProtectedRoute>
                }
            />


            {/* ==================== Vendor Profile ==================== */}

            <Route
                path="/vendor/profile"
                element={
                    <ProtectedRoute allowedRole="VENDOR">
                        <VendorProfile />
                    </ProtectedRoute>
                }
            />

        </Routes>

    );

}

export default AppRoutes;

