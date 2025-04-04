import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Necesitas importar useParams

const TablonPrincipalMaestro = () => {
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Obtén el id de la URL usando useParams()

  useEffect(() => {
    const fetchAnuncios = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token no disponible");
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/auth/notices/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.id) {
          setAnuncios([response.data]); 
        } else {
          setAnuncios(response.data);
        }

        setLoading(false);
      } catch (err) {
        setError("Error al cargar anuncios.");
        setLoading(false);
      }
    };

    fetchAnuncios();
  }, [id]);

  if (error) {
    return <div className="container mt-4 text-danger">{error}</div>;
  }

  if (loading) {
    return <div className="container mt-4">Cargando anuncios...</div>;
  }

  return (
    <div className="container mt-4 d-flex flex-wrap gap-3">
      {anuncios.map((a) => (
        <div
          key={a.id}
          className="card"
          style={{ width: "18rem", backgroundColor: "#f8f9fa" }}
        >
          <div className="card-body">
            <h5 className="card-title">📢 Anuncio</h5>
            <p className="card-text">{a.message}</p>
            <p className="card-text">
              <small className="text-muted">🗓 {a.date}</small>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TablonPrincipalMaestro;
