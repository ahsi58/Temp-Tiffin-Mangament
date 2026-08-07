import { useEffect, useState } from "react";
import {
    ShoppingCart,
    Plus,
    Minus,
    Trash2,
    Trash,
    IndianRupee,
    ArrowRight,
    Loader2
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

    const items = cart?.items || [];

    // ============================================================
    // Sharwari's work - Empty cart
    // ============================================================

    if (items.length === 0) {

        return (

            <DashboardLayout>

                <div className="bg-white rounded-3xl shadow-md p-10 min-h-[500px] flex flex-col items-center justify-center text-center">

                    <div className="bg-orange-100 rounded-full p-6 mb-6">

                        <ShoppingCart
                            size={70}
                            className="text-orange-500"
                        />

                    </div>

                    <h1 className="text-4xl font-extrabold text-gray-900">

                        Your Cart is Empty

                    </h1>

                    <p className="text-gray-600 text-lg mt-4 max-w-lg">

                        Add some delicious meals from the weekly menu
                        to place your order.

                    </p>

                    <button
                        onClick={() => navigate("/customer/menu")}
                        className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all"
                    >

                        Browse Menu

                        <ArrowRight size={20}/>

                    </button>

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <div className="space-y-8">

                {/* =====================================================
                    Sharwari's work - Cart Header
                    ===================================================== */}

                <div className="bg-white rounded-3xl shadow-md p-8">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                        <div>

                            <h1 className="text-5xl font-extrabold text-gray-900">

                                Your Cart

                            </h1>

                            <p className="mt-3 text-lg text-gray-600">

                                Review your selected meals before checkout.

                            </p>

                        </div>

                        <div className="flex items-center gap-3 text-orange-500">

                            <ShoppingCart size={32}/>

                            <span className="text-xl font-bold">

                                {items.length} {items.length === 1 ? "Item" : "Items"}

                            </span>

                        </div>

                    </div>

                </div>

                {/* =====================================================
                    Sharwari's work - Cart Items
                    ===================================================== */}

                <div className="grid lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 space-y-5">

                        {
                            items.map(item => {

                                const itemTotal =
                                    Number(item.price) * item.quantity;

                                const isUpdating =
                                    updatingItem === item.menuId;

                                return (

                                    <div
                                        key={item.menuId}
                                        className="bg-white rounded-3xl shadow-md p-6"
                                    >

                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                                            <div className="flex-1">

                                                <h2 className="text-2xl font-bold text-gray-900">

                                                    {item.title}

                                                </h2>

                                                <div className="flex items-center gap-1 mt-3 text-gray-600">

                                                    <IndianRupee size={18}/>

                                                    <span>

                                                        {item.price} per meal

                                                    </span>

                                                </div>

                                            </div>

                                            <div className="flex items-center justify-between md:justify-end gap-6">

                                                {/* Quantity */}

                                                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">

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
                                                        className="p-3 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                                                    >

                                                        <Minus size={18}/>

                                                    </button>

                                                    <span className="px-5 font-bold text-lg">

                                                        {isUpdating
                                                            ? "..."
                                                            : item.quantity
                                                        }

                                                    </span>

                                                    <button
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                item.menuId,
                                                                item.quantity + 1
                                                            )
                                                        }
                                                        disabled={isUpdating}
                                                        className="p-3 hover:bg-gray-100 disabled:opacity-40"
                                                    >

                                                        <Plus size={18}/>

                                                    </button>

                                                </div>

                                                {/* Item total */}

                                                <div className="text-right min-w-[100px]">

                                                    <p className="text-sm text-gray-500">
                                                        Total
                                                    </p>

                                                    <p className="text-xl font-bold text-gray-900">

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
                                                    className="p-3 rounded-xl text-red-500 hover:bg-red-50 disabled:opacity-40"
                                                    title="Remove item"
                                                >

                                                    <Trash2 size={21}/>

                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                );

                            })
                        }

                    </div>

                    {/* =====================================================
                        Sharwari's work - Cart Summary
                        ===================================================== */}

                    <div className="lg:col-span-1">

                        <div className="bg-white rounded-3xl shadow-md p-7 sticky top-6">

                            <h2 className="text-2xl font-bold text-gray-900">

                                Order Summary

                            </h2>

                            <div className="border-t mt-6 pt-6 space-y-4">

                                <div className="flex justify-between text-gray-600">

                                    <span>
                                        Items
                                    </span>

                                    <span>
                                        {items.length}
                                    </span>

                                </div>

                                <div className="flex justify-between text-gray-600">

                                    <span>
                                        Total Quantity
                                    </span>

                                    <span>

                                        {
                                            items.reduce(
                                                (total, item) =>
                                                    total + item.quantity,
                                                0
                                            )
                                        }

                                    </span>

                                </div>

                                <div className="border-t pt-5 flex justify-between items-center">

                                    <span className="text-xl font-bold text-gray-900">
                                        Total
                                    </span>

                                    <span className="text-3xl font-extrabold text-orange-500">

                                        ₹{Number(cart.totalAmount || 0).toFixed(2)}

                                    </span>

                                </div>

                            </div>

                            <button
                                onClick={() =>
                                    navigate("/customer/checkout")
                                }
                                className="w-full mt-7 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                            >

                                Proceed to Checkout

                                <ArrowRight size={20}/>

                            </button>

                            <button
                                onClick={handleClearCart}
                                disabled={clearingCart}
                                className="w-full mt-3 border border-red-300 text-red-500 hover:bg-red-50 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                            >

                                {
                                    clearingCart
                                        ? "Clearing..."
                                        : "Clear Cart"
                                }

                                <Trash size={18}/>

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default Cart;

// ============================================================
// End of Sharwari's work
// ============================================================

