import React from "react";
import { Utensils } from "lucide-react";

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-3">

            <div className="w-full max-w-5xl">

                {/* Brand */}
                <div className="text-center mb-4">

                    <div className="inline-flex items-center justify-center gap-2">
                        <div className="bg-orange-500 p-2.5 rounded-xl">
                            <Utensils
                                size={26}
                                className="text-white"
                            />
                        </div>

                        <span className="text-2xl font-bold text-gray-900">
                            Tiffin
                        </span>
                    </div>

                    <p className="text-gray-500 mt-1 text-xs">
                        Fresh meals. Simple management.
                    </p>

                </div>


                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">

                    <div className="grid grid-cols-1 md:grid-cols-2">


                        {/* Left Branding Section */}
                        <div className="hidden md:flex bg-orange-500 text-white p-7 flex-col justify-center">

                            <div className="max-w-sm">

                                <div className="bg-white/20 w-fit p-3 rounded-xl mb-4">

                                    <Utensils size={36} />

                                </div>


                                <h2 className="text-2xl font-bold leading-tight">
                                    Your meals,
                                    <br />
                                    managed simply.
                                </h2>


                                <p className="mt-3 text-orange-50 text-sm leading-relaxed">
                                    Manage your tiffin orders, weekly menus,
                                    subscriptions and meals from one simple
                                    platform.
                                </p>


                                <div className="mt-5 space-y-3">

                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                        <span className="text-sm">
                                            Easy meal management
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                        <span className="text-sm">
                                            Track your orders
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                        <span className="text-sm">
                                            Stay connected with your vendor
                                        </span>
                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Form Section */}
                        <div className=" ">

                            <div className="">

                                <h1 className="text-3xl font-bold text-gray-900">
                                    {title}
                                </h1>

                                <p className="text-gray-500 ">
                                    {subtitle}
                                </p>


                                {/* Page Form */}
                                {children}

                            </div>

                        </div>

                    </div>

                </div>


                {/* Footer */}
                <p className="text-center text-sm text-gray-400 mt-6">
                    © {new Date().getFullYear()} Tiffin Management System
                </p>

            </div>

        </div>
    );
};

export default AuthLayout;