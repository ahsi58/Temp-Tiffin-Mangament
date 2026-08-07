import { useEffect, useState } from "react";
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

        } 
        catch (error) {

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

    return (

        <DashboardLayout>

            <div className="bg-white rounded-3xl shadow-md p-8 mb-10">

                <h1 className="text-5xl font-extrabold text-gray-900">

                    Weekly Menu

                </h1>

                <p className="mt-4 text-xl text-gray-700 leading-relaxed max-w-3xl">

                    Discover freshly prepared lunch and dinner meals available throughout the week.

                </p>

            </div>

            {

                days.map((day) => (

                    <DaySection
                        key={day}
                        day={day}
                        menus={
                            weeklyMenu.filter(
                                (menu) => menu.dayOfWeek === day
                            )
                        }
                    />

                ))

            }

        </DashboardLayout>

    );
}

export default WeeklyMenu;