import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const endpointLogin = "http://127.0.0.1:8000/api/auth/login";
const endpointMe = "http://127.0.0.1:8000/api/auth/me";

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState({
        token: localStorage.getItem("token"),
        role: localStorage.getItem("role"),
    });
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    //verificar si el token es valido
    const checkAuth = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const response = await axios.post(
                    endpointMe,
                    {},
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                const role = response.data.role_id;
                setAuthData({ token, role });
                localStorage.setItem("role", role);
                setLoading(false);
                if (role === 1) {
                    navigate("/maestro/dashboard");
                } else if (role === 2) {
                    navigate("/alumno/dashboard");
                }
            } catch (error) {
                // Si el token no es válido, limpiamos el localStorage
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                setAuthData({ token: null, role: null });
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth(); // Verifica si el usuario ya está autenticado al cargar la aplicación
    }, []);

    const handleLogin = async (email, password) => {
        try {
            const response = await axios.post(endpointLogin, {
                email,
                password,
            });
            const token = response.data.access_token;
            await getUserData(token);
        } catch (error) {
            alert("Login failed: " + error);
        }
    };

    const getUserData = async (token) => {
        try {
            const response = await axios.post(
                endpointMe,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const role = response.data.role_id;

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            setAuthData({ token, role });

            if (role === 1) {
                navigate("/maestro/dashboard");
            } else if (role === 2) {
                navigate("/alumno/dashboard");
            }
        } catch (error) {
            alert("Failed to fetch user data: " + error);
        }
    };

    const logout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
    }

    const value = {
        authData,
        handleLogin,
        loading,
        logout, // Para mostrar un estado de carga mientras verificamos si el usuario está logeado
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
