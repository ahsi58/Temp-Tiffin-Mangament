
import { useEffect, useState } from "react";
import {
    ShoppingBag,
    IndianRupee,
    CalendarDays,
    Loader2,
    PackageCheck,
    ChevronDown
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
    // Sharwari's work - Load all customer orders
    // ============================================================

    useEffect(() => {

        loadOrders();

    }, []);

    const loadOrders = async () => {

        try {

            setLoading(true);

            const response = await getAllOrders();

            console.log("Vendor Orders:", response.data);

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
    // Sharwari's work - Update order status
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

            // Update only the changed order locally
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
    // Sharwari's work - Status styling
    // ============================================================

    const getStatusStyle = (status) => {

        switch (status) {

            case "PLACED":
                return "bg-blue-100 text-blue-700";

            case "CONFIRMED":
                return "bg-indigo-100 text-indigo-700";

            case "PREPARING":
                return "bg-orange-100 text-orange-700";

            case "READY":
                return "bg-green-100 text-green-700";

            case "COMPLETED":
                return "bg-gray-100 text-gray-700";

            case "CANCELLED":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";

        }

    };

    // ============================================================
    // Sharwari's work - Format order date
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
    // Sharwari's work - Loading
    // ============================================================

    if (loading) {

        return (

            <DashboardLayout>

                <div className="min-h-[500px] flex items-center justify-center">

                    <Loader2
                        size={50}
                        className="animate-spin text-orange-500"
                    />

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <div className="space-y-8">

                {/* =================================================
                    Sharwari's work - Page Header
                    ================================================= */}

                <div className="bg-white rounded-3xl shadow-md p-8">

                    <div className="flex items-center gap-4">

                        <div className="bg-orange-100 p-4 rounded-2xl">

                            <ShoppingBag
                                size={34}
                                className="text-orange-500"
                            />

                        </div>

                        <div>

                            <h1 className="text-5xl font-extrabold text-gray-900">

                                Customer Orders

                            </h1>

                            <p className="mt-3 text-lg text-gray-600">

                                View customer orders and manage
                                their current status.

                            </p>

                        </div>

                    </div>

                </div>

                {/* =================================================
                    Sharwari's work - Empty State
                    ================================================= */}

                {orders.length === 0 ? (

                    <div className="bg-white rounded-3xl shadow-md p-12 min-h-[400px] flex flex-col items-center justify-center text-center">

                        <ShoppingBag
                            size={70}
                            className="text-gray-300 mb-6"
                        />

                        <h2 className="text-3xl font-bold text-gray-800">

                            No Orders Found

                        </h2>

                        <p className="text-gray-500 mt-3">

                            Customer orders will appear here
                            once they place an order.

                        </p>

                    </div>

                ) : (

                    /* =================================================
                       Sharwari's work - Order List
                       ================================================= */

                    <div className="space-y-6">

                        {orders.map(order => (

                            <div
                                key={order.id}
                                className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all p-7"
                            >

                                {/* Order Header */}

                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 border-b pb-6">

                                    <div>

                                        <div className="flex flex-wrap items-center gap-4">

                                            <h2 className="text-2xl font-bold text-gray-900">

                                                Order #{order.id}

                                            </h2>

                                            <span
                                                className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusStyle(order.status)}`}
                                            >

                                                {order.status}

                                            </span>

                                        </div>

                                        <div className="flex items-center gap-2 text-gray-500 mt-3">

                                            <CalendarDays size={18}/>

                                            <span>

                                                {formatDate(
                                                    order.orderDate
                                                )}

                                            </span>

                                        </div>

                                    </div>

                                    {/* Status Dropdown */}

                                    <div className="relative">

                                        <div className="flex items-center gap-3">

                                            <label className="font-semibold text-gray-700">

                                                Update Status:

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
                                                    className="appearance-none border border-gray-300 rounded-xl px-4 py-3 pr-10 font-semibold text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:bg-gray-100"
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
                                                    size={18}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                                                />

                                            </div>

                                            {updatingOrderId === order.id && (

                                                <Loader2
                                                    size={22}
                                                    className="animate-spin text-orange-500"
                                                />

                                            )}

                                        </div>

                                    </div>

                                </div>

                                {/* Customer */}

                                <div className="mt-6">

                                    <p className="text-sm text-gray-500">
                                        Customer ID
                                    </p>

                                    <p className="font-semibold text-gray-800 mt-1">

                                        {order.customerId}

                                    </p>

                                </div>

                                {/* Ordered Items */}

                                <div className="mt-6">

                                    <div className="flex items-center gap-2 mb-4">

                                        <PackageCheck
                                            size={21}
                                            className="text-orange-500"
                                        />

                                        <h3 className="text-lg font-bold text-gray-900">

                                            Ordered Items

                                        </h3>

                                    </div>

                                    <div className="space-y-3">

                                        {order.items?.map(item => (

                                            <div
                                                key={item.menuId}
                                                className="bg-gray-50 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                                            >

                                                <div>

                                                    <p className="font-bold text-gray-900">

                                                        {item.title}

                                                    </p>

                                                    <p className="text-gray-500 text-sm mt-1">

                                                        ₹
                                                        {Number(
                                                            item.price || 0
                                                        ).toFixed(2)}
                                                        {" × "}
                                                        {item.quantity}

                                                    </p>

                                                </div>

                                                <div className="flex items-center gap-1 text-orange-500 font-bold">

                                                    <IndianRupee
                                                        size={18}
                                                    />

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

                                {/* Total */}

                                <div className="border-t mt-6 pt-6 flex justify-between items-center">

                                    <span className="text-lg font-semibold text-gray-700">

                                        Order Total

                                    </span>

                                    <div className="flex items-center gap-1 text-orange-500">

                                        <IndianRupee size={24}/>

                                        <span className="text-3xl font-extrabold">

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

