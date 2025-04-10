import axios from "axios";

export const obtenerAvisos = async (subjectId, token) => {
    const response = await axios.get(
        `http://127.0.0.1:8000/api/auth/notices/${subjectId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};
