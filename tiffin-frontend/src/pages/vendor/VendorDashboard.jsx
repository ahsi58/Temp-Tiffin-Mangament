import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    ShoppingBag,
    Clock3,
    CheckCircle2,
    IndianRupee,
    ArrowRight,
    Loader2,
    ClipboardList
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { getAllOrders } from "../../api/orderApi";

import toast from "react-hot-toast";


function VendorDashboard() {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);


    // ============================================================
    // Load vendor orders
    // ============================================================

    useEffect(() => {

        loadOrders();

    }, []);


    const loadOrders = async () => {

        try {

            setLoading(true);

            const response = await getAllOrders();

            console.log(
                "Vendor Dashboard Orders:",
                response.data
            );

            setOrders(response.data || []);

        } catch (error) {

            console.error(
                "Failed to load vendor orders:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to load dashboard data"
            );

            setOrders([]);

        } finally {

            setLoading(false);

        }

    };


    // ============================================================
    // Order Statistics
    // ============================================================

    const pendingOrders = orders.filter(
        order =>
            order.status === "PLACED" ||
            order.status === "CONFIRMED"
    ).length;


    const preparingOrders = orders.filter(
        order =>
            order.status === "PREPARING"
    ).length;


    const completedOrders = orders.filter(
        order =>
            order.status === "COMPLETED"
    ).length;


    // ============================================================
    // Revenue
    // ============================================================

    const totalRevenue = orders
        .filter(
            order =>
                order.status === "COMPLETED"
        )
        .reduce(
            (total, order) =>
                total + Number(order.totalAmount || 0),
            0
        );


    // ============================================================
    // Recent Pending Orders
    // ============================================================

    const recentOrders = orders
        .filter(
            order =>
                order.status === "PLACED" ||
                order.status === "CONFIRMED"
        )
        .slice(0, 5);


    return (

        <DashboardLayout>

            <div className="space-y-6">

                {/* ==================================================
                    Header
                   ================================================== */}

                <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl px-6 py-6 text-white shadow-md">

                    <div className="flex items-center justify-between gap-5">

                        <div>

                            <p className="text-xs font-semibold tracking-wider text-orange-100 uppercase">
                                VENDOR PORTAL
                            </p>

                            <h1 className="text-2xl md:text-3xl font-bold mt-1">
                                Vendor Dashboard
                            </h1>

                            <p className="text-sm text-orange-50 mt-2 max-w-xl">
                                Manage your orders and keep track of
                                today's business activity.
                            </p>

                        </div>


                        <div className="hidden sm:flex w-12 h-12 rounded-xl bg-white/15 items-center justify-center">

                            <ClipboardList size={25} />

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    Statistics
                   ================================================== */}

                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">


                    {/* Pending */}

                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">

                        <div className="flex items-center justify-between gap-3">

                            <div>

                                <p className="text-xs font-medium text-gray-500">
                                    Pending Orders
                                </p>

                                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                                    {pendingOrders}
                                </h2>

                            </div>

                            <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">

                                <Clock3
                                    size={19}
                                    className="text-orange-500"
                                />

                            </div>

                        </div>

                    </div>


                    {/* Preparing */}

                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">

                        <div className="flex items-center justify-between gap-3">

                            <div>

                                <p className="text-xs font-medium text-gray-500">
                                    Preparing
                                </p>

                                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                                    {preparingOrders}
                                </h2>

                            </div>

                            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">

                                <ShoppingBag
                                    size={19}
                                    className="text-blue-500"
                                />

                            </div>

                        </div>

                    </div>


                    {/* Completed */}

                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">

                        <div className="flex items-center justify-between gap-3">

                            <div>

                                <p className="text-xs font-medium text-gray-500">
                                    Completed
                                </p>

                                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                                    {completedOrders}
                                </h2>

                            </div>

                            <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">

                                <CheckCircle2
                                    size={19}
                                    className="text-green-500"
                                />

                            </div>

                        </div>

                    </div>


                    {/* Revenue */}

                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">

                        <div className="flex items-center justify-between gap-3">

                            <div className="min-w-0">

                                <p className="text-xs font-medium text-gray-500">
                                    Total Revenue
                                </p>

                                <h2 className="text-xl font-bold text-gray-900 mt-1 truncate">
                                    ₹{totalRevenue.toFixed(2)}
                                </h2>

                            </div>

                            <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">

                                <IndianRupee
                                    size={19}
                                    className="text-purple-500"
                                />

                            </div>

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    Pending Orders
                   ================================================== */}

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm">

                    {/* Header */}

                    <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-4">

                        <div>

                            <div className="flex items-center gap-2">

                                <ShoppingBag
                                    size={19}
                                    className="text-orange-500"
                                />

                                <h2 className="text-lg font-bold text-gray-900">
                                    Pending Orders
                                </h2>

                            </div>

                            <p className="text-xs text-gray-500 mt-1">
                                Orders that need your attention
                            </p>

                        </div>


                        <button
                            onClick={() =>
                                navigate("/vendor/orders")
                            }
                            className="text-orange-500 hover:text-orange-600 text-sm font-semibold flex items-center gap-1 transition"
                        >

                            View All

                            <ArrowRight size={15} />

                        </button>

                    </div>


                    {/* Loading */}

                    {loading ? (

                        <div className="py-12 flex flex-col items-center justify-center">

                            <Loader2
                                size={28}
                                className="animate-spin text-orange-500"
                            />

                            <p className="text-xs text-gray-500 mt-2">
                                Loading orders...
                            </p>

                        </div>


                    ) : recentOrders.length === 0 ? (


                        /* Empty State */

                        <div className="py-12 text-center">

                            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mx-auto">

                                <ShoppingBag
                                    size={24}
                                    className="text-gray-300"
                                />

                            </div>

                            <p className="mt-3 text-sm font-medium text-gray-600">
                                No pending orders
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                                New customer orders will appear here.
                            </p>

                        </div>


                    ) : (


                        /* Pending Orders */

                        <div className="divide-y divide-gray-100">

                            {recentOrders.map(order => (

                                <div
                                    key={order.id}
                                    className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-gray-50/70 transition"
                                >

                                    {/* Order Information */}

                                    <div className="min-w-0">

                                        <div className="flex items-center gap-2">

                                            <h3 className="text-sm font-bold text-gray-900">
                                                Order #{order.id}
                                            </h3>

                                            <span
                                                className={`px-2 py-1 rounded-full text-[11px] font-semibold ${
                                                    order.status === "PLACED"
                                                        ? "bg-blue-50 text-blue-700"
                                                        : "bg-indigo-50 text-indigo-700"
                                                }`}
                                            >
                                                {order.status}
                                            </span>

                                        </div>

                                        <p className="text-xs text-gray-500 mt-1">
                                            Customer #{order.customerId}
                                        </p>

                                    </div>


                                    {/* Amount + Action */}

                                    <div className="flex items-center justify-between sm:justify-end gap-4">

                                        <div className="flex items-center gap-1 text-sm font-bold text-gray-900">

                                            <IndianRupee size={15} />

                                            {Number(
                                                order.totalAmount || 0
                                            ).toFixed(2)}

                                        </div>

                                        <button
                                            onClick={() =>
                                                navigate("/vendor/orders")
                                            }
                                            className="text-xs font-semibold text-orange-500 hover:text-orange-600"
                                        >
                                            Manage
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>


            </div>

        </DashboardLayout>

    );

}

export default VendorDashboard;

