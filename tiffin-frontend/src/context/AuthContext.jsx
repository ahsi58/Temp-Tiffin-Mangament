import { createContext, useContext, useState } from "react";
import tokenService from "../services/tokenService";
import { getCustomerProfile, getVendorProfile } from "../api/userApi";


const AuthContext = createContext();

export function AuthProvider({ children }) {

    const loadProfile = async () => {

    try {

        const currentRole = tokenService.getRole();

        let response;

        if (currentRole === "CUSTOMER") {

            response = await getCustomerProfile();

        } else if (currentRole === "VENDOR") {

            response = await getVendorProfile();

        } else {

            console.error("Unknown role:", currentRole);
            return;

        }

        if (response) {
            setProfile(response.data);
        }

    } catch (error) {

        console.error(
            "Failed to load profile",
            error.response?.data || error
        );

    }

};

    const [isAuthenticated, setIsAuthenticated] = useState(
        tokenService.isLoggedIn()
    );

    const [role, setRole] = useState(
        tokenService.getRole()
    );

    const [profile, setProfile] = useState(null);

    const login = (data) => {

        tokenService.setTokens(data);

        setIsAuthenticated(true);

        setRole(data.role);

    };

    const logout = () => {

        tokenService.clearTokens();

        setIsAuthenticated(false);

        setRole(null);

        setProfile(null);

    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                role,
                profile,
                login,
                logout,
                loadProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}