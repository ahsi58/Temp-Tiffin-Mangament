import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getVendorProfile } from "../../api/userApi";

import { refreshToken } from "../../api/authApi";
import tokenService from "../../services/tokenService";

import "../auth/Register.css";

import DashboardLayout from "../../components/layout/DashboardLayout";

function VendorDashboard() {

    const testRefresh = async () => {
    try {
        const response = await refreshToken(tokenService.getRefreshToken());

        console.log("Refresh Success:", response.data);

    } catch (error) {
        console.error("Refresh Failed:", error.response?.data || error);
    }
};


    const { profile, loadProfile } = useAuth();

    useEffect(() => {

        if (!profile) {
            loadProfile();
        }

    }, []);

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold">
                Vendor Dashboard
            </h1>

            <p className="mt-4 text-gray-600">
                Welcome to your dashboard.
            </p>

            <button onClick={testRefresh}>
    Test Refresh
</button>

        </DashboardLayout>

    );
}

export default VendorDashboard;