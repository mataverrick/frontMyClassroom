import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import { getAlumnos } from "../../services/ObtenerAlumnosService";
import { postAlumno } from "../../services/InscribirAlumnoService";
import { getAlumnosClase } from "../../services/ObtenerAlumnosClaseService";
import { getAvisos } from "../../services/ObtenerAvisosService";
import { postAviso } from "../../services/CrearAvisoService";
import Avisos from "../../components/Avisos";

const TablonMaestro = () => {
  const [formulario, setFormulario] = useState(null);
  const [title, setTitle] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const [obtenerAlumnos, setObtenerAlumnos] = useState([]);
  const [avisos, setAvisos] = useState([]);

  //valores reales para la peticion post de los forms
  const [users, setUsers] = useState(1);
  const [message, setMessage] = useState("");

  //valores pa recargar datos
  const [recargarAlumnos, setRecargarAlumnos] = useState(false);
  const [reacargarAvisos, setRecargarAvisos] = useState(false);

  //parametro de ruta
  const { id } = useParams();

  const navItems = [
    { to: `/maestro/clase/${id}/trabajo-de-clase`, name: "Trabajo de clase" },
  ];

  //obtener alumnos de la clase
  useEffect(() => {
    const fetchAlumnosClase = async () => {
      const response = await getAlumnosClase(id);
      setObtenerAlumnos(response);
    };
    fetchAlumnosClase();
  }, [recargarAlumnos]);

  //obtener todos los alumnos
  useEffect(() => {
    const fetchAlumnos = async () => {
      const response = await getAlumnos();
      setAlumnos(response);
      console.log(alumnos);
    };
    fetchAlumnos();
  }, []);

  //obtener todos los avisos de la clase
  useEffect(() => {
    const fetchAvisos = async () => {
      const response = await getAvisos(id);
      setAvisos(response);
      //   console.log(response);
    };
    fetchAvisos();
  }, [reacargarAvisos]);

  const enviarFormularioInscribirAlumnos = async (e) => {
    e.preventDefault();

    try {
      //   console.log(users);
      await postAlumno(id, users);
      setUsers(1);
      setRecargarAlumnos((prev) => !prev);
    } catch (error) {
      alert(error);
    }
  };

  const enviarFormularioAvisos = async (e) => {
    e.preventDefault();

    const data = {
      message,
      subject: id,
    };

    try {
      await postAviso(data);
      setMessage("");
      setRecargarAvisos((prev) => !prev);
    } catch (error) {}
  };

  const formularioNuevoAviso = (
    <form onSubmit={enviarFormularioAvisos}>
      <div className="mb-3">
        <label htmlFor="message" className="form-label">
          Mensaje del aviso
        </label>

        <input
          id="message"
          type="text"
          value={message}
          className="form-control"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          required
        ></input>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Cerrar
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          // data-bs-dismiss="modal"
        >
          Crear
        </button>
      </div>
    </form>
  );

  const formularioInscribirAlumno = (
    <form onSubmit={enviarFormularioInscribirAlumnos}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Alumnos
        </label>
        <select
          id="users"
          className="form-select"
          value={users}
          onChange={(e) => setUsers(e.target.value)}
        >
          {alumnos.map((value) => (
            <option key={value.id} value={value.id}>
              {value.name}
            </option>
          ))}
        </select>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Cerrar
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          // data-bs-dismiss="modal"
        >
          Crear
        </button>
      </div>
    </form>
  );

  const verAlumnosModal = (
    <div className="mb-3">
      <ul className="list-group">
        {obtenerAlumnos.map((value) => (
          <li
            key={value.id}
            className="list-group-item list-group-item-primary"
          >
            {value.name}
          </li>
        ))}
      </ul>
    </div>
  );

  //dropdown de opcion de inscribir alumno y crear avisos
  const actionButton = (
    <div className="dropdown">
      <a
        className="btn btn-secondary dropdown-toggle"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Opciones de clase
      </a>

      <ul className="dropdown-menu">
        <li className="mb-1">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#crearClaseModal"
            onClick={() => {
              setFormulario("inscribirAlumno");
              setTitle("Inscribir Alumno");
            }}
          >
            + Agregar Alumno
          </button>
        </li>
        <li className="mb-1">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#crearClaseModal"
            onClick={() => {
              setFormulario("verAlumnos");
              setTitle("Alumnos");
            }}
          >
            Ver alumnos
          </button>
        </li>

        <li className="mb-1">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#crearClaseModal"
            onClick={() => {
              setFormulario("avisos");
              setTitle("Nuevo Aviso");
            }}
          >
            Agregar aviso
          </button>
        </li>
      </ul>
    </div>
  );

  const renderForm = () => {
    switch (formulario) {
      case "avisos":
        return formularioNuevoAviso;
      case "verAlumnos":
        return verAlumnosModal;
      case "inscribirAlumno":
        return formularioInscribirAlumno;
    }
  };

  return (
    <Navbar navItems={navItems} actionButton={actionButton}>
      <Modal titulo={title} formulario={renderForm()} />
      <Avisos avisos={avisos} />
    </Navbar>
  );
};

export default TablonMaestro;
