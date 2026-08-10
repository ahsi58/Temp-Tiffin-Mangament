import { useEffect, useState } from "react";
import {
    ShoppingCart,
    Plus,
    Minus,
    Trash2,
    Trash,
    IndianRupee,
    ArrowRight,
    Loader2,
    ReceiptText
} from "lucide-react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
    getCart,
    updateCartItem,
    removeFromCart,
    clearCart
} from "../../api/cartApi";

// ============================================================
// Sharwari's work - Customer Cart Page
// ============================================================

function Cart() {

    const navigate = useNavigate();

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updatingItem, setUpdatingItem] = useState(null);
    const [clearingCart, setClearingCart] = useState(false);

    // ============================================================
    // Sharwari's work - Load customer's cart
    // ============================================================

    const loadCart = async () => {

        try {

            setLoading(true);

            const response = await getCart();

            console.log("Cart:", response.data);

            setCart(response.data);

        } catch (error) {

            console.error("Failed to load cart:", error);

            const message =
                error.response?.data?.message ||
                "Failed to load cart";

            toast.error(message);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadCart();

    }, []);

    // ============================================================
    // Sharwari's work - Update item quantity
    // ============================================================

    const handleQuantityChange = async (menuId, quantity) => {

        if (quantity < 1) {
            return;
        }

        try {

            setUpdatingItem(menuId);

            const response = await updateCartItem(menuId, quantity);

            setCart(response.data);

        } catch (error) {

            console.error("Failed to update cart item:", error);

            const message =
                error.response?.data?.message ||
                "Failed to update quantity";

            toast.error(message);

        } finally {

            setUpdatingItem(null);

        }

    };

    // ============================================================
    // Sharwari's work - Remove item
    // ============================================================

    const handleRemoveItem = async (menuId) => {

        try {

            setUpdatingItem(menuId);

            const response = await removeFromCart(menuId);

            setCart(response.data);

            toast.success("Item removed from cart");

        } catch (error) {

            console.error("Failed to remove cart item:", error);

            const message =
                error.response?.data?.message ||
                "Failed to remove item";

            toast.error(message);

        } finally {

            setUpdatingItem(null);

        }

    };

    // ============================================================
    // Sharwari's work - Clear cart
    // ============================================================

    const handleClearCart = async () => {

        try {

            setClearingCart(true);

            await clearCart();

            setCart({
                ...cart,
                items: [],
                totalAmount: 0
            });

            toast.success("Cart cleared");

        } catch (error) {

            console.error("Failed to clear cart:", error);

            const message =
                error.response?.data?.message ||
                "Failed to clear cart";

            toast.error(message);

        } finally {

            setClearingCart(false);

        }

    };

    // ============================================================
    // Loading state
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
                        Loading your cart...
                    </p>

                </div>

            </DashboardLayout>

        );

    }

    const items = cart?.items || [];

    // ============================================================
    // Empty cart
    // ============================================================

    if (items.length === 0) {

        return (

            <DashboardLayout>

                <div className="max-w-5xl mx-auto">

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm min-h-[430px] flex flex-col items-center justify-center text-center px-6">

                        <div className="w-20 h-20 rounded-2xl bg-orange-50 flex items-center justify-center mb-5">

                            <ShoppingCart
                                size={38}
                                className="text-orange-500"
                            />

                        </div>

                        <h1 className="text-2xl font-bold text-gray-900">
                            Your Cart is Empty
                        </h1>

                        <p className="text-sm text-gray-500 mt-2 max-w-md">
                            Add some delicious meals from the weekly menu
                            to place your order.
                        </p>

                        <button
                            onClick={() => navigate("/customer/menu")}
                            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all shadow-sm"
                        >

                            Browse Menu

                            <ArrowRight size={17} />

                        </button>

                    </div>

                </div>

            </DashboardLayout>

        );

    }

    // ============================================================
    // Cart
    // ============================================================

    const totalQuantity = items.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (

        <DashboardLayout>

            <div className="max-w-7xl mx-auto space-y-6">

                {/* Page Header */}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <div>

                        <p className="text-xs font-bold tracking-wider text-orange-500 uppercase">
                            YOUR ORDER
                        </p>

                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                            Your Cart
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Review your selected meals before checkout.
                        </p>

                    </div>

                    <div className="inline-flex self-start sm:self-auto items-center gap-2 bg-orange-50 border border-orange-100 text-orange-600 px-3 py-2 rounded-lg text-sm font-semibold">

                        <ShoppingCart size={17} />

                        {items.length}{" "}
                        {items.length === 1 ? "Item" : "Items"}

                    </div>

                </div>


                {/* Cart Layout */}

                <div className="grid lg:grid-cols-3 gap-6">

                    {/* Cart Items */}

                    <div className="lg:col-span-2 space-y-3">

                        {items.map(item => {

                            const itemTotal =
                                Number(item.price) * item.quantity;

                            const isUpdating =
                                updatingItem === item.menuId;

                            return (

                                <div
                                    key={item.menuId}
                                    className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
                                >

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                                        {/* Item Information */}

                                        <div className="min-w-0">

                                            <h2 className="text-base font-bold text-gray-900 truncate">
                                                {item.title}
                                            </h2>

                                            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">

                                                <IndianRupee size={13} />

                                                <span>
                                                    {item.price} per meal
                                                </span>

                                            </div>

                                        </div>


                                        {/* Controls */}

                                        <div className="flex items-center justify-between sm:justify-end gap-4">

                                            {/* Quantity */}

                                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">

                                                <button
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            item.menuId,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                    disabled={
                                                        isUpdating ||
                                                        item.quantity <= 1
                                                    }
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                                                >

                                                    <Minus size={14} />

                                                </button>

                                                <span className="w-9 text-center text-sm font-semibold text-gray-800">

                                                    {isUpdating
                                                        ? "..."
                                                        : item.quantity}

                                                </span>

                                                <button
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            item.menuId,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    disabled={isUpdating}
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 transition"
                                                >

                                                    <Plus size={14} />

                                                </button>

                                            </div>


                                            {/* Item Total */}

                                            <div className="text-right min-w-[75px]">

                                                <p className="text-[11px] text-gray-400">
                                                    Total
                                                </p>

                                                <p className="text-base font-bold text-gray-900">
                                                    ₹{itemTotal.toFixed(2)}
                                                </p>

                                            </div>


                                            {/* Remove */}

                                            <button
                                                onClick={() =>
                                                    handleRemoveItem(
                                                        item.menuId
                                                    )
                                                }
                                                disabled={isUpdating}
                                                className="w-8 h-8 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50 disabled:opacity-40 transition"
                                                title="Remove item"
                                            >

                                                <Trash2 size={16} />

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            );

                        })}

                    </div>


                    {/* Order Summary */}

                    <div className="lg:col-span-1">

                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 lg:sticky lg:top-20">

                            <div className="flex items-center gap-2">

                                <ReceiptText
                                    size={19}
                                    className="text-orange-500"
                                />

                                <h2 className="text-lg font-bold text-gray-900">
                                    Order Summary
                                </h2>

                            </div>


                            <div className="border-t border-gray-100 mt-4 pt-4 space-y-3">

                                <div className="flex justify-between text-sm text-gray-500">

                                    <span>
                                        Items
                                    </span>

                                    <span className="font-medium text-gray-800">
                                        {items.length}
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


                                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">

                                    <span className="text-base font-bold text-gray-900">
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


                            {/* Checkout */}

                            <button
                                onClick={() =>
                                    navigate("/customer/checkout")
                                }
                                className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md"
                            >

                                Proceed to Checkout

                                <ArrowRight size={17} />

                            </button>


                            {/* Clear Cart */}

                            <button
                                onClick={handleClearCart}
                                disabled={clearingCart}
                                className="w-full mt-2.5 border border-red-200 text-red-500 hover:bg-red-50 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                            >

                                <Trash size={16} />

                                {clearingCart
                                    ? "Clearing..."
                                    : "Clear Cart"}

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );
}

export default Cart;