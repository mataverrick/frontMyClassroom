import React from "react";
import { useNavigate } from "react-router-dom";

const NavbarClase = ({ classId, children }) => {
    const navigate = useNavigate();

    return (
        <div className="container mt-3">
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex gap-3">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => navigate(`/clase/${classId}/avisos`)}
                    >
                        Avisos
                    </button>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => navigate(`/clase/${classId}/tablon`)}
                    >
                        Tablón
                    </button>
                </div>
                {children}
            </div>
            <hr className="mt-3" />
        </div>
    );
};

export default NavbarClase;