import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    ShoppingBag,
    Clock,
    CheckCircle,
    IndianRupee
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
    //
    // Revenue is calculated only from completed orders.
    // Cancelled / pending / preparing orders are not included.
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

            <div className="space-y-8">


                {/* ==================================================
                    Dashboard Header
                   ================================================== */}

                <div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Vendor Dashboard
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Manage your orders and track your
                        business activity.
                    </p>

                </div>



                {/* ==================================================
                    Statistics Cards
                   ================================================== */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">


                    {/* ==================================================
                        Pending Orders
                       ================================================== */}

                    <div className="bg-white rounded-2xl shadow-md p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500">
                                    Pending Orders
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {pendingOrders}
                                </h2>

                            </div>


                            <div className="bg-orange-100 p-4 rounded-xl">

                                <Clock
                                    size={28}
                                    className="text-orange-500"
                                />

                            </div>

                        </div>

                    </div>



                    {/* ==================================================
                        Preparing Orders
                       ================================================== */}

                    <div className="bg-white rounded-2xl shadow-md p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500">
                                    Preparing
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {preparingOrders}
                                </h2>

                            </div>


                            <div className="bg-blue-100 p-4 rounded-xl">

                                <ShoppingBag
                                    size={28}
                                    className="text-blue-500"
                                />

                            </div>

                        </div>

                    </div>



                    {/* ==================================================
                        Completed Orders
                       ================================================== */}

                    <div className="bg-white rounded-2xl shadow-md p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500">
                                    Completed Orders
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {completedOrders}
                                </h2>

                            </div>


                            <div className="bg-green-100 p-4 rounded-xl">

                                <CheckCircle
                                    size={28}
                                    className="text-green-500"
                                />

                            </div>

                        </div>

                    </div>



                    {/* ==================================================
                        Total Revenue
                       ================================================== */}

                    <div className="bg-white rounded-2xl shadow-md p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500">
                                    Total Revenue
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    ₹{totalRevenue.toFixed(2)}
                                </h2>

                            </div>


                            <div className="bg-purple-100 p-4 rounded-xl">

                                <IndianRupee
                                    size={28}
                                    className="text-purple-500"
                                />

                            </div>

                        </div>

                    </div>


                </div>



                {/* ==================================================
                    Pending Orders
                   ================================================== */}

                <div className="bg-white rounded-2xl shadow-md p-6">


                    {/* ==================================================
                        Section Header
                       ================================================== */}

                    <div className="flex items-center justify-between mb-6">

                        <div>

                            <h2 className="text-2xl font-bold">
                                Pending Orders
                            </h2>

                            <p className="text-gray-500 mt-1">
                                Orders that need your attention
                            </p>

                        </div>


                        <button
                            onClick={() =>
                                navigate("/vendor/orders")
                            }
                            className="text-orange-500 font-semibold hover:underline"
                        >
                            View All
                        </button>

                    </div>



                    {/* ==================================================
                        Loading State
                       ================================================== */}

                    {loading ? (

                        <div className="py-10 text-center">

                            <p className="text-gray-500">
                                Loading orders...
                            </p>

                        </div>


                    ) : recentOrders.length === 0 ? (


                        /* ==================================================
                            Empty State
                           ================================================== */

                        <div className="py-10 text-center">

                            <ShoppingBag
                                size={45}
                                className="mx-auto text-gray-300"
                            />

                            <p className="mt-4 text-gray-500">
                                No pending orders right now.
                            </p>

                        </div>


                    ) : (


                        /* ==================================================
                            Pending Order List
                           ================================================== */

                        <div className="space-y-4">

                            {recentOrders.map(order => (

                                <div
                                    key={order.id}
                                    className="border rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                                >


                                    {/* ==================================================
                                        Order Information
                                       ================================================== */}

                                    <div>

                                        <h3 className="font-bold text-gray-900">
                                            Order #{order.id}
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Customer #{order.customerId}
                                        </p>

                                    </div>



                                    {/* ==================================================
                                        Status + Amount
                                       ================================================== */}

                                    <div className="flex items-center gap-6">


                                        {/* Status */}

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                order.status === "PLACED"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-indigo-100 text-indigo-700"
                                            }`}
                                        >
                                            {order.status}
                                        </span>


                                        {/* Amount */}

                                        <div className="flex items-center gap-1 font-bold text-orange-500">

                                            <IndianRupee
                                                size={17}
                                            />

                                            {Number(
                                                order.totalAmount || 0
                                            ).toFixed(2)}

                                        </div>


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