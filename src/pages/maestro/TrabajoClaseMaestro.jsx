import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal";
import Cards from "../../components/Cards";
import { useNavigate, useParams } from "react-router-dom";
import { getTemas } from "../../services/ObtenerTemasService";
import { postTarea } from "../../services/CrearTareaService";
import { getTareasMaterial } from "../../services/ObtenerTareasMaterialService";
import { postTema } from "../../services/CrearTemaService";

const TrabajoClaseMaestro = () => {
  const [titulo, setTitulo] = useState("");
  const [modal, setModal] = useState(null);
  const [temas, setTemas] = useState([]);

  //formulario crear tarea
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState(0);
  const [limit, setLimit] = useState("");

  //formulario crear tema
  const [name, setName] = useState("");
  const [descriptionTema, setDescriptionTema] = useState("");
  const [recargarTemas, setRecargarTemas] = useState(false);

  const { id } = useParams();
  const navItems = [{ to: `/maestro/clase/${id}`, name: "Regresar" }];
  const navigate = useNavigate();

  //obtener los temas de la clase
  useEffect(() => {
    const fetchTemas = async () => {
      const response = await getTemas(id);
      // console.log(response);
      setTemas(response.data);
    };
    fetchTemas();
  }, [recargarTemas]);


  const enviarFormularioCrearTema = async (e) => {
    e.preventDefault();

    const data = {
      name,
      description:descriptionTema,
      subject: id,
    };

    try {
      await postTema(data);
      setName("");
      setDescriptionTema("");
      setRecargarTemas((prev) => !prev);
    } catch (error) {
      alert(error);
    }
  };

  const formularioCrearTema = (
    <form onSubmit={enviarFormularioCrearTema}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nombre del tema
        </label>
        <input
          id="name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="name" className="form-label">
          Descripcion
        </label>
        <input
          id="description"
          className="form-control"
          value={descriptionTema}
          onChange={(e) => setDescriptionTema(e.target.value)}
          required
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
              setModal("crearTema");
              setTitulo("Crear Tema");
            }}
          >
            Crear Tema
          </button>
        </li>
      </ul>
    </div>
  );

  const renderModal = () => {
    switch (modal) {
      case "crearTema":
        return formularioCrearTema;
    }
  };

  const onCardClick = (idTema) => {
    navigate(`/maestro/clase/${id}/trabajo-de-clase/tareas-material/${idTema}`);
  };

  return (
    <Navbar actionButton={dropdown} navItems={navItems}>
      <Modal titulo={titulo} formulario={renderModal()} />
      <Cards data={temas} onCardClick={onCardClick} />
    </Navbar>
  );
};

export default TrabajoClaseMaestro;
