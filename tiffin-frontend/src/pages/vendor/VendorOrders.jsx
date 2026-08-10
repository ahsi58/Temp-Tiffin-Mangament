import { useEffect, useState } from "react";

import {
    ShoppingBag,
    IndianRupee,
    CalendarDays,
    Loader2,
    PackageCheck,
    ChevronDown,
    ClipboardList
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
    getAllOrders,
    updateOrderStatus
} from "../../api/orderApi";

import toast from "react-hot-toast";

// ============================================================
// Sharwari's work - Vendor Order Management
// ============================================================

function VendorOrders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingOrderId, setUpdatingOrderId] = useState(null);


    // ============================================================
    // Load all customer orders
    // ============================================================

    useEffect(() => {

        loadOrders();

    }, []);


    const loadOrders = async () => {

        try {

            setLoading(true);

            const response = await getAllOrders();

            console.log(
                "Vendor Orders:",
                response.data
            );

            setOrders(response.data || []);

        } catch (error) {

            console.error(
                "Failed to load orders:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to load orders"
            );

            setOrders([]);

        } finally {

            setLoading(false);

        }

    };


    // ============================================================
    // Update order status
    // ============================================================

    const handleStatusChange = async (
        orderId,
        newStatus
    ) => {

        try {

            setUpdatingOrderId(orderId);

            const response =
                await updateOrderStatus(
                    orderId,
                    newStatus
                );

            console.log(
                "Updated Order:",
                response.data
            );

            setOrders(previousOrders =>
                previousOrders.map(order =>
                    order.id === orderId
                        ? response.data
                        : order
                )
            );

            toast.success(
                "Order status updated successfully"
            );

        } catch (error) {

            console.error(
                "Failed to update order status:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to update order status"
            );

        } finally {

            setUpdatingOrderId(null);

        }

    };


    // ============================================================
    // Status styling
    // ============================================================

    const getStatusStyle = (status) => {

        switch (status) {

            case "PLACED":
                return "bg-blue-50 text-blue-700 border-blue-100";

            case "CONFIRMED":
                return "bg-indigo-50 text-indigo-700 border-indigo-100";

            case "PREPARING":
                return "bg-orange-50 text-orange-700 border-orange-100";

            case "READY":
                return "bg-green-50 text-green-700 border-green-100";

            case "COMPLETED":
                return "bg-gray-50 text-gray-700 border-gray-200";

            case "CANCELLED":
                return "bg-red-50 text-red-700 border-red-100";

            default:
                return "bg-gray-50 text-gray-700 border-gray-200";

        }

    };


    // ============================================================
    // Format order date
    // ============================================================

    const formatDate = (date) => {

        if (!date) {
            return "Date unavailable";
        }

        return new Date(date).toLocaleString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit"
            }
        );

    };


    // ============================================================
    // Loading
    // ============================================================

    if (loading) {

        return (

            <DashboardLayout>

                <div className="min-h-[400px] flex flex-col items-center justify-center">

                    <Loader2
                        size={32}
                        className="animate-spin text-orange-500"
                    />

                    <p className="text-sm text-gray-500 mt-3">
                        Loading customer orders...
                    </p>

                </div>

            </DashboardLayout>

        );

    }


    return (

        <DashboardLayout>

            <div className="space-y-6">

                {/* ==================================================
                    Page Header
                   ================================================== */}

                <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl px-6 py-5 text-white shadow-md">

                    <div className="flex items-center justify-between gap-4">

                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">

                                <ClipboardList size={23} />

                            </div>

                            <div>

                                <p className="text-xs font-semibold tracking-wider text-orange-100 uppercase">
                                    ORDER MANAGEMENT
                                </p>

                                <h1 className="text-2xl md:text-3xl font-bold">
                                    Customer Orders
                                </h1>

                                <p className="text-sm text-orange-50 mt-1">
                                    View orders and manage their current status.
                                </p>

                            </div>

                        </div>


                        <div className="hidden sm:flex items-center gap-2 bg-white/15 px-3 py-2 rounded-lg text-sm font-semibold">

                            <ShoppingBag size={16} />

                            {orders.length}{" "}
                            {orders.length === 1
                                ? "Order"
                                : "Orders"}

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    Empty State
                   ================================================== */}

                {orders.length === 0 ? (

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm min-h-[350px] flex flex-col items-center justify-center text-center px-6">

                        <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center">

                            <ShoppingBag
                                size={27}
                                className="text-gray-300"
                            />

                        </div>

                        <h2 className="text-xl font-bold text-gray-800 mt-4">
                            No Orders Found
                        </h2>

                        <p className="text-sm text-gray-500 mt-2">
                            Customer orders will appear here once
                            they place an order.
                        </p>

                    </div>

                ) : (

                    /* ==================================================
                       Order List
                       ================================================== */

                    <div className="space-y-4">

                        {orders.map(order => (

                            <div
                                key={order.id}
                                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                            >

                                {/* ==================================================
                                    Order Header
                                   ================================================== */}

                                <div className="px-5 py-4 border-b border-gray-100">

                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                                        {/* Left */}

                                        <div className="min-w-0">

                                            <div className="flex flex-wrap items-center gap-2.5">

                                                <h2 className="text-base font-bold text-gray-900">
                                                    Order #{order.id}
                                                </h2>

                                                <span
                                                    className={`px-2.5 py-1 rounded-full border text-[11px] font-bold ${getStatusStyle(order.status)}`}
                                                >
                                                    {order.status}
                                                </span>

                                            </div>

                                            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-500">

                                                <div className="flex items-center gap-1.5">

                                                    <CalendarDays size={14} />

                                                    {formatDate(
                                                        order.orderDate
                                                    )}

                                                </div>

                                                <span>
                                                    Customer #{order.customerId}
                                                </span>

                                            </div>

                                        </div>


                                        {/* Status Update */}

                                        <div className="flex items-center gap-2">

                                            <label className="text-xs font-semibold text-gray-500">

                                                Status

                                            </label>

                                            <div className="relative">

                                                <select
                                                    value={order.status}
                                                    disabled={
                                                        updatingOrderId ===
                                                        order.id
                                                    }
                                                    onChange={(event) =>
                                                        handleStatusChange(
                                                            order.id,
                                                            event.target.value
                                                        )
                                                    }
                                                    className="appearance-none border border-gray-200 rounded-lg px-3 py-2 pr-8 text-xs font-semibold text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                >

                                                    <option value="PLACED">
                                                        PLACED
                                                    </option>

                                                    <option value="CONFIRMED">
                                                        CONFIRMED
                                                    </option>

                                                    <option value="PREPARING">
                                                        PREPARING
                                                    </option>

                                                    <option value="READY">
                                                        READY
                                                    </option>

                                                    <option value="COMPLETED">
                                                        COMPLETED
                                                    </option>

                                                    <option value="CANCELLED">
                                                        CANCELLED
                                                    </option>

                                                </select>

                                                <ChevronDown
                                                    size={14}
                                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                                                />

                                            </div>

                                            {updatingOrderId === order.id && (

                                                <Loader2
                                                    size={17}
                                                    className="animate-spin text-orange-500"
                                                />

                                            )}

                                        </div>

                                    </div>

                                </div>


                                {/* ==================================================
                                    Order Items
                                   ================================================== */}

                                <div className="px-5 py-4">

                                    <div className="flex items-center justify-between mb-3">

                                        <div className="flex items-center gap-2">

                                            <PackageCheck
                                                size={17}
                                                className="text-orange-500"
                                            />

                                            <h3 className="text-sm font-bold text-gray-800">
                                                Ordered Items
                                            </h3>

                                        </div>

                                        <span className="text-[11px] text-gray-400">
                                            {order.items?.length || 0} items
                                        </span>

                                    </div>


                                    <div className="space-y-2">

                                        {order.items?.map(item => (

                                            <div
                                                key={item.menuId}
                                                className="bg-gray-50 border border-gray-100 rounded-lg px-3.5 py-2.5 flex items-center justify-between gap-4"
                                            >

                                                <div className="min-w-0">

                                                    <p className="text-sm font-semibold text-gray-800 truncate">
                                                        {item.title}
                                                    </p>

                                                    <p className="text-[11px] text-gray-500 mt-0.5">

                                                        ₹
                                                        {Number(
                                                            item.price || 0
                                                        ).toFixed(2)}

                                                        {" × "}

                                                        {item.quantity}

                                                    </p>

                                                </div>


                                                <div className="flex items-center gap-0.5 text-sm font-bold text-gray-900 shrink-0">

                                                    <IndianRupee size={14} />

                                                    {(
                                                        Number(
                                                            item.price || 0
                                                        ) *
                                                        item.quantity
                                                    ).toFixed(2)}

                                                </div>

                                            </div>

                                        ))}

                                    </div>

                                </div>


                                {/* ==================================================
                                    Order Total
                                   ================================================== */}

                                <div className="px-5 py-3.5 border-t border-gray-100 flex items-center justify-between">

                                    <span className="text-xs font-semibold text-gray-500">
                                        Order Total
                                    </span>

                                    <div className="flex items-center gap-0.5 text-orange-500">

                                        <IndianRupee size={17} />

                                        <span className="text-xl font-bold">
                                            {Number(
                                                order.totalAmount || 0
                                            ).toFixed(2)}
                                        </span>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </DashboardLayout>

    );

}

export default VendorOrders;

// ============================================================
// End of Sharwari's work
// ============================================================

