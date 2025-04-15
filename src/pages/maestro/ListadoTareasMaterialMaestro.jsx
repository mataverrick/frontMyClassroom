import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { getTareasMaterial } from "../../services/ObtenerTareasMaterialService";
import { postTarea } from "../../services/CrearTareaService";
import Modal from "../../components/Modal";
import { postMaterial } from "../../services/SubirMaterialSevice";
import axios from "axios";
import Tareas from "../../components/Tareas";

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
  const [filesMaterial, setMaterial] = useState([]);
  const [filesTarea, setTarea] = useState([]);

  //recargar datos banderas
  const [recargarTareas, setRecargarTareas] = useState(false);
  const [recargarMaterial, setRecargarMaterial] = useState(false);

  const [datos, setDatos] = useState([]);

  //recargar tareas
  useEffect(() => {
    const fetchTareasMaterial = async () => {
      const response = await getTareasMaterial(idTema);
      // console.log(response);
      setDatos(response);
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

    const formData = new FormData();
    formData.append("data[title]", title);
    formData.append("data[description]", description);
    formData.append("data[topic]", idTema);
    formData.append("data[subject]", idTema);
    formData.append("data[limit]", newFormat);

    // Solo si estás enviando archivos, agrega esto:
    if (filesTarea.length > 0) {
      Array.from(filesTarea).forEach((file) => {
        formData.append("files[]", file);
      });
    }

    try {
      await postTarea(formData);
      setRecargarTareas((prev) => !prev);
      alert("Tarea agregada con éxito");
    } catch (error) {
      alert(error);
    }
  };

  

  const enviarFormularioMaterial = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("data[title]", titleMaterial);
    formData.append("data[description]", descriptionMaterial);
    formData.append("data[topic]", idTema);
    formData.append("data[subject]", id);

    // Solo si estás enviando archivos, agrega esto:
    if (filesMaterial.length > 0) {
      Array.from(filesMaterial).forEach((file) => {
        formData.append("files[]", file);
      });
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/teacher/subject/resource",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setRecargarTareas((prev) => !prev);
      setDescriptionMaterial("");
      setMaterial([]);
      setTitleMaterial("");
    } catch (error) {
      console.error("Error al enviar material:", error);
      alert(
        error.response?.data?.message ||
          "Error desconocido al enviar el material"
      );
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

      {/* pa subir archivos */}
      <input
        id="filesMaterial"
        type="file"
        onChange={(e) => setMaterial(e.target.files[0])}
      />

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

        {/* pa subir archivos */}
        <input
          id="filesTarea"
          type="file"
          onChange={(e) => setTarea(e.target.files[0])}
        />
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
      <Tareas tareas={datos} />
    </Navbar>
  );
};

export default ListadoTareasMaterialMaestro;
