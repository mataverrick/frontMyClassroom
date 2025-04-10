import axios from "axios";

const endpoint = "http://127.0.0.1:8000/api/auth/subject/topics";

export const getTemas = async (subjectId, token) => {
    try {
        const response = await axios.get(`${endpoint}/${subjectId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        // console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("❌ Error al obtener los temas:", error);
        throw error;
    }
};
