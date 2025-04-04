import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbarmaestro from "./layouts/Navbarmaestro";
import Cards from "./components/Cards";
import CrearClase from "./pages/maestro/CrearClase";
import TablonPrincipalMaestro from "./pages/maestro/TablonPrincipalMaestro";
import DropdownOpcionesClase from "./components/DropdownOpcionesClase";

function App() {
  return (
    // <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/*rutas maestro*/}
        <Route element={<ProtectedRoute allowedRoles={["1"]} />}>
          <Route
            path="/maestro/home"
            element={
              <Navbarmaestro
                actionComponent={
                  <a
                    href="/maestro/crear-clase"
                    className="btn btn-outline-success"
                  >
                    + Crear Nueva Clase
                  </a>
                }
              >
                <Cards />
              </Navbarmaestro>
            }
          />

          <Route
            path="/maestro/crear-clase"
            element={
              <Navbarmaestro>
                <CrearClase></CrearClase>
              </Navbarmaestro>
            }
          ></Route>

          <Route
            path="/maestro/clase/:id"
            element={
              <Navbarmaestro
                actionComponent={
                  <DropdownOpcionesClase></DropdownOpcionesClase>
                }
              >
                <TablonPrincipalMaestro></TablonPrincipalMaestro>
              </Navbarmaestro>
            }
          ></Route>
        </Route>

        {/*rutas alumno*/}
        <Route element={<ProtectedRoute allowedRoles={["2"]} />}>
          <Route path="/alumno/home" element={<div>Soy alumno</div>} />
        </Route>

        <Route path="/noAllowed" element={<div>No permitido nene</div>} />
      </Routes>
    </BrowserRouter>
    // </UserProvider>
  );
}

export default App;
