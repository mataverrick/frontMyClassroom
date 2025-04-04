import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DropdownOpcionesClase = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAlumnosOpen, setIsModalAlumnosOpen] = useState(false);
  const [isModalAvisoOpen, setIsModalAvisoOpen] = useState(false); // <-- NUEVO
  const [mensajeAviso, setMensajeAviso] = useState(""); // <-- NUEVO

  const [alumnos, setAlumnos] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [alumnosClase, setAlumnosClase] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/auth/subject/users/1", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setAlumnos(response.data.users || []))
      .catch((error) => console.error("Error al obtener alumnos:", error));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://127.0.0.1:8000/api/auth/subject/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setAlumnosClase(response.data.users || []))
      .catch((error) =>
        console.error("Error al obtener alumnos de la clase:", error)
      );
  }, [id]);

  const handleAgregarAlumno = () => {
    if (!selectedAlumno) return;
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://127.0.0.1:8000/api/teacher/subject/users",
        { subject: id, users: [selectedAlumno] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        alert("Alumno agregado exitosamente");
        setIsModalOpen(false);
        return axios.get(
          `http://127.0.0.1:8000/api/auth/subject/users/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      })
      .then((response) => setAlumnosClase(response.data.users || []))
      .catch((error) => console.error("Error al agregar alumno:", error));
  };

  const handleEnviarAviso = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://127.0.0.1:8000/api/teacher/subject/notice",
        { message: mensajeAviso, subject: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        alert("Aviso enviado con éxito");
        setIsModalAvisoOpen(false);
        setMensajeAviso("");
      })
      .catch((error) => console.error("Error al enviar aviso:", error));
  };

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
          <button
            className="dropdown-item"
            onClick={() => setIsModalAvisoOpen(true)}
          >
            Crear Aviso
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => setIsModalOpen(true)}
          >
            Agregar Alumno
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => setIsModalAlumnosOpen(true)}
          >
            Ver Alumnos Inscritos
          </button>
        </li>
      </ul>

      {/* Modal Crear Aviso */}
      {isModalAvisoOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Crear Aviso</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalAvisoOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <textarea
                  className="form-control"
                  placeholder="Escribe tu mensaje aquí"
                  value={mensajeAviso}
                  onChange={(e) => setMensajeAviso(e.target.value)}
                  rows="4"
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsModalAvisoOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleEnviarAviso}
                >
                  Enviar Aviso
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Agregar Alumno */}
      {isModalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Agregar Alumno</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <select
                  className="form-select"
                  onChange={(e) => setSelectedAlumno(e.target.value)}
                >
                  <option value="">Seleccione un alumno</option>
                  {alumnos.map((alumno) => (
                    <option key={alumno.id} value={alumno.id}>
                      {alumno.name} {alumno.lastname}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cerrar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleAgregarAlumno}
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Ver Alumnos Inscritos */}
      {isModalAlumnosOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Alumnos Inscritos</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalAlumnosOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                {alumnosClase.length > 0 ? (
                  <ul className="list-group">
                    {alumnosClase.map((alumno) => (
                      <li key={alumno.id} className="list-group-item">
                        {alumno.name} {alumno.lastname}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay alumnos inscritos.</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsModalAlumnosOpen(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownOpcionesClase;
