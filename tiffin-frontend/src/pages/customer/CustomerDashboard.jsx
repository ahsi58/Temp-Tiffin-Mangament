import { useEffect, useState } from "react";
import {
    CalendarDays,
    Clock3,
    UtensilsCrossed,
    Sparkles
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/layout/DashboardLayout";
import TodayMealCard from "../../components/menu/TodayMealCard";
import { getMenuByDay } from "../../api/menuApi";

function CustomerDashboard() {

    const { profile, loadProfile } = useAuth();

    const [menus, setMenus] = useState([]);

    useEffect(() => {

        if (!profile) {
            loadProfile();
        }

        loadTodayMenu();

    }, []);

    const loadTodayMenu = async () => {

        try {

            const today = new Date()
                .toLocaleDateString("en-US", {
                    weekday: "long"
                })
                .toUpperCase();

            const response = await getMenuByDay(today);

            console.log("Today's menu:", response);

            setMenus(response || []);

        } catch (error) {

            console.error(error);

        }

    };

    const lunch = menus.find(
        menu => menu.mealType === "LUNCH"
    );

    const dinner = menus.find(
        menu => menu.mealType === "DINNER"
    );

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 17) {
        greeting = "Good Afternoon";
    }

    const formattedDate = new Date().toLocaleDateString(
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

            <div className="max-w-7xl mx-auto space-y-8">

                {/* Welcome Section */}

                <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 px-8 py-8 text-white shadow-md">

                    <div className="relative z-10">

                        <div className="flex items-center gap-2 mb-3">

                            <Sparkles
                                size={18}
                                className="text-orange-100"
                            />

                            <span className="text-sm font-semibold tracking-wide text-orange-100">
                                CUSTOMER DASHBOARD
                            </span>

                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold">
                            {greeting},{" "}
                            {profile?.firstName || "Customer"}!
                        </h1>

                        <p className="mt-3 max-w-2xl text-orange-50 text-sm md:text-base">
                            Enjoy fresh, homemade meals prepared specially
                            for you.
                        </p>

                        <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white/15 border border-white/20 px-4 py-2.5 text-sm font-medium">

                            <CalendarDays size={17} />

                            {formattedDate}

                        </div>

                    </div>

                    {/* Decorative Icon */}

                    <div className="absolute -right-5 -bottom-8 hidden md:flex h-36 w-36 items-center justify-center rounded-full bg-white/10">

                        <UtensilsCrossed
                            size={72}
                            className="text-white/30"
                        />

                    </div>

                </section>


                {/* Quick Info Cards */}

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

                        <div className="flex items-center gap-4">

                            <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">

                                <UtensilsCrossed size={21} />

                            </div>

                            <div>

                                <p className="text-sm text-gray-500">
                                    Today's Meals
                                </p>

                                <p className="text-xl font-bold text-gray-800">
                                    {menus.length}
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

                        <div className="flex items-center gap-4">

                            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">

                                <Clock3 size={21} />

                            </div>

                            <div>

                                <p className="text-sm text-gray-500">
                                    Lunch
                                </p>

                                <p className="text-xl font-bold text-gray-800">
                                    {lunch ? "Available" : "Not Available"}
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

                        <div className="flex items-center gap-4">

                            <div className="w-11 h-11 rounded-xl bg-green-50 text-green-500 flex items-center justify-center">

                                <Clock3 size={21} />

                            </div>

                            <div>

                                <p className="text-sm text-gray-500">
                                    Dinner
                                </p>

                                <p className="text-xl font-bold text-gray-800">
                                    {dinner ? "Available" : "Not Available"}
                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                {/* Today's Meals */}

                <section>

                    <div className="flex items-end justify-between mb-5">

                        <div>

                            <p className="text-xs font-bold tracking-wider text-orange-500 uppercase">
                                Today's Menu
                            </p>

                            <h2 className="text-2xl font-bold text-gray-900 mt-1">
                                Today's Meals
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Fresh meals available for you today
                            </p>

                        </div>

                        <UtensilsCrossed
                            size={24}
                            className="text-gray-300"
                        />

                    </div>


                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        <TodayMealCard meal={lunch} />

                        <TodayMealCard meal={dinner} />

                    </div>

                </section>

            </div>

        </DashboardLayout>

    );
}

export default CustomerDashboard;