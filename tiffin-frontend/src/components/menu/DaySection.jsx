import { CalendarDays, Clock3 } from "lucide-react";
import MenuCard from "./MenuCard";

function DaySection({ day, menus }) {

    const lunch = menus.find(
        menu => menu.mealType === "LUNCH"
    );

    const dinner = menus.find(
        menu => menu.mealType === "DINNER"
    );

    const today = new Date()
        .toLocaleDateString("en-US", {
            weekday: "long"
        })
        .toUpperCase();

    const isToday = day === today;

    return (

        <section className="mb-10">

            {/* Day Header */}

            <div className="flex items-center justify-between mb-4">

                <div className="flex items-center gap-3">

                    <div
                        className={`w-1.5 h-9 rounded-full ${
                            isToday
                                ? "bg-orange-500"
                                : "bg-gray-200"
                        }`}
                    ></div>

                    <div>

                        <div className="flex items-center gap-2">

                            <h2 className="text-xl font-bold text-gray-800">
                                {day}
                            </h2>

                            {isToday && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-600">
                                    <CalendarDays size={12} />
                                    TODAY
                                </span>
                            )}

                        </div>

                        <p className="text-xs text-gray-500 mt-0.5">
                            {isToday
                                ? "Meals available today"
                                : "Lunch & dinner"}
                        </p>

                    </div>

                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400">

                    <Clock3 size={14} />

                    <span>
                        2 meals
                    </span>

                </div>

            </div>


            {/* Meals */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                <MenuCard menu={lunch} />

                <MenuCard menu={dinner} />

            </div>

        </section>

    );
}

export default DaySection;