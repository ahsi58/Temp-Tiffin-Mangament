import { useEffect, useState } from "react";
import {
    IndianRupee,
    CreditCard,
    ShoppingCart,
    Loader2,
    CheckCircle2,
    ArrowLeft
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/layout/DashboardLayout";

import { getCart } from "../../api/cartApi";
import {
    createRazorpayOrder,
    verifyPayment
} from "../../api/paymentApi";

// ============================================================
// Sharwari's work - Checkout Page
// ============================================================

function Checkout() {

    const navigate = useNavigate();

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processingPayment, setProcessingPayment] = useState(false);

    // ============================================================
    // Sharwari's work - Load cart
    // ============================================================

    useEffect(() => {

        const loadCart = async () => {

            try {

                setLoading(true);

                const response = await getCart();

                console.log("Checkout Cart:", response.data);

                if (
                    !response.data ||
                    !response.data.items ||
                    response.data.items.length === 0
                ) {

                    toast.error("Your cart is empty");

                    navigate("/customer/cart");

                    return;

                }

                setCart(response.data);

            } catch (error) {

                console.error("Failed to load cart:", error);

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load cart"
                );

                navigate("/customer/cart");

            } finally {

                setLoading(false);

            }

        };

        loadCart();

    }, [navigate]);

    // ============================================================
    // Sharwari's work - Load Razorpay Checkout script
    // ============================================================

    const loadRazorpayScript = () => {

        return new Promise((resolve) => {

            if (window.Razorpay) {

                resolve(true);

                return;

            }

            const script = document.createElement("script");

            script.src =
                "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => resolve(true);

            script.onerror = () => resolve(false);

            document.body.appendChild(script);

        });

    };

    // ============================================================
    // Sharwari's work - Start Razorpay payment
    // ============================================================

    const handlePayment = async () => {

        if (!cart || !cart.items?.length) {

            toast.error("Your cart is empty");

            return;

        }

        try {

            setProcessingPayment(true);

            // ----------------------------------------------------
            // 1. Load Razorpay Checkout
            // ----------------------------------------------------

            const razorpayLoaded =
                await loadRazorpayScript();

            if (!razorpayLoaded) {

                toast.error(
                    "Unable to load Razorpay. Please check your internet connection."
                );

                return;

            }

            // ----------------------------------------------------
            // 2. Create Razorpay order through Cart Service
            // ----------------------------------------------------

            const response =
                await createRazorpayOrder();

            const razorpayOrder =
                response.data;

            console.log(
                "Razorpay Order:",
                razorpayOrder
            );

            // ----------------------------------------------------
            // 3. Razorpay Checkout configuration
            // ----------------------------------------------------

            const options = {

                key: razorpayOrder.razorpayKeyId,

                amount: razorpayOrder.amount,

                currency: razorpayOrder.currency,

                name: "Tiffin Management System",

                description: "Tiffin Meal Order",

                order_id:
                    razorpayOrder.razorpayOrderId,

                handler: async function (paymentResponse) {

                    try {

                        setProcessingPayment(true);

                        // ------------------------------------------------
                        // 4. Verify payment through Cart Service
                        // ------------------------------------------------

                        await verifyPayment({

                            razorpayOrderId:
                                paymentResponse.razorpay_order_id,

                            razorpayPaymentId:
                                paymentResponse.razorpay_payment_id,

                            razorpaySignature:
                                paymentResponse.razorpay_signature

                        });

                        // ------------------------------------------------
                        // 5. Payment + Order successful
                        // ------------------------------------------------

                        toast.success(
                            "Payment successful! Your order has been placed."
                        );

                        navigate(
                            "/customer/orders"
                        );

                    } catch (error) {

                        console.error(
                            "Payment verification failed:",
                            error
                        );

                        toast.error(
                            error.response?.data?.message ||
                            "Payment verification failed"
                        );

                    } finally {

                        setProcessingPayment(false);

                    }

                },

                modal: {

                    ondismiss: function () {

                        setProcessingPayment(false);

                        toast.error(
                            "Payment cancelled"
                        );

                    }

                },

                theme: {

                    color: "#f97316"

                }

            };

            // ----------------------------------------------------
            // 6. Open Razorpay Checkout
            // ----------------------------------------------------

            const razorpay =
                new window.Razorpay(options);

            razorpay.on(
                "payment.failed",
                function (response) {

                    console.error(
                        "Razorpay payment failed:",
                        response.error
                    );

                    toast.error(
                        response.error?.description ||
                        "Payment failed"
                    );

                    setProcessingPayment(false);

                }
            );

            razorpay.open();

        } catch (error) {

            console.error(
                "Payment initialization failed:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Unable to start payment"
            );

            setProcessingPayment(false);

        }

    };

    // ============================================================
    // Sharwari's work - Loading UI
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

    if (!cart) {

        return null;

    }

    // ============================================================
    // Sharwari's work - Checkout UI
    // ============================================================

    return (

        <DashboardLayout>

            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header */}

                <div className="bg-white rounded-3xl shadow-md p-8">

                    <button
                        onClick={() =>
                            navigate("/customer/cart")
                        }
                        className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-semibold mb-5"
                    >

                        <ArrowLeft size={20}/>

                        Back to Cart

                    </button>

                    <h1 className="text-5xl font-extrabold text-gray-900">

                        Checkout

                    </h1>

                    <p className="mt-3 text-lg text-gray-600">

                        Review your order and complete your payment.

                    </p>

                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* =================================================
                        Order Items
                        ================================================= */}

                    <div className="lg:col-span-2">

                        <div className="bg-white rounded-3xl shadow-md p-8">

                            <div className="flex items-center gap-3 mb-7">

                                <ShoppingCart
                                    size={28}
                                    className="text-orange-500"
                                />

                                <h2 className="text-2xl font-bold text-gray-900">

                                    Order Items

                                </h2>

                            </div>

                            <div className="space-y-5">

                                {
                                    cart.items.map(item => (

                                        <div
                                            key={item.menuId}
                                            className="border border-gray-200 rounded-2xl p-5"
                                        >

                                            <div className="flex justify-between items-center gap-5">

                                                <div>

                                                    <h3 className="text-xl font-bold text-gray-900">

                                                        {item.title}

                                                    </h3>

                                                    <p className="text-gray-500 mt-2">

                                                        ₹{item.price} × {item.quantity}

                                                    </p>

                                                </div>

                                                <div className="text-right">

                                                    <p className="text-xl font-bold text-gray-900">

                                                        ₹
                                                        {
                                                            (
                                                                Number(item.price) *
                                                                item.quantity
                                                            ).toFixed(2)
                                                        }

                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    ))
                                }

                            </div>

                        </div>

                    </div>

                    {/* =================================================
                        Payment Summary
                        ================================================= */}

                    <div>

                        <div className="bg-white rounded-3xl shadow-md p-7 sticky top-6">

                            <div className="flex items-center gap-3">

                                <CreditCard
                                    size={27}
                                    className="text-orange-500"
                                />

                                <h2 className="text-2xl font-bold text-gray-900">

                                    Payment

                                </h2>

                            </div>

                            <div className="border-t mt-6 pt-6">

                                <div className="flex justify-between text-gray-600">

                                    <span>
                                        Total Items
                                    </span>

                                    <span>

                                        {
                                            cart.items.reduce(
                                                (total, item) =>
                                                    total + item.quantity,
                                                0
                                            )
                                        }

                                    </span>

                                </div>

                                <div className="border-t mt-5 pt-5 flex justify-between items-center">

                                    <span className="text-xl font-bold">

                                        Total

                                    </span>

                                    <div className="flex items-center text-orange-500">

                                        <IndianRupee size={24}/>

                                        <span className="text-3xl font-extrabold">

                                            {Number(
                                                cart.totalAmount || 0
                                            ).toFixed(2)}

                                        </span>

                                    </div>

                                </div>

                            </div>

                            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3">

                                <CheckCircle2
                                    size={22}
                                    className="text-green-600 flex-shrink-0"
                                />

                                <p className="text-sm text-green-700">

                                    Your payment will be securely processed
                                    through Razorpay.

                                </p>

                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={processingPayment}
                                className="w-full mt-7 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                            >

                                {
                                    processingPayment ? (

                                        <>
                                            <Loader2
                                                size={21}
                                                className="animate-spin"
                                            />

                                            Processing...

                                        </>

                                    ) : (

                                        <>
                                            <CreditCard size={21}/>

                                            Pay ₹
                                            {Number(
                                                cart.totalAmount || 0
                                            ).toFixed(2)}

                                        </>

                                    )
                                }

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default Checkout;

// ============================================================
// End of Sharwari's work
// ============================================================

