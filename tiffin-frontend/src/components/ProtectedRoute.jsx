import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRole }) {

    const { isAuthenticated, role } = useAuth();

    // User is not logged in
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // Logged in but wrong role
    if (allowedRole && role !== allowedRole) {

        if (role === "CUSTOMER") {
            return <Navigate to="/customer/dashboard" replace />;
        }

        if (role === "VENDOR") {
            return <Navigate to="/vendor/dashboard" replace />;
        }

        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;