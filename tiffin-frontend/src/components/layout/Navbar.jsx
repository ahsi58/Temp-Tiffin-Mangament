import { Bell, UserCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
    const { role, profile } = useAuth();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6">

            {/* Logo */}
            <div className="flex items-center gap-3">

                <div className="bg-orange-500 text-white w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold">
                    🍱
                </div>

                <div>
                    <h1 className="text-lg font-bold text-gray-800">
                        Tiffin Management System
                    </h1>

                    <p className="text-sm text-gray-500">
                        {role === "CUSTOMER"
                            ? "Customer Portal"
                            : "Vendor Portal"}
                    </p>
                </div>

            </div>

            {/* Right Side */}
            <div className="flex items-center gap-5">

                <button className="relative text-gray-600 hover:text-orange-500 transition">
                    <Bell size={22} />
                </button>

                <div className="flex items-center gap-2">

                    <UserCircle
                        size={34}
                        className="text-orange-500"
                    />

                    <div>
                        <p className="font-semibold text-gray-800">
                            Welcome, {profile?.firstName || "User"} 👋
                        </p>

                        <p className="text-sm text-gray-500">
                            {role}
                        </p>
                    </div>

                </div>

            </div>

        </header>
    );
}

export default Navbar;