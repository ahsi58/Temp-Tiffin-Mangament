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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-8">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT SECTION */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-500 p-3 rounded-full">
              <UtensilsCrossed size={34} className="text-white" />
            </div>

            <h1 className="text-5xl font-extrabold text-orange-600">
              Tiffin Service
            </h1>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 leading-snug">
            Fresh, Healthy & Homemade Meals
          </h2>

          <p className="text-gray-600 text-lg mt-5 leading-8">
            Enjoy delicious home-style meals prepared with fresh ingredients.
            Browse weekly menus, order easily, and experience healthy eating
            every day.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-5 mt-10">

            <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
              <Salad className="text-green-500 mb-2" size={30} />

              <h3 className="font-semibold">
                Healthy Meals
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Fresh and nutritious food every day.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
              <CalendarDays
                className="text-orange-500 mb-2"
                size={30}
              />

              <h3 className="font-semibold">
                Weekly Menu
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Updated menu for lunch and dinner.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
              <UtensilsCrossed
                className="text-red-500 mb-2"
                size={30}
              />

              <h3 className="font-semibold">
                Easy Ordering
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Place your lunch and dinner orders in just a few clicks.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
              <Star
                className="text-yellow-500 mb-2"
                size={30}
              />

              <h3 className="font-semibold">
                Quality Food
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Hygienic and tasty homemade meals.
              </p>
            </div>

          </div>

          {/* Login & Register Buttons */}
          <div className="mt-10 flex gap-4">

            <button
              onClick={() => navigate("/login")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-lg transition duration-300"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="bg-white hover:bg-orange-50 text-orange-600 border-2 border-orange-500 px-10 py-4 rounded-xl text-lg font-semibold shadow-lg transition duration-300"
            >
              Register
            </button>

          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex justify-center">
          <img
            src="/images/tiffin1.png"
            alt="Tiffin Service"
            className="w-full max-w-xl drop-shadow-2xl"
          />
        </div>

      </div>
    </div>
  );
};

export default LandingPage;

