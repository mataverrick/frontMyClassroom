import axios from "axios";

const endpoint = "http://127.0.0.1:8000/api/auth/subject/topics";

//id de clase
export const getTemas = async (id) => {
    const token = localStorage.getItem("token");

        try {
        const response = await axios.get(`${endpoint}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        return response.data;
    } catch (error) {
        console.error("Error al obtener los temas:", error);
        throw error;
    }
};
