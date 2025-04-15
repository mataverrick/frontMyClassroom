import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavbarClase from "../../components/NavbarClase";
import Navbar from "../../components/Navbar";
import axios from "axios";

const Tablon = () => {
    const { id } = useParams(); // Obtiene el ID de la clase desde la URL
    const [showForm, setShowForm] = useState(false); // Estado para mostrar/ocultar el formulario
    const [name, setName] = useState(""); // Estado para el nombre del tema
    const [description, setDescription] = useState(""); // Estado para la descripción del tema
    const [topics, setTopics] = useState([]); // Estado para almacenar los temas
    const [loading, setLoading] = useState(true); // Estado para mostrar el estado de carga

    // Función para recuperar los temas desde el backend
    const fetchTopics = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("No se encontró un token de autenticación.");
                return;
            }

            const response = await axios.get(
                `http://127.0.0.1:8000/api/auth/subject/topics/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTopics(response.data.data); // Actualiza el estado con los temas
            console.log(response);
        } catch (error) {
            console.error("Error al recuperar los temas:", error);
            alert("Ocurrió un error al cargar los temas.");
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
    };

    useEffect(() => {
        fetchTopics(); // Llama a la función para recuperar los temas al cargar el componente
    }, [id]);

    const handleCancel = () => {
        setShowForm(false); // Oculta el formulario
        setName(""); // Limpia el nombre
        setDescription(""); // Limpia la descripción
    };

    const handleSubmit = async () => {
        if (!name.trim()) {
            alert("El nombre del tema es obligatorio.");
            return;
        }

        const topicData = {
            name: name.trim(),
            description: description.trim() || null, // Si no hay descripción, envía `null`
            subject: id, // El ID de la clase se obtiene de la URL
        };

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("No se encontró un token de autenticación.");
                return;
            }

            const response = await axios.post(
                "http://127.0.0.1:8000/api/teacher/subject/topic",
                topicData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            alert("Tema creado exitosamente.");
            setShowForm(false); // Oculta el formulario
            setName(""); // Limpia el nombre
            setDescription(""); // Limpia la descripción
            fetchTopics(); // Actualiza la lista de temas después de crear uno nuevo
        } catch (error) {
            console.error("Error al crear el tema:", error);
            alert("Ocurrió un error al crear el tema.");
        }
    };

    return (
        <div>
            <Navbar />
            <NavbarClase classId={id}>
                <button
                    className="btn btn-outline-success ms-auto"
                    onClick={() => setShowForm(true)}
                >
                    + Nuevo Tema
                </button>
            </NavbarClase>
            <div className="container mt-4">
                <h3>Tablón</h3>
                {loading ? (
                    <p>Cargando temas...</p>
                ) : topics.length > 0 ? (
                    topics.map((topic) => (
                        <div key={topic.id}>
                            <h5>{topic.name}</h5>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>No hay temas disponibles.</p>
                )}

                {showForm && (
                    <div className="card p-4 mt-4">
                        <h4>Crear Nuevo Tema</h4>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Nombre del Tema
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">
                                    Descripción (opcional)
                                </label>
                                <textarea
                                    id="description"
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="d-flex justify-content-end">
                                <button
                                    type="button"
                                    className="btn btn-secondary me-2"
                                    onClick={handleCancel}
                                >
                                    Cerrar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSubmit}
                                >
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tablon;