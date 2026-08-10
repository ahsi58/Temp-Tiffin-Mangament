import { useEffect, useState } from "react";
import {
    CalendarDays,
    UtensilsCrossed,
    Soup
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getWeeklyMenu } from "../../api/menuApi";
import DaySection from "../../components/menu/DaySection";

function WeeklyMenu() {

    const [weeklyMenu, setWeeklyMenu] = useState([]);

    useEffect(() => {

        const fetchMenus = async () => {

            try {

                const response = await getWeeklyMenu();

                console.log("Weekly Menu:", response);

                setWeeklyMenu(response || []);

            } catch (error) {

                console.error(error);

                setWeeklyMenu([]);

            }

        };

        fetchMenus();

    }, []);

    const days = [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY"
    ];

    const totalMeals = weeklyMenu.length;

    const lunchCount = weeklyMenu.filter(
        (menu) => menu.mealType === "LUNCH"
    ).length;

    const dinnerCount = weeklyMenu.filter(
        (menu) => menu.mealType === "DINNER"
    ).length;

    const formattedDate = new Date().toLocaleDateString(
        "en-US",
        {
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    );

    return (

        <DashboardLayout>

            <div className="max-w-7xl mx-auto pb-10">

                {/* Page Header */}

                <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 px-8 py-8 text-white shadow-md mb-7">

                    <div className="relative z-10">

                        <div className="flex items-center gap-2 mb-3">

                            <CalendarDays
                                size={18}
                                className="text-orange-100"
                            />

                            <span className="text-sm font-semibold tracking-wide text-orange-100">
                                THIS WEEK'S MENU
                            </span>

                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold">
                            Weekly Menu
                        </h1>

                        <p className="mt-3 max-w-2xl text-orange-50 text-sm md:text-base">
                            Discover freshly prepared lunch and dinner meals
                            available throughout the week.
                        </p>

                        <div className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white/15 border border-white/20 px-4 py-2 text-sm">
                            <CalendarDays size={16} />
                            Updated menu · {formattedDate}
                        </div>

                    </div>

                    <div className="absolute -right-8 -bottom-10 hidden md:flex h-40 w-40 items-center justify-center rounded-full bg-white/10">

                        <UtensilsCrossed
                            size={78}
                            className="text-white/25"
                        />

                    </div>

                </section>


                {/* Summary Cards */}

                <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-9">

                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

                        <div className="flex items-center gap-4">

                            <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">

                                <UtensilsCrossed size={21} />

                            </div>

                            <div>

                                <p className="text-sm text-gray-500">
                                    Total Meals
                                </p>

                                <p className="text-xl font-bold text-gray-800">
                                    {totalMeals}
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

                        <div className="flex items-center gap-4">

                            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">

                                <Soup size={21} />

                            </div>

                            <div>

                                <p className="text-sm text-gray-500">
                                    Lunch Options
                                </p>

                                <p className="text-xl font-bold text-gray-800">
                                    {lunchCount}
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

                        <div className="flex items-center gap-4">

                            <div className="w-11 h-11 rounded-xl bg-green-50 text-green-500 flex items-center justify-center">

                                <Soup size={21} />

                            </div>

                            <div>

                                <p className="text-sm text-gray-500">
                                    Dinner Options
                                </p>

                                <p className="text-xl font-bold text-gray-800">
                                    {dinnerCount}
                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                {/* Menu */}

                <section>

                    <div className="flex items-end justify-between mb-6">

                        <div>

                            <p className="text-xs font-bold tracking-wider text-orange-500 uppercase">
                                EXPLORE
                            </p>

                            <h2 className="text-2xl font-bold text-gray-900 mt-1">
                                Meals Throughout The Week
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Choose a day to see what's being served.
                            </p>

                        </div>

                        <UtensilsCrossed
                            size={24}
                            className="text-gray-300"
                        />

                    </div>


                    <div className="space-y-8">

                        {days.map((day) => (

                            <DaySection
                                key={day}
                                day={day}
                                menus={
                                    weeklyMenu.filter(
                                        (menu) =>
                                            menu.dayOfWeek === day
                                    )
                                }
                            />

                        ))}

                    </div>

                </section>

            </div>

        </DashboardLayout>

    );
}

export default WeeklyMenu;