import axios from "axios";

const endpoint = "http://127.0.0.1:8000/api/teacher/subject/subject";

export const postClase = async (data) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token no disponible");
    }

    const response = await axios.post(endpoint, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
