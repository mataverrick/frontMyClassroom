import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import { getAlumnos } from "../../services/ObtenerAlumnosService";
// const navItems = [{ to: "/", name: "tareas" }] solo pa basarme xd

const TablonMaestro = () => {
    const [formulario, setFormulario] = useState("");
    const [alumnos, setAlumnos] = useState([]);

    //valores reales para la peticion post de los forms
    const [users, setUsers] = useState(1);

    const { id } = useParams();
    const navItems = [
        { to: `/maestro/clase/${id}/tareas`, name: "Trabajo de clase" },
        { to: `/maestro/clase/${id}/temas`, name: "Temas" },
        // {to: `/maestro/clase/${id}/material`, name: "Material" }
    ];

    //obtener todos los alumnos
    useEffect(() => {
        const fetchAlumnos = async () => {
            const response = await getAlumnos();
            // console.log(response);
            setAlumnos(response);
        };
        fetchAlumnos();
    }, []);

    const enviarFormularioInscribirAlumnos = (e) => {
        e.preventDefault();

        alert(users);
    };

    const formularioInscribirAlumno = (
        <form onSubmit={enviarFormularioInscribirAlumnos}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Nombre de la clase
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
                    data-bs-dismiss="modal"
                >
                    Crear
                </button>
            </div>
        </form>
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
                <li>
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#crearClaseModal"
                        onClick={() => setFormulario(formularioInscribirAlumno)}
                    >
                        + Agregar Alumno
                    </button>
                </li>
            </ul>
        </div>
    );

    return (
        <Navbar navItems={navItems} actionButton={actionButton}>
            <Modal formulario={formulario} />
        </Navbar>
    );
};

export default TablonMaestro;
