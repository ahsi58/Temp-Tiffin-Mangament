import {
    IndianRupee,
    ShoppingCart,
    CheckCircle2,
    XCircle
} from "lucide-react";

import { useState } from "react";
import toast from "react-hot-toast";
import { addToCart } from "../../api/cartApi";

function MenuCard({ menu }) {

    // ============================================================
    // Sharwari's work - Cart integration
    // ============================================================
    const [adding, setAdding] = useState(false);

    const handleAddToCart = async () => {

        try {

            setAdding(true);

            await addToCart(menu.id, 1);

            toast.success(`${menu.title} added to cart`);

        } catch (error) {

            console.error("Failed to add meal to cart:", error);

            const message =
                error.response?.data?.message ||
                "Failed to add meal to cart";

            toast.error(message);

        } finally {

            setAdding(false);

        }

    };
    // ============================================================
    // End of Sharwari's work
    // ============================================================


    if (!menu) {

        return (

            <div className="bg-white rounded-2xl border border-dashed border-gray-300 min-h-[220px] flex items-center justify-center">

                <div className="text-center">

                    <div className="text-4xl mb-3">
                        🍽️
                    </div>

                    <p className="text-gray-500 font-semibold text-sm">
                        Menu Not Available
                    </p>

                    <p className="text-gray-400 text-xs mt-1">
                        No meal has been added for this slot
                    </p>

                </div>

            </div>

        );

    }

    const isLunch = menu.mealType === "LUNCH";

    return (

        <div className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">

            {/* Header */}

            <div
                className={`px-5 py-4 text-white ${
                    isLunch
                        ? "bg-gradient-to-r from-orange-400 to-orange-500"
                        : "bg-gradient-to-r from-indigo-500 to-purple-600"
                }`}
            >

                <div className="flex items-center justify-between gap-4">

                    <div className="min-w-0">

                        <div className="flex items-center gap-2">

                            <h2 className="text-lg font-bold">
                                {isLunch ? "Lunch" : "Dinner"}
                            </h2>

                            <span className="text-white/70">
                                •
                            </span>

                            <span className="text-xs font-medium text-white/90">
                                {isLunch ? "Afternoon Meal" : "Evening Meal"}
                            </span>

                        </div>

                        <p className="mt-1 text-sm font-medium text-white/90 truncate">
                            {menu.title}
                        </p>

                    </div>


                    {/* Availability */}

                    {menu.available ? (

                        <span className="shrink-0 bg-white/20 px-2.5 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-medium">

                            <CheckCircle2 size={14} />

                            Available

                        </span>

                    ) : (

                        <span className="shrink-0 bg-red-500/90 px-2.5 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-medium">

                            <XCircle size={14} />

                            Unavailable

                        </span>

                    )}

                </div>

            </div>


            {/* Body */}

            <div className="p-5">

                {/* Description */}

                {menu.description && (

                    <p className="text-sm text-gray-600 leading-6">
                        {menu.description}
                    </p>

                )}


                {/* Included Items */}

                {menu.items?.length > 0 && (

                    <div className="mt-4">

                        <div className="flex items-center justify-between mb-2.5">

                            <h3 className="text-sm font-bold text-gray-800">
                                Included Items
                            </h3>

                            <span className="text-xs text-gray-400">
                                {menu.items.length} items
                            </span>

                        </div>

                        <div className="flex flex-wrap gap-2">

                            {menu.items.map(item => (

                                <span
                                    key={item.id}
                                    className="bg-orange-50 border border-orange-100 text-gray-700 px-2.5 py-1.5 rounded-lg text-xs font-medium"
                                >

                                    🍴 {item.itemName}

                                </span>

                            ))}

                        </div>

                    </div>

                )}


                {/* Price */}

                <div className="border-t border-gray-100 mt-5 pt-4 flex items-center justify-between">

                    <div>

                        <p className="text-xs text-gray-400 mb-0.5">
                            Meal Price
                        </p>

                        <div className="flex items-center gap-1">

                            <IndianRupee
                                size={18}
                                className="text-orange-500"
                            />

                            <span className="text-2xl font-bold text-gray-900">
                                {menu.price}
                            </span>

                        </div>

                    </div>


                    <span className="bg-green-50 border border-green-100 text-green-700 px-2.5 py-1.5 rounded-full text-xs font-medium">

                        Freshly Prepared

                    </span>

                </div>


                {/* Add To Cart */}

                <button
                    onClick={handleAddToCart}
                    disabled={!menu.available || adding}
                    className={`w-full mt-4 py-2.5 rounded-lg font-semibold text-sm flex justify-center items-center gap-2 transition-all ${
                        menu.available && !adding
                            ? "bg-orange-500 hover:bg-orange-600 text-white shadow-sm hover:shadow-md"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                >

                    <ShoppingCart size={17} />

                    {adding
                        ? "Adding..."
                        : menu.available
                            ? "Add to Cart"
                            : "Unavailable"
                    }

                </button>

            </div>

        </div>

    );
}

export default MenuCard;