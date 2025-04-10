import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { authData, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (!authData.token) {
        return <Navigate to="/" />;
    }

    if (!allowedRoles.includes(authData.role)) {
        return <Navigate to="/unauthorized" />; 
    }

    return children;
};

export default ProtectedRoute;
