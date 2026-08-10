import { useEffect, useState } from "react";

import {
    Users,
    ShoppingBag,
    IndianRupee,
    Clock,
    UserRound,
    UserCheck,
    Loader2,
    ClipboardList
} from "lucide-react";

import toast from "react-hot-toast";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { getAllOrders } from "../../api/orderApi";


function VendorCustomers() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);


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

            setOrders(response.data || []);

        } catch (error) {

            console.error(
                "Failed to load customer data:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to load customers"
            );

            setOrders([]);

        } finally {

            setLoading(false);

        }

    };


    // ============================================================
    // Build customer information from orders
    // ============================================================

    const customerMap = {};


    orders.forEach((order) => {

        const customerId = order.customerId;

        if (!customerId) {
            return;
        }


        if (!customerMap[customerId]) {

            customerMap[customerId] = {

                customerId,

                orderCount: 0,

                totalSpent: 0,

                lastOrderDate: null,

                lastOrderStatus: null

            };

        }


        const customer =
            customerMap[customerId];


        customer.orderCount += 1;


        customer.totalSpent +=
            Number(order.totalAmount || 0);


        const orderDate =
            order.createdAt ||
            order.orderDate;


        if (
            orderDate &&
            (
                !customer.lastOrderDate ||
                new Date(orderDate) >
                new Date(customer.lastOrderDate)
            )
        ) {

            customer.lastOrderDate = orderDate;

            customer.lastOrderStatus =
                order.status;

        }

    });


    const customers =
        Object.values(customerMap);


    // ============================================================
    // Statistics
    // ============================================================

    const totalCustomers =
        customers.length;


    const totalOrders =
        orders.length;


    const activeCustomers =
        customers.filter(
            customer =>
                customer.lastOrderStatus !==
                "CANCELLED"
        ).length;


    // ============================================================
    // Format date
    // ============================================================

    const formatDate = (date) => {

        if (!date) {
            return "N/A";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    // ============================================================
    // Status styling
    // ============================================================

    const getStatusStyle = (status) => {

        switch (status) {

            case "COMPLETED":
                return "bg-green-50 text-green-700 border-green-100";

            case "CANCELLED":
                return "bg-red-50 text-red-700 border-red-100";

            case "READY":
                return "bg-emerald-50 text-emerald-700 border-emerald-100";

            case "PREPARING":
                return "bg-orange-50 text-orange-700 border-orange-100";

            case "CONFIRMED":
                return "bg-indigo-50 text-indigo-700 border-indigo-100";

            case "PLACED":
                return "bg-blue-50 text-blue-700 border-blue-100";

            default:
                return "bg-gray-50 text-gray-600 border-gray-100";

        }

    };


    // ============================================================
    // Loading state
    // ============================================================

    if (loading) {

        return (

            <DashboardLayout>

                <div className="min-h-[400px] flex flex-col items-center justify-center">

                    <Loader2
                        size={30}
                        className="animate-spin text-orange-500"
                    />

                    <p className="text-sm text-gray-500 mt-3">
                        Loading customers...
                    </p>

                </div>

            </DashboardLayout>

        );

    }


    return (

        <DashboardLayout>

            <div className="space-y-6">


                {/* ==================================================
                    Header
                   ================================================== */}

                <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl px-6 py-5 text-white shadow-md">

                    <div className="flex items-center justify-between gap-4">

                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">

                                <Users size={23} />

                            </div>

                            <div>

                                <p className="text-xs font-semibold tracking-wider text-orange-100 uppercase">
                                    CUSTOMER MANAGEMENT
                                </p>

                                <h1 className="text-2xl md:text-3xl font-bold">
                                    Customers
                                </h1>

                                <p className="text-sm text-orange-50 mt-1">
                                    View customer activity and order history.
                                </p>

                            </div>

                        </div>


                        <div className="hidden sm:flex items-center gap-2 bg-white/15 px-3 py-2 rounded-lg text-sm font-semibold">

                            <UserRound size={16} />

                            {totalCustomers}

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    Statistics
                   ================================================== */}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">


                    {/* Total Customers */}

                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">

                        <div className="flex items-center justify-between gap-3">

                            <div>

                                <p className="text-xs font-medium text-gray-500">
                                    Total Customers
                                </p>

                                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                                    {totalCustomers}
                                </h2>

                            </div>


                            <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">

                                <Users
                                    size={19}
                                    className="text-orange-500"
                                />

                            </div>

                        </div>

                    </div>


                    {/* Total Orders */}

                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">

                        <div className="flex items-center justify-between gap-3">

                            <div>

                                <p className="text-xs font-medium text-gray-500">
                                    Total Orders
                                </p>

                                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                                    {totalOrders}
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


                    {/* Active Customers */}

                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">

                        <div className="flex items-center justify-between gap-3">

                            <div>

                                <p className="text-xs font-medium text-gray-500">
                                    Active Customers
                                </p>

                                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                                    {activeCustomers}
                                </h2>

                            </div>


                            <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">

                                <UserCheck
                                    size={19}
                                    className="text-green-500"
                                />

                            </div>

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    Customer Overview
                   ================================================== */}

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">


                    {/* Section Header */}

                    <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">

                        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">

                            <ClipboardList
                                size={17}
                                className="text-orange-500"
                            />

                        </div>

                        <div>

                            <h2 className="text-base font-bold text-gray-900">
                                Customer Overview
                            </h2>

                            <p className="text-xs text-gray-500 mt-0.5">
                                Customers based on their order activity.
                            </p>

                        </div>

                    </div>


                    {/* Empty State */}

                    {customers.length === 0 ? (

                        <div className="py-14 text-center">

                            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mx-auto">

                                <Users
                                    size={24}
                                    className="text-gray-300"
                                />

                            </div>

                            <p className="mt-3 text-sm font-medium text-gray-600">
                                No customers yet
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                                Customers will appear after their first order.
                            </p>

                        </div>

                    ) : (

                        <div className="overflow-x-auto">

                            <table className="w-full">


                                {/* Table Header */}

                                <thead className="bg-gray-50/80">

                                    <tr>

                                        <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-gray-500">
                                            Customer
                                        </th>

                                        <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-gray-500">
                                            Orders
                                        </th>

                                        <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-gray-500">
                                            Total Spent
                                        </th>

                                        <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-gray-500">
                                            Last Order
                                        </th>

                                        <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-gray-500">
                                            Status
                                        </th>

                                    </tr>

                                </thead>


                                {/* Table Body */}

                                <tbody className="divide-y divide-gray-100">

                                    {customers.map(
                                        (customer) => (

                                            <tr
                                                key={
                                                    customer.customerId
                                                }
                                                className="hover:bg-orange-50/30 transition"
                                            >


                                                {/* Customer */}

                                                <td className="px-5 py-3.5">

                                                    <div className="flex items-center gap-2.5">

                                                        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">

                                                            <Users
                                                                size={16}
                                                                className="text-orange-500"
                                                            />

                                                        </div>


                                                        <div>

                                                            <p className="text-sm font-semibold text-gray-900">

                                                                Customer #

                                                                {
                                                                    customer.customerId
                                                                }

                                                            </p>

                                                            <p className="text-[11px] text-gray-400">
                                                                Registered customer
                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* Orders */}

                                                <td className="px-5 py-3.5">

                                                    <div className="flex items-center gap-1.5">

                                                        <ShoppingBag
                                                            size={15}
                                                            className="text-gray-400"
                                                        />

                                                        <span className="text-sm font-semibold text-gray-700">

                                                            {
                                                                customer.orderCount
                                                            }

                                                        </span>

                                                    </div>

                                                </td>


                                                {/* Total Spent */}

                                                <td className="px-5 py-3.5">

                                                    <div className="flex items-center gap-0.5 text-sm font-semibold text-gray-800">

                                                        <IndianRupee
                                                            size={14}
                                                        />

                                                        {
                                                            customer.totalSpent.toFixed(
                                                                2
                                                            )
                                                        }

                                                    </div>

                                                </td>


                                                {/* Last Order */}

                                                <td className="px-5 py-3.5">

                                                    <div className="flex items-center gap-1.5 text-sm text-gray-600">

                                                        <Clock
                                                            size={14}
                                                            className="text-gray-400"
                                                        />

                                                        {
                                                            formatDate(
                                                                customer.lastOrderDate
                                                            )
                                                        }

                                                    </div>

                                                </td>


                                                {/* Status */}

                                                <td className="px-5 py-3.5">

                                                    <span
                                                        className={`inline-flex px-2.5 py-1 rounded-full border text-[11px] font-bold ${getStatusStyle(
                                                            customer.lastOrderStatus
                                                        )}`}
                                                    >

                                                        {
                                                            customer.lastOrderStatus ||
                                                            "N/A"
                                                        }

                                                    </span>

                                                </td>


                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </DashboardLayout>

    );

}


export default VendorCustomers;

