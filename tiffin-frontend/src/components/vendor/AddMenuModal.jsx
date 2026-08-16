import { useState, useEffect } from "react";
import { createMenu, updateMenu } from "../../api/menuApi";
import toast from "react-hot-toast";

import {
  CalendarDays,
  FileText,
  Plus,
  Trash2,
  UtensilsCrossed,
} from "lucide-react";



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

      toast.success(
        editingMenu
          ? "Menu updated successfully!"
          : "Menu added successfully!"
      );

      setFormData(initialFormData);

      setErrors({});

      onClose();

      onMenuAdded();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Unable to save menu. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">

    <div className="w-full max-w-3xl max-h-[92vh] overflow-hidden bg-white rounded-2xl shadow-2xl">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-7 py-5 text-white">

        <div className="flex items-start justify-between">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
              <UtensilsCrossed size={22} />
            </div>

            <div>

              <p className="text-xs font-semibold tracking-wider text-orange-100 uppercase">
                MENU MANAGEMENT
              </p>

              <h2 className="text-2xl font-bold">
                {editingMenu ? "Edit Menu" : "Add New Menu"}
              </h2>

              <p className="text-sm text-orange-50 mt-0.5">
                {editingMenu
                  ? "Update your meal details"
                  : "Create a meal for your weekly menu"}
              </p>

            </div>

          </div>


          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <span className="text-2xl leading-none">
              ×
            </span>
          </button>

        </div>

      </div>


      {/* ================================================= */}
      {/* FORM BODY */}
      {/* ================================================= */}

      <div className="overflow-y-auto max-h-[calc(92vh-150px)]">

        <div className="p-7 space-y-7">


          {/* ================================================= */}
          {/* SCHEDULE */}
          {/* ================================================= */}

          <div>

            <div className="flex items-center gap-2 mb-4">

              <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                <CalendarDays size={17} />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Meal Schedule
                </h3>

                <p className="text-xs text-gray-400">
                  Choose when this meal will be served
                </p>
              </div>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* DAY */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Day
                </label>

                <select
                  name="dayOfWeek"
                  value={formData.dayOfWeek}
                  onChange={handleChange}
                  className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                >

                  {DAYS.map((day) => (

                    <option key={day} value={day}>
                      {day.charAt(0) + day.slice(1).toLowerCase()}
                    </option>

                  ))}

                </select>

              </div>


              {/* MEAL */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meal Type
                </label>

                <select
                  name="mealType"
                  value={formData.mealType}
                  onChange={handleChange}
                  className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                >

                  {MEALS.map((meal) => (

                    <option key={meal} value={meal}>
                      {meal.charAt(0) + meal.slice(1).toLowerCase()}
                    </option>

                  ))}

                </select>

              </div>

            </div>

          </div>


          {/* ================================================= */}
          {/* BASIC DETAILS */}
          {/* ================================================= */}

          <div>

            <div className="flex items-center gap-2 mb-4">

              <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                <FileText size={17} />
              </div>

              <div>

                <h3 className="font-semibold text-gray-900">
                  Meal Details
                </h3>

                <p className="text-xs text-gray-400">
                  Tell customers what you are serving
                </p>

              </div>

            </div>


            {/* TITLE */}

            <div className="mb-4">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Menu Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Paneer Thali"
                className={`w-full h-11 px-3 rounded-xl border bg-gray-50 text-sm outline-none transition ${
                  errors.title
                    ? "border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                }`}
              />

              {errors.title && (
                <p className="text-xs text-red-500 mt-1.5">
                  {errors.title}
                </p>
              )}

            </div>


            {/* DESCRIPTION */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
                <span className="text-gray-400 font-normal ml-1">
                  (optional)
                </span>
              </label>

              <textarea
                rows="3"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the meal, ingredients or special preparation..."
                className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 resize-none outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
              />

            </div>

          </div>


          {/* ================================================= */}
          {/* PRICE + AVAILABILITY */}
          {/* ================================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* PRICE */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price per Meal
              </label>

              <div className="relative">

                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                  ₹
                </span>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="120"
                  className={`w-full h-11 pl-8 pr-3 rounded-xl border bg-gray-50 text-sm outline-none transition ${
                    errors.price
                      ? "border-red-400"
                      : "border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  }`}
                />

              </div>

              {errors.price && (
                <p className="text-xs text-red-500 mt-1.5">
                  {errors.price}
                </p>
              )}

            </div>


            {/* AVAILABILITY */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Availability
              </label>

              <label className="h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-between cursor-pointer">

                <div>

                  <p className="text-sm font-medium text-gray-800">
                    Accept Orders
                  </p>

                  <p className="text-xs text-gray-400">
                    {formData.available
                      ? "Customers can order this meal"
                      : "Orders are currently closed"}
                  </p>

                </div>


                <input
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                  className="sr-only peer"
                />

                <div className="relative w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-green-500 transition">

                  <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-5" />

                </div>

              </label>

            </div>

          </div>


          {/* ================================================= */}
          {/* MENU ITEMS */}
          {/* ================================================= */}

          <div>

            <div className="flex items-center justify-between mb-4">

              <div className="flex items-center gap-2">

                <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                  <UtensilsCrossed size={17} />
                </div>

                <div>

                  <h3 className="font-semibold text-gray-900">
                    What's Included?
                  </h3>

                  <p className="text-xs text-gray-400">
                    Add the dishes included in this meal
                  </p>

                </div>

              </div>


              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 text-xs font-semibold transition"
              >
                <Plus size={14} />
                Add Item
              </button>

            </div>


            <div className="space-y-2.5">

              {formData.items.map((item, index) => (

                <div
                  key={index}
                  className="flex items-center gap-2"
                >

                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-500 shrink-0">
                    {index + 1}
                  </div>


                  <input
                    type="text"
                    value={item.itemName}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        e.target.value
                      )
                    }
                    placeholder={`e.g. ${
                      index === 0
                        ? "Rice"
                        : "Menu item"
                    }`}
                    className="flex-1 h-10 px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                  />


                  {formData.items.length > 1 && (

                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="w-9 h-9 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>

                  )}

                </div>

              ))}

            </div>


            {errors.items && (

              <div className="mt-3 px-3 py-2 rounded-lg bg-red-50 border border-red-100">

                <p className="text-xs text-red-500">
                  {errors.items}
                </p>

              </div>

            )}

          </div>

        </div>


        {/* ================================================= */}
        {/* FOOTER */}
        {/* ================================================= */}

        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-7 py-4 flex items-center justify-between">

          <p className="hidden sm:block text-xs text-gray-400">
            Make sure all meal details are correct.
          </p>

          <div className="flex items-center gap-3 ml-auto">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
            >
              Cancel
            </button>


            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition shadow-sm ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 hover:shadow-md"
              }`}
            >
              {loading
                ? "Saving..."
                : editingMenu
                  ? "Update Menu"
                  : "Save Menu"}
            </button>

          </div>

        </div>

      </div>

    </div>
  </div>
);
}

export default AddMenuModal;
