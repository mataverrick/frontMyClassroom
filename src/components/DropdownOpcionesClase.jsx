import { useState } from "react";
import { useParams } from "react-router-dom";

const DropdownOpcionesClase = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { id } = useParams();

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        Opciones de Clase
      </button>
      <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
        <li>
          <a className="dropdown-item" href="#">
            Crear Aviso
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Agregar Alumno
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DropdownOpcionesClase;
