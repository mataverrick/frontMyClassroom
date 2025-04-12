import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ children, navItems = [], actionButton }) => {
    const { logout } = useAuth();
    // navItems = [{ name: 1 }];
    
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand">
                        Classroom
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link
                                    to="/maestro/dashboard"
                                    className="nav-link active"
                                    aria-current="page"
                                >
                                    Home
                                </Link>
                            </li>

                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    onClick={logout}
                                    style={{ cursor: "pointer" }}
                                >
                                    Logout
                                </a>
                            </li>

                            {/* mandar propiedades desde la pagina principal */}
                            {navItems.map((item, index) => (
                                <li key={index} className="nav-item">
                                    <Link
                                        to={item.to}
                                        className="nav-link active"
                                        aria-current="page"
                                        key={index}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="d-flex my-2 my-lg-0">
                            {actionButton}
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container mt-4">{children}</div>
        </>
    );
};

export default Navbar;
