import { useEffect, useState } from "react";
import {
    ShoppingBag,
    IndianRupee,
    CalendarDays,
    ChevronRight,
    Loader2,
    PackageCheck
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { getOrderHistory } from "../../api/orderApi";

// ============================================================
// Sharwari's work - Customer Orders Page
// ============================================================

function Orders() {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // ============================================================
    // Sharwari's work - Load customer order history
    // ============================================================

    useEffect(() => {

        const loadOrders = async () => {

            try {

                setLoading(true);

                const response = await getOrderHistory();

                console.log("Customer Orders:", response.data);

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

        loadOrders();

    }, []);

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
    // Sharwari's work - Loading state
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

    // ============================================================
    // Sharwari's work - Empty orders
    // ============================================================

    if (orders.length === 0) {

        return (

            <DashboardLayout>

                <div className="bg-white rounded-3xl shadow-md p-10 min-h-[500px] flex flex-col items-center justify-center text-center">

                    <div className="bg-orange-100 rounded-full p-6 mb-6">

                        <ShoppingBag
                            size={70}
                            className="text-orange-500"
                        />

                    </div>

                    <h1 className="text-4xl font-extrabold text-gray-900">

                        No Orders Yet

                    </h1>

                    <p className="text-gray-600 text-lg mt-4 max-w-lg">

                        You haven't placed any orders yet.
                        Browse our weekly menu and enjoy
                        freshly prepared homemade meals.

                    </p>

                    <button
                        onClick={() =>
                            navigate("/customer/menu")
                        }
                        className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold"
                    >

                        Browse Menu

                    </button>

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <div className="space-y-8">

                {/* =================================================
                    Sharwari's work - Orders Header
                    ================================================= */}

                <div className="bg-white rounded-3xl shadow-md p-8">

                    <div className="flex items-center gap-4">

                        <div className="bg-orange-100 p-4 rounded-2xl">

                            <ShoppingBag
                                size={32}
                                className="text-orange-500"
                            />

                        </div>

                        <div>

                            <h1 className="text-5xl font-extrabold text-gray-900">

                                My Orders

                            </h1>

                            <p className="mt-2 text-lg text-gray-600">

                                View your current and previous tiffin orders.

                            </p>

                        </div>

                    </div>

                </div>

                {/* =================================================
                    Sharwari's work - Order List
                    ================================================= */}

                <div className="space-y-5">

                    {
                        orders.map(order => (

                            <div
                                key={order.id}
                                className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all p-7"
                            >

                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                                    {/* Order information */}

                                    <div className="flex-1">

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

                                        <div className="flex flex-wrap gap-6 mt-4 text-gray-500">

                                            <div className="flex items-center gap-2">

                                                <CalendarDays size={18}/>

                                                <span>
                                                    {formatDate(order.orderDate)}
                                                </span>

                                            </div>

                                            <div className="flex items-center gap-2">

                                                <PackageCheck size={18}/>

                                                <span>

                                                    {order.items?.length || 0}
                                                    {" "}
                                                    {order.items?.length === 1
                                                        ? "item"
                                                        : "items"
                                                    }

                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                    {/* Amount */}

                                    <div className="flex items-center justify-between lg:justify-end gap-8">

                                        <div>

                                            <p className="text-sm text-gray-500">
                                                Total Amount
                                            </p>

                                            <div className="flex items-center text-orange-500 mt-1">

                                                <IndianRupee size={22}/>

                                                <span className="text-2xl font-extrabold">

                                                    {Number(
                                                        order.totalAmount || 0
                                                    ).toFixed(2)}

                                                </span>

                                            </div>

                                        </div>

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/customer/orders/${order.id}`
                                                )
                                            }
                                            className="p-3 rounded-xl bg-orange-100 text-orange-600 hover:bg-orange-200 transition-all"
                                            title="View order"
                                        >

                                            <ChevronRight size={24}/>

                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </div>

        </DashboardLayout>

    );

}

export default Orders;

// ============================================================
// End of Sharwari's work
// ============================================================

