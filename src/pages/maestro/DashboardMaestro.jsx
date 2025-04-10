import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal";
import { getSubjects } from "../../services/ClasesService";
import { getCarreras } from "../../services/ObtenerCarrerasService";
import { postClase } from "../../services/CrearClaseService";
import { useNavigate } from "react-router-dom";

const DashboardMaestro = () => {
    const [clases, setClases] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [loading, setLoading] = useState(true);

    //valores del form
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [career_id, setCarreraId] = useState(1);
    const [grade, setGrade] = useState("");

    const [recargarClases, setRecargarClases] = useState(false);
    const navigate = useNavigate();
    const modalTitle = "Crear Clase";

    // recuperar clases
    useEffect(() => {
        const fetchClases = async () => {
            try {
                const response = await getSubjects();
                setClases(response);
            } catch (error) {
                alert(error);
            } finally {
                setLoading(false);
            }
        };
        fetchClases();
    }, [recargarClases]);

    //recuperar carreras para el formulario
    useEffect(() => {
        const fetchCarreras = async () => {
            try {
                const response = await getCarreras();
                setCarreras(response);
                // console.log(response);
            } catch (error) {
                alert(error);
            }
        };
        fetchCarreras();
    },[]);

    //pa cuado le picas a una card te mande a la clase
    const onCardClick = (id) => {
        navigate(`/maestro/clase/${id}`);
    };

    const enviarFormulario = async (e) => {
        e.preventDefault();

        const data = {
            name,
            description,
            career_id,
            grade,
        };

        try {
            await postClase(data);
            setRecargarClases((prev) => !prev);
            setName("");
            setDescription("");
            setCarreraId(1);
            setGrade("");
        } catch (error) {
            alert(error);
        }
    };

    //pal navbar loco
    const actionButton = (
        <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#crearClaseModal"
        >
            + Crear Clase
        </button>
    );

    //pal modal loco
    const formularioCrearClase = (
        <form onSubmit={enviarFormulario}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Nombre de la clase
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Descripcion de la clase
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></input>
            </div>

            <div className="mb-3">
                <label htmlFor="career_id" className="form-label">
                    Carrera
                </label>

                <select
                    id="career_id"
                    className="form-select"
                    value={career_id}
                    onChange={(e) => setCarreraId(e.target.value)}
                >
                    {carreras.map((value) => (
                        <option key={value.id} value={value.id}>
                            {value.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="grade" className="form-label">
                    Grade
                </label>

                <input
                    type="text"
                    className="form-control"
                    id="grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
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
                    data-bs-dismiss="modal"
                >
                    Crear
                </button>
            </div>
        </form>
    );

    if (loading) return <div>...loading</div>;

    return (
        <Navbar actionButton={actionButton}>
            <Cards data={clases} onCardClick={onCardClick} />
            <Modal titulo={modalTitle} formulario={formularioCrearClase} />
        </Navbar>
    );
};

export default DashboardMaestro;
