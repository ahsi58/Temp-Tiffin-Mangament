import { useEffect, useState } from "react";
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Clock3,
    IndianRupee,
    Loader2,
    PackageCheck,
    ShoppingBag,
    XCircle
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { getOrderById } from "../../api/orderApi";

// ============================================================
// Sharwari's work - Customer Order Details
// ============================================================

function OrderDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    // ============================================================
    // Sharwari's work - Load order details
    // ============================================================

    useEffect(() => {

        const loadOrder = async () => {

            try {

                setLoading(true);

                const response = await getOrderById(id);

                console.log("Order Details:", response.data);

                setOrder(response.data);

            } catch (error) {

                console.error(
                    "Failed to load order:",
                    error
                );

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load order"
                );

                navigate("/customer/orders");

            } finally {

                setLoading(false);

            }

        };

        loadOrder();

    }, [id, navigate]);

    // ============================================================
    // Sharwari's work - Status configuration
    // ============================================================

    const getStatusConfig = (status) => {

        switch (status) {

            case "PLACED":
                return {
                    label: "Order Placed",
                    icon: Clock3,
                    style: "bg-blue-100 text-blue-700",
                    description:
                        "Your order has been successfully placed."
                };

            case "CONFIRMED":
                return {
                    label: "Order Confirmed",
                    icon: CheckCircle2,
                    style: "bg-indigo-100 text-indigo-700",
                    description:
                        "Your order has been confirmed."
                };

            case "PREPARING":
                return {
                    label: "Preparing",
                    icon: Clock3,
                    style: "bg-orange-100 text-orange-700",
                    description:
                        "Your meal is being prepared."
                };

            case "READY":
                return {
                    label: "Ready",
                    icon: PackageCheck,
                    style: "bg-green-100 text-green-700",
                    description:
                        "Your meal is ready."
                };

            case "COMPLETED":
                return {
                    label: "Completed",
                    icon: CheckCircle2,
                    style: "bg-gray-100 text-gray-700",
                    description:
                        "Your order has been completed."
                };

            case "CANCELLED":
                return {
                    label: "Cancelled",
                    icon: XCircle,
                    style: "bg-red-100 text-red-700",
                    description:
                        "This order has been cancelled."
                };

            default:
                return {
                    label: status || "Unknown",
                    icon: Clock3,
                    style: "bg-gray-100 text-gray-700",
                    description:
                        "Order status is currently unavailable."
                };

        }

    };

    // ============================================================
    // Sharwari's work - Format date
    // ============================================================

    const formatDate = (date) => {

        if (!date) {
            return "Date unavailable";
        }

        return new Date(date).toLocaleString(
            "en-IN",
            {
                day: "numeric",
                month: "long",
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

    if (!order) {
        return null;
    }

    const statusConfig =
        getStatusConfig(order.status);

    const StatusIcon =
        statusConfig.icon;

    return (

        <DashboardLayout>

            <div className="max-w-6xl mx-auto space-y-8">

                {/* =================================================
                    Sharwari's work - Header
                    ================================================= */}

                <div className="bg-white rounded-3xl shadow-md p-8">

                    <button
                        onClick={() =>
                            navigate("/customer/orders")
                        }
                        className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-semibold mb-6"
                    >

                        <ArrowLeft size={20}/>

                        Back to Orders

                    </button>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                        <div className="flex items-center gap-4">

                            <div className="bg-orange-100 p-4 rounded-2xl">

                                <ShoppingBag
                                    size={32}
                                    className="text-orange-500"
                                />

                            </div>

                            <div>

                                <h1 className="text-4xl font-extrabold text-gray-900">

                                    Order #{order.id}

                                </h1>

                                <div className="flex items-center gap-2 text-gray-500 mt-2">

                                    <CalendarDays size={18}/>

                                    <span>
                                        {formatDate(order.orderDate)}
                                    </span>

                                </div>

                            </div>

                        </div>

                        <div
                            className={`px-5 py-3 rounded-full font-bold flex items-center gap-2 ${statusConfig.style}`}
                        >

                            <StatusIcon size={21}/>

                            {statusConfig.label}

                        </div>

                    </div>

                </div>

                {/* =================================================
                    Sharwari's work - Order Status
                    ================================================= */}

                <div className="bg-white rounded-3xl shadow-md p-8">

                    <h2 className="text-2xl font-bold text-gray-900">

                        Order Status

                    </h2>

                    <div className="mt-5 flex items-start gap-4">

                        <div
                            className={`p-3 rounded-full ${statusConfig.style}`}
                        >

                            <StatusIcon size={24}/>

                        </div>

                        <div>

                            <h3 className="text-xl font-bold text-gray-900">

                                {statusConfig.label}

                            </h3>

                            <p className="text-gray-600 mt-1">

                                {statusConfig.description}

                            </p>

                        </div>

                    </div>

                </div>

                {/* =================================================
                    Sharwari's work - Ordered Items
                    ================================================= */}

                <div className="bg-white rounded-3xl shadow-md p-8">

                    <div className="flex items-center gap-3 mb-7">

                        <ShoppingBag
                            size={27}
                            className="text-orange-500"
                        />

                        <h2 className="text-2xl font-bold text-gray-900">

                            Ordered Items

                        </h2>

                    </div>

                    <div className="space-y-4">

                        {
                            order.items?.map(item => (

                                <div
                                    key={item.menuId}
                                    className="border border-gray-200 rounded-2xl p-5"
                                >

                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                                        <div>

                                            <h3 className="text-xl font-bold text-gray-900">

                                                {item.title}

                                            </h3>

                                            <p className="text-gray-500 mt-2">

                                                ₹{Number(
                                                    item.price || 0
                                                ).toFixed(2)}
                                                {" × "}
                                                {item.quantity}

                                            </p>

                                        </div>

                                        <div className="flex items-center gap-1 text-orange-500">

                                            <IndianRupee size={21}/>

                                            <span className="text-xl font-bold">

                                                {(
                                                    Number(item.price || 0) *
                                                    item.quantity
                                                ).toFixed(2)}

                                            </span>

                                        </div>

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                </div>

                {/* =================================================
                    Sharwari's work - Total
                    ================================================= */}

                <div className="bg-white rounded-3xl shadow-md p-8">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div>

                            <p className="text-gray-500">
                                Total Amount
                            </p>

                            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">

                                Order Total

                            </h2>

                        </div>

                        <div className="flex items-center text-orange-500">

                            <IndianRupee size={30}/>

                            <span className="text-4xl font-extrabold">

                                {Number(
                                    order.totalAmount || 0
                                ).toFixed(2)}

                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default OrderDetails;

// ============================================================
// End of Sharwari's work
// ============================================================

