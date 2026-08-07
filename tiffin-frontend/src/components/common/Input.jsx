function Input({
    label,
    name,
    value,
    onChange,
    readOnly = false,
    placeholder = "",
    type = "text"
}) {

    return (

        <div>

            <label className="block text-sm font-medium text-gray-600 mb-2">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value || ""}
                onChange={onChange}
                readOnly={readOnly}
                placeholder={placeholder}
                className={`w-full border rounded-lg px-4 py-2 outline-none transition
                ${
                    readOnly
                        ? "bg-gray-100"
                        : "bg-white focus:ring-2 focus:ring-orange-400"
                }`}
            />

        </div>

    );

}

export default Input;