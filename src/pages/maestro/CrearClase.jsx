import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const CrearClase = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [careerId, setCareerId] = useState("");
    const [grade, setGrade] = useState("1");
    const [careers, setCareers] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate(); 


    useEffect(() => {
        const fetchCareers = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/auth/career",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`, 
                        },
                    }
                );
                setCareers(response.data);
            } catch (error) {
                console.error("Error fetching careers:", error);
                setError("Hubo un problema al cargar las carreras.");
            }
        };

        fetchCareers();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            name,
            description,
            career_id: careerId,
            grade,
        };

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/teacher/subject/subject",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`, 
                    },
                }
            );

            console.log("Success:", response.data);

            navigate('/maestro/home')
        } catch (error) {
            console.error("Error:", error);
            setError("Hubo un problema al crear la clase. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
                    Descripción
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="careerId" className="form-label">
                    Carrera
                </label>
                <select
                    id="careerId"
                    className="form-select"
                    value={careerId}
                    onChange={(e) => setCareerId(e.target.value)}
                    required
                >
                    <option value="">Seleccione una carrera</option>
                    {careers.map((career) => (
                        <option key={career.id} value={career.id}>
                            {career.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="grade" className="form-label">
                    Grado
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    required
                />
            </div>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
            >
                {loading ? "Cargando..." : "Crear Clase"}
            </button>
        </form>
    );
};

export default CrearClase;
