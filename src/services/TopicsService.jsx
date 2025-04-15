import axios from "axios";

export const getTopicsByClassId = async (id) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No se encontró un token de autenticación.");
        }

        const response = await axios.get(
            `http://127.0.0.1:8000/api/auth/subject/topics/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data.data; // Devuelve los datos de los temas
    } catch (error) {
        console.error("Error al recuperar los temas:", error);
        throw error;
    }
};