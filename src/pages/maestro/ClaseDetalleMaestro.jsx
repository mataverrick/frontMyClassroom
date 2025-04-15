import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getNoticesByClassId } from "../../services/NoticesService";
import NoticeCardList from "../../components/NoticeCardList";
import axios from "axios";
import NavbarClase from "../../components/NavbarClase";

const ClaseDetalleMaestro = () => {
    const { id } = useParams(); // Obtiene el ID de la clase desde la URL
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false); // Estado para mostrar/ocultar el formulario
    const [message, setMessage] = useState(""); // Estado para el mensaje del aviso
    const [files, setFiles] = useState([]); // Estado para los archivos

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await getNoticesByClassId(id);
                if (response) {
                    setNotices(response); // Asegúrate de que `response.notices` existe
                } else {
                    setNotices([]); // Si no hay datos, establece un array vacío
                }
            } catch (error) {
                alert("Error al cargar los avisos");
            } finally {
                setLoading(false);
            }
        };

        fetchNotices();
    }, [id]);

    const handleFileChange = (e) => {
        setFiles(e.target.files); // Actualiza los archivos seleccionados
    };

    const handleCancel = () => {
        setShowForm(false); // Oculta el formulario
        setMessage(""); // Limpia el mensaje
        setFiles([]); // Limpia los archivos
    };

    const handleCreateNotice = async () => {
        if (!message.trim()) {
            alert("El mensaje del aviso es obligatorio.");
            return;
        }

        const formData = new FormData();
        formData.append("data[message]", message);
        formData.append("data[subject]", id); // ID de la clase actual

        if (files.length > 0) {
            Array.from(files).forEach((file) => {
                formData.append("files[]", file);
            });
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("No se encontró un token de autenticación.");
                return;
            }

            const response = await axios.post(
                "http://127.0.0.1:8000/api/teacher/subject/notice",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            alert("Aviso creado exitosamente.");

            try {
                const response = await getNoticesByClassId(id);
                if (response) {
                    setNotices(response); // Asegúrate de que `response.notices` existe
                    setShowForm(false); // Oculta el formulario
                    setMessage(""); // Limpia el mensaje
                    setFiles([]); // Limpia los archivos
                } else {
                    setNotices([]); // Si no hay datos, establece un array vacío
                }
            } catch (error) {
                alert("Error al cargar los avisos");
            } finally {
                setLoading(false);
            }

            // Agrega el nuevo aviso a la lista
        } catch (error) {
            console.error("Error al crear el aviso:", error);
            alert("Ocurrió un error al crear el aviso.");
        }
    };

    return (
        <div>
            <Navbar />
            <NavbarClase classId={id}/>
            <div className="container mt-4">
                <button
                    className="btn btn-primary mb-4"
                    onClick={() => setShowForm(true)}
                >
                    Crear Nuevo Aviso
                </button>

                {showForm && (
                    <div className="card p-4 mb-4">
                        <h3>Crear Nuevo Aviso</h3>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">
                                    Mensaje del Aviso
                                </label>
                                <textarea
                                    id="message"
                                    className="form-control"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="files" className="form-label">
                                    Archivos (opcional)
                                </label>
                                <input
                                    id="files"
                                    type="file"
                                    className="form-control"
                                    multiple
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="d-flex justify-content-end">
                                <button
                                    type="button"
                                    className="btn btn-secondary me-2"
                                    onClick={handleCancel}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleCreateNotice}
                                >
                                    Crear
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {loading ? (
                    <p>Cargando avisos...</p>
                ) : (
                    <NoticeCardList notices={notices} />
                )}
            </div>
        </div>
    );
};

export default ClaseDetalleMaestro;