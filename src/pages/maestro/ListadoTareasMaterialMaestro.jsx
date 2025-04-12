import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { getTareasMaterial } from "../../services/ObtenerTareasMaterialService";
import { postTarea } from "../../services/CrearTareaService";
import Modal from "../../components/Modal";
import { postMaterial } from "../../services/SubirMaterialSevice";

const ListadoTareasMaterialMaestro = () => {
  const { idTema, id } = useParams();
  const [modal, setModal] = useState("");
  const [titulo, setTitulo] = useState("");

  //formulario crear tarea
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [limit, setLimit] = useState("");

  //formulario subir material
  const [titleMaterial, setTitleMaterial] = useState("");
  const [descriptionMaterial, setDescriptionMaterial] = useState("");

  //recargar datos banderas
  const [recargarTareas, setRecargarTareas] = useState(false);
  const [recargarMaterial, setRecargarMaterial] = useState(false);

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

  const enviarFormularioMaterial = async (e) => {
    e.preventDefault();
    const data = {
      title: titleMaterial,
      description: descriptionMaterial,
      topic: idTema,
      subject: id,
    };

    try {
      await postMaterial(data);
      setRecargarTareas((prev)=> !prev);
      setDescriptionMaterial("");
      setTitleMaterial("");
    } catch (error) {
      alert(error);
    }
  };

  const formularioMaterial = (
    <form onSubmit={enviarFormularioMaterial}>
      <div className="mb-3">
        <label htmlFor="titleMaterial" className="form-label">
          Titulo
        </label>
        <input
          id="titleMaterial"
          type="text"
          value={titleMaterial}
          className="form-control"
          onChange={(e) => {
            setTitleMaterial(e.target.value);
          }}
          required
        ></input>

        <label htmlFor="description" className="form-label">
          Descripcion
        </label>
        <input
          id="description"
          type="text"
          value={descriptionMaterial}
          className="form-control"
          onChange={(e) => {
            setDescriptionMaterial(e.target.value);
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
          Enviar
        </button>
      </div>
    </form>
  );

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

        <li className="mb-1">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#crearClaseModal"
            onClick={() => {
              setModal("subirMaterial");
              setTitulo("Crear Tarea");
            }}
          >
            {" "}
            Subir Material
          </button>
        </li>
      </ul>
    </div>
  );

  const renderModal = () => {
    switch (modal) {
      case "crearTarea":
        return formularioCrearTarea;
      case "subirMaterial":
        return formularioMaterial;
    }
  };

  return (
    <Navbar actionButton={dropdown}>
      <Modal titulo={titulo} formulario={renderModal()} />
    </Navbar>
  );
};

export default ListadoTareasMaterialMaestro;
