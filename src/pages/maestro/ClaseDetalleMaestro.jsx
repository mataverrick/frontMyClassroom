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
    const [showForm, setShowForm] = useState(false); // Estado para mostrar/ocultar el formulario de avisos
    const [showStudentForm, setShowStudentForm] = useState(false); // Estado para mostrar/ocultar el formulario de alumnos
    const [message, setMessage] = useState(""); // Estado para el mensaje del aviso
    const [files, setFiles] = useState([]); // Estado para los archivos
    const [studentName, setStudentName] = useState(""); // Estado para el nombre del alumno
    const [searchResults, setSearchResults] = useState([]); // Resultados de búsqueda de usuarios
    const [selectedStudents, setSelectedStudents] = useState([]); // Lista de alumnos seleccionados
    const [typingTimeout, setTypingTimeout] = useState(null); // Control del retraso al escribir

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
        setShowForm(false); // Oculta el formulario de avisos
        setMessage(""); // Limpia el mensaje
        setFiles([]); // Limpia los archivos
    };

    const handleCancelStudentForm = () => {
        setShowStudentForm(false); // Oculta el formulario de alumnos
        setStudentName(""); // Limpia el campo de texto
        setSearchResults([]); // Limpia los resultados de búsqueda
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setStudentName(value);

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setTypingTimeout(
            setTimeout(async () => {
                if (value.trim() === "") {
                    setSearchResults([]);
                    return;
                }

                try {
                    const token = localStorage.getItem("token");
                    if (!token) {
                        alert("No se encontró un token de autenticación.");
                        return;
                    }

                    const response = await axios.get(
                        `http://127.0.0.1:8000/api/auth/users/search/${value}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    setSearchResults(response.data.users || []);
                } catch (error) {
                    console.error("Error al buscar usuarios:", error);
                }
            }, 500) // Retraso de 500ms
        );
    };

    const handleAddStudent = (user, event) => {
        event.preventDefault(); // Evita que el botón recargue la página
        if (!selectedStudents.some((student) => student.id === user.id)) {
            setSelectedStudents([...selectedStudents, { id: user.id, name: user.name }]);
        }
    };

    const handleSendStudents = async () => {
        if (selectedStudents.length === 0) {
            alert("Debe seleccionar al menos un alumno.");
            return;
        }

        const data = {
            subject: id,
            users: selectedStudents.map((student) => student.id),
        };

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("No se encontró un token de autenticación.");
                return;
            }

            const response = await axios.post(
                "http://127.0.0.1:8000/api/teacher/subject/users",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            alert("Alumnos agregados exitosamente.");
            setShowStudentForm(false); // Oculta el formulario
            setSelectedStudents([]); // Limpia la lista de alumnos seleccionados
        } catch (error) {
            console.error("Error al enviar los alumnos:", error);
            alert("Ocurrió un error al agregar los alumnos.");
        }
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
            setShowForm(false); // Oculta el formulario
            setMessage(""); // Limpia el mensaje
            setFiles([]); // Limpia los archivos

            // Actualiza la lista de avisos
            const updatedNotices = await getNoticesByClassId(id);
            setNotices(updatedNotices);
        } catch (error) {
            console.error("Error al crear el aviso:", error);
            alert("Ocurrió un error al crear el aviso.");
        }
    };

    return (
        <div>
            <Navbar />
            <NavbarClase classId={id}>
                <button
                    className="btn btn-outline-success ms-auto"
                    onClick={() => setShowStudentForm(true)}
                >
                    + Agregar Alumnos
                </button>
            </NavbarClase>
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

                {showStudentForm && (
                    <div className="card p-4 mb-4">
                        <h3>Agregar Alumnos</h3>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="studentName" className="form-label">
                                    Buscar Alumno
                                </label>
                                <input
                                    id="studentName"
                                    type="text"
                                    className="form-control"
                                    value={studentName}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <div className="mb-3">
                                <h5>Resultados de búsqueda:</h5>
                                <ul className="list-group">
                                    {searchResults.map((user) => (
                                        <li
                                            key={user.id}
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                        >
                                            {user.name}
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={(event) => handleAddStudent(user, event)}
                                            >
                                                Agregar
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mb-3">
                                <h5>Alumnos seleccionados:</h5>
                                <ul className="list-group">
                                    {selectedStudents.map((student) => (
                                        <li key={student.id} className="list-group-item">
                                            {student.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button
                                    type="button"
                                    className="btn btn-secondary me-2"
                                    onClick={handleCancelStudentForm}
                                >
                                    Cerrar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSendStudents}
                                >
                                    Enviar
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