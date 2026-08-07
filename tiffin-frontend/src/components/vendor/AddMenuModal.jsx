import { useState, useEffect } from "react";
import { createMenu, updateMenu } from "../../api/menuApi";

const DAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const MEALS = ["LUNCH", "DINNER"];

function AddMenuModal({ open, onClose, onMenuAdded, editingMenu }) {
  const initialFormData = {
    dayOfWeek: "MONDAY",
    mealType: "LUNCH",
    title: "",
    description: "",
    price: "",
    available: true,
    items: [
      {
        itemName: "",
      },
    ],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (editingMenu) {
      setFormData({
        dayOfWeek: editingMenu.dayOfWeek,

        mealType: editingMenu.mealType,

        title: editingMenu.title,

        description: editingMenu.description,

        price: editingMenu.price,

        available: editingMenu.available,

        items: editingMenu.items.map((item) => ({
          itemName: item.itemName,
        })),
      });
    } else {
      setFormData(initialFormData);
    }

    setErrors({});
  }, [editingMenu, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleItemChange = (index, value) => {
    const updatedItems = [...formData.items];

    updatedItems[index].itemName = value;

    setFormData({
      ...formData,
      items: updatedItems,
    });

    setErrors((prev) => ({
      ...prev,
      items: "",
    }));
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { itemName: "" }],
    });
  };

  const removeItem = (index) => {
    if (formData.items.length === 1) return;

    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Menu title is required.";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Please enter a valid price.";
    }

    const validItems = formData.items.filter(
      (item) => item.itemName.trim() !== "",
    );

    if (validItems.length === 0) {
      newErrors.items = "Please add at least one menu item.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        items: formData.items.filter((item) => item.itemName.trim() !== ""),
      };

      if (editingMenu) {

        await updateMenu(editingMenu.id, payload);

      } else {

        await createMenu(payload);

      }

      alert("Menu added successfully.");

      setFormData(initialFormData);

      setErrors({});

      onClose();

      onMenuAdded();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to add menu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}

        <div className="flex justify-between items-center border-b px-8 py-5">
          <h2 className="text-2xl font-bold text-gray-800">{editingMenu ? "Edit Menu" : "Add New Menu"}</h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        {/* Form */}

        <div className="p-8 space-y-6">
          {/* Day + Meal */}

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block font-medium mb-2">Day</label>

              <select
                name="dayOfWeek"
                value={formData.dayOfWeek}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              >
                {DAYS.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2">Meal Type</label>

              <select
                name="mealType"
                value={formData.mealType}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              >
                {MEALS.map((meal) => (
                  <option key={meal} value={meal}>
                    {meal}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Title */}

          <div>
            <label className="block font-medium mb-2">Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Enter menu title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-2">{errors.title}</p>
            )}
          </div>

          {/* Description */}

          <div>
            <label className="block font-medium mb-2">Description</label>

            <textarea
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Enter description"
            />
          </div>

          {/* Price */}

          <div>
            <label className="block font-medium mb-2">Price</label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-2">{errors.price}</p>
            )}
          </div>

          {/* Available */}

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />

            <span className="font-medium">Available</span>
          </div>

          {/* Menu Items */}

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Menu Items</h3>

              <button
                onClick={addItem}
                className="text-orange-600 font-medium hover:underline"
              >
                + Add Item
              </button>
            </div>

            {formData.items.map((item, index) => (
              <div key={index} className="flex gap-3 mb-3">
                <input
                  type="text"
                  value={item.itemName}
                  onChange={(e) => handleItemChange(index, e.target.value)}
                  placeholder={`Item ${index + 1}`}
                  className="flex-1 border rounded-lg p-3"
                />

                <button
                  onClick={() => removeItem(index)}
                  className="px-4 rounded-lg border hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            ))}
            {errors.items && (
              <p className="text-red-500 text-sm mt-2">{errors.items}</p>
            )}
          </div>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-4 border-t px-8 py-5">
          <button
            onClick={onClose}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className={`
                px-6
                py-2
                rounded-lg
                font-semibold
                transition
                ${
                  loading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-gray-900 hover:bg-black text-white"
                }
            `}
          >
            {
                loading
                    ? "Saving..."
                    : editingMenu
                        ? "Update Menu"
                        : "Save Menu"
            }
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMenuModal;
