import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardMaestro from "./pages/maestro/DashboardMaestro";
import TablonMaestro from "./pages/maestro/TablonMaestro";

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Login />}></Route>

                    <Route
                        path="/maestro/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={[1]}>
                                <DashboardMaestro />
                            </ProtectedRoute>
                        }
                    ></Route>

                    <Route
                        path="/maestro/clase/:id"
                        element={
                            <ProtectedRoute allowedRoles={[1]}>
                                <TablonMaestro />
                            </ProtectedRoute>
                        }
                    ></Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
