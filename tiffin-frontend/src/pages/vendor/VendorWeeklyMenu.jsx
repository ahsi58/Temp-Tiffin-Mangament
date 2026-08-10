import { useEffect, useState } from "react";
import {
    CalendarDays,
    Plus,
    UtensilsCrossed
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import VendorMenuCard from "../../components/vendor/VendorMenuCard";
import AddMenuModal from "../../components/vendor/AddMenuModal";

import {
    getWeeklyMenu,
    deleteMenu,
    toggleAvailability
} from "../../api/menuApi";

import DeleteConfirmationModal
    from "../../components/vendor/DeleteConfirmationModal";


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

    const [showModal, setShowModal] =
        useState(false);

    const [editingMenu, setEditingMenu] =
        useState(null);

    const [deleteModalOpen, setDeleteModalOpen] =
        useState(false);

    const [selectedMenuId, setSelectedMenuId] =
        useState(null);

    const [deleteLoading, setDeleteLoading] =
        useState(false);


    // ============================================================
    // Load weekly menu
    // ============================================================

    useEffect(() => {

        loadMenus();

    }, []);


    const loadMenus = async () => {

        try {

            const response =
                await getWeeklyMenu();

            setMenus(response);

        } catch (error) {

            console.error(
                "Error loading weekly menu",
                error
            );

        }

    };


    // ============================================================
    // Edit
    // ============================================================

    const handleEdit = (menu) => {

        setEditingMenu(menu);

        setShowModal(true);

    };


    // ============================================================
    // Delete
    // ============================================================

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


    // ============================================================
    // Toggle availability
    // ============================================================

    const handleToggle = async (id) => {

        try {

            const updatedMenu =
                await toggleAvailability(id);

            setMenus(prevMenus =>
                prevMenus.map(menu =>
                    menu.id === id
                        ? updatedMenu
                        : menu
                )
            );

        } catch (error) {

            console.error(error);

            alert(
                "Unable to update availability."
            );

        }

    };


    return (

        <DashboardLayout>

            <div className="space-y-7">

                {/* ==================================================
                    Page Header
                   ================================================== */}

                <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl px-6 py-5 text-white shadow-md">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">

                                <CalendarDays size={23} />

                            </div>

                            <div>

                                <p className="text-xs font-semibold tracking-wider text-orange-100 uppercase">
                                    MENU MANAGEMENT
                                </p>

                                <h1 className="text-2xl md:text-3xl font-bold">
                                    Weekly Menu
                                </h1>

                                <p className="text-sm text-orange-50 mt-1">
                                    Manage lunch and dinner meals for the week.
                                </p>

                            </div>

                        </div>


                        <button
                            onClick={() => {

                                setEditingMenu(null);

                                setShowModal(true);

                            }}
                            className="self-start sm:self-auto bg-white text-orange-600 hover:bg-orange-50 px-4 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 shadow-sm transition"
                        >

                            <Plus size={17} />

                            Add New Menu

                        </button>

                    </div>

                </div>


                {/* ==================================================
                    Weekly Menu
                   ================================================== */}

                {DAYS.map((day) => {

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


                    const dayName =
                        day.charAt(0) +
                        day.slice(1).toLowerCase();


                    return (

                        <section
                            key={day}
                            className="space-y-3"
                        >

                            {/* Day Header */}

                            <div className="flex items-center gap-3">

                                <div className="w-1 h-7 rounded-full bg-orange-500" />

                                <h2 className="text-lg font-bold text-gray-800">
                                    {dayName}
                                </h2>

                                <div className="flex-1 h-px bg-gray-200" />

                            </div>


                            {/* Meal Cards */}

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

                                {lunch ? (

                                    <VendorMenuCard
                                        menu={lunch}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                        onToggle={handleToggle}
                                    />

                                ) : (

                                    <EmptyCard meal="Lunch" />

                                )}


                                {dinner ? (

                                    <VendorMenuCard
                                        menu={dinner}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                        onToggle={handleToggle}
                                    />

                                ) : (

                                    <EmptyCard meal="Dinner" />

                                )}

                            </div>

                        </section>

                    );

                })}


                {/* ==================================================
                    Add / Edit Modal
                   ================================================== */}

                <AddMenuModal
                    open={showModal}
                    onClose={() => {

                        setShowModal(false);

                        setEditingMenu(null);

                    }}
                    onMenuAdded={loadMenus}
                    editingMenu={editingMenu}
                />


                {/* ==================================================
                    Delete Confirmation
                   ================================================== */}

                <DeleteConfirmationModal
                    open={deleteModalOpen}
                    onClose={() => {

                        setDeleteModalOpen(false);

                        setSelectedMenuId(null);

                    }}
                    onConfirm={confirmDelete}
                    loading={deleteLoading}
                />

            </div>

        </DashboardLayout>

    );

}


// ================================================================
// Empty Menu Card
// ================================================================

function EmptyCard({ meal }) {

    return (

        <div className="bg-white rounded-xl border border-dashed border-gray-300 min-h-[210px] flex flex-col justify-center items-center">

            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">

                <UtensilsCrossed
                    size={20}
                    className="text-gray-300"
                />

            </div>

            <h3 className="text-sm font-semibold text-gray-600 mt-3">
                {meal} Menu
            </h3>

            <p className="text-xs text-gray-400 mt-1">
                No menu has been added yet.
            </p>

        </div>

    );

}


export default VendorWeeklyMenu;

