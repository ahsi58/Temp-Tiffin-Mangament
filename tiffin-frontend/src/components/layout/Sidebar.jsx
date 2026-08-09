import {
    Home,
    UtensilsCrossed,
    ShoppingCart,
    ShoppingBag,
    User,
    Users,
    LogOut
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {

    const { role, logout } = useAuth();
    const navigate = useNavigate();

    const customerMenu = [
    {
        name: "Dashboard",
        path: "/customer/dashboard",
        icon: Home
    },
    {
        name: "Weekly Menu",
        path: "/customer/menu",
        icon: UtensilsCrossed
    },
    {
        name: "Cart",
        path: "/customer/cart",
        icon: ShoppingBag
    },
    {
        name: "My Orders",
        path: "/customer/orders",
        icon: ShoppingCart
    },
    {
        name: "Profile",
        path: "/customer/profile",
        icon: User
    }
];

    const vendorMenu = [
        {
            name: "Dashboard",
            path: "/vendor/dashboard",
            icon: Home
        },
        {
            name: "Weekly Menu",
            path: "/vendor/menu",
            icon: UtensilsCrossed
        },
        {
            name: "Orders",
            path: "/vendor/orders",
            icon: ShoppingCart
        },
        {
            name: "Customers",
            path: "/vendor/customers",
            icon: Users
        },
        {
            name: "Profile",
            path: "/vendor/profile",
            icon: User
        }
    ];

    const menu = role === "CUSTOMER" ? customerMenu : vendorMenu;
    console.log("🔥 MY SIDEBAR IS RUNNING 🔥");
    console.log("ROLE:", role);
    console.log("MENU:", menu);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col justify-between">

            <nav className="p-4">

                <ul className="space-y-2">

                    {menu.map((item) => {

                        const Icon = item.icon;

                        return (
                            <li key={item.name}>

                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                            isActive
                                                ? "bg-orange-500 text-white"
                                                : "text-gray-700 hover:bg-orange-100"
                                        }`
                                    }
                                >
                                    <Icon size={20} />
                                    {item.name}
                                </NavLink>

                            </li>
                        );
                    })}

                </ul>

            </nav>

            <div className="p-4 border-t">

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition"
                >
                    <LogOut size={20} />
                    Logout
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;