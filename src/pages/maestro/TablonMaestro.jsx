import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import { getAlumnos } from "../../services/ObtenerAlumnosService";
import { postAlumno } from "../../services/InscribirAlumnoService";
import { getAlumnosClase } from "../../services/ObtenerAlumnosClaseService";
import { getAvisos } from "../../services/ObtenerAvisosService";
import Avisos from "../../components/Avisos";

// const navItems = [{ to: "/", name: "tareas" }] solo pa basarme xd

const TablonMaestro = () => {
    const [formulario, setFormulario] = useState("");
    const [title, setTitle] = useState("");
    const [alumnos, setAlumnos] = useState([]);
    const [obtenerAlumnos, setObtenerAlumnos] = useState([]);
    const [avisos, setAvisos] = useState([]);

    //valores reales para la peticion post de los forms
    const [users, setUsers] = useState(1);

    //valores pa recargar datos
    const [recargarAlumnos, setRecargarAlumnos] = useState(false);
    const [reacargarAvisos, setRecargarAvisos] = useState(false);
    const { id } = useParams();

    const navItems = [
        { to: `/maestro/clase/${id}/tareas`, name: "Trabajo de clase" },
        { to: `/maestro/clase/${id}/temas`, name: "Temas" },
        // {to: `/maestro/clase/${id}/material`, name: "Material" }
    ];

    //obtener alumnos de la clase
    useEffect(() => {
        const fetchAlumnosClase = async () => {
            const response = await getAlumnosClase(id);
            setObtenerAlumnos(response);
            setRecargarAlumnos((prev)=> !prev);
        };
        fetchAlumnosClase();
    }, [recargarAlumnos]);

    //obtener todos los alumnos
    useEffect(() => {
        const fetchAlumnos = async () => {
            const response = await getAlumnos();
            setAlumnos(response);
        };
        fetchAlumnos();
    }, []);

    //obtener todos los avisos de la clase
    useEffect(() => {
        const fetchAvisos = async () => {
            const response = await getAvisos(id);
            setAvisos(response);
            console.log(response);
        };
        fetchAvisos();
    }, [reacargarAvisos]);

    const enviarFormularioInscribirAlumnos = async (e) => {
        e.preventDefault();

        try {
            await postAlumno(id, alumnos);
        } catch (error) {
            alert(error);
        }
    };

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
                    data-bs-dismiss="modal"
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
                    <li className="list-group-item list-group-item-primary">
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
                            setFormulario(formularioInscribirAlumno);
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
                            setFormulario(verAlumnosModal);
                            setTitle("Alumnos Inscritos");
                        }}
                    >
                        Ver alumnos
                    </button>
                </li>
            </ul>
        </div>
    );

    return (
        <Navbar navItems={navItems} actionButton={actionButton}>
            <Modal titulo={title} formulario={formulario} />
            <Avisos avisos={avisos}/>
        </Navbar>
    );
};

export default TablonMaestro;
