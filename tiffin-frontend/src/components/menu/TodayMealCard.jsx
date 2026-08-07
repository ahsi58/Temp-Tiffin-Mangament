import {
    IndianRupee,
    ShoppingCart,
    CheckCircle2,
    XCircle,
    UtensilsCrossed
} from "lucide-react";

import { useState } from "react";
import toast from "react-hot-toast";
import { addToCart } from "../../api/cartApi";

function TodayMealCard({ meal }) {

    const [adding, setAdding] = useState(false);

    if (!meal) {

        return (

            <div className="bg-white rounded-3xl shadow-lg h-[470px] flex flex-col items-center justify-center">

                <UtensilsCrossed
                    size={70}
                    className="text-gray-300 mb-5"
                />

                <h2 className="text-2xl font-bold text-gray-700">
                    Menu Not Available
                </h2>

                <p className="text-gray-500 mt-3 text-center px-6">
                    Today's meal has not been added yet.
                </p>

            </div>

        );

    }

    const isLunch = meal.mealType === "LUNCH";

    const handleAddToCart = async () => {

        try {

            setAdding(true);

            await addToCart(meal.id, 1);

            toast.success(`${meal.title} added to cart`);

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

    return (

        <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

            <div
                className={`p-6 text-white ${
                    isLunch
                        ? "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"
                        : "bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-600"
                }`}
            >

                <h2 className="text-3xl font-bold">
                    {isLunch ? "Today's Lunch" : "Today's Dinner"}
                </h2>

            </div>

            <div className="p-8">

                <h3 className="text-2xl font-bold text-gray-900">
                    {meal.title}
                </h3>

                <p className="text-gray-700 text-lg mt-4 leading-8">
                    {meal.description}
                </p>

                <div className="mt-7">

                    <h4 className="text-lg font-bold text-gray-900 mb-4">
                        Included Items
                    </h4>

                    <div className="flex flex-wrap gap-3">

                        {
                            meal.items.map(item => (

                                <span
                                    key={item.id}
                                    className="bg-orange-100 text-gray-800 px-4 py-2 rounded-full font-medium"
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
                            className="text-orange-500"
                        />

                        <span className="text-4xl font-bold text-gray-900">
                            {meal.price}
                        </span>

                    </div>

                    {
                        meal.available ?

                        <span className="flex items-center gap-2 text-green-600 font-semibold">

                            <CheckCircle2 size={20}/>

                            Available

                        </span>

                        :

                        <span className="flex items-center gap-2 text-red-500 font-semibold">

                            <XCircle size={20}/>

                            Unavailable

                        </span>
                    }

                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={!meal.available || adding}
                    className={`w-full mt-8 py-4 rounded-xl font-semibold flex justify-center items-center gap-2 transition-all ${
                        meal.available && !adding
                            ? "bg-orange-500 hover:bg-orange-600 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >

                    <ShoppingCart size={20}/>

                    {adding ? "Adding..." : "Add To Cart"}

                </button>

            </div>

        </div>

    );

}

export default TodayMealCard;

