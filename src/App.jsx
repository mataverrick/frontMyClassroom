import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardMaestro from "./pages/maestro/DashboardMaestro";
import TablonMaestro from "./pages/maestro/TablonMaestro";
import TrabajoClaseMaestro from "./pages/maestro/TrabajoClaseMaestro";
import ListadoTareasMaterialMaestro from "./pages/maestro/ListadoTareasMaterialMaestro";

/**
 * Imports alumnos
 */
import DashboardStudent from "./pages/students/DashboardStudents";
import Pendientes from "./pages/students/Pendientes";
import ClaseDetalle from "./pages/students/ClaseDetalle";

const App = () => {
  return (
    <Router>
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

          <Route
            path="/maestro/clase/:id/trabajo-de-clase"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <TrabajoClaseMaestro />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/maestro/clase/:id/trabajo-de-clase/tareas-material/:idTema"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <ListadoTareasMaterialMaestro />
              </ProtectedRoute>
            }
          ></Route>

          /*
            Apartir de aqui comienzan las rutas para alumnos 
           */

          <Route
            path="/alumno/dashboard"
            element={
              <ProtectedRoute allowedRoles={[2]}>
                <DashboardStudent />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/alumno/pendientes"
            element={
              <ProtectedRoute allowedRoles={[2]}>
                <Pendientes />
              </ProtectedRoute>
            }
          />

          <Route path="/clase/:id" element={<ClaseDetalle />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
