import {
    Home,
    UtensilsCrossed,
    ShoppingCart,
    ShoppingBag,
    Star,
    User,
    Users,
    MessageSquare,
    LogOut
} from "lucide-react";

import {
    NavLink,
    useNavigate
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";


function Sidebar() {

    const { role, logout } = useAuth();

    const navigate = useNavigate();


    // ============================================================
    // Customer Navigation
    // ============================================================

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
            name: "Feedback",
            path: "/customer/feedback",
            icon: Star
        },

        {
            name: "Profile",
            path: "/customer/profile",
            icon: User
        }

    ];


    // ============================================================
    // Vendor Navigation
    // ============================================================

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
            name: "Feedback",
            path: "/vendor/feedback",
            icon: MessageSquare
        },

        {
            name: "Profile",
            path: "/vendor/profile",
            icon: User
        }

    ];


    const menu =
        role === "CUSTOMER"
            ? customerMenu
            : vendorMenu;


    // ============================================================
    // Logout
    // ============================================================

    const handleLogout = () => {

        logout();

        navigate("/");

    };


    return (

        <aside
            className="
                fixed
                left-0
                top-16
                z-40
                w-60
                h-[calc(100vh-4rem)]
                bg-white
                rounded-r-2xl
                shadow-[4px_0_18px_rgba(0,0,0,0.06)]
                flex
                flex-col
                justify-between
                overflow-hidden
            "
        >

            {/* ==================================================
                Navigation
               ================================================== */}

            <nav className="px-3 py-5">

                <div className="px-3 mb-3">

                    <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">

                        {role === "CUSTOMER"
                            ? "Customer Menu"
                            : "Vendor Menu"}

                    </p>

                </div>


                <ul className="space-y-1.5">

                    {menu.map((item) => {

                        const Icon = item.icon;


                        return (

                            <li key={item.name}>

                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `
                                        group
                                        flex
                                        items-center
                                        gap-3
                                        px-3.5
                                        py-2.5
                                        rounded-xl
                                        text-sm
                                        font-medium
                                        transition-all
                                        duration-200
                                        ${
                                            isActive

                                                ? `
                                                    bg-orange-500
                                                    text-white
                                                    shadow-sm
                                                  `

                                                : `
                                                    text-gray-600
                                                    hover:bg-orange-50
                                                    hover:text-orange-600
                                                  `
                                        }
                                        `
                                    }
                                >

                                    <Icon
                                        size={18}
                                        strokeWidth={2}
                                    />

                                    <span>
                                        {item.name}
                                    </span>

                                </NavLink>

                            </li>

                        );

                    })}

                </ul>

            </nav>


            {/* ==================================================
                Logout
               ================================================== */}

            <div className="px-3 py-4 border-t border-gray-100">

                <button
                    onClick={handleLogout}
                    className="
                        flex
                        items-center
                        gap-3
                        w-full
                        px-3.5
                        py-2.5
                        rounded-xl
                        text-sm
                        font-medium
                        text-red-500
                        hover:bg-red-50
                        transition-all
                        duration-200
                    "
                >

                    <LogOut
                        size={18}
                    />

                    <span>
                        Logout
                    </span>

                </button>

            </div>

        </aside>

    );

}


export default Sidebar;

