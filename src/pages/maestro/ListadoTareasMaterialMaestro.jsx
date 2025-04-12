import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { getTareasMaterial } from "../../services/ObtenerTareasMaterialService";
import { postTarea } from "../../services/CrearTareaService";
import Modal from "../../components/Modal";

const ListadoTareasMaterialMaestro = () => {
  const { idTema } = useParams();
  const [modal, setModal] = useState("");
  const [titulo, setTitulo] = useState("");

  //formulario crear tarea
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [limit, setLimit] = useState("");

  //recargar datos banderas
  const [recargarTareas, setRecargarTareas] = useState(false);

  //recargar tareas
  useEffect(() => {
    const fetchTareasMaterial = async () => {
      const response = await getTareasMaterial(idTema);
      console.log(response);
    };
    fetchTareasMaterial();
  }, [recargarTareas]);

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Formato: YYYY-MM-DD HH:mm
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const enviarFormularioTarea = async (e) => {
    e.preventDefault();

    const newFormat = formatearFecha(limit);

    const data = {
      title,
      description,
      topic: idTema,
      subject: idTema,
      limit: newFormat,
    };

    try {
      await postTarea(data);
      setRecargarTareas((prev) => !prev);
      alert("Tarea agregada con exito");
    } catch (error) {
      alert(error);
    }
  };

  const formularioCrearTarea = (
    <form onSubmit={enviarFormularioTarea}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Titulo de la tarea
        </label>

        <input
          id="title"
          type="text"
          value={title}
          className="form-control"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
        ></input>

        <label htmlFor="description" className="form-label">
          Descripcion
        </label>

        <input
          id="description"
          type="text"
          value={description}
          className="form-control"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          required
        ></input>

        <label htmlFor="limit" className="form-label">
          Fecha limite
        </label>
        <input
          id="limit"
          type="datetime-local"
          className="form-control"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
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

  const dropdown = (
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
              setModal("crearTarea");
              setTitulo("Crear Tarea");
            }}
          >
            Crear Tarea
          </button>
        </li>
      </ul>
    </div>
  );

  const renderModal = () => {
    switch (modal) {
      case "crearTarea":
        return formularioCrearTarea;
    }
  };

  return (
    <Navbar actionButton={dropdown}>
      <Modal titulo={titulo} formulario={renderModal()} />
    </Navbar>
  );
};

export default ListadoTareasMaterialMaestro;
