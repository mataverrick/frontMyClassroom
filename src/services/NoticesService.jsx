import axios from "axios";

export const getNoticesByClassId = async (id) => {
    const endpoint = `http://127.0.0.1:8000/api/auth/notices/${id}`;
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Token no disponible");
        }

        const response = await axios.get(endpoint, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.notices; // Devuelve solo la propiedad `data` del backend
    } catch (error) {
        console.error("Error al recuperar los avisos:", error.message);
        throw error;
    }
};