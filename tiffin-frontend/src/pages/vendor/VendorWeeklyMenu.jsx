import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import VendorMenuCard from "../../components/vendor/VendorMenuCard";
import AddMenuModal from "../../components/vendor/AddMenuModal";
import {
    getWeeklyMenu,
    deleteMenu,
    toggleAvailability
} from "../../api/menuApi";
import DeleteConfirmationModal from "../../components/vendor/DeleteConfirmationModal";

const DAYS = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY"
];

function VendorWeeklyMenu() {

    const [menus, setMenus] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingMenu, setEditingMenu] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedMenuId, setSelectedMenuId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        loadMenus();
    }, []);

    const loadMenus = async () => {

        try {

            const response = await getWeeklyMenu();
            setMenus(response);

        } catch (error) {

            console.error("Error loading weekly menu", error);

        }

    };

    const handleEdit = (menu) => {

        setEditingMenu(menu);
        setShowModal(true);

    };

    const handleDelete = (id) => {
        setSelectedMenuId(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {

        try {

            setDeleteLoading(true);

            await deleteMenu(selectedMenuId);

            setDeleteModalOpen(false);

            setSelectedMenuId(null);

            loadMenus();

        } catch (error) {

            console.error(error);

            alert("Unable to delete menu.");

        } finally {

            setDeleteLoading(false);

        }

    };

    const handleToggle = async (id) => {

        try {

            const updatedMenu = await toggleAvailability(id);

            setMenus(prevMenus =>
                prevMenus.map(menu =>
                    menu.id === id
                        ? updatedMenu
                        : menu
                )
            );

        } catch (error) {

            console.error(error);

            alert("Unable to update availability.");

        }

    };

    return (

        <DashboardLayout>

            {/* Header */}

            <div className="flex justify-between items-center mb-10">

                <div>

                    <h1 className="text-4xl font-bold text-gray-900">
                        Weekly Menu Management
                    </h1>

                    <p className="text-gray-500 mt-2 text-lg">
                        Manage lunch and dinner menus for the week.
                    </p>

                </div>

                <button
                    onClick={() => {
                        setEditingMenu(null);
                        setShowModal(true);
                    }}
                    className="
                        bg-gray-900
                        hover:bg-black
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        font-semibold
                        shadow-sm
                        transition
                    "
                >
                    Add New Menu
                </button>

            </div>

            {/* Weekly Menu */}

            {

                DAYS.map((day) => {

                    const lunch = menus.find(
                        menu =>
                            menu.dayOfWeek === day &&
                            menu.mealType === "LUNCH"
                    );

                    const dinner = menus.find(
                        menu =>
                            menu.dayOfWeek === day &&
                            menu.mealType === "DINNER"
                    );

                    return (

                        <div
                            key={day}
                            className="mb-12"
                        >

                            <h2 className="text-3xl font-bold text-gray-800 border-b border-gray-200 pb-3 mb-8">

                                {day.charAt(0) +
                                    day.slice(1).toLowerCase()}

                            </h2>

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                                {

                                    lunch ? (

                                        <VendorMenuCard
                                            menu={lunch}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                            onToggle={handleToggle}
                                        />

                                    ) : (

                                        <EmptyCard meal="Lunch" />

                                    )

                                }

                                {

                                    dinner ? (

                                        <VendorMenuCard
                                            menu={dinner}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                            onToggle={handleToggle}
                                        />

                                    ) : (

                                        <EmptyCard meal="Dinner" />

                                    )

                                }

                            </div>

                        </div>

                    );

                })

            }

            <AddMenuModal
                open={showModal}
                onClose={() => {
                    setShowModal(false);
                    setEditingMenu(null);
                }}
                onMenuAdded={loadMenus}
                editingMenu={editingMenu}
            />

            <DeleteConfirmationModal
                open={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setSelectedMenuId(null);
                }}
                onConfirm={confirmDelete}
                loading={deleteLoading}
            />

        </DashboardLayout>

    );

}

function EmptyCard({ meal }) {

    return (

        <div
            className="
                bg-white
                rounded-2xl
                border-2
                border-dashed
                border-gray-300
                h-[420px]
                flex
                flex-col
                justify-center
                items-center
                shadow-sm
            "
        >

            <h3 className="text-2xl font-semibold text-gray-700">

                {meal}

            </h3>

            <p className="text-gray-500 mt-3">

                No menu has been added yet.

            </p>

        </div>

    );

}

export default VendorWeeklyMenu;