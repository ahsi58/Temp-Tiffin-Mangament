function DeleteConfirmationModal({
    open,
    onClose,
    onConfirm,
    loading
}) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">

                <div className="p-6">

                    <h2 className="text-2xl font-bold text-gray-900">
                        Delete Menu
                    </h2>

                    <p className="mt-4 text-gray-600 leading-relaxed">
                        Are you sure you want to delete this menu?
                    </p>

                    <p className="text-sm text-red-500 mt-2">
                        This action cannot be undone.
                    </p>

                </div>

                <div className="flex justify-end gap-3 border-t px-6 py-4">

                    <button
                        onClick={onClose}
                        className="px-5 py-2 border rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="
                            px-5
                            py-2
                            rounded-lg
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            disabled:bg-gray-400
                        "
                    >
                        {loading ? "Deleting..." : "Delete Menu"}
                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteConfirmationModal;