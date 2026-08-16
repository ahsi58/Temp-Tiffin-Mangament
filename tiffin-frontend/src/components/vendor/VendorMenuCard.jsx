import {
    Utensils,
    IndianRupee,
    CheckCircle2,
    XCircle,
    Clock3,
} from "lucide-react";

import StatusBadge from "./StatusBadge";
import ActionButtons from "./ActionButtons";

function VendorMenuCard({
    menu,
    onEdit,
    onDelete,
    onToggle
}) {

    const isLunch = menu.mealType === "LUNCH";

    return (

        <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">

            {/* ================================================= */}
            {/* TOP ACCENT */}
            {/* ================================================= */}

            <div
                className={`h-1.5 ${
                    isLunch
                        ? "bg-orange-500"
                        : "bg-indigo-500"
                }`}
            />

            <div className="p-5 flex flex-col flex-grow">

                {/* ================================================= */}
                {/* HEADER */}
                {/* ================================================= */}

                <div className="flex items-start justify-between gap-4">

                    <div className="flex items-center gap-3">

                        <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                                isLunch
                                    ? "bg-orange-50 text-orange-500"
                                    : "bg-indigo-50 text-indigo-500"
                            }`}
                        >

                            <Utensils size={21} />

                        </div>

                        <div>

                            <div className="flex items-center gap-2">

                                <span
                                    className={`text-xs font-bold uppercase tracking-wider ${
                                        isLunch
                                            ? "text-orange-500"
                                            : "text-indigo-500"
                                    }`}
                                >
                                    {isLunch
                                        ? "Lunch"
                                        : "Dinner"}
                                </span>

                                <span className="text-gray-300">
                                    •
                                </span>

                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                    <Clock3 size={11} />
                                    {isLunch
                                        ? "Afternoon"
                                        : "Evening"}
                                </span>

                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mt-1">
                                {menu.title}
                            </h3>

                        </div>

                    </div>


                    {/* Availability */}

                    <StatusBadge
                        available={menu.available}
                    />

                </div>


                {/* ================================================= */}
                {/* DESCRIPTION */}
                {/* ================================================= */}

                {menu.description && (

                    <div className="mt-5">

                        <p className="text-sm text-gray-600 leading-6 line-clamp-2">
                            {menu.description}
                        </p>

                    </div>

                )}


                {/* ================================================= */}
                {/* MENU ITEMS */}
                {/* ================================================= */}

                <div className="mt-5">

                    <div className="flex items-center justify-between mb-3">

                        <div className="flex items-center gap-2">

                            <Utensils
                                size={15}
                                className="text-gray-400"
                            />

                            <h4 className="text-sm font-semibold text-gray-800">
                                Menu Items
                            </h4>

                        </div>

                        <span className="text-xs text-gray-400">
                            {menu.items?.length || 0} items
                        </span>

                    </div>


                    <div className="flex flex-wrap gap-2">

                        {menu.items?.map(item => (

                            <span
                                key={item.id}
                                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700"
                            >
                                {item.itemName}
                            </span>

                        ))}

                    </div>

                </div>


                {/* ================================================= */}
                {/* PRICE / STATUS SECTION */}
                {/* ================================================= */}

                <div className="mt-6 pt-5 border-t border-gray-100">

                    <div className="flex items-end justify-between">

                        {/* Price */}

                        <div>

                            <p className="text-xs text-gray-400 mb-1">
                                Selling Price
                            </p>

                            <div className="flex items-center gap-1">

                                <IndianRupee
                                    size={18}
                                    className={
                                        isLunch
                                            ? "text-orange-500"
                                            : "text-indigo-500"
                                    }
                                />

                                <span className="text-2xl font-bold text-gray-900">
                                    {menu.price}
                                </span>

                                <span className="text-xs text-gray-400 ml-1">
                                    / meal
                                </span>

                            </div>

                        </div>


                        {/* Availability Info */}

                        <div
                            className={`flex items-center gap-1.5 text-xs font-medium ${
                                menu.available
                                    ? "text-green-600"
                                    : "text-red-500"
                            }`}
                        >

                            {menu.available ? (

                                <>
                                    <CheckCircle2 size={15} />
                                    Accepting Orders
                                </>

                            ) : (

                                <>
                                    <XCircle size={15} />
                                    Orders Closed
                                </>

                            )}

                        </div>

                    </div>

                </div>

            </div>


            {/* ================================================= */}
            {/* ACTION FOOTER */}
            {/* ================================================= */}

            <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-4">

                <ActionButtons
                    menu={menu}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggle={onToggle}
                />

            </div>

        </div>

    );
}

export default VendorMenuCard;