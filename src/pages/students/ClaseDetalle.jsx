import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarStudents from "../../components/NavbarStudents";
import { getNoticesByClassId } from "../../services/NoticesService";
import NoticeCardList from "../../components/NoticeCardList";

const ClaseDetalle = () => {
    const { id } = useParams(); // Obtiene el ID de la clase desde la URL
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await getNoticesByClassId(id);
                console.log(response);
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

    return (
        <div>
            <NavbarStudents />
            <div className="container mt-4">
                {loading ? (
                    <p>Cargando avisos...</p>
                ) : (
                    <NoticeCardList notices={notices} />
                )}
            </div>
        </div>
    );
};

export default ClaseDetalle;