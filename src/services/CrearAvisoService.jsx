import axios from "axios";

export const crearAviso = async (avisoData, token) => {
    const response = await axios.post(
        `http://127.0.0.1:8000/api/teacher/subject/notice`,
        avisoData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};
