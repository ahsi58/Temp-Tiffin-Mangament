import { useEffect, useState } from "react";

import {
    CalendarDays,
    Utensils,
    Clock3
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import DashboardLayout from "../../components/layout/DashboardLayout";

import TodayMealCard from "../../components/menu/TodayMealCard";

import { getMenuByDay } from "../../api/menuApi";


function CustomerDashboard() {

    const {
        profile,
        loadProfile
    } = useAuth();


    const [menus, setMenus] = useState([]);


    // ============================================================
    // Load Profile + Today's Menu
    // ============================================================

    useEffect(() => {

        if (!profile) {

            loadProfile();

        }

        loadTodayMenu();

    }, []);


    const loadTodayMenu = async () => {

        try {

            const today =
                new Date()
                    .toLocaleDateString(
                        "en-US",
                        {
                            weekday: "long"
                        }
                    )
                    .toUpperCase();


            const response =
                await getMenuByDay(today);


            console.log(
                "Today's menu:",
                response
            );


            setMenus(
                response || []
            );


        } catch (error) {

            console.error(
                "Failed to load today's menu:",
                error
            );

            setMenus([]);

        }

    };


    // ============================================================
    // Find Meals
    // ============================================================

    const lunch =
        menus.find(
            menu =>
                menu.mealType === "LUNCH"
        );


    const dinner =
        menus.find(
            menu =>
                menu.mealType === "DINNER"
        );


    // ============================================================
    // Greeting
    // ============================================================

    const hour =
        new Date().getHours();


    let greeting =
        "Good Evening";


    if (hour < 12) {

        greeting =
            "Good Morning";

    } else if (hour < 17) {

        greeting =
            "Good Afternoon";

    }


    // ============================================================
    // Date
    // ============================================================

    const formattedDate =
        new Date().toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    return (

        <DashboardLayout>

            <div className="max-w-6xl mx-auto space-y-6">


                {/* ==================================================
                    Welcome Header
                   ================================================== */}

                <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl px-6 py-5 text-white shadow-md">

                    <div className="flex items-center justify-between gap-5">

                        <div>

                            <p className="text-[10px] font-bold tracking-widest text-orange-100 uppercase">

                                CUSTOMER DASHBOARD

                            </p>


                            <h1 className="text-2xl md:text-3xl font-bold mt-1">

                                {greeting},{" "}

                                {profile?.firstName ||
                                    "Customer"}{" "}

                                👋

                            </h1>


                            <div className="flex items-center gap-2 mt-2 text-sm text-orange-50">

                                <CalendarDays
                                    size={15}
                                />

                                {formattedDate}

                            </div>

                        </div>


                        <div className="hidden sm:flex w-12 h-12 rounded-xl bg-white/15 items-center justify-center">

                            <Utensils
                                size={24}
                            />

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    Quick Info Cards
                   ================================================== */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">


                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-4 py-3 flex items-center gap-3">

                        <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">

                            <Utensils
                                size={18}
                                className="text-orange-500"
                            />

                        </div>


                        <div>

                            <p className="text-[11px] text-gray-500">

                                Today's Meals

                            </p>


                            <p className="text-base font-bold text-gray-900">

                                {menus.length}

                            </p>

                        </div>

                    </div>


                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-4 py-3 flex items-center gap-3">

                        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">

                            <Clock3
                                size={18}
                                className="text-blue-500"
                            />

                        </div>


                        <div>

                            <p className="text-[11px] text-gray-500">

                                Meal Schedule

                            </p>


                            <p className="text-base font-bold text-gray-900">

                                Lunch & Dinner

                            </p>

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    Today's Meals Header
                   ================================================== */}

                <div className="flex items-center justify-between">

                    <div>

                        <h2 className="text-xl font-bold text-gray-900">

                            Today's Meals

                        </h2>


                        <p className="text-xs text-gray-500 mt-1">

                            Freshly prepared meals available today

                        </p>

                    </div>


                    <div className="hidden sm:flex items-center gap-2 text-xs text-orange-600 font-semibold bg-orange-50 px-3 py-2 rounded-lg">

                        <Utensils size={14} />

                        Fresh Today

                    </div>

                </div>


                {/* ==================================================
                    Meal Cards
                   ================================================== */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                    <TodayMealCard
                        meal={lunch}
                    />


                    <TodayMealCard
                        meal={dinner}
                    />

                </div>


                {/* ==================================================
                    Bottom Message
                   ================================================== */}

                <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">

                    <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">

                            🍱

                        </div>


                        <div>

                            <p className="text-sm font-semibold text-gray-800">

                                Homemade meals, prepared fresh.

                            </p>


                            <p className="text-xs text-gray-500 mt-0.5">

                                Choose your meal and add it to your cart whenever you're ready.

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}


export default CustomerDashboard;

