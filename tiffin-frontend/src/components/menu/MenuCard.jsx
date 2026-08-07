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

            <div className="bg-white rounded-3xl border-2 border-dashed border-gray-300 h-[420px] flex items-center justify-center">

                <div className="text-center">

                    <div className="text-6xl mb-4">
                        🍽️
                    </div>

                    <p className="text-gray-500 font-semibold">
                        Menu Not Available
                    </p>

                </div>

            </div>

        );

    }

    const isLunch = menu.mealType === "LUNCH";

    return (

        <div className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

            {/* Header */}

            <div
                className={`p-6 text-white ${
                    isLunch
                        ? "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"
                        : "bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-600"
                }`}
            >

                <div className="flex justify-between">

                    <div>

                        <h2 className="text-2xl font-bold">

                            {isLunch ? "Lunch" : "Dinner"}

                        </h2>

                        <p className="mt-2 text-lg font-semibold text-white">

                            {menu.title}

                        </p>

                    </div>

                    {
                        menu.available ?

                            <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2 text-sm">

                                <CheckCircle2 size={18}/>

                                Available

                            </span>

                            :

                            <span className="bg-red-500 px-4 py-2 rounded-full flex items-center gap-2 text-sm">

                                <XCircle size={18}/>

                                Unavailable

                            </span>
                    }

                </div>

            </div>

            {/* Body */}

            <div className="p-8">

                <p className="text-gray-700 text-lg leading-8 mt-4">

                    {menu.description}

                </p>

                <div className="mt-6">

                    <h3 className="text-xl font-bold text-gray-900 mb-5">

                        Included Items

                    </h3>

                    <div className="flex flex-wrap gap-3">

                        {
                            menu.items.map(item => (

                                <span
                                    key={item.id}
                                    className="bg-orange-100 text-gray-800 px-4 py-2 rounded-full text-base font-medium"
                                >

                                    🍴 {item.itemName}

                                </span>

                            ))
                        }

                    </div>

                </div>

                <div className="border-t mt-8 pt-6 flex justify-between items-center">

                    <div className="flex items-center gap-2">

                        <IndianRupee
                            size={24}
                            className="text-orange-500"
                        />

                        <span className="text-4xl font-extrabold text-gray-900">

                            {menu.price}

                        </span>

                    </div>

                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">

                        Freshly Prepared

                    </span>

                </div>

                {/* =====================================================
                    Sharwari's work - Add To Cart button
                    ===================================================== */}

                <button
                    onClick={handleAddToCart}
                    disabled={!menu.available || adding}
                    className={`w-full mt-6 py-4 rounded-xl font-semibold flex justify-center items-center gap-2 transition-all ${
                        menu.available && !adding
                            ? "bg-orange-500 hover:bg-orange-600 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >

                    <ShoppingCart size={20}/>

                    {adding ? "Adding..." : "Add To Cart"}

                </button>

                {/* =====================================================
                    End of Sharwari's work
                    ===================================================== */}

            </div>

        </div>

    );

}

export default MenuCard;

