import { useEffect, useState } from "react";

import {
    ShoppingBag,
    IndianRupee,
    CalendarDays,
    ChevronRight,
    Loader2,
    PackageCheck,
    ClipboardList
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
    // Load Customer Order History
    // ============================================================

    useEffect(() => {

        const loadOrders = async () => {

            try {

                setLoading(true);

                const response =
                    await getOrderHistory();

                console.log(
                    "Customer Orders:",
                    response.data
                );

                setOrders(
                    response.data || []
                );

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
    // Status Styling
    // ============================================================

    const getStatusStyle = (status) => {

        switch (status) {

            case "PLACED":
                return "bg-blue-50 text-blue-700 border border-blue-100";

            case "CONFIRMED":
                return "bg-indigo-50 text-indigo-700 border border-indigo-100";

            case "PREPARING":
                return "bg-orange-50 text-orange-700 border border-orange-100";

            case "READY":
                return "bg-green-50 text-green-700 border border-green-100";

            case "COMPLETED":
                return "bg-gray-50 text-gray-700 border border-gray-200";

            case "CANCELLED":
                return "bg-red-50 text-red-700 border border-red-100";

            default:
                return "bg-gray-50 text-gray-700 border border-gray-200";

        }

    };


    // ============================================================
    // Format Order Date
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
    // Loading State
    // ============================================================

    if (loading) {

        return (

            <DashboardLayout>

                <div className="min-h-[400px] flex items-center justify-center">

                    <div className="text-center">

                        <div className="w-10 h-10 mx-auto rounded-full border-4 border-orange-100 border-t-orange-500 animate-spin" />

                        <p className="text-sm text-gray-500 mt-3">

                            Loading your orders...

                        </p>

                    </div>

                </div>

            </DashboardLayout>

        );

    }


    // ============================================================
    // Empty Orders
    // ============================================================

    if (orders.length === 0) {

        return (

            <DashboardLayout>

                <div className="max-w-5xl mx-auto">

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center px-6">

                        <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mb-5">

                            <ShoppingBag
                                size={30}
                                className="text-orange-500"
                            />

                        </div>


                        <p className="text-[10px] font-bold tracking-widest text-orange-500 uppercase">

                            ORDER HISTORY

                        </p>


                        <h1 className="text-2xl font-bold text-gray-900 mt-1">

                            No Orders Yet

                        </h1>


                        <p className="text-sm text-gray-500 mt-2 max-w-md">

                            You haven't placed any orders yet.
                            Browse the weekly menu and enjoy
                            freshly prepared homemade meals.

                        </p>


                        <button
                            onClick={() =>
                                navigate("/customer/menu")
                            }
                            className="mt-6 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md"
                        >

                            <ShoppingBag size={16} />

                            Browse Menu

                        </button>

                    </div>

                </div>

            </DashboardLayout>

        );

    }


    // ============================================================
    // Orders Page
    // ============================================================

    return (

        <DashboardLayout>

            <div className="max-w-6xl mx-auto space-y-5">


                {/* ==================================================
                    Page Header
                   ================================================== */}

                <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl px-6 py-5 text-white shadow-md">

                    <div className="flex items-center justify-between gap-4">

                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">

                                <ShoppingBag size={23} />

                            </div>


                            <div>

                                <p className="text-[10px] font-bold tracking-widest text-orange-100 uppercase">

                                    ORDER HISTORY

                                </p>


                                <h1 className="text-2xl md:text-3xl font-bold">

                                    My Orders

                                </h1>


                                <p className="text-sm text-orange-50 mt-1">

                                    View your current and previous tiffin orders.

                                </p>

                            </div>

                        </div>


                        <div className="hidden sm:flex items-center gap-2 bg-white/15 px-3 py-2 rounded-lg text-xs font-semibold">

                            <ClipboardList size={15} />

                            {orders.length}{" "}
                            {orders.length === 1
                                ? "Order"
                                : "Orders"}

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    Small Summary Card
                   ================================================== */}

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-5 py-3.5 flex items-center gap-3">

                    <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">

                        <PackageCheck
                            size={18}
                            className="text-orange-500"
                        />

                    </div>


                    <div>

                        <p className="text-xs font-semibold text-gray-800">

                            Your order history

                        </p>


                        <p className="text-[11px] text-gray-500 mt-0.5">

                            Track your recent meals and order status.

                        </p>

                    </div>

                </div>


                {/* ==================================================
                    Order List
                   ================================================== */}

                <div className="space-y-4">

                    {orders.map(order => (

                        <div
                            key={order.id}
                            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
                        >

                            <div className="p-5">

                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">


                                    {/* ==================================================
                                        Order Information
                                       ================================================== */}

                                    <div className="flex-1 min-w-0">

                                        <div className="flex flex-wrap items-center gap-2.5">

                                            <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">

                                                <ShoppingBag
                                                    size={17}
                                                    className="text-orange-500"
                                                />

                                            </div>


                                            <div>

                                                <p className="text-[11px] text-gray-500">

                                                    Order

                                                </p>


                                                <h2 className="text-base font-bold text-gray-900">

                                                    #{order.id}

                                                </h2>

                                            </div>


                                            <span
                                                className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${getStatusStyle(order.status)}`}
                                            >

                                                {order.status}

                                            </span>

                                        </div>


                                        {/* Date + Items */}

                                        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">

                                            <div className="flex items-center gap-1.5 text-xs text-gray-500">

                                                <CalendarDays
                                                    size={14}
                                                />

                                                <span>
                                                    {formatDate(
                                                        order.orderDate
                                                    )}
                                                </span>

                                            </div>


                                            <div className="flex items-center gap-1.5 text-xs text-gray-500">

                                                <PackageCheck
                                                    size={14}
                                                />

                                                <span>

                                                    {order.items?.length || 0}{" "}

                                                    {order.items?.length === 1
                                                        ? "item"
                                                        : "items"}

                                                </span>

                                            </div>

                                        </div>

                                    </div>


                                    {/* ==================================================
                                        Amount + Details
                                       ================================================== */}

                                    <div className="flex items-center justify-between lg:justify-end gap-5 border-t lg:border-t-0 border-gray-100 pt-4 lg:pt-0">


                                        <div>

                                            <p className="text-[11px] text-gray-500">

                                                Total Amount

                                            </p>


                                            <div className="flex items-center text-orange-500 mt-0.5">

                                                <IndianRupee
                                                    size={17}
                                                />


                                                <span className="text-lg font-extrabold">

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
                                            className="w-9 h-9 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 flex items-center justify-center transition-all"
                                            title="View order"
                                        >

                                            <ChevronRight
                                                size={19}
                                            />

                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </DashboardLayout>

    );

}


export default Orders;


// ============================================================
// End of Sharwari's work
// ============================================================

