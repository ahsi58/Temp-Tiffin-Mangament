import { useEffect, useState } from "react";
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

        }

        catch (error) {

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

    }

    else if (hour < 17) {

        greeting = "Good Afternoon";

    }

    return (

        <DashboardLayout>

            <div className="space-y-10">

                <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-3xl p-8 shadow-lg text-white">

                    <h1 className="text-4xl font-bold">

                        {greeting}, {profile?.firstName || "Customer"}

                    </h1>

                    <p className="text-lg mt-3">

                        {new Date().toLocaleDateString(
                            "en-US",
                            {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                            }
                        )}

                    </p>

                    <p className="mt-5 text-lg text-orange-100">

                        Enjoy today's freshly prepared homemade meals.

                    </p>

                </div>

                <div>

                    <h2 className="text-3xl font-bold text-gray-900 mb-8">

                        Today's Meals

                    </h2>

                    <div className="grid lg:grid-cols-2 gap-8">

                        <TodayMealCard meal={lunch} />

                        <TodayMealCard meal={dinner} />

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default CustomerDashboard;