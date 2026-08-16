import {
  CalendarDays,
  Salad,
  Star,
  UtensilsCrossed,
} from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
  const navigate = useNavigate();

  const { isAuthenticated, role } = useAuth();

  if (isAuthenticated) {
    return (
      <Navigate
        to={
          role === "CUSTOMER"
            ? "/customer/dashboard"
            : "/vendor/dashboard"
        }
        replace
      />
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center px-6 lg:px-10">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

        {/* LEFT SECTION */}
        <div className="flex flex-col justify-center">

          {/* Logo / Title */}
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-500 p-2.5 rounded-full">
              <UtensilsCrossed size={28} className="text-white" />
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold text-orange-600">
              Tiffin Service
            </h1>
          </div>

          {/* Main Heading */}
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 leading-snug">
            Fresh, Healthy & Homemade Meals
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-base lg:text-lg mt-3 leading-7 max-w-xl">
            Enjoy delicious home-style meals prepared with fresh ingredients.
            Browse weekly menus, order easily, and experience healthy eating
            every day.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-3 lg:gap-4 mt-6">

            <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
              <Salad className="text-green-500 mb-1.5" size={25} />

              <h3 className="font-semibold text-sm lg:text-base">
                Healthy Meals
              </h3>

              <p className="text-xs lg:text-sm text-gray-500 mt-1">
                Fresh and nutritious food every day.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
              <CalendarDays
                className="text-orange-500 mb-1.5"
                size={25}
              />

              <h3 className="font-semibold text-sm lg:text-base">
                Weekly Menu
              </h3>

              <p className="text-xs lg:text-sm text-gray-500 mt-1">
                Updated menu for lunch and dinner.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
              <UtensilsCrossed
                className="text-red-500 mb-1.5"
                size={25}
              />

              <h3 className="font-semibold text-sm lg:text-base">
                Easy Ordering
              </h3>

              <p className="text-xs lg:text-sm text-gray-500 mt-1">
                Place your lunch and dinner orders in just a few clicks.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
              <Star
                className="text-yellow-500 mb-1.5"
                size={25}
              />

              <h3 className="font-semibold text-sm lg:text-base">
                Quality Food
              </h3>

              <p className="text-xs lg:text-sm text-gray-500 mt-1">
                Hygienic and tasty homemade meals.
              </p>
            </div>

          </div>

          {/* Login & Register Buttons */}
          <div className="mt-6 flex gap-3">

            <button
              onClick={() => navigate("/login")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl text-base font-semibold shadow-lg transition duration-300"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="bg-white hover:bg-orange-50 text-orange-600 border-2 border-orange-500 px-8 py-3 rounded-xl text-base font-semibold shadow-lg transition duration-300"
            >
              Register
            </button>

          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex justify-center items-center">
          <img
            src="/images/tiffin2.png"
            alt="Tiffin Service"
            className="w-[600px] h-[500px] object-contain drop-shadow-2xl"
          />
        </div>

      </div>
    </div>
  );
};

export default LandingPage;