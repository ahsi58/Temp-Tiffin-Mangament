import { useEffect, useState } from "react";
import {
    IndianRupee,
    CreditCard,
    ShoppingCart,
    Loader2,
    CheckCircle2,
    ArrowLeft,
    ShieldCheck,
    ReceiptText
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
    // Loading UI
    // ============================================================

    if (loading) {

        return (

            <DashboardLayout>

                <div className="min-h-[450px] flex flex-col items-center justify-center">

                    <Loader2
                        size={34}
                        className="animate-spin text-orange-500"
                    />

                    <p className="mt-3 text-sm text-gray-500">
                        Preparing your checkout...
                    </p>

                </div>

            </DashboardLayout>

        );

    }

    if (!cart) {

        return null;

    }

    const totalQuantity = cart.items.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

    return (

        <DashboardLayout>

            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}

                <section className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl px-7 py-6 text-white shadow-md">

                    <button
                        onClick={() =>
                            navigate("/customer/cart")
                        }
                        className="flex items-center gap-2 text-orange-50 hover:text-white text-sm font-medium mb-4 transition"
                    >

                        <ArrowLeft size={17} />

                        Back to Cart

                    </button>

                    <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">

                            <CreditCard size={23} />

                        </div>

                        <div>

                            <p className="text-xs font-semibold tracking-wider text-orange-100 uppercase">
                                FINAL STEP
                            </p>

                            <h1 className="text-2xl md:text-3xl font-bold">
                                Checkout
                            </h1>

                        </div>

                    </div>

                    <p className="mt-3 text-sm text-orange-50">
                        Review your meals and complete your secure payment.
                    </p>

                </section>


                {/* Checkout Content */}

                <div className="grid lg:grid-cols-3 gap-6">

                    {/* Order Items */}

                    <div className="lg:col-span-2">

                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">

                            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">

                                <div className="flex items-center gap-2">

                                    <ShoppingCart
                                        size={19}
                                        className="text-orange-500"
                                    />

                                    <h2 className="text-lg font-bold text-gray-900">
                                        Order Items
                                    </h2>

                                </div>

                                <span className="text-xs font-medium text-gray-500">
                                    {totalQuantity}{" "}
                                    {totalQuantity === 1
                                        ? "meal"
                                        : "meals"}
                                </span>

                            </div>


                            <div className="p-4 space-y-3">

                                {cart.items.map(item => {

                                    const itemTotal =
                                        Number(item.price) *
                                        item.quantity;

                                    return (

                                        <div
                                            key={item.menuId}
                                            className="border border-gray-200 rounded-lg px-4 py-3.5"
                                        >

                                            <div className="flex items-center justify-between gap-4">

                                                <div className="min-w-0">

                                                    <h3 className="text-sm font-bold text-gray-900 truncate">
                                                        {item.title}
                                                    </h3>

                                                    <p className="text-xs text-gray-500 mt-1">

                                                        ₹{item.price}
                                                        {" "}×{" "}
                                                        {item.quantity}

                                                    </p>

                                                </div>

                                                <div className="flex items-center gap-1 text-sm font-bold text-gray-900 shrink-0">

                                                    <IndianRupee
                                                        size={14}
                                                    />

                                                    {itemTotal.toFixed(2)}

                                                </div>

                                            </div>

                                        </div>

                                    );

                                })}

                            </div>

                        </div>

                    </div>


                    {/* Payment Summary */}

                    <div>

                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 lg:sticky lg:top-20">

                            <div className="flex items-center gap-2">

                                <ReceiptText
                                    size={19}
                                    className="text-orange-500"
                                />

                                <h2 className="text-lg font-bold text-gray-900">
                                    Payment Summary
                                </h2>

                            </div>


                            <div className="border-t border-gray-100 mt-4 pt-4 space-y-3">

                                <div className="flex justify-between text-sm text-gray-500">

                                    <span>
                                        Total Items
                                    </span>

                                    <span className="font-medium text-gray-800">
                                        {cart.items.length}
                                    </span>

                                </div>

                                <div className="flex justify-between text-sm text-gray-500">

                                    <span>
                                        Total Quantity
                                    </span>

                                    <span className="font-medium text-gray-800">
                                        {totalQuantity}
                                    </span>

                                </div>


                                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">

                                    <span className="font-bold text-gray-900">
                                        Total
                                    </span>

                                    <div className="flex items-center text-xl font-bold text-orange-500">

                                        <IndianRupee size={18} />

                                        {Number(
                                            cart.totalAmount || 0
                                        ).toFixed(2)}

                                    </div>

                                </div>

                            </div>


                            {/* Secure Payment */}

                            <div className="mt-5 bg-green-50 border border-green-100 rounded-lg p-3.5 flex gap-3">

                                <ShieldCheck
                                    size={20}
                                    className="text-green-600 shrink-0"
                                />

                                <div>

                                    <p className="text-xs font-bold text-green-700">
                                        Secure Payment
                                    </p>

                                    <p className="text-xs text-green-600 mt-0.5 leading-5">
                                        Your payment is securely processed
                                        through Razorpay.
                                    </p>

                                </div>

                            </div>


                            {/* Pay Button */}

                            <button
                                onClick={handlePayment}
                                disabled={processingPayment}
                                className="w-full mt-5 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md"
                            >

                                {processingPayment ? (

                                    <>

                                        <Loader2
                                            size={18}
                                            className="animate-spin"
                                        />

                                        Processing Payment...

                                    </>

                                ) : (

                                    <>

                                        <CreditCard size={18} />

                                        Pay ₹
                                        {Number(
                                            cart.totalAmount || 0
                                        ).toFixed(2)}

                                    </>

                                )}

                            </button>


                            <p className="text-[11px] text-gray-400 text-center mt-3">
                                You will be redirected to Razorpay to complete payment.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default Checkout;

