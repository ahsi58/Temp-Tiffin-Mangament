import StatusBadge from "./StatusBadge";
import ActionButtons from "./ActionButtons";

function VendorMenuCard({
    menu,
    onEdit,
    onDelete,
    onToggle
}) {

    return (

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full">

            {/* Card Header */}

            <div className="flex items-center justify-between px-6 pt-6">

                <h3 className="text-2xl font-semibold text-gray-900">
                    {menu.mealType === "LUNCH" ? "Lunch" : "Dinner"}
                </h3>

                <StatusBadge available={menu.available} />

            </div>

            <hr className="mt-4 border-gray-200" />

            {/* Body */}

            <div className="flex flex-col flex-grow px-6 py-5">

                <h2 className="text-3xl font-bold text-gray-900">
                    {menu.title}
                </h2>

                {menu.description && (

                    <p className="mt-2 text-gray-500 leading-7 text-base">
                        {menu.description}
                    </p>

                )}

                {/* Menu Items */}

                <div className="mt-7">

                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                        Menu Items
                    </h4>

                    <ul className="space-y-2">

                        {menu.items.map(item => (

                            <li
                                key={item.id}
                                className="text-gray-700 text-base"
                            >
                                • {item.itemName}
                            </li>

                        ))}

                    </ul>

                </div>

                {/* Price */}

                <div className="mt-8 pt-5 border-t border-gray-200">

                    <p className="text-gray-500 font-medium">
                        Price
                    </p>

                    <p className="text-3xl font-bold text-gray-900 mt-1">
                        ₹{menu.price}
                    </p>

                </div>

            </div>

            {/* Footer */}

            <div className="px-6 pb-6">

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