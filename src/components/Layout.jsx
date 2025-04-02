import React from "react";
import SidebarMaestro from "./SidebarMaestro";
import SidebarAlumno from "./SidebarAlumno";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
    const userRole = localStorage.getItem("role");
    const navigate = useNavigate();

    if (!userRole) {
        navigate("/");
    }

    return (
        <div className="flex">
            {userRole == 1 ? <SidebarMaestro /> : <SidebarAlumno />}
            <main className="flex-1 p-4">{children}</main>
        </div>
    );
};

export default Layout;
