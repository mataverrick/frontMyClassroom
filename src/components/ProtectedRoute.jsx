import React, { use } from 'react';
import { Navigate ,Outlet } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const ProtectedRoute = ({allowedRoles, children }) => {

    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); 

    if (!token || !allowedRoles.includes(userRole)) {
        return <Navigate to="/" />;
    }

    if(userRole != 1 && userRole != 2){
        return <Navigate to="/noAllowed" />;
    }


    return children ? children : <Outlet></Outlet>;
};

export default ProtectedRoute;