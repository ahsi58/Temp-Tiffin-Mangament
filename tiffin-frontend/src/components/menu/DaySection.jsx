import MenuCard from "./MenuCard";

function DaySection({ day, menus }) {

    const lunch = menus.find(menu => menu.mealType === "LUNCH");

    const dinner = menus.find(menu => menu.mealType === "DINNER");

    return (

        <section className="mb-14">

            <div className="flex items-center gap-4 mb-8">

                <div className="w-3 h-12 rounded-full bg-orange-500"></div>

                <h2 className="text-3xl font-bold text-gray-800">

                    {day}

                </h2>

            </div>

            <div className="grid xl:grid-cols-2 gap-8">

                <MenuCard menu={lunch}/>

                <MenuCard menu={dinner}/>

            </div>

        </section>

    );

}

export default DaySection;