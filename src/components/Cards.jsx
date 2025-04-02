import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const endpoint = "http://127.0.0.1:8000/api/auth/subjects";
const token = localStorage.getItem("token");

const Cards = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Token no disponible");
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get(endpoint, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setData(response.data.subjects);
                setLoading(false);
            } catch (error) {
                setError("Ocurrió un error al cargar los datos.");
                setLoading(false);
            }
        };

        fetchData();
    }, []); 

    const handleClick = (id) => {
        // alert(`Card ${id} clickeada`);
        navigate(`/maestro/clase/${id}`)
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container d-flex flex-wrap gap-3">
            {data.map((item) => (
                <div
                    key={item.id}
                    className="card"
                    style={{ width: "18rem", cursor: "pointer" }}
                    onClick={() => handleClick(item.id)}
                >
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>{" "}
                        <h6 className="card-subtitle mb-2 text-body-secondary">
                            {item.grade}{" "}
                        </h6>
                        <p className="card-text">{item.description}</p>{" "}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Cards;
