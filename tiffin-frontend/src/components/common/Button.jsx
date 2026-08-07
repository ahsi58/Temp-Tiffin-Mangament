function Button({
    children,
    onClick,
    type = "button",
    loading = false,
    className = "",
    ...props
}) {

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={loading}
            className={`bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
            {...props}
        >
            {loading ? "Please wait..." : children}
        </button>
    );
}

export default Button;