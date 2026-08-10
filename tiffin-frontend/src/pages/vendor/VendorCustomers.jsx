import { useEffect, useState } from "react";
import {
    Users,
    ShoppingBag,
    IndianRupee,
    Clock
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
                customer.lastOrderStatus !== "CANCELLED"
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
    // Loading state
    // ============================================================

    if (loading) {

        return (

            <DashboardLayout>

                <div className="flex items-center justify-center min-h-[400px]">

                    <p className="text-gray-500">
                        Loading customers...
                    </p>

                </div>

            </DashboardLayout>

        );

    }


    return (

        <DashboardLayout>

            <div className="space-y-8">


                {/* ==================================================
                    Header
                   ================================================== */}

                <div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Customers
                    </h1>

                    <p className="mt-2 text-gray-600">
                        View customers who have placed orders
                        with your tiffin service.
                    </p>

                </div>



                {/* ==================================================
                    Statistics
                   ================================================== */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


                    {/* Total Customers */}

                    <div className="bg-white rounded-2xl shadow-md p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500">
                                    Total Customers
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {totalCustomers}
                                </h2>

                            </div>


                            <div className="bg-orange-100 p-4 rounded-xl">

                                <Users
                                    size={28}
                                    className="text-orange-500"
                                />

                            </div>

                        </div>

                    </div>



                    {/* Total Orders */}

                    <div className="bg-white rounded-2xl shadow-md p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500">
                                    Total Orders
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {totalOrders}
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



                    {/* Active Customers */}

                    <div className="bg-white rounded-2xl shadow-md p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500">
                                    Active Customers
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {activeCustomers}
                                </h2>

                            </div>


                            <div className="bg-green-100 p-4 rounded-xl">

                                <Users
                                    size={28}
                                    className="text-green-500"
                                />

                            </div>

                        </div>

                    </div>


                </div>



                {/* ==================================================
                    Customer List
                   ================================================== */}

                <div className="bg-white rounded-2xl shadow-md overflow-hidden">


                    <div className="p-6 border-b">

                        <h2 className="text-2xl font-bold">
                            Customer Overview
                        </h2>

                        <p className="text-gray-500 mt-1">
                            Customers based on their order activity.
                        </p>

                    </div>



                    {customers.length === 0 ? (

                        <div className="py-16 text-center">

                            <Users
                                size={50}
                                className="mx-auto text-gray-300"
                            />

                            <p className="mt-4 text-gray-500">
                                No customers have placed orders yet.
                            </p>

                        </div>

                    ) : (

                        <div className="overflow-x-auto">

                            <table className="w-full">


                                <thead className="bg-gray-50">

                                    <tr>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Customer
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Orders
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Total Spent
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Last Order
                                        </th>

                                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                            Status
                                        </th>

                                    </tr>

                                </thead>


                                <tbody className="divide-y">


                                    {customers.map(
                                        (customer) => (

                                            <tr
                                                key={
                                                    customer.customerId
                                                }
                                                className="hover:bg-gray-50"
                                            >


                                                {/* Customer */}

                                                <td className="px-6 py-4">

                                                    <div className="flex items-center gap-3">

                                                        <div className="bg-orange-100 p-2 rounded-full">

                                                            <Users
                                                                size={18}
                                                                className="text-orange-500"
                                                            />

                                                        </div>


                                                        <div>

                                                            <p className="font-semibold text-gray-900">
                                                                Customer #
                                                                {
                                                                    customer.customerId
                                                                }
                                                            </p>

                                                            <p className="text-sm text-gray-500">
                                                                Customer
                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>



                                                {/* Orders */}

                                                <td className="px-6 py-4">

                                                    <div className="flex items-center gap-2">

                                                        <ShoppingBag
                                                            size={17}
                                                            className="text-gray-400"
                                                        />

                                                        <span className="font-medium">
                                                            {
                                                                customer.orderCount
                                                            }
                                                        </span>

                                                    </div>

                                                </td>



                                                {/* Total Spent */}

                                                <td className="px-6 py-4">

                                                    <div className="flex items-center gap-1 font-semibold">

                                                        <IndianRupee
                                                            size={16}
                                                        />

                                                        {
                                                            customer.totalSpent.toFixed(
                                                                2
                                                            )
                                                        }

                                                    </div>

                                                </td>



                                                {/* Last Order */}

                                                <td className="px-6 py-4">

                                                    <div className="flex items-center gap-2">

                                                        <Clock
                                                            size={16}
                                                            className="text-gray-400"
                                                        />

                                                        <span>
                                                            {
                                                                formatDate(
                                                                    customer.lastOrderDate
                                                                )
                                                            }
                                                        </span>

                                                    </div>

                                                </td>



                                                {/* Status */}

                                                <td className="px-6 py-4">

                                                    <span
                                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                            customer.lastOrderStatus ===
                                                            "COMPLETED"
                                                                ? "bg-green-100 text-green-700"
                                                                : customer.lastOrderStatus ===
                                                                  "CANCELLED"
                                                                ? "bg-red-100 text-red-700"
                                                                : "bg-blue-100 text-blue-700"
                                                        }`}
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