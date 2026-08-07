function ActionButtons({
    menu,
    onEdit,
    onDelete,
    onToggle
}) {

    return (

        <div className="flex gap-3">

            {/* Edit */}

            <button
                onClick={() => onEdit(menu)}
                className="
                    flex-1
                    py-2.5
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    text-gray-700
                    font-semibold
                    hover:bg-gray-100
                    transition
                "
            >
                Edit
            </button>

            {/* Delete */}

            <button
                onClick={() => onDelete(menu.id)}
                className="
                    flex-1
                    py-2.5
                    rounded-xl
                    border
                    border-red-200
                    bg-red-50
                    text-red-700
                    font-semibold
                    hover:bg-red-100
                    transition
                "
            >
                Delete
            </button>

            {/* Toggle Availability */}

            <button
                onClick={() => onToggle(menu.id)}
                className={`
                    flex-1
                    py-2.5
                    rounded-xl
                    border
                    font-semibold
                    transition
                    ${
                        menu.available
                            ? "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                            : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    }
                `}
            >
                {
                    menu.available
                        ? "Mark Unavailable"
                        : "Mark Available"
                }
            </button>

        </div>

    );

}

export default ActionButtons;